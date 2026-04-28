import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';

const navItems = [
    { path: '/',             label: 'Home'      },
    { path: '/heritage-map', label: 'Heritage'  },
    { path: '/wellness',     label: 'Wellness'  },
    { path: '/community',    label: 'Community' },
    { path: '/pricing',      label: 'Pricing'   },
    { path: '/about',        label: 'About'     },
];

const Header = ({ theme, onToggleTheme }) => {
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handler, { passive: true });
        return () => window.removeEventListener('scroll', handler);
    }, []);

    useEffect(() => { setOpen(false); }, [location.pathname]);

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    scrolled 
                        ? 'bg-main/80 backdrop-blur-md border-b border-main py-4' 
                        : 'bg-transparent py-6'
                }`}
                style={{ 
                    backgroundColor: scrolled ? 'var(--bg-main)' : 'transparent',
                    borderColor: 'var(--border-main)'
                }}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <span className="font-bold uppercase tracking-tighter text-primary text-xl" style={{ color: 'var(--text-primary)' }}>
                            INNER<span className="text-brand-gold">ROOT</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navItems.map(item => {
                            const active = location.pathname === item.path;
                            return (
                                <Link key={item.path} to={item.path}
                                    className={`text-sm font-medium transition-colors duration-200 ${
                                        active ? 'text-brand-gold' : 'text-secondary hover:text-primary'
                                    }`}
                                    style={{ color: active ? 'var(--brand-gold)' : 'var(--text-secondary)' }}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right Actions */}
                    <div className="hidden md:flex items-center gap-6">
                        <button 
                            onClick={onToggleTheme}
                            className="p-2 text-secondary hover:text-primary transition-colors"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                        <Link to="/login" className="text-sm font-medium text-secondary hover:text-primary transition-colors" style={{ color: 'var(--text-secondary)' }}>
                            Login
                        </Link>
                        <Link to="/signup" className="btn-primary px-6 py-2 text-sm rounded-md">
                            Sign Up
                        </Link>
                    </div>

                    {/* Mobile toggle */}
                    <button className="lg:hidden p-2 text-primary hover:text-brand-gold transition-colors"
                        style={{ color: 'var(--text-primary)' }}
                        onClick={() => setOpen(v => !v)} aria-label="Toggle menu">
                        {open ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </header>

            {/* Mobile drawer */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }}
                        className="fixed inset-0 z-40 bg-main pt-24 px-6 lg:hidden"
                        style={{ backgroundColor: 'var(--bg-main)' }}
                    >
                        <nav className="flex flex-col gap-6">
                            {navItems.map(item => (
                                <Link key={item.path} to={item.path}
                                    className={`text-2xl font-bold uppercase tracking-tight`}
                                    style={{ color: location.pathname === item.path ? 'var(--brand-gold)' : 'var(--text-primary)' }}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <div className="pt-6 border-t border-main flex flex-col gap-4" style={{ borderColor: 'var(--border-main)' }}>
                                <Link to="/login" className="text-center py-3 border border-main rounded-md text-primary font-bold uppercase tracking-widest text-xs" style={{ borderColor: 'var(--border-main)', color: 'var(--text-primary)' }}>Login</Link>
                                <Link to="/signup" className="btn-primary text-center py-3 rounded-md text-xs font-bold uppercase tracking-widest">Sign Up</Link>
                                <button 
                                    onClick={onToggleTheme}
                                    className="flex items-center justify-center gap-2 py-3 text-secondary font-bold uppercase tracking-widest text-xs"
                                    style={{ color: 'var(--text-secondary)' }}
                                >
                                    {theme === 'dark' ? <><Sun size={16} /> Light Mode</> : <><Moon size={16} /> Dark Mode</>}
                                </button>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
