import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const priceData = [
  { day: "May 25", price: 620 },
  { day: "May 26", price: 740 },
  { day: "May 27", price: 600 },
  { day: "May 28", price: 680 },
  { day: "May 29", price: 630 },
  { day: "May 30", price: 710 },
  { day: "May 31", price: 760 },
];

export function PriceTrendChart() {
  return (
    <div className="rounded-xl p-4 text-white border border-[#12a4e5]">
      <h3 className="font-semibold mb-4 text-white">
        Price Trend (Next 7 Days)
      </h3>

      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={priceData}>
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
