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

interface Props {
  flights: FlightOffer[];
  title?: string;
}

export function PriceTrendChart({ flights, title }: Props) {
  const data = useMemo(() => {
    return flights.map((flight, index) => {
      const price = Number(flight.price.grandTotal);
      const dep = flight.itineraries[0]?.segments[0]?.departure.at;

      return {
        label: dep
          ? new Date(dep).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : `#${index + 1}`,
        price,
      };
    });
  }, [flights]);

  if (!data.length) {
    return null;
  }

  return (
    <div className="rounded-xl p-4 border border-[#12a4e5] text-white">
      <h3 className="mb-4 font-semibold">{title ?? "Price Graph"}</h3>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              stroke="rgba(255,255,255,0.15)"
              strokeDasharray="3 3"
            />

            {/* X Axis */}
            <XAxis dataKey="label" tick={{ fill: "#ffffff", fontSize: 12 }} />

            {/* Y Axis with $ */}
            <YAxis
              tick={{ fill: "#ffffff", fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
            />

            {/* Tooltip with $ */}
            <Tooltip
              formatter={(value) => [`$${value}`, "Price"]}
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
