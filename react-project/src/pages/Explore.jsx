import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, ExternalLink, MapPin, Star, Filter, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { exploreData } from '../data/exploreData';
import SEO from '../components/ui/SEO';
import { useScrollReveal } from '../hooks/useScrollReveal';

const CATEGORIES = ['all', 'festivals', 'arts', 'temples', 'languages', 'food'];

const CATEGORY_GRADIENTS = {
    festivals: 'var(--gradient-luminous)',
    arts:      'var(--gradient-luminous)',
    temples:   'var(--gradient-luminous)',
    languages: 'var(--gradient-luminous)',
    food:      'var(--gradient-luminous)',
    all:       'var(--gradient-luminous)',
};

const ExploreCard = ({ item, index }) => {
    const gradient = CATEGORY_GRADIENTS[item.category] || CATEGORY_GRADIENTS.all;

    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.6, delay: index * 0.04, ease: [0.65, 0, 0.35, 1] }}
            className="card-luxury p-0 group relative overflow-hidden flex flex-col h-[480px] cursor-pointer"
        >
            {/* Image */}
            <div className="relative h-56 overflow-hidden flex-shrink-0">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-110 transition-all duration-700"
                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1545224144-2d42c4e97ade?auto=format&fit=crop&q=80&w=800'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B263B] via-transparent to-transparent" />

                {/* Category pill */}
                <div className="absolute top-5 left-5">
                    <span
                        className="px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.4em] text-white"
                        style={{ background: gradient + 'cc' }}
                    >
                        {item.category}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow p-8 space-y-4">
                <div>
                    <h3 className="text-2xl font-display font-black uppercase tracking-tighter text-gold-500 group-hover:text-gold-hover transition-all duration-500">
                        {item.title}
                    </h3>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gold-400 mt-1">{item.subtitle}</p>
                </div>

                <p className="text-muted-gray text-sm leading-relaxed flex-grow line-clamp-3">{item.description}</p>

                <div className="flex items-center justify-between pt-4 border-t border-gold-500/5">
                    <div className="flex items-center gap-2 text-muted-gray/40 text-[10px] font-black uppercase tracking-wider">
                        <MapPin size={12} className="text-gold-500/30" />
                        {item.origin}
                    </div>
                    <a
                        href={item.wikiUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gold-500/20 hover:text-gold-500 transition-colors"
                        onClick={e => e.stopPropagation()}
                    >
                        Explore <ExternalLink size={12} />
                    </a>
                </div>
            </div>

            {/* Hover glow line */}
            <div
                className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: gradient }}
            />
        </motion.article>
    );
};

const Explore = () => {
    const [search, setSearch]       = useState('');
    const [category, setCategory]   = useState('all');
    const [showSearch, setShowSearch] = useState(false);
    const searchRef = useRef(null);
    useScrollReveal();

    const filtered = exploreData.filter(item => {
        const matchCat  = category === 'all' || item.category === category;
        const matchText = !search ||
            item.title?.toLowerCase().includes(search.toLowerCase()) ||
            item.description?.toLowerCase().includes(search.toLowerCase()) ||
            item.origin?.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchText;
    });

    return (
        <div className="bg-gradient-primary min-h-screen text-gold-500 font-body overflow-x-hidden selection:bg-gold-500/30 selection:text-white relative">
            <SEO title="Explore Heritage | Inner Root" description="Discover India's vibrant festivals, art forms, temples, and cultural wonders." />

            {/* ── Background Orbs ── */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-5 blur-[160px] animate-breathe" style={{ background: 'var(--gold-500)' }} />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-5 blur-[140px] animate-float" style={{ background: 'var(--gold-400)' }} />
            </div>

            {/* ── HERO ── */}
            <section className="relative pt-36 pb-24 px-6 z-10">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
                        className="flex items-center gap-4 mb-6"
                    >
                        <span className="w-10 h-[1px] bg-white/20" />
                        <span className="text-[9px] font-black uppercase tracking-[0.6em] text-white/30">Cultural Discovery Protocol</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
                        className="text-7xl md:text-[9rem] font-display font-black tracking-tighter uppercase leading-[0.85] mb-10"
                    >
                        EXPLORE <br />
                        <span className="text-transparent bg-clip-text bg-gradient-luminous">HERITAGE</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 1 }}
                        className="text-xl text-muted-gray max-w-2xl font-light leading-relaxed"
                    >
                        5,000 years of sacred festivals, ancient art forms, and temple architectures — curated for the modern seeker.
                    </motion.p>
                </div>
            </section>

            {/* ── STICKY FILTER BAR ── */}
            <div className="sticky top-16 z-40 px-6 py-4">
                <div className="max-w-7xl mx-auto bg-midnight-800 border border-gold-500/20 p-6 rounded-3xl flex flex-col md:flex-row gap-6 shadow-2xl backdrop-blur-xl">
                    <div className="relative flex-grow">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-gray/40" size={18} />
                        <input 
                            type="text"
                            placeholder="Search by deity, region, or era..."
                            className="w-full bg-midnight-950/40 border border-gold-500/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-gold-500/30 transition-all text-gold-100 placeholder:text-muted-gray/20 font-body"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                                    category === cat 
                                        ? 'bg-gold-500 text-midnight-950 shadow-glow-accent' 
                                        : 'bg-midnight-950/50 text-muted-gray hover:text-gold-500 border border-gold-500/5'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── MAIN GRID ── */}
            <section className="relative z-10 px-6 py-20">
                <div className="max-w-7xl mx-auto">
                    {/* Result count */}
                    <div className="mb-12 flex items-center gap-4">
                        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/20">
                            {filtered.length} Records Found
                        </span>
                        <div className="flex-1 h-[1px] bg-white/5" />
                    </div>

                    <AnimatePresence mode="wait">
                        {filtered.length > 0 ? (
                            <motion.div
                                key={`${category}-${search}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                            >
                                {filtered.map((item, i) => (
                                    <ExploreCard key={item.id} item={item} index={i} />
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center py-40 text-center"
                            >
                                <div className="w-24 h-24 rounded-full glass-pane flex items-center justify-center mb-8 animate-breathe">
                                    <Search size={32} className="text-white/20" />
                                </div>
                                <h3 className="text-3xl font-display font-black uppercase text-white/20 mb-4">No Records</h3>
                                <p className="text-white/20 text-sm mb-10">The akashic archive has no matches for this query.</p>
                                <button
                                    onClick={() => { setSearch(''); setCategory('all'); }}
                                    className="btn-primary text-xs tracking-[0.4em]"
                                >
                                    Reset Discovery
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
        </div>
    );
};

export default Explore;
