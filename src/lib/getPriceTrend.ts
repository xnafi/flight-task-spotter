export interface PriceTrendData {
  day: string;
  price: number;
  date: string;
}

interface GetPriceTrendParams {
  origin: string;
  destination: string;
  departureDate: string;
}

export async function getPriceTrend({
  departureDate,
}: GetPriceTrendParams): Promise<PriceTrendData[]> {
  // Replace this with real provider logic (Amadeus, Duffel, internal DB, etc.)
  // This mock simulates fluctuating prices
  const basePrice = 650;

  return Array.from({ length: 7 }).map((_, i) => {
    const date = new Date(departureDate);
    date.setDate(date.getDate() + i);

    return {
      day: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      date: date.toISOString().split("T")[0],
      price: Math.round(basePrice + (Math.random() * 120 - 60)),
    };
  });
}
