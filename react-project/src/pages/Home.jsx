import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, Users, MessageSquare, ArrowRight, ShieldCheck, Zap, Heart } from 'lucide-react';
import SEO from '../components/ui/SEO';

const FeatureCard = ({ icon: Icon, title, description, path, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="p-10 md:p-16 rounded-[48px] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-[#D4AF37]/20 transition-all group flex flex-col items-start text-left"
    >
        <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-10 group-hover:scale-110 transition-transform">
            <Icon size={24} />
        </div>
        <h3 className="text-3xl font-serif font-light mb-6 group-hover:text-[#D4AF37] transition-colors">{title}</h3>
        <p className="text-white/40 font-light leading-relaxed mb-10 text-lg">
            {description}
        </p>
        <Link to={path} className="mt-auto flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] group-hover:gap-6 transition-all">
            Access Portal <ArrowRight size={14} />
        </Link>
    </motion.div>
);

const Home = () => {
    const premiumEasing = [0.22, 1, 0.36, 1];

    return (
        <div className="min-h-screen bg-[#0B0E14] text-white selection:bg-[#D4AF37]/30 relative overflow-hidden">
            <SEO title="Home | Inner Root" description="The Spiritual-Tech Sanctuary for Indian Cultural Literacy." />
            
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#D4AF37]/5 blur-[150px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#34D399]/5 blur-[120px] rounded-full opacity-50" />
            </div>

            <main className="relative z-10">
                {/* ── HERO SECTION ── */}
                <section className="pt-64 pb-32 px-8 md:px-24 min-h-screen flex flex-col items-center justify-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: premiumEasing }}
                        className="max-w-5xl space-y-12"
                    >
                        <div className="flex items-center justify-center gap-4">
                            <span className="w-12 h-[1px] bg-[#D4AF37]/30" />
                            <span className="text-[10px] uppercase tracking-[0.8em] text-[#D4AF37]">V2.0 Sanctuary</span>
                            <span className="w-12 h-[1px] bg-[#D4AF37]/30" />
                        </div>
                        <h1 className="text-7xl md:text-[10rem] font-serif font-light tracking-tighter leading-[0.9] text-white">
                            Ancient Wisdom.<br />
                            <span className="text-white/10 italic">Modern Spirit.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/30 font-light max-w-2xl mx-auto leading-relaxed">
                            Inner Root is a spiritual-tech bridge, distilled for the modern seeker. Journey through 5,000 years of Indian heritage, rituals, and profound philosophy.
                        </p>
                        <div className="pt-12 flex flex-col md:flex-row gap-8 justify-center">
                            <Link to="/explore" className="px-12 py-6 bg-[#D4AF37] text-black rounded-full text-[11px] uppercase tracking-[0.4em] font-medium hover:scale-105 transition-all shadow-[0_0_40px_rgba(212,175,55,0.2)]">
                                Begin Pilgrimage
                            </Link>
                            <Link to="/practice" className="px-12 py-6 border border-white/10 hover:bg-white/5 rounded-full text-[11px] uppercase tracking-[0.4em] font-medium transition-all">
                                Enter Practice
                            </Link>
                        </div>
                    </motion.div>
                </section>

                {/* ── FEATURES GRID ── */}
                <section className="py-48 px-8 md:px-24">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                        <FeatureCard 
                            icon={Compass}
                            title="Explore"
                            description="Journey through the cultural chronicles of Bharat. From the rituals of Kerala to the desert echoes of Rajasthan, every node is a window into the soul of India."
                            path="/explore"
                            delay={0.1}
                        />
                        <FeatureCard 
                            icon={Sparkles}
                            title="Practice"
                            description="Engage with the divine. A digital Japa mala, a curated mantra library, and structured access to the Vedas and Upanishads for daily reflection."
                            path="/practice"
                            delay={0.2}
                        />
                        <FeatureCard 
                            icon={MessageSquare}
                            title="The Mirror"
                            description="A full-screen, immersive AI dialogue designed for reflection. Not just an assistant, but a mirror for your spiritual growth and cultural inquiries."
                            path="/mirror"
                            delay={0.3}
                        />
                        <FeatureCard 
                            icon={Users}
                            title="Sangha"
                            description="Connect with a collective of seekers. Share insights, participate in global rituals, and grow together in a decentralized spiritual ecosystem."
                            path="/community"
                            delay={0.4}
                        />
                    </div>
                </section>

                {/* ── MISSION SECTION ── */}
                <section className="py-64 px-8 md:px-24 border-t border-white/5">
                    <div className="max-w-5xl mx-auto space-y-32">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                            <div className="space-y-8">
                                <h2 className="text-5xl md:text-7xl font-headline font-light leading-tight">Eternal Wisdom. <br/><span className="text-accent italic">Srimad Bhagavatham.</span></h2>
                                <p className="text-xl text-secondary font-light leading-relaxed">
                                    The Bhagavatham is the ripened fruit of all Vedic knowledge. Inner Root brings this nectar of spiritual science to your fingertips, distilled for modern seekers.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <ShieldCheck className="text-brand-gold" size={32} />
                                    <h4 className="text-sm uppercase tracking-widest font-medium">Highest Purpose</h4>
                                    <p className="text-xs text-secondary font-light">"The supreme occupation for all humanity is that by which men can attain to loving devotional service." (1.2.6)</p>
                                </div>
                                <div className="space-y-4">
                                    <Zap className="text-[#34D399]" size={32} />
                                    <h4 className="text-sm uppercase tracking-widest font-medium">Absolute Truth</h4>
                                    <p className="text-xs text-secondary font-light">"The Absolute Truth is the source of all knowledge, the primeval cause of all causes." (1.1.1)</p>
                                </div>
                                <div className="space-y-4">
                                    <Heart className="text-red-400" size={32} />
                                    <h4 className="text-sm uppercase tracking-widest font-medium">Divine Love</h4>
                                    <p className="text-xs text-secondary font-light">"Unalloyed love for the Divine is the ultimate goal, surpassing all worldly attainments." (11.2.40)</p>
                                </div>
                                <div className="space-y-4">
                                    <Sparkles className="text-brand-gold" size={32} />
                                    <h4 className="text-sm uppercase tracking-widest font-medium">Soul's Freedom</h4>
                                    <p className="text-xs text-secondary font-light">"The soul is transcendental to the material modes, finding true peace in the service of Truth." (7.7.37)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── CTA SECTION ── */}
                <section className="py-64 text-center px-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="space-y-12"
                    >
                        <h2 className="text-6xl md:text-9xl font-serif font-light tracking-tighter">Enter the Sanctuary.</h2>
                        <Link to="/signup" className="inline-block px-16 py-8 bg-white text-black rounded-full text-[12px] uppercase tracking-[0.6em] font-bold hover:scale-110 transition-all">
                            Join the Protocol
                        </Link>
                    </motion.div>
                </section>
            </main>

            <footer className="py-12 px-8 border-t border-white/5 text-center relative z-10">
                <p className="text-[9px] uppercase tracking-[0.8em] text-white/10 font-medium">
                    Inner Root Protocol V2.0 — Developed by Humans for Humans
                </p>
            </footer>
        </div>
    );
};

export default Home;
