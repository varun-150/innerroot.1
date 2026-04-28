import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../context/AuthContext';
import authService from '../../services/authService';

const Login = () => {
    const location = useLocation();
    const [email, setEmail] = useState(location.state?.email || '');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [requires2FA, setRequires2FA] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setLoginError] = useState('');
    const navigate = useNavigate();
    const { login, googleAuth } = useAuth();

    const handleInitialLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setLoginError('');
        try {
            // Check if backend uses 2FA flow via authService first, or just use context login
            const response = await login(email, password);
            if (response.requires_2fa) {
                setRequires2FA(true);
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setLoginError(err.response?.data?.error || err.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const handleOTPVerify = async (e) => {
        e.preventDefault();
        setLoading(true);
        setLoginError('');
        try {
            const response = await authService.verifyOtp(email, otp);
            // If OTP verification succeeds, we need to handle the token
            if (response.data && response.data.token) {
                localStorage.setItem('innerRootToken', response.data.token);
                // We might need a way to refresh context here, but usually redirect works if page reloads
                // Or better, add a verifyOtp to AuthContext
                window.location.href = '/dashboard';
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setLoginError(err.response?.data?.error || 'Invalid OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setLoading(true);
            try {
                await googleAuth(tokenResponse.access_token);
                navigate('/dashboard');
            } catch (err) {
                setLoginError('Google login failed. Please try again.');
            } finally {
                setLoading(false);
            }
        },
        onError: () => setLoginError('Google Login Failed')
    });

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
                            <ShieldCheck className="text-black w-8 h-8" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">
                           {requires2FA ? 'Verification' : 'Sign In'}
                        </h2>
                        <p className="text-gray-400">
                            {requires2FA ? 'Enter security code' : 'Access your account'}
                        </p>
                    </div>

                    <AnimatePresence mode="wait">
                        {!requires2FA ? (
                            <form key="login" onSubmit={handleInitialLogin} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Email / ID</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#D4AF37]"
                                        placeholder="name@example.com"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Password</label>
                                    <input 
                                        type="password" 
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#D4AF37]"
                                        placeholder="••••••••"
                                    />
                                </div>

                                {error && <div className="text-red-500 text-sm text-center">{error}</div>}

                                <button type="submit" disabled={loading} className="w-full bg-accent text-black font-bold py-3 rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2">
                                    {loading ? <Loader2 className="animate-spin" /> : 'Sign In'}
                                </button>

                                <div className="relative py-2">
                                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-indigo-brand-850 px-2 text-gray-500">Or</span></div>
                                </div>

                                <button type="button" onClick={() => handleGoogleLogin()} className="w-full bg-white/5 border border-white/10 text-white font-medium py-3 rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                                    Google
                                </button>
                                
                                <p className="text-center text-gray-500 text-sm">
                                    No account? <span onClick={() => navigate('/signup')} className="text-[#D4AF37] cursor-pointer">Sign up</span>
                                </p>
                            </form>
                        ) : (
                            <form key="2fa" onSubmit={handleOTPVerify} className="space-y-6">
                                <input 
                                    type="text" 
                                    maxLength="6"
                                    required
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl py-4 text-white text-center text-2xl tracking-[0.5em] focus:outline-none focus:border-[#D4AF37]"
                                    placeholder="000000"
                                />
                                {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                                <button type="submit" className="w-full bg-accent text-black font-bold py-3 rounded-xl hover:bg-white transition-all">Verify</button>
                                <button type="button" onClick={() => setRequires2FA(false)} className="w-full text-gray-500 text-sm">Cancel</button>
                            </form>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
