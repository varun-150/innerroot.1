import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Target, Globe, Sparkles, ArrowRight } from 'lucide-react';
import SEO from '../components/ui/SEO';

const values = [
    { icon: Heart,    title: 'Compassion', desc: 'Rooted in the philosophy of Ahimsa — non-violence and deep empathy for all life.' },
    { icon: Target,   title: 'Purpose',    desc: 'Every feature serves cultural preservation and the cultivation of inner peace.' },
    { icon: Globe,    title: 'Inclusivity', desc: 'Open to all seekers regardless of background, belief, or creed.' },
    { icon: Sparkles, title: 'Innovation', desc: 'Blending frontier AI intelligence with millennia of spiritual wisdom.' },
];

const teamMembers = [
    { name: 'AKURI VENKATA SURYA VARUN', role: 'Founder & Lead Developer', initials: 'AV' },
    { name: 'G. REDDY HEM SATHVIK',      role: 'Co-Founder',               initials: 'GR' },
    { name: 'MD. ROOHAN',                role: 'Backend Engineer',          initials: 'MR' },
];

const timeline = [
    { year: '2024', event: 'The Vision',       desc: 'Concept born from merging dharma with frontier technology.' },
    { year: '2025', event: 'V1 Launch',        desc: 'Released heritage map for 100+ sacred sites.' },
    { year: '2026', event: 'AI Integration',   desc: 'Introduced the spiritual synthesis engine and Aura chat.' },
];

const About = () => (
    <div className="min-h-screen bg-spiritual-gradient font-body pb-32 pt-40 px-8 relative overflow-x-hidden text-brand-ivory/80">
        <SEO title="About Inner Root | Spiritual AI Collective" />

        {/* ── HERO ── */}
        <div className="max-w-5xl mx-auto text-center mb-32 relative z-10">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] font-bold uppercase tracking-[0.6em] mb-8 block text-brand-gold/60">Historical Archive Node</motion.span>
            <motion.h1 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="font-serif font-bold uppercase tracking-tight mb-12 leading-[0.9] text-brand-gold drop-shadow-gold-glow"
                style={{ fontSize:'clamp(4rem,10vw,8rem)' }}
            >
                The <span className="text-brand-ivory opacity-20">Spiritual</span> <br /> Architecture
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-2xl font-light leading-relaxed max-w-3xl mx-auto text-brand-ivory/60">
                Inner Root represents a collision of 5,000 years of distilled Vedic chronicles with the next generation of artificial intelligence.
            </motion.p>
        </div>

        {/* ── MISSION ── */}
        <section className="max-w-4xl mx-auto mb-48 relative z-10">
            <div className="spiritual-card p-16 md:p-24 text-center relative overflow-hidden backdrop-blur-3xl">
                <div className="absolute inset-0 bg-brand-gold/[0.03] animate-pulse" />
                <h2 className="text-4xl md:text-5xl font-serif font-bold uppercase mb-10 leading-none text-brand-gold">
                    Our Core Mission
                </h2>
                <p className="text-2xl md:text-3xl leading-relaxed font-light text-brand-ivory max-w-2xl mx-auto">
                    "To digitize the eternal essence of Bharat's heritage, transforming static wisdom into interactive, sentient enlightenment."
                </p>
            </div>
        </section>

        {/* ── VALUES ── */}
        <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-48 relative z-10">
            {values.map((v, i) => (
                <div key={i} className="spiritual-card p-10 group hover:border-brand-gold/40 transition-all duration-500">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-brand-gold/10 text-brand-gold group-hover:scale-110 group-hover:bg-brand-gold/20 transition-all duration-500 border border-brand-gold/20">
                        <v.icon size={28} />
                    </div>
                    <h3 className="text-2xl font-serif font-bold uppercase mb-4 text-brand-gold">
                        {v.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-brand-ivory/50 font-body">{v.desc}</p>
                </div>
            ))}
        </section>

        {/* ── MILESTONES ── */}
        <section className="max-w-7xl mx-auto mb-48 relative z-10">
            <div className="flex items-center gap-6 mb-20 justify-center">
                <div className="h-[1px] w-20 bg-brand-gold/20" />
                <h2 className="font-serif font-bold uppercase tracking-tight text-5xl text-brand-gold">
                    Chronology
                </h2>
                <div className="h-[1px] w-20 bg-brand-gold/20" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {timeline.map((item, i) => (
                    <div key={i} className="spiritual-card p-12 text-center group">
                        <div className="w-20 h-20 rounded-full flex items-center justify-center font-serif font-bold text-2xl mx-auto mb-10 text-brand-olive-dark bg-brand-gold shadow-gold-glow group-hover:scale-110 transition-transform duration-500">
                            {item.year}
                        </div>
                        <h4 className="text-2xl font-serif font-bold uppercase mb-4 text-brand-gold">
                            {item.event}
                        </h4>
                        <p className="text-sm leading-relaxed text-brand-ivory/40 font-body px-4">{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* ── TEAM ── */}
        <section className="max-w-7xl mx-auto mb-48 relative z-10">
            <div className="text-center mb-24">
                <h2 className="font-serif font-bold uppercase tracking-tight text-5xl text-brand-gold">
                    Collective <span className="text-brand-ivory opacity-30">Lead</span>
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {teamMembers.map((member, i) => (
                    <div key={i} className="spiritual-card p-12 flex flex-col items-center text-center group bg-white/[0.02]">
                        <div className="w-28 h-28 rounded-full border border-brand-gold/20 flex items-center justify-center mb-10 text-4xl font-serif font-bold text-brand-gold bg-brand-olive-dark group-hover:scale-110 group-hover:border-brand-gold/50 transition-all duration-700">
                            {member.initials}
                        </div>
                        <h3 className="text-xl font-serif font-bold uppercase mb-3 text-brand-gold">{member.name}</h3>
                        <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-brand-ivory/40">{member.role}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* ── FOOTER CTA ── */}
        <div className="text-center relative z-10 pt-10">
            <Link to="/explore" className="btn-primary inline-flex items-center gap-4 px-12 py-5 text-sm uppercase tracking-widest font-bold">
                Enter the Archive <ArrowRight size={20} />
            </Link>
        </div>
    </div>
);

export default About;
