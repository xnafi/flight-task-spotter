import { getFlights } from "@/lib/getFlights";
import { convertCityToIata } from "@/lib/cityToIata";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const date = searchParams.get("date");
    const passengers = searchParams.get("passengers");

    // Validation
    if (!from || !to || !date || !passengers) {
      return NextResponse.json(
        { error: "Missing required parameters: from, to, date, passengers" },
        { status: 400 },
      );
    }

    // Convert city names to IATA codes
    const fromIata = convertCityToIata(from);
    const toIata = convertCityToIata(to);

    // Validate IATA codes (should be 3 letters)
    const iataRegex = /^[A-Z]{3}$/;
    if (!iataRegex.test(fromIata)) {
      return NextResponse.json(
        {
          error: `Invalid origin: "${from}". Could not convert to airport code. Try: dhaka, mumbai, london, jfk, etc.`,
        },
        { status: 400 },
      );
    }

    if (!iataRegex.test(toIata)) {
      return NextResponse.json(
        {
          error: `Invalid destination: "${to}". Could not convert to airport code. Try: sylhet, delhi, paris, lhr, etc.`,
        },
        { status: 400 },
      );
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return NextResponse.json(
        { error: "Invalid date format. Use YYYY-MM-DD" },
        { status: 400 },
      );
    }

    const data = await getFlights({
      origin: fromIata,
      destination: toIata,
      date,
      adults: Number(passengers) || 1,
    });

    return NextResponse.json(data);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("API Error:", errorMessage);

    return NextResponse.json(
      {
        error: "Failed to fetch flights",
        details: errorMessage,
      },
      { status: 500 },
    );
  }
}
