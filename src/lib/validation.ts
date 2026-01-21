import { z } from "zod";

export const searchParamsSchema = z.object({
  from: z.string().min(1, "Departure city is required"),
  to: z.string().min(1, "Arrival city is required"),
  date: z.string().refine((dateStr) => {
    const selectedDate = new Date(dateStr);
    const today = new Date();
    // Reset time to midnight for a fair date comparison
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  }, "Departure date cannot be in the past"),
  trip: z.enum(["oneway", "round", "multi"]),
  cabin: z.enum(["economy", "premium", "business", "first"]),
  // Use coerce to handle cases where the URL param might be a string
  p: z.coerce
    .number()
    .min(1, "At least 1 passenger is required")
    .max(6, "Maximum 6 passengers allowed"),
  return: z.string().optional(),
});

export type SearchParams = z.infer<typeof searchParamsSchema>;
