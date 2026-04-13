export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export type PollenLevel = "Low" | "Moderate" | "High" | "Very High";

export function levelFromScore(score: number): PollenLevel {
  if (score <= 3) return "Low";
  if (score <= 6) return "Moderate";
  if (score <= 8) return "High";
  return "Very High";
}

export function getPollenBgClass(level: PollenLevel): string {
  switch (level) {
    case "Low": return "pollen-low";
    case "Moderate": return "pollen-moderate";
    case "High": return "pollen-high";
    case "Very High": return "pollen-very-high";
    default: return "pollen-low";
  }
}

export function getPollenEmoji(level: PollenLevel): string {
  switch (level) {
    case "Low": return "🟢";
    case "Moderate": return "🟡";
    case "High": return "🟠";
    case "Very High": return "🔴";
    default: return "⚪";
  }
}

export const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export const FULL_MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
