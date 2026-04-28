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
                opacity: pulse ? 0.18 : 0.08,
                transition: "opacity 0.6s ease",
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
                        r={filled ? 2.6 : 1.4}
                        fill={filled ? color : "rgba(255,255,255,0.08)"}
                        style={{
                            transition: "fill 0.25s ease, r 0.25s ease",
                            filter: filled ? `drop-shadow(0 0 3px ${color})` : "none",
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
        const t = setTimeout(() => setRings((r) => r.filter((x) => x !== id)), 900);
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
                        border: `1.5px solid ${color}`,
                        animation: "ripple 0.9s cubic-bezier(0.22,1,0.36,1) forwards",
                        opacity: 0.6,
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
        setTimeout(() => setPressed(false), 120);
        if (beads >= 107) {
            setFlash(true);
            setTimeout(() => setFlash(false), 600);
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
        <div style={{
            minHeight: "100vh",
            background: "#060608",
            color: "#fff",
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0 1.5rem 5rem",
            position: "relative",
            overflow: "hidden",
            userSelect: "none",
        }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Cormorant+SC:wght@300;400&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes ripple {
          from { transform: scale(1); opacity: 0.5; }
          to   { transform: scale(1.6); opacity: 0; }
        }
        @keyframes floatIn {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes mantraFade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes completePulse {
          0%   { box-shadow: 0 0 0 0 var(--glow); }
          50%  { box-shadow: 0 0 60px 20px var(--glow); }
          100% { box-shadow: 0 0 0 0 var(--glow); }
        }

        .wellness-root { animation: floatIn 1s cubic-bezier(0.22,1,0.36,1) both; }
        .mantra-text   { animation: mantraFade 0.4s ease both; }

        .orb-btn {
          width: 260px; height: 260px; border-radius: 50%;
          border: none; cursor: pointer; outline: none;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          position: relative; background: transparent;
          transition: transform 0.15s cubic-bezier(0.22,1,0.36,1);
          -webkit-tap-highlight-color: transparent;
        }
        .orb-btn:focus-visible { outline: 2px solid var(--c); outline-offset: 8px; }
        .orb-btn:active { transform: scale(0.96); }

        .mantra-pill {
          border: none; cursor: pointer;
          padding: 8px 20px; border-radius: 999px;
          font-family: 'Cormorant SC', serif;
          font-size: 11px; letter-spacing: 0.18em;
          text-transform: uppercase;
          transition: all 0.3s ease;
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.3);
        }
        .mantra-pill:hover { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.7); }
        .mantra-pill.active { color: #000; }

        .stat-box { text-align: center; }
        .stat-num { font-size: 2rem; font-weight: 300; line-height: 1; }
        .stat-lbl { font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-top: 4px; font-family: 'Cormorant SC', serif; }

        .reset-btn {
          border: 1px solid rgba(255,255,255,0.1);
          background: transparent; color: rgba(255,255,255,0.4);
          width: 44px; height: 44px; border-radius: 50%;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          font-size: 16px; transition: all 0.25s ease;
        }
        .reset-btn:hover { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.8); border-color: rgba(255,255,255,0.25); }

        .noise {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.025; mix-blend-mode: overlay;
        }
      `}</style>

            {/* Noise overlay */}
            <div className="noise" />

            {/* Ambient glow blob */}
            <div style={{
                position: "fixed", top: "30%", left: "50%", transform: "translateX(-50%)",
                width: 500, height: 500, borderRadius: "50%",
                background: glow, filter: "blur(120px)",
                transition: "background 0.8s ease",
                pointerEvents: "none", zIndex: 0,
            }} />

            <div className="wellness-root" style={{ width: "100%", maxWidth: 480, position: "relative", zIndex: 1 }}>

                {/* Header */}
                <div style={{ textAlign: "center", paddingTop: "4rem", paddingBottom: "3rem" }}>
                    <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", fontFamily: "'Cormorant SC', serif", marginBottom: 16 }}>
                        Daily Practice
                    </p>
                    <h1 style={{ fontSize: "clamp(3rem,10vw,5.5rem)", fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1, color: "#fff" }}>
                        Japa
                    </h1>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.25)", marginTop: 10, fontStyle: "italic", fontWeight: 300 }}>
                        A quiet space for sacred repetition
                    </p>
                </div>

                {/* Mantra Selector */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 40 }}>
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
                <div key={mantra.id} className="mantra-text" style={{ textAlign: "center", marginBottom: 48, minHeight: 120 }}>
                    <p style={{
                        fontSize: "clamp(1.4rem,5vw,2rem)", fontWeight: 300, lineHeight: 1.7,
                        color: "#fff", whiteSpace: "pre-line",
                    }}>
                        {mantra.text}
                    </p>
                    <p style={{ fontSize: 11, letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)", marginTop: 10, fontFamily: "'Cormorant SC', serif" }}>
                        {mantra.romanized}
                    </p>
                    <p style={{ fontSize: 12, color: color, marginTop: 6, fontStyle: "italic", opacity: 0.8 }}>
                        {mantra.desc}
                    </p>
                </div>

                {/* ── Orb Counter ── */}
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 36 }}>
                    <div style={{ position: "relative", width: 260, height: 260, display: "flex", alignItems: "center", justifyContent: "center" }}>

                        {/* Bead ring */}
                        <BeadRing beads={beads} color={color} />

                        {/* Sacred geometry */}
                        <SriYantra color={color} pulse={pressed} />

                        {/* Ripple */}
                        <Ripple color={color} trigger={tapTrigger} />

                        {/* Glass orb background */}
                        <div style={{
                            position: "absolute",
                            width: 200, height: 200, borderRadius: "50%",
                            background: `radial-gradient(circle at 38% 35%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 60%, transparent 100%)`,
                            border: `1px solid rgba(255,255,255,0.07)`,
                            boxShadow: flash ? `0 0 60px 20px ${glow}, inset 0 0 30px rgba(255,255,255,0.03)` : `inset 0 0 30px rgba(255,255,255,0.02)`,
                            transition: "box-shadow 0.4s ease",
                            "--glow": glow,
                        }} />

                        {/* Tap button */}
                        <button
                            className="orb-btn"
                            style={{ "--c": color, zIndex: 2 }}
                            onClick={increment}
                            aria-label={`Count bead ${beads + 1} of 108`}
                        >
                            <span style={{
                                fontSize: "4.5rem", fontWeight: 300, lineHeight: 1,
                                color: "#fff", letterSpacing: "-0.03em",
                                textShadow: `0 0 30px ${color}40`,
                                transition: "color 0.3s",
                            }}>
                                {beads}
                            </span>
                            <span style={{ fontSize: 9, letterSpacing: "0.35em", color: "rgba(255,255,255,0.2)", marginTop: 6, fontFamily: "'Cormorant SC', serif" }}>
                                BEADS
                            </span>
                        </button>
                    </div>
                </div>

                {/* Stats Row */}
                <div style={{ display: "flex", justifyContent: "center", gap: 48, marginBottom: 40 }}>
                    <div className="stat-box">
                        <div className="stat-num" style={{ color }}>{malas}</div>
                        <div className="stat-lbl">Malas</div>
                    </div>
                    <div className="stat-box">
                        <div className="stat-num">{pct}%</div>
                        <div className="stat-lbl">This Mala</div>
                    </div>
                    <div className="stat-box">
                        <div className="stat-num">{totalBeads}</div>
                        <div className="stat-lbl">Total</div>
                    </div>
                </div>

                {/* Progress bar */}
                <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.06)", borderRadius: 1, marginBottom: 32, overflow: "hidden" }}>
                    <div style={{
                        height: "100%", width: `${pct}%`,
                        background: `linear-gradient(90deg, ${color}80, ${color})`,
                        borderRadius: 1,
                        transition: "width 0.3s cubic-bezier(0.22,1,0.36,1)",
                        boxShadow: `0 0 8px ${color}`,
                    }} />
                </div>

                {/* Hint + Reset */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 4px" }}>
                    <p style={{ fontSize: 10, color: "rgba(255,255,255,0.15)", letterSpacing: "0.15em", fontFamily: "'Cormorant SC', serif" }}>
                        TAP ORB OR PRESS SPACE
                    </p>
                    <button className="reset-btn" onClick={reset} title="Reset">
                        ↺
                    </button>
                </div>

            </div>
        </div>
    );
}