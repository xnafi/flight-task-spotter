"use client";

import { useState } from "react";
import { ReSelect } from "../re-ui/ReSelect";

export function FiltersSidebar({ show }: { show: boolean }) {
  const [stops, setStops] = useState("");
  const [airline, setAirline] = useState("");
  const [airport, setAirport] = useState("");
  const [cabin, setCabin] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [maxDuration, setMaxDuration] = useState("");
  const [refundable, setRefundable] = useState("");
  const [maxPrice, setMaxPrice] = useState(1200);

  return (
    <aside
      className={`${show ? "block" : "hidden"} md:block col-span-1 space-y-5 rounded-2xl border border-[#12a4e5] p-4 bg-indigo-900/40 md:bg-transparent h-fit`}
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

      {/* Departure Airport */}
      <ReSelect
        id="airport"
        label="Departure Airport"
        value={airport}
        onChange={(e) => setAirport(e.target.value)}
        options={[
          { label: "Any", value: "" },
          { label: "JFK", value: "JFK" },
          { label: "LGA", value: "LGA" },
          { label: "EWR", value: "EWR" },
        ]}
      />

      {/* Cabin (maps to traveler.pricingOptionFareType / class) */}
      <ReSelect
        id="cabin"
        label="Cabin Class"
        value={cabin}
        onChange={(e) => setCabin(e.target.value)}
        options={[
          { label: "Any", value: "" },
          { label: "Economy", value: "ECONOMY" },
          { label: "Premium Economy", value: "PREMIUM_ECONOMY" },
          { label: "Business", value: "BUSINESS" },
          { label: "First", value: "FIRST" },
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

      {/* Refundable */}
      <ReSelect
        id="refundable"
        label="Refundable"
        value={refundable}
        onChange={(e) => setRefundable(e.target.value)}
        options={[
          { label: "Any", value: "" },
          { label: "Refundable Only", value: "true" },
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
        onClick={() => {
          setStops("");
          setAirline("");
          setAirport("");
          setCabin("");
          setSortBy("");
          setDepartureTime("");
          setMaxDuration("");
          setRefundable("");
          setMaxPrice(1200);
        }}
        className="w-full py-2 text-sm text-indigo-300 hover:text-white underline underline-offset-4"
      >
        Reset all filters
      </button>
    </aside>
  );
}
