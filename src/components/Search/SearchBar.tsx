"use client";

import { CabinType, TripType } from "@/app/types/allTypes";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchBar() {
  const router = useRouter();

  const [tripType, setTripType] = useState<TripType>("oneway");
  const [cabin, setCabin] = useState<CabinType>("economy");

  const [from, setFrom] = useState("NYC");
  const [to, setTo] = useState("LAX");
  const [date, setDate] = useState("2026-05-25");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const params = new URLSearchParams({
      from,
      to,
      date,
      p: String(passengers),
      trip: tripType,
      cabin,
    });

    if (tripType === "round") {
      params.append("return", returnDate);
    }

    router.push(`/search?${params.toString()}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="
        sticky top-4 z-50
        mx-auto max-w-6xl
        rounded-2xl
        border border-white/20
        bg-white/10 backdrop-blur-xl
        shadow-[0_0_40px_rgba(99,102,241,0.35)]
        p-4
      "
    >
      {/* Trip Type */}
      <div className="mb-4 flex gap-2">
        {[
          { label: "One Way", value: "oneway" },
          { label: "Round Trip", value: "round" },
          { label: "Multi City", value: "multi" },
        ].map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => setTripType(t.value as TripType)}
            className={`
              rounded-xl px-4 py-2 text-sm font-medium
              transition
              ${
                tripType === t.value
                  ? "bg-indigo-500 text-white shadow"
                  : "bg-white/10 text-white/80 hover:bg-white/20"
              }
            `}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div className="grid gap-3 md:grid-cols-6">
        <input
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          placeholder="From"
          className="glass-input"
        />

        <input
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="To"
          className="glass-input"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="glass-input"
        />

        {tripType === "round" && (
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="glass-input"
          />
        )}

        {/* Cabin Type */}
        <select
          value={cabin}
          onChange={(e) => setCabin(e.target.value as CabinType)}
          className="glass-input"
        >
          <option value="economy">Economy</option>
          <option value="premium">Premium Economy</option>
          <option value="business">Business</option>
          <option value="first">First Class</option>
        </select>

        {/* Passengers */}
        <select
          value={passengers}
          onChange={(e) => setPassengers(Number(e.target.value))}
          className="glass-input"
        >
          {[1, 2, 3, 4, 5, 6].map((p) => (
            <option key={p} value={p}>
              {p} Passenger{p > 1 && "s"}
            </option>
          ))}
        </select>
      </div>

      {/* CTA */}
      <div className="mt-4">
        <button
          type="submit"
          className="
            w-full rounded-xl
            bg-linear-to-r from-indigo-500 to-cyan-500
            px-6 py-3
            font-semibold text-white
            shadow-lg
            transition hover:scale-[1.02]
          "
        >
          Search Flights
        </button>
      </div>
    </form>
  );
}
