interface FlightRowProps {
  airline: string;
  time: string;
  details: string;
  price: string;
}

export function FlightRow({ airline, time, details, price }: FlightRowProps) {
  return (
    <div className="border border-[#12a4e5] rounded-xl p-4 flex items-center justify-between hover:border-white/20">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-[10px] font-bold">
          {airline[0]}
        </div>
        <div>
          <p className="text-sm font-bold">{airline}</p>
          <p className="text-xs text-indigo-300">{time}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-base font-bold text-indigo-200">{price}</p>
        <p className="text-[10px] text-indigo-400">{details}</p>
      </div>
    </div>
  );
}
