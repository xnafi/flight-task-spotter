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

export default function PriceTrendChart() {
  return (
    <div className="w-full h-40">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={priceData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#312e81" />
          <XAxis dataKey="day" stroke="#a5b4fc" fontSize={12} tickMargin={10} />
          <YAxis stroke="#a5b4fc" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e1b4b",
              border: "none",
              borderRadius: "8px",
            }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#6366f1"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
