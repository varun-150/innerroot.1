import React from 'react';
import { Link } from 'react-router-dom';

const footerLinks = {
    Explore: [
        { to: '/heritage-map', label: 'Heritage' },
        { to: '/wellness',     label: 'Wellness' },
        { to: '/library',      label: 'Library' },
    ],
    Platform: [
        { to: '/community',    label: 'Community' },
        { to: '/pricing',      label: 'Pricing' },
        { to: '/about',        label: 'About' },
    ],
    Legal: [
        { to: '/privacy',       label: 'Privacy' },
        { to: '/terms',         label: 'Terms' },
    ],
};

const Footer = () => (
    <footer className="bg-brand-black border-t border-brand-gray/10 py-24 px-6 font-sans" style={{ borderColor: 'var(--border-main)' }}>
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div className="md:col-span-1">
                    <Link to="/" className="font-bold text-brand-white tracking-tighter text-2xl uppercase">
                        INNER<span className="text-brand-gold">ROOT</span>
                    </Link>
                    <p className="mt-6 text-brand-gray text-sm leading-relaxed max-w-xs font-medium">
                        Synchronizing ancient wisdom with future intelligence. 
                        The cradle of spiritual exploration.
                    </p>
                </div>
                
                {Object.entries(footerLinks).map(([section, links]) => (
                    <div key={section}>
                        <h4 className="text-brand-white text-sm font-bold uppercase tracking-widest mb-6">{section}</h4>
                        <ul className="space-y-4">
                            {links.map(link => (
                                <li key={link.label}>
                                    <Link to={link.to} className="text-brand-gray hover:text-brand-white transition-colors text-sm font-medium">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="pt-8 border-t border-brand-gray/10 flex flex-col md:flex-row justify-between items-center gap-6" style={{ borderColor: 'var(--border-main)' }}>
                <p className="text-brand-gray text-[10px] font-bold uppercase tracking-[0.3em]">
                    &copy; 2026 Inner Root Protocol. All rights reserved.
                </p>
                <div className="text-brand-gray text-[10px] font-bold uppercase tracking-[0.3em]">
                    Designed for the Eternal Root
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
