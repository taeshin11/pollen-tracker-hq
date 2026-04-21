import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Terms of Use | PollenTrackerHQ",
    description:
      "Read the PollenTrackerHQ terms of use. Pollen forecasts are estimates for informational purposes only and not a substitute for medical advice.",
    alternates: {
      canonical: `https://pollen-tracker-hq.vercel.app/${locale}/terms`,
      languages: {
        en: "https://pollen-tracker-hq.vercel.app/en/terms",
        ko: "https://pollen-tracker-hq.vercel.app/ko/terms",
        ja: "https://pollen-tracker-hq.vercel.app/ja/terms",
        zh: "https://pollen-tracker-hq.vercel.app/zh/terms",
        es: "https://pollen-tracker-hq.vercel.app/es/terms",
        fr: "https://pollen-tracker-hq.vercel.app/fr/terms",
        de: "https://pollen-tracker-hq.vercel.app/de/terms",
        pt: "https://pollen-tracker-hq.vercel.app/pt/terms",
        "x-default": "https://pollen-tracker-hq.vercel.app/en/terms",
      },
    },
  };
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function TermsPage({ params }: PageProps) {
  const { locale } = await params;

  const lastUpdated = "April 13, 2026";

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href={`/${locale}`} className="hover:text-lime-700">Home</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-900">Terms of Use</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Use</h1>
        <p className="text-sm text-gray-500">Last updated: {lastUpdated}</p>
      </div>

      {/* Medical disclaimer callout */}
      <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-5 mb-8">
        <h2 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
          <span>⚠️</span> Important Medical Disclaimer
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          Pollen forecasts on PollenTrackerHQ are <strong>estimates only</strong> and are intended for general informational purposes. They are <strong>not a substitute for professional medical advice, diagnosis, or treatment</strong>. Always consult a qualified allergist or licensed healthcare provider regarding any allergy symptoms, medications, or treatment decisions. Pollen levels can vary significantly hour by hour, block by block, and are influenced by local microclimates. Do not make medical decisions based solely on data from this site.
        </p>
      </div>

      <div className="space-y-8">
        <section className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            By accessing or using PollenTrackerHQ (&quot;the Site&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;) at pollen-tracker-hq.vercel.app, you agree to be bound by these Terms of Use. If you do not agree with any part of these terms, you must discontinue use of the Site immediately. We reserve the right to update these terms at any time, and your continued use of the Site following any changes constitutes acceptance of the revised terms.
          </p>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-3">2. Nature of Pollen Forecast Data</h2>
          <p className="text-gray-700 text-sm leading-relaxed mb-3">
            You expressly acknowledge and agree to the following regarding pollen data provided on PollenTrackerHQ:
          </p>
          <ul className="space-y-3">
            {[
              {
                title: "Forecasts are estimates, not guarantees.",
                desc: "Pollen levels are influenced by complex meteorological and biological factors. The pollen index values shown on this site are model-based estimates derived from historical data, monitoring station readings, and weather conditions. Actual pollen concentrations at any given location may differ significantly.",
              },
              {
                title: "Pollen levels vary hour by hour.",
                desc: "Even a single city's pollen count can change dramatically throughout the day. Counts are typically highest in the morning (5–10am) and can drop significantly after rainfall. A daily index is an average snapshot, not a minute-by-minute reading.",
              },
              {
                title: "Local conditions vary.",
                desc: "Pollen concentrations can differ substantially within the same city based on proximity to parks, trees, agricultural land, wind direction, and elevation. The readings shown represent a general estimate for the metropolitan area, not a specific street or neighborhood.",
              },
              {
                title: "Data may be delayed or unavailable.",
                desc: "Monitoring stations occasionally go offline, and data processing can lag. PollenTrackerHQ uses fallback data and estimates when real-time data is unavailable, which may not reflect current conditions.",
              },
            ].map((item) => (
              <li key={item.title} className="flex gap-3">
                <span className="text-yellow-500 font-bold mt-0.5 flex-shrink-0">!</span>
                <div>
                  <span className="font-semibold text-gray-800 text-sm">{item.title} </span>
                  <span className="text-gray-600 text-sm">{item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-3">3. Not a Medical Service</h2>
          <p className="text-gray-700 text-sm leading-relaxed mb-3">
            PollenTrackerHQ is an informational website, not a medical service. The content on this Site, including pollen indices, allergen descriptions, seasonal guides, FAQ answers, and allergy management tips, is provided for general educational and informational purposes only and does not constitute:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 ml-2">
            <li>Medical advice, diagnosis, or treatment recommendations</li>
            <li>A clinical pollen allergy assessment</li>
            <li>A substitute for the advice of a licensed allergist, physician, or other healthcare professional</li>
            <li>A basis for medication dosing, treatment plan decisions, or emergency medical decisions</li>
          </ul>
          <p className="text-gray-700 text-sm leading-relaxed mt-3">
            <strong>Always consult a board-certified allergist for treatment.</strong> If you experience severe allergy symptoms, difficulty breathing, anaphylaxis, or any condition you believe requires medical attention, seek emergency medical care immediately.
          </p>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-3">4. Limitation of Liability</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            To the fullest extent permitted by applicable law, PollenTrackerHQ and its operators, affiliates, data providers, and agents shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your use of or reliance on the Site or its data. This includes, without limitation, damages resulting from health decisions made based on pollen forecast data, inability to access the Site, data inaccuracies, or service interruptions.
          </p>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-3">5. Permitted Use</h2>
          <p className="text-gray-700 text-sm leading-relaxed mb-3">
            You may use PollenTrackerHQ for personal, non-commercial informational purposes. You may not:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 ml-2">
            <li>Scrape, harvest, or systematically download data from the Site without written permission</li>
            <li>Use automated bots or crawlers to access the Site at a rate that disrupts service</li>
            <li>Reproduce, republish, or redistribute Site content commercially without attribution and permission</li>
            <li>Attempt to reverse-engineer, hack, or interfere with the Site&apos;s infrastructure</li>
            <li>Use the Site in any way that violates applicable local, state, national, or international law</li>
          </ul>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-3">6. Intellectual Property</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            All content on PollenTrackerHQ, including but not limited to text, graphics, logos, data visualizations, and code, is the property of PollenTrackerHQ or its content suppliers and is protected by applicable intellectual property laws. Underlying pollen data may be sourced from public agencies and research institutions; attribution is provided where applicable.
          </p>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-3">7. Third-Party Links and Services</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            The Site may contain links to third-party websites or display third-party advertisements. These are provided for convenience and informational purposes only. PollenTrackerHQ does not endorse, control, or take responsibility for the content, privacy practices, or terms of any third-party sites or services. Your interactions with third parties are governed by their own terms and privacy policies.
          </p>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-3">8. Governing Law</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            These Terms of Use shall be governed by and construed in accordance with the laws of the United States, without regard to conflict of law principles. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of competent courts located in the United States.
          </p>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-3">9. Changes to Terms</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            We reserve the right to modify these Terms of Use at any time. Updated terms will be posted on this page with a revised &quot;Last updated&quot; date. Your continued use of PollenTrackerHQ after any changes are posted constitutes your acceptance of the new terms.
          </p>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-3">10. Contact</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            If you have questions about these Terms of Use, please contact us through the PollenTrackerHQ website. We aim to respond to all inquiries within 30 days.
          </p>
        </section>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center items-center">
        <Link
          href={`/${locale}/privacy`}
          className="text-sm text-lime-700 hover:text-lime-800 font-medium underline"
        >
          Privacy Policy
        </Link>
        <span className="text-gray-300 hidden sm:block">|</span>
        <Link
          href={`/${locale}`}
          className="text-sm text-lime-700 hover:text-lime-800 font-medium"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
