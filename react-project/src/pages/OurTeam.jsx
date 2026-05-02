import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/ui/SEO';
import { Github, Twitter, Linkedin } from 'lucide-react';

const TeamMember = ({ name, role, bio, delay }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className="glass-card group p-12 flex flex-col items-center text-center"
    >
        <div className="w-12 h-[1px] bg-brand-gold/20 mb-8" />
        <h3 className="text-2xl mb-2">{name}</h3>
        <span className="text-accent text-xs font-medium uppercase tracking-[0.4em] mb-6 block">{role}</span>
        <p className="text-secondary text-sm leading-relaxed mb-8 font-light max-w-xs">
            {bio}
        </p>
        <div className="flex gap-6 opacity-30 group-hover:opacity-100 transition-opacity">
            <Github size={18} className="hover:text-brand-gold cursor-pointer transition-colors" />
            <Twitter size={18} className="hover:text-brand-gold cursor-pointer transition-colors" />
            <Linkedin size={18} className="hover:text-brand-gold cursor-pointer transition-colors" />
        </div>
    </motion.div>
);

const OurTeam = () => {
    const team = [
        {
            name: "Akuri Venkata Surya Varun",
            role: "Founder & Lead Designer",
            bio: "Visionary architect blending spiritual wisdom with modern technology. Leading the design and development of the Inner Root ecosystem.",
            delay: 0.1
        },
        {
            name: "Gangi Reddy Gari Hem Sathvik Reddy",
            role: "Co-Founder",
            bio: "Passionate guardian of cultural literacy. Dedicated to bridging the gap between ancient heritage and the global diaspora through the Inner Root platform.",
            delay: 0.2
        },
        {
            name: "Md. Roohan",
            role: "Backend Engineer",
            bio: "Architect of the digital sanctuary's core systems. Ensuring a seamless, secure, and high-performance experience for every seeker on their journey.",
            delay: 0.3
        }
    ];

    return (
        <div className="min-h-screen bg-brand-black text-primary pt-48 pb-24 px-8 md:px-24">
            <SEO title="Our Team | Guardians of the Root" description="Meet the scholars and designers preserving Indian heritage." />
            
            <div className="max-w-7xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2 }}
                    className="text-center mb-32"
                >
                    <span className="text-accent text-[10px] font-medium uppercase tracking-[0.6em] mb-8 block">The Guardians</span>
                    <h1 className="md:text-[8rem] mb-12">The Team.</h1>
                    <p className="text-secondary text-xl md:text-2xl font-light tracking-tight max-w-2xl mx-auto italic">
                        "A collective of historians, designers, and seekers dedicated to the resonance of Bharat."
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {team.map((member, i) => (
                        <TeamMember key={i} {...member} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OurTeam;
