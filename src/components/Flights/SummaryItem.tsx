interface SummaryItemProps {
  label: string;
  value: string | number;
  highlight?: boolean;
  capitalize?: boolean;
}

export default function SummaryItem({
  label,
  value,
  highlight = false,
  capitalize = false,
}: SummaryItemProps) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-indigo-400 font-bold">
        {label}
      </p>
      <p
        className={`text-sm md:text-base font-semibold ${
          highlight ? "text-indigo-200 uppercase" : ""
        } ${capitalize ? "capitalize" : ""}`}
      >
        {value}
      </p>
    </div>
  );
}
