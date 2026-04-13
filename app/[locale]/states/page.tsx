import { Metadata } from "next";
import Link from "next/link";
import { PollenIndex } from "@/components/PollenIndex";
import states from "@/data/states-fallback.json";
import type { PollenLevel } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Pollen Levels by State — PollenTrackerHQ",
    description:
      "Browse pollen data for all 50 US states. Seasonal pollen calendars, primary allergens, and allergy risk ratings for every state.",
    alternates: {
      canonical: `https://pollen-tracker-hq.vercel.app/${locale}/states`,
    },
  };
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

const regionColors: Record<string, string> = {
  Southeast: "bg-red-50 border-red-200",
  South: "bg-orange-50 border-orange-200",
  Midwest: "bg-yellow-50 border-yellow-200",
  Plains: "bg-amber-50 border-amber-200",
  "Mid-Atlantic": "bg-blue-50 border-blue-200",
  Northeast: "bg-indigo-50 border-indigo-200",
  Pacific: "bg-green-50 border-green-200",
  Mountain: "bg-teal-50 border-teal-200",
  Southwest: "bg-purple-50 border-purple-200",
};

export default async function StatesPage({ params }: PageProps) {
  const { locale } = await params;

  const typedStates = states as Array<typeof states[0] & { overallRating: PollenLevel }>;

  // Group by region
  const byRegion: Record<string, typeof typedStates> = {};
  for (const s of typedStates) {
    if (!byRegion[s.region]) byRegion[s.region] = [];
    byRegion[s.region].push(s);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href={`/${locale}`} className="hover:text-lime-700">Home</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-900">States</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pollen Levels by State</h1>
        <p className="text-gray-600">
          Seasonal pollen calendars and allergy risk ratings for all 50 US states.
        </p>
      </div>

      {/* Overall stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {(["Very High", "High", "Moderate", "Low"] as PollenLevel[]).map((level) => {
          const count = typedStates.filter((s) => s.overallRating === level).length;
          const levelClasses: Record<PollenLevel, string> = {
            "Very High": "pollen-very-high",
            High: "pollen-high",
            Moderate: "pollen-moderate",
            Low: "pollen-low",
          };
          return (
            <div key={level} className={`rounded-xl border p-4 text-center ${levelClasses[level]}`}>
              <div className="text-2xl font-bold">{count} states</div>
              <div className="text-sm font-medium">{level}</div>
            </div>
          );
        })}
      </div>

      {/* By Region */}
      {Object.entries(byRegion).map(([region, regionStates]) => (
        <div key={region} className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">{region}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {regionStates.map((state) => (
              <Link
                key={state.code}
                href={`/${locale}/states/${state.code.toLowerCase()}`}
                className={`rounded-xl border p-4 hover:shadow-md transition-all hover:border-lime-300 ${regionColors[region] || "bg-gray-50 border-gray-200"}`}
              >
                <div className="font-bold text-lg text-gray-800">{state.code}</div>
                <div className="text-sm text-gray-600 mb-2">{state.name}</div>
                <PollenIndex level={state.overallRating} size="sm" />
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
