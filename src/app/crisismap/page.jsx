import InteractiveMap from '../../components/CrisisMap'
import '../../styles/globals.css'

export default function MapPage() {
  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-4">
        <h1 className="text-center text-6xl font-bold mt-8 mb-10 bg-gradient-to-r from-sky-300 via-blue-200 to-purple-300 text-transparent bg-clip-text">
          Interactive Map
        </h1>
        <p className="text-lg text-white">
          Toggle marker interactions using the switch in the top-left corner. When enabled,
          click anywhere on the map to add a marker and click a marker to remove it.
          Mouse coordinates are shown in the bottom-left corner.
        </p>
        <div className="h-[70vh] w-full">
          <InteractiveMap />
        </div>
        <p className="text-lg text-white text-center mt-4">
          Made by <a href="https://github.com/SnowyCrest" className="text-sky-400 hover:underline font-bold">SnowyCrest</a> on <a href="https://github.com/SnowyCrest/nextjs-interactive-map" className="text-sky-400 hover:underline font-bold">Github</a>
        </p>
      </div>
    </div>
  );
}
