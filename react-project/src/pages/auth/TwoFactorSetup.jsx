import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, QrCode, ClipboardCheck, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const TwoFactorSetup = () => {
    const [qrData, setQrData] = useState(null);
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetch2FADetails = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('innerRootToken');
                const response = await authService.setup2FA(token);
                setQrData(response.data);
            } catch (err) {
                setError('Failed to initialize 2FA setup. Are you logged in?');
            } finally {
                setLoading(false);
            }
        };
        fetch2FADetails();
    }, []);

    const handleConfirm = async (e) => {
        e.preventDefault();
        setVerifying(true);
        setError('');
        try {
            const token = localStorage.getItem('innerRootToken');
            await authService.confirm2FA(token, otp);
            setSuccess(true);
        } catch (err) {
            setError('Invalid verification code. Please try again.');
        } finally {
            setVerifying(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-nightshade-pure flex items-center justify-center p-4">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-indigo-brand-850/60 border border-green-500/30 p-10 rounded-3xl text-center max-w-sm">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="text-green-400 w-12 h-12" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">2FA Activated</h2>
                    <p className="text-gray-400 mb-8">Your account is now protected.</p>
                    <button onClick={() => navigate('/dashboard')} className="w-full bg-accent text-black font-bold py-3 rounded-xl transition-all">
                        Go to Dashboard
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-nightshade-pure text-white flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-lg bg-indigo-brand-850/60 border border-white/10 rounded-3xl overflow-hidden shadow-xl"
            >
                <div className="p-8 md:p-12">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-8">
                        <ArrowLeft className="w-4 h-4" /> Back
                    </button>

                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-accent/20 rounded-xl">
                            <ShieldAlert className="text-[#D4AF37] w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">Secure Account</h2>
                            <p className="text-gray-400">Two-Factor Auth</p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center py-12">
                            <Loader2 className="animate-spin w-10 h-10 text-[#D4AF37] mb-4" />
                            <p className="text-gray-500">Wait...</p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            <div className="flex flex-col md:flex-row gap-8 items-center bg-black/20 p-6 rounded-2xl border border-white/5">
                                <div className="bg-white p-3 rounded-xl shrink-0">
                                    {qrData && <img src={qrData.qr_code} alt="QR" className="w-32 h-32" />}
                                </div>
                                <div className="space-y-3">
                                    <h4 className="font-semibold text-lg">1. Scan QR Code</h4>
                                    <p className="text-sm text-gray-400">Scan this code with your authenticator app.</p>
                                    <div className="mt-4 flex items-center gap-2 text-xs font-mono bg-black/40 p-2 rounded-lg border border-white/5">
                                        <span className="text-gray-500">Key:</span>
                                        <span className="text-[#D4AF37] select-all">{qrData?.secret}</span>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleConfirm} className="space-y-4">
                                <h4 className="font-semibold text-lg">2. Enter Code</h4>
                                <input 
                                    type="text" 
                                    maxLength="6"
                                    required
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl py-4 text-center text-3xl font-mono tracking-widest focus:outline-none focus:border-[#D4AF37]"
                                    placeholder="000000"
                                />
                                {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                                <button type="submit" disabled={verifying} className="w-full bg-accent text-black font-bold py-4 rounded-xl hover:bg-white transition-all">
                                    {verifying ? <Loader2 className="animate-spin" /> : 'Activate 2FA'}
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default TwoFactorSetup;
