import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Mail, Send, Globe, Clock, CheckCircle2, AlertCircle, User, MessageSquare, Sparkles } from 'lucide-react';
import SEO from '../components/ui/SEO';
import { contactAPI } from '../services/api';

const contactDetails = [
    {
        icon: Mail,
        label: 'Email',
        value: 'hello@innerroot.app',
        sub: 'Responds within 24 hours',
    },
    {
        icon: Globe,
        label: 'Cultural Heritage',
        value: 'India & Beyond',
        sub: 'Rooted in ancient wisdom',
    },
    {
        icon: Clock,
        label: 'Support Hours',
        value: 'Mon – Fri · 9–6 IST',
        sub: 'Community moderated 24/7',
    },
];

const Contact = () => {
    const [form, setForm]       = useState({ name: '', email: '', message: '' });
    const [status, setStatus]   = useState('idle');   // idle | sending | success | error
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
            setErrorMsg(err?.response?.data?.error || 'Something went wrong. Please try again.');
            setStatus('error');
        }
    };

    return (
        <div className="bg-gradient-primary min-h-screen text-muted-gray font-body overflow-hidden selection:bg-gold-500/30 relative">
            <SEO title="Contact — Inner Root" description="Reach out to the Inner Root collective." />

            {/* ── Background ── */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-15%] right-[-10%] w-[700px] h-[700px] rounded-full opacity-5 blur-[180px] animate-float"
                    style={{ background: 'var(--gold-500)' }} />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-5 blur-[140px] animate-breathe"
                    style={{ background: 'var(--gold-400)' }} />
            </div>

            {/* ── HERO ── */}
            <section ref={heroRef} className="relative z-10 pt-40 pb-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
                        className="text-center mb-24"
                    >
                        <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-midnight-800 border border-gold-500/10 text-[9px] font-black tracking-[0.5em] uppercase text-[#EAD7B0] mb-8">
                            <Sparkles size={12} className="text-gold-500" /> Sacred Connection
                        </span>
                        <h1 className="text-7xl md:text-[9rem] font-display font-black tracking-tighter uppercase leading-[0.85] mb-8 text-gold-500">
                            GET IN <span className="text-gold-100">TOUCH</span>
                        </h1>
                        <p className="text-xl text-muted-gray max-w-xl mx-auto font-light leading-relaxed">
                            Every message enters our database. Every inquiry is personally reviewed. We honour your time.
                        </p>
                    </motion.div>

                    {/* Two-col layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

                        {/* ── LEFT SIDEBAR ── */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={heroInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
                            className="lg:col-span-2 flex flex-col gap-6"
                        >
                            {/* Intro card */}
                            <div className="card-luxury p-10 flex-shrink-0 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gold-400 opacity-[0.04]" />
                                <div className="w-14 h-14 rounded-3xl flex items-center justify-center mb-8 glass-pane">
                                    <Mail size={24} className="text-[#F4EBD0]" />
                                </div>
                                <h2 className="text-2xl font-display font-black uppercase mb-4 text-gold-500">Let's Connect</h2>
                                <p className="text-muted-gray text-sm leading-relaxed">
                                    Your message is stored directly to our database. We personally read every inquiry and respond thoughtfully.
                                </p>
                                <div className="mt-8 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-gold-500">
                                    <div className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
                                    Replies within 24 hours
                                </div>
                            </div>

                            {/* Info cards */}
                            {contactDetails.map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={heroInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                                    className="card-luxury p-8 flex items-center gap-6 group"
                                >
                                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-[#1B263B] transition-transform duration-700 group-hover:scale-110 bg-gold-500">
                                        <item.icon size={22} />
                                    </div>
                                    <div>
                                        <span className="block text-[9px] font-black uppercase tracking-[0.4em] text-gold-500/20 mb-1">{item.label}</span>
                                        <span className="block text-base font-display font-black uppercase text-gold-100">{item.value}</span>
                                        <span className="block text-[10px] text-muted-gray mt-1">{item.sub}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* ── FORM ── */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={heroInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.25, ease: [0.65, 0, 0.35, 1] }}
                            className="lg:col-span-3"
                        >
                            <div className="card-luxury p-12 h-full relative overflow-hidden">
                                {/* Top gold rule */}
                                <div className="absolute top-0 left-12 right-12 h-[1px] bg-gold-500/20" />

                                <AnimatePresence mode="wait">
                                    {status === 'success' ? (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex flex-col items-center justify-center text-center py-24"
                                        >
                                            <div className="w-24 h-24 rounded-full glass-pane flex items-center justify-center mb-10 animate-breathe">
                                                <CheckCircle2 size={40} className="text-gold-500" />
                                            </div>
                                            <h2 className="text-4xl font-display font-black uppercase mb-4 text-gold-500">Received!</h2>
                                            <p className="text-muted-gray text-lg mb-12">We'll be in touch within 24 hours.</p>
                                            <button
                                                onClick={() => setStatus('idle')}
                                                className="px-8 py-4 glass-pane rounded-full text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white/10 transition-all"
                                            >
                                                Send Another
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                            <h2 className="text-3xl font-display font-black uppercase mb-3 text-gold-500">Send a Message</h2>
                                            <p className="text-muted-gray text-sm mb-10 uppercase tracking-widest font-black text-[10px]">
                                                Data is saved directly to our secured database.
                                            </p>

                                            <AnimatePresence>
                                                {status === 'error' && errorMsg && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="flex items-center gap-3 rounded-2xl p-5 mb-8 text-sm overflow-hidden"
                                                        style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444' }}
                                                    >
                                                        <AlertCircle size={16} /> {errorMsg}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            <form onSubmit={handleSubmit} className="space-y-6">
                                                {[
                                                    { label: 'Full Name', name: 'name', icon: User, type: 'text', placeholder: 'Your name' },
                                                    { label: 'Email Address', name: 'email', icon: Mail, type: 'email', placeholder: 'you@example.com' },
                                                ].map(field => (
                                                    <div key={field.name}>
                                                        <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-gold-400 mb-3">
                                                            {field.label}
                                                        </label>
                                                        <div className="relative">
                                                            <field.icon size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" />
                                                            <input
                                                                type={field.type}
                                                                placeholder={field.placeholder}
                                                                value={form[field.name]}
                                                                onChange={e => updateField(field.name, e.target.value)}
                                                                required
                                                                className="w-full bg-midnight-950/40 rounded-2xl pl-14 pr-6 py-5 text-sm text-gold-100 placeholder:text-muted-gray/20 focus:outline-none focus:border-gold-500/30 border border-gold-500/10 transition-all duration-700 font-body"
                                                            />
                                                        </div>
                                                    </div>
                                                ))}

                                                <div>
                                                    <label className="block text-[9px] font-black uppercase tracking-[0.4em] text-gold-400 mb-3">Message</label>
                                                    <div className="relative">
                                                        <MessageSquare size={16} className="absolute left-6 top-6 text-white/20" />
                                                        <textarea
                                                            rows={5}
                                                            placeholder="Your message..."
                                                            value={form.message}
                                                            onChange={e => updateField('message', e.target.value)}
                                                            required
                                                            className="w-full bg-midnight-950/40 rounded-2xl pl-14 pr-6 py-5 text-sm text-gold-100 placeholder:text-muted-gray/20 focus:outline-none focus:border-gold-500/30 border border-gold-500/10 transition-all duration-700 resize-none font-body"
                                                        />
                                                    </div>
                                                </div>

                                                <button
                                                    type="submit"
                                                    disabled={status === 'sending' || !isValid}
                                                    className={`btn-primary w-full ${!isValid && 'opacity-20 grayscale cursor-not-allowed'}`}
                                                >
                                                    {status === 'sending' ? (
                                                        <>
                                                            <div className="w-5 h-5 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                                                            Synchronizing...
                                                        </>
                                                    ) : (
                                                        <><Send size={18} /> Send Message</>
                                                    )}
                                                </button>

                                                <p className="text-center text-[10px] text-white/10 font-black uppercase tracking-[0.3em]">
                                                    🔒 Secured · Never shared
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
