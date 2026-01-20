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