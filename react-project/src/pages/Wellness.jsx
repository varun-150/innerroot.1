import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Activity, History, BookOpen, Sparkles,
    Wind, Waves, Mountain, Save, RotateCcw, Plus,
    ArrowLeft, Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { japaAPI } from '../services/api';
import SEO from '../components/ui/SEO';

const Wellness = () => {
    const [beads, setBeads] = useState(0);
    const [malas, setMalas] = useState(0);
    const [mantra, setMantra] = useState('Om Namah Shivaya');
    const [journal, setJournal] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleIncrement = () => {
        if (beads >= 107) {
            setBeads(0);
            setMalas(prev => prev + 1);
        } else {
            setBeads(prev => prev + 1);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await japaAPI.save({ beadsCount: beads, totalMalas: malas, mantra });
            setTimeout(() => {
                setIsSaving(false);
                setBeads(0);
                setMalas(0);
            }, 1000);
        } catch (e) {
            setIsSaving(false);
            console.error(e);
        }
    };

    return (
        <div className="min-h-screen bg-spiritual-gradient text-brand-ivory font-body overflow-x-hidden selection:bg-brand-gold/30 relative">
            <SEO title="Wellness Sanctuary | Inner Root" />

            {/* ── HEADER ── */}
            <header className="relative z-10 px-8 py-10 flex items-center justify-between border-b border-brand-gold/10 backdrop-blur-md">
                <Link to="/" className="flex items-center gap-2 text-brand-ivory/50 hover:text-brand-gold transition-colors font-bold uppercase tracking-widest text-[10px]">
                    <ArrowLeft size={18} /> Return to Nexus
                </Link>
                <div className="text-center">
                    <h1 className="text-3xl font-serif font-bold uppercase tracking-tight text-brand-gold">Wellness Sanctuary</h1>
                    <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-brand-gold/50 mt-1">Protocol: Harmonic Sync</p>
                </div>
                <div className="flex items-center gap-6">
                    <Settings size={22} className="text-brand-ivory/40 hover:text-brand-gold animate-spin-slow cursor-pointer" />
                </div>
            </header>

            <main className="relative z-10 max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* ── 🧘 MAIN JAPA PULSE ── */}
                <div className="lg:col-span-8 flex flex-col gap-10">
                    <section className="spiritual-card p-16 flex flex-col items-center justify-center text-center relative overflow-hidden h-[650px]">
                        <div className="absolute inset-0 bg-brand-gold/5 opacity-20 pointer-events-none" />
                        
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 mb-20">
                            <span className="text-[11px] font-bold uppercase tracking-[0.6em] text-brand-gold/40">Active Mantra</span>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-gold drop-shadow-gold-glow">{mantra}</h2>
                        </motion.div>

                        {/* The Pulse Button */}
                        <motion.button
                            onClick={handleIncrement}
                            whileTap={{ scale: 0.95 }}
                            className="relative w-80 h-80 rounded-full flex flex-col items-center justify-center group cursor-pointer border border-brand-gold/20 bg-white/5 backdrop-blur-xl hover:border-brand-gold transition-all duration-500 shadow-2xl"
                        >
                            <div className="absolute inset-0 rounded-full bg-brand-gold/10 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity animate-pulse-glow" />
                            <span className="text-9xl font-serif font-bold text-brand-gold group-hover:scale-110 transition-transform duration-500">{beads}</span>
                            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-brand-gold/30 group-hover:text-brand-gold/60 mt-4">Beads</span>
                        </motion.button>

                        <div className="mt-20 grid grid-cols-2 gap-24">
                            <div className="text-center">
                                <span className="block text-4xl font-serif font-bold text-brand-gold">{malas}</span>
                                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-ivory/40 mt-2">Total Malas</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-4xl font-serif font-bold text-brand-gold">{((beads/108)*100).toFixed(0)}%</span>
                                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-ivory/40 mt-2">Alignment</span>
                            </div>
                        </div>
                    </section>

                    <div className="flex items-center gap-6">
                        <button onClick={handleSave} disabled={isSaving} className="flex-1 btn-primary py-5 uppercase tracking-widest text-sm">
                            {isSaving ? 'Synchronizing Intelligence...' : 'Commit Session to Roots'}
                        </button>
                        <button onClick={() => {setBeads(0); setMalas(0);}} className="p-5 spiritual-card rounded-full hover:bg-brand-gold/10 text-brand-ivory/40 hover:text-brand-gold">
                            <RotateCcw size={24} />
                        </button>
                    </div>
                </div>

                {/* ── 📓 SIDEBAR ── */}
                <aside className="lg:col-span-4 flex flex-col gap-10">
                    <section className="spiritual-card p-10 space-y-10">
                        <h3 className="text-sm font-bold uppercase tracking-[0.4em] text-brand-gold flex items-center gap-3">
                            <History size={18} /> Heritage Logs
                        </h3>
                        <div className="space-y-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="p-6 rounded-2xl bg-brand-olive-dark/50 flex items-center justify-between border border-brand-gold/10 hover:border-brand-gold/30 transition-colors cursor-default">
                                    <div className="space-y-1">
                                        <p className="text-[11px] font-bold uppercase text-brand-gold">Mantra Cycle #{i}09</p>
                                        <p className="text-[9px] text-brand-ivory/30">18 APR 2026, 11:22 PM</p>
                                    </div>
                                    <span className="text-xs font-bold text-brand-gold/80">108 Recits</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="spiritual-card p-10 space-y-8 flex-grow">
                        <h3 className="text-sm font-bold uppercase tracking-[0.4em] text-brand-gold flex items-center gap-3">
                            <BookOpen size={18} /> Neural Journal
                        </h3>
                        <textarea 
                            value={journal} 
                            onChange={(e) => setJournal(e.target.value)} 
                            placeholder="Digitize your spiritual insights..."
                            className="w-full h-80 bg-brand-olive-dark/30 border border-brand-gold/10 rounded-2xl p-8 text-sm focus:outline-none focus:border-brand-gold/40 transition-all font-body text-brand-ivory placeholder:text-brand-ivory/20 resize-none"
                        />
                        <button className="w-full py-4 spiritual-card border-brand-gold/20 text-[11px] font-bold uppercase tracking-widest hover:bg-brand-gold/20 text-brand-gold">
                            Archive to Vault
                        </button>
                    </section>
                </aside>
            </main>
        </div>
    );
};

export default Wellness;
