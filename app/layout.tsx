import type { Metadata } from "next";
import "./globals.css";

const BASE_URL = "https://pollen-tracker-hq.vercel.app";

export const metadata: Metadata = {
  verification: {
    google: "WddgcbVJsL2BGHNAje5m6DK56IcR0Mw5UOqozI2Xtrc",
  },
  title: "Daily Pollen Count & Allergy Forecast by City | PollenTrackerHQ",
  description:
    "Check today's pollen count and 5-day allergy forecast for your city. Tree, grass, and weed pollen levels for 500+ US cities updated daily.",
  keywords: [
    "pollen count",
    "allergy forecast",
    "pollen tracker",
    "pollen near me",
    "pollen today",
    "allergy season",
    "tree pollen",
    "grass pollen",
    "weed pollen",
  ],
  alternates: {
    canonical: `${BASE_URL}/en`,
    languages: {
      en: `${BASE_URL}/en`,
      ko: `${BASE_URL}/ko`,
      ja: `${BASE_URL}/ja`,
      zh: `${BASE_URL}/zh`,
      es: `${BASE_URL}/es`,
      fr: `${BASE_URL}/fr`,
      de: `${BASE_URL}/de`,
      pt: `${BASE_URL}/pt`,
      "x-default": `${BASE_URL}/en`,
    },
  },
  openGraph: {
    title: "Daily Pollen Count & Allergy Forecast by City | PollenTrackerHQ",
    description:
      "Check today's pollen count and 5-day allergy forecast for your city. Tree, grass, and weed pollen levels for 500+ US cities updated daily.",
    url: BASE_URL,
    siteName: "PollenTrackerHQ",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily Pollen Count & Allergy Forecast by City | PollenTrackerHQ",
    description:
      "Check today's pollen count and 5-day allergy forecast for your city. Tree, grass, and weed pollen levels for 500+ US cities updated daily.",
    site: "@PollenTrackerHQ",
  },
  other: {
    "google-adsense-account": "ca-pub-7098271335538021",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
