import React from 'react';
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
    <div className="min-h-screen bg-gradient-primary font-body pb-32 pt-32 px-6 relative overflow-hidden text-muted-gray">
        <SEO title="About Inner Root" />

        {/* Background Orbs */}
        <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[160px] opacity-5 bg-gold-500 animate-float" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full blur-[140px] opacity-5 bg-gold-400 animate-breathe" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-[120px] opacity-[0.03] bg-gold-300" />
        </div>

        {/* ── HERO ── */}
        <div className="max-w-4xl mx-auto text-center mb-32 relative z-10">
            <span className="text-[9px] font-black uppercase tracking-[0.6em] mb-6 block text-gold-500">Historical Dossier</span>
            <h1 className="font-display font-black uppercase tracking-tighter mb-8 leading-none text-gold-500"
                style={{ fontSize:'clamp(3.5rem,9vw,7.5rem)' }}>
                The <span className="text-gold-100">Collective</span>
            </h1>
            <p className="text-xl leading-relaxed max-w-2xl mx-auto text-muted-gray">
                Inner Root is a digital architecture where ancient wisdom meets silicon reality.
            </p>
        </div>

        {/* Gradient divider */}
        <div className="h-[1px] w-full max-w-7xl mx-auto mb-32 relative z-10"
            style={{ background: 'var(--gold-500)', opacity: 0.15 }} />

        {/* ── MISSION ── */}
        <section className="max-w-4xl mx-auto mb-40 relative z-10">
            <div className="card-luxury p-16 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.04] bg-gold-500" />
                <h2 className="text-4xl font-display font-black uppercase mb-8 leading-none text-gold-500">
                    Our Mission
                </h2>
                <p className="text-2xl leading-relaxed font-light max-w-2xl mx-auto text-gold-100">
                    "To bridge India's timeless heritage with AI-powered self-awareness, creating a sanctuary for every digital seeker."
                </p>
            </div>
        </section>

        {/* ── VALUES ── */}
        <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-40 relative z-10">
            {values.map((v, i) => (
                <div key={i} className="card-luxury p-10 group relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-[2px] opacity-60 bg-gold-500" />
                    <div className="w-16 h-16 glass-pane rounded-3xl flex items-center justify-center mb-8 text-gold-500 group-hover:scale-110 transition-transform duration-700 bg-black/40 border border-gold-500/10">
                        <v.icon size={28} />
                    </div>
                    <h3 className="text-2xl font-display font-black uppercase mb-4 text-gold-500">
                        {v.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-gray">{v.desc}</p>
                </div>
            ))}
        </section>

        {/* Divider */}
        <div className="h-[1px] w-full max-w-7xl mx-auto mb-40 relative z-10 bg-gold-500/10" />

        {/* ── TIMELINE ── */}
        <section className="max-w-7xl mx-auto mb-40 overflow-x-auto pb-12 relative z-10">
            <h2 className="text-center font-display font-black uppercase tracking-tighter mb-20 text-4xl text-gold-500">
                Milestones
            </h2>
            <div className="flex md:justify-center gap-10 min-w-max px-6">
                {timeline.map((item, i) => (
                    <div key={i} className="text-center w-64 group card-luxury p-10">
                        <div className="w-20 h-20 rounded-full flex items-center justify-center font-display font-black text-xl mx-auto mb-8 text-[#1B263B] bg-gold-500">
                            {item.year}
                        </div>
                        <h4 className="text-xl font-display font-black uppercase mb-4 text-gold-500">
                            {item.event}
                        </h4>
                        <p className="text-xs leading-relaxed px-4 text-muted-gray">{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* ── TEAM ── */}
        <section className="max-w-7xl mx-auto mb-32 relative z-10">
            <div className="text-center mb-20">
                <h2 className="font-display font-black uppercase tracking-tighter text-4xl text-gold-500">
                    The <span className="text-gold-100">Builders</span>
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {teamMembers.map((member, i) => (
                    <div key={i} className="card-luxury p-12 flex flex-col items-center text-center group">
                        <div className="w-24 h-24 rounded-full flex items-center justify-center mb-8 text-3xl font-display font-black text-[#1B263B] bg-gold-500 transition-transform duration-700 group-hover:scale-110">
                            {member.initials}
                        </div>
                        <h3 className="text-lg font-display font-black uppercase mb-3 text-gold-500">{member.name}</h3>
                        <p className="text-[9px] font-black tracking-[0.4em] uppercase text-muted-gray">{member.role}</p>
                    </div>
                ))}
            </div>
        </section>

        <div className="text-center relative z-10">
            <Link to="/explore" className="btn-primary inline-flex items-center gap-4">
                Explore Heritage <ArrowRight size={18} />
            </Link>
        </div>
    </div>
);

export default About;
