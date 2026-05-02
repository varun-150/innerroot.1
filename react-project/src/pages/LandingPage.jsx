import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/ui/SEO';
import { ArrowRight, Sparkles, Map, BookOpen, Heart, Shield, Globe } from 'lucide-react';

const SriYantra = () => (
    <svg viewBox="0 0 200 200" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] opacity-[0.03] pointer-events-none stroke-current text-[#D4AF37]">
        <circle cx="100" cy="100" r="92" fill="none" strokeWidth="0.1" />
        {[0, 30, 60, 90, 120, 150].map((rot) => (
            <polygon
                key={rot}
                points="100,22 172,150 28,150"
                fill="none"
                strokeWidth="0.08"
                transform={`rotate(${rot} 100 100)`}
            />
        ))}
    </svg>
);

const LandingPage = () => {
    const containerRef = useRef(null);
    const premiumEasing = [0.22, 1, 0.36, 1];

    return (
        <div ref={containerRef} className="min-h-screen bg-[#0B0E14] text-white selection:bg-[#D4AF37]/30 relative overflow-hidden font-sans">
            <SEO
                title="Inner Root | The Digital Sanctuary"
                description="5 minutes of heritage every morning. Micro-learning journeys through 5,000 years of Indian wisdom."
            />

            {/* ── Ambient Background ── */}
            <div className="fixed inset-0 pointer-events-none">
                <SriYantra />
                <motion.div
                    animate={{
                        opacity: [0.03, 0.08, 0.03],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#D4AF37]/10 blur-[150px] rounded-full"
                />
            </div>

            {/* ── Hero Section ── */}
            <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-24 pt-48 pb-24 z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: premiumEasing }}
                    className="max-w-7xl mx-auto w-full"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 1 }}
                        className="flex items-center gap-4 mb-12"
                    >
                        <span className="w-12 h-[1px] bg-[#D4AF37]/20" />
                        <span className="text-[10px] font-medium uppercase tracking-[0.6em] text-[#D4AF37]">5 Minutes of Depth Every Morning</span>
                    </motion.div>

                    <h1 className="text-7xl md:text-[11rem] font-serif font-light tracking-tighter leading-[0.85] mb-16 text-white max-w-6xl">
                        Know your<br />
                        <span className="text-white/10 italic">roots.</span>
                    </h1>

                    <p className="text-xl md:text-3xl text-white/30 max-w-3xl leading-relaxed mb-20 font-light tracking-tight">
                        The Duolingo for Indian cultural literacy. Immersive micro-journeys through sacred sites, philosophy, and ancient practices.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-12">
                        <Link to="/signup" className="group flex items-center gap-8 px-16 py-8 bg-[#D4AF37] text-black rounded-full font-medium text-[11px] uppercase tracking-[0.4em] hover:scale-105 transition-all shadow-[0_0_50px_rgba(212,175,55,0.2)]">
                            Begin Journey
                            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                        <Link to="/premium" className="px-12 py-6 border border-white/5 text-white/20 hover:text-white hover:border-white/10 rounded-full font-medium text-[10px] uppercase tracking-[0.4em] transition-all">
                            Join Protocol
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* ── The 5-Minute Loop ── */}
            <section className="relative py-64 px-8 md:px-24 z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
                        <div className="lg:col-span-5 space-y-12">
                            <span className="text-[#D4AF37] font-medium tracking-[0.6em] text-[10px] uppercase block">The Resonance Habit</span>
                            <h2 className="text-6xl md:text-8xl font-serif font-light tracking-tighter leading-none">
                                Your Daily<br />Sanctuary.
                            </h2>
                            <p className="text-white/30 text-xl leading-relaxed font-light tracking-tight max-sm mb-12">
                                We've condensed five millennia of wisdom into three effortless chapters designed for the modern seeker.
                            </p>
                        </div>
                        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
                            {[
                                { title: '3m Chronicle', desc: 'Cinematic virtual tours of sacred sites.', icon: Map },
                                { title: '1m Insight', desc: 'Philosophy distilled from the Vedas.', icon: BookOpen },
                                { title: '2m Practice', desc: 'Guided breathing and mantra rituals.', icon: Heart },
                            ].map((item, i) => (
                                <div key={i} className="p-12 rounded-[64px] bg-white/[0.02] border border-white/5 hover:border-[#D4AF37]/20 transition-all group">
                                    <item.icon className="w-8 h-8 text-[#D4AF37] mb-12 group-hover:scale-110 transition-transform" />
                                    <h3 className="text-xl font-serif font-light mb-4">{item.title}</h3>
                                    <p className="text-white/30 text-xs font-light leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── AI Personalization ── */}
            <section className="relative py-96 px-8 md:px-24 text-center z-10">
                <div className="max-w-4xl mx-auto space-y-16">
                    <Sparkles size={48} className="text-[#D4AF37] mx-auto mb-12 opacity-30" />
                    <h2 className="text-6xl md:text-[8rem] font-serif font-light tracking-tighter leading-none mb-12">
                        Ancient Soul.<br />
                        <span className="text-[#D4AF37]">Digital Mind.</span>
                    </h2>
                    <p className="text-white/30 text-xl md:text-3xl font-light leading-relaxed tracking-tight max-w-3xl mx-auto italic">
                        "Every lesson is verified by historians. Our intelligence only ensures the wisdom flows in sync with your life."
                    </p>
                    <div className="flex justify-center gap-16 opacity-30">
                        <div className="flex items-center gap-3">
                            <Shield size={16} />
                            <span className="text-[10px] uppercase tracking-[0.4em]">Verified Scholars</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Globe size={16} />
                            <span className="text-[10px] uppercase tracking-[0.4em]">Global Sangha</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Final CTA ── */}
            <section className="relative py-80 px-8 md:px-24 z-10 overflow-hidden">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 2, ease: premiumEasing }}
                        className="mb-24"
                    >
                        <h2 className="text-7xl md:text-[12rem] font-serif font-light tracking-tighter mb-16 leading-[0.8] text-white">
                            Resonate.<br />
                            <span className="text-white/5 italic">Bharat.</span>
                        </h2>
                    </motion.div>

                    <Link to="/signup" className="group inline-flex items-center gap-12 text-[10px] font-medium tracking-[0.6em] uppercase text-white hover:text-[#D4AF37] transition-all">
                        Begin the Return
                        <span className="w-24 h-[1px] bg-[#D4AF37]/30 group-hover:bg-[#D4AF37] group-hover:w-48 transition-all duration-1000" />
                    </Link>
                </div>
            </section>

            {/* Footer Credits */}
            <footer className="relative z-10 py-12 px-8 border-t border-white/5 text-center">
                <p className="text-[9px] uppercase tracking-[0.8em] text-white/10 font-medium">
                    Inner Root Protocol V2.0 — All Wisdom Preserved
                </p>
            </footer>
        </div>
    );
};

export default LandingPage;
