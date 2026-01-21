import { FlightOffer } from "@/types/allTypes";

export function FlightCard({ flight }: { flight: FlightOffer }) {
  return (
    <div className="bg-indigo-900/60 rounded-xl p-4 hover:bg-indigo-900/80 transition-all border border-white/5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1 space-y-4">
          {flight.itineraries.map((itinerary, idx) => (
            <div key={idx} className="space-y-2">
              {itinerary.segments.map((segment, segIdx) => (
                <div key={segIdx} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center font-bold text-xs">
                    {segment.carrierCode}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between max-w-xs">
                      <p className="text-lg font-bold">
                        {segment.departure.iataCode}
                      </p>
                      <div className="flex-1 border-t border-dashed border-white/20 mx-4 relative">
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[10px] bg-indigo-950 px-2 text-indigo-400">
                          {segment.duration.replace("PT", "").toLowerCase()}
                        </span>
                      </div>
                      <p className="text-lg font-bold">
                        {segment.arrival.iataCode}
                      </p>
                    </div>
                    <p className="text-xs text-indigo-300">
                      {new Date(segment.departure.at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      —{" "}
                      {new Date(segment.arrival.at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 border-white/10 pt-4 sm:pt-0">
          <div className="text-left sm:text-right">
            <p className="text-2xl font-black text-white">
              {flight.price.currency === "USD" ? "$" : flight.price.currency}
              {Math.round(Number(flight.price.grandTotal))}
            </p>
            <p className="text-[10px] text-indigo-400 uppercase font-bold">
              {flight.numberOfBookableSeats} seats left
            </p>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg font-bold text-sm shadow-lg">
            Select
          </button>
        </div>
      </div>
    </div>
  );
}
