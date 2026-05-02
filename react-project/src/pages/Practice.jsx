import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RotateCcw, ShieldCheck, Volume2, Book, Search, Bookmark, ChevronRight, Play, Pause } from "lucide-react";
import SEO from "../components/ui/SEO";

const PREMIUM_EASING = [0.22, 1, 0.36, 1];

/* ─────────────── DATA: MANTRAS ─────────────── */
const MANTRAS = {
    peace: [
        { id: "shanti", name: "Shanti Mantra", text: "ॐ पूर्णमदः पूर्णमिदं पूर्णात्पूर्णमुदच्यते", romanized: "Om Purnamadah Purnamidam", meaning: "From fullness comes fullness. Fullness remains.", color: "#D4AF37" },
        { id: "om", name: "Pranava Om", text: "ॐ", romanized: "Om / AUM", meaning: "The primordial sound of the universe.", color: "#D4AF37" }
    ],
    focus: [
        { id: "gayatri", name: "Gayatri Mantra", text: "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं", romanized: "Om Bhur Bhuvah Svah", meaning: "May the divine light illuminate our intellect.", color: "#D4AF37" },
        { id: "sohum", name: "So Hum", text: "सो ऽहम्", romanized: "So Hum", meaning: "I am That. Breath-focused awareness.", color: "#D4AF37" }
    ],
    devotion: [
        { id: "shiva", name: "Shiva Panchakshara", text: "ॐ नमः शिवाय", romanized: "Om Namah Shivaya", meaning: "Adoration to the auspicious one.", color: "#D4AF37" },
        { id: "hare", name: "Maha Mantra", text: "हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे", romanized: "Hare Krishna Maha Mantra", meaning: "Connecting with the supreme consciousness.", color: "#D4AF37" }
    ],
    energy: [
        { id: "durga", name: "Durga Mantra", text: "ॐ दुं दुर्गायै नमः", romanized: "Om Dum Durgayei Namaha", meaning: "Salutations to the feminine creative power.", color: "#D4AF37" }
    ]
};

/* ─────────────── DATA: SCRIPTURES ─────────────── */
const SCRIPTURES = [
    { 
        id: 'vedas', 
        name: 'The Vedas', 
        desc: 'The oldest sacred texts of India.',
        books: [
            { title: 'Rig Veda', content: 'In the beginning was the Word, and the Word was with God...' },
            { title: 'Yajur Veda', content: 'The knowledge of sacrificial rituals and mantras...' },
            { title: 'Sama Veda', content: 'The Veda of melodies and chants...' },
            { title: 'Atharva Veda', content: 'The procedures for everyday life...' }
        ]
    },
    { 
        id: 'upanishads', 
        name: 'The Upanishads', 
        desc: 'Philosophical core of Indian wisdom.',
        books: [
            { title: 'Isha Upanishad', content: 'Everything in this universe is enveloped by God...' },
            { title: 'Kena Upanishad', content: 'By whom directed does the mind light on its objects?...' },
            { title: 'Katha Upanishad', content: 'The conversation between Nachiketa and Yama...' }
        ]
    }
];

/* ─────────────── COMPONENTS ─────────────── */

const Ripple = ({ onComplete }) => (
    <motion.div
        initial={{ scale: 0, opacity: 0.5 }}
        animate={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.6, ease: "ease-out" }}
        onAnimationComplete={onComplete}
        className="absolute inset-0 rounded-full border border-[#D4AF37]/40 pointer-events-none"
    />
);

const JapaCounter = () => {
    const [beads, setBeads] = useState(0);
    const [malas, setMalas] = useState(0);
    const [ripples, setRipples] = useState([]);
    const [isComplete, setIsComplete] = useState(false);

    const increment = useCallback(() => {
        const id = Date.now();
        setRipples(prev => [...prev, id]);
        
        if (beads >= 107) {
            setIsComplete(true);
            setTimeout(() => setIsComplete(false), 2000);
            setBeads(0);
            setMalas(m => m + 1);
        } else {
            setBeads(b => b + 1);
        }
    }, [beads]);

    return (
        <div className="relative flex flex-col items-center">
            <div className="relative w-80 h-80 flex items-center justify-center mb-12">
                <motion.button
                    whileTap={{ scale: 1.08 }}
                    onClick={increment}
                    className="relative w-64 h-64 rounded-full flex flex-col items-center justify-center transition-all duration-1000 overflow-hidden"
                    style={{
                        background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.05), transparent)`,
                        border: `1px solid rgba(212,175,55,0.1)`,
                        boxShadow: isComplete ? `0 0 100px rgba(212,175,55,0.4)` : `inset 0 0 40px rgba(255,255,255,0.02)`
                    }}
                >
                    <AnimatePresence>
                        {ripples.map(id => (
                            <Ripple key={id} onComplete={() => setRipples(prev => prev.filter(r => r !== id))} />
                        ))}
                    </AnimatePresence>

                    <motion.div
                        animate={{ 
                            boxShadow: ["0 0 20px rgba(212,175,55,0.05)", "0 0 40px rgba(212,175,55,0.15)", "0 0 20px rgba(212,175,55,0.05)"] 
                        }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                        className="absolute inset-0 rounded-full"
                    />

                    <span className="text-8xl font-serif font-light text-white/90 relative z-10">{beads}</span>
                    <span className="text-[10px] uppercase tracking-[0.6em] text-white/20 mt-2 relative z-10">Beads</span>
                </motion.button>
            </div>
            
            <div className="flex gap-20">
                <div className="text-center">
                    <div className="text-4xl font-serif text-white/80">{malas}</div>
                    <div className="text-[9px] uppercase tracking-[0.4em] text-white/20 mt-2">Malas</div>
                </div>
                <div className="text-center">
                    <div className="text-4xl font-serif text-white/80">{Math.round((beads/108)*100)}%</div>
                    <div className="text-[9px] uppercase tracking-[0.4em] text-white/20 mt-2">Cycle</div>
                </div>
            </div>
        </div>
    );
};

const ScriptureReader = ({ book, onClose }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.28, ease: PREMIUM_EASING }}
        className="fixed inset-0 z-50 bg-[#0B0E14] flex flex-col items-center p-8 md:p-24 overflow-y-auto no-scrollbar scroll-smooth"
    >
        <div className="w-full max-w-3xl space-y-24">
            <header className="flex items-center justify-between">
                <button onClick={onClose} className="text-white/20 hover:text-white transition-colors flex items-center gap-2 text-[10px] uppercase tracking-[0.4em]">
                    <ChevronRight className="rotate-180" size={16} /> Back
                </button>
                <div className="flex gap-4">
                    <button className="p-3 rounded-full bg-white/5 text-white/40 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-all"><Bookmark size={18} /></button>
                </div>
            </header>

            <motion.article 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="space-y-12"
            >
                <h1 className="text-6xl md:text-8xl font-serif font-light tracking-tighter leading-none">{book.title}</h1>
                <div className="w-12 h-[1px] bg-[#D4AF37]/40" />
                <p className="text-2xl md:text-3xl font-serif font-light leading-relaxed text-white/60 selection:bg-[#D4AF37]/20">
                    {book.content}
                </p>
                <div className="pt-24 opacity-10 text-[9px] uppercase tracking-[1em] text-center">End of Insight</div>
            </motion.article>
        </div>
    </motion.div>
);

const Practice = () => {
    const [activeTab, setActiveTab] = useState('japa');
    const [selectedBook, setSelectedBook] = useState(null);

    return (
        <div className="min-h-screen bg-[#0B0E14] text-white selection:bg-[#D4AF37]/30 relative overflow-hidden flex flex-col items-center">
            <SEO title="Practice | Inner Root" description="Engage with the ancient rituals. Japa, Mantras, and Scriptures." />
            
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#D4AF37]/5 blur-[180px] rounded-full" />
            </div>

            <motion.main 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 w-full max-w-6xl px-8 flex flex-col items-center pb-32"
            >
                
                {/* Header */}
                <header className="pt-32 pb-20 text-center space-y-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex items-center justify-center gap-4"
                    >
                        <span className="w-12 h-[1px] bg-[#D4AF37]/20" />
                        <span className="text-[10px] uppercase tracking-[0.6em] text-[#D4AF37]">Sacred Engagement</span>
                        <span className="w-12 h-[1px] bg-[#D4AF37]/20" />
                    </motion.div>
                    <h1 className="text-7xl md:text-[9rem] font-serif font-light tracking-tighter leading-none">
                        Practice.
                    </h1>
                </header>

                {/* Sub Navigation */}
                <nav className="flex gap-12 mb-24 border-b border-white/5 w-full justify-center">
                    {['japa', 'mantras', 'scriptures'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-8 text-[11px] uppercase tracking-[0.4em] transition-all relative ${
                                activeTab === tab ? 'text-[#D4AF37]' : 'text-white/20 hover:text-white'
                            }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <motion.div layoutId="tab-underline" transition={{ duration: 0.3, ease: PREMIUM_EASING }} className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37]" />
                            )}
                        </button>
                    ))}
                </nav>

                {/* Content Area */}
                <div className="w-full min-h-[600px] flex flex-col items-center">
                    <AnimatePresence mode="wait">
                        {activeTab === 'japa' && (
                            <motion.div
                                key="japa"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.02 }}
                                transition={{ duration: 0.3, ease: PREMIUM_EASING }}
                                className="w-full"
                            >
                                <JapaCounter />
                            </motion.div>
                        )}

                        {activeTab === 'mantras' && (
                            <motion.div
                                key="mantras"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3, ease: PREMIUM_EASING }}
                                className="w-full grid grid-cols-1 md:grid-cols-2 gap-12"
                            >
                                {Object.entries(MANTRAS).map(([category, list], catIndex) => (
                                    <div key={category} className="space-y-8">
                                        <h3 className="text-[10px] uppercase tracking-[0.6em] text-white/20 border-b border-white/5 pb-4">{category}</h3>
                                        {list.map((mantra, i) => (
                                            <motion.div 
                                                key={mantra.id} 
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: (catIndex * 0.1) + (i * 0.05), duration: 0.28 }}
                                                whileHover={{ scale: 1.01, borderColor: "rgba(212,175,55,0.2)" }}
                                                className="p-10 rounded-[48px] bg-white/[0.02] border border-white/5 transition-all group cursor-pointer"
                                            >
                                                <div className="flex justify-between items-start mb-6">
                                                    <div>
                                                        <h4 className="text-xl font-serif font-light mb-2">{mantra.name}</h4>
                                                        <p className="text-[9px] uppercase tracking-[0.2em] text-[#D4AF37]">{mantra.romanized}</p>
                                                    </div>
                                                    <button className="p-4 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] group-hover:scale-110 transition-transform">
                                                        <Play size={16} fill="currentColor" />
                                                    </button>
                                                </div>
                                                <p className="text-2xl font-serif text-white/80 leading-relaxed mb-6">{mantra.text}</p>
                                                <p className="text-xs text-white/30 italic font-light leading-relaxed">"{mantra.meaning}"</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {activeTab === 'scriptures' && (
                            <motion.div
                                key="scriptures"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.02 }}
                                transition={{ duration: 0.3, ease: PREMIUM_EASING }}
                                className="w-full space-y-24"
                            >
                                {SCRIPTURES.map((category, catIndex) => (
                                    <div key={category.id} className="space-y-12">
                                        <div className="space-y-4">
                                            <h3 className="text-4xl md:text-6xl font-serif font-light tracking-tighter">{category.name}</h3>
                                            <p className="text-sm text-white/30 font-light tracking-widest uppercase">{category.desc}</p>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                            {category.books.map((book, i) => (
                                                <motion.button
                                                    key={book.title}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: (catIndex * 0.1) + (i * 0.05) }}
                                                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => setSelectedBook(book)}
                                                    className="p-12 rounded-[48px] bg-white/[0.02] border border-white/5 transition-all text-left group"
                                                >
                                                    <Book className="text-[#D4AF37] mb-8 group-hover:scale-110 transition-transform" />
                                                    <h4 className="text-2xl font-serif font-light mb-4">{book.title}</h4>
                                                    <div className="flex items-center gap-3 text-white/20 text-[9px] uppercase tracking-[0.4em]">
                                                        Read Scripture <ChevronRight size={14} />
                                                    </div>
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.main>

            <AnimatePresence>
                {selectedBook && (
                    <ScriptureReader book={selectedBook} onClose={() => setSelectedBook(null)} />
                )}
            </AnimatePresence>

            <footer className="relative z-10 py-12 px-8 border-t border-white/5 text-center w-full">
                <p className="text-[9px] uppercase tracking-[0.8em] text-white/10 font-medium">
                    Inner Root Protocol V2.0 — Wisdom is Timeless
                </p>
            </footer>
        </div>
    );
};

export default Practice;
