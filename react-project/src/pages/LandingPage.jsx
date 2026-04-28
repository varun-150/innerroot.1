import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/ui/SEO';
import { useScrollReveal } from '../hooks/useScrollReveal';
import AmbientGlow from '../components/ui/AmbientGlow';

const LandingPage = () => {
    useScrollReveal();

    return (
        <div className="min-h-screen bg-brand-black text-brand-white selection:bg-brand-gold/30 relative overflow-hidden">
            <SEO 
                title="Inner Root | Ancient Wisdom. Future Intelligence."
                description="Synchronizing 5,000 years of Vedic chronicles with modern AI."
            />

            {/* ── AMBIENT BACKGROUND ── */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="orb w-[800px] h-[800px] -top-96 -left-96 opacity-30 animate-float" />
                <div className="orb w-[600px] h-[600px] bottom-0 -right-48 opacity-20 animate-breathe" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(244,235,208,0.03)_0%,transparent_50%)]" />
            </div>

            {/* ── HERO SECTION ── */}
            <section className="relative pt-40 pb-32 px-6 overflow-hidden z-10">
                <div className="max-w-7xl mx-auto relative">
                    <div className="max-w-4xl">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/5 border border-brand-gold/20 mb-10 backdrop-blur-sm"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse shadow-[0_0_10px_rgba(244,235,208,0.8)]" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">The Cradle of Wisdom</span>
                        </motion.div>

                        <div className="overflow-hidden">
                            <motion.h1 
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                                className="text-6xl md:text-[10rem] font-bold tracking-tighter leading-[0.85] mb-10"
                            >
                                ANCIENT ROOTS.<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-brand-gold-light to-brand-gold/50">FUTURE SENSE.</span>
                            </motion.h1>
                        </div>

                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                            className="text-xl md:text-2xl text-brand-gray max-w-2xl leading-relaxed mb-14 font-medium opacity-80"
                        >
                            Synchronizing 5,000 years of Vedic chronicles with the next generation of artificial intelligence.
                        </motion.p>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                            className="flex flex-wrap gap-6"
                        >
                            <Link to="/explore" className="btn-premium">
                                Explore Heritage
                            </Link>
                            <Link to="/wellness" className="btn-ghost">
                                Start Sadhana
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── STATS SECTION ── */}
            <section className="py-24 border-y border-white/5 relative z-10 bg-white/[0.01] backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-16">
                        {[
                            { label: 'Sacred Sites', val: '108+' },
                            { label: 'Sanskrit Manuscripts', val: '50K+' },
                            { label: 'Active Seekers', val: '12K+' },
                            { label: 'Dharma Uptime', val: '99.9%' },
                        ].map((stat, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.15 }}
                                className="text-center md:text-left relative group"
                            >
                                <div className="text-4xl md:text-5xl font-bold text-brand-gold mb-3 tracking-tighter group-hover:scale-105 transition-transform duration-500">{stat.val}</div>
                                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gray opacity-60">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FEATURES GRID ── */}
            <section className="py-40 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-24 reveal">
                        <motion.div
                             initial={{ opacity: 0, x: -20 }}
                             whileInView={{ opacity: 1, x: 0 }}
                             viewport={{ once: true }}
                             className="text-brand-gold font-bold tracking-[0.4em] text-[10px] uppercase mb-4"
                        >
                            The Protocol
                        </motion.div>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">THREE PILLARS</h2>
                        <p className="text-brand-gray text-lg max-w-xl font-medium opacity-60">Architecture, Intelligence, and Sadhana synchronized into a single spiritual ecosystem.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Heritage Map', desc: 'Interactive repository of Bharat\'s sacred architecture and historical nodes.', icon: '🗺️' },
                            { title: 'Aura Intelligence', desc: 'A sentient AI synthesis engine trained on Vedic philosophy and scriptures.', icon: '🧠' },
                            { title: 'Japa Studio', desc: 'Harmonic synchronization tool for meditation, breathwork, and ritual.', icon: '🧘' },
                        ].map((feat, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.2 }}
                                className="glass-card p-12 group cursor-pointer"
                            >
                                <div className="text-5xl mb-10 group-hover:scale-125 group-hover:rotate-6 transition-all duration-700 ease-out inline-block drop-shadow-[0_0_15px_rgba(244,235,208,0.3)]">
                                    {feat.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-6 tracking-tight group-hover:text-brand-gold transition-colors">{feat.title}</h3>
                                <p className="text-brand-gray text-base leading-relaxed font-medium opacity-70 group-hover:opacity-100 transition-opacity">{feat.desc}</p>
                                
                                <div className="mt-8 flex items-center gap-3 text-[10px] font-bold tracking-widest uppercase text-brand-gold opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 duration-500">
                                    Enter Station <ArrowRight className="w-3 h-3" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TRUST SECTION ── */}
            <section className="py-40 px-6 border-t border-white/5 bg-brand-gold/[0.01]">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.h2 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="text-6xl md:text-9xl font-bold tracking-tighter mb-16 leading-none"
                    >
                        BUILT FOR THE<br />
                        <span className="text-brand-gray opacity-10">NEXT GENERATION.</span>
                    </motion.h2>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-20 grayscale opacity-20 hover:opacity-50 transition-opacity duration-1000">
                        <div className="font-black tracking-[0.5em] text-sm md:text-xl text-brand-white">VEDIC</div>
                        <div className="font-black tracking-[0.5em] text-sm md:text-xl text-brand-white">DHARMA</div>
                        <div className="font-black tracking-[0.5em] text-sm md:text-xl text-brand-white">ROOTS</div>
                    </div>
                </div>
            </section>

            {/* ── CTA SECTION ── */}
            <section className="py-40 px-6 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="max-w-6xl mx-auto rounded-[2rem] bg-gradient-to-br from-brand-gold/10 via-transparent to-brand-gold/5 border border-brand-gold/20 p-16 md:p-32 text-center overflow-hidden relative group animate-gold-breathe"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(244,235,208,0.1)_0%,transparent_70%)]" />
                    <div className="relative z-10">
                        <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-10 leading-[0.9]">READY TO SYNC<br />YOUR ROOTS?</h2>
                        <p className="text-xl md:text-2xl text-brand-gray mb-16 max-w-2xl mx-auto font-medium opacity-70">Join the collective of seekers bridging the gap between history and the future.</p>
                        <div className="flex justify-center">
                            <Link to="/signup" className="btn-premium px-16">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

// Helper component for Icon
const ArrowRight = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
);

export default LandingPage;
