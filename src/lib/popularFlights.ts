import { FlightOffer } from "@/types/allTypes";

export const popularFlights: FlightOffer[] = [
  {
    id: "popular-1",
    price: { grandTotal: "320" },
    itineraries: [
      {
        duration: "PT3H15M",
        segments: [
          {
            departure: { at: "2026-02-01T08:00:00" },
            carrierCode: "DL",
          },
        ],
      },
    ],
  } as FlightOffer,

  {
    id: "popular-2",
    price: { grandTotal: "360" },
    itineraries: [
      {
        duration: "PT4H10M",
        segments: [
          {
            departure: { at: "2026-02-01T09:30:00" },
            carrierCode: "UA",
          },
        ],
      },
    ],
  } as FlightOffer,

  {
    id: "popular-3",
    price: { grandTotal: "410" },
    itineraries: [
      {
        duration: "PT5H00M",
        segments: [
          {
            departure: { at: "2026-02-01T11:00:00" },
            carrierCode: "AA",
          },
        ],
      },
    ],
  } as FlightOffer,

  {
    id: "popular-4",
    price: { grandTotal: "450" },
    itineraries: [
      {
        duration: "PT6H20M",
        segments: [
          {
            departure: { at: "2026-02-01T13:45:00" },
            carrierCode: "EK",
          },
        ],
      },
    ],
  } as FlightOffer,

  {
    id: "popular-5",
    price: { grandTotal: "380" },
    itineraries: [
      {
        duration: "PT4H50M",
        segments: [
          {
            departure: { at: "2026-02-01T16:10:00" },
            carrierCode: "QR",
          },
        ],
      },
    ],
  } as FlightOffer,
  {
    id: "popular-6",
    price: { grandTotal: "180" },
    itineraries: [
      {
        duration: "PT4H50M",
        segments: [
          {
            departure: { at: "2026-02-01T16:10:00" },
            carrierCode: "QR",
          },
        ],
      },
    ],
  } as FlightOffer,
];
