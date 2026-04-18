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
    <footer className="relative overflow-hidden border-t border-gold-500/10 font-body bg-[#0F1A2E]">
        {/* Subtle gold glow */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ background: 'var(--gold-500)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
            {/* Top row */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 mb-24">
                {/* Brand block */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center gap-4">
                        <img 
                            src={logo} 
                            alt="Inner Root Logo" 
                            className="w-10 h-10 object-contain rounded-full"
                        />
                        <span className="font-display font-black uppercase tracking-tighter text-gold-500 text-2xl leading-none">
                            INNER ROOT
                        </span>
                    </div>
                    <p className="text-muted-gray text-sm leading-relaxed max-w-xs font-light">
                        Synchronizing 5,000 years of Vedic chronicles with modern intelligence.
                        A sentient repository for the next generation of spiritual exploration.
                    </p>
                    {/* Clean gold rule */}
                    <div className="h-[1px] w-full bg-gold-500/10 mt-6" />
                </div>

                {/* Nav columns */}
                {Object.entries(footerLinks).map(([section, links]) => (
                    <div key={section} className="space-y-5">
                        <span className="text-[8px] font-black uppercase tracking-[0.5em] text-gold-400">{section}</span>
                        <ul className="space-y-3">
                            {links.map(link => (
                                <li key={link.label}>
                                    <Link to={link.to}
                                        className="text-[11px] font-medium text-muted-gray hover:text-gold-500 transition-colors duration-500 uppercase tracking-wider">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Divider */}
            <div className="h-[1px] w-full bg-gold-500/10" />

            {/* Bottom row */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-10">
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/10">
                    &copy; 2026 Inner Root Collective · All rights reserved
                </p>
                <p className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.4em] text-gold-500/10">
                    Crafted with <Heart size={10} style={{ color:'var(--gold-500)' }} /> for the Eternal
                </p>
            </div>
        </div>
    </footer>
);

export default Footer;
