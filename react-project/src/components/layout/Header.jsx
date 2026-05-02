import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
    { path: '/',         label: 'Home' },
    { path: '/explore',   label: 'Explore' },
    { path: '/practice',  label: 'Practice' },
    { path: '/map',       label: 'Map' },
    { path: '/community', label: 'Sangha' },
    { path: '/premium',   label: 'Protocol' },
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
                        ? 'py-6 px-8' 
                        : 'py-10 px-8 md:px-24'
                }`}
            >
                <div className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-1000 ${
                    scrolled 
                        ? 'bg-[#0B0E14]/40 backdrop-blur-3xl border border-white/5 px-10 py-4 rounded-full' 
                        : ''
                }`}>
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-4 group">
                        <motion.div 
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" 
                        />
                        <span className="font-medium tracking-[0.4em] text-white text-[10px] uppercase">
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
                                    <span className={`text-[10px] uppercase tracking-[0.3em] font-medium transition-all duration-700 ${
                                        active ? 'text-white' : 'text-white/20 group-hover:text-white/60'
                                    }`}>
                                        {item.label}
                                    </span>
                                    {active && (
                                        <motion.div 
                                            layoutId="nav-active"
                                            className="absolute -bottom-1 left-0 right-0 h-[1px] bg-[#D4AF37]/40"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right Actions */}
                    <div className="hidden md:flex items-center gap-12">
                        <Link to="/login" className="text-[10px] uppercase tracking-[0.3em] font-medium text-white/20 hover:text-white transition-colors duration-700">
                            Login
                        </Link>
                        <Link to="/signup" className="text-[10px] uppercase tracking-[0.4em] font-medium text-[#D4AF37] border border-[#D4AF37]/20 px-6 py-2 rounded-full hover:bg-[#D4AF37] hover:text-black transition-all duration-700">
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
                        className="fixed inset-0 z-40 bg-[#0B0E14] pt-48 px-12 lg:hidden flex flex-col"
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
                                        className="text-6xl font-serif font-light tracking-tighter text-white/20 hover:text-white transition-colors"
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
