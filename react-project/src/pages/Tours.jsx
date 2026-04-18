import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Compass, MapPin, Clock, Star, ArrowRight, Camera } from 'lucide-react';
import SEO from '../components/ui/SEO';

const tours = [
    { title: 'Royal Heritage Hub', location: 'Delhi, Agra, Jaipur', duration: '7 days', rating: 4.9, desc: 'Experience the iconic Mughal and Rajput architectural marvels through a regal lens.', color: '#F4EBD0' },
    { title: 'Kerala Coastal Wellness', location: 'Alleppey, Munnar, Kochi', duration: '5 days', rating: 4.8, desc: 'Houseboat cruises, Ayurvedic therapies, and spice plantation walks under a starlit canopy.', color: '#E3D8B4' },
    { title: 'Varanasi Sacred Immersion', location: 'Varanasi, Sarnath', duration: '4 days', rating: 4.9, desc: 'Witness the Ganga Aarti, explore ancient ghats, and walk in the footsteps of the Buddha.', color: '#D1C598' },
    { title: 'Hampi Ancient Ruins', location: 'Hampi, Badami, Aihole', duration: '4 days', rating: 4.7, desc: 'Step into the ruins of the Vijayanagara Empire — boulder-strewn landscapes and ancient temples.', color: '#F4EBD0' },
    { title: 'Ladakh High Monasteries', location: 'Leh, Nubra, Pangong', duration: '6 days', rating: 4.9, desc: 'Buddhist monasteries set against the dramatic Himalayan landscape at the roof of the world.', color: '#E3D8B4' },
    { title: 'Odisha Heritage Trail', location: 'Bhubaneswar, Puri, Konark', duration: '5 days', rating: 4.6, desc: 'From the Sun Temple of Konark to the Jagannath Temple of Puri — a pilgrimage through time.', color: '#D1C598' },
];

const Tours = () => {
    const heroRef = useRef(null);
    const gridRef = useRef(null);
    const heroInView = useInView(heroRef, { once: true });
    const gridInView = useInView(gridRef, { once: true, margin: '-80px' });

    return (
        <>
            <SEO title="Virtual Tours — Inner Root" description="Take immersive virtual tours of India's most sacred and culturally rich destinations." />

            <section ref={heroRef} className="relative overflow-hidden section-padding" style={{ paddingBottom: 'var(--sp-12)' }}>
                <div className="sacred-geometry" style={{ opacity: 0.02 }} />
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-semibold tracking-widest uppercase" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                            <Compass size={14} /> Virtual Tours
                        </span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5 text-gold-500">
                            Immersive <span className="text-gold-100">Journeys</span>
                        </h1>
                        <p className="text-base sm:text-lg max-w-2xl mx-auto text-muted-gray">
                            Walk through India's most sacred destinations from anywhere in the world.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section ref={gridRef} className="section-padding" style={{ paddingTop: 0 }}>
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tours.map((tour, i) => (
                            <motion.div
                                key={tour.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: i * 0.08, duration: 0.5 }}
                                className="card-luxury p-0 group cursor-pointer overflow-hidden"
                            >
                                {/* Color header */}
                                <div className="h-36 relative" style={{ background: `linear-gradient(135deg, ${tour.color}20, ${tour.color}08)` }}>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Camera size={40} style={{ color: tour.color, opacity: 0.3 }} />
                                    </div>
                                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold" style={{ background: 'var(--bg-glass-strong)', backdropFilter: 'blur(8px)', color: tour.color }}>
                                        <Star size={10} fill="currentColor" /> {tour.rating}
                                    </div>
                                </div>

                                <div className="p-8">
                                    <div className="flex items-center gap-4 mb-4 text-[10px] font-black uppercase tracking-widest text-gold-500/30">
                                        <span className="flex items-center gap-2"><MapPin size={12} /> {tour.location}</span>
                                        <span className="flex items-center gap-2"><Clock size={12} /> {tour.duration}</span>
                                    </div>
                                    <h3 className="text-xl font-black uppercase mb-3 text-gold-500">
                                        {tour.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed mb-6 text-muted-gray">{tour.desc}</p>
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-300 group-hover:gap-4 text-gold-500">
                                        <span>Start Tour</span>
                                        <ArrowRight size={14} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Tours;
