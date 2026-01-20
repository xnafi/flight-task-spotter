"use client";

import { CabinType, TripType } from "@/types/allTypes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ReInput } from "../re-ui/Re-Input";
import { TripTypeToggle } from "@/components/TripTypeToggle";

export function SearchBar() {
  const router = useRouter();

  const [tripType, setTripType] = useState<TripType>("oneway");
  const [cabin, setCabin] = useState<CabinType>("economy");

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
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
        mx-auto 
        rounded-2xl
        border border-white/20
        bg-white/10 backdrop-blur-xl
        shadow-[0_0_40px_rgba(99,102,241,0.35)]
        p-4
      "
    >
      {/* Trip Type Toggle */}
      <div className="mb-4 flex justify-center md:justify-start">
        <TripTypeToggle value={tripType} onChange={setTripType} />
      </div>

      {/* Inputs */}
      <div className="flex justify-between items-center gap-4 flex-wrap ">
        <ReInput
          id="from"
          label="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          placeHolder=" "
          className="glass-input"
        />

        <ReInput
          id="to"
          label="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeHolder=" "
          className="glass-input"
        />

        <ReInput
          id="date"
          type="date"
          label="Departure"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeHolder=" "
          className="glass-input"
        />

        {tripType === "round" && (
          <ReInput
            id="returnDate"
            type="date"
            label="Return"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            placeHolder=" "
            className="glass-input"
          />
        )}

        <select
          value={cabin}
          onChange={(e) => setCabin(e.target.value as CabinType)}
          className="glass-input rounded-xl"
        >
          <option value="economy">Economy</option>
          <option value="premium">Premium Economy</option>
          <option value="business">Business</option>
          <option value="first">First Class</option>
        </select>

        <select
          value={passengers}
          onChange={(e) => setPassengers(Number(e.target.value))}
          className="glass-input rounded-xl"
        >
          {[1, 2, 3, 4, 5, 6].map((p) => (
            <option key={p} value={p}>
              {p} Passenger{p > 1 && "s"}
            </option>
          ))}
        </select>
        {/* CTA */}
        <div className="">
          <button
            type="submit"
            className="
            w-full rounded-xl
            bg-linear-to-r from-indigo-500 to-cyan-500
            px-6 py-2
            font-semibold text-white
            shadow-lg
            transition hover:scale-[1.02]
          "
          >
            Search Flights
          </button>
        </div>
      </div>
    </form>
  );
}
