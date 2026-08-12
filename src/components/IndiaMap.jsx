import { useState, useCallback, useMemo, useRef } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { statesInfo as defaultStatesInfo } from "../data/statesData";
import geoData from "../data/india_states.json";
import Marker from "./Marker";
import Popover from "./Popover";

const DEFAULT_WIDTH = 500;
const DEFAULT_HEIGHT = 580;
const DEFAULT_EXCLUDE = ["Andaman & Nicobar", "Lakshadweep"];

export default function IndiaMap({
  // Dimensions
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,

  // Data
  statesInfo: customStatesInfo,
  excludeTerritories = DEFAULT_EXCLUDE,

  // Custom markers — array of { id, coordinates: [lng, lat], color, label, data }
  markers: customMarkers,

  // Colors
  defaultStateColor = "#e2e8f0",
  defaultStateBorder = "#cbd5e1",
  highlightStates,
  highlightColor = "#3b82f6",

  // Callbacks
  onStateClick: onStateClickProp,
  onStateHover: onStateHoverProp,
  onMarkerClick: onMarkerClickProp,
  onMarkerHover: onMarkerHoverProp,

  // Custom rendering
  renderPopover: renderPopoverProp,
  renderMarkerPopover: renderMarkerPopoverProp,

  // Toggles
  showPopover = true,
  showMarkers = true,
  showDelhiLabel = true,
  enableClick = true,

  // Styling
  className,
  style,
}) {
  const statesInfo = customStatesInfo || defaultStatesInfo;

  const [hoveredState, setHoveredState] = useState(null);
  const [lockedState, setLockedState] = useState(null);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const svgRef = useRef(null);

  const activeState = lockedState || hoveredState;

  // Build a highlight lookup if highlightStates is provided
  const highlightSet = useMemo(
    () => (highlightStates ? new Set(highlightStates) : null),
    [highlightStates]
  );

  // Filter features once
  const filteredGeo = useMemo(() => {
    return {
      ...geoData,
      features: geoData.features.filter(
        (f) => !excludeTerritories.includes(f.properties.ST_NM)
      ),
    };
  }, [excludeTerritories]);

  const projection = useMemo(
    () =>
      geoMercator()
        .center([82, 23.5])
        .scale((950 * width) / DEFAULT_WIDTH)
        .translate([width / 2, height / 2]),
    [width, height]
  );

  const pathGenerator = useMemo(
    () => geoPath().projection(projection),
    [projection]
  );

  const handleMouseMove = useCallback((e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  const handleStateHover = useCallback(
    (name) => {
      if (!lockedState) {
        setHoveredState(name);
        setHoveredMarker(null);
        if (onStateHoverProp) onStateHoverProp(name, statesInfo[name] || null);
      }
    },
    [lockedState, onStateHoverProp, statesInfo]
  );

  const handleStateLeave = useCallback(() => {
    if (!lockedState) {
      setHoveredState(null);
      if (onStateHoverProp) onStateHoverProp(null, null);
    }
  }, [lockedState, onStateHoverProp]);

  const handleStateClick = useCallback(
    (name) => {
      if (!enableClick) return;
      setLockedState((prev) => {
        const next = prev === name ? null : name;
        if (onStateClickProp)
          onStateClickProp(next, next ? statesInfo[next] || null : null);
        return next;
      });
      setHoveredState(null);
    },
    [onStateClickProp, enableClick, statesInfo]
  );

  const handleBgClick = useCallback(
    (e) => {
      if (!enableClick) return;
      if (e.target.tagName === "svg" || e.target.tagName === "rect") {
        setLockedState(null);
        setHoveredState(null);
        setHoveredMarker(null);
        if (onStateClickProp) onStateClickProp(null, null);
      }
    },
    [onStateClickProp, enableClick]
  );

  // Custom marker hover/click
  const handleCustomMarkerHover = useCallback(
    (marker) => {
      setHoveredMarker(marker);
      if (onMarkerHoverProp) onMarkerHoverProp(marker);
    },
    [onMarkerHoverProp]
  );

  const handleCustomMarkerLeave = useCallback(() => {
    setHoveredMarker(null);
    if (onMarkerHoverProp) onMarkerHoverProp(null);
  }, [onMarkerHoverProp]);

  const handleCustomMarkerClick = useCallback(
    (marker) => {
      if (onMarkerClickProp) onMarkerClickProp(marker);
    },
    [onMarkerClickProp]
  );

  const getStateInfo = (name) => {
    const info = statesInfo[name];
    return info
      ? { name, ...info }
      : { name, famousFor: "A beautiful region of India", color: "#94a3b8" };
  };

  // Determine state fill color
  const getStateFill = (name, info, isActive) => {
    if (isActive) return info.color || highlightColor;
    if (highlightSet && highlightSet.has(name)) return highlightColor + "33"; // 20% opacity
    return defaultStateColor;
  };

  const getStateBorder = (name, info, isActive) => {
    if (isActive) return info.color || highlightColor;
    if (highlightSet && highlightSet.has(name)) return highlightColor + "88";
    return defaultStateBorder;
  };

  // Compute marker positions from statesInfo (built-in capital markers)
  const builtInMarkerData = useMemo(() => {
    if (!showMarkers || customMarkers) return []; // skip if user provides custom markers
    const markers = [];
    for (const [stateName, info] of Object.entries(statesInfo)) {
      if (!info.hasMarker || !info.capitalCoords) continue;
      const [lng, lat] = info.capitalCoords;
      const pos = projection([lng, lat]);
      if (pos && !isNaN(pos[0])) {
        markers.push({
          id: stateName,
          name: stateName,
          capital: info.capital,
          x: pos[0],
          y: pos[1],
          color: info.color,
        });
      }
    }
    return markers;
  }, [projection, statesInfo, showMarkers, customMarkers]);

  // Compute custom marker positions
  const customMarkerData = useMemo(() => {
    if (!customMarkers || !showMarkers) return [];
    return customMarkers
      .map((m) => {
        const pos = projection(m.coordinates);
        if (!pos || isNaN(pos[0])) return null;
        return {
          ...m,
          id: m.id || m.label || `${m.coordinates[0]}-${m.coordinates[1]}`,
          x: pos[0],
          y: pos[1],
          color: m.color || "#3b82f6",
        };
      })
      .filter(Boolean);
  }, [customMarkers, projection, showMarkers]);

  const allMarkers = customMarkers ? customMarkerData : builtInMarkerData;

  // Delhi label position
  const delhiPos = useMemo(() => {
    if (!showDelhiLabel || customMarkers) return null; // hide for custom use cases
    const delhi = filteredGeo.features.find(
      (f) => f.properties.ST_NM === "Delhi"
    );
    if (delhi) {
      const c = pathGenerator.centroid(delhi);
      if (c && !isNaN(c[0])) return { x: c[0], y: c[1] };
    }
    return null;
  }, [filteredGeo, pathGenerator, showDelhiLabel, customMarkers]);

  // Determine what popover to show
  const renderPopoverContent = () => {
    // Custom marker popover
    if (hoveredMarker && showPopover) {
      if (renderMarkerPopoverProp) {
        return renderMarkerPopoverProp(hoveredMarker, mousePos);
      }
      // Default marker popover
      return (
        <Popover
          info={{
            name: hoveredMarker.label || hoveredMarker.id,
            famousFor: hoveredMarker.description || "",
            color: hoveredMarker.color,
          }}
          position={mousePos}
          visible={true}
        />
      );
    }

    // State popover
    if (activeState && showPopover) {
      if (renderPopoverProp) {
        return renderPopoverProp(getStateInfo(activeState), mousePos);
      }
      return (
        <Popover
          info={getStateInfo(activeState)}
          position={mousePos}
          visible={true}
        />
      );
    }

    return null;
  };

  return (
    <div
      className={className}
      style={{ position: "relative", ...style }}
      onMouseMove={handleMouseMove}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        style={{
          width: "100%",
          height: "auto",
          filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.06))",
          maxHeight: "85vh",
        }}
        onClick={handleBgClick}
      >
        {/* Transparent background rect for click detection */}
        <rect x="0" y="0" width={width} height={height} fill="transparent" />

        <defs>
          <filter
            id="rim-markerShadow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feDropShadow
              dx="0"
              dy="1"
              stdDeviation="2"
              floodOpacity="0.25"
            />
          </filter>
        </defs>

        {/* State paths */}
        {filteredGeo.features.map((feature, i) => {
          const name = feature.properties.ST_NM;
          const info = statesInfo[name] || {};
          const isActive = activeState === name;
          const color = info.color || "#94a3b8";
          const d = pathGenerator(feature);

          return (
            <path
              key={name || i}
              d={d}
              fill={getStateFill(name, info, isActive)}
              stroke={getStateBorder(name, info, isActive)}
              strokeWidth={isActive ? 1.5 : 0.6}
              strokeLinejoin="round"
              style={{
                cursor: enableClick ? "pointer" : "default",
                transition:
                  "fill 0.3s ease, stroke 0.3s ease, filter 0.3s ease",
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
        {allMarkers.map((m) => (
          <Marker
            key={m.id}
            x={m.x}
            y={m.y}
            color={m.color}
            isHovered={
              customMarkers
                ? hoveredMarker?.id === m.id
                : activeState === m.name
            }
            onMouseEnter={() => {
              if (customMarkers) {
                handleCustomMarkerHover(m);
              } else {
                handleStateHover(m.name);
              }
            }}
            onMouseLeave={() => {
              if (customMarkers) {
                handleCustomMarkerLeave();
              } else {
                handleStateLeave();
              }
            }}
            onClick={() => {
              if (customMarkers) {
                handleCustomMarkerClick(m);
              }
            }}
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
              style={{
                fontSize: "7px",
                fontWeight: 700,
                fill: "#4b5563",
                fontFamily: "Inter, sans-serif",
              }}
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
      {renderPopoverContent()}

      {/* Lock indicator */}
      {lockedState && enableClick && (
        <div
          style={{
            position: "absolute",
            bottom: "16px",
            left: "50%",
            transform: "translateX(-50%)",
            color: "white",
            fontSize: "12px",
            padding: "8px 16px",
            borderRadius: "9999px",
            backgroundColor: "rgba(31,41,55,0.85)",
            backdropFilter: "blur(8px)",
            whiteSpace: "nowrap",
          }}
        >
          Click anywhere to unlock &bull; <strong>{lockedState}</strong>
        </div>
      )}
    </div>
  );
}
