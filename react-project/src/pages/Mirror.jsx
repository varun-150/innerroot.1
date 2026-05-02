import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, User, Bot, Loader2, RotateCcw, Volume2, ShieldCheck, X, ArrowLeft, History } from 'lucide-react';
import { useWebSocketClient } from '../context/WebSocketContext';
import { API_BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/ui/SEO';

const Mirror = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchingHistory, setIsFetchingHistory] = useState(false);
    const [mood, setMood] = useState('Harmonic');
    
    const messagesEndRef = useRef(null);
    const { client, connected } = useWebSocketClient();
    const subscriptionRef = useRef(null);

    const getSessionId = useCallback(() => {
        let sid = localStorage.getItem('inner_root_chat_session');
        if (!sid) {
            sid = `session-${Math.random().toString(36).substring(2, 10)}`;
            localStorage.setItem('inner_root_chat_session', sid);
        }
        return sid;
    }, []);

    const [sessionId] = useState(getSessionId());

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const fetchHistory = useCallback(async () => {
        setIsFetchingHistory(true);
        try {
            const response = await fetch(`${API_BASE_URL}/chat/history/${sessionId}`);
            if (response.ok) {
                const data = await response.json();
                const history = data.map(msg => ({
                    role: msg.sender === 'user' ? 'user' : 'bot',
                    content: msg.content,
                    timestamp: msg.timestamp
                }));
                
                if (history.length > 0) {
                    setMessages(history);
                } else {
                    setMessages([
                        { role: 'bot', content: 'Welcome to the Mirror. I am Aura. Here, your reflections meet the timeless wisdom of Bharat. How does your soul feel in this moment?' }
                    ]);
                }
            }
        } catch (error) {
            console.error('Error fetching chat history:', error);
            if (messages.length === 0) {
                setMessages([{ role: 'bot', content: 'Welcome to the Mirror. I am Aura. How may I guide your reflection today?' }]);
            }
        } finally {
            setIsFetchingHistory(false);
        }
    }, [sessionId]);

    useEffect(() => {
        if (!client || !connected) return;

        if (subscriptionRef.current) {
            subscriptionRef.current.unsubscribe();
        }

        subscriptionRef.current = client.subscribe(`/topic/chat/reply/${sessionId}`, (message) => {
            if (message.body) {
                const response = JSON.parse(message.body);
                setMessages(prev => [...prev, { role: 'bot', content: response.content }]);
                setIsLoading(false);
            }
        });

        fetchHistory();

        return () => {
            if (subscriptionRef.current) {
                subscriptionRef.current.unsubscribe();
            }
        };
    }, [client, connected, sessionId, fetchHistory]);

    const handleSend = () => {
        if (!input.trim() || isLoading) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        if (client && connected) {
            client.publish({
                destination: '/app/chat',
                body: JSON.stringify({ content: input, sender: 'user', sessionId: sessionId })
            });
        } else {
            setMessages(prev => [...prev, { role: 'bot', content: 'The connection to the wisdom ether is momentarily clouded. Please ensure your sanctuary is awakened.' }]);
            setIsLoading(false);
        }

        setInput('');
    };

    const premiumEasing = [0.22, 1, 0.36, 1];

    return (
        <div className="min-h-screen bg-[#0B0E14] text-white font-sans selection:bg-[#D4AF37]/30 relative overflow-hidden flex flex-col">
            <SEO title="The Mirror | Inner Root" />
            
            {/* Background Ambient Glow */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <motion.div 
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.15, 0.1],
                        x: [0, 50, 0],
                        y: [0, -50, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-[#D4AF37]/10 blur-[120px]"
                />
                <motion.div 
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.05, 0.1, 0.05],
                        x: [0, -30, 0],
                        y: [0, 40, 0]
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-[10%] -right-[5%] w-[50%] h-[50%] rounded-full bg-blue-500/5 blur-[100px]"
                />
            </div>

            {/* Header */}
            <header className="relative z-50 p-8 md:p-12 flex justify-between items-center bg-black/20 backdrop-blur-md border-b border-white/5">
                <div className="flex items-center gap-6">
                    <button 
                        onClick={() => navigate('/')}
                        className="p-3 rounded-full hover:bg-white/5 text-white/40 hover:text-white transition-all"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-[10px] uppercase tracking-[0.6em] text-[#D4AF37] mb-1">The Mirror</h1>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-serif font-light tracking-tight">Reflect with Aura</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mt-1" />
                        </div>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="hidden md:flex items-center gap-4 px-6 py-2 rounded-full bg-white/5 border border-white/5">
                        <span className="text-[9px] uppercase tracking-widest text-white/30">Presence:</span>
                        <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold">{mood}</span>
                    </div>
                    <button className="p-3 rounded-full hover:bg-white/5 text-white/40 hover:text-white transition-all">
                        <History size={20} />
                    </button>
                </div>
            </header>

            {/* Main Chat Area */}
            <main className="flex-1 relative z-10 overflow-y-auto custom-scrollbar px-8 py-12 md:px-24">
                <div className="max-w-4xl mx-auto space-y-16">
                    {isFetchingHistory && (
                        <div className="flex flex-col items-center justify-center py-32 gap-6 text-white/20">
                            <Loader2 className="animate-spin text-[#D4AF37]" size={40} />
                            <span className="text-[10px] tracking-[0.8em] uppercase font-light">Aligning Resonance</span>
                        </div>
                    )}

                    {!isFetchingHistory && messages.map((msg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: premiumEasing }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex gap-8 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                <div className={`mt-2 h-10 w-10 rounded-full flex-shrink-0 flex items-center justify-center border ${
                                    msg.role === 'user' ? 'bg-white/5 border-white/10' : 'bg-[#D4AF37]/10 border-[#D4AF37]/20'
                                }`}>
                                    {msg.role === 'user' ? <User size={16} className="text-white/40" /> : <Sparkles size={16} className="text-[#D4AF37]" />}
                                </div>
                                <div className="space-y-3">
                                    <div 
                                        className={`p-8 rounded-[40px] text-lg font-light leading-relaxed ${
                                            msg.role === 'user' 
                                            ? 'bg-white/5 text-white/90 border border-white/10 rounded-tr-none' 
                                            : 'bg-white/[0.02] text-[#D4AF37] border border-[#D4AF37]/10 rounded-tl-none backdrop-blur-xl shadow-[0_0_50px_rgba(212,175,55,0.05)]'
                                        }`}
                                    >
                                        {msg.content}
                                    </div>
                                    <div className={`text-[9px] uppercase tracking-widest text-white/10 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                                        {msg.role === 'user' ? 'Reflected' : 'Illuminated'}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {isLoading && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                            <div className="flex gap-8">
                                <div className="mt-2 h-10 w-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">
                                    <Bot size={16} className="text-[#D4AF37]" />
                                </div>
                                <div className="space-y-6">
                                    <div className="flex gap-2 items-center h-12">
                                        {[0, 1, 2].map(dot => (
                                            <motion.div 
                                                key={dot}
                                                className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"
                                                animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
                                                transition={{ repeat: Infinity, duration: 1.5, delay: dot * 0.3 }}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-[10px] uppercase tracking-[0.6em] text-[#D4AF37]/30 italic">Aura is contemplating...</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} className="h-32" />
                </div>
            </main>

            {/* Input Bar */}
            <footer className="relative z-50 p-12 md:px-24 bg-gradient-to-t from-[#0B0E14] via-[#0B0E14]/90 to-transparent">
                <div className="max-w-4xl mx-auto">
                    <div className="relative group">
                        <div className="absolute -inset-[1px] bg-gradient-to-r from-[#D4AF37]/20 to-blue-500/20 rounded-[32px] opacity-20 blur-md group-focus-within:opacity-100 transition duration-1000" />
                        <div className="relative flex items-center bg-black/40 backdrop-blur-2xl rounded-[32px] p-3 border border-white/5">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Speak your truth..."
                                className="flex-1 bg-transparent px-8 py-5 text-lg text-white focus:outline-none placeholder:text-white/10 font-light"
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                className="w-14 h-14 rounded-2xl flex items-center justify-center text-black disabled:opacity-20 transition-all shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                                style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #C5A059 100%)' }}
                            >
                                <Send size={22} />
                            </motion.button>
                        </div>
                    </div>
                    <div className="flex justify-center mt-12 gap-12 opacity-20">
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={12} />
                            <span className="text-[9px] uppercase tracking-[0.4em]">Sacred Privacy Protocol</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Sparkles size={12} />
                            <span className="text-[9px] uppercase tracking-[0.4em]">Vedic Intelligence v2.0</span>
                        </div>
                    </div>
                </div>
            </footer>

            <style dangerouslySetInnerHTML={{ __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(212, 175, 55, 0.1);
                    border-radius: 20px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(212, 175, 55, 0.3);
                }
            `}} />
        </div>
    );
};

export default Mirror;
