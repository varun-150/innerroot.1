import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, User, Bot, Loader2, History, RotateCcw, Volume2, ShieldCheck } from 'lucide-react';
import { useWebSocketClient } from '../../context/WebSocketContext';
import { API_BASE_URL } from '../../utils/constants';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchingHistory, setIsFetchingHistory] = useState(false);
    
    const scrollRef = useRef(null);
    const messagesEndRef = useRef(null);
    const { client, connected } = useWebSocketClient();
    const subscriptionRef = useRef(null);

    // PERSISTENT SESSION MANAGEMENT
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
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen, isLoading]);

    // FETCH HISTORY FROM MYSQL
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
                        { role: 'bot', content: 'Namaste! I am Aura, your Sentient Heritage Guide. I am here to illuminate your path through the timeless wisdom of Bharat. How may I serve you today?' }
                    ]);
                }
            }
        } catch (error) {
            console.error('Error fetching chat history:', error);
            if (messages.length === 0) {
                setMessages([{ role: 'bot', content: 'Namaste! I am Aura, your Sentient Heritage Guide. I am here to illuminate your path through the timeless wisdom of Bharat. How may I serve you today?' }]);
            }
        } finally {
            setIsFetchingHistory(false);
        }
    }, [sessionId]);

    const resetSession = useCallback(() => {
        localStorage.removeItem('inner_root_chat_session');
        window.location.reload(); // Hard reset for new session
    }, []);

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
            setMessages(prev => [...prev, { role: 'bot', content: 'The connection to the wisdom ether is momentarily clouded. Please ensure your backend sanctuary (port 8080) is awakened and try again.' }]);
            setIsLoading(false);
        }

        setInput('');
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999]">
            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.1, filter: 'brightness(1.1) drop-shadow(0 0 15px rgba(184, 115, 51, 0.4))' }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-glow-copper relative overflow-hidden group border border-white/10"
                style={{
                    background: 'var(--gradient-copper-ray)',
                }}
            >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div key="close" initial={{ rotate: -180, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 180, opacity: 0 }}>
                            <X size={28} strokeWidth={2.5} />
                        </motion.div>
                    ) : (
                        <motion.div key="chat" initial={{ scale: 0, opacity: 0, rotate: -45 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} exit={{ scale: 0, opacity: 0 }} className="relative">
                            <Sparkles size={28} strokeWidth={2.5} />
                            <motion.div 
                                className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-obsidian-pure shadow-glow-white"
                                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 0.9, y: 50, filter: 'blur(10px)' }}
                        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                        className="fixed bottom-28 right-4 w-[min(calc(100vw-2rem),440px)] h-[min(calc(100vh-10rem),650px)] bg-obsidian-pure/95 border border-white/10 rounded-[2.5rem] shadow-8k overflow-hidden flex flex-col z-[100] backdrop-blur-3xl"
                    >
                        {/* Header */}
                        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.03]">
                            <div className="flex items-center gap-4">
                                <div className="relative w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-[#D4AF37] overflow-hidden">
                                     <motion.div 
                                        className="absolute inset-0 border border-[#D4AF37]/20"
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                                    />
                                    <Bot size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-serif font-black tracking-widest uppercase text-white">Aura AI</h3>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[9px] uppercase font-black text-[#D4AF37]/70 tracking-[0.2em]">Sentience Level: Harmonic</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-1.5">
                                <button onClick={resetSession} title="Reset Conversation" className="p-2.5 rounded-xl hover:bg-white/5 text-white/30 hover:text-white transition-all">
                                    <RotateCcw size={16} />
                                </button>
                                <button className="p-2.5 rounded-xl hover:bg-white/5 text-white/30 hover:text-white transition-all">
                                    <Volume2 size={16} />
                                </button>
                                <button onClick={() => setIsOpen(false)} className="p-2.5 rounded-xl hover:bg-white/5 text-white/30 hover:text-white transition-all">
                                    <X size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth custom-scrollbar">
                            {isFetchingHistory && (
                                <div className="flex flex-col items-center justify-center h-full gap-4 text-white/20">
                                    <Loader2 className="animate-spin text-[#D4AF37]" size={32} />
                                    <span className="text-[10px] tracking-[0.4em] uppercase font-black">Aligning Chronologies...</span>
                                </div>
                            )}

                            {!isFetchingHistory && messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex gap-3 max-w-[90%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                        <div className={`mt-1 h-8 w-8 rounded-xl flex-shrink-0 flex items-center justify-center border ${
                                            msg.role === 'user' ? 'bg-white/10 border-white/10' : 'bg-accent/10 border-[#D4AF37]/20'
                                        }`}>
                                            {msg.role === 'user' ? <User size={14} className="text-white/60" /> : <Sparkles size={14} className="text-[#D4AF37]" />}
                                        </div>
                                        <div 
                                            className={`p-6 rounded-[2rem] text-sm leading-relaxed ${
                                                msg.role === 'user' 
                                                ? 'bg-gradient-to-br from-[#D4AF37] to-[#D4AF37]-600 text-obsidian-pure font-bold rounded-tr-none shadow-premium' 
                                                : 'bg-white/[0.05] text-white/90 rounded-tl-none border border-white/10 backdrop-blur-md'
                                            }`}
                                        >
                                            {msg.content}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            
                             {isLoading && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                                    <div className="flex gap-3">
                                        <div className="mt-1 h-8 w-8 rounded-xl bg-accent/10 border border-[#D4AF37]/20 flex items-center justify-center">
                                            <Bot size={14} className="text-[#D4AF37]" />
                                        </div>
                                        <div className="bg-white/[0.03] p-5 rounded-[1.5rem] rounded-tl-none border border-white/10 flex flex-col gap-4">
                                            <div className="flex gap-1.5">
                                                {[0, 1, 2].map(dot => (
                                                    <motion.div 
                                                        key={dot}
                                                        className="w-1.5 h-1.5 bg-accent rounded-full"
                                                        animate={{ opacity: [0.2, 1, 0.2], y: [0, -4, 0] }}
                                                        transition={{ repeat: Infinity, duration: 1, delay: dot * 0.2 }}
                                                    />
                                                ))}
                                            </div>
                                            <div className="flex items-end gap-1 h-3">
                                                {[...Array(8)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        className="w-[2px] bg-accent/30"
                                                        animate={{ height: ['20%', '100%', '20%'] }}
                                                        transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1 }}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-[9px] uppercase font-black tracking-widest text-[#D4AF37]/40">Alchemizing Divine Knowledge</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-8 bg-black/40 border-t border-white/5">
                            <div className="relative group">
                                <div className="absolute -inset-[1px] bg-gradient-to-r from-[#D4AF37]/50 to-transparent rounded-2xl opacity-20 blur-sm group-focus-within:opacity-40 transition duration-700" />
                                <div className="relative flex items-center bg-obsidian-pure rounded-2xl p-2 border border-white/10 shadow-inner">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                        placeholder="Communicate with Aura..."
                                        className="flex-1 bg-transparent px-4 py-3.5 text-sm text-white focus:outline-none placeholder:text-white/20 font-medium"
                                    />
                                    <motion.button
                                        whileHover={{ scale: 1.05, filter: 'brightness(1.2)' }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleSend}
                                        disabled={!input.trim() || isLoading}
                                        className="w-12 h-12 rounded-xl flex items-center justify-center text-black disabled:opacity-30 transition-all shadow-glow-copper"
                                        style={{ background: 'var(--gradient-copper-ray)' }}
                                    >
                                        <Send size={18} strokeWidth={2.5} />
                                    </motion.button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mt-6">
                                <div className="flex items-center gap-2 opacity-30">
                                    <ShieldCheck size={10} className="text-[#D4AF37]" />
                                    <span className="text-[9px] uppercase tracking-[0.3em] font-black text-white">Sacred Interface V4.0</span>
                                </div>
                                <div className="flex gap-1.5">
                                    <div className="w-1 h-1 bg-accent rounded-full animate-pulse" />
                                    <div className="w-1 h-1 bg-accent/40 rounded-full" />
                                    <div className="w-1 h-1 bg-accent/10 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style dangerouslySetInnerHTML={{ __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(184, 115, 51, 0.2);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: var(--color-accent);
                }
            `}} />
        </div>
    );
};

export default ChatBot;

