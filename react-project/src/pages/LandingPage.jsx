import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, BookOpen, Activity, Mountain, Waves, Wind, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/ui/SEO';

/* ── Animated Counter ── */
const Counter = ({ target, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.5 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    useEffect(() => {
        if (!visible) return;
        const end = parseInt(target);
        const step = Math.ceil(end / 60);
        let cur = 0;
        const t = setInterval(() => { cur = Math.min(cur + step, end); setCount(cur); if (cur >= end) clearInterval(t); }, 1000 / 60);
        return () => clearInterval(t);
    }, [visible, target]);
    return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

/* ── Floating Sacred Orb ── */
const Orb = ({ className, delay = 0 }) => (
    <div
        className={`absolute rounded-full pointer-events-none animate-breathe ${className}`}
        style={{
            animationDelay: `${delay}s`,
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
            filter: 'blur(80px)',
        }}
    />
);

const LandingPage = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const heroY = useTransform(scrollYProgress, [0, 0.25], ['0%', '-10%']);

    return (
        <div ref={containerRef} className="min-h-screen bg-spiritual-gradient font-body text-brand-ivory overflow-x-hidden selection:bg-brand-gold/30 selection:text-white">
            <SEO title="Inner Root | Spiritual-Tech Sanctuary" />

            {/* ════════ HERO ════════ */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <Orb className="w-[800px] h-[800px] top-[-20%] left-[-10%]" delay={0} />
                <Orb className="w-[500px] h-[500px] bottom-[-10%] right-[-5%]" delay={2} />

                {/* Subtle Grid */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)', backgroundSize: '40px 40px' }} />

                <motion.div style={{ y: heroY }} className="relative z-10 text-center px-6 max-w-6xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="mb-8">
                        <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-brand-gold/20 bg-brand-navy/50 backdrop-blur-md text-[10px] font-bold tracking-[0.4em] uppercase text-brand-gold shadow-gold-glow">
                            <Sparkles size={12} /> Spiritual Intelligence Protocol
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                        className="font-serif font-bold tracking-tight uppercase leading-none mb-10"
                        style={{ fontSize: 'clamp(3.5rem, 10vw, 8.5rem)' }}
                    >
                        INNER<br />
                        <span className="text-brand-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">ROOT</span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.5 }}
                        className="max-w-xl mx-auto text-lg md:text-xl mb-14 font-body font-light leading-relaxed text-brand-ivory/80">
                        Bridging ancient Vedic wisdom with cutting-edge AI clarity. <br />
                        Your sanctuary for ancestral synchronization.
                    </motion.p>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8 }}
                        className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link to="/explore" className="btn-primary flex items-center gap-3">
                            Initiate Core <ArrowRight size={18} />
                        </Link>
                        <Link to="/wellness" className="btn-secondary">Wellness Vault</Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* ════════ CORE MODULES ════════ */}
            <section className="py-32 px-6 relative">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-24">
                        <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-brand-gold block mb-4">Sacred Modules</span>
                        <h2 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-brand-ivory uppercase">
                            Core Pillars
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {[
                            { icon: Mountain, title: 'Heritage Map', desc: 'Immersive 3D cartography of 5,000 years of sacred geography.', link: '/heritage-map', btn: 'Explore Sites' },
                            { icon: Waves, title: 'Aura Intelligence', desc: 'LLM-powered spiritual guide for deep research and meditation.', link: '/explore', btn: 'Open Session' },
                            { icon: Wind, title: 'Wellness Sync', desc: 'Synesthetic breathing modules and binaural sound sanctuaries.', link: '/wellness', btn: 'Sync Now' },
                            { icon: Sun, title: 'Vedic Archives', desc: 'Secure vaults containing digitized ancient manuscripts and texts.', link: '/library', btn: 'Enter Vault' },
                        ].map((item, i) => (
                            <motion.div key={i} whileHover={{ y: -8 }} className="spiritual-card group p-12 min-h-[400px] flex flex-col justify-end relative overflow-hidden">
                                <item.icon size={120} className="absolute top-8 right-8 text-brand-gold/5 group-hover:text-brand-gold/10 transition-colors duration-500" />
                                <div className="space-y-6 relative z-10">
                                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-brand-gold/10 border border-brand-gold/20">
                                        <item.icon size={24} className="text-brand-gold" />
                                    </div>
                                    <h3 className="text-3xl font-serif font-bold text-brand-gold uppercase tracking-tight">{item.title}</h3>
                                    <p className="font-body font-light text-brand-ivory/70 leading-relaxed max-w-sm">{item.desc}</p>
                                    <Link to={item.link} className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-brand-gold hover:gap-5 transition-all duration-300">
                                        {item.btn} <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════ NUMBERS ════════ */}
            <section className="py-32 px-6 relative bg-brand-navy/30">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-brand-ivory mb-20 uppercase">The Protocol Scale</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { value: '500', suffix: '+', label: 'Sacred Sites' },
                            { value: '250', suffix: 'k', label: 'Daily Seekers' },
                            { value: '100', suffix: '%', label: 'Clarity Rate' },
                        ].map((s, i) => (
                            <div key={i} className="spiritual-card p-10 group">
                                <div className="text-6xl font-serif font-bold text-brand-gold mb-3">
                                    <Counter target={s.value} suffix={s.suffix} />
                                </div>
                                <div className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand-ivory/60 group-hover:text-brand-gold transition-colors duration-500">
                                    {s.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════ CTA ════════ */}
            <section className="py-40 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="spiritual-card p-20 md:p-32 text-center relative overflow-hidden">
                        <Orb className="w-64 h-64 -top-20 -right-20" />
                        <div className="relative z-10">
                            <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand-gold block mb-8">Ready for Synchrony?</span>
                            <h2 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-brand-ivory mb-12 uppercase leading-tight">
                                Reach Your<br /><span className="text-brand-gold">Root Essence</span>
                            </h2>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <Link to="/explore" className="btn-primary flex items-center gap-3 justify-center"><Activity size={20} /> Enter Sanctuary</Link>
                                <Link to="/library" className="btn-secondary flex items-center gap-3 justify-center"><BookOpen size={20} /> Browse Archives</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
