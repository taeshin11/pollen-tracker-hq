"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface FooterProps {
  locale: string;
}

export function Footer({ locale }: FooterProps) {
  const [visitors, setVisitors] = useState<{ today: number; total: number } | null>(null);

  useEffect(() => {
    fetch("/api/visitors", { method: "POST" })
      .then((r) => r.json())
      .then((data) => setVisitors(data))
      .catch(() => {});
  }, []);

  return (
    <footer className="bg-white border-t border-yellow-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🌿</span>
              <span className="font-bold text-xl text-lime-700">
                PollenTracker<span className="text-yellow-600">HQ</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-3">
              Daily pollen forecast by city. Know before you go outside.
            </p>
            {visitors && (
              <p className="text-xs text-gray-400">
                👥 Today: {visitors.today.toLocaleString()} | Total: {visitors.total.toLocaleString()}
              </p>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: `/${locale}/cities`, label: "All Cities" },
                { href: `/${locale}/states`, label: "By State" },
                { href: `/${locale}/allergens`, label: "Allergen Guide" },
                { href: `/${locale}/forecast`, label: "Forecast Guide" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-lime-700 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">About</h3>
            <p className="text-sm text-gray-500 mb-2">
              PollenTrackerHQ provides daily pollen index data for allergy sufferers across the United States.
            </p>
            <p className="text-xs text-gray-400">
              Data updated daily from public sources. Always consult a healthcare provider for medical advice.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-8 pt-6 text-center">
          <p className="text-xs text-gray-400">
            © 2026 PollenTrackerHQ. All rights reserved. | Daily Pollen Forecast by City
          </p>
        </div>
      </div>

      {/* Adsterra Social Bar Placeholder */}
      <div id="adsterra-social-bar" className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none">
        {/* Social Bar Ad goes here */}
      </div>
    </footer>
  );
}
