"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const locales = [
  { code: "en", label: "EN" },
  { code: "ko", label: "KO" },
  { code: "ja", label: "JA" },
  { code: "zh", label: "ZH" },
  { code: "es", label: "ES" },
  { code: "fr", label: "FR" },
  { code: "de", label: "DE" },
  { code: "pt", label: "PT" },
];

interface NavbarProps {
  locale: string;
}

export function Navbar({ locale }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  const navLinks = [
    { href: `/${locale}`, label: "Home" },
    { href: `/${locale}/cities`, label: "Cities" },
    { href: `/${locale}/states`, label: "States" },
    { href: `/${locale}/allergens`, label: "Allergens" },
    { href: `/${locale}/forecast`, label: "Forecast" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-yellow-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <span className="font-bold text-xl text-lime-700">
              PollenTracker<span className="text-yellow-600">HQ</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-lime-700 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2">
            <select
              value={locale}
              onChange={(e) => switchLocale(e.target.value)}
              className="text-xs border border-yellow-200 rounded-lg px-2 py-1 bg-lime-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-400"
            >
              {locales.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-lime-50"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="md:hidden border-t border-yellow-100 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-2 py-2 text-sm font-medium text-gray-700 hover:text-lime-700 hover:bg-lime-50 rounded-lg"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
