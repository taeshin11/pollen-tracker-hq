import Link from "next/link";
import { MONTH_NAMES } from "@/lib/utils";

interface Allergen {
  slug: string;
  name: string;
  category: string;
  peakMonths: number[];
  peakSeason: string;
  description: string;
}

interface AllergenCardProps {
  allergen: Allergen;
  locale: string;
}

const categoryIcons: Record<string, string> = {
  tree: "🌳",
  grass: "🌿",
  weed: "🌾",
  mold: "🍄",
};

const seasonColors: Record<string, string> = {
  Spring: "bg-green-100 text-green-700",
  Summer: "bg-yellow-100 text-yellow-700",
  Fall: "bg-orange-100 text-orange-700",
  Winter: "bg-blue-100 text-blue-700",
};

export function AllergenCard({ allergen, locale }: AllergenCardProps) {
  const icon = categoryIcons[allergen.category] || "🌱";
  const seasonClass = seasonColors[allergen.peakSeason] || "bg-gray-100 text-gray-700";

  return (
    <Link href={`/${locale}/allergens/${allergen.slug}`} className="block group">
      <div className="bg-white rounded-xl border border-yellow-200 p-5 shadow-sm hover:shadow-md transition-all hover:border-lime-300 h-full">
        <div className="flex items-start gap-3 mb-3">
          <span className="text-3xl">{icon}</span>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 group-hover:text-lime-700 transition-colors">
              {allergen.name}
            </h3>
            <span className={`inline-block text-xs px-2 py-0.5 rounded-full mt-1 ${seasonClass}`}>
              {allergen.peakSeason}
            </span>
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {allergen.description}
        </p>

        <div className="flex flex-wrap gap-1">
          {allergen.peakMonths.map((m) => (
            <span
              key={m}
              className="text-xs px-1.5 py-0.5 bg-lime-100 text-lime-700 rounded"
            >
              {MONTH_NAMES[m - 1]}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
