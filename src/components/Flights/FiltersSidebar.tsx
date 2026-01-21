export function FiltersSidebar({ show }: { show: boolean }) {
  return (
    <aside
      className={`${show ? "block" : "hidden"} md:block col-span-1 space-y-4 rounded-2xl border border-white/20 p-4 bg-indigo-900/40 md:bg-transparent`}
    >
      <h3 className="font-semibold hidden md:block">Filters</h3>

      {[
        { label: "Stops", items: ["Nonstop", "1 Stop", "2+ Stops"] },
        { label: "Airlines", items: ["Delta", "American", "United", "Alaska"] },
        { label: "Airports", items: ["JFK", "LGA", "EWR"] },
      ].map((group) => (
        <div key={group.label} className="space-y-2">
          <p className="text-sm font-medium text-indigo-200">{group.label}</p>
          {group.items.map((item) => (
            <label
              key={item}
              className="flex items-center gap-2 text-sm cursor-pointer hover:text-white"
            >
              <input
                type="checkbox"
                className="rounded border-white/20 bg-indigo-950 text-indigo-600"
              />
              {item}
            </label>
          ))}
        </div>
      ))}

      <div className="space-y-2">
        <p className="text-sm font-medium text-indigo-200">Price Range</p>
        <input type="range" className="w-full accent-indigo-500" />
        <div className="flex justify-between text-xs text-indigo-300">
          <span>$200</span>
          <span>$1200+</span>
        </div>
      </div>

      <button className="w-full py-2 text-sm text-indigo-300 hover:text-white underline">
        Reset all filters
      </button>
    </aside>
  );
}
