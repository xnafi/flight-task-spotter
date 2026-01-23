"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FlightOffer } from "@/types/allTypes";
import { useMemo } from "react";

interface PriceGraphProps {
  flights: FlightOffer[];
}

export function PriceTrendChart({ flights }: PriceGraphProps) {
  const data = useMemo(() => {
    return flights.map((flight, index) => {
      const price = Number(flight.price.grandTotal);
      const depTime = flight.itineraries[0]?.segments[0]?.departure.at;

      return {
        label: depTime
          ? new Date(depTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : `#${index + 1}`,
        price,
      };
    });
  }, [flights]);

  if (!data.length) {
    return (
      <div className="rounded-xl border border-indigo-400 p-4 text-indigo-300">
        No flights to display on price graph
      </div>
    );
  }

  return (
    <div className="rounded-xl p-4 border border-[#12a4e5] bg-slate-900 text-white">
      <h3 className="mb-4 font-semibold">
        Live Price Graph ({data.length} flights)
      </h3>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              stroke="rgba(255,255,255,0.15)"
              strokeDasharray="3 3"
            />
            <XAxis dataKey="label" tick={{ fill: "#ffffff", fontSize: 12 }} />
            <YAxis tick={{ fill: "#ffffff", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#12a4e5"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
