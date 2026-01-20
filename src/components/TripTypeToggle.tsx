import clsx from "clsx";
import { TripType } from "@/types/allTypes";

const OPTIONS: { label: string; value: TripType }[] = [
  { label: "One Way", value: "oneway" },
  { label: "Round Trip", value: "round" },
  { label: "Multi City", value: "multi" },
];

interface TripTypeToggleProps {
  value: TripType;
  onChange: (value: TripType) => void;
}

export function TripTypeToggle({ value, onChange }: TripTypeToggleProps) {
  const activeIndex = OPTIONS.findIndex((o) => o.value === value);

  return (
    <div
      className="
        relative inline-grid
        grid-cols-3
        rounded-xl
        border border-indigo-500
        p-1
        w-full max-w-sm
      "
    >
      {/* Sliding indicator */}
      <div
        className="
          absolute inset-y-1
          left-1
          w-[calc(100%/3)]
          rounded-lg
          bg-indigo-500
          transition-transform duration-500
          ease-[cubic-bezier(0.33,0.83,0.99,0.98)]
        "
        style={{ transform: `translateX(${activeIndex * 100}%)` }}
      />

      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={clsx(
            `
              relative z-10
              flex h-9
              items-center justify-center
              text-xs sm:text-sm
              font-medium
              transition-colors
            `,
            value === opt.value
              ? "text-white"
              : "text-white/70 hover:text-white",
          )}
        >
          <span className="truncate px-1">{opt.label}</span>
        </button>
      ))}
    </div>
  );
}
