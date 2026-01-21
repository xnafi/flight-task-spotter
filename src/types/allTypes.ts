import { SelectHTMLAttributes } from "react";

export type TripType = "oneway" | "round" | "multi";
export type CabinType = "economy" | "premium" | "business" | "first";

export interface InputProps {
  id: string;
  name?: string;
  label: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeHolder?: string;
}

export interface ReSelectOption {
  label: string;
  value: string | number;
}

export interface ReSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  value: string | number;
  options: ReSelectOption[];
  className?: string;
}

// Amadeus API Types
export interface FlightSegment {
  departure: {
    iataCode: string;
    at: string;
  };
  arrival: {
    iataCode: string;
    at: string;
  };
  carrierCode: string;
  number: string;
  aircraft: {
    code: string;
  };
  operating?: {
    carrierCode: string;
  };
  stops?: number;
  duration: string;
}

export interface FlightItinerary {
  duration: string;
  segments: FlightSegment[];
}

export interface FlightPrice {
  currency: string;
  total: string;
  base: string;
  fee: string;
  grandTotal: string;
}

export interface FlightOffer {
  id: string;
  source: string;
  instantTicketingRequired: boolean;
  nonHomogeneous: boolean;
  oneWay: boolean;
  lastTicketingDate: string;
  numberOfBookableSeats: number;
  itineraries: FlightItinerary[];
  price: FlightPrice;
  pricingOptions: {
    fareType: string[];
    includedCheckedBagsOnly: boolean;
  };
  validatingAirlineCodes: string[];
  travelerPricings: Array<{
    travelerId: string;
    fareOption: string;
    travelerType: string;
    price: FlightPrice;
    fareDetailsBySegment: Array<{
      segmentId: string;
      cabin: string;
      fareBasis: string;
      class: string;
      includedCheckedBags: {
        weight: number;
        weightUnit: string;
      };
    }>;
  }>;
}

export interface FlightSearchResponse {
  data: FlightOffer[];
  dictionaries?: {
    locations?: Record<string, { cityName: string; countryName: string }>;
    aircraft?: Record<string, string>;
    airlines?: Record<string, string>;
    currencies?: Record<string, string>;
  };
}
