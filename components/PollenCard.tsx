import Link from "next/link";
import { PollenIndex } from "./PollenIndex";
import type { PollenLevel } from "@/lib/utils";

interface City {
  slug: string;
  name: string;
  state: string;
  overall: PollenLevel;
  tree: number;
  grass: number;
  weed: number;
  mold: number;
}

interface PollenCardProps {
  city: City;
  locale: string;
  rank?: number;
}

export function PollenCard({ city, locale, rank }: PollenCardProps) {
  return (
    <Link href={`/${locale}/cities/${city.slug}`} className="block group">
      <div className="bg-white rounded-xl border border-yellow-200 p-4 shadow-sm hover:shadow-md transition-shadow hover:border-lime-300">
        <div className="flex items-start justify-between mb-3">
          <div>
            {rank && (
              <span className="text-xs font-bold text-lime-600 mb-1 block">#{rank}</span>
            )}
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-lime-700 transition-colors">
              {city.name}
            </h3>
            <p className="text-sm text-gray-500">{city.state}</p>
          </div>
          <PollenIndex level={city.overall} size="md" />
        </div>

        <div className="grid grid-cols-4 gap-2 mt-3">
          {[
            { label: "Tree", value: city.tree },
            { label: "Grass", value: city.grass },
            { label: "Weed", value: city.weed },
            { label: "Mold", value: city.mold },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-lg font-bold text-gray-800">{item.value}</div>
              <div className="text-xs text-gray-500">{item.label}</div>
              <div className="mt-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-lime-400"
                  style={{ width: `${(item.value / 10) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}
