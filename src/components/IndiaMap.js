import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { statesInfo } from "../data/statesData";
import Marker from "./Marker";
import Popover from "./Popover";

const WIDTH = 500;
const HEIGHT = 580;

// Filter out distant island territories for a cleaner mainland view
const EXCLUDE_TERRITORIES = ["Andaman & Nicobar", "Lakshadweep"];

export default function IndiaMap() {
  const [hoveredState, setHoveredState] = useState(null);
  const [lockedState, setLockedState] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [geo, setGeo] = useState(null);
  const svgRef = useRef(null);

  const activeState = lockedState || hoveredState;

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/india_states.json")
      .then((r) => r.json())
      .then((data) => {
        // Filter out island territories
        data.features = data.features.filter(
          (f) => !EXCLUDE_TERRITORIES.includes(f.properties.ST_NM)
        );
        setGeo(data);
      })
      .catch(console.error);
  }, []);

  const projection = useMemo(
    () =>
      geoMercator()
        .center([82, 23.5])
        .scale(950)
        .translate([WIDTH / 2, HEIGHT / 2]),
    []
  );

  const pathGenerator = useMemo(() => geoPath().projection(projection), [projection]);

  const handleMouseMove = useCallback((e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  const handleStateHover = useCallback(
    (name) => {
      if (!lockedState) setHoveredState(name);
    },
    [lockedState]
  );

  const handleStateLeave = useCallback(() => {
    if (!lockedState) setHoveredState(null);
  }, [lockedState]);

  const handleStateClick = useCallback((name) => {
    setLockedState((prev) => (prev === name ? null : name));
    setHoveredState(null);
  }, []);

  const handleBgClick = useCallback((e) => {
    // Only unlock if clicking the SVG background (not a state)
    if (e.target.tagName === "svg" || e.target.tagName === "rect") {
      setLockedState(null);
      setHoveredState(null);
    }
  }, []);

  const getStateInfo = (name) => {
    const info = statesInfo[name];
    return info
      ? { name, ...info }
      : { name, famousFor: "A beautiful region of India", color: "#94a3b8" };
  };

  // Compute marker positions from capital city coordinates
  const markerData = useMemo(() => {
    const markers = [];
    for (const [stateName, info] of Object.entries(statesInfo)) {
      if (!info.hasMarker || !info.capitalCoords) continue;
      const [lng, lat] = info.capitalCoords;
      const pos = projection([lng, lat]);
      if (pos && !isNaN(pos[0])) {
        markers.push({
          name: stateName,
          capital: info.capital,
          x: pos[0],
          y: pos[1],
          color: info.color,
        });
      }
    }
    return markers;
  }, [projection]);

  // Delhi label position
  const delhiPos = useMemo(() => {
    if (!geo) return null;
    const delhi = geo.features.find((f) => f.properties.ST_NM === "Delhi");
    if (delhi) {
      const c = pathGenerator.centroid(delhi);
      if (c && !isNaN(c[0])) return { x: c[0], y: c[1] };
    }
    return null;
  }, [geo, pathGenerator]);

  if (!geo) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-400 text-sm">Loading map...</div>
      </div>
    );
  }

  return (
    <div className="relative" onMouseMove={handleMouseMove}>
      {/* Invisible background to catch clicks for unlocking */}
      <svg
        ref={svgRef}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full h-auto"
        style={{ filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.06))", maxHeight: "85vh" }}
        onClick={handleBgClick}
      >
        {/* Transparent background rect for click detection */}
        <rect x="0" y="0" width={WIDTH} height={HEIGHT} fill="transparent" />

        <defs>
          <filter id="markerShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* State paths */}
        {geo.features.map((feature, i) => {
          const name = feature.properties.ST_NM;
          const info = statesInfo[name] || {};
          const isActive = activeState === name;
          const color = info.color || "#94a3b8";
          const d = pathGenerator(feature);

          return (
            <path
              key={name || i}
              d={d}
              fill={isActive ? color : "#e2e8f0"}
              stroke={isActive ? color : "#cbd5e1"}
              strokeWidth={isActive ? 1.5 : 0.6}
              strokeLinejoin="round"
              style={{
                cursor: "pointer",
                transition: "fill 0.3s ease, stroke 0.3s ease, filter 0.3s ease",
                filter: isActive
                  ? `drop-shadow(0 4px 12px ${color}55)`
                  : "none",
              }}
              onMouseEnter={() => handleStateHover(name)}
              onMouseLeave={handleStateLeave}
              onClick={(e) => {
                e.stopPropagation();
                handleStateClick(name);
              }}
            />
          );
        })}

        {/* Markers */}
        {markerData.map((m) => (
          <Marker
            key={m.name}
            x={m.x}
            y={m.y}
            color={m.color}
            isHovered={activeState === m.name}
            onMouseEnter={() => handleStateHover(m.name)}
            onMouseLeave={handleStateLeave}
          />
        ))}

        {/* Delhi label */}
        {delhiPos && (
          <g style={{ pointerEvents: "none" }}>
            <rect
              x={delhiPos.x + 12}
              y={delhiPos.y - 10}
              width={70}
              height={20}
              rx={4}
              fill="white"
              stroke="#e5e7eb"
              strokeWidth={0.5}
            />
            <text
              x={delhiPos.x + 47}
              y={delhiPos.y + 3}
              textAnchor="middle"
              style={{ fontSize: "7px", fontWeight: 700, fill: "#4b5563", fontFamily: "Inter, sans-serif" }}
            >
              NEW DELHI
            </text>
            <line
              x1={delhiPos.x + 3}
              y1={delhiPos.y}
              x2={delhiPos.x + 12}
              y2={delhiPos.y - 2}
              stroke="#cbd5e1"
              strokeWidth={0.5}
              strokeDasharray="2,2"
            />
          </g>
        )}
      </svg>

      {/* Popover */}
      <Popover
        info={activeState ? getStateInfo(activeState) : null}
        position={mousePos}
        visible={!!activeState}
      />

      {/* Lock indicator */}
      {lockedState && (
        <div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-xs px-4 py-2 rounded-full"
          style={{ backgroundColor: "rgba(31,41,55,0.85)", backdropFilter: "blur(8px)" }}
        >
          Click anywhere to unlock &bull; <strong>{lockedState}</strong>
        </div>
      )}
    </div>
  );
}
