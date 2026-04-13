import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PollenTrackerHQ — Daily Pollen Forecast by City",
  description: "Check today's pollen levels for 60+ major US cities. Know before you go outside.",
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
