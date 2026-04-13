import { Metadata } from "next";
import { CityTable } from "@/components/CityTable";
import cities from "@/data/cities-fallback.json";
import type { PollenLevel } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "All Cities Pollen Rankings — PollenTrackerHQ",
    description:
      "Compare pollen levels across 60+ major US cities. See which cities have the highest and lowest pollen counts for tree, grass, weed, and mold.",
    alternates: {
      canonical: `https://pollen-tracker-hq.vercel.app/${locale}/cities`,
    },
  };
}

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}

const levelOrder: Record<string, number> = {
  "Very High": 4,
  High: 3,
  Moderate: 2,
  Low: 1,
};

export default async function CitiesPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const { q } = await searchParams;

  const typedCities = cities as Array<typeof cities[0] & { overall: PollenLevel }>;

  const filtered = q
    ? typedCities.filter(
        (c) =>
          c.name.toLowerCase().includes(q.toLowerCase()) ||
          c.state.toLowerCase().includes(q.toLowerCase())
      )
    : typedCities;

  const sorted = [...filtered].sort(
    (a, b) => (levelOrder[b.overall] || 0) - (levelOrder[a.overall] || 0)
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "US Cities Pollen Rankings",
    description: "Pollen levels ranked by severity across major US cities",
    numberOfItems: sorted.length,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <nav className="text-sm text-gray-500 mb-4">
            <a href={`/${locale}`} className="hover:text-lime-700">Home</a>
            <span className="mx-2">›</span>
            <span className="text-gray-900">Cities</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Cities — Pollen Rankings</h1>
          <p className="text-gray-600">
            Compare pollen levels across {cities.length} major US cities, ranked by severity.
          </p>
        </div>

        {/* Search */}
        <form className="mb-6">
          <div className="flex gap-2 max-w-md">
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Filter by city or state..."
              className="flex-1 px-4 py-2.5 rounded-xl border-2 border-yellow-200 focus:border-lime-400 focus:outline-none bg-white"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-lime-500 hover:bg-lime-600 text-white font-semibold rounded-xl transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {(["Very High", "High", "Moderate", "Low"] as PollenLevel[]).map((level) => {
            const count = typedCities.filter((c) => c.overall === level).length;
            const levelClasses: Record<PollenLevel, string> = {
              "Very High": "pollen-very-high",
              High: "pollen-high",
              Moderate: "pollen-moderate",
              Low: "pollen-low",
            };
            return (
              <div
                key={level}
                className={`rounded-xl border p-4 text-center ${levelClasses[level]}`}
              >
                <div className="text-2xl font-bold">{count}</div>
                <div className="text-sm font-medium">{level}</div>
              </div>
            );
          })}
        </div>

        {/* Table */}
        {sorted.length > 0 ? (
          <CityTable cities={sorted} locale={locale} />
        ) : (
          <div className="text-center py-12 text-gray-500">
            No cities found matching &ldquo;{q}&rdquo;
          </div>
        )}
      </div>
    </>
  );
}
