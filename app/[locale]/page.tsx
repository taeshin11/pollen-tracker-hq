import { Metadata } from "next";
import Link from "next/link";
import { PollenCard } from "@/components/PollenCard";
import { PollenIndex } from "@/components/PollenIndex";
import cities from "@/data/cities-fallback.json";
import type { PollenLevel } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "PollenTrackerHQ — Daily Pollen Forecast by City",
    description:
      "Check today's pollen levels for 60+ major US cities. Tree, grass, weed, and mold pollen index updated daily. Know before you go outside.",
    alternates: {
      canonical: `https://pollen-tracker-hq.vercel.app/${locale}`,
      languages: {
        en: "https://pollen-tracker-hq.vercel.app/en",
        ko: "https://pollen-tracker-hq.vercel.app/ko",
        ja: "https://pollen-tracker-hq.vercel.app/ja",
        zh: "https://pollen-tracker-hq.vercel.app/zh",
        es: "https://pollen-tracker-hq.vercel.app/es",
        fr: "https://pollen-tracker-hq.vercel.app/fr",
        de: "https://pollen-tracker-hq.vercel.app/de",
        pt: "https://pollen-tracker-hq.vercel.app/pt",
        "x-default": "https://pollen-tracker-hq.vercel.app/en",
      },
    },
    openGraph: {
      title: "PollenTrackerHQ — Daily Pollen Forecast by City",
      description: "Know your pollen risk before you step outside.",
      url: `https://pollen-tracker-hq.vercel.app/${locale}`,
      siteName: "PollenTrackerHQ",
      type: "website",
    },
  };
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

const levelOrder: Record<string, number> = {
  "Very High": 4,
  High: 3,
  Moderate: 2,
  Low: 1,
};

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;

  const typedCities = cities as Array<typeof cities[0] & { overall: PollenLevel }>;
  const worstCities = [...typedCities]
    .sort((a, b) => (levelOrder[b.overall] || 0) - (levelOrder[a.overall] || 0))
    .slice(0, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://pollen-tracker-hq.vercel.app/#website",
        url: "https://pollen-tracker-hq.vercel.app/",
        name: "PollenTrackerHQ",
        description: "Daily pollen forecast by city — know before you go outside",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://pollen-tracker-hq.vercel.app/en/cities?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is a pollen index?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A pollen index measures the concentration of pollen grains in the air. Levels range from Low (1-3) to Very High (9-10), indicating the likelihood of triggering allergy symptoms.",
            },
          },
          {
            "@type": "Question",
            name: "Which US cities have the highest pollen levels?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Cities with consistently very high pollen include Atlanta GA, Louisville KY, Knoxville TN, Chattanooga TN, Nashville TN, Richmond VA, and Charlotte NC.",
            },
          },
          {
            "@type": "Question",
            name: "When is pollen season in the United States?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Tree pollen peaks in spring (March-May), grass pollen in summer (May-August), and weed pollen (especially ragweed) in fall (August-October). Some regions like Texas have cedar/juniper pollen in winter.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-lime-50 to-yellow-50 border-b border-yellow-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-lime-100 text-lime-700 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-lime-500 rounded-full animate-pulse" />
            Updated Daily
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Daily Pollen Forecast
            <span className="block text-lime-600 mt-1">by City</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Know your pollen risk before you step outside. Track tree, grass, weed, and mold pollen for 60+ US cities.
          </p>

          {/* Search bar */}
          <form action={`/${locale}/cities`} className="max-w-lg mx-auto mb-8">
            <div className="flex gap-2">
              <input
                type="text"
                name="q"
                placeholder="Search for a city..."
                className="flex-1 px-4 py-3 rounded-xl border-2 border-yellow-200 focus:border-lime-400 focus:outline-none bg-white text-gray-900 placeholder-gray-400"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-lime-500 hover:bg-lime-600 text-white font-semibold rounded-xl transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* Pollen level legend */}
          <div className="flex flex-wrap justify-center gap-3">
            {(["Low", "Moderate", "High", "Very High"] as PollenLevel[]).map((level) => (
              <PollenIndex key={level} level={level} size="sm" />
            ))}
          </div>
        </div>
      </section>

      {/* Worst Cities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Today&apos;s Worst Cities for Pollen</h2>
            <p className="text-gray-500 mt-1">Cities currently with the highest pollen levels</p>
          </div>
          <Link
            href={`/${locale}/cities`}
            className="text-sm font-medium text-lime-700 hover:text-lime-800 transition-colors"
          >
            View all cities →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {worstCities.map((city, i) => (
            <PollenCard
              key={city.slug}
              city={city as typeof city & { overall: PollenLevel }}
              locale={locale}
              rank={i + 1}
            />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-lime-50 border-y border-yellow-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Why Use PollenTrackerHQ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                emoji: "📊",
                title: "Real-Time Data",
                desc: "Updated daily pollen counts for 60+ major US cities using the latest available data.",
              },
              {
                emoji: "🌱",
                title: "Allergen Breakdown",
                desc: "Separate tracking for tree, grass, weed, and mold pollen — know exactly what's affecting you.",
              },
              {
                emoji: "💡",
                title: "Expert Tips",
                desc: "City-specific allergy management advice to help you plan your outdoor activities.",
              },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-xl border border-yellow-200 p-6 text-center">
                <div className="text-4xl mb-3">{f.emoji}</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Explore Pollen Data</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href={`/${locale}/cities`}
            className="group bg-white rounded-xl border-2 border-yellow-200 hover:border-lime-400 p-6 text-center transition-all hover:shadow-md"
          >
            <div className="text-4xl mb-3">🏙️</div>
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-lime-700 mb-2">
              Browse All Cities
            </h3>
            <p className="text-gray-500 text-sm">Compare pollen levels across 60+ US cities</p>
          </Link>
          <Link
            href={`/${locale}/states`}
            className="group bg-white rounded-xl border-2 border-yellow-200 hover:border-lime-400 p-6 text-center transition-all hover:shadow-md"
          >
            <div className="text-4xl mb-3">🗺️</div>
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-lime-700 mb-2">
              Browse by State
            </h3>
            <p className="text-gray-500 text-sm">Seasonal pollen calendars for all 50 states</p>
          </Link>
          <Link
            href={`/${locale}/allergens`}
            className="group bg-white rounded-xl border-2 border-yellow-200 hover:border-lime-400 p-6 text-center transition-all hover:shadow-md"
          >
            <div className="text-4xl mb-3">🌻</div>
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-lime-700 mb-2">
              Allergen Guide
            </h3>
            <p className="text-gray-500 text-sm">Learn about 15+ allergen types and their peak seasons</p>
          </Link>
        </div>
      </section>

      {/* Native Ad Placeholder */}
      <div
        id="adsterra-native-banner"
        className="w-full max-w-7xl mx-auto px-4 my-4 min-h-[90px] bg-gray-50 rounded-lg border border-dashed border-gray-200 flex items-center justify-center text-gray-300 text-sm"
      >
        {/* Native Banner Ad */}
      </div>
    </>
  );
}
