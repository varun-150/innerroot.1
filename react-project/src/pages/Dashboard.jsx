import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
    Activity, Heart, Clock, Sparkles, 
    TrendingUp, Target, Brain, ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/ui/SEO';
import { moodAPI } from '../services/api';

/* ── Minimalist Easing ── */
const premiumEasing = [0.22, 1, 0.36, 1];

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6, ease: premiumEasing }
    }
};

/* ── Simplified Trend Line ── */
const SimpleTrend = ({ data }) => {
    const points = data.map((d, i) => ({
        x: (i / (data.length - 1)) * 100,
        y: 100 - (d.value / 100) * 100
    }));
    const path = points.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ');

    return (
        <svg viewBox="0 0 100 100" className="w-full h-12 overflow-visible">
            <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: premiumEasing }}
                d={path}
                fill="none"
                stroke="#D4AF37"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
};

const Dashboard = () => {
    const { user } = useAuth();
    const [reflectionCount, setReflectionCount] = useState(0);
    const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Seeker';

    useEffect(() => {
        moodAPI.getAll().then(data => {
            if (data) setReflectionCount(data.length);
        }).catch(err => console.error(err));
    }, []);

    const metrics = [
        { label: "Stability", value: "82%", sub: "Presence" },
        { label: "Reflections", value: reflectionCount, sub: "Mind" },
        { label: "Journeys", value: "12", sub: "Exploration" },
    ];

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#D4AF37]/30 pt-48 pb-24 px-12 md:px-24 font-sans">
            <SEO title="Today — Inner Root" />
            
            <div className="max-w-6xl mx-auto">
                {/* 1. HERO SECTION */}
                <motion.header 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: premiumEasing }}
                    className="mb-32"
                >
                    <h1 className="text-6xl md:text-8xl font-serif font-light tracking-tight text-white mb-6">
                        Today
                    </h1>
                    <p className="text-white/30 text-lg md:text-xl font-light tracking-tight max-w-sm">
                        A quiet view of your practice.
                    </p>
                </motion.header>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-24 items-start">
                    
                    {/* LEFT: Current Focus (7 columns) */}
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 1 }}
                        className="md:col-span-7"
                    >
                        <div className="border-t border-white/5 pt-12">
                            <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#D4AF37]/60 mb-12 block">Current Focus</span>
                            <h2 className="text-4xl md:text-6xl font-serif font-light leading-tight mb-12 text-white/90">
                                Om Namah Shivaya
                            </h2>
                            
                            <div className="flex gap-24">
                                <div>
                                    <p className="text-4xl font-serif font-light text-white mb-2">108</p>
                                    <p className="text-[10px] uppercase tracking-widest text-white/20">beads</p>
                                </div>
                                <div>
                                    <p className="text-4xl font-serif font-light text-white mb-2">14</p>
                                    <p className="text-[10px] uppercase tracking-widest text-white/20">streak</p>
                                </div>
                                <div className="ml-auto">
                                    <div className="w-24 h-24 rounded-full border border-[#D4AF37]/20 flex items-center justify-center">
                                        <p className="text-xl font-serif font-light text-[#D4AF37]">82%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* RIGHT: Stats (5 columns) */}
                    <div className="md:col-span-5 space-y-16 md:pt-12">
                        {metrics.map((m, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + (i * 0.1), duration: 1 }}
                                className="flex justify-between items-end border-b border-white/5 pb-8"
                            >
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-white/20 mb-2">{m.sub}</p>
                                    <h3 className="text-sm font-light text-white/60">{m.label}</h3>
                                </div>
                                <p className="text-3xl font-serif font-light">{m.value}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Simplified Chart (Full width, but quiet) */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 1.5 }}
                    className="mt-48 pt-24 border-t border-white/5"
                >
                    <div className="flex justify-between items-end mb-16">
                        <p className="text-[10px] uppercase tracking-[0.4em] text-white/20">Weekly Rhythm</p>
                        <span className="text-[10px] text-[#D4AF37]/60 tracking-widest uppercase">Growing Stability</span>
                    </div>
                    <div className="h-24">
                        <SimpleTrend data={[
                            { value: 65 }, { value: 72 }, { value: 58 }, 
                            { value: 80 }, { value: 75 }, { value: 88 }, { value: 85 }
                        ]} />
                    </div>
                </motion.section>

                {/* Bottom Link */}
                <div className="mt-48 flex justify-center">
                    <Link to="/wellness" className="text-sm font-medium tracking-widest uppercase text-white/40 hover:text-white transition-colors flex items-center gap-6 group">
                        Resume Practice
                        <span className="w-12 h-[1px] bg-white/20 group-hover:bg-white group-hover:w-16 transition-all duration-500" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
