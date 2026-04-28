import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
    { path: '/',             label: 'Roots'      },
    { path: '/heritage-map', label: 'The Map'   },
    { path: '/wellness',     label: 'Practice'  },
    { path: '/community',    label: 'Sense'     },
    { path: '/dashboard',    label: 'Today'     },
];

const Header = () => {
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handler, { passive: true });
        return () => window.removeEventListener('scroll', handler);
    }, []);

    useEffect(() => { setOpen(false); }, [location.pathname]);

    const premiumEasing = [0.22, 1, 0.36, 1];

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-1000 ${
                    scrolled 
                        ? 'bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/5 py-6' 
                        : 'bg-transparent py-10'
                }`}
            >
                <div className="max-w-7xl mx-auto px-12 md:px-24 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-4 group">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                        <span className="font-medium tracking-[0.2em] text-white text-xs uppercase">
                            Inner Root
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-16">
                        {navItems.map(item => {
                            const active = location.pathname === item.path;
                            return (
                                <Link key={item.path} to={item.path}
                                    className="relative group py-2"
                                >
                                    <span className={`text-[11px] uppercase tracking-[0.2em] font-medium transition-colors duration-700 ${
                                        active ? 'text-white' : 'text-white/20 group-hover:text-white/60'
                                    }`}>
                                        {item.label}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right Actions */}
                    <div className="hidden md:flex items-center gap-12">
                        <Link to="/login" className="text-[11px] uppercase tracking-widest font-medium text-white/20 hover:text-white transition-colors duration-700">
                            Sign In
                        </Link>
                        <Link to="/signup" className="text-[11px] uppercase tracking-[0.3em] font-medium text-[#D4AF37] hover:text-white transition-colors duration-700">
                            Join
                        </Link>
                    </div>

                    {/* Mobile toggle */}
                    <button className="lg:hidden p-2 text-white/40 hover:text-white transition-colors"
                        onClick={() => setOpen(v => !v)} aria-label="Toggle menu">
                        {open ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </header>

            {/* Mobile drawer */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity:0 }} 
                        animate={{ opacity:1 }} 
                        exit={{ opacity:0 }}
                        transition={{ duration: 0.8, ease: premiumEasing }}
                        className="fixed inset-0 z-40 bg-[#0A0A0A] pt-48 px-12 lg:hidden flex flex-col"
                    >
                        <nav className="flex flex-col gap-12 mb-auto">
                            {navItems.map((item, i) => (
                                <motion.div
                                    key={item.path}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.8, ease: premiumEasing }}
                                >
                                    <Link to={item.path}
                                        className="text-5xl font-serif font-light tracking-tight text-white/30 hover:text-white transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                        
                        <div className="pb-24 flex flex-col gap-8">
                            <Link to="/signup" className="text-sm font-medium tracking-widest uppercase text-[#D4AF37]">Join Protocol</Link>
                            <Link to="/login" className="text-sm font-medium tracking-widest uppercase text-white/20">Sign In</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
