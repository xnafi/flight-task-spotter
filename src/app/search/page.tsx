"use client";

import { useEffect, useState, use, useCallback } from "react";
import { searchParamsSchema } from "@/lib/validation";
import { FlightOffer, FlightSearchResponse } from "@/types/allTypes";
import { FiltersSidebar } from "@/components/Flights/FiltersSidebar";
import { FlightCard } from "@/components/Flights/FlightCard";
import { PriceTrendChart } from "@/components/Flights/PriceTrendChart";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function SearchPage({ searchParams }: PageProps) {
  // searchParams Promise
  const resolvedSearchParams = use(searchParams);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [params, setParams] = useState<any>(null);
  const [flights, setFlights] = useState<FlightOffer[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<FlightOffer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Memoize the filter callback
  const handleFilteredFlights = useCallback((filtered: FlightOffer[]) => {
    setFilteredFlights(filtered);
  }, []);

  useEffect(() => {
    async function parseAndFetch() {
      try {
        // Validate the unwrapped params
        const validation = searchParamsSchema.safeParse(resolvedSearchParams);

        if (!validation.success) {
          // This will show up in your Vercel Dashboard -> Logs
          console.error("Validation Error Details:", validation.error.format());
          setError("Invalid search parameters provided.");
          setParams(null);
          return;
        }

        const data = validation.data;
        setParams(data);
        setLoading(true);
        setError(null);

        // Construct Query Params for your internal API
        const queryParams = new URLSearchParams({
          from: data.from,
          to: data.to,
          date: data.date,
          passengers: data.p.toString(),
          cabin: data.cabin,
          trip: data.trip,
        });

        if (data.return) {
          queryParams.append("returnDate", data.return);
        }

        const response = await fetch(`/api/flights?${queryParams}`);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.details ||
              errorData.error ||
              `API Error: ${response.status}`,
          );
        }

        const result: FlightSearchResponse = await response.json();
        const flightData = result.data || [];
        setFlights(flightData);
        setFilteredFlights(flightData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    parseAndFetch();
  }, [resolvedSearchParams]); // Re-run when URL parameters change

  if (error && !params) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold text-red-500">Search Error</h1>
        <p className="text-red-600 mt-2">{error}</p>
        <p className="text-sm text-gray-500 mt-4">
          Check the URL parameters and try again.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto">
      {/* Search Summary */}
      {params && (
        <div className="rounded-lg p-4 mb-6 ">
          <h1 className="text-3xl font-bold text-blue-900 mb-4">
            Flight Search Results
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div>
              <p className="text-sm text-blue-600">From</p>
              <p className="font-semibold text-lg uppercase">{params.from}</p>
            </div>
            <div>
              <p className="text-sm text-blue-600">To</p>
              <p className="font-semibold text-lg uppercase">{params.to}</p>
            </div>
            <div>
              <p className="text-sm text-blue-600">Departure</p>
              <p className="font-semibold text-lg">{params.date}</p>
            </div>
            <div>
              <p className="text-sm text-blue-600">Passengers</p>
              <p className="font-semibold text-lg">{params.p}</p>
            </div>
            <div>
              <p className="text-sm text-blue-600">Cabin</p>
              <p className="font-semibold text-lg capitalize">{params.cabin}</p>
            </div>
            <div>
              <p className="text-sm text-blue-600">Trip Type</p>
              <p className="font-semibold text-lg capitalize">{params.trip}</p>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">Loading flights...</p>
          <div className="mt-4 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && params && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 mb-6">
          <p className="font-semibold">Error fetching flights</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      )}

      {/* Main Content Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <FiltersSidebar
              show={showFilters}
              flights={flights}
              onFilter={handleFilteredFlights}
            />
          </div>

          {/* Content */}
          <div className="md:col-span-3 space-y-6">
            {/* Price Trend Chart */}
            {params && (
              <PriceTrendChart
                origin={params.from}
                destination={params.to}
                departureDate={params.date}
              />
            )}

            {/* Flights List */}
            {filteredFlights.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-gray-200">
                    Found {filteredFlights.length} flight
                    {filteredFlights.length !== 1 ? "s" : ""}
                  </p>
                  {filteredFlights.length < flights.length && (
                    <p className="text-sm text-indigo-300">
                      ({flights.length - filteredFlights.length} filtered out)
                    </p>
                  )}
                </div>
                {filteredFlights.map((flight) => (
                  <FlightCard key={flight.id} flight={flight} />
                ))}
              </div>
            )}

            {filteredFlights.length === 0 && flights.length > 0 && (
              <div className="text-center py-12 text-gray-400">
                No flights match your filters. Try adjusting them.
              </div>
            )}

            {filteredFlights.length === 0 && flights.length === 0 && params && (
              <div className="text-center py-12 text-gray-400">
                No flights found.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
