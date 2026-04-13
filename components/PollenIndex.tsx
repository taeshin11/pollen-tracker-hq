import { cn } from "@/lib/utils";

type PollenLevel = "Low" | "Moderate" | "High" | "Very High";

interface PollenIndexProps {
  level: PollenLevel;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

const levelConfig: Record<PollenLevel, { className: string; emoji: string; value: number }> = {
  Low: { className: "pollen-low", emoji: "🟢", value: 1 },
  Moderate: { className: "pollen-moderate", emoji: "🟡", value: 2 },
  High: { className: "pollen-high", emoji: "🟠", value: 3 },
  "Very High": { className: "pollen-very-high", emoji: "🔴", value: 4 },
};

export function PollenIndex({ level, size = "md", showLabel = true }: PollenIndexProps) {
  const config = levelConfig[level];
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base font-semibold",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border font-medium",
        config.className,
        sizeClasses[size]
      )}
    >
      <span>{config.emoji}</span>
      {showLabel && <span>{level}</span>}
    </span>
  );
}

export function getPollenColor(level: PollenLevel): string {
  const colors: Record<PollenLevel, string> = {
    Low: "#6bcb77",
    Moderate: "#ffd166",
    High: "#ff9a3c",
    "Very High": "#ef476f",
  };
  return colors[level];
}

export function levelFromScore(score: number): PollenLevel {
  if (score <= 3) return "Low";
  if (score <= 6) return "Moderate";
  if (score <= 8) return "High";
  return "Very High";
}
