import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RotateCcw, ShieldCheck, Info, Music, Volume2 } from "lucide-react";
import SEO from "../components/ui/SEO";

/* ─────────────── Mantras ─────────────── */
const MANTRAS = [
    {
        id: "shiva",
        name: "Om Namah Shivaya",
        text: "ॐ नमः शिवाय",
        romanized: "Om Namah Shivaya",
        desc: "Inner stillness & transformation",
        color: "#D4AF37",
        glow: "rgba(212,175,55,0.15)",
    },
    {
        id: "hare",
        name: "Hare Krishna",
        text: "हरे कृष्ण हरे कृष्ण\nकृष्ण कृष्ण हरे हरे\nहरे राम हरे राम\nराम राम हरे हरे",
        romanized: "Hare Krishna Maha Mantra",
        desc: "Devotion, joy & liberation",
        color: "#D4AF37",
        glow: "rgba(212,175,55,0.12)",
    },
    {
        id: "gayatri",
        name: "Gayatri",
        text: "ॐ भूर्भुवः स्वः\nतत्सवितुर्वरेण्यं\nभर्गो देवस्य धीमहि\nधियो यो नः प्रचोदयात्",
        romanized: "Gayatri Mantra",
        desc: "Clarity & divine intelligence",
        color: "#D4AF37",
        glow: "rgba(212,175,55,0.12)",
    },
    {
        id: "mani",
        name: "Om Mani Padme Hum",
        text: "ॐ मणि पद्मे हूँ",
        romanized: "Om Mani Padme Hum",
        desc: "Compassion & awareness",
        color: "#D4AF37",
        glow: "rgba(212,175,55,0.12)",
    },
];

/* ─────────────── Sacred Geometry ─────────────── */
function SriYantra({ color, pulse }) {
    return (
        <svg
            viewBox="0 0 200 200"
            className="absolute w-full h-full pointer-events-none stroke-current"
            style={{ 
                color: color, 
                opacity: pulse ? 0.3 : 0.05,
                transition: "opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1)"
            }}
        >
            <circle cx="100" cy="100" r="92" fill="none" strokeWidth="0.2" />
            {[0, 30, 60, 90, 120, 150].map((rot) => (
                <polygon
                    key={rot}
                    points="100,22 172,150 28,150"
                    fill="none"
                    strokeWidth="0.15"
                    transform={`rotate(${rot} 100 100)`}
                />
            ))}
            <circle cx="100" cy="100" r="3" fill={color} opacity="0.4" />
        </svg>
    );
}

/* ─────────────── Bead Ring ─────────────── */
function BeadRing({ beads, total = 108, color }) {
    const cx = 100, cy = 100, r = 88;
    return (
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full pointer-events-none">
            {Array.from({ length: total }).map((_, i) => {
                const angle = (i / total) * 2 * Math.PI - Math.PI / 2;
                const x = cx + r * Math.cos(angle);
                const y = cy + r * Math.sin(angle);
                const filled = i < beads;
                return (
                    <motion.circle
                        key={i}
                        cx={x}
                        cy={y}
                        r={filled ? 2.5 : 1}
                        initial={false}
                        animate={{
                            r: filled ? 2.5 : 1,
                            fill: filled ? color : "rgba(255,255,255,0.05)",
                            opacity: filled ? 1 : 0.3
                        }}
                        transition={{ duration: 0.4 }}
                        style={{
                            filter: filled ? `drop-shadow(0 0 4px ${color}80)` : "none",
                        }}
                    />
                );
            })}
        </svg>
    );
}

/* ─────────────── Main Component ─────────────── */
export default function Wellness() {
    const [beads, setBeads] = useState(0);
    const [malas, setMalas] = useState(0);
    const [mantra, setMantra] = useState(MANTRAS[0]);
    const [tapTrigger, setTapTrigger] = useState(0);
    const [pressed, setPressed] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    
    const premiumEasing = [0.22, 1, 0.36, 1];
    const totalBeads = beads + malas * 108;

    const increment = useCallback(() => {
        setTapTrigger((t) => t + 1);
        setPressed(true);
        setTimeout(() => setPressed(false), 150);
        
        if (beads >= 107) {
            setIsComplete(true);
            setTimeout(() => setIsComplete(false), 2000);
            setBeads(0);
            setMalas((m) => m + 1);
        } else {
            setBeads((b) => b + 1);
        }
    }, [beads]);

    useEffect(() => {
        const handler = (e) => { 
            if (e.code === "Space" || e.code === "Enter") { 
                e.preventDefault(); 
                increment(); 
            } 
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [increment]);

    const reset = () => { setBeads(0); setMalas(0); };
    const pct = Math.round((beads / 108) * 100);
    const { color, glow } = mantra;

    return (
        <div className="min-h-screen bg-[#0B0E14] text-white font-sans selection:bg-[#D4AF37]/30 relative overflow-hidden flex flex-col items-center">
            <SEO title="Practice | Inner Root" />
            
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none">
                <motion.div 
                    animate={{
                        opacity: [0.05, 0.1, 0.05],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
                    style={{ background: `radial-gradient(circle, ${glow} 0%, transparent 70%)` }}
                />
            </div>

            <main className="relative z-10 w-full max-w-2xl px-8 flex flex-col items-center pb-32">
                
                {/* Header */}
                <header className="pt-32 pb-16 text-center space-y-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-4"
                    >
                        <span className="w-8 h-[1px] bg-[#D4AF37]/20" />
                        <span className="text-[10px] uppercase tracking-[0.6em] text-[#D4AF37]">Sacred Silence</span>
                        <span className="w-8 h-[1px] bg-[#D4AF37]/20" />
                    </motion.div>
                    <h1 className="text-7xl md:text-8xl font-serif font-light tracking-tighter leading-none">
                        Japa.
                    </h1>
                </header>

                {/* Mantra Selector */}
                <nav className="flex flex-wrap gap-3 justify-center mb-16">
                    {MANTRAS.map((m) => (
                        <button
                            key={m.id}
                            onClick={() => { setMantra(m); reset(); }}
                            className={`px-6 py-2 rounded-full text-[9px] uppercase tracking-[0.3em] transition-all duration-700 border ${
                                mantra.id === m.id 
                                ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.3)]' 
                                : 'bg-white/5 text-white/40 border-white/5 hover:border-white/10'
                            }`}
                        >
                            {m.name}
                        </button>
                    ))}
                </nav>

                {/* Focus Area */}
                <section className="text-center min-h-[160px] mb-16">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={mantra.id}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            transition={{ duration: 0.8, ease: premiumEasing }}
                            className="space-y-6"
                        >
                            <p className="text-3xl md:text-5xl font-serif font-light leading-snug whitespace-pre-line text-white/90">
                                {mantra.text}
                            </p>
                            <div className="space-y-2">
                                <p className="text-[10px] tracking-[0.4em] text-[#D4AF37] uppercase font-medium">
                                    {mantra.romanized}
                                </p>
                                <p className="text-sm text-white/30 italic font-light">
                                    {mantra.desc}
                                </p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </section>

                {/* The Counter Orb */}
                <section className="relative w-[320px] h-[320px] flex items-center justify-center mb-20 group">
                    <BeadRing beads={beads} color={color} />
                    <SriYantra color={color} pulse={pressed} />
                    
                    {/* Ripple Effects */}
                    <AnimatePresence>
                        {pressed && (
                            <motion.div 
                                initial={{ scale: 0.8, opacity: 0.5 }}
                                animate={{ scale: 1.5, opacity: 0 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 rounded-full border border-[#D4AF37]/30 pointer-events-none"
                            />
                        )}
                    </AnimatePresence>

                    {/* The Main Orb */}
                    <motion.button
                        whileTap={{ scale: 0.96 }}
                        onClick={increment}
                        className="relative w-56 h-56 rounded-full flex flex-col items-center justify-center transition-all duration-1000 overflow-hidden"
                        style={{
                            background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.05), transparent)`,
                            border: `1px solid rgba(212,175,55,${pressed ? 0.4 : 0.1})`,
                            boxShadow: isComplete ? `0 0 100px rgba(212,175,55,0.4)` : `inset 0 0 40px rgba(255,255,255,0.02)`
                        }}
                    >
                        {isComplete && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 bg-[#D4AF37]/10 backdrop-blur-sm flex items-center justify-center"
                            >
                                <Sparkles size={40} className="text-[#D4AF37]" />
                            </motion.div>
                        )}

                        <span className="text-8xl font-serif font-light tracking-tighter text-white/90">
                            {beads}
                        </span>
                        <span className="text-[10px] tracking-[0.6em] text-white/20 mt-2 font-medium uppercase">
                            Beads
                        </span>
                    </motion.button>
                </section>

                {/* Progress & Stats */}
                <section className="w-full space-y-12">
                    <div className="flex justify-center gap-24">
                        <div className="text-center group">
                            <div className="text-4xl font-serif text-white/80 group-hover:text-[#D4AF37] transition-colors duration-700">{malas}</div>
                            <div className="text-[9px] uppercase tracking-[0.4em] text-white/20 mt-2">Malas</div>
                        </div>
                        <div className="text-center group">
                            <div className="text-4xl font-serif text-white/80 group-hover:text-[#D4AF37] transition-colors duration-700">{pct}%</div>
                            <div className="text-[9px] uppercase tracking-[0.4em] text-white/20 mt-2">Resonance</div>
                        </div>
                        <div className="text-center group">
                            <div className="text-4xl font-serif text-white/80 group-hover:text-[#D4AF37] transition-colors duration-700">{totalBeads}</div>
                            <div className="text-[9px] uppercase tracking-[0.4em] text-white/20 mt-2">Eternal</div>
                        </div>
                    </div>

                    <div className="relative h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.8, ease: premiumEasing }}
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#D4AF37]/20 to-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                        />
                    </div>
                </section>

                {/* Footer Controls */}
                <footer className="mt-20 w-full flex items-center justify-between">
                    <div className="flex items-center gap-3 text-white/20">
                        <ShieldCheck size={14} />
                        <span className="text-[9px] uppercase tracking-[0.3em]">Session Protected</span>
                    </div>
                    <div className="flex items-center gap-8">
                        <button className="text-white/20 hover:text-[#D4AF37] transition-colors p-2">
                            <Volume2 size={18} />
                        </button>
                        <button 
                            onClick={reset}
                            className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center text-white/20 hover:text-white hover:border-white/20 transition-all"
                        >
                            <RotateCcw size={16} />
                        </button>
                    </div>
                </footer>
            </main>
        </div>
    );
}