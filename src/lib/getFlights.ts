import { FLIGHT_URL, getAccessToken } from "./amadeus";

// Mock flight data for testing
function generateMockFlights(
  origin: string,
  destination: string,
  date: string,
) {
  const airlines = [
    { code: "BA", name: "British Airways" },
    { code: "AA", name: "American Airlines" },
    { code: "LH", name: "Lufthansa" },
    { code: "AF", name: "Air France" },
    { code: "EK", name: "Emirates" },
  ];

  const mockFlights = [];

  for (let i = 0; i < 5; i++) {
    const airline = airlines[i % airlines.length];
    const departureTime = new Date(date);
    departureTime.setHours(6 + i * 3, Math.random() > 0.5 ? 30 : 0, 0);

    const arrivalTime = new Date(departureTime);
    arrivalTime.setHours(
      arrivalTime.getHours() + 8 + Math.floor(Math.random() * 4),
    );

    mockFlights.push({
      id: `${airline.code}-${i}-${Date.now()}`,
      source: "GDS",
      instantTicketingRequired: false,
      nonHomogeneous: false,
      oneWay: true,
      lastTicketingDate: new Date(date).toISOString().split("T")[0],
      numberOfBookableSeats: Math.floor(Math.random() * 8) + 1,
      itineraries: [
        {
          duration: `PT${8 + Math.floor(Math.random() * 4)}H${Math.floor(Math.random() * 60)}M`,
          segments: [
            {
              departure: {
                iataCode: origin,
                at: departureTime.toISOString(),
              },
              arrival: {
                iataCode: destination,
                at: arrivalTime.toISOString(),
              },
              carrierCode: airline.code,
              number: String(Math.floor(Math.random() * 9000) + 100),
              aircraft: { code: "32A" },
              operating: { carrierCode: airline.code },
              stops: Math.random() > 0.7 ? 1 : 0,
              duration: `PT${8 + Math.floor(Math.random() * 4)}H${Math.floor(Math.random() * 60)}M`,
            },
          ],
        },
      ],
      price: {
        currency: "USD",
        total: String(Math.floor(Math.random() * 800) + 150),
        base: String(Math.floor(Math.random() * 700) + 100),
        fee: "0",
        grandTotal: String(Math.floor(Math.random() * 800) + 150),
      },
      pricingOptions: {
        fareType: ["PUBLISHED"],
        includedCheckedBagsOnly: true,
      },
      validatingAirlineCodes: [airline.code],
      travelerPricings: [
        {
          travelerId: "1",
          fareOption: "PUBLISHED",
          travelerType: "ADULT",
          price: {
            currency: "USD",
            total: String(Math.floor(Math.random() * 800) + 150),
            base: String(Math.floor(Math.random() * 700) + 100),
            fee: "0",
            grandTotal: String(Math.floor(Math.random() * 800) + 150),
          },
          fareDetailsBySegment: [
            {
              segmentId: "1",
              cabin: "ECONOMY",
              fareBasis: "YCLXUS",
              class: "Y",
              includedCheckedBags: {
                weight: 23,
                weightUnit: "KG",
              },
            },
          ],
        },
      ],
    });
  }

  return mockFlights;
}

export async function getFlights({
  origin,
  destination,
  date,
  adults = 1,
}: {
  origin: string;
  destination: string;
  date: string;
  adults?: number;
}) {
  try {
    const token = await getAccessToken();

    const url =
      `${FLIGHT_URL}?originLocationCode=${origin}` +
      `&destinationLocationCode=${destination}` +
      `&departureDate=${date}` +
      `&adults=${adults}` +
      `&currencyCode=USD` +
      `&max=50`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      const mockFlights = generateMockFlights(origin, destination, date);
      return { data: mockFlights };
    }

    const jsonData = await res.json();
    return jsonData;
  } catch {
    const mockFlights = generateMockFlights(origin, destination, date);
    return { data: mockFlights };
  }
}
