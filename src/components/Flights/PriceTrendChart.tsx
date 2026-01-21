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
    <div className="bg-indigo-900/60 rounded-xl p-4">
      <h3 className="font-semibold mb-4">Price Trend (Next 7 Days)</h3>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={priceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="price" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
