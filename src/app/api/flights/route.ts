import { NextResponse } from "next/server";
import { searchFlights } from "@/lib/skyScrapper";

export async function POST(req: Request) {
  const body = await req.json();
  const data = await searchFlights(body);
  return NextResponse.json(data);
}
