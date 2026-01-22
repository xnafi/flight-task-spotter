"use client";

import { SearchBar } from "@/components/Search/SearchBar";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchParamsSchema } from "@/lib/validation";
import {
  FlightOffer,
  FlightSearchResponse,
  SearchParams,
} from "@/types/allTypes";

import LoadingUi from "@/components/shared/LoadingUi";
import { FiltersSidebar } from "@/components/Flights/FiltersSidebar";
import { ErrorMessage } from "@/components/Flights/ErrorMessage";
import { SearchSummary } from "@/components/Flights/SearchSummary";
import { FlightCard } from "@/components/Flights/FlightCard";
import { PriceTrendChart } from "@/components/Flights/PriceTrendChart";
import { FlightRow } from "@/components/Flights/FlightRow";

export default function FlightSearchPage() {
  const searchParams = useSearchParams();
  const hasSearchParams = searchParams && searchParams.size > 0;

  const [params, setParams] = useState<SearchParams | null>(null);
  const [flights, setFlights] = useState<FlightOffer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (!hasSearchParams || !searchParams) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setParams(null);
      setFlights([]);
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
        setFlights(result.data || []);
      })
      .catch((err) => {
        setError(err.message);
        setFlights([]);
      })
      .finally(() => setLoading(false));
  }, [searchParams, hasSearchParams]);

  return (
    <div className="min-h-screen md:mt-10">
      <div className="mx-auto backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden space-y-6">
        <SearchBar />

        <div className="md:hidden px-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full py-2 bg-indigo-800 rounded-lg text-sm font-medium border border-white/10"
          >
            {showFilters ? "Hide Filters" : "Show Filters & Sorting"}
          </button>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-4 gap-6">
          <FiltersSidebar show={showFilters} />

          <div className="col-span-3 space-y-4">
            {params && (
              <>
                <PriceTrendChart /> <SearchSummary params={params} />
              </>
            )}

            {loading && (
              <div className="flex justify-center items-center">
                <LoadingUi />
              </div>
            )}
            {error && <ErrorMessage message={error} />}

            {!loading && !error && flights.length > 0 && (
              <div className="space-y-3">
                <p className="text-sm font-medium text-indigo-300">
                  Found {flights.length} results
                </p>
                {flights.map((flight) => (
                  <FlightCard key={flight.id} flight={flight} />
                ))}
              </div>
            )}

            {!loading && !error && flights.length === 0 && (
              <div className="space-y-4">
                {!params && <PriceTrendChart />}

                {params ? (
                  <>
                    <div className="text-center py-20 text-indigo-300 bg-indigo-900/20 rounded-xl border border-dashed border-white/10">
                      <p className="text-lg font-medium">No flights found</p>
                      <p className="text-sm">
                        Try adjusting your filters or dates
                      </p>
                    </div>
                  </>
                ) : (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
