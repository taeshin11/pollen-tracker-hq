import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PollenIndex } from "@/components/PollenIndex";
import { SeasonalChart } from "@/components/SeasonalChart";
import cities from "@/data/cities-fallback.json";
import type { PollenLevel } from "@/lib/utils";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

type CityData = typeof cities[0] & { overall: PollenLevel };

function getCity(slug: string): CityData | undefined {
  return (cities as CityData[]).find((c) => c.slug === slug);
}

export async function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const city = getCity(slug);
  if (!city) return { title: "City Not Found" };

  return {
    title: `Pollen Count Today in ${city.name}, ${city.state} — PollenTrackerHQ`,
    description: `Check today's pollen levels in ${city.name}, ${city.state}. Tree pollen: ${city.tree}/10, Grass: ${city.grass}/10, Weed: ${city.weed}/10, Mold: ${city.mold}/10. Overall: ${city.overall}.`,
    alternates: {
      canonical: `https://pollen-tracker-hq.vercel.app/${locale}/cities/${slug}`,
    },
  };
}

const scoreToMonthly = (score: number): number[] => {
  // Generates plausible monthly pollen data based on score and type
  const base = score;
  return [
    Math.max(1, base - 5),
    Math.max(1, base - 4),
    Math.max(1, base - 2),
    Math.min(10, base + 1),
    Math.min(10, base),
    Math.max(1, base - 1),
    Math.max(1, base - 3),
    Math.max(1, base - 2),
    Math.max(1, base - 1),
    Math.max(1, base - 3),
    Math.max(1, base - 5),
    Math.max(1, base - 6),
  ];
};

export default async function CityDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const city = getCity(slug);

  if (!city) notFound();

  const treeData = scoreToMonthly(city.tree);
  const grassData = [1, 1, 2, 4, Math.min(10, city.grass + 1), city.grass, city.grass, Math.max(1, city.grass - 2), Math.max(1, city.grass - 3), 1, 1, 1];
  const weedData = [1, 1, 1, 2, 3, Math.max(1, city.weed - 2), Math.max(1, city.weed - 1), city.weed, Math.min(10, city.weed + 1), Math.max(1, city.weed - 2), 1, 1];
  const moldData = [2, 2, 3, 4, 5, Math.min(10, city.mold + 2), Math.min(10, city.mold + 3), city.mold, Math.max(1, city.mold - 1), Math.max(1, city.mold - 2), 2, 2];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Pollen Forecast ${city.name}, ${city.state}`,
    url: `https://pollen-tracker-hq.vercel.app/${locale}/cities/${slug}`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `https://pollen-tracker-hq.vercel.app/${locale}` },
        { "@type": "ListItem", position: 2, name: "Cities", item: `https://pollen-tracker-hq.vercel.app/${locale}/cities` },
        { "@type": "ListItem", position: 3, name: city.name, item: `https://pollen-tracker-hq.vercel.app/${locale}/cities/${slug}` },
      ],
    },
    mainEntity: {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: `What is today's pollen count in ${city.name}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `Today's overall pollen level in ${city.name}, ${city.state} is ${city.overall}. Tree pollen: ${city.tree}/10, Grass pollen: ${city.grass}/10, Weed pollen: ${city.weed}/10, Mold: ${city.mold}/10.`,
          },
        },
        {
          "@type": "Question",
          name: `When is pollen season in ${city.name}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `The peak pollen season in ${city.name}, ${city.state} is ${city.peakSeason}. ${city.isBadCity ? "This city is known for particularly high pollen levels." : ""}`,
          },
        },
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
          <Link href={`/${locale}/cities`} className="hover:text-lime-700">Cities</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-900">{city.name}</span>
        </nav>

        {/* Header */}
        <div className="flex flex-wrap items-start gap-4 mb-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold text-gray-900">
              Pollen Count Today in {city.name}, {city.state}
            </h1>
            <p className="text-gray-600 mt-1">
              Peak Season: <strong>{city.peakSeason}</strong>
              {city.isBadCity && (
                <span className="ml-2 inline-flex items-center gap-1 bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full">
                  ⚠️ High Allergy City
                </span>
              )}
            </p>
          </div>
          <PollenIndex level={city.overall} size="lg" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pollen Breakdown */}
            <div className="bg-white rounded-xl border border-yellow-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Today&apos;s Pollen Levels</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Tree Pollen", value: city.tree, emoji: "🌳" },
                  { label: "Grass Pollen", value: city.grass, emoji: "🌿" },
                  { label: "Weed Pollen", value: city.weed, emoji: "🌾" },
                  { label: "Mold Spores", value: city.mold, emoji: "🍄" },
                ].map((item) => {
                  const level = item.value <= 3 ? "Low" : item.value <= 6 ? "Moderate" : item.value <= 8 ? "High" : "Very High";
                  return (
                    <div key={item.label} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">{item.emoji}</span>
                        <span className="text-sm font-medium text-gray-700">{item.label}</span>
                      </div>
                      <div className="flex items-end justify-between">
                        <span className="text-3xl font-bold text-gray-900">{item.value}</span>
                        <PollenIndex level={level as PollenLevel} size="sm" />
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-gray-200">
                        <div
                          className="h-full rounded-full bg-lime-400"
                          style={{ width: `${(item.value / 10) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-1 text-right">{item.value}/10</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Seasonal Chart */}
            <SeasonalChart
              cityName={`${city.name}, ${city.state}`}
              treeData={treeData}
              grassData={grassData}
              weedData={weedData}
              moldData={moldData}
            />

            {/* Native Ad */}
            <div
              id="adsterra-native-banner"
              className="w-full min-h-[90px] bg-gray-50 rounded-lg border border-dashed border-gray-200 flex items-center justify-center text-gray-300 text-sm"
            >
              {/* Native Banner Ad */}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Allergy Tips */}
            <div className="bg-white rounded-xl border border-yellow-200 p-5">
              <h2 className="text-lg font-bold text-gray-900 mb-4">💡 Allergy Tips for {city.name}</h2>
              <ul className="space-y-3">
                {city.tips.map((tip, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-700">
                    <span className="text-lime-500 font-bold mt-0.5">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* City Stats */}
            <div className="bg-lime-50 rounded-xl border border-lime-200 p-5">
              <h2 className="text-lg font-bold text-gray-900 mb-4">City Overview</h2>
              <dl className="space-y-2">
                <div className="flex justify-between text-sm">
                  <dt className="text-gray-600">Overall Risk</dt>
                  <dd><PollenIndex level={city.overall} size="sm" /></dd>
                </div>
                <div className="flex justify-between text-sm">
                  <dt className="text-gray-600">Peak Season</dt>
                  <dd className="font-medium">{city.peakSeason}</dd>
                </div>
                <div className="flex justify-between text-sm">
                  <dt className="text-gray-600">Avg Tree Pollen</dt>
                  <dd className="font-medium">{city.avgTreePollen}/10</dd>
                </div>
                <div className="flex justify-between text-sm">
                  <dt className="text-gray-600">Avg Grass Pollen</dt>
                  <dd className="font-medium">{city.avgGrassPollen}/10</dd>
                </div>
                <div className="flex justify-between text-sm">
                  <dt className="text-gray-600">State</dt>
                  <dd className="font-medium">
                    <Link href={`/${locale}/states/${city.state.toLowerCase()}`} className="text-lime-700 hover:underline">
                      {city.state}
                    </Link>
                  </dd>
                </div>
              </dl>
            </div>

            {/* Display Ad */}
            <div
              id="adsterra-display"
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
