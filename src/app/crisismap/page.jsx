import InteractiveMap from '../../components/CrisisMap'
import '../../styles/globals.css'

export default function MapPage() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="h-[65px] bg-slate-950" /> {/* Navbar spacing */}
      <div className="flex-1">
        <InteractiveMap />
      </div>
    </div>
  );
}
