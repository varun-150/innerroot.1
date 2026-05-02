import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/ui/SEO';

const Section = ({ title, children, delay }) => (
    <motion.section 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay }}
        viewport={{ once: true }}
        className="mb-20 last:mb-0"
    >
        <h2 className="text-3xl mb-8">{title}</h2>
        <div className="text-secondary text-lg leading-relaxed font-light tracking-tight space-y-6">
            {children}
        </div>
    </motion.section>
);

const Terms = () => {
    const premiumEasing = [0.22, 1, 0.36, 1];

    return (
        <div className="min-h-screen bg-brand-black text-primary pt-48 pb-24 px-8 md:px-24">
            <SEO title="Terms of Resonance | Inner Root" description="The agreement for our community of heritage guardians." />
            
            <div className="max-w-4xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: premiumEasing }}
                    className="mb-32"
                >
                    <span className="text-accent text-[10px] font-medium uppercase tracking-[0.6em] mb-8 block">Legal Protocol</span>
                    <h1 className="md:text-[8rem] mb-12">Terms.</h1>
                    <p className="text-secondary text-xl md:text-2xl font-light tracking-tight italic">
                        "Agreement for a shared journey through timeless wisdom."
                    </p>
                </motion.div>

                <div className="glass-card p-12 md:p-20">
                    <div className="mb-16 inline-block px-4 py-2 bg-brand-gold/10 border border-brand-gold/20 text-accent text-[10px] uppercase tracking-[0.2em]">
                        Last Updated: May 2, 2026
                    </div>

                    <Section title="1. The Covenant" delay={0.1}>
                        <p>Welcome to Inner Root. By accessing our platform, you enter into a sanctuary of learning. You agree to honor the heritage we share and the community we build together.</p>
                    </Section>

                    <Section title="2. Guardian Representations" delay={0.2}>
                        <p>By using the site, you represent that you are of legal age and that the information you provide is accurate. You agree to use the site in a manner consistent with its mission of cultural exploration and community building.</p>
                    </Section>

                    <Section title="3. Sacred Content" delay={0.3}>
                        <p>All content on Inner Root, including text, graphics, and interactive virtual tours, is protected by international copyright. You may use the content for personal, non-commercial contemplation only.</p>
                    </Section>

                    <Section title="4. Sangha Guidelines" delay={0.4}>
                        <p>We encourage respectful and constructive dialogue. Harassment, hate speech, or the dissemination of false information is strictly prohibited within our community spaces.</p>
                    </Section>

                    <Section title="5. Limiting Echoes" delay={0.5}>
                        <p>Inner Root is provided "as is." While we strive for absolute historical accuracy, we cannot be held liable for any interpretations or technological interruptions in your journey.</p>
                    </Section>
                </div>

                <div className="mt-32 text-center">
                    <p className="text-[9px] uppercase tracking-[0.8em] text-secondary opacity-30">
                        Inner Root Protocol — All Wisdom Preserved
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Terms;
