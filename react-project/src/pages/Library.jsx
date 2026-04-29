import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Search, BookOpen, ArrowUpRight, 
    Filter, Book, Library as LibraryIcon
} from 'lucide-react';
import SEO from '../components/ui/SEO';

/* ── Minimalist Easing ── */
const premiumEasing = [0.22, 1, 0.36, 1];

const categories = ['All', 'Shruti', 'Smriti', 'Itihasa', 'Philosophy', 'Yoga'];

const books = [
    {
        id: 'bg-1',
        title: "Bhagavad Gita",
        category: "Itihasa",
        author: "Veda Vyasa",
        source: "Gita Supersite (IIT Kanpur)",
        link: "https://www.gitasupersite.iitk.ac.in/",
        desc: "The essence of Vedic wisdom. A dialogue between Krishna and Arjuna on the nature of duty, soul, and liberation.",
        type: "Interactive / Academic"
    },
    {
        id: 'rv-1',
        title: "Rig Veda",
        category: "Shruti",
        author: "Ancient Rishis",
        source: "Internet Archive",
        link: "https://archive.org/details/TheRigVeda",
        desc: "The foundational text of Sanatan Dharma. A collection of hymns exploring the cosmic order and the nature of existence.",
        type: "PDF / Digitized"
    },
    {
        id: 'up-1',
        title: "The Principal Upanishads",
        category: "Shruti",
        author: "S. Radhakrishnan (Trans.)",
        source: "Wisdom Library",
        link: "https://www.wisdomlib.org/hinduism/book/the-principal-upanishads",
        desc: "Philosophical inquiries into the nature of reality (Brahman) and the self (Atman).",
        type: "Web / Searchable"
    },
    {
        id: 'ys-1',
        title: "Yoga Sutras of Patanjali",
        category: "Yoga",
        author: "Patanjali",
        source: "Project Gutenberg",
        link: "https://www.gutenberg.org/ebooks/2526",
        desc: "The definitive text on the practice and philosophy of classical yoga and mental liberation.",
        type: "E-book"
    },
    {
        id: 'rm-1',
        title: "Ramayana",
        category: "Itihasa",
        author: "Valmiki",
        source: "Wisdom Library",
        link: "https://www.wisdomlib.org/hinduism/book/the-ramayana-of-valmiki",
        desc: "The epic journey of Rama, illustrating the ideals of Dharma through personal and social conduct.",
        type: "Web / Searchable"
    },
    {
        id: 'sb-1',
        title: "Srimad Bhagavatam",
        category: "Smriti",
        author: "Veda Vyasa",
        source: "Bhaktivedanta Vedabase",
        link: "https://vedabase.io/en/library/sb/",
        desc: "A comprehensive Purana focusing on Bhakti (devotion) and the incarnations of the divine.",
        type: "Interactive / Multilingual"
    },
    {
        id: 'as-1',
        title: "Ashtavakra Gita",
        category: "Philosophy",
        author: "Ashtavakra",
        source: "Wisdom Library",
        link: "https://www.wisdomlib.org/hinduism/book/ashtavakra-gita",
        desc: "A radical Advaita Vedanta text emphasizing the immediate realization of the self.",
        type: "Web"
    },
    {
        id: 'vc-1',
        title: "Vivekachudamani",
        category: "Philosophy",
        author: "Adi Shankaracharya",
        source: "Internet Archive",
        link: "https://archive.org/details/VivekachudamaniOfSriSankaracharyaWithEnglishTranslationBySwamiMadhavananda",
        desc: "The 'Crest-Jewel of Discrimination' — a practical guide to the path of knowledge.",
        type: "PDF"
    }
];

const Library = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredBooks = useMemo(() => {
        return books.filter(book => {
            const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 book.desc.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === 'All' || book.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, activeCategory]);

    return (
        <div className="min-h-screen bg-spiritual-gradient text-white selection:bg-brand-gold/20">
            <SEO title="Library — Timeless Wisdom" />
            
            <div className="max-w-7xl mx-auto px-8 md:px-24 pt-48 pb-32 relative z-10">
                
                {/* ── Header ── */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.4, ease: premiumEasing }}
                    className="mb-32"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <LibraryIcon size={14} className="text-brand-gold/60" />
                        <span className="text-[10px] uppercase tracking-[0.4em] text-dim font-medium">Archive</span>
                    </div>
                    <h1 className="text-7xl md:text-9xl font-serif font-light tracking-tight leading-none mb-12">
                        The Library
                    </h1>
                    <p className="text-lg md:text-2xl text-dim max-w-2xl font-light leading-relaxed">
                        A curated sanctuary of authorized Vedic scriptures and philosophical works, distilled for the modern seeker.
                    </p>
                </motion.div>

                {/* ── Search & Filter ── */}
                <div className="flex flex-col md:flex-row gap-12 mb-24 border-b border-white/5 pb-12 items-end">
                    <div className="relative flex-grow group">
                        <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-gold/50 transition-colors" size={20} />
                        <input 
                            type="text"
                            placeholder="Search by title or wisdom..."
                            className="w-full bg-transparent border-none py-4 pl-12 pr-4 outline-none text-2xl font-light placeholder:text-white/10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex flex-wrap gap-3 items-center">
                        <Filter size={14} className="text-dim mr-2" />
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] transition-all duration-700 border ${
                                    activeCategory === cat 
                                        ? 'bg-brand-white text-brand-black border-brand-white font-semibold' 
                                        : 'bg-transparent text-dim border-white/5 hover:border-brand-gold/40 hover:text-white'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Book Grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 overflow-hidden rounded-3xl">
                    <AnimatePresence mode="popLayout">
                        {filteredBooks.map((book, i) => (
                            <motion.div 
                                layout
                                key={book.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1, delay: i * 0.05, ease: premiumEasing }}
                                className="bg-brand-black/40 p-12 md:p-16 hover:bg-white/[0.02] transition-colors duration-700 flex flex-col group backdrop-blur-sm"
                            >
                                <div className="flex justify-between items-start mb-12">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3">
                                            <span className="text-[9px] uppercase tracking-[0.3em] text-brand-gold/60 px-4 py-1.5 border border-brand-gold/20 rounded-full font-medium">
                                                {book.category}
                                            </span>
                                            <span className="text-[9px] uppercase tracking-[0.3em] text-dim font-medium">
                                                {book.type}
                                            </span>
                                        </div>
                                        <h3 className="text-3xl md:text-5xl font-serif font-light leading-tight group-hover:text-brand-gold transition-colors duration-700">
                                            {book.title}
                                        </h3>
                                        <p className="text-sm text-dim font-medium tracking-wide italic">
                                            by {book.author}
                                        </p>
                                    </div>
                                    <a 
                                        href={book.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-gold hover:text-brand-black hover:border-brand-gold transition-all duration-700"
                                    >
                                        <ArrowUpRight size={24} className="stroke-[1.5px]" />
                                    </a>
                                </div>

                                <p className="text-dim text-xl font-light leading-relaxed mb-12 flex-grow group-hover:text-white/70 transition-colors">
                                    {book.desc}
                                </p>

                                <div className="pt-8 border-t border-white/5 flex items-center justify-between text-[9px] uppercase tracking-[0.4em] text-dim font-medium">
                                    <div className="flex items-center gap-3">
                                        <Book size={14} className="stroke-[1.5px]" />
                                        <span>Source: {book.source}</span>
                                    </div>
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-700 text-brand-gold">Open Access</span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* ── Empty State ── */}
                {filteredBooks.length === 0 && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-48 text-center"
                    >
                        <p className="text-3xl font-serif font-light text-dim">
                            The archive is silent. Try another query.
                        </p>
                    </motion.div>
                )}

                {/* ── Footer Quote ── */}
                <div className="mt-48 text-center pt-24 border-t border-white/5">
                    <p className="text-[10px] uppercase tracking-[0.6em] text-brand-gold/30 mb-8 font-medium">Shruti · Smriti · Darshana</p>
                    <p className="text-dim italic font-serif text-2xl leading-relaxed">
                        "Knowledge is the supreme purifier."
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Library;
