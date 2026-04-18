import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Activity, Heart, Bell, Settings, 
    ArrowLeft, History, BookOpen, Sparkles,
    Wind, Waves, Mountain, Save, RotateCcw, Plus
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
            // Simulate success feedback
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
        <div className="bg-gradient-primary min-h-screen text-muted-gray font-body overflow-hidden selection:bg-gold-500/30 selection:text-white relative">
            <SEO title="Wellness Sanctuary | Inner Root" />

            {/* ── 🌌 IMMERSIVE BACKGROUND ── */}
            <div className="fixed inset-0 z-0 bg-gradient-primary">
                {/* Champagne Gold orb — left */}
                <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-5 blur-[150px] bg-gold-500 animate-float orb" />
                {/* Champagne Gold orb — right */}
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-5 blur-[150px] bg-gold-400 animate-breathe orb" />
                {/* Subdued Gold accent orb — center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full opacity-[0.03] bg-gold-300 blur-[120px] orb" />
            </div>

            {/* ── HEADER ── */}
            <header className="relative z-10 px-8 py-10 flex items-center justify-between border-b border-gold-500/10">
                <Link to="/" className="flex items-center gap-3 group text-white/40 hover:text-white transition-colors">
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Return to Nexus</span>
                </Link>
                <div className="text-center">
                    <h1 className="text-2xl font-display font-black uppercase tracking-tighter text-gold-500">Wellness Sanctuary</h1>
                    <p className="text-[8px] font-black uppercase tracking-[0.5em] text-gold-400 mt-1">Status: Harmonic</p>
                </div>
                <div className="flex items-center gap-6">
                    <Settings size={20} className="text-muted-gray hover:text-gold-500 animate-spin-slow cursor-pointer" />
                </div>
            </header>

            <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
                
                {/* ── 🧘 MAIN JAPA PULSE (Center) ── */}
                <div className="lg:col-span-8 flex flex-col gap-10">
                    <section className="card-luxury p-16 flex flex-col items-center justify-center text-center relative overflow-hidden h-[600px]">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                        
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="space-y-4 mb-16"
                        >
                            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-muted-gray/40">Current Protocol</span>
                            <h2 className="text-4xl font-display font-black uppercase text-gold-500">{mantra}</h2>
                        </motion.div>

                        {/* The Pulse Button */}
                        <motion.button
                            onClick={handleIncrement}
                            whileTap={{ scale: 0.92 }}
                            className="relative w-72 h-72 rounded-full glass-pane flex flex-col items-center justify-center group cursor-pointer border-2 border-gold-500/10 hover:border-gold-500 transition-all duration-700 shadow-2xl animate-breathe"
                        >
                            <div className="absolute inset-0 rounded-full bg-gradient-luminous opacity-0 group-hover:opacity-10 blur-2xl transition-opacity" />
                            <span className="text-8xl font-display font-black text-gold-500 group-hover:scale-110 transition-transform duration-700">{beads}</span>
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gold-500/40 group-hover:text-gold-500 mt-4">Beads In Cycle</span>
                        </motion.button>

                        <div className="mt-16 grid grid-cols-2 gap-20">
                            <div className="text-center">
                                <span className="block text-4xl font-display font-black text-gold-500">{malas}</span>
                                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-muted-gray mt-2">Total Malas</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-4xl font-display font-black text-gold-500">{((beads/108)*100).toFixed(0)}%</span>
                                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-muted-gray mt-2">Alignment</span>
                            </div>
                        </div>
                    </section>

                    <div className="flex items-center gap-6">
                        <button 
                            onClick={handleSave}
                            disabled={isSaving}
                            className="flex-1 btn-primary"
                        >
                            {isSaving ? 'Synchronizing...' : 'Commit Session'}
                        </button>
                        <button 
                            onClick={() => {setBeads(0); setMalas(0);}}
                            className="p-6 glass-pane rounded-full hover:bg-white/5 transition-all text-white/40 hover:text-white"
                        >
                            <RotateCcw size={20} />
                        </button>
                    </div>
                </div>

                {/* ── 📓 SIDEBAR (Metadata & Journal) ── */}
                <aside className="lg:col-span-4 flex flex-col gap-10">
                    <section className="card-luxury p-10 space-y-10">
                        <h3 className="text-xs font-black uppercase tracking-[0.4em] text-gold-400 flex items-center gap-2">
                            <History size={14} /> Session History
                        </h3>
                        <div className="space-y-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="p-6 rounded-2xl bg-black/20 flex items-center justify-between border border-gold-500/10">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase text-gold-500">Veda Protocol #{i}49</p>
                                        <p className="text-[8px] text-muted-gray/40">Yesterday, 10:45 PM</p>
                                    </div>
                                    <span className="text-xs font-black text-gold-500">108 Recits</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="card-luxury p-10 space-y-8 flex-grow">
                        <h3 className="text-xs font-black uppercase tracking-[0.4em] text-gold-400 flex items-center gap-2">
                            <BookOpen size={14} /> Neural Interface
                        </h3>
                        <textarea 
                            value={journal} 
                            onChange={(e) => setJournal(e.target.value)} 
                            placeholder="Transcribe spiritual reflections..."
                            className="w-full h-80 bg-midnight-950/40 border border-gold-500/10 rounded-3xl p-8 text-sm focus:outline-none focus:border-gold-500/30 transition-all font-body text-gold-100 placeholder:text-muted-gray/20 resize-none"
                        />
                        <button className="w-full p-6 bg-midnight-950/40 border border-gold-500/10 rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-gold-500/10 transition-all text-gold-500">
                            Archive Reflection
                        </button>
                    </section>
                </aside>
            </main>
        </div>
    );
};

export default Wellness;
