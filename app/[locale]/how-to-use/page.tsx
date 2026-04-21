import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "How to Use PollenTrackerHQ — Pollen Count FAQ & Guide",
    description:
      "Learn how to read pollen counts, understand allergy seasons, reduce pollen exposure, and find the best medications. Complete pollen allergy FAQ.",
    alternates: {
      canonical: `https://pollen-tracker-hq.vercel.app/${locale}/how-to-use`,
      languages: {
        en: "https://pollen-tracker-hq.vercel.app/en/how-to-use",
        ko: "https://pollen-tracker-hq.vercel.app/ko/how-to-use",
        ja: "https://pollen-tracker-hq.vercel.app/ja/how-to-use",
        zh: "https://pollen-tracker-hq.vercel.app/zh/how-to-use",
        es: "https://pollen-tracker-hq.vercel.app/es/how-to-use",
        fr: "https://pollen-tracker-hq.vercel.app/fr/how-to-use",
        de: "https://pollen-tracker-hq.vercel.app/de/how-to-use",
        pt: "https://pollen-tracker-hq.vercel.app/pt/how-to-use",
        "x-default": "https://pollen-tracker-hq.vercel.app/en/how-to-use",
      },
    },
    openGraph: {
      title: "How to Use PollenTrackerHQ — Pollen Count FAQ & Guide",
      description:
        "Complete guide to reading pollen counts, understanding allergy seasons, and reducing exposure. Answers to 10 common pollen allergy questions.",
      url: `https://pollen-tracker-hq.vercel.app/${locale}/how-to-use`,
      siteName: "PollenTrackerHQ",
      type: "website",
    },
  };
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

const faqs = [
  {
    q: "What is a pollen count?",
    a: "A pollen count measures the concentration of pollen grains in a cubic meter of air over a 24-hour period, usually expressed as grains per cubic meter (g/m³). Trained analysts use volumetric air samplers — devices that continuously pull air through a sticky medium — and then examine the samples under a microscope to identify and count pollen grains by species. PollenTrackerHQ translates raw counts into an easy-to-understand 1–10 index with color-coded levels: Low, Moderate, High, and Very High.",
  },
  {
    q: "What is a good vs bad pollen count?",
    a: "Pollen counts are divided into four categories on the 1–10 index. Low (1–3): Most allergy sufferers experience few or no symptoms. A great time for outdoor activities. Moderate (4–6): Sensitive individuals may notice mild symptoms such as sneezing or itchy eyes. Consider taking antihistamines before going outside. High (7–8): Most pollen allergy sufferers will experience noticeable symptoms. Limit prolonged outdoor exposure, especially in the morning hours. Very High (9–10): Extremely elevated pollen levels. Those with moderate to severe allergies should minimize time outdoors and keep windows closed. Even people without diagnosed allergies may experience irritation.",
  },
  {
    q: "What types of pollen are tracked?",
    a: "PollenTrackerHQ tracks three major categories of pollen. Tree pollen includes species like oak, birch, maple, elm, ash, cedar, and juniper — most active in spring. Grass pollen includes Timothy grass, Bermuda grass, Kentucky bluegrass, and ryegrass — most active in late spring and summer. Weed pollen includes ragweed (the most potent and widespread fall allergen), mugwort, pigweed, and lamb's quarters — most active in late summer and fall. Each city page shows separate readings for each category so you can identify your personal triggers.",
  },
  {
    q: "When is pollen season?",
    a: "Pollen season varies by region and pollen type. Tree pollen season runs from February to May across most of the US, starting earlier in the South (January in Florida and Texas) and later in the North (April in New England and the Pacific Northwest). Grass pollen season runs from May to August, with peaks in June and July, and is especially intense in agricultural states like Kansas, Oklahoma, and Indiana. Weed pollen season runs from August to October, with ragweed being the most problematic allergen. One exception is mountain cedar (juniper) in Texas and Oklahoma, which pollinates heavily from December through February — a phenomenon known as 'cedar fever.'",
  },
  {
    q: "Which cities have the worst pollen?",
    a: "The Asthma and Allergy Foundation of America (AAFA) regularly rates US cities for allergy burden. Cities consistently ranked among the worst for pollen include Atlanta, GA; Louisville, KY; Knoxville, TN; Chattanooga, TN; Memphis, TN; Richmond, VA; Oklahoma City, OK; Tulsa, OK; Wichita, KS; and Charlotte, NC. Southern cities tend to rank highest because their long, warm growing seasons allow for extended tree, grass, and weed pollen overlap. You can compare pollen levels across 500+ US cities on PollenTrackerHQ.",
  },
  {
    q: "What are symptoms of pollen allergy?",
    a: "Pollen allergy (allergic rhinitis) symptoms include nasal congestion and runny nose, sneezing (often in rapid bursts), itchy, watery, or red eyes (allergic conjunctivitis), itchy throat or ears, post-nasal drip and coughing, headaches or facial pressure from sinus congestion, fatigue (sometimes called 'brain fog') from poor sleep and constant immune response, and asthma flare-ups in people with both conditions. Symptoms typically worsen on warm, dry, and windy days when pollen dispersal is greatest, and improve on rainy or overcast days. If you experience severe symptoms, shortness of breath, or reactions that affect your daily life, consult an allergist.",
  },
  {
    q: "How can I reduce pollen exposure?",
    a: "There are several effective strategies to reduce pollen exposure. Check pollen counts daily — this is the first step. On High or Very High days, limit outdoor time, especially in the morning (5–10am) when pollen levels peak. Keep windows and doors closed on high-pollen days and use air conditioning instead. Shower and change clothes after spending time outdoors to remove pollen from your hair and skin. Wear wrap-around sunglasses when outdoors to protect your eyes. Avoid mowing lawns yourself — if you must, wear an N95 mask. Dry laundry indoors during high-pollen periods, as pollen can collect on clothes and bedding. Check pollen forecasts before planning outdoor events, picnics, or exercise sessions.",
  },
  {
    q: "Do air purifiers help with pollen?",
    a: "Yes — HEPA (High-Efficiency Particulate Air) purifiers are highly effective at capturing pollen indoors. HEPA filters remove 99.97% of airborne particles 0.3 microns or larger. Most pollen grains are 10–100 microns in size, making them easy targets for HEPA filtration. For best results, place purifiers in rooms where you spend the most time — especially the bedroom. Run the purifier continuously on moderate or high settings during pollen season. Change filters per the manufacturer's schedule. Also make sure your HVAC system uses a high-MERV-rated filter, and change it every 1–3 months during peak allergy season.",
  },
  {
    q: "What medications help with pollen allergies?",
    a: "Several over-the-counter and prescription options are effective for pollen allergy. Oral antihistamines (e.g., cetirizine/Zyrtec, fexofenadine/Allegra, loratadine/Claritin) reduce sneezing, itching, and runny nose. Non-drowsy formulas are available. Nasal corticosteroid sprays (e.g., fluticasone/Flonase, budesonide/Rhinocort) are considered the most effective first-line treatment for allergic rhinitis. They reduce nasal inflammation and congestion. Use daily for best effect. Antihistamine eye drops (e.g., olopatadine/Pataday) directly relieve itchy, watery eyes. Decongestants (e.g., pseudoephedrine/Sudafed) relieve nasal congestion but should not be used long-term. Allergen immunotherapy (allergy shots or sublingual tablets/drops) can desensitize your immune system over time and provide long-term relief. Consult a board-certified allergist for a treatment plan tailored to your specific allergen profile.",
  },
  {
    q: "Is pollen count different indoors?",
    a: "Yes — indoor pollen concentrations are generally much lower than outdoor levels, but not zero. Pollen enters homes through open windows and doors, on clothing, skin, and hair, and through HVAC systems without proper filtration. Studies show indoor pollen is typically 5–10% of outdoor levels with windows closed, but can rise to 30–50% of outdoor levels with windows open. Central air conditioning with a quality filter is one of the best ways to keep indoor pollen levels low. HEPA air purifiers provide additional protection, especially in bedrooms. Regularly vacuuming with a HEPA-filter vacuum and washing bedding in hot water weekly also significantly reduces indoor pollen accumulation.",
  },
];

export default async function HowToUsePage({ params }: PageProps) {
  const { locale } = await params;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: a,
      },
    })),
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href={`/${locale}`} className="hover:text-lime-700">Home</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-900">How to Use</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          How to Use PollenTrackerHQ
        </h1>
        <p className="text-lg text-gray-600">
          A complete guide to reading pollen counts, understanding allergy seasons, and managing pollen exposure — plus answers to the most common pollen allergy questions.
        </p>
      </div>

      {/* Quick start */}
      <section className="card mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Start Guide</h2>
        <ol className="space-y-4">
          {[
            {
              step: "1",
              title: "Find your city",
              desc: 'Use the search bar on the homepage or browse our Cities index to locate your city. We cover 500+ US cities from major metros to smaller towns.',
            },
            {
              step: "2",
              title: "Check today's pollen index",
              desc: "Each city page shows a 1–10 pollen index for tree, grass, and weed pollen. Color-coded levels (Low / Moderate / High / Very High) make it easy to assess risk at a glance.",
            },
            {
              step: "3",
              title: "Review the 5-day forecast",
              desc: "See how pollen levels are expected to change over the next five days so you can plan outdoor activities, medication schedules, and window-opening decisions in advance.",
            },
            {
              step: "4",
              title: "Read city-specific allergy tips",
              desc: "Each city page includes tailored advice based on local dominant allergens, geography, and typical seasonal patterns.",
            },
          ].map((item) => (
            <li key={item.step} className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-lime-100 text-lime-700 rounded-full flex items-center justify-center font-bold text-sm">
                {item.step}
              </span>
              <div>
                <span className="font-semibold text-gray-800">{item.title}: </span>
                <span className="text-gray-600 text-sm">{item.desc}</span>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-5">
          {faqs.map(({ q, a }) => (
            <div key={q} className="bg-white rounded-xl border border-yellow-200 p-6">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">{q}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-lime-50 rounded-xl border border-lime-200 p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to Check Your Pollen Level?</h2>
        <p className="text-gray-600 mb-6">Search 500+ US cities and get today&apos;s forecast in seconds</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/${locale}/cities`}
            className="px-6 py-3 bg-lime-500 hover:bg-lime-600 text-white font-semibold rounded-xl transition-colors"
          >
            Browse All Cities
          </Link>
          <Link
            href={`/${locale}/forecast`}
            className="px-6 py-3 bg-white hover:bg-lime-50 text-lime-700 border border-lime-300 font-semibold rounded-xl transition-colors"
          >
            Seasonal Forecast Guide
          </Link>
        </div>
      </div>
    </div>
  );
}
