import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Mail, Send, Globe, Clock, CheckCircle2, AlertCircle, User, MessageSquare, Sparkles } from 'lucide-react';
import SEO from '../components/ui/SEO';
import { contactAPI } from '../services/api';

const contactDetails = [
    { icon: Mail,  label: 'Email',    value: 'hello@innerroot.app', sub: 'Responds within 24 hours' },
    { icon: Globe, label: 'Heritage', value: 'India & Beyond',      sub: 'Verified Spiritual Nodes' },
    { icon: Clock, label: 'Protocol', value: 'Mon – Fri · 9–6 IST', sub: 'Always Syncing' },
];

const Contact = () => {
    const [form, setForm]       = useState({ name: '', email: '', message: '' });
    const [status, setStatus]   = useState('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const heroRef  = useRef(null);
    const heroInView = useInView(heroRef, { once: true });

    const updateField = (field, value) => setForm(f => ({ ...f, [field]: value }));

    const isValid =
        form.name.trim().length > 1 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
        form.message.trim().length > 10;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        if (!isValid) { setErrorMsg('Please fill out all fields correctly.'); return; }
        setStatus('sending');
        try {
            await contactAPI.submit({
                name: form.name.trim(),
                email: form.email.trim(),
                message: form.message.trim(),
            });
            setStatus('success');
            setForm({ name: '', email: '', message: '' });
        } catch (err) {
            setErrorMsg(err?.response?.data?.error || 'Intelligence failure. Please reconnect.');
            setStatus('error');
        }
    };

    return (
        <div className="min-h-screen bg-spiritual-gradient text-brand-ivory font-body overflow-x-hidden selection:bg-brand-gold/30 relative">
            <SEO title="Contact | Inner Root Collective" description="Initiate connection with the Inner Root collective." />

            {/* ── HERO ── */}
            <section ref={heroRef} className="relative z-10 pt-40 pb-24 px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1 }}
                        className="text-center mb-32"
                    >
                        <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-[10px] font-bold tracking-[0.5em] uppercase text-brand-gold mb-10">
                            <Sparkles size={14} /> Neural Connection
                        </span>
                        <h1 className="text-7xl md:text-9xl font-serif font-bold tracking-tight uppercase leading-[0.85] mb-12 text-brand-gold">
                            GET IN <br /><span className="text-brand-ivory/20 italic font-light">TOUCH</span>
                        </h1>
                        <p className="text-2xl text-brand-ivory/60 max-w-2xl mx-auto font-light leading-relaxed">
                            Every message is archived to our heritage vault. We honor the silence and the sound.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* LEFT SIDEBAR */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={heroInView ? { opacity: 1, x: 0 } : {}}
                            className="lg:col-span-4 flex flex-col gap-8"
                        >
                            <div className="spiritual-card p-12 relative overflow-hidden">
                                <div className="absolute inset-0 bg-brand-gold/[0.02]" />
                                <div className="w-16 h-16 rounded-3xl flex items-center justify-center mb-10 bg-brand-gold/10 text-brand-gold border border-brand-gold/20">
                                    <Mail size={32} />
                                </div>
                                <h2 className="text-3xl font-serif font-bold uppercase mb-4 text-brand-gold">Initiate Link</h2>
                                <p className="text-brand-ivory/50 text-base leading-relaxed mb-10">
                                    Access our founders and engineering collective directly through this portal.
                                </p>
                                <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.4em] text-brand-gold/60">
                                    <div className="w-2.5 h-2.5 rounded-full bg-brand-gold shadow-gold-glow animate-pulse" />
                                    Protocol: Priority Respond
                                </div>
                            </div>

                            {contactDetails.map((item) => (
                                <div key={item.label} className="spiritual-card p-8 flex items-center gap-8 group hover:border-brand-gold/40 transition-all duration-500">
                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 bg-brand-gold text-brand-navy shadow-gold-glow group-hover:scale-110 transition-transform duration-700">
                                        <item.icon size={28} />
                                    </div>
                                    <div>
                                        <span className="block text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold/30 mb-1">{item.label}</span>
                                        <span className="block text-xl font-serif font-bold text-brand-ivory">{item.value}</span>
                                        <span className="block text-xs text-brand-ivory/30 mt-1">{item.sub}</span>
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        {/* FORM */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={heroInView ? { opacity: 1, x: 0 } : {}}
                            className="lg:col-span-8"
                        >
                            <div className="spiritual-card p-12 md:p-16 h-full relative overflow-hidden bg-white/[0.01]">
                                <AnimatePresence mode="wait">
                                    {status === 'success' ? (
                                        <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center text-center py-32">
                                            <div className="w-32 h-32 rounded-full border border-brand-gold/20 flex items-center justify-center mb-12 bg-brand-gold/5">
                                                <CheckCircle2 size={56} className="text-brand-gold" />
                                            </div>
                                            <h2 className="text-5xl font-serif font-bold uppercase mb-6 text-brand-gold">Archived</h2>
                                            <p className="text-brand-ivory/50 text-xl mb-14 font-light">Your inquiry is now a verified node in our collective memory.</p>
                                            <button onClick={() => setStatus('idle')} className="btn-secondary px-12">New Submission</button>
                                        </motion.div>
                                    ) : (
                                        <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                            <h2 className="text-4xl font-serif font-bold uppercase mb-4 text-brand-gold">Digital Transcript</h2>
                                            <p className="text-brand-ivory/30 text-[11px] mb-12 uppercase tracking-[0.3em] font-bold">Encrypted Heritage Channel</p>

                                            <AnimatePresence>
                                                {status === 'error' && errorMsg && (
                                                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                                        className="flex items-center gap-4 rounded-2xl p-6 mb-10 text-sm bg-red-500/10 border border-red-500/20 text-red-400">
                                                        <AlertCircle size={20} /> {errorMsg}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            <form onSubmit={handleSubmit} className="space-y-10">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                                    <div>
                                                        <label className="block text-[11px] font-bold uppercase tracking-[0.4em] text-brand-gold/40 mb-4">Name</label>
                                                        <div className="relative group">
                                                            <User size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-gold/20 group-focus-within:text-brand-gold transition-colors" />
                                                            <input type="text" placeholder="Your name..." value={form.name}
                                                                onChange={e => updateField('name', e.target.value)} required
                                                                className="w-full bg-brand-navy/40 rounded-2xl pl-14 pr-6 py-6 text-base text-brand-ivory placeholder:text-brand-ivory/10 focus:outline-none focus:border-brand-gold/40 border border-brand-gold/10 transition-all duration-500 font-body" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="block text-[11px] font-bold uppercase tracking-[0.4em] text-brand-gold/40 mb-4">Email</label>
                                                        <div className="relative group">
                                                            <Mail size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-gold/20 group-focus-within:text-brand-gold transition-colors" />
                                                            <input type="email" placeholder="active@resonance.com" value={form.email}
                                                                onChange={e => updateField('email', e.target.value)} required
                                                                className="w-full bg-brand-navy/40 rounded-2xl pl-14 pr-6 py-6 text-base text-brand-ivory placeholder:text-brand-ivory/10 focus:outline-none focus:border-brand-gold/40 border border-brand-gold/10 transition-all duration-500 font-body" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-[11px] font-bold uppercase tracking-[0.4em] text-brand-gold/40 mb-4">Message</label>
                                                    <div className="relative group">
                                                        <MessageSquare size={18} className="absolute left-6 top-7 text-brand-gold/20 group-focus-within:text-brand-gold transition-colors" />
                                                        <textarea rows={6} placeholder="Describe your intent or inquiry..." value={form.message}
                                                            onChange={e => updateField('message', e.target.value)} required
                                                            className="w-full bg-brand-navy/40 rounded-2xl pl-14 pr-6 py-7 text-base text-brand-ivory placeholder:text-brand-ivory/10 focus:outline-none focus:border-brand-gold/40 border border-brand-gold/10 transition-all duration-500 resize-none font-body" />
                                                    </div>
                                                </div>

                                                <button type="submit" disabled={status === 'sending' || !isValid}
                                                    className={`btn-primary w-full py-6 text-sm uppercase tracking-[0.3em] font-bold ${!isValid && 'opacity-20 cursor-not-allowed grayscale'}`}>
                                                    {status === 'sending' ? 'Transmitting...' : <span className="flex items-center justify-center gap-3"><Send size={20} /> Broadcast to Collective</span>}
                                                </button>

                                                <p className="text-center text-[11px] text-brand-ivory/10 font-bold uppercase tracking-widest">
                                                    🔒 Secured · Never shared · Heritage protocol
                                                </p>
                                            </form>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
