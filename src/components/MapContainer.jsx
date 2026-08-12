import IndiaMap from "./IndiaMap";
import InfoPanel from "./InfoPanel";

export default function MapContainer({ indiaMapProps, className, style }) {
  return (
    <div
      className={className}
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f9fafb, #f3f4f6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        boxSizing: "border-box",
        ...style,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "72rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          gap: "48px",
          justifyContent: "center",
        }}
      >
        {/* Info Panel */}
        <div style={{ width: "280px", flexShrink: 0 }}>
          <InfoPanel />
        </div>

        {/* Map */}
        <div style={{ flex: "1 1 0%", maxWidth: "700px", minWidth: "300px" }}>
          <IndiaMap {...indiaMapProps} />
        </div>
      </div>
    </div>
  );
}
