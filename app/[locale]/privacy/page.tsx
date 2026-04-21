import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Privacy Policy | PollenTrackerHQ",
    description:
      "Read the PollenTrackerHQ privacy policy. Learn how we collect, use, and protect your data when you use our pollen count and allergy forecast service.",
    alternates: {
      canonical: `https://pollen-tracker-hq.vercel.app/${locale}/privacy`,
      languages: {
        en: "https://pollen-tracker-hq.vercel.app/en/privacy",
        ko: "https://pollen-tracker-hq.vercel.app/ko/privacy",
        ja: "https://pollen-tracker-hq.vercel.app/ja/privacy",
        zh: "https://pollen-tracker-hq.vercel.app/zh/privacy",
        es: "https://pollen-tracker-hq.vercel.app/es/privacy",
        fr: "https://pollen-tracker-hq.vercel.app/fr/privacy",
        de: "https://pollen-tracker-hq.vercel.app/de/privacy",
        pt: "https://pollen-tracker-hq.vercel.app/pt/privacy",
        "x-default": "https://pollen-tracker-hq.vercel.app/en/privacy",
      },
    },
  };
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;

  const lastUpdated = "April 13, 2026";

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href={`/${locale}`} className="hover:text-lime-700">Home</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-900">Privacy Policy</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500">Last updated: {lastUpdated}</p>
      </div>

      <div className="prose prose-gray max-w-none space-y-8">
        <section className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-3">1. Introduction</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            Welcome to PollenTrackerHQ (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your privacy and being transparent about how we collect and use information. This Privacy Policy explains what data we collect when you use our website at{" "}
            <span className="font-medium">pollen-tracker-hq.vercel.app</span>, how we use it, and your rights with respect to that data.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed mt-3">
            By using PollenTrackerHQ, you agree to the practices described in this policy. If you do not agree, please discontinue use of the site.
          </p>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-3">2. Information We Collect</h2>

          <h3 className="font-semibold text-gray-800 mb-2 mt-4">2.1 Information You Provide</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            PollenTrackerHQ does not require account registration. We do not collect your name, email address, or payment information as part of core site usage. If you contact us via email, we will retain that correspondence.
          </p>

          <h3 className="font-semibold text-gray-800 mb-2 mt-4">2.2 City Search Data</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            When you search for or browse a city on PollenTrackerHQ, we may log the city name or slug accessed. This information is collected in anonymized form — we do not associate city searches with individual users, IP addresses, or personal identifiers. This data is used exclusively to improve our city recommendations, identify which cities to expand coverage for, and understand which pollen data is most valuable to our users.
          </p>

          <h3 className="font-semibold text-gray-800 mb-2 mt-4">2.3 Automatically Collected Data</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            Like most websites, we automatically collect certain technical information when you visit, including:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 mt-2 ml-2">
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Referring URL</li>
            <li>Pages visited and time spent on pages</li>
            <li>General geographic region (country or region level, not precise location)</li>
            <li>Device type (desktop, mobile, tablet)</li>
          </ul>
          <p className="text-gray-700 text-sm leading-relaxed mt-3">
            This data is collected through standard server logs and third-party analytics services, and is used in aggregate form only.
          </p>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-3">3. Cookies and Tracking Technologies</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            PollenTrackerHQ uses cookies and similar tracking technologies for the following purposes:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 mt-3 ml-2">
            <li><strong>Essential cookies:</strong> Required for the site to function, such as language preferences.</li>
            <li><strong>Analytics cookies:</strong> Help us understand how visitors interact with the site so we can improve it.</li>
            <li><strong>Advertising cookies:</strong> Third-party advertising networks (including Google AdSense) may place cookies to serve relevant advertisements based on your interests. These third parties have their own privacy policies governing their use of this information.</li>
          </ul>
          <p className="text-gray-700 text-sm leading-relaxed mt-3">
            You can control cookie settings through your browser preferences. Note that disabling certain cookies may affect site functionality.
          </p>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-3">4. Third-Party Services</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            We use the following third-party services that may collect data subject to their own privacy policies:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 mt-3 ml-2">
            <li><strong>Google AdSense</strong> (ca-pub-7098271335538021): Serves advertisements. Google may use cookies to serve ads based on your prior visits to our site and other sites. <Link href="https://policies.google.com/privacy" className="text-lime-700 underline" target="_blank" rel="noopener noreferrer">Google Privacy Policy</Link>.</li>
            <li><strong>Vercel</strong>: Hosts PollenTrackerHQ and may collect access logs for security and performance monitoring.</li>
            <li><strong>Analytics providers:</strong> We may use aggregated analytics to understand traffic patterns.</li>
          </ul>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-3">5. How We Use Your Information</h2>
          <p className="text-gray-700 text-sm leading-relaxed">We use collected information to:</p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 mt-3 ml-2">
            <li>Provide and improve the PollenTrackerHQ service</li>
            <li>Expand city coverage based on demand (using anonymized city search data)</li>
            <li>Analyze traffic patterns and optimize site performance</li>
            <li>Display relevant advertisements to support free access to pollen data</li>
            <li>Prevent fraud and ensure site security</li>
            <li>Comply with legal obligations</li>
          </ul>
          <p className="text-gray-700 text-sm leading-relaxed mt-3">
            We do not sell your personal information to third parties.
          </p>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-3">6. Data Retention</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            Anonymized city search data and aggregate analytics data are retained for up to 24 months to identify long-term usage trends. Server access logs are retained for up to 90 days for security purposes. We do not retain personal information beyond what is necessary for the purposes described in this policy.
          </p>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-3">7. Children&apos;s Privacy</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            PollenTrackerHQ is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us and we will delete it promptly.
          </p>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-3">8. Your Rights</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            Depending on your location, you may have rights including the right to access, correct, or delete your personal data. Residents of California (CCPA), the European Union (GDPR), and other jurisdictions may have additional rights. Since PollenTrackerHQ collects minimal personal data, most requests can be fulfilled simply. To exercise any privacy right, contact us at the address below.
          </p>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-3">9. Changes to This Policy</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            We may update this Privacy Policy from time to time. When we do, we will update the &quot;Last updated&quot; date at the top of this page. We encourage you to review this page periodically. Continued use of PollenTrackerHQ after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-3">10. Contact Us</h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            If you have questions or concerns about this Privacy Policy or our data practices, please contact us through the PollenTrackerHQ website. We will respond to legitimate requests within 30 days.
          </p>
        </section>
      </div>

      <div className="mt-10 text-center">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-sm text-lime-700 hover:text-lime-800 font-medium"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
