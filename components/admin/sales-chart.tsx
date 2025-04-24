"use client"

import { useTheme } from "next-themes"
import { Line } from "react-chartjs-2"
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
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

export default function SalesChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "This Year",
        data: [30000, 32000, 28000, 35000, 42000, 38000, 45000, 50000, 47000, 45231, 0, 0],
        borderColor: "#ed1c24",
        backgroundColor: "rgba(237, 28, 36, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Last Year",
        data: [25000, 27000, 24000, 30000, 35000, 33000, 38000, 40000, 37000, 39000, 42000, 35000],
        borderColor: isDark ? "#64748b" : "#94a3b8",
        backgroundColor: "transparent",
        borderDash: [5, 5],
        tension: 0.4,
        fill: false,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: isDark ? "#e2e8f0" : "#334155",
        },
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    hover: {
      mode: "nearest" as const,
      intersect: true,
    },
    scales: {
      x: {
        grid: {
          color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: isDark ? "#cbd5e1" : "#475569",
        },
      },
      y: {
        grid: {
          color: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: isDark ? "#cbd5e1" : "#475569",
          callback: (value: any) => {
            return `AED ${value.toLocaleString()}`
          },
        },
      },
    },
  }

  return (
    <div className="h-[350px] w-full">
      <Line data={data} options={options} />
    </div>
  )
}
