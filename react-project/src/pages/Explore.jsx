import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, ExternalLink, MapPin, Filter, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { exploreData } from '../data/exploreData';
import SEO from '../components/ui/SEO';

const CATEGORIES = ['all', 'festivals', 'arts', 'temples', 'languages', 'food'];

const ExploreCard = ({ item, index }) => {
    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.6, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
            className="spiritual-card p-0 group relative overflow-hidden flex flex-col h-[500px] cursor-pointer"
        >
            {/* Image */}
            <div className="relative h-60 overflow-hidden flex-shrink-0">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1545224144-2d42c4e97ade?auto=format&fit=crop&q=80&w=800'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-olive-dark via-transparent to-transparent" />

                {/* Category pill */}
                <div className="absolute top-5 left-5">
                    <span className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] bg-brand-gold text-brand-olive-dark shadow-gold-glow">
                        {item.category}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow p-8 space-y-4 relative z-10">
                <div>
                    <h3 className="text-2xl font-serif font-bold uppercase tracking-tight text-brand-gold group-hover:drop-shadow-gold-glow transition-all duration-300">
                        {item.title}
                    </h3>
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold/40 mt-1">{item.subtitle}</p>
                </div>

                <p className="text-brand-ivory/60 text-sm leading-relaxed font-body flex-grow line-clamp-3">{item.description}</p>

                <div className="flex items-center justify-between pt-5 border-t border-brand-gold/10">
                    <div className="flex items-center gap-2 text-brand-ivory/30 text-[10px] font-bold uppercase tracking-widest">
                        <MapPin size={12} className="text-brand-gold/40" />
                        {item.origin}
                    </div>
                    <a
                        href={item.wikiUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-gold/40 hover:text-brand-gold transition-colors"
                        onClick={e => e.stopPropagation()}
                    >
                        Learn More <ExternalLink size={12} />
                    </a>
                </div>
            </div>
        </motion.article>
    );
};

const Explore = () => {
    const [search, setSearch]       = useState('');
    const [category, setCategory]   = useState('all');

    const filtered = exploreData.filter(item => {
        const matchCat  = category === 'all' || item.category === category;
        const matchText = !search ||
            item.title?.toLowerCase().includes(search.toLowerCase()) ||
            item.description?.toLowerCase().includes(search.toLowerCase()) ||
            item.origin?.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchText;
    });

    return (
        <div className="min-h-screen bg-spiritual-gradient text-brand-ivory font-body overflow-x-hidden selection:bg-brand-gold/30 selection:text-white relative">
            <SEO title="Explore Heritage | Inner Root" description="Discover India's vibrant festivals, art forms, and sacred wonders through a tech-spiritual lens." />

            {/* ── HERO ── */}
            <section className="relative pt-40 pb-20 px-8 z-10">
                <div className="max-w-7xl mx-auto">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="flex items-center gap-4 mb-8">
                        <span className="w-12 h-[1px] bg-brand-gold/30" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold/60">Discovery Protocols Active</span>
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} 
                        className="text-7xl md:text-9xl font-serif font-bold tracking-tight uppercase leading-none mb-12"
                    >
                        EXPLORE <br />
                        <span className="text-brand-gold drop-shadow-[0_0_20px_rgba(212,175,55,0.2)]">AKASHIC</span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-xl text-brand-ivory/70 max-w-3xl font-light leading-relaxed">
                        Access 5,000 years of distilled Vedic records. From temple architectures to sacred linguistic waves, every node is verified by spirit and intelligence.
                    </motion.p>
                </div>
            </section>

            {/* ── STICKY SEARCH & FILTER ── */}
            <div className="sticky top-20 z-40 px-8 py-4">
                <div className="max-w-7xl mx-auto spiritual-card p-6 flex flex-col md:flex-row gap-8 shadow-2xl bg-brand-olive-dark/60 backdrop-blur-3xl border-brand-gold/10">
                    <div className="relative flex-grow">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-gold/30" size={20} />
                        <input 
                            type="text"
                            placeholder="Search the collective memory..."
                            className="w-full bg-brand-olive-dark/40 border border-brand-gold/20 rounded-2xl py-4 pl-14 pr-4 outline-none focus:border-brand-gold/50 transition-all text-brand-ivory placeholder:text-brand-ivory/20 font-body"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={`px-8 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap border ${
                                    category === cat 
                                        ? 'bg-brand-gold text-brand-olive-dark border-brand-gold shadow-gold-glow' 
                                        : 'bg-brand-olive-dark/40 text-brand-ivory/50 hover:text-brand-gold border-brand-gold/10 hover:border-brand-gold/30'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── GRID ── */}
            <section className="relative z-10 px-8 py-24">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-14 flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-brand-gold/40">
                            {filtered.length} Nodes Identified
                        </span>
                        <div className="h-[1px] flex-grow mx-8 bg-brand-gold/5" />
                        <div className="flex items-center gap-2 text-brand-gold/30">
                            <Filter size={14} />
                            <span className="text-[9px] font-bold uppercase">Active Filter</span>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {filtered.length > 0 ? (
                            <motion.div
                                key={`${category}-${search}`}
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
                            >
                                {filtered.map((item, i) => (
                                    <ExploreCard key={item.id} item={item} index={i} />
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center py-48 text-center">
                                <div className="w-24 h-24 rounded-full border border-brand-gold/10 flex items-center justify-center mb-10 animate-breathe bg-brand-gold/5">
                                    <Search size={32} className="text-brand-gold/20" />
                                </div>
                                <h3 className="text-3xl font-serif font-bold uppercase text-brand-gold/40 mb-4">No Resonance</h3>
                                <p className="text-brand-ivory/30 text-base max-w-sm mb-12">The digital akashic archives have no record matching your current query.</p>
                                <button onClick={() => { setSearch(''); setCategory('all'); }} className="btn-secondary px-10">Reset Protocol</button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
        </div>
    );
};

export default Explore;
