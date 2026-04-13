"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { MONTH_NAMES } from "@/lib/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface SeasonalChartProps {
  cityName: string;
  treeData?: number[];
  grassData?: number[];
  weedData?: number[];
  moldData?: number[];
}

const defaultTreeData = [2, 4, 8, 9, 7, 3, 1, 1, 1, 2, 1, 1];
const defaultGrassData = [1, 1, 2, 4, 7, 9, 8, 5, 3, 1, 1, 1];
const defaultWeedData = [1, 1, 1, 2, 3, 4, 5, 7, 9, 6, 2, 1];
const defaultMoldData = [2, 2, 3, 4, 5, 6, 8, 7, 6, 4, 3, 2];

export function SeasonalChart({
  cityName,
  treeData = defaultTreeData,
  grassData = defaultGrassData,
  weedData = defaultWeedData,
  moldData = defaultMoldData,
}: SeasonalChartProps) {
  const data = {
    labels: MONTH_NAMES,
    datasets: [
      {
        label: "Tree Pollen",
        data: treeData,
        borderColor: "#84cc16",
        backgroundColor: "rgba(132, 204, 22, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: "Grass Pollen",
        data: grassData,
        borderColor: "#22c55e",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: "Weed Pollen",
        data: weedData,
        borderColor: "#f59e0b",
        backgroundColor: "rgba(245, 158, 11, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: "Mold Spores",
        data: moldData,
        borderColor: "#8b5cf6",
        backgroundColor: "rgba(139, 92, 246, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          padding: 16,
          font: { size: 12 },
        },
      },
      title: {
        display: true,
        text: `Seasonal Pollen Calendar — ${cityName}`,
        font: { size: 14, weight: "bold" as const },
        color: "#1a2e05",
      },
      tooltip: {
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: (context: any) => {
            const y = context.parsed?.y ?? 0;
            const level =
              y <= 3 ? "Low" : y <= 6 ? "Moderate" : y <= 8 ? "High" : "Very High";
            return `${context.dataset?.label ?? ""}: ${y}/10 (${level})`;
          },
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 10,
        ticks: {
          stepSize: 2,
          callback: (value: number | string) => {
            const v = Number(value);
            if (v === 0) return "0";
            if (v === 2) return "Low";
            if (v === 4) return "Mod";
            if (v === 6) return "High";
            if (v === 8) return "V.High";
            if (v === 10) return "Max";
            return v;
          },
        },
        grid: { color: "rgba(0,0,0,0.05)" },
      },
      x: {
        grid: { color: "rgba(0,0,0,0.05)" },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl border border-yellow-200 p-4">
      <Line data={data} options={options} />
    </div>
  );
}
