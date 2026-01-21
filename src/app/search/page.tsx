"use client";

import { useEffect, useState } from "react";
import { searchParamsSchema } from "@/lib/validation";
import { FlightOffer, FlightSearchResponse } from "@/types/allTypes";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SearchPage({ searchParams }: any) {
  const [params, setParams] = useState<any>(null);
  const [flights, setFlights] = useState<FlightOffer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function parseAndFetch() {
      try {
        const resolvedParams = await searchParams;
        const validation = searchParamsSchema.safeParse(resolvedParams);

        if (!validation.success) {
          setError("Invalid search parameters");
          setParams(null);
          return;
        }

        const data = validation.data;
        setParams(data);
        setLoading(true);

        // Fetch flights from the API route
        const queryParams = new URLSearchParams({
          from: data.from,
          to: data.to,
          date: data.date,
          passengers: data.p.toString(),
        });

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
        setFlights(result.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    parseAndFetch();
  }, [searchParams]);

  if (!params) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold text-red-500">
          Invalid Search Parameters
        </h1>
        <p className="text-red-600 mt-2">
          {error || "Please provide valid search parameters"}
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Search Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">
          Flight Search Results
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div>
            <p className="text-sm text-blue-600">From</p>
            <p className="font-semibold text-lg">{params.from}</p>
          </div>
          <div>
            <p className="text-sm text-blue-600">To</p>
            <p className="font-semibold text-lg">{params.to}</p>
          </div>
          <div>
            <p className="text-sm text-blue-600">Departure</p>
            <p className="font-semibold text-lg">
              {new Date(params.date).toLocaleDateString()}
            </p>
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

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">Loading flights...</p>
          <div className="mt-4 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <p className="font-semibold">Error fetching flights</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      )}

      {/* Flights List */}
      {!loading && !error && flights.length > 0 && (
        <div>
          <p className="text-lg font-semibold text-gray-700 mb-4">
            Found {flights.length} flight offers
          </p>
          <div className="space-y-4">
            {flights.map((flight) => (
              <div
                key={flight.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                {/* Flight Itinerary */}
                <div className="mb-4">
                  {flight.itineraries.map((itinerary, idx) => (
                    <div key={idx} className="mb-3">
                      <p className="text-sm font-semibold text-gray-600 mb-2">
                        {idx === 0 ? "Outbound" : "Return"} - Duration:{" "}
                        {itinerary.duration}
                      </p>
                      <div className="space-y-2">
                        {itinerary.segments.map((segment, segIdx) => (
                          <div key={segIdx} className="bg-gray-50 p-3 rounded">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <p className="font-semibold">
                                  {segment.departure.iataCode} →{" "}
                                  {segment.arrival.iataCode}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {segment.carrierCode} {segment.number}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm">
                                  {new Date(
                                    segment.departure.at,
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}{" "}
                                  -{" "}
                                  {new Date(
                                    segment.arrival.at,
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </p>
                                <p className="text-xs text-gray-600">
                                  {segment.duration}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price and Booking */}
                <div className="flex justify-between items-center pt-4 border-t">
                  <div>
                    <p className="text-sm text-gray-600">Total Price</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {flight.price.currency} {flight.price.grandTotal}
                    </p>
                    <p className="text-xs text-gray-500">
                      {flight.numberOfBookableSeats} seats available
                    </p>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
                    Select Flight
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {!loading && !error && flights.length === 0 && (
        <div className="text-center py-12 text-gray-600">
          <p className="text-lg">No flights found for the selected criteria</p>
          <p className="text-sm mt-2">Try adjusting your search parameters</p>
        </div>
      )}
    </div>
  );
}
