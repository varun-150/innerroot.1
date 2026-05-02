import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Play, Shield, Zap } from 'lucide-react';

const DailyNode = ({ lesson, isActive, isCompleted, onClick }) => {
    const premiumEasing = [0.22, 1, 0.36, 1];

    return (
        <div className="relative flex flex-col items-center">
            {/* Outer Pulsing Rings */}
            {isActive && (
                <>
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.2, 0.1],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute inset-[-40px] rounded-full border border-[#D4AF37]/20"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.4, 1],
                            opacity: [0.05, 0.1, 0.05],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1
                        }}
                        className="absolute inset-[-80px] rounded-full border border-[#D4AF37]/10"
                    />
                </>
            )}

            {/* The Node Orb */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClick}
                className={`relative w-48 h-48 rounded-full flex items-center justify-center overflow-hidden transition-all duration-1000 ${
                    isActive 
                        ? 'bg-gradient-to-br from-[#D4AF37] to-[#C5A059] shadow-[0_0_80px_rgba(212,175,55,0.3)]' 
                        : isCompleted 
                            ? 'bg-white/5 border border-[#D4AF37]/30' 
                            : 'bg-white/5 border border-white/5 opacity-40'
                }`}
            >
                {/* Internal Glow Effect */}
                {isActive && (
                    <motion.div 
                        animate={{
                            opacity: [0.4, 0.7, 0.4],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.4),transparent_70%)]"
                    />
                )}

                <div className="relative z-10 flex flex-col items-center gap-2">
                    {isActive ? (
                        <>
                            <Play size={40} className="text-black fill-black ml-1" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/60">Begin</span>
                        </>
                    ) : (
                        <div className="flex flex-col items-center opacity-40">
                             <span className="text-2xl font-serif">{lesson.dayNumber}</span>
                             <span className="text-[8px] uppercase tracking-widest">Node</span>
                        </div>
                    )}
                </div>
            </motion.button>

            {/* Floating Label */}
            {isActive && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-[-60px] whitespace-nowrap"
                >
                    <span className="text-[10px] font-medium uppercase tracking-[0.6em] text-[#D4AF37] bg-black/40 backdrop-blur-md px-6 py-2 rounded-full border border-[#D4AF37]/10">
                        Today's Resonance
                    </span>
                </motion.div>
            )}
        </div>
    );
};

export default DailyNode;
