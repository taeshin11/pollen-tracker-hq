import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MONTH_NAMES, FULL_MONTH_NAMES } from "@/lib/utils";
import allergens from "@/data/allergens-fallback.json";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

type AllergenData = typeof allergens[0];

function getAllergen(slug: string): AllergenData | undefined {
  return allergens.find((a) => a.slug === slug);
}

export async function generateStaticParams() {
  return allergens.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const allergen = getAllergen(slug);
  if (!allergen) return { title: "Allergen Not Found" };

  return {
    title: `${allergen.name} — Symptoms, Peak Season & Tips | PollenTrackerHQ`,
    description: `Learn about ${allergen.name}: symptoms, peak season (${allergen.peakSeason}), and prevention tips. Affects states: ${allergen.affectedStates.join(", ")}.`,
    alternates: {
      canonical: `https://pollen-tracker-hq.vercel.app/${locale}/allergens/${slug}`,
    },
  };
}

const categoryIcons: Record<string, string> = {
  tree: "🌳",
  grass: "🌿",
  weed: "🌾",
  mold: "🍄",
};

const seasonColors: Record<string, string> = {
  Spring: "bg-green-100 text-green-800",
  Summer: "bg-yellow-100 text-yellow-800",
  Fall: "bg-orange-100 text-orange-800",
  Winter: "bg-blue-100 text-blue-800",
};

export default async function AllergenDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const allergen = getAllergen(slug);

  if (!allergen) notFound();

  const icon = categoryIcons[allergen.category] || "🌱";
  const seasonClass = seasonColors[allergen.peakSeason] || "bg-gray-100 text-gray-800";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${allergen.name} — Allergy Guide`,
    url: `https://pollen-tracker-hq.vercel.app/${locale}/allergens/${slug}`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `https://pollen-tracker-hq.vercel.app/${locale}` },
        { "@type": "ListItem", position: 2, name: "Allergens", item: `https://pollen-tracker-hq.vercel.app/${locale}/allergens` },
        { "@type": "ListItem", position: 3, name: allergen.name },
      ],
    },
    mainEntity: {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: `When is ${allergen.name} season?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `${allergen.name} peaks in ${allergen.peakSeason}, specifically in ${allergen.peakMonths.map((m) => FULL_MONTH_NAMES[m - 1]).join(", ")}.`,
          },
        },
        {
          "@type": "Question",
          name: `What are the symptoms of ${allergen.name} allergy?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `Common symptoms include: ${allergen.symptoms.join(", ")}.`,
          },
        },
        {
          "@type": "Question",
          name: `How to manage ${allergen.name} allergy?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: allergen.prevention.join(" "),
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
          <Link href={`/${locale}/allergens`} className="hover:text-lime-700">Allergens</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-900">{allergen.name}</span>
        </nav>

        {/* Header */}
        <div className="flex items-start gap-4 mb-8">
          <span className="text-5xl">{icon}</span>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{allergen.name}</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className={`text-sm px-3 py-1 rounded-full font-medium ${seasonClass}`}>
                Peak: {allergen.peakSeason}
              </span>
              <span className="text-sm px-3 py-1 rounded-full font-medium bg-gray-100 text-gray-700 capitalize">
                {allergen.category} allergen
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white rounded-xl border border-yellow-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">About {allergen.name}</h2>
              <p className="text-gray-700 leading-relaxed">{allergen.description}</p>
            </div>

            {/* Peak Season Calendar */}
            <div className="bg-white rounded-xl border border-yellow-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Peak Season Calendar</h2>
              <div className="grid grid-cols-12 gap-1">
                {MONTH_NAMES.map((month, i) => {
                  const isPeak = allergen.peakMonths.includes(i + 1);
                  return (
                    <div key={month} className="text-center">
                      <div className="text-xs text-gray-500 mb-1">{month}</div>
                      <div
                        className={`h-8 rounded ${isPeak ? "bg-red-400" : "bg-green-200"}`}
                        title={isPeak ? `Peak ${allergen.name} month` : "Lower activity"}
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

            {/* Symptoms */}
            <div className="bg-white rounded-xl border border-yellow-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Common Symptoms</h2>
              <div className="grid grid-cols-2 gap-3">
                {allergen.symptoms.map((symptom) => (
                  <div key={symptom} className="flex items-center gap-2 text-gray-700">
                    <span className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0" />
                    <span className="text-sm">{symptom}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Native Ad */}
            <div className="w-full min-h-[90px] bg-gray-50 rounded-lg border border-dashed border-gray-200 flex items-center justify-center text-gray-300 text-sm">
              {/* Native Banner Ad */}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Prevention Tips */}
            <div className="bg-white rounded-xl border border-yellow-200 p-5">
              <h2 className="text-lg font-bold text-gray-900 mb-4">💡 Prevention Tips</h2>
              <ul className="space-y-3">
                {allergen.prevention.map((tip, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-700">
                    <span className="text-lime-500 font-bold mt-0.5">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Affected States */}
            <div className="bg-lime-50 rounded-xl border border-lime-200 p-5">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Most Affected States</h2>
              <div className="flex flex-wrap gap-2">
                {allergen.affectedStates.map((state) => (
                  <Link
                    key={state}
                    href={`/${locale}/states/${state.toLowerCase()}`}
                    className="px-2.5 py-1 bg-white border border-lime-200 rounded-lg text-sm font-semibold text-lime-700 hover:bg-lime-100 transition-colors"
                  >
                    {state}
                  </Link>
                ))}
              </div>
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
