import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/ui/SEO';

const LandingPage = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
    const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, -150]), springConfig);

    const premiumEasing = [0.22, 1, 0.36, 1];

    return (
        <div ref={containerRef} className="min-h-screen bg-[#0A0A0A] text-[#E0E0E0] selection:bg-[#D4AF37]/30 relative overflow-hidden font-sans">
            <SEO 
                title="Inner Root | Ancient Wisdom. Future Intelligence."
                description="Synchronizing five millennia of Vedic wisdom with future intelligence."
            />

            {/* ── Hero Section ── */}
            <section className="relative min-h-[90vh] flex flex-col justify-center px-12 md:px-24 pt-48 pb-24 z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: premiumEasing }}
                    className="max-w-5xl"
                >
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 1 }}
                        className="flex items-center gap-4 mb-12"
                    >
                        <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
                        <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#D4AF37]/60">Built for people who are done with noise.</span>
                    </motion.div>

                    <h1 className="text-6xl md:text-[8rem] font-serif font-light tracking-tighter leading-[0.9] mb-12 text-white selection:text-black">
                        Focus,<br />
                        <span className="text-white/20 hover:text-white transition-colors duration-1000 cursor-default">without friction.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-[#E0E0E0]/40 max-w-xl leading-relaxed mb-16 font-light tracking-tight">
                        A system designed to help you think clearly, act deliberately, and stay aligned with what truly matters.
                    </p>

                    <div className="flex flex-col sm:flex-row items-start gap-12">
                        <Link to="/explore" className="text-sm font-medium tracking-widest uppercase text-[#D4AF37] hover:text-white transition-colors flex items-center gap-4 group">
                            Start now
                            <span className="w-8 h-[1px] bg-[#D4AF37] group-hover:w-12 transition-all duration-500" />
                        </Link>
                        <Link to="/wellness" className="text-sm font-medium tracking-widest uppercase text-white/40 hover:text-white transition-colors">
                            See how it works
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* ── Pillars Section (Asymmetrical Stagger) ── */}
            <section className="py-64 px-12 md:px-24 relative z-10 bg-[#0A0A0A]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-24">
                        
                        {/* Title - Occupies 5 columns */}
                        <div className="md:col-span-5 md:pt-24">
                            <motion.span 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="text-[#D4AF37]/40 font-medium tracking-[0.5em] text-[10px] uppercase mb-8 block"
                            >
                                Foundation
                            </motion.span>
                            <h2 className="text-5xl md:text-7xl font-serif font-light tracking-tighter leading-none text-white mb-12">
                                A quieter way to<br />work on yourself.
                            </h2>
                            <p className="text-[#E0E0E0]/30 text-lg leading-relaxed font-light tracking-tight max-w-sm">
                                No distractions. No endless content. Just a structured path that brings your attention back to where it belongs.
                            </p>
                        </div>

                        {/* Staggered Features - Occupies 7 columns */}
                        <div className="md:col-span-7 space-y-32">
                            {[
                                { title: 'The Map', desc: 'See where you are, and where to go next.', delay: 0.1, offset: 'md:ml-12' },
                                { title: 'Practice', desc: 'Daily tools that build consistency without pressure.', delay: 0.2, offset: 'md:ml-32' },
                                { title: 'Library', desc: 'Timeless ideas, distilled into something you can actually use.', delay: 0.3, offset: 'md:ml-8' },
                            ].map((feat, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 1, delay: feat.delay, ease: premiumEasing }}
                                    className={`max-w-md ${feat.offset}`}
                                >
                                    <h3 className="text-2xl font-serif font-light mb-6 text-white/90">{feat.title}</h3>
                                    <p className="text-[#E0E0E0]/30 text-sm leading-relaxed font-light">{feat.desc}</p>
                                    <div className="mt-8 h-[1px] w-12 bg-white/5" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Quote Section (Interactive & Emotional) ── */}
            <section className="py-96 px-12 md:px-24 relative overflow-hidden flex items-center justify-center border-y border-white/5 group">
                {/* Background soft glow that follows mouse (subtle) */}
                <div className="absolute inset-0 bg-radial-gradient from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" 
                     style={{ background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(212, 175, 55, 0.05) 0%, transparent 50%)' }}
                />

                <div 
                    className="max-w-4xl text-center relative z-10"
                    onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = ((e.clientX - rect.left) / rect.width) * 100;
                        const y = ((e.clientY - rect.top) / rect.height) * 100;
                        e.currentTarget.parentElement.style.setProperty('--mouse-x', `${x}%`);
                        e.currentTarget.parentElement.style.setProperty('--mouse-y', `${y}%`);
                    }}
                >
                    <motion.p 
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2.5, ease: premiumEasing }}
                        className="text-4xl md:text-7xl font-serif font-light leading-tight text-white tracking-tight selection:bg-[#D4AF37]/20"
                    >
                        "Depth creates clarity."
                    </motion.p>
                    
                    <motion.div 
                        initial={{ width: 0, opacity: 0 }}
                        whileInView={{ width: '120px', opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 3, delay: 0.8, ease: premiumEasing }}
                        className="h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent mx-auto mt-20"
                    />
                </div>
            </section>

            {/* ── CTA Section (Minimal) ── */}
            <section className="py-80 px-12 md:px-24 bg-[#0A0A0A]">
                <div className="max-w-5xl mx-auto text-left">
                    <h2 className="text-5xl md:text-[8rem] font-serif font-light tracking-tighter mb-16 leading-[0.9] text-white">
                        Make space for<br />what matters.
                    </h2>
                    <p className="text-lg md:text-xl text-[#E0E0E0]/30 mb-20 max-w-md font-light leading-relaxed tracking-tight">
                        Start small. Stay consistent. Let the rest follow.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-start gap-16">
                        <Link to="/signup" className="text-sm font-medium tracking-widest uppercase text-white hover:text-[#D4AF37] transition-colors flex items-center gap-6 group">
                            Get started
                            <span className="w-12 h-[1px] bg-white group-hover:bg-[#D4AF37] group-hover:w-16 transition-all duration-500" />
                        </Link>
                        <Link to="/contact" className="text-sm font-medium tracking-widest uppercase text-white/20 hover:text-white transition-colors">
                            Talk to us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
