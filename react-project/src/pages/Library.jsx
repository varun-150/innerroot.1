import React, { useState } from 'react';
import {
    Search, Star, ArrowRight, Clock, Eye, Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/ui/SEO';
import { motion } from 'framer-motion';

const categories = ['All', 'Vedas', 'Yoga', 'Meditation', 'History'];

const articles = [
    { 
        id: 'v1',
        title: 'The Four Vedas Guide', 
        category: 'Vedas', 
        readTime: '8 min', 
        stars: 4.8, 
        views: '12k',
        desc: 'Explore the foundations of Hindu philosophy and their modern relevance.',
        image: 'https://images.unsplash.com/photo-1544924222-35a3df55dc46?auto=format&fit=crop&q=80&w=800'
    },
    { 
        id: 'y1',
        title: 'Patanjali Yoga Sutras', 
        category: 'Yoga', 
        readTime: '12 min', 
        stars: 4.9, 
        views: '24k',
        desc: 'Modern interpretation of the backbone of Patanjali yoga practice.',
        image: 'https://images.unsplash.com/photo-1545208393-596371ba1eb1?auto=format&fit=crop&q=80&w=800'
    },
    { 
        id: 'm1',
        title: 'Vipassana Art', 
        category: 'Meditation', 
        readTime: '6 min', 
        stars: 4.7, 
        views: '8k',
        desc: 'Ancient Buddhist technique for insight and mental liberation.',
        image: 'https://images.unsplash.com/photo-1528319725582-ddc0a61afd51?auto=format&fit=crop&q=80&w=800'
    }
];

const Library = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    return (
        <div className="min-h-screen bg-spiritual-gradient text-brand-ivory font-body pb-32 pt-40 px-8 selection:bg-brand-gold/30">
            <SEO title="Ancient Library | Spiritual Chronicles" />

            <div className="max-w-7xl mx-auto">
                <div className="mb-24 relative text-center md:text-left">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4 mb-6">
                        <span className="w-12 h-[1px] bg-brand-gold/30" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold/60">Digital Repository Locked</span>
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                        className="text-7xl md:text-9xl font-serif font-bold uppercase tracking-tight mb-12 text-brand-gold drop-shadow-gold-glow"
                    >
                        Ancient <br /> <span className="text-brand-ivory opacity-20 italic font-light">Chronicles</span>
                    </motion.h1>
                    
                    <div className="spiritual-card p-6 flex flex-col md:flex-row gap-8 shadow-2xl bg-brand-olive-dark/60 backdrop-blur-3xl border-brand-gold/10">
                        <div className="relative flex-grow">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-gold/30" size={20} />
                            <input 
                                type="text"
                                placeholder="Query the akashic memory..."
                                className="w-full bg-brand-olive-dark/40 border border-brand-gold/20 rounded-2xl py-5 pl-14 pr-4 outline-none focus:border-brand-gold/50 transition-all text-brand-ivory placeholder:text-brand-ivory/20 font-body"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-8 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap border ${
                                        activeCategory === cat 
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {articles.map((art, i) => (
                        <motion.div 
                            key={i} 
                            initial={{ opacity: 0, y: 30 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ delay: i * 0.1 }}
                            className="spiritual-card p-0 rounded-[2.5rem] overflow-hidden group hover:border-brand-gold/40 transition-all duration-500 flex flex-col h-full shadow-2xl"
                        >
                            <div className="h-64 relative overflow-hidden">
                                <img 
                                    src={art.image} 
                                    alt={art.title} 
                                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
                                />
                                <div className="absolute top-6 left-6 bg-brand-gold/90 text-brand-olive-dark text-[9px] font-bold uppercase tracking-[0.3em] px-4 py-2 rounded-xl shadow-gold-glow">
                                    {art.category}
                                </div>
                            </div>
                            <div className="p-10 space-y-6 flex-grow flex flex-col">
                                <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold/40">
                                    <span className="flex items-center gap-2"><Clock size={14} /> {art.readTime}</span>
                                    <span className="flex items-center gap-2"><Eye size={14} /> {art.views}</span>
                                </div>
                                <h3 className="text-3xl font-serif font-bold text-brand-gold group-hover:drop-shadow-gold-glow transition-all duration-300 leading-tight">{art.title}</h3>
                                <p className="text-brand-ivory/50 text-base line-clamp-2 leading-relaxed font-body flex-grow">{art.desc}</p>
                                <div className="pt-8 border-t border-brand-gold/5 flex items-center justify-between">
                                    <div className="flex text-brand-gold/40">
                                        {[...Array(5)].map((_, idx) => <Star key={idx} size={14} fill={idx < 4 ? 'currentColor' : 'none'} className="mr-1" />)}
                                    </div>
                                    <Link to={`/library/${art.id}`} className="p-3 bg-brand-gold/10 rounded-full text-brand-gold opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0 -translate-x-4">
                                        <ArrowRight size={20} />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Membership CTA */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="mt-40 p-16 md:p-32 spiritual-card text-center relative overflow-hidden shadow-gold-glow-subtle bg-white/[0.02]">
                    <div className="absolute inset-0 bg-brand-gold/[0.02] animate-pulse" />
                    <div className="relative z-10">
                        <h2 className="text-5xl md:text-7xl font-serif font-bold uppercase tracking-tight mb-10 leading-none text-brand-gold">Collective <span className="opacity-20">Plus</span></h2>
                        <p className="text-brand-ivory/70 text-xl max-w-2xl mx-auto mb-14 font-light leading-relaxed">Unlock the deep-dive Sanskrit translations and high-resolution heritage blueprints.</p>
                        <button className="btn-primary flex items-center gap-4 mx-auto px-12 py-5 uppercase tracking-widest text-sm">
                            <Sparkles size={20} /> Upgrade Memory Access
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Library;
