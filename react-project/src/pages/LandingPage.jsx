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
        <div ref={containerRef} className="min-h-screen bg-spiritual-gradient text-white selection:bg-brand-gold/30 relative overflow-hidden font-sans">
            <SEO 
                title="Inner Root | Ancient Wisdom. Future Intelligence."
                description="Synchronizing five millennia of Vedic wisdom with future intelligence."
            />

            {/* ── Ambient Background Glows ── */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none z-0" />
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-brand-gold/3 blur-[140px] rounded-full pointer-events-none z-0" />

            {/* ── Hero Section ── */}
            <section className="relative min-h-[95vh] flex flex-col justify-center px-8 md:px-24 pt-48 pb-24 z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.4, ease: premiumEasing }}
                    className="max-w-6xl"
                >
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 1 }}
                        className="flex items-center gap-4 mb-12"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                        <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-brand-gold/80">Ancient Wisdom. Future Intelligence.</span>
                    </motion.div>

                    <h1 className="text-7xl md:text-[9rem] font-serif font-light tracking-tighter leading-[0.85] mb-12 text-white selection:text-black">
                        Focus,<br />
                        <span className="text-white/10 hover:text-white transition-all duration-1000 cursor-default">without noise.</span>
                    </h1>

                    <p className="text-lg md:text-2xl text-dim max-w-2xl leading-relaxed mb-16 font-light tracking-tight">
                        A curated system designed to help you think clearly, act deliberately, and stay aligned with what truly matters in a digital age.
                    </p>

                    <div className="flex flex-col sm:flex-row items-start gap-12">
                        <Link to="/explore" className="btn-premium">
                            Start Journey
                        </Link>
                        <Link to="/wellness" className="btn-ghost">
                            See the Japa Experience
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* ── Pillars Section (Asymmetrical Stagger) ── */}
            <section className="py-64 px-8 md:px-24 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-24">
                        
                        {/* Title - Occupies 5 columns */}
                        <div className="md:col-span-5 md:pt-24">
                            <motion.span 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="text-brand-gold/60 font-medium tracking-[0.5em] text-[10px] uppercase mb-8 block"
                            >
                                Foundation
                            </motion.span>
                            <h2 className="text-5xl md:text-8xl font-serif font-light tracking-tighter leading-none text-white mb-12">
                                A quieter path<br />to yourself.
                            </h2>
                            <p className="text-dim text-xl leading-relaxed font-light tracking-tight max-w-sm">
                                No distractions. No algorithms. Just a structured path that brings your attention back to where it belongs.
                            </p>
                        </div>

                        {/* Staggered Features - Occupies 7 columns */}
                        <div className="md:col-span-7 space-y-32">
                            {[
                                { title: 'The Sacred Map', desc: 'A spatial interface to visualize your spiritual progress across five millennia of wisdom.', delay: 0.1, offset: 'md:ml-12' },
                                { title: 'Daily Practice', desc: 'Digital tools like Japa counters that build consistency with aesthetic delight.', delay: 0.2, offset: 'md:ml-32' },
                                { title: 'Ancient Library', desc: 'Timeless ideas from Vedic texts, distilled into actionable insights for the modern era.', delay: 0.3, offset: 'md:ml-8' },
                            ].map((feat, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 1.2, delay: feat.delay, ease: premiumEasing }}
                                    className={`max-w-md ${feat.offset} glass-card p-10 group cursor-default`}
                                >
                                    <h3 className="text-3xl font-serif font-light mb-6 text-white group-hover:text-brand-gold transition-colors">{feat.title}</h3>
                                    <p className="text-dim text-base leading-relaxed font-light group-hover:text-white/80 transition-colors">{feat.desc}</p>
                                    <div className="mt-8 h-[1px] w-12 bg-brand-gold/30 group-hover:w-full transition-all duration-700" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Quote Section (Interactive & Emotional) ── */}
            <section className="py-96 px-8 md:px-24 relative overflow-hidden flex items-center justify-center border-y border-white/5 group">
                {/* Background soft glow that follows mouse (subtle) */}
                <div className="absolute inset-0 bg-radial-gradient from-brand-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" 
                     style={{ background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(212, 175, 55, 0.08) 0%, transparent 60%)' }}
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
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2.5, ease: premiumEasing }}
                        className="text-5xl md:text-8xl font-serif font-light leading-tight text-white tracking-tight selection:bg-brand-gold/20"
                    >
                        "Depth creates clarity."
                    </motion.p>
                    
                    <motion.div 
                        initial={{ width: 0, opacity: 0 }}
                        whileInView={{ width: '160px', opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 3, delay: 0.8, ease: premiumEasing }}
                        className="h-[1px] bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent mx-auto mt-24"
                    />
                </div>
            </section>

            {/* ── CTA Section (Minimal) ── */}
            <section className="py-80 px-8 md:px-24">
                <div className="max-w-6xl mx-auto text-left">
                    <h2 className="text-6xl md:text-[10rem] font-serif font-light tracking-tighter mb-16 leading-[0.8] text-white">
                        Make space for<br />the self.
                    </h2>
                    <p className="text-xl md:text-2xl text-dim mb-20 max-w-lg font-light leading-relaxed tracking-tight">
                        Start small. Stay consistent. Let the rest unfold in its own time.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-start gap-16">
                        <Link to="/signup" className="text-sm font-medium tracking-[0.3em] uppercase text-white hover:text-brand-gold transition-all flex items-center gap-6 group">
                            Begin Application
                            <span className="w-16 h-[1px] bg-white group-hover:bg-brand-gold group-hover:w-24 transition-all duration-700" />
                        </Link>
                        <Link to="/contact" className="text-sm font-medium tracking-[0.3em] uppercase text-white/40 hover:text-white transition-colors">
                            Talk to us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
