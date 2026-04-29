import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Heart,
    MessageSquare,
    Share2,
    Send,
} from "lucide-react";

/* ------------------ Smooth Apple Motion ------------------ */
const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.06,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

/* ------------------ Mock Data ------------------ */
const POSTS = [
    {
        id: 1,
        name: "Aarav Sharma",
        avatar: "AS",
        content:
            "Just discovered an incredible place in Hampi. The silence there feels timeless.",
        time: "2m ago",
        likes: 24,
        comments: 5,
    },
    {
        id: 2,
        name: "Priya Patel",
        avatar: "PP",
        content:
            "Hosting a quiet group meditation this weekend. Let me know if you'd like to join.",
        time: "15m ago",
        likes: 12,
        comments: 8,
    },
];

/* ------------------ Component ------------------ */
export default function Community() {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState("");

    useEffect(() => {
        setTimeout(() => setPosts(POSTS), 500);
    }, []);

    const handlePost = () => {
        if (!newPost.trim()) return;

        const postObj = {
            id: Date.now(),
            name: "You",
            avatar: "ME",
            content: newPost,
            time: "Now",
            likes: 0,
            comments: 0,
        };

        setPosts([postObj, ...posts]);
        setNewPost("");
    };

    return (
        <div className="min-h-screen bg-spiritual-gradient text-white px-8 md:px-24 pt-48 pb-24 relative overflow-hidden">
            <div className="max-w-5xl relative z-10 mx-auto">

                {/* ------------------ Header ------------------ */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-32"
                >
                    <h1 className="text-7xl md:text-9xl font-serif font-light tracking-tight text-white mb-8">
                        Sense
                    </h1>
                    <p className="text-dim text-lg md:text-xl max-w-md font-light tracking-tight">
                        A quiet space for others. Share a thought, a reflection, or a moment of stillness.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-24">
                    
                    {/* Left: Input (5 columns) */}
                    <div className="md:col-span-5">
                        <div className="border-t border-white/5 pt-12 glass-card p-8 md:p-0 md:bg-transparent md:border-t md:border-none md:backdrop-blur-none">
                            <span className="text-[10px] font-medium uppercase tracking-[0.5em] text-brand-gold/60 mb-12 block">Contribute</span>
                            <textarea
                                value={newPost}
                                onChange={(e) => setNewPost(e.target.value)}
                                placeholder="Share a thought..."
                                className="w-full bg-transparent border-none text-2xl md:text-3xl font-serif font-light placeholder:text-white/10 focus:ring-0 resize-none min-h-[200px] mb-8 p-0"
                            />
                            <button
                                onClick={handlePost}
                                disabled={!newPost.trim()}
                                className="text-sm font-medium tracking-[0.3em] uppercase text-white/40 hover:text-brand-gold transition-all disabled:opacity-10 flex items-center gap-8 group"
                            >
                                Share
                                <span className="w-12 h-[1px] bg-white/10 group-hover:bg-brand-gold group-hover:w-20 transition-all duration-700" />
                            </button>
                        </div>
                    </div>

                    {/* Right: Feed (7 columns) */}
                    <div className="md:col-span-7 space-y-24 md:pt-12">
                        <AnimatePresence>
                            {posts.map((post, i) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1.2, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                    className="border-b border-white/5 pb-16 last:border-none group"
                                >
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="text-[10px] uppercase tracking-[0.3em] text-brand-gold/60 font-medium">{post.name}</div>
                                        <div className="w-1 h-1 rounded-full bg-white/10" />
                                        <div className="text-[9px] uppercase tracking-widest text-dim">{post.time}</div>
                                    </div>

                                    <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed mb-12 group-hover:text-white transition-colors">
                                        {post.content}
                                    </p>

                                    <div className="flex items-center gap-12 text-dim text-[10px] tracking-[0.3em] uppercase font-medium">
                                        <button className="hover:text-brand-gold transition-all flex items-center gap-3">
                                            <Heart size={14} className="stroke-[1.5px]" /> {post.likes}
                                        </button>
                                        <button className="hover:text-white transition-all flex items-center gap-3">
                                            <MessageSquare size={14} className="stroke-[1.5px]" /> {post.comments}
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}