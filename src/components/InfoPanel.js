export default function InfoPanel() {
  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <div>
        <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-1">Infographic</p>
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">INDIA</h1>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-400 leading-relaxed max-w-[260px]">
        Explore India's diverse states — hover over the map to discover what each region is famous for.
      </p>

      {/* Stats */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase">Area</p>
            <p className="text-lg font-bold text-gray-700">3.287 million km²</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase">Population</p>
            <p className="text-lg font-bold text-gray-700">1.43 billion</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase">States & UTs</p>
            <p className="text-lg font-bold text-gray-700">28 + 8</p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4">
        <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-3">Region Highlights</p>
        <div className="flex flex-col gap-2">
          {[
            { color: "#3b82f6", label: "Northern States" },
            { color: "#22c55e", label: "Western States" },
            { color: "#7c3aed", label: "Eastern States" },
            { color: "#dc2626", label: "Southern States" },
            { color: "#06b6d4", label: "Central States" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-gray-500">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
