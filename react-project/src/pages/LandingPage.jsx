import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/ui/SEO';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-brand-black text-brand-white selection:bg-brand-gold/30">
            <SEO 
                title="Inner Root | Ancient Wisdom. Future Intelligence."
                description="Synchronizing 5,000 years of Vedic chronicles with modern AI."
            />

            {/* ── HERO SECTION ── */}
            <section className="relative pt-40 pb-32 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="max-w-4xl">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-8"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">The Cradle of Wisdom</span>
                        </motion.div>

                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8"
                        >
                            ANCIENT ROOTS.<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-gold-light">FUTURE SENSE.</span>
                        </motion.h1>

                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl md:text-2xl text-brand-gray max-w-2xl leading-relaxed mb-12 font-medium"
                        >
                            Synchronizing 5,000 years of Vedic chronicles with the next generation of artificial intelligence.
                        </motion.p>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap gap-4"
                        >
                            <Link to="/heritage-map" className="btn-primary px-8 py-4 rounded-md text-sm font-bold uppercase tracking-widest">
                                Explore Heritage
                            </Link>
                            <Link to="/wellness" className="px-8 py-4 rounded-md text-sm font-bold uppercase tracking-widest border border-brand-gray/20 hover:bg-brand-gray/5 transition-colors" style={{ borderColor: 'var(--border-main)' }}>
                                Start Sadhana
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── STATS SECTION ── */}
            <section className="py-20 border-y border-brand-gray/10 bg-brand-gray/[0.01]" style={{ borderColor: 'var(--border-main)', backgroundColor: 'var(--card-bg)' }}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                        {[
                            { label: 'Sacred Sites', val: '108+' },
                            { label: 'Sanskrit Manuscripts', val: '50K+' },
                            { label: 'Active Seekers', val: '12K+' },
                            { label: 'Dharma Uptime', val: '99.9%' },
                        ].map((stat, i) => (
                            <div key={i} className="text-center md:text-left">
                                <div className="text-3xl font-bold text-brand-gold mb-2">{stat.val}</div>
                                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gray">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FEATURES GRID ── */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">THE PROTOCOL</h2>
                        <p className="text-brand-gray font-medium">Three pillars of modern spiritual enlightenment.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Heritage Map', desc: 'Interactive repository of Bharat\'s sacred architecture and historical nodes.', icon: '🗺️' },
                            { title: 'Aura Intelligence', desc: 'A sentient AI synthesis engine trained on Vedic philosophy and scriptures.', icon: '🧠' },
                            { title: 'Japa Studio', desc: 'Harmonic synchronization tool for meditation, breathwork, and ritual.', icon: '🧘' },
                        ].map((feat, i) => (
                            <div key={i} className="p-10 rounded-xl border border-brand-gray/10 bg-brand-gray/[0.01] hover:bg-brand-gray/[0.03] transition-all group" style={{ borderColor: 'var(--border-main)', backgroundColor: 'var(--card-bg)' }}>
                                <div className="text-4xl mb-8 group-hover:scale-110 transition-transform">{feat.icon}</div>
                                <h3 className="text-xl font-bold mb-4">{feat.title}</h3>
                                <p className="text-brand-gray text-sm leading-relaxed font-medium">{feat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TRUST SECTION ── */}
            <section className="py-32 px-6 border-t border-brand-gray/10" style={{ borderColor: 'var(--border-main)' }}>
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-12">BUILT FOR THE<br /><span className="text-brand-gray opacity-20">NEXT GENERATION.</span></h2>
                    <div className="flex justify-center gap-12 grayscale opacity-40">
                        <div className="font-black tracking-widest text-xl text-brand-white">VEDIC</div>
                        <div className="font-black tracking-widest text-xl text-brand-white">DHARMA</div>
                        <div className="font-black tracking-widest text-xl text-brand-white">ROOTS</div>
                    </div>
                </div>
            </section>

            {/* ── CTA SECTION ── */}
            <section className="py-32 px-6">
                <div className="max-w-5xl mx-auto rounded-2xl bg-gradient-to-br from-brand-gold/20 to-transparent border border-brand-gold/20 p-12 md:p-24 text-center overflow-hidden relative">
                    <div className="absolute inset-0 bg-brand-gold/5 animate-pulse" />
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">READY TO SYNC YOUR ROOTS?</h2>
                        <p className="text-xl text-brand-gray mb-12 max-w-2xl mx-auto font-medium">Join the collective of seekers bridging the gap between history and the future.</p>
                        <div className="flex justify-center gap-6">
                            <Link to="/signup" className="btn-primary px-10 py-4 rounded-md text-sm font-bold uppercase tracking-widest">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
