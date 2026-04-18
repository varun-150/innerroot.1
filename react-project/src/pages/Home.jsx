import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Book, Activity, Map as MapIcon } from 'lucide-react';

const Home = () => {
    return (
        <div className="bg-[#080620] min-h-screen text-white/90 selection:bg-accent/30 font-body">
            {/* Minimalist V1 Header */}
            <header className="pt-32 pb-20 px-6 text-center">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-5xl md:text-8xl font-display font-black tracking-tighter uppercase mb-6 leading-none text-white">
                        INNER <span className="text-[#F4EBD0] underline decoration-accent/20 underline-offset-[12px]">ROOT</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/40 font-medium tracking-tight uppercase">Ancient Wisdom for the Modern World</p>
                </div>
            </header>

            {/* Core Section */}
            <section className="py-24 px-6 border-t border-white/5">
                <div className="max-w-4xl mx-auto text-center md:text-left">
                    <h2 className="text-sm font-black uppercase tracking-[0.5em] text-[#F4EBD0] mb-8">About Inner Root</h2>
                    <p className="text-3xl md:text-5xl font-display font-black leading-[1.1] mb-12 text-white">
                        Inner Root synchronizes 5,000 years of Vedic chronicles with modern intelligence. 
                    </p>
                    <p className="text-xl text-white/40 leading-relaxed mb-16">
                        Explore heritage, track your spiritual progress, and connect with ancient wisdom protocols designed for the modern seeker.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6">
                        <Link to="/explore" className="px-10 py-5 bg-accent text-nightshade-pure font-black uppercase tracking-widest text-[11px] rounded-full hover:scale-105 transition-all text-center">
                            Explore Chronicles
                        </Link>
                        <Link to="/wellness" className="px-10 py-5 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[11px] rounded-full hover:bg-white/10 transition-all text-center">
                            Wellness Center
                        </Link>
                    </div>
                </div>
            </section>

            {/* Feature List (Neon Style) */}
            <section className="py-24 px-6 bg-surface/10 border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-12">Core Features</h2>
                    <ul className="space-y-4">
                        {[
                            { icon: MapIcon, label: 'Heritage Map', desc: 'A sentinel repository of ancient sacred sites and monuments.' },
                            { icon: Sparkles, label: 'Aura Chat', desc: 'Direct communion with Vedic wisdom through neural interfaces.' },
                            { icon: Book, label: 'Japa Studio', desc: 'Traditional mantra counting tools with digital precision.' }
                        ].map((item, i) => (
                            <li key={i} className="group p-8 rounded-3xl border border-white/5 hover:border-[#F4EBD0]/30 bg-white/2 transition-all flex items-center justify-between">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <item.icon size={18} className="text-[#F4EBD0]" />
                                        <strong className="text-lg uppercase tracking-tight font-black text-white">{item.label}</strong>
                                    </div>
                                    <p className="text-white/40 text-sm">{item.desc}</p>
                                </div>
                                <ArrowRight className="text-white/10 group-hover:text-[#F4EBD0] transition-colors" />
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Quote Section */}
            <section className="py-40 px-6 text-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
                <div className="relative z-10 max-w-4xl mx-auto">
                    <p className="text-3xl md:text-5xl font-display font-black italic leading-tight mb-12 text-white">
                        "The light which shines above this heaven, higher than all, is the same light which is within man."
                    </p>
                    <p className="text-[#F4EBD0] font-black uppercase tracking-[0.4em] text-xs">— Chandogya Upanishad</p>
                </div>
            </section>

            <footer className="py-20 px-6 border-t border-white/5 text-center text-white/10 text-[10px] font-black uppercase tracking-[0.3em]">
                &copy; 2026 Inner Root Collective. Preserving the Eternal for the Connected.
            </footer>
        </div>
    );
};

export default Home;
