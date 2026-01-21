"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SearchBar } from "@/components/Search/SearchBar";
import { searchParamsSchema } from "@/lib/validation";
import { FlightOffer, FlightSearchResponse } from "@/types/allTypes";

export default function FlightSearchPage() {
  const searchParams = useSearchParams();
  const hasSearchParams = searchParams && searchParams.size > 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [params, setParams] = useState<any>(null);
  const [flights, setFlights] = useState<FlightOffer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (!hasSearchParams) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setParams(null);
      setFlights([]);
      return;
    }

    try {
      const paramsObj = {
        from: searchParams.get("from"),
        to: searchParams.get("to"),
        date: searchParams.get("date"),
        trip: searchParams.get("trip"),
        cabin: searchParams.get("cabin"),
        p: searchParams.get("p"),
        return: searchParams.get("return") || undefined,
      };

      const validation = searchParamsSchema.safeParse(paramsObj);
      if (!validation.success) {
        setError("Invalid search parameters");
        return;
      }

      setParams(validation.data);
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams({
        from: validation.data.from,
        to: validation.data.to,
        date: validation.data.date,
        passengers: validation.data.p.toString(),
      });

      fetch(`/api/flights?${queryParams}`)
        .then((res) => res.json())
        .then((result: FlightSearchResponse) => setFlights(result.data || []))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("An error occurred");
      setLoading(false);
    }
  }, [searchParams, hasSearchParams]);

  return (
    <div className="min-h-screen md:mt-10">
      <div className="mx-auto bg-indigo-950/50 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden">
        <div className="space-y-6">
          <SearchBar />

          {/* Mobile Filter Toggle */}
          <div className="md:hidden px-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full py-2 bg-indigo-800 rounded-lg text-sm font-medium border border-white/10"
            >
              {showFilters ? "Hide Filters" : "Show Filters & Sorting"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
