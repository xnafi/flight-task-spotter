"use client";

import { useState, useEffect, useCallback } from "react";
import { ReSelect } from "../re-ui/ReSelect";
import { FlightOffer } from "@/types/allTypes";

interface FiltersSidebarProps {
  show: boolean;
  flights?: FlightOffer[];
  onFilter?: (filtered: FlightOffer[]) => void;
}

export function FiltersSidebar({
  show,
  flights = [],
  onFilter = () => {},
}: FiltersSidebarProps) {
  const [stops, setStops] = useState("");
  const [airline, setAirline] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [maxDuration, setMaxDuration] = useState("");
  const [maxPrice, setMaxPrice] = useState(1200);

  // Memoize the filter callback to prevent infinite loops
  const handleFilter = useCallback(
    (filtered: FlightOffer[]) => {
      onFilter(filtered);
    },
    [onFilter],
  );

  // Apply filters whenever filters or flights change
  useEffect(() => {
    if (!flights || flights.length === 0) {
      handleFilter([]);
      return;
    }

    let filtered = [...flights];

    // Filter by stops
    if (stops) {
      filtered = filtered.filter((flight) => {
        const totalStops = flight.itineraries.reduce(
          (acc, it) => acc + (it.segments.length - 1),
          0,
        );
        if (stops === "0") return totalStops === 0;
        if (stops === "1") return totalStops === 1;
        if (stops === "2+") return totalStops >= 2;
        return true;
      });
    }

    // Filter by airline
    if (airline) {
      filtered = filtered.filter((flight) =>
        flight.itineraries.some((it) =>
          it.segments.some((seg) => seg.carrierCode === airline),
        ),
      );
    }

    // Filter by departure time window
    if (departureTime) {
      const [startHour, endHour] = departureTime.split("-").map(Number);
      filtered = filtered.filter((flight) =>
        flight.itineraries.some((it) =>
          it.segments.some((seg) => {
            const hour = new Date(seg.departure.at).getHours();
            return hour >= startHour && hour < endHour;
          }),
        ),
      );
    }

    // Filter by max duration
    if (maxDuration) {
      const maxHours = Number(maxDuration);
      filtered = filtered.filter((flight) =>
        flight.itineraries.every((it) => {
          const durationMatch = it.duration.match(/(\d+)H/);
          const hours = durationMatch ? Number(durationMatch[1]) : 0;
          return hours <= maxHours;
        }),
      );
    }

    // Filter by max price
    filtered = filtered.filter(
      (flight) => Number(flight.price.grandTotal) <= maxPrice,
    );

    // Sort
    if (sortBy === "price") {
      filtered.sort(
        (a, b) => Number(a.price.grandTotal) - Number(b.price.grandTotal),
      );
    } else if (sortBy === "duration") {
      filtered.sort((a, b) => {
        const aDuration = a.itineraries[0]?.duration || "PT0H";
        const bDuration = b.itineraries[0]?.duration || "PT0H";
        const aHours = Number(aDuration.match(/(\d+)H/)?.[1]) || 0;
        const bHours = Number(bDuration.match(/(\d+)H/)?.[1]) || 0;
        return aHours - bHours;
      });
    } else if (sortBy === "departure") {
      filtered.sort((a, b) => {
        const aTime = new Date(
          a.itineraries[0]?.segments[0]?.departure.at || 0,
        ).getTime();
        const bTime = new Date(
          b.itineraries[0]?.segments[0]?.departure.at || 0,
        ).getTime();
        return aTime - bTime;
      });
    }

    handleFilter(filtered);
  }, [
    stops,
    airline,
    departureTime,
    maxDuration,
    maxPrice,
    sortBy,
    flights,
    handleFilter,
  ]);

  const handleReset = () => {
    setStops("");
    setAirline("");
    setSortBy("");
    setDepartureTime("");
    setMaxDuration("");
    setMaxPrice(1200);
  };

  return (
    <aside
      className={`${show ? "block" : "hidden"} md:block col-span-1 space-y-5 rounded-2xl border border-[#12a4e5] p-4 md:bg-transparent h-fit`}
    >
      <h3 className="font-semibold hidden md:block">Filters</h3>

      {/* Stops */}
      <ReSelect
        id="stops"
        label="Stops"
        value={stops}
        onChange={(e) => setStops(e.target.value)}
        options={[
          { label: "Any", value: "" },
          { label: "Nonstop", value: "0" },
          { label: "1 Stop", value: "1" },
          { label: "2+ Stops", value: "2+" },
        ]}
      />

      {/* Airlines (carrierCode) */}
      <ReSelect
        id="airline"
        label="Airline"
        value={airline}
        onChange={(e) => setAirline(e.target.value)}
        options={[
          { label: "Any", value: "" },
          { label: "Delta (DL)", value: "DL" },
          { label: "American (AA)", value: "AA" },
          { label: "United (UA)", value: "UA" },
          { label: "Alaska (AS)", value: "AS" },
          { label: "Lufthansa (LH)", value: "LH" },
        ]}
      />

      {/* Departure Time Window */}
      <ReSelect
        id="departureTime"
        label="Departure Time"
        value={departureTime}
        onChange={(e) => setDepartureTime(e.target.value)}
        options={[
          { label: "Any", value: "" },
          { label: "Early Morning (00–06)", value: "0-6" },
          { label: "Morning (06–12)", value: "6-12" },
          { label: "Afternoon (12–18)", value: "12-18" },
          { label: "Evening (18–24)", value: "18-24" },
        ]}
      />

      {/* Max Duration (post-filter, ISO duration from segments) */}
      <ReSelect
        id="maxDuration"
        label="Max Duration"
        value={maxDuration}
        onChange={(e) => setMaxDuration(e.target.value)}
        options={[
          { label: "Any", value: "" },
          { label: "≤ 4 hours", value: "4" },
          { label: "≤ 6 hours", value: "6" },
          { label: "≤ 8 hours", value: "8" },
          { label: "≤ 12 hours", value: "12" },
        ]}
      />

      {/* Sort */}
      <ReSelect
        id="sort"
        label="Sort By"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        options={[
          { label: "Recommended", value: "" },
          { label: "Lowest Price", value: "price" },
          { label: "Shortest Duration", value: "duration" },
          { label: "Departure Time", value: "departure" },
        ]}
      />

      {/* Price Range */}
      <div className="space-y-2 pt-2">
        <p className="text-sm font-medium text-indigo-200">
          Max Price (${maxPrice})
        </p>
        <input
          type="range"
          className="w-full accent-indigo-500"
          min={100}
          max={2000}
          step={50}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
        <div className="flex justify-between text-xs text-indigo-300">
          <span>$100</span>
          <span>$2000+</span>
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={handleReset}
        className="w-full py-2 text-sm text-indigo-300 hover:text-white underline underline-offset-4 cursor-pointer"
      >
        Reset all filters
      </button>
    </aside>
  );
}
