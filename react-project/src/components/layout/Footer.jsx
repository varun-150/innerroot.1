import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import logo from '../../assets/logo-premium.png';

const footerLinks = {
    Explore: [
        { to: '/explore',      label: 'Heritage' },
        { to: '/heritage-map', label: 'Sacred Map' },
        { to: '/library',      label: 'Library' },
    ],
    Wellness: [
        { to: '/wellness',      label: 'Sanctuary' },
        { to: '/wellness',      label: 'Japa Studio' },
        { to: '/wellness',      label: 'Breathwork' },
    ],
    Platform: [
        { to: '/about',         label: 'About' },
        { to: '/contact',       label: 'Contact' },
        { to: '/login',         label: 'Sign In' },
    ],
    Legal: [
        { to: '/privacy',       label: 'Privacy Policy' },
        { to: '/terms',         label: 'Terms of Service' },
    ],
};

const Footer = () => (
    <footer className="relative overflow-hidden border-t border-brand-gold/10 font-body bg-brand-navy">
        <div className="relative z-10 max-w-7xl mx-auto px-10 py-24">
            {/* Top row */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 mb-24">
                {/* Brand block */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center gap-4">
                        <img 
                            src={logo} 
                            alt="Inner Root Logo" 
                            className="w-10 h-10 object-contain rounded-full"
                        />
                        <span className="font-serif font-bold uppercase tracking-tight text-brand-gold text-2xl leading-none">
                            INNER ROOT
                        </span>
                    </div>
                    <p className="text-brand-ivory/60 text-sm leading-relaxed max-w-sm font-light">
                        Synchronizing 5,000 years of Vedic chronicles with modern intelligence.
                        A sentient repository for the next generation of spiritual exploration.
                    </p>
                    {/* Clean gold rule */}
                    <div className="h-[1px] w-40 bg-brand-gold/20 mt-8" />
                </div>

                {/* Nav columns */}
                {Object.entries(footerLinks).map(([section, links]) => (
                    <div key={section} className="space-y-6">
                        <span className="font-serif text-brand-gold text-lg tracking-wide">{section}</span>
                        <ul className="space-y-3">
                            {links.map(link => (
                                <li key={link.label}>
                                    <Link to={link.to}
                                        className="text-[12px] font-medium text-brand-ivory/50 hover:text-brand-gold transition-colors duration-300 uppercase tracking-widest">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Divider */}
            <div className="h-[1px] w-full bg-brand-gold/5" />

            {/* Bottom row */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-12">
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-ivory/20">
                    &copy; 2026 Inner Root Collective · All rights reserved
                </p>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.4em] text-brand-gold/40">
                    Crafted with <Heart size={12} className="text-brand-gold/30" /> for the Eternal Root
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
