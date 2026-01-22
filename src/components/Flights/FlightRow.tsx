interface FlightRowProps {
  airline: string;
  time: string;
  details: string;
  price: string;
}

export function FlightRow({ airline, time, details, price }: FlightRowProps) {
  return (
    <div className="rounded-xl p-4 transition-all border border-[#12a4e5] hover:border-white/20">
      <div className="flex items-center justify-between gap-4">
        {/* Airline / Time */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-indigo-500 flex items-center justify-center font-bold text-xs border border-indigo-400/50 shrink-0">
            <span className="text-indigo-200">
              {airline.slice(0, 2).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="text-sm font-bold text-white">{airline}</p>
            <p className="text-xs text-indigo-300">{time}</p>
          </div>
        </div>

        {/* Price / Details */}
        <div className="text-right">
          <p className="text-lg font-black text-white">{price}</p>
          <p className="text-[10px] uppercase font-bold text-indigo-400">
            {details}
          </p>
        </div>
      </div>
    </div>
  );
}
