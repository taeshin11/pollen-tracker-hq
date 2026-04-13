import { Metadata } from "next";
import Link from "next/link";
import { PollenIndex } from "@/components/PollenIndex";
import type { PollenLevel } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Pollen Forecast Guide — Seasonal Allergy Calendar | PollenTrackerHQ",
    description:
      "Understand seasonal pollen patterns across the US. Complete guide to spring tree pollen, summer grass pollen, fall ragweed, and winter cedar pollen.",
    alternates: {
      canonical: `https://pollen-tracker-hq.vercel.app/${locale}/forecast`,
    },
  };
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

const seasons = [
  {
    name: "Spring (March – May)",
    emoji: "🌸",
    bg: "bg-green-50 border-green-200",
    headerBg: "bg-green-100",
    allergens: ["Oak", "Birch", "Maple", "Elm", "Ash"],
    description:
      "Spring is the most intense allergy season for most Americans. Tree pollen dominates as deciduous trees burst into bloom. Counts can be extremely high on warm, dry, windy days.",
    tips: [
      "Start allergy medications 2 weeks before expected bloom",
      "Keep windows closed, use AC",
      "Shower and change clothes after outdoor activities",
      "Wear wrap-around sunglasses outdoors",
      "Check pollen counts before planning outdoor events",
    ],
    worstCities: ["Atlanta, GA", "Louisville, KY", "Knoxville, TN", "Richmond, VA", "Charlotte, NC"],
  },
  {
    name: "Summer (May – August)",
    emoji: "☀️",
    bg: "bg-yellow-50 border-yellow-200",
    headerBg: "bg-yellow-100",
    allergens: ["Timothy Grass", "Bermuda Grass", "Kentucky Bluegrass", "Ryegrass"],
    description:
      "Grass pollen takes over in late spring and peaks through summer. Agricultural states are particularly affected. Humid conditions can also trigger mold spore release.",
    tips: [
      "Avoid mowing lawns yourself",
      "Stay indoors during peak hours (5–10am)",
      "Take antihistamines before outdoor sports",
      "Rinse off after swimming in outdoor pools",
      "Monitor grass pollen counts via weather apps",
    ],
    worstCities: ["Kansas City, MO", "Wichita, KS", "Indianapolis, IN", "Columbus, OH", "Omaha, NE"],
  },
  {
    name: "Fall (August – October)",
    emoji: "🍂",
    bg: "bg-orange-50 border-orange-200",
    headerBg: "bg-orange-100",
    allergens: ["Ragweed", "Mugwort", "Lamb's Quarters", "Pigweed", "Dock"],
    description:
      "Ragweed is the dominant fall allergen, affecting up to 75% of pollen allergy sufferers. A single ragweed plant can produce 1 billion pollen grains. Its pollen can travel hundreds of miles.",
    tips: [
      "Monitor ragweed forecasts specifically",
      "Check pollen counts early morning",
      "Consider immunotherapy before next season",
      "Use nasal corticosteroid sprays consistently",
      "Keep car windows closed during commutes",
    ],
    worstCities: ["Oklahoma City, OK", "Tulsa, OK", "Nashville, TN", "Baltimore, MD", "Minneapolis, MN"],
  },
  {
    name: "Winter (December – February)",
    emoji: "❄️",
    bg: "bg-blue-50 border-blue-200",
    headerBg: "bg-blue-100",
    allergens: ["Mountain Cedar", "Juniper", "Alder"],
    description:
      "Most regions see relief in winter, but Texas and Oklahoma face 'cedar fever' from mountain cedar (Ashe juniper) pollen from December through February. Pacific Northwest has early alder pollen.",
    tips: [
      "Texas allergy sufferers: stock up on antihistamines in November",
      "Use nasal corticosteroids during cedar season",
      "Run air conditioning to filter indoor air",
      "Wear N95 masks on extreme cedar pollen days",
      "Most of the US can reduce allergy medications in winter",
    ],
    worstCities: ["Austin, TX", "San Antonio, TX", "Waco, TX", "Oklahoma City, OK"],
  },
];

const levelGuide: Array<{ level: PollenLevel; range: string; description: string }> = [
  { level: "Low", range: "0–3", description: "Unlikely to affect most allergy sufferers. Good time for outdoor activities." },
  { level: "Moderate", range: "4–6", description: "Some allergy sufferers may experience symptoms. Consider taking antihistamines." },
  { level: "High", range: "7–8", description: "Most allergy sufferers will experience symptoms. Limit outdoor time and take medications." },
  { level: "Very High", range: "9–10", description: "Extreme pollen levels. Sensitive individuals should stay indoors when possible." },
];

export default async function ForecastPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href={`/${locale}`} className="hover:text-lime-700">Home</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-900">Forecast Guide</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pollen Forecast Guide</h1>
        <p className="text-gray-600">
          Understanding seasonal pollen patterns across the United States to help you plan ahead.
        </p>
      </div>

      {/* Pollen Level Guide */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding the Pollen Index</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {levelGuide.map(({ level, range, description }) => (
            <div key={level} className="bg-white rounded-xl border border-yellow-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <PollenIndex level={level} size="md" />
                <span className="text-lg font-bold text-gray-600">{range}/10</span>
              </div>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Seasonal Guide */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Seasonal Allergy Calendar</h2>
        <div className="space-y-6">
          {seasons.map((season) => (
            <div key={season.name} className={`rounded-xl border ${season.bg} overflow-hidden`}>
              <div className={`${season.headerBg} px-6 py-4 flex items-center gap-3`}>
                <span className="text-3xl">{season.emoji}</span>
                <h3 className="text-xl font-bold text-gray-900">{season.name}</h3>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <p className="text-gray-700 mb-4">{season.description}</p>
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Primary Allergens:</h4>
                    <div className="flex flex-wrap gap-2">
                      {season.allergens.map((a) => (
                        <span key={a} className="px-2.5 py-1 bg-white rounded-full text-sm border border-gray-200 text-gray-700">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Management Tips:</h4>
                    <ul className="space-y-1">
                      {season.tips.map((tip, i) => (
                        <li key={i} className="flex gap-2 text-sm text-gray-700">
                          <span className="text-lime-500 font-bold">✓</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Worst Cities:</h4>
                  <ul className="space-y-1">
                    {season.worstCities.map((city) => (
                      <li key={city} className="text-sm text-gray-600 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                        {city}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              q: "What time of day is pollen highest?",
              a: "Pollen counts are typically highest in the morning (5–10am), especially on warm, dry, and windy days. Rainy or cloudy days usually have lower pollen counts as moisture weighs down pollen.",
            },
            {
              q: "Does rain help with pollen allergies?",
              a: "Yes, rain washes pollen out of the air, providing temporary relief. However, after the rain stops, pollen can rebound quickly. Also, high humidity can increase mold spore counts.",
            },
            {
              q: "Which cities in the US have the worst pollen?",
              a: "Consistently high-pollen cities include Atlanta, GA; Louisville, KY; Knoxville, TN; Chattanooga, TN; Nashville, TN; Richmond, VA; Charlotte, NC; and Oklahoma City, OK.",
            },
            {
              q: "Can you build immunity to pollen allergies?",
              a: "Allergen immunotherapy (allergy shots or sublingual drops) can help desensitize your immune system over time. Consult an allergist to see if you're a candidate.",
            },
          ].map(({ q, a }) => (
            <div key={q} className="bg-white rounded-xl border border-yellow-200 p-5">
              <h3 className="font-bold text-gray-900 mb-2">{q}</h3>
              <p className="text-gray-600 text-sm">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-lime-50 rounded-xl border border-lime-200 p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your City&apos;s Pollen Level</h2>
        <p className="text-gray-600 mb-6">Find real-time pollen data for 60+ major US cities</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/${locale}/cities`}
            className="px-6 py-3 bg-lime-500 hover:bg-lime-600 text-white font-semibold rounded-xl transition-colors"
          >
            Browse All Cities
          </Link>
          <Link
            href={`/${locale}/allergens`}
            className="px-6 py-3 bg-white hover:bg-lime-50 text-lime-700 border border-lime-300 font-semibold rounded-xl transition-colors"
          >
            Allergen Guide
          </Link>
        </div>
      </div>
    </div>
  );
}
