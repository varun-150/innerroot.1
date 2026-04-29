import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────── Mantras ─────────────── */
const MANTRAS = [
    {
        id: "shiva",
        name: "Om Namah Shivaya",
        text: "ॐ नमः शिवाय",
        romanized: "Om Namah Shivaya",
        desc: "Inner stillness & transformation",
        color: "#a78bfa",
        glow: "rgba(167,139,250,0.15)",
    },
    {
        id: "hare",
        name: "Hare Krishna",
        text: "हरे कृष्ण हरे कृष्ण\nकृष्ण कृष्ण हरे हरे\nहरे राम हरे राम\nराम राम हरे हरे",
        romanized: "Hare Krishna Maha Mantra",
        desc: "Devotion, joy & liberation",
        color: "#fbbf24",
        glow: "rgba(251,191,36,0.12)",
    },
    {
        id: "gayatri",
        name: "Gayatri",
        text: "ॐ भूर्भुवः स्वः\nतत्सवितुर्वरेण्यं\nभर्गो देवस्य धीमहि\nधियो यो नः प्रचोदयात्",
        romanized: "Gayatri Mantra",
        desc: "Clarity & divine intelligence",
        color: "#f97316",
        glow: "rgba(249,115,22,0.12)",
    },
    {
        id: "mani",
        name: "Om Mani Padme Hum",
        text: "ॐ मणि पद्मे हूँ",
        romanized: "Om Mani Padme Hum",
        desc: "Compassion & awareness",
        color: "#34d399",
        glow: "rgba(52,211,153,0.12)",
    },
    {
        id: "soham",
        name: "So Hum",
        text: "सो ऽहम्",
        romanized: "So Hum",
        desc: "Breath awareness · I am That",
        color: "#60a5fa",
        glow: "rgba(96,165,250,0.12)",
    },
];

/* ─────────────── Sacred Geometry SVG ─────────────── */
function SriYantra({ color, pulse }) {
    return (
        <svg
            viewBox="0 0 200 200"
            width="200"
            height="200"
            style={{
                position: "absolute",
                opacity: pulse ? 0.22 : 0.1,
                transition: "opacity 0.6s var(--ease-premium)",
                pointerEvents: "none",
            }}
        >
            {/* Outer circle */}
            <circle cx="100" cy="100" r="92" fill="none" stroke={color} strokeWidth="0.6" />
            <circle cx="100" cy="100" r="80" fill="none" stroke={color} strokeWidth="0.4" />
            {/* Triangles */}
            {[0, 30, 60, 90, 120, 150].map((rot) => (
                <polygon
                    key={rot}
                    points="100,22 172,150 28,150"
                    fill="none"
                    stroke={color}
                    strokeWidth="0.5"
                    transform={`rotate(${rot} 100 100)`}
                    opacity="0.7"
                />
            ))}
            {/* Inner dot */}
            <circle cx="100" cy="100" r="3" fill={color} opacity="0.9" />
            <circle cx="100" cy="100" r="8" fill="none" stroke={color} strokeWidth="0.5" />
        </svg>
    );
}

/* ─────────────── Bead Ring ─────────────── */
function BeadRing({ beads, total = 108, color }) {
    const cx = 100, cy = 100, r = 82;
    return (
        <svg viewBox="0 0 200 200" style={{ position: "absolute", width: "100%", height: "100%", pointerEvents: "none" }}>
            {Array.from({ length: total }).map((_, i) => {
                const angle = (i / total) * 2 * Math.PI - Math.PI / 2;
                const x = cx + r * Math.cos(angle);
                const y = cy + r * Math.sin(angle);
                const filled = i < beads;
                return (
                    <circle
                        key={i}
                        cx={x}
                        cy={y}
                        r={filled ? 2.8 : 1.2}
                        fill={filled ? color : "rgba(255,255,255,0.06)"}
                        style={{
                            transition: "fill 0.25s var(--ease-premium), r 0.25s var(--ease-premium)",
                            filter: filled ? `drop-shadow(0 0 4px ${color}80)` : "none",
                        }}
                    />
                );
            })}
        </svg>
    );
}

/* ─────────────── Ripple ─────────────── */
function Ripple({ color, trigger }) {
    const [rings, setRings] = useState([]);
    const idRef = useRef(0);

    useEffect(() => {
        if (!trigger) return;
        const id = idRef.current++;
        setRings((r) => [...r, id]);
        const t = setTimeout(() => setRings((r) => r.filter((x) => x !== id)), 1000);
        return () => clearTimeout(t);
    }, [trigger]);

    return (
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", borderRadius: "50%" }}>
            {rings.map((id) => (
                <span
                    key={id}
                    style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "50%",
                        border: `1px solid ${color}`,
                        animation: "ripple 1s var(--ease-premium) forwards",
                        opacity: 0.4,
                    }}
                />
            ))}
        </div>
    );
}

/* ─────────────── Main Component ─────────────── */
export default function Wellness() {
    const [beads, setBeads] = useState(0);
    const [malas, setMalas] = useState(0);
    const [mantra, setMantra] = useState(MANTRAS[0]);
    const [tapTrigger, setTapTrigger] = useState(0);
    const [pressed, setPressed] = useState(false);
    const [flash, setFlash] = useState(false);
    const totalBeads = beads + malas * 108;

    const increment = useCallback(() => {
        setTapTrigger((t) => t + 1);
        setPressed(true);
        setTimeout(() => setPressed(false), 150);
        if (beads >= 107) {
            setFlash(true);
            setTimeout(() => setFlash(false), 800);
            setBeads(0);
            setMalas((m) => m + 1);
        } else {
            setBeads((b) => b + 1);
        }
    }, [beads]);

    // Keyboard support
    useEffect(() => {
        const handler = (e) => { if (e.code === "Space" || e.code === "Enter") { e.preventDefault(); increment(); } };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [increment]);

    const reset = () => { setBeads(0); setMalas(0); };
    const pct = Math.round((beads / 108) * 100);
    const { color, glow } = mantra;

    return (
        <div className="bg-spiritual-gradient min-h-screen text-white flex flex-col items-center px-6 pb-20 relative overflow-hidden select-none">
            <style>{`
                @keyframes ripple {
                    from { transform: scale(1); opacity: 0.4; }
                    to   { transform: scale(1.8); opacity: 0; }
                }
                @keyframes floatIn {
                    from { opacity: 0; transform: translateY(30px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .wellness-root { animation: floatIn 1.2s var(--ease-premium) both; }
                
                .orb-btn {
                    width: 260px; height: 260px; border-radius: 50%;
                    border: none; cursor: pointer; outline: none;
                    display: flex; flex-direction: column; align-items: center; justify-content: center;
                    position: relative; background: transparent;
                    transition: transform 0.2s var(--ease-premium);
                    -webkit-tap-highlight-color: transparent;
                }
                .orb-btn:active { transform: scale(0.95); }

                .mantra-pill {
                    border: 1px solid var(--border-medium);
                    cursor: pointer;
                    padding: 10px 24px; border-radius: 999px;
                    font-size: 11px; letter-spacing: 0.15em;
                    text-transform: uppercase;
                    transition: all 0.4s var(--ease-premium);
                    background: rgba(255,255,255,0.02);
                    color: rgba(255,255,255,0.4);
                }
                .mantra-pill:hover { background: rgba(255,255,255,0.05); color: #fff; }
                .mantra-pill.active { border-color: transparent; font-weight: 600; }

                .stat-num { font-size: 2.5rem; font-weight: 200; line-height: 1; font-family: var(--font-serif); }
                .stat-lbl { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--text-dim); margin-top: 6px; }

                .reset-btn {
                    border: 1px solid var(--border-medium);
                    background: transparent; color: var(--text-dim);
                    width: 48px; height: 48px; border-radius: 50%;
                    cursor: pointer; display: flex; align-items: center; justify-content: center;
                    font-size: 18px; transition: all 0.3s var(--ease-premium);
                }
                .reset-btn:hover { background: rgba(255,255,255,0.05); color: #fff; border-color: var(--border-soft); }
            `}</style>

            {/* Ambient glow blob */}
            <div style={{
                position: "fixed", top: "40%", left: "50%", transform: "translateX(-50%)",
                width: 600, height: 600, borderRadius: "50%",
                background: glow, filter: "blur(140px)",
                transition: "background 1s var(--ease-premium)",
                pointerEvents: "none", zIndex: 0,
            }} />

            <div className="wellness-root w-full max-w-lg relative z-10">

                {/* Header */}
                <div className="text-center pt-24 pb-12">
                    <p className="text-[10px] tracking-[0.4em] uppercase text-dim mb-4">
                        Sacred Practice
                    </p>
                    <h1 className="text-7xl md:text-8xl font-light tracking-tight leading-none mb-4">
                        Japa
                    </h1>
                    <p className="text-sm text-dim italic font-light">
                        A sanctuary for inner silence and repetition
                    </p>
                </div>

                {/* Mantra Selector */}
                <div className="flex flex-wrap gap-2 justify-center mb-12">
                    {MANTRAS.map((m) => (
                        <button
                            key={m.id}
                            className={`mantra-pill ${mantra.id === m.id ? "active" : ""}`}
                            onClick={() => { setMantra(m); reset(); }}
                            style={mantra.id === m.id ? { background: m.color, color: "#000" } : {}}
                        >
                            {m.name}
                        </button>
                    ))}
                </div>

                {/* Active Mantra Text */}
                <div key={mantra.id} className="text-center mb-16 min-h-[140px] animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <p className="text-2xl md:text-3xl font-light leading-relaxed mb-4 whitespace-pre-line">
                        {mantra.text}
                    </p>
                    <p className="text-[11px] tracking-widest text-dim uppercase mb-2">
                        {mantra.romanized}
                    </p>
                    <p className="text-sm italic opacity-80" style={{ color }}>
                        {mantra.desc}
                    </p>
                </div>

                {/* ── Orb Counter ── */}
                <div className="flex justify-center mb-12">
                    <div className="relative w-[280px] h-[280px] flex items-center justify-center">

                        {/* Bead ring */}
                        <BeadRing beads={beads} color={color} />

                        {/* Sacred geometry */}
                        <SriYantra color={color} pulse={pressed} />

                        {/* Ripple */}
                        <Ripple color={color} trigger={tapTrigger} />

                        {/* Glass orb background */}
                        <div style={{
                            position: "absolute",
                            width: 210, height: 210, borderRadius: "50%",
                            background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 50%, transparent 100%)`,
                            border: `1px solid rgba(255,255,255,0.1)`,
                            boxShadow: flash ? `0 0 80px 20px ${glow}, inset 0 0 40px rgba(255,255,255,0.05)` : `inset 0 0 40px rgba(255,255,255,0.03)`,
                            transition: "box-shadow 0.5s var(--ease-premium)",
                        }} />

                        {/* Tap button */}
                        <button
                            className="orb-btn"
                            style={{ zIndex: 2 }}
                            onClick={increment}
                            aria-label={`Count bead ${beads + 1} of 108`}
                        >
                            <span className="text-7xl md:text-8xl font-thin tracking-tighter" style={{
                                textShadow: `0 0 40px ${color}50`,
                            }}>
                                {beads}
                            </span>
                            <span className="text-[10px] tracking-[0.4em] text-dim mt-2 font-medium">
                                BEADS
                            </span>
                        </button>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="flex justify-center gap-12 mb-12">
                    <div className="text-center">
                        <div className="stat-num" style={{ color }}>{malas}</div>
                        <div className="stat-lbl">Malas</div>
                    </div>
                    <div className="text-center">
                        <div className="stat-num">{pct}%</div>
                        <div className="stat-lbl">Cycle</div>
                    </div>
                    <div className="text-center">
                        <div className="stat-num">{totalBeads}</div>
                        <div className="stat-lbl">Total</div>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-[1px] bg-white/10 rounded-full mb-10 overflow-hidden">
                    <div style={{
                        height: "100%", width: `${pct}%`,
                        background: `linear-gradient(90deg, ${color}40, ${color})`,
                        transition: "width 0.4s var(--ease-premium)",
                        boxShadow: `0 0 12px ${color}80`,
                    }} />
                </div>

                <div className="flex items-center justify-between px-2">
                    <p className="text-[10px] text-dim tracking-widest uppercase">
                        Tap Orb or Press Space
                    </p>
                    <button className="reset-btn" onClick={reset} title="Reset">
                        ↺
                    </button>
                </div>

            </div>
        </div>
    );
}