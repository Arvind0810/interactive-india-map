const iconStyle = {
  width: "20px",
  height: "20px",
  color: "#9ca3af",
  fill: "none",
};

const statCircle = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  backgroundColor: "#f3f4f6",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

const labelStyle = {
  fontSize: "10px",
  letterSpacing: "0.2em",
  color: "#9ca3af",
  textTransform: "uppercase",
  margin: 0,
};

const valueStyle = {
  fontSize: "18px",
  fontWeight: 700,
  color: "#374151",
  margin: 0,
};

export default function InfoPanel({ className, style }) {
  return (
    <div
      className={className}
      style={{ display: "flex", flexDirection: "column", gap: "24px", ...style }}
    >
      {/* Title */}
      <div>
        <p
          style={{
            fontSize: "12px",
            letterSpacing: "0.3em",
            color: "#9ca3af",
            textTransform: "uppercase",
            marginBottom: "4px",
            margin: "0 0 4px 0",
          }}
        >
          Infographic
        </p>
        <h1
          style={{
            fontSize: "2.25rem",
            fontWeight: 800,
            color: "#1f2937",
            letterSpacing: "-0.025em",
            margin: 0,
          }}
        >
          INDIA
        </h1>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: "14px",
          color: "#9ca3af",
          lineHeight: 1.625,
          maxWidth: "260px",
          margin: 0,
        }}
      >
        Explore India's diverse states — hover over the map to discover what
        each region is famous for.
      </p>

      {/* Stats */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={statCircle}>
            <svg style={iconStyle} viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <p style={labelStyle}>Area</p>
            <p style={valueStyle}>3.287 million km²</p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={statCircle}>
            <svg style={iconStyle} viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div>
            <p style={labelStyle}>Population</p>
            <p style={valueStyle}>1.43 billion</p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={statCircle}>
            <svg style={iconStyle} viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <div>
            <p style={labelStyle}>States & UTs</p>
            <p style={valueStyle}>28 + 8</p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={{ marginTop: "16px" }}>
        <p
          style={{
            fontSize: "10px",
            letterSpacing: "0.2em",
            color: "#9ca3af",
            textTransform: "uppercase",
            marginBottom: "12px",
            margin: "0 0 12px 0",
          }}
        >
          Region Highlights
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {[
            { color: "#3b82f6", label: "Northern States" },
            { color: "#22c55e", label: "Western States" },
            { color: "#7c3aed", label: "Eastern States" },
            { color: "#dc2626", label: "Southern States" },
            { color: "#06b6d4", label: "Central States" },
          ].map((item) => (
            <div
              key={item.label}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: item.color,
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: "12px", color: "#6b7280" }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
