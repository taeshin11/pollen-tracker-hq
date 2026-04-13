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
  peakSeason: string;
}

interface CityTableProps {
  cities: City[];
  locale: string;
}

export function CityTable({ cities, locale }: CityTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-yellow-200">
      <table className="w-full bg-white">
        <thead>
          <tr className="bg-lime-50 border-b border-yellow-200">
            <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">City</th>
            <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">State</th>
            <th className="text-center px-4 py-3 text-sm font-semibold text-gray-700">Overall</th>
            <th className="text-center px-4 py-3 text-sm font-semibold text-gray-700">Tree</th>
            <th className="text-center px-4 py-3 text-sm font-semibold text-gray-700">Grass</th>
            <th className="text-center px-4 py-3 text-sm font-semibold text-gray-700">Weed</th>
            <th className="text-center px-4 py-3 text-sm font-semibold text-gray-700">Mold</th>
            <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Peak Season</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((city, i) => (
            <tr
              key={city.slug}
              className={`border-b border-gray-100 hover:bg-lime-50 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
            >
              <td className="px-4 py-3">
                <Link
                  href={`/${locale}/cities/${city.slug}`}
                  className="font-semibold text-gray-900 hover:text-lime-700 transition-colors"
                >
                  {city.name}
                </Link>
              </td>
              <td className="px-4 py-3 text-gray-600">{city.state}</td>
              <td className="px-4 py-3 text-center">
                <PollenIndex level={city.overall} size="sm" />
              </td>
              <td className="px-4 py-3 text-center">
                <span className="font-medium text-gray-800">{city.tree}</span>
              </td>
              <td className="px-4 py-3 text-center">
                <span className="font-medium text-gray-800">{city.grass}</span>
              </td>
              <td className="px-4 py-3 text-center">
                <span className="font-medium text-gray-800">{city.weed}</span>
              </td>
              <td className="px-4 py-3 text-center">
                <span className="font-medium text-gray-800">{city.mold}</span>
              </td>
              <td className="px-4 py-3 text-gray-600">{city.peakSeason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
