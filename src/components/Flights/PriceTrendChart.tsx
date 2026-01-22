"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getPriceTrend, PriceTrendData } from "@/lib/getPriceTrend";

interface PriceTrendChartProps {
  origin?: string;
  destination?: string;
  departureDate?: string;
}

export function PriceTrendChart({
  origin = "JFK",
  destination = "LHR",
  departureDate = new Date().toISOString().split("T")[0],
}: PriceTrendChartProps) {
  const [data, setData] = useState<PriceTrendData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const trends = await getPriceTrend({
          origin,
          destination,
          departureDate,
        });
        setData(trends);
      } catch (error) {
        console.error("Failed to fetch price trends:", error);
        // Fallback to default data if fetch fails
        setData([
          { day: "May 25", price: 620, date: "2024-05-25" },
          { day: "May 26", price: 740, date: "2024-05-26" },
          { day: "May 27", price: 600, date: "2024-05-27" },
          { day: "May 28", price: 680, date: "2024-05-28" },
          { day: "May 29", price: 630, date: "2024-05-29" },
          { day: "May 30", price: 710, date: "2024-05-30" },
          { day: "May 31", price: 760, date: "2024-05-31" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Set up real-time updates every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [origin, destination, departureDate]);
  return (
    <div className="rounded-xl p-4 text-white border border-[#12a4e5]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-white">
          Price Trend (Next 7 Days)
        </h3>
        {loading && (
          <span className="text-xs text-indigo-400 animate-pulse">
            Updating...
          </span>
        )}
      </div>

      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            {/* Grid */}
            <CartesianGrid
              stroke="rgba(255,255,255,0.15)"
              strokeDasharray="3 3"
            />

            {/* X Axis */}
            <XAxis
              dataKey="day"
              tick={{ fill: "#ffffff", fontSize: 12 }}
              axisLine={{ stroke: "#ffffff" }}
              tickLine={{ stroke: "#ffffff" }}
            />

            {/* Y Axis */}
            <YAxis
              tick={{ fill: "#ffffff", fontSize: 12 }}
              axisLine={{ stroke: "#ffffff" }}
              tickLine={{ stroke: "#ffffff" }}
            />

            {/* Tooltip */}
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a", // dark slate
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "8px",
                color: "#ffffff",
              }}
              labelStyle={{ color: "#ffffff" }}
              itemStyle={{ color: "#ffffff" }}
            />

            {/* Line */}
            <Line
              type="monotone"
              dataKey="price"
              stroke="#12a4e5"
              strokeWidth={3}
              dot={{ r: 4, stroke: "#12a4e5", fill: "#12a4e5" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
