"use client";

import { CabinType, TripType } from "@/types/allTypes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import { ReInput } from "../re-ui/Re-Input";
import { TripTypeToggle } from "@/components/TripTypeToggle";
import { ReSelect } from "../re-ui/ReSelect";
import ReButton from "../re-ui/Re-Button";

interface FormErrors {
  from?: string;
  to?: string;
  date?: string;
  returnDate?: string;
}

export function SearchBar() {
  const router = useRouter();

  const [tripType, setTripType] = useState<TripType>("oneway");
  const [cabin, setCabin] = useState<CabinType>("economy");

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [returnDate, setReturnDate] = useState("");

  const [passengers, setPassengers] = useState(1);
  const [errors, setErrors] = useState<FormErrors>({});

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newErrors: FormErrors = {};

    if (!from.trim()) newErrors.from = "Departure city is required";
    if (!to.trim()) newErrors.to = "Arrival city is required";
    if (!date) newErrors.date = "Departure date is required";

    const selectedDate = new Date(date);
    const todayDate = new Date(today);

    if (selectedDate < todayDate) {
      newErrors.date = "Departure date cannot be in the past";
    }

    if (tripType === "round" && !returnDate) {
      newErrors.returnDate = "Return date is required";
    }

    if (tripType === "round" && returnDate) {
      const returnDateObj = new Date(returnDate);
      if (returnDateObj <= selectedDate) {
        newErrors.returnDate = "Return date must be after departure date";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

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
      className={clsx(
        "sticky top-4 z-20 mx-auto rounded-2xl border border-white/20",
        "bg-white/10 backdrop-blur-xl shadow-[0_0_40px_rgba(99,102,241,0.35)] p-4",
      )}
    >
      {/* Trip Type */}
      <div className="mb-4 flex justify-center md:justify-start">
        <TripTypeToggle value={tripType} onChange={setTripType} />
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-2 lg:flex lg:flex-wrap gap-4 w-full items-start">
        {/* From */}
        <div className="flex flex-col gap-1">
          <ReInput
            id="from"
            label="From"
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
              if (errors.from) setErrors({ ...errors, from: undefined });
            }}
            placeHolder=" "
            className="glass-input"
          />
          <p className="min-h-4 text-xs text-red-400">{errors.from ?? ""}</p>
        </div>

        {/* To */}
        <div className="flex flex-col gap-1">
          <ReInput
            id="to"
            label="To"
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
              if (errors.to) setErrors({ ...errors, to: undefined });
            }}
            placeHolder=" "
            className="glass-input"
          />
          <p className="min-h-4 text-xs text-red-400">{errors.to ?? ""}</p>
        </div>

        {/* Departure */}
        <div className="flex flex-col gap-1">
          <ReInput
            id="date"
            type="date"
            label="Departure"
            value={date}
            min={today}
            onChange={(e) => {
              setDate(e.target.value);
              if (errors.date) setErrors({ ...errors, date: undefined });
            }}
            placeHolder=" "
            className="glass-input"
          />
          <p className="min-h-4 text-xs text-red-400">{errors.date ?? ""}</p>
        </div>

        {/* Return */}
        {tripType === "round" && (
          <div className="flex flex-col gap-1">
            <ReInput
              id="returnDate"
              type="date"
              label="Return"
              value={returnDate}
              min={date}
              onChange={(e) => {
                setReturnDate(e.target.value);
                if (errors.returnDate)
                  setErrors({
                    ...errors,
                    returnDate: undefined,
                  });
              }}
              placeHolder=" "
              className="glass-input"
            />
            <p className="min-h-4 text-xs text-red-400">
              {errors.returnDate ?? ""}
            </p>
          </div>
        )}

        {/* Cabin */}
        <ReSelect
          id="cabin"
          label="Cabin"
          value={cabin}
          onChange={(e) => setCabin(e.target.value as CabinType)}
          className="glass-input"
          options={[
            { label: "Economy", value: "economy" },
            { label: "Premium Economy", value: "premium" },
            { label: "Business", value: "business" },
            { label: "First Class", value: "first" },
          ]}
        />

        {/* Passengers */}
        <ReSelect
          id="passengers"
          label="Passengers"
          value={passengers}
          onChange={(e) => setPassengers(Number(e.target.value))}
          className="glass-input"
          options={[1, 2, 3, 4, 5, 6].map((p) => ({
            label: `${p} Passenger${p > 1 ? "s" : ""}`,
            value: p,
          }))}
        />

        {/* CTA */}
        <div className="min-w-40">
          <ReButton type="submit">Search</ReButton>
        </div>
      </div>
    </form>
  );
}
