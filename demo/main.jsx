import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { IndiaMap, MapContainer } from "../src/index.jsx";
import "../src/styles.css";

// Example: Company Branches
const branches = [
  {
    id: "mumbai-hq",
    coordinates: [72.88, 19.08],
    color: "#ef4444",
    label: "Mumbai HQ",
    description: "Head Office — 500+ employees",
  },
  {
    id: "bangalore",
    coordinates: [77.59, 12.97],
    color: "#8b5cf6",
    label: "Bangalore Tech Hub",
    description: "Engineering Center — 200+ developers",
  },
  {
    id: "delhi-sales",
    coordinates: [77.21, 28.61],
    color: "#22c55e",
    label: "Delhi Sales Office",
    description: "North India Sales — 50+ team",
  },
  {
    id: "hyderabad",
    coordinates: [78.47, 17.38],
    color: "#f59e0b",
    label: "Hyderabad Office",
    description: "Cloud & Data Center — 120+ engineers",
  },
  {
    id: "kolkata",
    coordinates: [88.36, 22.57],
    color: "#06b6d4",
    label: "Kolkata Support Center",
    description: "Customer Support — 80+ agents",
  },
];

function App() {
  const [mode, setMode] = useState("default");

  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Mode switcher */}
      <div
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 100,
          display: "flex",
          gap: "8px",
          background: "white",
          padding: "8px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        {[
          { key: "default", label: "🗺️ Infographic" },
          { key: "branches", label: "🏢 Branches" },
          { key: "zones", label: "🚚 Delivery" },
        ].map((m) => (
          <button
            key={m.key}
            onClick={() => setMode(m.key)}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: 600,
              background: mode === m.key ? "#1f2937" : "#f3f4f6",
              color: mode === m.key ? "white" : "#374151",
              transition: "all 0.2s ease",
            }}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Default infographic mode */}
      {mode === "default" && <MapContainer />}

      {/* Company branches mode */}
      {mode === "branches" && (
        <div
          style={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #f9fafb, #f3f4f6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "32px",
          }}
        >
          <div style={{ maxWidth: "700px", width: "100%" }}>
            <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#1f2937", marginBottom: "4px" }}>
              Our Offices Across India
            </h2>
            <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "24px" }}>
              Hover over markers to see office details
            </p>
            <IndiaMap
              markers={branches}
              highlightStates={["Maharashtra", "Karnataka", "Delhi", "Telangana", "West Bengal"]}
              highlightColor="#3b82f6"
              showDelhiLabel={false}
              onMarkerClick={(marker) => alert(`Selected: ${marker.label}\n${marker.description}`)}
            />
          </div>
        </div>
      )}

      {/* Delivery zones mode */}
      {mode === "zones" && (
        <div
          style={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #f0fdf4, #ecfdf5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "32px",
          }}
        >
          <div style={{ maxWidth: "700px", width: "100%" }}>
            <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#1f2937", marginBottom: "4px" }}>
              Delivery Coverage
            </h2>
            <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "24px" }}>
              Green states have next-day delivery available
            </p>
            <IndiaMap
              highlightStates={[
                "Maharashtra", "Gujarat", "Rajasthan", "Delhi",
                "Karnataka", "Tamil Nadu", "Telangana", "Uttar Pradesh",
                "Madhya Pradesh", "Haryana", "Punjab",
              ]}
              highlightColor="#22c55e"
              defaultStateColor="#f1f5f9"
              showMarkers={false}
              showDelhiLabel={false}
              renderPopover={(info, pos) => (
                <div
                  style={{
                    position: "fixed",
                    left: pos.x + 15,
                    top: pos.y - 10,
                    background: "white",
                    padding: "12px 16px",
                    borderRadius: "10px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    pointerEvents: "none",
                    zIndex: 50,
                    minWidth: "180px",
                  }}
                >
                  <strong style={{ fontSize: "14px", color: "#1f2937" }}>{info.name}</strong>
                  <p style={{ fontSize: "12px", color: "#6b7280", margin: "4px 0 0" }}>
                    {["Maharashtra", "Gujarat", "Rajasthan", "Delhi",
                      "Karnataka", "Tamil Nadu", "Telangana", "Uttar Pradesh",
                      "Madhya Pradesh", "Haryana", "Punjab"].includes(info.name)
                      ? "✅ Next-day delivery available"
                      : "📦 Standard delivery (3-5 days)"}
                  </p>
                </div>
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
