import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import HeritageMap, { heritageLocations } from '../components/HeritageMap';
import { useScrollReveal } from '../hooks/useScrollReveal';

function HeritageExplorer() {
  const [selectedLocation, setSelectedLocation] = useState(heritageLocations[0]);
  const [isMobile, setIsMobile] = useState(false);
  const [searchParams] = useSearchParams();

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
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#D4AF37]/30 px-12 md:px-24 pt-48 pb-24 relative overflow-hidden">
        <div className="max-w-6xl relative z-10 mb-32">
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 mb-8"
            >
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#D4AF37]">Reference Library</span>
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-serif font-light tracking-tighter mb-12 text-white">The Archive.</h1>
            <p className="text-white/30 max-w-sm text-lg font-light leading-relaxed tracking-tight">
                Deep-dive into the architectural marvels and sacred geography of Bharat. Your unlocked knowledge lives here.
            </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24">
            
            {/* Location List - 4 columns */}
            <aside className="lg:col-span-4 h-[600px] overflow-y-auto custom-scrollbar pr-12">
                <div className="space-y-12">
                    {heritageLocations.map((loc) => (
                        <button
                            key={loc.id}
                            onClick={() => setSelectedLocation(loc)}
                            className={`w-full text-left transition-colors duration-700 group ${
                                selectedLocation?.id === loc.id ? 'opacity-100' : 'opacity-20 hover:opacity-40'
                            }`}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <span className={`w-1 h-1 rounded-full ${selectedLocation?.id === loc.id ? 'bg-[#D4AF37]' : 'bg-white'}`} />
                                <span className="text-[10px] font-medium uppercase tracking-[0.4em]">{loc.type}</span>
                            </div>
                            <h3 className="text-2xl font-serif font-light mb-4 text-white">{loc.name}</h3>
                            <p className="text-xs text-white/60 font-light leading-relaxed line-clamp-2">{loc.description}</p>
                        </button>
                    ))}
                </div>
            </aside>

            {/* Map Area - 8 columns */}
            <div 
                className="lg:col-span-8 h-[600px] bg-white/[0.01] rounded-[40px] overflow-hidden relative border border-white/5"
            >
                <HeritageMap
                    isMobile={isMobile}
                    selectedLocation={selectedLocation}
                    onLocationSelect={setSelectedLocation}
                />
                
                {/* Coordinates */}
                <div className="absolute bottom-8 right-8 z-10">
                    <div className="text-[10px] font-medium uppercase tracking-[0.4em] text-white/20">
                        {selectedLocation?.lat.toFixed(4)}, {selectedLocation?.lng.toFixed(4)}
                    </div>
                </div>
            </div>
        </div>
        
        <style dangerouslySetInnerHTML={{ __html: `
            .custom-scrollbar::-webkit-scrollbar { width: 2px; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
            .leaflet-container { background: #0A0A0A !important; }
            .map-tiles { filter: invert(100%) hue-rotate(180deg) brightness(0.4) contrast(0.9) !important; }
        `}} />
    </div>
  );
}

export default HeritageExplorer;
