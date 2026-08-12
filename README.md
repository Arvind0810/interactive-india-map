# react-india-map

An interactive, animated India map React component with state info popovers, animated markers, and customizable props.

![react-india-map](https://img.shields.io/npm/v/react-india-map?style=flat-square)
![license](https://img.shields.io/npm/l/react-india-map?style=flat-square)

## Features

- 🗺️ **Interactive SVG Map** — hover and click to explore Indian states
- 💬 **Info Popovers** — animated tooltips showing what each state is famous for
- 📍 **Custom Markers** — place markers at any `[lng, lat]` coordinates
- 🎨 **Fully Customizable** — custom colors, markers, popovers, and callbacks
- 🏢 **Business Ready** — show company branches, delivery zones, or any location data
- 📦 **Zero Config** — all geo data and state info bundled in the package
- ⚡ **Lightweight** — tree-shakeable ESM + CommonJS builds

## Installation

```bash
npm install react-india-map framer-motion
```

> `framer-motion` is an optional peer dependency for marker animations.

## Quick Start

### Default Map (Infographic Mode)

```jsx
import { MapContainer } from "react-india-map";
import "react-india-map/styles.css";

function App() {
  return <MapContainer />;
}
```

### Map Only

```jsx
import { IndiaMap } from "react-india-map";
import "react-india-map/styles.css";

function App() {
  return (
    <IndiaMap
      onStateClick={(stateName, stateInfo) => console.log("Clicked:", stateName)}
      onStateHover={(stateName, stateInfo) => console.log("Hovered:", stateName)}
    />
  );
}
```

---

## Use Cases

### 🏢 Company Branches / Office Locations

```jsx
import { IndiaMap } from "react-india-map";

const branches = [
  {
    id: "hq",
    coordinates: [72.88, 19.08],
    color: "#ef4444",
    label: "Mumbai HQ",
    description: "Head Office — 500+ employees",
  },
  {
    id: "bangalore",
    coordinates: [77.59, 12.97],
    color: "#3b82f6",
    label: "Bangalore Tech Hub",
    description: "Engineering Center — 200+ developers",
  },
  {
    id: "delhi",
    coordinates: [77.21, 28.61],
    color: "#22c55e",
    label: "Delhi Sales Office",
    description: "North India Sales — 50+ team",
  },
];

function BranchMap() {
  return (
    <IndiaMap
      markers={branches}
      highlightStates={["Maharashtra", "Karnataka", "Delhi"]}
      highlightColor="#3b82f6"
      onMarkerClick={(marker) => console.log("Branch clicked:", marker)}
      onMarkerHover={(marker) => console.log("Hovering:", marker?.label)}
    />
  );
}
```

### 🚚 Delivery Zones

```jsx
<IndiaMap
  highlightStates={["Maharashtra", "Gujarat", "Rajasthan", "Delhi", "Karnataka"]}
  highlightColor="#22c55e"
  defaultStateColor="#f1f5f9"
  showMarkers={false}
  showDelhiLabel={false}
  renderPopover={(stateInfo, position) => (
    <div
      style={{
        position: "fixed",
        left: position.x + 15,
        top: position.y - 10,
        background: "white",
        padding: "12px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        pointerEvents: "none",
      }}
    >
      <strong>{stateInfo.name}</strong>
      <p>Delivery available — 2-3 business days</p>
    </div>
  )}
/>
```

### 🗳️ Election / Data Visualization

```jsx
const electionData = {
  Maharashtra: { ...statesInfo.Maharashtra, color: "#ef4444", famousFor: "Party A — 42 seats" },
  Gujarat: { ...statesInfo.Gujarat, color: "#3b82f6", famousFor: "Party B — 26 seats" },
  // ... customize per state
};

<IndiaMap statesInfo={electionData} />
```

---

## Components

### `<IndiaMap />`

The core map component.

#### Data & Dimensions

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `number` | `500` | SVG viewBox width |
| `height` | `number` | `580` | SVG viewBox height |
| `statesInfo` | `object` | Built-in data | Custom state info (colors, descriptions, markers) |
| `excludeTerritories` | `string[]` | `["Andaman & Nicobar", "Lakshadweep"]` | Territories to hide |

#### Custom Markers

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `markers` | `MarkerData[]` | — | Array of custom markers (overrides built-in capital markers) |
| `onMarkerClick` | `(marker) => void` | — | Called when a custom marker is clicked |
| `onMarkerHover` | `(marker \| null) => void` | — | Called when a custom marker is hovered |

**MarkerData shape:**
```ts
{
  id: string;                  // unique identifier
  coordinates: [lng, lat];     // longitude, latitude
  color?: string;              // marker color (default: "#3b82f6")
  label?: string;              // display name
  description?: string;        // tooltip text
  data?: any;                  // any custom data you need
}
```

#### Colors & Highlighting

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultStateColor` | `string` | `"#e2e8f0"` | Fill color for inactive states |
| `defaultStateBorder` | `string` | `"#cbd5e1"` | Border color for inactive states |
| `highlightStates` | `string[]` | — | Array of state names to highlight |
| `highlightColor` | `string` | `"#3b82f6"` | Color used for highlighted states |

#### Callbacks

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onStateClick` | `(name, info) => void` | — | Called when a state is clicked/unlocked |
| `onStateHover` | `(name, info) => void` | — | Called when a state is hovered |

#### Custom Rendering

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `renderPopover` | `(stateInfo, mousePos) => ReactNode` | — | Custom state tooltip renderer |
| `renderMarkerPopover` | `(marker, mousePos) => ReactNode` | — | Custom marker tooltip renderer |

#### Toggles

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showPopover` | `boolean` | `true` | Show info popover on hover |
| `showMarkers` | `boolean` | `true` | Show markers |
| `showDelhiLabel` | `boolean` | `true` | Show the "NEW DELHI" label |
| `enableClick` | `boolean` | `true` | Enable click-to-lock behavior |

#### Styling

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | CSS class for the container |
| `style` | `object` | — | Inline styles for the container |

---

### `<MapContainer />`

Full-page layout with the map and an info panel.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `indiaMapProps` | `object` | — | All props passed through to `<IndiaMap />` |
| `className` | `string` | — | CSS class for the container |
| `style` | `object` | — | Inline styles for the container |

---

### `statesInfo`

The built-in state data object — export it to extend or modify:

```jsx
import { IndiaMap, statesInfo } from "react-india-map";

const customStates = {
  ...statesInfo,
  Maharashtra: {
    ...statesInfo["Maharashtra"],
    famousFor: "My custom description",
    color: "#ff6b6b",
  },
};

<IndiaMap statesInfo={customStates} />;
```

---

## Development

```bash
# Install dependencies
npm install

# Build the package
npm run build

# Run the demo app
cd demo
npm install
npm run dev
```

## License

MIT © [Arvind Sharma](https://github.com/Arvind0810)
