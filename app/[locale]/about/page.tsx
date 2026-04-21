import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "About PollenTrackerHQ — Daily Pollen Count & Allergy Forecast",
    description:
      "PollenTrackerHQ provides daily pollen count forecasts for tree, grass, and weed pollen across 500+ US cities. Learn how we help allergy sufferers plan smarter.",
    alternates: {
      canonical: `https://pollen-tracker-hq.vercel.app/${locale}/about`,
      languages: {
        en: "https://pollen-tracker-hq.vercel.app/en/about",
        ko: "https://pollen-tracker-hq.vercel.app/ko/about",
        ja: "https://pollen-tracker-hq.vercel.app/ja/about",
        zh: "https://pollen-tracker-hq.vercel.app/zh/about",
        es: "https://pollen-tracker-hq.vercel.app/es/about",
        fr: "https://pollen-tracker-hq.vercel.app/fr/about",
        de: "https://pollen-tracker-hq.vercel.app/de/about",
        pt: "https://pollen-tracker-hq.vercel.app/pt/about",
        "x-default": "https://pollen-tracker-hq.vercel.app/en/about",
      },
    },
    openGraph: {
      title: "About PollenTrackerHQ — Daily Pollen Count & Allergy Forecast",
      description:
        "Daily pollen count forecasts for tree, grass, and weed pollen across 500+ US cities. Helping allergy sufferers plan smarter every day.",
      url: `https://pollen-tracker-hq.vercel.app/${locale}/about`,
      siteName: "PollenTrackerHQ",
      type: "website",
    },
  };
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href={`/${locale}`} className="hover:text-lime-700">Home</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-900">About</span>
      </nav>

      {/* Hero */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">About PollenTrackerHQ</h1>
        <p className="text-lg text-gray-600">
          Your daily pollen count and allergy forecast companion — covering 500+ US cities so you can breathe easier and plan smarter.
        </p>
      </div>

      {/* Mission */}
      <section className="card mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
        <p className="text-gray-700 mb-4">
          PollenTrackerHQ was built for the millions of Americans who suffer from seasonal and year-round pollen allergies. Our goal is simple: give you accurate, up-to-date pollen information before you walk out the door, so you can decide when to exercise outdoors, when to take your antihistamine, and when to keep your windows closed.
        </p>
        <p className="text-gray-700">
          We believe allergy management should be proactive, not reactive. By providing free, easy-to-understand daily pollen forecasts, we help allergy sufferers reclaim control over their schedules and quality of life.
        </p>
      </section>

      {/* What We Track */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">What We Track</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              emoji: "🌳",
              title: "Tree Pollen",
              desc: "Oak, birch, maple, elm, ash, cedar, and 20+ more tree species. Peaks in spring (March–May) across most of the US, though Southern states see earlier blooms.",
            },
            {
              emoji: "🌾",
              title: "Grass Pollen",
              desc: "Timothy, Bermuda, Kentucky bluegrass, and ryegrass. Grass pollen season runs late spring through summer (May–August), with the highest counts in Midwestern agricultural regions.",
            },
            {
              emoji: "🌿",
              title: "Weed Pollen",
              desc: "Ragweed is the most potent fall allergen, affecting up to 75% of pollen allergy sufferers. Mugwort, pigweed, and lamb's quarters are also tracked through August–October.",
            },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-xl border border-yellow-200 p-5">
              <div className="text-3xl mb-3">{item.emoji}</div>
              <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Data Sources */}
      <section className="card mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Data Sources</h2>
        <p className="text-gray-700 mb-4">
          PollenTrackerHQ aggregates pollen data from multiple trusted sources to provide the most accurate daily forecasts:
        </p>
        <ul className="space-y-3">
          {[
            {
              source: "American Academy of Allergy, Asthma & Immunology (AAAAI)",
              detail:
                "The AAAAI's National Allergy Bureau operates a certified network of pollen counting stations across the US, providing some of the most reliable surface-level pollen counts available.",
            },
            {
              source: "National Weather Service & NOAA",
              detail:
                "Meteorological data — including wind speed, humidity, temperature, and precipitation — is essential for forecasting pollen dispersal and concentration.",
            },
            {
              source: "Certified Pollen Monitoring Stations",
              detail:
                "Trained analysts at certified stations use volumetric air samplers to physically count pollen grains and identify species, providing ground-truth data for our models.",
            },
            {
              source: "University Research Programs",
              detail:
                "Ongoing research from universities and medical schools contributes to our understanding of pollen seasonality, climate shifts, and allergen potency.",
            },
          ].map((item) => (
            <li key={item.source} className="flex gap-3">
              <span className="text-lime-500 font-bold mt-0.5">✓</span>
              <div>
                <span className="font-semibold text-gray-800">{item.source}: </span>
                <span className="text-gray-600 text-sm">{item.detail}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Coverage */}
      <section className="card mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Coverage</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {[
            { number: "500+", label: "US Cities" },
            { number: "50", label: "States Covered" },
            { number: "3", label: "Pollen Types" },
            { number: "Daily", label: "Update Frequency" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-lime-600">{stat.number}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
        <p className="text-gray-700 text-sm">
          From major metros like New York, Los Angeles, and Chicago to smaller cities like Knoxville, Waco, and Boise, we strive to provide meaningful pollen data wherever allergy sufferers live.
        </p>
      </section>

      {/* Who We Help */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Who We Help</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {
              emoji: "🏃",
              title: "Outdoor Athletes & Fitness Enthusiasts",
              desc: "Runners, cyclists, and outdoor sport players use PollenTrackerHQ to schedule workouts on lower-pollen days or hours.",
            },
            {
              emoji: "👨‍👩‍👧",
              title: "Parents of Allergy-Prone Children",
              desc: "Plan school pickup, outdoor play, and sports practices around daily pollen forecasts to minimize children's exposure.",
            },
            {
              emoji: "💊",
              title: "Allergy Medication Planners",
              desc: "Many antihistamines work best when taken before exposure. Knowing tomorrow's forecast helps you time your medication correctly.",
            },
            {
              emoji: "🪟",
              title: "Home & Window Managers",
              desc: "Decide when to open windows for fresh air and when to keep them shut — especially important during peak morning pollen hours.",
            },
          ].map((item) => (
            <div key={item.title} className="bg-lime-50 rounded-xl border border-lime-200 p-5 flex gap-4">
              <span className="text-3xl">{item.emoji}</span>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 mb-8">
        <h3 className="font-bold text-gray-800 mb-2">Medical Disclaimer</h3>
        <p className="text-sm text-gray-600">
          PollenTrackerHQ provides pollen forecast data for informational purposes only. Our data is not a substitute for professional medical advice, diagnosis, or treatment. If you suffer from allergies, asthma, or related conditions, please consult a board-certified allergist or healthcare provider for personalized guidance and treatment plans.
        </p>
      </div>

      {/* CTA */}
      <div className="bg-lime-50 rounded-xl border border-lime-200 p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your City&apos;s Pollen Level</h2>
        <p className="text-gray-600 mb-6">Real-time pollen data for 500+ US cities, updated daily</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/${locale}/cities`}
            className="px-6 py-3 bg-lime-500 hover:bg-lime-600 text-white font-semibold rounded-xl transition-colors"
          >
            Browse All Cities
          </Link>
          <Link
            href={`/${locale}/how-to-use`}
            className="px-6 py-3 bg-white hover:bg-lime-50 text-lime-700 border border-lime-300 font-semibold rounded-xl transition-colors"
          >
            How to Use This Site
          </Link>
        </div>
      </div>
    </div>
  );
}
