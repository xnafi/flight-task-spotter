
import { SearchParams } from "@/types/allTypes";
import SummaryItem from "./SummaryItem";

export function SearchSummary({ params }: { params: SearchParams }) {
  return (
    <div className="rounded-xl border border-white/20 p-4 bg-indigo-900/30">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <SummaryItem label="From" value={params.from} highlight />
        <SummaryItem label="To" value={params.to} highlight />
        <SummaryItem label="Departure" value={params.date} />
        <SummaryItem label="Travelers" value={params.p} />
        <SummaryItem label="Cabin" value={params.cabin} capitalize />
        <SummaryItem label="Trip" value={params.trip} capitalize />
      </div>
    </div>
  );
}
