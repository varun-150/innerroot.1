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
        <div className="min-h-screen bg-[#0A0A0A] text-white px-12 md:px-24 pt-48 pb-24 relative overflow-hidden">
            <div className="max-w-4xl relative z-10">

                {/* ------------------ Header ------------------ */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2 }}
                    className="mb-32"
                >
                    <h1 className="text-6xl md:text-8xl font-serif font-light tracking-tight text-white mb-6">
                        Sense
                    </h1>
                    <p className="text-white/30 text-base max-w-sm font-light tracking-tight">
                        A quiet space for others. Share a thought or a moment of stillness.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-24">
                    
                    {/* Left: Input (5 columns) */}
                    <div className="md:col-span-5">
                        <div className="border-t border-white/5 pt-12">
                            <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#D4AF37]/60 mb-12 block">Contribute</span>
                            <textarea
                                value={newPost}
                                onChange={(e) => setNewPost(e.target.value)}
                                placeholder="Share a thought..."
                                className="w-full bg-transparent border-none text-xl md:text-2xl font-serif font-light placeholder:text-white/10 focus:ring-0 resize-none min-h-[160px] mb-8 p-0"
                            />
                            <button
                                onClick={handlePost}
                                disabled={!newPost.trim()}
                                className="text-sm font-medium tracking-widest uppercase text-white/40 hover:text-white transition-colors disabled:opacity-10 flex items-center gap-6 group"
                            >
                                Share
                                <span className="w-8 h-[1px] bg-white/20 group-hover:bg-white group-hover:w-12 transition-all duration-500" />
                            </button>
                        </div>
                    </div>

                    {/* Right: Feed (7 columns) */}
                    <div className="md:col-span-7 space-y-24 md:pt-12">
                        <AnimatePresence>
                            {posts.map((post, i) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1, delay: i * 0.1 }}
                                    className="border-b border-white/5 pb-12 last:border-none"
                                >
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="text-[10px] uppercase tracking-widest text-white/40 font-serif italic">{post.name}</div>
                                        <div className="w-1 h-1 rounded-full bg-white/5" />
                                        <div className="text-[9px] uppercase tracking-widest text-white/20">{post.time}</div>
                                    </div>

                                    <p className="text-lg text-white/70 font-light leading-relaxed mb-10">
                                        {post.content}
                                    </p>

                                    <div className="flex items-center gap-8 text-white/20 text-[10px] tracking-widest uppercase">
                                        <button className="hover:text-[#D4AF37] transition flex items-center gap-2">
                                            <Heart size={12} /> {post.likes}
                                        </button>
                                        <button className="hover:text-white transition flex items-center gap-2">
                                            <MessageSquare size={12} /> {post.comments}
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