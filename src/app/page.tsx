"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { SearchBar } from "@/components/Search/SearchBar";
import LoadingUi from "@/components/shared/LoadingUi";
import { FiltersSidebar } from "@/components/Flights/FiltersSidebar";
import { ErrorMessage } from "@/components/Flights/ErrorMessage";
import { SearchSummary } from "@/components/Flights/SearchSummary";
import { FlightCard } from "@/components/Flights/FlightCard";
import { FlightRow } from "@/components/Flights/FlightRow";

import { popularFlights } from "@/lib/popularFlights";
import { searchParamsSchema } from "@/lib/validation";

import {
  FlightOffer,
  FlightSearchResponse,
  SearchParams,
} from "@/types/allTypes";
import { PriceTrendChart } from "@/components/Flights/PriceTrendChart";

export default function FlightSearchPage() {
  const searchParams = useSearchParams();
  const hasSearchParams = searchParams && searchParams.size > 0;

  const [params, setParams] = useState<SearchParams | null>(null);
  const [flights, setFlights] = useState<FlightOffer[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<FlightOffer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (!hasSearchParams || !searchParams) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setParams(null);
      setFlights([]);
      setFilteredFlights([]);
      return;
    }

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
      .then((res) => {
        if (!res.ok) throw new Error("Search failed");
        return res.json();
      })
      .then((result: FlightSearchResponse) => {
        const data = result.data || [];
        setFlights(data);
        setFilteredFlights(data);
      })
      .catch((err) => {
        setError(err.message);
        setFlights([]);
        setFilteredFlights([]);
      })
      .finally(() => setLoading(false));
  }, [searchParams, hasSearchParams]);

  /** 🔑 Graph data source */
  const graphFlights =
    params && filteredFlights.length > 0 ? filteredFlights : popularFlights;

  const graphTitle = params ? "Search Price Trend" : "Popular Flight Prices";

  return (
    <main className="min-h-screen md:mt-10">
      <div className="mx-auto backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden space-y-6">
        <SearchBar />

        {/* Mobile filter toggle */}
        <div className="md:hidden px-6">
          <button
            onClick={() => setShowFilters((v) => !v)}
            className="w-full py-2 bg-indigo-500 rounded-lg text-sm font-medium border border-white/10"
          >
            {showFilters ? "Hide Filters" : "Show Filters & Sorting"}
          </button>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-4 gap-6">
          {/* Filters */}
          <FiltersSidebar
            show={showFilters}
            flights={flights}
            onFilter={setFilteredFlights}
          />

          {/* Results */}
          <div className="col-span-3 space-y-4">
            {/* ALWAYS VISIBLE GRAPH */}
            <PriceTrendChart flights={graphFlights} title={graphTitle} />

            {params && <SearchSummary params={params} />}

            {loading && (
              <div className="flex justify-center items-center">
                <LoadingUi />
              </div>
            )}

            {error && <ErrorMessage message={error} />}

            {!loading && !error && filteredFlights.length > 0 && (
              <div className="space-y-3">
                <p className="text-sm font-medium text-indigo-300">
                  Found {filteredFlights.length} results
                </p>

                {filteredFlights.map((flight) => (
                  <FlightCard key={flight.id} flight={flight} />
                ))}
              </div>
            )}

            {!loading && !error && filteredFlights.length === 0 && params && (
              <div className="text-center py-20 text-indigo-300 bg-indigo-900/20 rounded-xl border border-dashed border-white/10">
                <p className="text-lg font-medium">No flights found</p>
                <p className="text-sm">Try adjusting your filters or dates</p>
              </div>
            )}

            {!params && (
              <div className="space-y-3">
                <h3 className="font-medium text-indigo-200 px-1">
                  Popular Offers
                </h3>
                <FlightRow
                  airline="Delta"
                  time="08:00 — 11:10"
                  details="Nonstop · 3h 10m"
                  price="$350"
                />
                <FlightRow
                  airline="United"
                  time="07:45 — 12:30"
                  details="Nonstop · 4h 45m"
                  price="$390"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
