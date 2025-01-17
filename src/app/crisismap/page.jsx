import InteractiveMap from '../../components/CrisisMap'
import '../../styles/globals.css'

export default function MapPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="w-full h-[40vh] relative">
        <img 
          src="https://images.unsplash.com/photo-1663427929917-333d88949f7a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Crisis Map Banner"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="container mx-auto p-4">
        <div className="max-w-[95%] mx-auto space-y-4">
          <h1 className="text-center text-6xl font-bold mt-8 mb-10 bg-gradient-to-r from-sky-600 via-blue-500 to-purple-600 text-transparent bg-clip-text">
            Crisis Map
          </h1>
          <p className="text-lg text-black">
            Toggle marker interactions using the switch in the top-left corner. When enabled,
            click anywhere on the map to add a marker and click a marker to remove it.
            Mouse coordinates are shown in the bottom-left corner.
          </p>
          <div className="h-[85vh] w-full">
            <InteractiveMap />
          </div>
        </div>
      </div>
    </div>
  );
}
