import React, { useState } from 'react';
import {
    Search, Star, ArrowRight, Clock, Eye, Sparkles
} from 'lucide-react';
import SEO from '../components/ui/SEO';
import { useScrollReveal } from '../hooks/useScrollReveal';
import AmbientGlow from '../components/ui/AmbientGlow';

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
    useScrollReveal();

    return (
        <div className="bg-gradient-primary min-h-screen text-muted-gray font-body pb-32 pt-32 px-6 overflow-hidden">
            <SEO title="Ancient Library" />

            <div className="max-w-7xl mx-auto">
                <div className="mb-20 relative text-center md:text-left reveal">
                    <AmbientGlow color="rgba(244,235,208,0.06)" top="40%" left="20%" />
                    
                    <span className="text-gold-500 font-black uppercase text-[10px] tracking-widest mb-4 block">Digital Repository</span>
                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8 italic text-gold-500">Ancient <span className="text-gold-100">Chronicles</span></h1>
                    
                    <div className="bg-midnight-800 border border-gold-500/20 p-6 rounded-3xl flex flex-col md:flex-row gap-6 shadow-2xl">
                        <div className="relative flex-grow">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input 
                                type="text"
                                placeholder="Search the records..."
                                className="w-full bg-midnight-950/40 border border-gold-500/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-gold-500/30 transition-all text-gold-100 placeholder:text-muted-gray/30"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto no-scrollbar">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                                        activeCategory === cat ? 'bg-gold-500 text-midnight-950 shadow-glow-accent' : 'bg-midnight-950/50 text-muted-gray hover:text-gold-500 border border-gold-500/5'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {articles.map((art, i) => (
                        <div key={i} className="card-luxury p-0 rounded-3xl overflow-hidden group hover:border-gold-500 transition-colors reveal">
                            <div className="h-56 bg-black relative">
                                <img 
                                    src={art.image} 
                                    alt={art.title} 
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                                />
                                <div className="absolute top-4 left-4 bg-gold-500/20 border border-gold-500/30 text-gold-500 text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-lg">
                                    {art.category}
                                </div>
                            </div>
                            <div className="p-10 space-y-6">
                                <div className="flex items-center gap-6 text-[9px] font-black uppercase tracking-[0.4em] text-gold-400/60">
                                    <span className="flex items-center gap-2"><Clock size={12} className="text-gold-500" /> {art.readTime}</span>
                                    <span className="flex items-center gap-2"><Eye size={12} className="text-gold-500" /> {art.views} Views</span>
                                </div>
                                <h3 className="text-2xl font-black uppercase group-hover:text-gold-hover transition-colors leading-tight text-gold-500">{art.title}</h3>
                                <p className="text-muted-gray text-sm line-clamp-2 leading-relaxed">{art.desc}</p>
                                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                                    <div className="flex text-gold-500">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < 4 ? 'currentColor' : 'none'} className="opacity-50" />)}
                                    </div>
                                    <ArrowRight size={18} className="text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Large CTA */}
                <div className="mt-32 p-16 md:p-24 card-luxury text-center relative overflow-hidden group reveal">
                    <div className="relative z-10">
                        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-none italic text-gold-500">Intelligence <span className="text-gold-100">Plus</span></h2>
                        <p className="text-muted-gray text-xl max-w-xl mx-auto mb-12 font-bold">Join Heritage Pro for deep-dive translations and exclusive archives.</p>
                        <button className="btn-primary flex items-center gap-3 mx-auto">
                            <Sparkles size={18} /> Upgrade Access
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Library;
