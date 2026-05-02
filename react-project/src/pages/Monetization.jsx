import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/ui/SEO';
import { Check, Crown, Star, Sparkles, Rocket, Users, Shield, Zap } from 'lucide-react';

const PricingCard = ({ title, price, description, features, buttonText, highlighted, icon: Icon }) => (
    <div className={`relative p-12 flex flex-col h-full transition-all duration-700 rounded-[48px] border group ${highlighted
        ? 'bg-white text-black border-white shadow-2xl scale-105 z-10'
        : 'bg-white/5 border-white/5 hover:border-[#D4AF37]/30'}`}>

        {highlighted && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-black px-8 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] shadow-xl z-10">
                Most Popular
            </div>
        )}

        <div className={`w-16 h-16 rounded-[24px] mb-8 flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-6 ${highlighted ? 'bg-black/5' : 'bg-white/5'}`}>
            <Icon className={`w-8 h-8 ${highlighted ? 'text-black' : 'text-[#D4AF37]'}`} />
        </div>

        <h3 className="font-serif text-3xl font-light mb-3 tracking-tight">{title}</h3>

        <div className="mb-8 flex items-baseline gap-2">
            <span className="text-5xl font-light tracking-tighter">{price}</span>
            {price !== 'Free' && <span className={`text-[10px] font-medium uppercase tracking-[0.2em] ${highlighted ? 'text-black/40' : 'text-white/20'}`}> / month</span>}
        </div>

        <p className={`text-lg mb-12 leading-relaxed font-light italic ${highlighted ? 'text-black/60' : 'text-white/40'}`}>{description}</p>

        <ul className="space-y-6 mb-16 flex-grow">
            {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-4">
                    <Check className={`w-4 h-4 mt-1 ${highlighted ? 'text-black' : 'text-[#D4AF37]'}`} />
                    <span className={`text-sm font-light ${highlighted ? 'text-black/80' : 'text-white/60'}`}>{feature}</span>
                </li>
            ))}
        </ul>

        <button className={`w-full py-6 rounded-full font-medium text-[10px] uppercase tracking-[0.4em] transition-all duration-500 ${highlighted
            ? 'bg-black text-white hover:bg-black/80 shadow-2xl'
            : 'bg-white/5 text-white border border-white/10 hover:bg-white hover:text-black'
            }`}>
            {buttonText}
        </button>
    </div>
);

const Monetization = () => {
    const premiumEasing = [0.22, 1, 0.36, 1];

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#D4AF37]/30 pb-32">
            <SEO
                title="Inner Root | Membership"
                description="Join the protocol. Reconnect with your heritage through structured micro-learning."
            />

            {/* ── Header ── */}
            <header className="pt-48 pb-20 px-8 md:px-24">
                <div className="max-w-7xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: premiumEasing }}
                        className="max-w-4xl"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                            <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#D4AF37]">Join the Protocol</span>
                        </div>
                        <h1 className="text-6xl md:text-[8rem] font-serif font-light tracking-tighter leading-[0.85] mb-12">
                            Deepen your<br />
                            <span className="text-white/10 italic">roots.</span>
                        </h1>
                        <p className="text-lg md:text-2xl text-white/30 max-w-2xl leading-relaxed font-light tracking-tight">
                            Choose your depth. From daily micro-habits to intensive live sessions with cultural scholars.
                        </p>
                    </motion.div>
                </div>
            </header>

            {/* ── Pricing Grid ── */}
            <section className="px-8 md:px-24">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <PricingCard
                        title="Free"
                        price="Free"
                        description="Start your habit with daily essentials."
                        icon={Rocket}
                        features={[
                            "1 Lesson per day",
                            "Access to 10 Heritage Sites",
                            "Community Travel Stories",
                            "Personalized delivery"
                        ]}
                        buttonText="Begin for Free"
                    />
                    <PricingCard
                        title="Seeker"
                        price="₹499"
                        description="For those ready to dive deeper into the chronicles."
                        icon={Crown}
                        highlighted={true}
                        features={[
                            "Unlimited Daily Lessons",
                            "100+ Heritage Sites Archive",
                            "Downloadable Cultural Guides",
                            "Priority AI Personalization",
                            "Early Access to Features"
                        ]}
                        buttonText="Become a Seeker"
                    />
                    <PricingCard
                        title="Guru"
                        price="₹1,499"
                        description="Direct communion with experts and scholars."
                        icon={Star}
                        features={[
                            "Weekly Live 'Heritage Hour'",
                            "Direct Expert Q&A",
                            "Offline Immersion Mode",
                            "Family Plan (5 Accounts)",
                            "Certified Course Participation"
                        ]}
                        buttonText="Join the Guru Tier"
                    />
                </div>
            </section>

            {/* ── The Moat ── */}
            <section className="py-64 px-8 md:px-24">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                    <div>
                        <h2 className="text-5xl md:text-7xl font-serif font-light tracking-tighter leading-none mb-12">
                            Human wisdom.<br />
                            <span className="text-[#D4AF37]">AI delivery.</span>
                        </h2>
                        <p className="text-white/30 text-xl leading-relaxed font-light tracking-tight max-w-md">
                            Our lessons are written by real scholars, not algorithms. AI only ensures the wisdom reaches you in a way that matches your life.
                        </p>
                    </div>
                    <div className="space-y-12">
                        {[
                            { title: 'Verified Scholars', desc: 'Every story is validated by historians and cultural guides.', icon: Shield },
                            { title: 'Personalized Path', desc: 'Daily insights adapted to your mood and spiritual difficulty.', icon: Zap },
                            { title: 'Global Diaspora', desc: 'Designed for those who feel culturally disconnected.', icon: Users },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-8 group">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-[#D4AF37]/10 transition-colors">
                                    <item.icon className="w-5 h-5 text-[#D4AF37]" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-serif font-light mb-2">{item.title}</h3>
                                    <p className="text-white/30 text-sm font-light leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Monetization;
