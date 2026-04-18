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
                className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
                style={{
                    padding: scrolled ? '0.75rem 2rem' : '1rem 2rem',
                    background: scrolled
                        ? 'rgba(11, 19, 43, 0.95)'
                        : 'transparent',
                    backdropFilter: scrolled ? 'blur(20px)' : 'none',
                    borderBottom: scrolled ? '1px solid rgba(244, 235, 208, 0.08)' : '1px solid transparent',
                }}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-4 group">
                        <img 
                            src={logo} 
                            alt="Inner Root Logo" 
                            className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-500 rounded-full"
                        />
                        <span className="font-display font-black uppercase tracking-tighter text-gold-500 text-2xl leading-none">
                            INNER ROOT
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map(item => {
                            const active = location.pathname === item.path;
                            return (
                                <Link key={item.path} to={item.path}
                                    className="text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-500 relative group"
                                    style={{ color: active ? 'var(--gold-500)' : 'var(--muted-gray)' }}
                                >
                                    {item.label}
                                    <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] transition-all duration-500 origin-left bg-gold-500"
                                        style={{
                                            transform: active ? 'scaleX(1)' : 'scaleX(0)',
                                        }} />
                                    <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] transition-all duration-500 origin-left bg-gold-400 opacity-0 group-hover:opacity-50 group-hover:scale-x-100 scale-x-0" />
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link to="/login"
                            className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.4em] text-gold-400/40 hover:text-gold-500 transition-colors duration-500">
                            <LogIn size={14} /> Sign In
                        </Link>
                        <Link to="/explore"
                            className="btn-primary"
                            style={{ padding:'0.6rem 1.8rem', fontSize: '9px' }}>
                            Launch
                        </Link>
                    </div>

                    {/* Mobile toggle */}
                    <button className="md:hidden p-3 glass-pane rounded-2xl text-white/40 hover:text-white transition-colors"
                        onClick={() => setOpen(v => !v)} aria-label="Toggle menu">
                        {open ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </header>

            {/* Mobile drawer */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity:0, y:-20 }}
                        animate={{ opacity:1, y:0 }}
                        exit={{ opacity:0, y:-20 }}
                        transition={{ duration:0.5, ease:[0.65,0,0.35,1] }}
                        className="fixed top-0 left-0 right-0 z-40 glass-dark pt-24 pb-10 px-6"
                    >
                        <nav className="flex flex-col gap-6">
                            {navItems.map(item => (
                                <Link key={item.path} to={item.path}
                                    className="text-2xl font-display font-black uppercase tracking-tighter transition-all duration-500"
                                    style={{ color: location.pathname === item.path ? 'var(--gold-500)' : 'var(--muted-gray)' }}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <div className="pt-6 border-t border-gold-500/10 flex gap-4">
                                <Link to="/login"  className="flex-1 text-center py-4 bg-midnight-950 border border-gold-500/10 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-gold-500/40">Sign In</Link>
                                <Link to="/explore" className="flex-1 btn-primary text-center text-[9px] tracking-[0.3em]">Launch</Link>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
