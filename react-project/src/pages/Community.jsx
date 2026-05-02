import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Heart,
    MessageSquare,
    MapPin,
    Calendar,
    Users,
    ArrowRight
} from "lucide-react";

/* ------------------ Smooth Easing ------------------ */
const premiumEasing = [0.22, 1, 0.36, 1];

const Community = () => {
    const [posts, setPosts] = useState([
        {
            id: 1,
            name: "Aarav Sharma",
            location: "Hampi, Karnataka",
            content: "The sunset at Matanga Hill is something every Indian should experience. The boulders glow like gold. Feeling deeply connected to the Vijayanagara history today.",
            time: "2h ago",
            likes: 45,
            comments: 12,
        },
        {
            id: 2,
            name: "Ishani Devi",
            location: "Varanasi, UP",
            content: "Witnessed the Ganga Aarti for the first time. The synchronicity of the priests and the devotion of the crowd... it's a living heritage that breathes.",
            time: "5h ago",
            likes: 89,
            comments: 24,
        }
    ]);

    const [newStory, setNewStory] = useState("");

    const handlePost = () => {
        if (!newStory.trim()) return;
        const postObj = {
            id: Date.now(),
            name: "You",
            location: "Current Location",
            content: newStory,
            time: "Just now",
            likes: 0,
            comments: 0,
        };
        setPosts([postObj, ...posts]);
        setNewStory("");
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white px-8 md:px-24 pt-48 pb-32 relative overflow-hidden font-sans selection:bg-[#D4AF37]/30">
            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* ── Header ── */}
                <header className="mb-32">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: premiumEasing }}
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                            <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#D4AF37]">The Collective Sense</span>
                        </div>
                        <h1 className="text-7xl md:text-[9rem] font-serif font-light tracking-tighter leading-none mb-12">
                            Stories.
                        </h1>
                        <p className="text-xl md:text-2xl text-white/30 max-w-2xl font-light tracking-tight leading-relaxed">
                            A space for the diaspora to share their journeys home. Tag your stories to sacred sites and connect through lived heritage.
                        </p>
                    </motion.div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-32">
                    
                    {/* ── Heritage Hour & Schedule (Left) ── */}
                    <div className="lg:col-span-4 space-y-24">
                        <section className="p-12 rounded-[40px] bg-white/[0.02] border border-[#D4AF37]/20 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Calendar size={80} className="text-[#D4AF37]" />
                            </div>
                            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#D4AF37] mb-8 block">Live Session</span>
                            <h2 className="text-3xl font-serif font-light mb-6">Heritage Hour</h2>
                            <p className="text-white/40 text-sm font-light leading-relaxed mb-12">
                                Weekly live deep-dives with rotating guest scholars and cultural guides.
                            </p>
                            <div className="space-y-6 mb-12">
                                <div className="flex justify-between items-center py-4 border-b border-white/5">
                                    <span className="text-xs font-light text-white/60">This Sunday</span>
                                    <span className="text-xs font-medium text-white">8:00 PM IST</span>
                                </div>
                                <div className="text-sm font-serif italic text-white/80">
                                    "The Geometry of Konark" with Dr. S. Raman
                                </div>
                            </div>
                            <button className="w-full py-5 bg-[#D4AF37] text-black font-medium uppercase tracking-[0.3em] text-[10px] rounded-full hover:scale-105 transition-all">
                                Set Reminder
                            </button>
                        </section>

                        <section className="space-y-8">
                            <h3 className="text-[10px] font-medium uppercase tracking-[0.4em] text-white/20">Active Seekers</h3>
                            <div className="flex -space-x-4">
                                {[1,2,3,4,5].map(i => (
                                    <div key={i} className="w-12 h-12 rounded-full border-2 border-[#0A0A0A] bg-white/5 flex items-center justify-center text-[10px] font-bold">
                                        {String.fromCharCode(64 + i)}
                                    </div>
                                ))}
                                <div className="w-12 h-12 rounded-full border-2 border-[#0A0A0A] bg-[#D4AF37]/10 flex items-center justify-center text-[10px] font-bold text-[#D4AF37]">
                                    +42
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* ── Travel Stories Feed (Right) ── */}
                    <div className="lg:col-span-8 space-y-32">
                        {/* New Story Input */}
                        <div className="p-12 rounded-[40px] bg-white/[0.01] border border-white/5">
                            <textarea 
                                value={newStory}
                                onChange={(e) => setNewStory(e.target.value)}
                                placeholder="Share your travel story or reflection..."
                                className="w-full bg-transparent border-none text-2xl font-serif font-light placeholder:text-white/10 focus:ring-0 resize-none min-h-[120px] mb-8 p-0"
                            />
                            <div className="flex justify-between items-center">
                                <button className="flex items-center gap-3 text-white/20 hover:text-[#D4AF37] transition-colors text-[10px] uppercase tracking-widest font-medium">
                                    <MapPin size={14} /> Tag a Sacred Site
                                </button>
                                <button 
                                    onClick={handlePost}
                                    disabled={!newStory.trim()}
                                    className="px-10 py-4 bg-white/5 hover:bg-white hover:text-black rounded-full text-[10px] uppercase tracking-[0.3em] font-medium transition-all disabled:opacity-20"
                                >
                                    Post Story
                                </button>
                            </div>
                        </div>

                        {/* Stories Feed */}
                        <div className="space-y-16">
                            <AnimatePresence>
                                {posts.map((post, i) => (
                                    <motion.div 
                                        key={post.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 1, delay: i * 0.1, ease: premiumEasing }}
                                        className="p-12 rounded-[40px] border border-white/5 hover:border-white/10 bg-white/[0.01] transition-all group"
                                    >
                                        <div className="flex justify-between items-start mb-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[10px] font-bold text-[#D4AF37]">
                                                    {post.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <div className="text-xs font-medium text-white">{post.name}</div>
                                                    <div className="text-[10px] uppercase tracking-widest text-white/20">{post.time}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-[#D4AF37] text-[10px] uppercase tracking-widest font-medium">
                                                <MapPin size={12} /> {post.location}
                                            </div>
                                        </div>
                                        <p className="text-xl font-serif font-light leading-relaxed text-white/80 mb-10 group-hover:text-white transition-colors">
                                            {post.content}
                                        </p>
                                        <div className="flex gap-12 border-t border-white/5 pt-8">
                                            <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-medium text-white/20 hover:text-[#D4AF37] transition-colors">
                                                <Heart size={14} /> {post.likes}
                                            </button>
                                            <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-medium text-white/20 hover:text-white transition-colors">
                                                <MessageSquare size={14} /> {post.comments}
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Community;