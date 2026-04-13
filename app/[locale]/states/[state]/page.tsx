import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PollenIndex } from "@/components/PollenIndex";
import { PollenCard } from "@/components/PollenCard";
import states from "@/data/states-fallback.json";
import cities from "@/data/cities-fallback.json";
import { MONTH_NAMES } from "@/lib/utils";
import type { PollenLevel } from "@/lib/utils";

interface PageProps {
  params: Promise<{ locale: string; state: string }>;
}

type StateData = typeof states[0] & { overallRating: PollenLevel };
type CityData = typeof cities[0] & { overall: PollenLevel };

function getState(code: string): StateData | undefined {
  return (states as StateData[]).find((s) => s.code.toLowerCase() === code.toLowerCase());
}

export async function generateStaticParams() {
  return states.map((s) => ({ state: s.code.toLowerCase() }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state: stateCode, locale } = await params;
  const stateData = getState(stateCode);
  if (!stateData) return { title: "State Not Found" };

  return {
    title: `Pollen Levels in ${stateData.name} — PollenTrackerHQ`,
    description: `Check pollen levels across ${stateData.name}. Primary allergens: ${stateData.primaryAllergens.join(", ")}. Overall rating: ${stateData.overallRating}.`,
    alternates: {
      canonical: `https://pollen-tracker-hq.vercel.app/${locale}/states/${stateCode}`,
    },
  };
}

export default async function StateDetailPage({ params }: PageProps) {
  const { locale, state: stateCode } = await params;
  const stateData = getState(stateCode);

  if (!stateData) notFound();

  const stateCities = (cities as CityData[]).filter(
    (c) => c.state.toUpperCase() === stateData.code.toUpperCase()
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Pollen Levels in ${stateData.name}`,
    url: `https://pollen-tracker-hq.vercel.app/${locale}/states/${stateCode}`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `https://pollen-tracker-hq.vercel.app/${locale}` },
        { "@type": "ListItem", position: 2, name: "States", item: `https://pollen-tracker-hq.vercel.app/${locale}/states` },
        { "@type": "ListItem", position: 3, name: stateData.name },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href={`/${locale}`} className="hover:text-lime-700">Home</Link>
          <span className="mx-2">›</span>
          <Link href={`/${locale}/states`} className="hover:text-lime-700">States</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-900">{stateData.name}</span>
        </nav>

        {/* Header */}
        <div className="flex flex-wrap items-start gap-4 mb-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">
              Pollen Levels in {stateData.name}
            </h1>
            <p className="text-gray-600 mt-1">
              Region: <strong>{stateData.region}</strong>
            </p>
          </div>
          <PollenIndex level={stateData.overallRating} size="lg" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Seasonal Calendar */}
            <div className="bg-white rounded-xl border border-yellow-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Seasonal Pollen Calendar</h2>
              <div className="grid grid-cols-12 gap-1">
                {MONTH_NAMES.map((month, i) => {
                  const isPeak = stateData.peakMonths.includes(i + 1);
                  return (
                    <div key={month} className="text-center">
                      <div className="text-xs text-gray-500 mb-1">{month}</div>
                      <div
                        className={`h-8 rounded ${isPeak ? "bg-red-400" : "bg-green-200"}`}
                        title={isPeak ? "Peak Pollen Month" : "Lower Pollen Month"}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-4 mt-3 text-xs text-gray-500">
                <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-400 rounded inline-block" /> Peak season</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-200 rounded inline-block" /> Lower season</span>
              </div>
            </div>

            {/* Primary Allergens */}
            <div className="bg-white rounded-xl border border-yellow-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Primary Allergens in {stateData.name}</h2>
              <div className="flex flex-wrap gap-2">
                {stateData.primaryAllergens.map((allergen) => (
                  <Link
                    key={allergen}
                    href={`/${locale}/allergens/${allergen.toLowerCase().replace(/\s+/g, "-")}`}
                    className="px-3 py-1.5 bg-lime-100 text-lime-800 rounded-full text-sm font-medium hover:bg-lime-200 transition-colors capitalize"
                  >
                    {allergen}
                  </Link>
                ))}
              </div>
            </div>

            {/* Cities in State */}
            {stateCities.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Cities in {stateData.name} with Pollen Data
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {stateCities.map((city) => (
                    <PollenCard key={city.slug} city={city} locale={locale} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-lime-50 rounded-xl border border-lime-200 p-5">
              <h2 className="text-lg font-bold text-gray-900 mb-4">State Overview</h2>
              <dl className="space-y-2">
                <div className="flex justify-between text-sm">
                  <dt className="text-gray-600">Overall Rating</dt>
                  <dd><PollenIndex level={stateData.overallRating} size="sm" /></dd>
                </div>
                <div className="flex justify-between text-sm">
                  <dt className="text-gray-600">Region</dt>
                  <dd className="font-medium">{stateData.region}</dd>
                </div>
                <div className="flex justify-between text-sm">
                  <dt className="text-gray-600">Peak Months</dt>
                  <dd className="font-medium">
                    {stateData.peakMonths.map((m) => MONTH_NAMES[m - 1]).join(", ")}
                  </dd>
                </div>
                <div className="flex justify-between text-sm">
                  <dt className="text-gray-600">Cities Tracked</dt>
                  <dd className="font-medium">{stateCities.length}</dd>
                </div>
              </dl>
            </div>

            {/* Display Ad */}
            <div
              className="mx-auto rounded-xl border border-dashed border-gray-200 bg-gray-50 flex items-center justify-center text-gray-300 text-sm"
              style={{ minWidth: "280px", minHeight: "250px" }}
            >
              {/* Display Ad 300x250 */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
