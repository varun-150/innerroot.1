import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogIn } from 'lucide-react';

import logo from '../../assets/logo-premium.png';

const navItems = [
    { path: '/explore',      label: 'Explore'  },
    { path: '/heritage-map', label: 'Map'       },
    { path: '/wellness',     label: 'Wellness'  },
    { path: '/library',      label: 'Library'   },
    { path: '/about',        label: 'About'     },
];

const Header = () => {
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handler, { passive: true });
        return () => window.removeEventListener('scroll', handler);
    }, []);

    useEffect(() => { setOpen(false); }, [location.pathname]);

    return (
        <>
            <header
                className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
                style={{
                    padding: scrolled ? '1rem 2rem' : '1.5rem 2rem',
                    background: scrolled ? 'rgba(11, 31, 58, 0.9)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(16px)' : 'none',
                    borderBottom: scrolled ? '1px solid rgba(212, 175, 55, 0.1)' : '1px solid transparent',
                }}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <img 
                            src={logo} 
                            alt="Inner Root Logo" 
                            className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-500 rounded-full"
                        />
                        <span className="font-serif font-bold uppercase tracking-tight text-brand-gold text-2xl leading-none">
                            INNER ROOT
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-10">
                        {navItems.map(item => {
                            const active = location.pathname === item.path;
                            return (
                                <Link key={item.path} to={item.path}
                                    className="text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 relative group font-body"
                                    style={{ color: active ? '#D4AF37' : '#F5F1E6' }}
                                >
                                    {item.label}
                                    <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] transition-all duration-500 origin-left bg-brand-gold"
                                        style={{
                                            transform: active ? 'scaleX(1)' : 'scaleX(0)',
                                        }} />
                                    <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] transition-all duration-500 origin-left bg-brand-gold/50 opacity-0 group-hover:opacity-100 group-hover:scale-x-100 scale-x-0" />
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/login"
                            className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-ivory/60 hover:text-brand-gold transition-colors duration-300 font-body">
                            <LogIn size={14} /> Sign In
                        </Link>
                        <Link to="/explore"
                            className="btn-primary"
                            style={{ padding:'0.6rem 1.8rem', fontSize: '10px', tracking: '0.1em' }}>
                            Launch Protocol
                        </Link>
                    </div>

                    {/* Mobile toggle */}
                    <button className="lg:hidden p-2 text-brand-ivory hover:text-brand-gold transition-colors"
                        onClick={() => setOpen(v => !v)} aria-label="Toggle menu">
                        {open ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </header>

            {/* Mobile drawer */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }}
                        className="fixed inset-0 z-40 bg-brand-navy/95 backdrop-blur-xl pt-32 px-10"
                    >
                        <nav className="flex flex-col gap-8">
                            {navItems.map(item => (
                                <Link key={item.path} to={item.path}
                                    className="text-3xl font-serif font-bold uppercase tracking-tight transition-all duration-300"
                                    style={{ color: location.pathname === item.path ? '#D4AF37' : '#F5F1E6' }}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <div className="pt-10 border-t border-brand-gold/10 flex flex-col gap-4">
                                <Link to="/login"  className="text-center py-4 border border-brand-gold/20 rounded-full text-[12px] font-bold uppercase tracking-widest text-brand-gold">Sign In</Link>
                                <Link to="/explore" className="btn-primary text-center text-[12px] tracking-widest uppercase">Launch Protocol</Link>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
