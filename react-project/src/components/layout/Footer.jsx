import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
    <footer className="bg-brand-black border-t border-white/5 py-48 px-12 md:px-24 font-body">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-24 mb-32">
                <div className="md:col-span-5">
                    <Link to="/" className="flex items-center gap-4 mb-10 group">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                        <span className="font-medium tracking-[0.2em] text-primary text-xs uppercase">
                            Inner Root
                        </span>
                    </Link>
                    <p className="text-secondary text-sm leading-relaxed font-light max-w-sm">
                        Five thousand years of heritage, refined for today. 
                        Simple tools for a more intentional life.
                    </p>
                </div>
                
                <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-16">
                    <div>
                        <h4 className="text-dim text-[10px] font-medium uppercase tracking-[0.4em] mb-8">Roots</h4>
                        <ul className="space-y-4">
                            <li><Link to="/map" className="text-secondary hover:text-primary transition-colors text-sm font-light">The Map</Link></li>
                            <li><Link to="/practice" className="text-secondary hover:text-primary transition-colors text-sm font-light">Practice</Link></li>
                            <li><Link to="/team" className="text-secondary hover:text-primary transition-colors text-sm font-light">The Team</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-dim text-[10px] font-medium uppercase tracking-[0.4em] mb-8">Sense</h4>
                        <ul className="space-y-4">
                            <li><Link to="/community" className="text-secondary hover:text-primary transition-colors text-sm font-light">Community</Link></li>
                            <li><Link to="/dashboard" className="text-secondary hover:text-primary transition-colors text-sm font-light">Today</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-dim text-[10px] font-medium uppercase tracking-[0.4em] mb-8">Legal</h4>
                        <ul className="space-y-4">
                            <li><Link to="/privacy" className="text-secondary hover:text-primary transition-colors text-sm font-light">Privacy</Link></li>
                            <li><Link to="/terms" className="text-secondary hover:text-primary transition-colors text-sm font-light">Terms</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                <p className="text-white/10 text-[10px] font-medium uppercase tracking-[0.4em]">
                    &copy; 2024 Inner Root
                </p>
                <div className="flex gap-12">
                    <a href="#" className="text-white/10 hover:text-white transition-colors text-[10px] font-medium uppercase tracking-[0.4em]">Twitter</a>
                    <a href="#" className="text-white/10 hover:text-white transition-colors text-[10px] font-medium uppercase tracking-[0.4em]">Instagram</a>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
