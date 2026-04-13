import { Metadata } from "next";
import Link from "next/link";
import { AllergenCard } from "@/components/AllergenCard";
import allergens from "@/data/allergens-fallback.json";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Allergen Guide — Tree, Grass, Weed & Mold Pollen | PollenTrackerHQ",
    description:
      "Complete guide to 15+ pollen allergen types. Learn about symptoms, peak seasons, and prevention for tree pollen, grass pollen, ragweed, and mold spores.",
    alternates: {
      canonical: `https://pollen-tracker-hq.vercel.app/${locale}/allergens`,
    },
  };
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function AllergensPage({ params }: PageProps) {
  const { locale } = await params;

  const byCategory: Record<string, typeof allergens> = {};
  for (const a of allergens) {
    if (!byCategory[a.category]) byCategory[a.category] = [];
    byCategory[a.category].push(a);
  }

  const categoryLabels: Record<string, { label: string; emoji: string }> = {
    tree: { label: "Tree Pollen", emoji: "🌳" },
    grass: { label: "Grass Pollen", emoji: "🌿" },
    weed: { label: "Weed Pollen", emoji: "🌾" },
    mold: { label: "Mold Spores", emoji: "🍄" },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href={`/${locale}`} className="hover:text-lime-700">Home</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-900">Allergens</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Allergen Guide</h1>
        <p className="text-gray-600">
          Learn about {allergens.length}+ common pollen allergen types, their symptoms, peak seasons, and how to manage your exposure.
        </p>
      </div>

      {/* Category quick links */}
      <div className="flex flex-wrap gap-3 mb-8">
        {Object.entries(categoryLabels).map(([cat, { label, emoji }]) => (
          <a
            key={cat}
            href={`#${cat}`}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-yellow-200 hover:border-lime-400 hover:bg-lime-50 transition-all text-sm font-medium"
          >
            <span>{emoji}</span>
            <span>{label}</span>
          </a>
        ))}
      </div>

      {/* Allergens by category */}
      {Object.entries(byCategory).map(([category, categoryAllergens]) => {
        const catInfo = categoryLabels[category] || { label: category, emoji: "🌱" };
        return (
          <section key={category} id={category} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>{catInfo.emoji}</span>
              <span>{catInfo.label}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryAllergens.map((allergen) => (
                <AllergenCard key={allergen.slug} allergen={allergen} locale={locale} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
