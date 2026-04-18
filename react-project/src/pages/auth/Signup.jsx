import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ShieldPlus, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        setError('');
        try {
            await authService.register(formData.username, formData.email, formData.password);
            setSuccess(true);
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(Object.values(err.response?.data || {}).flat()[0] || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-nightshade-pure flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="bg-indigo-brand-850/60 border border-white/10 rounded-2xl p-8 shadow-xl">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                            <ShieldPlus className="text-black w-8 h-8" />
                        </div>
                        <h2 className="text-3xl font-bold text-white">Create Account</h2>
                        <p className="text-gray-400 mt-2">Join the inner root community</p>
                    </div>

                    {success ? (
                        <div className="bg-green-500/10 border border-green-500/50 text-green-400 p-6 rounded-2xl text-center">
                            <CheckCircle2 className="w-12 h-12 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold">Success!</h3>
                            <p className="mt-1 opacity-80">Taking you to login...</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSignup} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Username</label>
                                <input 
                                    name="username"
                                    type="text" 
                                    required
                                    onChange={handleChange}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#6C63FF]"
                                    placeholder="yourname"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</label>
                                <input 
                                    name="email"
                                    type="email" 
                                    required
                                    onChange={handleChange}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#6C63FF]"
                                    placeholder="name@example.com"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Password</label>
                                    <input 
                                        name="password"
                                        type="password" 
                                        required
                                        onChange={handleChange}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#6C63FF]"
                                        placeholder="••••••"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Confirm</label>
                                    <input 
                                        name="confirmPassword"
                                        type="password" 
                                        required
                                        onChange={handleChange}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#6C63FF]"
                                        placeholder="••••••"
                                    />
                                </div>
                            </div>

                            {error && <div className="text-red-500 text-xs text-center">{error}</div>}

                            <button type="submit" disabled={loading} className="w-full bg-accent text-black font-bold py-3 rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2">
                                {loading ? <Loader2 className="animate-spin" /> : 'Get Started'}
                            </button>

                            <p className="text-center text-gray-600 text-sm">
                                Already have an account? <span onClick={() => navigate('/login')} className="text-[#6C63FF] cursor-pointer">Sign in</span>
                            </p>
                        </form>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;
