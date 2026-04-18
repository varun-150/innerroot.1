import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Heart, Mountain, Waves, Wind, Sun, Globe, Sparkles, BookOpen, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/ui/SEO';
import { useScrollReveal } from '../hooks/useScrollReveal';

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

/* ── Floating Indigo Orb ── */
const Orb = ({ className, delay = 0 }) => (
    <div
        className={`absolute rounded-full pointer-events-none animate-float ${className}`}
        style={{
            animationDelay: `${delay}s`,
            background: 'radial-gradient(circle, rgba(244, 235, 208, 0.40) 0%, rgba(27, 38, 59, 0.30) 50%, transparent 100%)',
            filter: 'blur(120px)',
        }}
    />
);

const LandingPage = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const heroY = useTransform(scrollYProgress, [0, 0.25], ['0%', '-8%']);
    useScrollReveal();

    /* single token for inline use */
    const BG = {
        primary:  'var(--gradient-primary)',
        luminous: 'var(--gradient-luminous)',
        glow:     'var(--shadow-glow-accent)',
        border:   'var(--color-border)',
    };

    return (
        <div ref={containerRef}
            className="min-h-screen bg-gradient-primary font-body overflow-x-hidden selection:bg-gold-500/30 selection:text-white text-muted-gray">
            <SEO title="Inner Root | Heritage & Wellness" />

            {/* ════════ HERO ════════ */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Midnight Blue background fill */}
                <div className="absolute inset-0 bg-gradient-primary" />

                {/* Floating orbs */}
                <Orb className="w-[700px] h-[700px] opacity-20 top-[-15%] left-[-10%]" delay={0} />
                <Orb className="w-[400px] h-[400px] opacity-12 bottom-[-10%] right-[-5%]" delay={2} />
                <Orb className="w-[250px] h-[250px] opacity-8  top-[40%] right-[20%]" delay={4} />

                {/* Grid */}
                <div className="absolute inset-0 opacity-[0.025]"
                    style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 79px,rgba(244,235,208,0.5) 79px,rgba(244,235,208,0.5) 80px),repeating-linear-gradient(90deg,transparent,transparent 79px,rgba(244,235,208,0.5) 79px,rgba(244,235,208,0.5) 80px)' }} />

                <motion.div style={{ y: heroY }} className="relative z-10 text-center px-6 max-w-6xl mx-auto">
                    {/* Badge */}
                    <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:1, ease:[0.65,0,0.35,1] }} className="mb-10">
                        <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-gold-500/10 bg-midnight-800 text-[10px] font-black tracking-[0.5em] uppercase text-gold-500 shadow-2xl">
                            <Sparkles size={12} className="text-gold-500" /> Heritage Protocol v6
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity:0, scale:0.94 }} animate={{ opacity:1, scale:1 }}
                        transition={{ duration:1.4, ease:[0.65,0,0.35,1] }}
                        className="font-display font-black tracking-tighter uppercase leading-[0.82] mb-12"
                        style={{ fontSize:'clamp(4rem,11vw,9.5rem)', color: 'var(--gold-500)' }}
                    >
                        INNER<br/>
                        <span style={{ color: 'var(--gold-500)' }}>
                            ROOT
                        </span>
                    </motion.h1>

                    <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:1.2, delay:0.5 }}
                        className="max-w-xl mx-auto text-xl mb-16 font-light leading-relaxed text-muted-gray">
                        A premium sanctuary for ancestral intelligence.<br/>
                        Synchronizing spirit and silicon.
                    </motion.p>

                    <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:1, delay:0.9 }}
                        className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                        <Link to="/explore" className="btn-primary group">
                            Initiate Core <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/wellness" className="btn-secondary">Wellness Sync</Link>
                    </motion.div>
                </motion.div>

                <div className="section-fade-bottom absolute inset-0 pointer-events-none" />
            </section>



            {/* ════════ CORE MODULES ════════ */}
            <section className="py-40 px-6 relative reveal">
                <Orb className="w-[600px] h-[600px] opacity-6 top-0 left-1/2 -translate-x-1/2" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-24">
                        <span className="text-[9px] font-black uppercase tracking-[0.6em] block mb-4" style={{ color:'var(--gold-500)' }}>Heritage Protocols</span>
                        <h2 className="font-display font-black uppercase tracking-tighter leading-none"
                            style={{ fontSize:'clamp(3rem,7vw,6rem)', background: BG.luminous, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                            Core Modules
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { icon:Mountain, title:'Heritage Map',  desc:'Vivid 3D visualization of 5,000 years of sacred sites.',       link:'/heritage-map', btn:'View Map'      },
                            { icon:Waves,    title:'Aura Chat',     desc:'Fluid AI for deep Vedic research and heritage queries.',         link:'/explore',      btn:'Start Protocol' },
                            { icon:Wind,     title:'Immersion',     desc:'Binaural breathing modules and visual meditation sanctuaries.', link:'/wellness',     btn:'Sync Now'       },
                            { icon:Sun,      title:'Library',       desc:'Vaulted archives of Vedic texts and cultural artifacts.',        link:'/library',      btn:'Access Vault'   },
                        ].map((item, i) => (
                            <motion.div key={i} whileHover={{ y:-10, scale:1.01 }} transition={{ duration:0.6, ease:[0.65,0,0.35,1] }}
                                className="card-luxury p-14 group relative overflow-hidden flex flex-col justify-end" style={{ minHeight:380 }}>
                                {/* Icon watermark */}
                                <div className="absolute top-0 right-0 p-10 opacity-[0.04] group-hover:opacity-[0.10] transition-opacity duration-1000">
                                    <item.icon size={160} style={{ color:'var(--gold-500)', opacity: 0.1 }} />
                                </div>
                                {/* Top border gradient */}
                                <div className="absolute top-0 left-0 right-0 h-[1.5px] opacity-50 group-hover:opacity-100 transition-opacity duration-700"
                                    style={{ background: BG.luminous }} />
                                <div className="relative z-10 space-y-6">
                                    <div className="w-16 h-16 rounded-3xl flex items-center justify-center bg-midnight-950 border border-gold-500/10 shadow-xl">
                                        <item.icon size={28} className="text-gold-500" />
                                    </div>
                                    <h3 className="text-3xl font-display font-black uppercase tracking-tighter text-gold-500">{item.title}</h3>
                                    <p className="leading-relaxed text-base font-light max-w-sm text-muted-gray">{item.desc}</p>
                                    <Link to={item.link} className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] hover:gap-6 transition-all duration-500"
                                        style={{ color:'var(--gold-500)' }}>
                                        {item.btn} <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════ STATS ════════ */}
            <section className="py-40 px-6 relative reveal">
                <div className="absolute inset-0 opacity-20 bg-gradient-glow" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <h2 className="text-center font-display font-black uppercase tracking-tighter mb-20"
                        style={{ fontSize:'clamp(2rem,5vw,4.5rem)', background: BG.luminous, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                        By The Numbers
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {[
                            { value:'500', suffix:'+', label:'Heritage Sites Mapped'  },
                            { value:'10000', suffix:'+', label:'Daily Active Seekers' },
                            { value:'24',  suffix:'/7', label:'AI Availability'       },
                        ].map((s, i) => (
                            <motion.div key={i} whileHover={{ scale:1.05 }} className="card-luxury p-12 text-center group">
                                <div className="text-6xl font-display font-black mb-4 text-gold-500">
                                    <Counter target={s.value} suffix={s.suffix} />
                                </div>
                                <div className="text-[10px] font-black uppercase tracking-[0.5em] group-hover:text-gold-100 transition-colors duration-700 text-gold-400">
                                    {s.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════ FINAL CTA ════════ */}
            <section className="py-40 px-6 pb-48">
                <div className="max-w-7xl mx-auto">
                    <div className="card-luxury p-24 md:p-36 text-center relative overflow-hidden reveal">
                        <div className="absolute inset-0 opacity-[0.07]" style={{ background: BG.luminous, backgroundSize:'300% 300%' }} />
                        <Orb className="w-80 h-80 opacity-10 -top-16 -right-16" />
                        <Orb className="w-64 h-64 opacity-8 -bottom-16 -left-16" delay={2} />
                        <div className="relative z-10">
                            <span className="text-[9px] font-black uppercase tracking-[0.6em] block mb-6" style={{ color:'var(--gold-500)' }}>Final Protocol</span>
                            <h2 className="font-display font-black uppercase tracking-tighter leading-none mb-10"
                                style={{ fontSize:'clamp(3rem,8vw,7rem)', background: BG.luminous, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                                ENTER<br/>STILLNESS
                            </h2>
                            <p className="mb-16 text-xl font-light tracking-wide text-muted-gray">
                                Activate your heritage protocol.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-5 justify-center">
                                <Link to="/explore"  className="btn-primary flex items-center gap-2"><Activity size={18} /> Enter Sanctuary</Link>
                                <Link to="/library"  className="btn-secondary flex items-center gap-2"><BookOpen size={18} />  Browse Library</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
