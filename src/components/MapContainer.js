import IndiaMap from "./IndiaMap";
import InfoPanel from "./InfoPanel";

export default function MapContainer() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
        {/* Info Panel */}
        <div className="w-full lg:w-[280px] shrink-0 order-2 lg:order-1">
          <InfoPanel />
        </div>

        {/* Map */}
        <div className="w-full lg:flex-1 order-1 lg:order-2 max-w-[700px]">
          <IndiaMap />
        </div>
      </div>
    </div>
  );
}
