import React, { useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";

/* ------------------ Apple Smooth Animation ------------------ */
const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

/* ------------------ Mantras ------------------ */
const MANTRAS = [
    {
        id: "Inner stillness",
        name: "Om Namah Shivaya",
        text: "Om Namah Shivaya",
        desc: "A connection to stillness.",
    },
    {
        id: "Devotion",
        name: "Maha Mantra",
        text: "Hare Krishna Hare Krishna Krishna Krishna Hare Hare Hare Rama Hare Rama Rama Rama Hare Hare",
        desc: "A celebration of presence.",
    },
    {
        id: "Clarity",
        name: "Gayatri",
        text: "Om Bhur Bhuvah Swaha Tat Savitur Varenyam Bhargo Devasya Dheemahi Dhiyo Yo Nah Prachodayat",
        desc: "A prayer for light.",
    },
];

export default function Wellness() {
    const [beads, setBeads] = useState(0);
    const [malas, setMalas] = useState(0);
    const [mantra, setMantra] = useState(MANTRAS[0]);

    const increment = () => {
        if (beads >= 107) {
            setBeads(0);
            setMalas((m) => m + 1);
        } else {
            setBeads((b) => b + 1);
        }
    };

    const reset = () => {
        setBeads(0);
        setMalas(0);
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white px-8 md:px-24 pt-48 pb-24 relative overflow-hidden">
            <div className="max-w-4xl relative z-10">

                {/* ---------------- HEADER ---------------- */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2 }}
                    className="mb-32"
                >
                    <h1 className="text-6xl md:text-8xl font-serif font-light tracking-tight text-white mb-6">
                        Practice
                    </h1>
                    <p className="text-white/30 text-base max-w-sm font-light tracking-tight">
                        Daily tools that build consistency without pressure.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-24">
                    {/* Left: Mantra Selection (4 columns) */}
                    <div className="md:col-span-4 space-y-4">
                        <p className="text-[10px] uppercase tracking-[0.4em] text-white/20 mb-8">Focus</p>
                        {MANTRAS.map((m) => (
                            <button
                                key={m.id}
                                onClick={() => setMantra(m)}
                                className={`w-full text-left py-4 border-b transition-colors duration-500 ${
                                    mantra.id === m.id
                                        ? 'border-[#D4AF37] text-white'
                                        : 'border-white/5 text-white/20 hover:text-white/40'
                                }`}
                            >
                                <span className="text-xs font-medium tracking-widest uppercase">{m.id}</span>
                            </button>
                        ))}
                    </div>

                    {/* Right: Counter (8 columns) */}
                    <div className="md:col-span-8 md:pl-24">
                        <motion.div
                            key={mantra.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            className="mb-16"
                        >
                            <h2 className="text-3xl md:text-4xl font-serif font-light leading-relaxed text-white/90 mb-6">
                                {mantra.text}
                            </h2>
                            <p className="text-white/20 text-sm font-light">{mantra.desc}</p>
                        </motion.div>

                        <div className="flex flex-col items-start gap-12">
                            <button
                                onClick={increment}
                                className="w-48 h-48 rounded-full border border-white/5 flex flex-col items-center justify-center hover:bg-white/[0.02] active:scale-95 transition-all duration-700"
                            >
                                <span className="text-6xl font-light tracking-tighter text-white">{beads}</span>
                                <span className="text-[10px] text-white/10 mt-2 uppercase tracking-[0.4em]">beads</span>
                            </button>

                            <div className="flex gap-20">
                                <div className="text-left">
                                    <p className="text-3xl font-serif font-light">{malas}</p>
                                    <p className="text-[10px] uppercase tracking-widest text-white/20">sessions</p>
                                </div>
                                <div className="text-left">
                                    <p className="text-3xl font-serif font-light">
                                        {Math.floor((beads / 108) * 100)}%
                                    </p>
                                    <p className="text-[10px] uppercase tracking-widest text-white/20">completion</p>
                                </div>
                                <button
                                    onClick={reset}
                                    className="ml-auto self-end text-white/20 hover:text-white transition-colors"
                                >
                                    <RotateCcw size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}