import { MetadataRoute } from "next";
import cities from "@/data/cities-fallback.json";
import states from "@/data/states-fallback.json";
import allergens from "@/data/allergens-fallback.json";

const BASE_URL = "https://pollen-tracker-hq.vercel.app";
const locales = ["en", "ko", "ja", "zh", "es", "fr", "de", "pt"];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  // Home pages
  for (const locale of locales) {
    routes.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: locale === "en" ? 1.0 : 0.9,
    });

    // Cities index
    routes.push({
      url: `${BASE_URL}/${locale}/cities`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    });

    // States index
    routes.push({
      url: `${BASE_URL}/${locale}/states`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    });

    // Allergens index
    routes.push({
      url: `${BASE_URL}/${locale}/allergens`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    });

    // Forecast
    routes.push({
      url: `${BASE_URL}/${locale}/forecast`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    });

    // City detail pages (only for English to avoid duplicate limit)
    if (locale === "en") {
      for (const city of cities) {
        routes.push({
          url: `${BASE_URL}/${locale}/cities/${city.slug}`,
          lastModified: new Date(),
          changeFrequency: "daily",
          priority: 0.8,
        });
      }

      // State detail pages
      for (const state of states) {
        routes.push({
          url: `${BASE_URL}/${locale}/states/${state.code.toLowerCase()}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.7,
        });
      }

      // Allergen detail pages
      for (const allergen of allergens) {
        routes.push({
          url: `${BASE_URL}/${locale}/allergens/${allergen.slug}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }
  }

  return routes;
}
