// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { useAuth } from '@/context/AuthContext';
// import { LogIn, UserPlus, AlertTriangle, Loader2 } from 'lucide-react';

// export default function LoginPage() {
//     const [credentials, setCredentials] = useState({ username: '', password: '' });
//     const [error, setError] = useState<string | null>(null);
//     const { login, isLoading } = useAuth();

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setError(null);
//         try {
//             await login(credentials);
//         } catch (err: unknown) {
//             setError('Invalid credentials. Please try again.');
//         }
//     };

//     if (isLoading) return null;

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
//             <div className="w-full max-w-md bg-slate-900/50 p-8 rounded-2xl border border-slate-700/50 backdrop-blur-sm shadow-xl">
//                 <div className="text-center mb-8">
//                     <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
//                     <p className="text-slate-400">Sign in to EduPredict</p>
//                 </div>

//                 {error && (
//                     <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400">
//                         <AlertTriangle className="w-5 h-5 flex-shrink-0" />
//                         <p className="text-sm">{error}</p>
//                     </div>
//                 )}

//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     <div>
//                         <label className="block text-sm font-medium text-slate-300 mb-1.5">Username</label>
//                         <input
//                             type="text"
//                             value={credentials.username}
//                             onChange={e => setCredentials(prev => ({ ...prev, username: e.target.value }))}
//                             className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none"
//                             required
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
//                         <input
//                             type="password"
//                             value={credentials.password}
//                             onChange={e => setCredentials(prev => ({ ...prev, password: e.target.value }))}
//                             className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none"
//                             required
//                         />
//                     </div>

//                     <button
//                         type="submit"
//                         disabled={isLoading}
//                         className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2"
//                     >
//                         {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogIn className="w-5 h-5" />}
//                         Sign In
//                     </button>
//                 </form>

//                 <div className="mt-6 text-center">
//                     <p className="text-slate-400 text-sm">
//                         Don't have an account?{' '}
//                         <Link href="/register" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
//                             Register
//                         </Link>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// }

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { 
    LogIn, 
    UserPlus, 
    AlertTriangle, 
    Loader2, 
    GraduationCap,
    Eye,
    EyeOff,
    Shield,
    Sparkles,
    ArrowRight,
    CheckCircle2
} from 'lucide-react';

export default function LoginPage() {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const { login, isLoading } = useAuth();

    // Load saved username if remember me was checked
    useEffect(() => {
        const savedUsername = localStorage.getItem('rememberedUsername');
        if (savedUsername) {
            setCredentials(prev => ({ ...prev, username: savedUsername }));
            setRememberMe(true);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        
        // Basic validation
        if (!credentials.username.trim()) {
            setError('Please enter your username');
            return;
        }
        if (!credentials.password) {
            setError('Please enter your password');
            return;
        }

        try {
            await login(credentials);
            // Save username if remember me is checked
            if (rememberMe) {
                localStorage.setItem('rememberedUsername', credentials.username);
            } else {
                localStorage.removeItem('rememberedUsername');
            }
        } catch (err: unknown) {
            setError('Invalid credentials. Please try again.');
        }
    };

    if (isLoading) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
                
                {/* Floating particles */}
                <div className="absolute top-20 left-10 w-1 h-1 bg-cyan-400 rounded-full animate-float"></div>
                <div className="absolute top-40 right-20 w-2 h-2 bg-blue-400 rounded-full animate-float animation-delay-2000"></div>
                <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-float animation-delay-1500"></div>
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Brand Card */}
                <div className="text-center mb-8 animate-fadeInUp">
                    <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl shadow-lg shadow-cyan-500/20 mb-4">
                        <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-slate-400 flex items-center justify-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Sign in to access your dashboard
                    </p>
                </div>

                {/* Error Alert */}
                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-400 animate-shake">
                        <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <p className="text-sm font-medium">{error}</p>
                            <p className="text-xs text-red-400/70 mt-1">Please check your credentials and try again</p>
                        </div>
                    </div>
                )}

                {/* Login Form */}
                <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl p-8 animate-fadeInUp animation-delay-200">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-300">
                                Username
                            </label>
                            <div className={`relative transition-all duration-200 ${
                                focusedField === 'username' ? 'scale-[1.02]' : ''
                            }`}>
                                <input
                                    type="text"
                                    value={credentials.username}
                                    onChange={e => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                                    onFocus={() => setFocusedField('username')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full px-4 py-3 bg-slate-950/50 border-2 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none"
                                    placeholder="Enter your username"
                                    autoComplete="username"
                                />
                                {credentials.username && (
                                    <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                                )}
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-medium text-slate-300">
                                    Password
                                </label>
                                <Link 
                                    href="/forgot-password" 
                                    className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className={`relative transition-all duration-200 ${
                                focusedField === 'password' ? 'scale-[1.02]' : ''
                            }`}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={credentials.password}
                                    onChange={e => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full px-4 py-3 bg-slate-950/50 border-2 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none pr-12"
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me Checkbox */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="sr-only"
                                    />
                                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                                        rememberMe 
                                            ? 'bg-cyan-500 border-cyan-500' 
                                            : 'border-slate-600 group-hover:border-slate-500'
                                    }`}>
                                        {rememberMe && <CheckCircle2 className="w-3 h-3 text-white" />}
                                    </div>
                                </div>
                                <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                                    Remember me
                                </span>
                            </label>
                            
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                <Shield className="w-3 h-3" />
                                <span>Secure login</span>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                            <span className="relative flex items-center justify-center gap-2">
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </span>
                        </button>
                    </form>

                    {/* Register Link */}
                    <div className="mt-6 pt-6 border-t border-slate-700/50 text-center">
                        <p className="text-slate-400 text-sm">
                            Don't have an account?{' '}
                            <Link 
                                href="/register" 
                                className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors inline-flex items-center gap-1 group"
                            >
                                Create an account
                                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </p>
                    </div>

                    {/* Demo Credentials Hint */}
                    <div className="mt-4 p-3 bg-slate-800/30 rounded-lg border border-slate-700/30">
                        <p className="text-xs text-slate-400 text-center">
                            <span className="font-medium text-cyan-400">Demo Credentials:</span> admin / password
                        </p>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0) translateX(0);
                        opacity: 0;
                    }
                    50% {
                        transform: translateY(-20px) translateX(10px);
                        opacity: 0.5;
                    }
                }
                
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
                    20%, 40%, 60%, 80% { transform: translateX(2px); }
                }
                
                .animate-fadeInUp {
                    animation: fadeInUp 0.5s ease-out forwards;
                }
                
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                
                .animate-shake {
                    animation: shake 0.5s ease-in-out;
                }
                
                .animation-delay-200 {
                    animation-delay: 0.2s;
                }
                
                .animation-delay-1000 {
                    animation-delay: 1s;
                }
                
                .animation-delay-1500 {
                    animation-delay: 1.5s;
                }
                
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
            `}</style>
        </div>
    );
}