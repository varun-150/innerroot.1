import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import HeritageMap, { heritageLocations } from '../components/HeritageMap';
import { useScrollReveal } from '../hooks/useScrollReveal';

function HeritageExplorer() {
  const [selectedLocation, setSelectedLocation] = useState(heritageLocations[0]);
  const [isMobile, setIsMobile] = useState(false);
  const [searchParams] = useSearchParams();
  useScrollReveal();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const locId = searchParams.get('location');
    if (locId) {
      const location = heritageLocations.find((l) => l.id.toString() === locId);
      if (location) setSelectedLocation(location);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-primary text-muted-gray font-body px-6 pb-20 pt-32 overflow-hidden">
        <div className="max-w-7xl mx-auto mb-12 reveal">
            <span className="text-gold-500 font-black uppercase text-[10px] tracking-widest mb-4 block">Navigation Protocols</span>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6 text-gold-500">Heritage <span className="text-gold-100">Atlas</span></h1>
            <p className="text-muted-gray max-w-2xl text-lg">Interactive coordinate map of India's sacred nodes and architectural landmarks.</p>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 reveal">
            {/* Sidebar */}
            <aside className="w-full lg:w-1/3 card-luxury p-6 h-[700px] overflow-y-auto custom-scrollbar">
                <div className="space-y-4">
                    {heritageLocations.map((loc) => (
                        <button
                            key={loc.id}
                            onClick={() => setSelectedLocation(loc)}
                            className={`sidebar-detail visible w-full text-left p-6 rounded-2xl border transition-all ${
                                selectedLocation?.id === loc.id
                                ? 'border-gold-500 bg-gold-500/5 shadow-[0_0_15px_rgba(244,235,208,0.05)]'
                                : 'border-gold-500/10 bg-black/20 hover:border-gold-500/30'
                            }`}
                            style={{ transitionDelay: `${loc.id * 0.05}s` }}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className={`text-[10px] font-black uppercase tracking-widest ${selectedLocation?.id === loc.id ? 'text-gold-500' : 'text-muted-gray/40'}`}>{loc.type}</span>
                                {selectedLocation?.id === loc.id && <div className="w-2 h-2 rounded-full bg-gold-500 glow-accent" />}
                            </div>
                            <h3 className="text-xl font-black uppercase mb-2 text-gold-500">{loc.name}</h3>
                            <p className="text-xs text-muted-gray/60 line-clamp-2">{loc.description}</p>
                        </button>
                    ))}
                </div>
            </aside>

            {/* Map Area */}
            <div 
                className="w-full lg:w-2/3 h-[700px] bg-black rounded-3xl overflow-hidden relative"
                style={{ 
                    border: '1px solid rgba(244,235,208,0.2)', 
                    boxShadow: '0 0 40px rgba(244,235,208,0.08), 0 0 80px rgba(244,235,208,0.05)' 
                }}
            >
                <HeritageMap
                    isMobile={isMobile}
                    selectedLocation={selectedLocation}
                    onLocationSelect={setSelectedLocation}
                />
                
                {/* Coordinates HUD */}
                <div className="absolute bottom-8 left-8 z-10 flex gap-4">
                    <div className="bg-black/80 border border-gold-500/20 px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest text-gold-200/40">
                        LAT: {selectedLocation?.lat.toFixed(4)}
                    </div>
                    <div className="bg-black/80 border border-gold-500/20 px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest text-gold-200/40">
                        LNG: {selectedLocation?.lng.toFixed(4)}
                    </div>
                </div>
            </div>
        </div>
        
        <style dangerouslySetInnerHTML={{ __html: `
            .custom-scrollbar::-webkit-scrollbar { width: 4px; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
            .leaflet-container { background: #0a0e1a !important; }
            .map-tiles { filter: brightness(0.85) contrast(1.15) sepia(0.25) hue-rotate(10deg) !important; }
        `}} />
    </div>
  );
}

export default HeritageExplorer;
