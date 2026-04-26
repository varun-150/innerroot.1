import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Compass, MapPin, Clock, Star, ArrowRight, Camera } from 'lucide-react';
import SEO from '../components/ui/SEO';

const tours = [
    { title: 'Royal Heritage Hub', location: 'Delhi, Agra, Jaipur', duration: '7 days', rating: 4.9, desc: 'Experience the iconic Mughal and Rajput architectural marvels through a regal lens.' },
    { title: 'Kerala Coastal Wellness', location: 'Alleppey, Kochi', duration: '5 days', rating: 4.8, desc: 'Houseboat cruises, Ayurvedic therapies, and spice plantation walks under a starlit canopy.' },
    { title: 'Varanasi Sacred Immersion', location: 'Varanasi, Sarnath', duration: '4 days', rating: 4.9, desc: 'Witness the Ganga Aarti, explore ancient ghats, and walk in the footsteps of the Buddha.' },
    { title: 'Hampi Ancient Ruins', location: 'Hampi, Badami', duration: '4 days', rating: 4.7, desc: 'Step into the ruins of the Vijayanagara Empire — boulder-strewn landscapes and ancient temples.' },
    { title: 'Ladakh High Monasteries', location: 'Leh, Nubra', duration: '6 days', rating: 4.9, desc: 'Buddhist monasteries set against the dramatic Himalayan landscape at the roof of the world.' },
    { title: 'Odisha Heritage Trail', location: 'Konark, Puri', duration: '5 days', rating: 4.6, desc: 'From the Sun Temple of Konark to the Jagannath Temple of Puri — a pilgrimage through time.' },
];

const Tours = () => {
    const heroRef = useRef(null);
    const gridRef = useRef(null);
    const heroInView = useInView(heroRef, { once: true });
    const gridInView = useInView(gridRef, { once: true, margin: '-80px' });

    return (
        <div className="min-h-screen bg-spiritual-gradient text-brand-ivory font-body pb-32 pt-40 px-8">
            <SEO title="Virtual Tours | Inner Root Immersion" description="Immersive virtual tours into the heart of India's sacred geography." />

            <section ref={heroRef} className="relative mb-24 max-w-5xl mx-auto text-center">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 text-[10px] font-bold tracking-[0.4em] uppercase bg-brand-gold/10 text-brand-gold border border-brand-gold/20">
                        <Compass size={16} /> Expedition Nodes
                    </span>
                    <h1 className="text-6xl md:text-8xl font-serif font-bold mb-8 text-brand-gold uppercase tracking-tight leading-none">
                        Immersive <br /> <span className="text-brand-ivory opacity-20 italic font-light">Journeys</span>
                    </h1>
                    <p className="text-xl max-w-2xl mx-auto text-brand-ivory/60 font-light leading-relaxed">
                        Transcend physical boundaries. Access 1:1 digital twins of India's most resonant sacred sites.
                    </p>
                </motion.div>
            </section>

            <section ref={gridRef} className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {tours.map((tour, i) => (
                        <motion.div
                            key={tour.title}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={gridInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: i * 0.08, duration: 0.6 }}
                            className="spiritual-card p-0 group cursor-pointer overflow-hidden backdrop-blur-3xl hover:border-brand-gold/50 transition-all duration-500 shadow-2xl flex flex-col"
                        >
                            {/* Visual Header */}
                            <div className="h-44 relative bg-brand-navy/60 overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Camera size={48} className="text-brand-gold/10 group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-brand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold bg-brand-gold text-brand-navy shadow-gold-glow">
                                    <Star size={12} fill="currentColor" /> {tour.rating}
                                </div>
                            </div>

                            <div className="p-10 flex-grow flex flex-col">
                                <div className="flex items-center gap-5 mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold/40">
                                    <span className="flex items-center gap-2"><MapPin size={14} /> {tour.location}</span>
                                    <span className="flex items-center gap-2"><Clock size={14} /> {tour.duration}</span>
                                </div>
                                <h3 className="text-3xl font-serif font-bold uppercase mb-4 text-brand-gold group-hover:drop-shadow-gold-glow transition-all duration-300">
                                    {tour.title}
                                </h3>
                                <p className="text-base leading-relaxed mb-8 text-brand-ivory/50 font-light flex-grow">{tour.desc}</p>
                                <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 group-hover:gap-5 text-brand-gold">
                                    <span>Initialize Tour</span>
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Tours;
