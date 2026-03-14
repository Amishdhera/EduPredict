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
// app/login/page.tsx
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
    Mail,
    Lock,
    Eye,
    EyeOff,
    Shield,
    BookOpen,
    Users
} from 'lucide-react';

export default function LoginPage() {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { login, isLoading } = useAuth();

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            await login(credentials);
        } catch (err: unknown) {
            setError('Invalid credentials. Please try again.');
        }
    };

    // Demo credentials for different roles
    const demoAccounts = [
        { role: 'Admin', username: 'admin', password: 'admin123', icon: Shield, color: 'purple' },
        { role: 'Teacher', username: 'teacher', password: 'teacher123', icon: BookOpen, color: 'blue' },
        { role: 'Student', username: 'student', password: 'student123', icon: Users, color: 'green' },
    ];

    const fillDemoCredentials = (username: string, password: string) => {
        setCredentials({ username, password });
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute top-40 left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo */}
                <div className="text-center mb-8 animate-fade-in-down">
                    <div className="inline-flex p-4 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl shadow-xl shadow-cyan-500/20 mb-4">
                        <GraduationCap className="w-12 h-12 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
                        EduPredict
                    </h1>
                    <p className="text-slate-400">Student Retention System</p>
                </div>

                {/* Main Card */}
                <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-700/50 backdrop-blur-sm shadow-2xl animate-fade-in-up">
                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400 animate-shake">
                            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                            <p className="text-sm">{error}</p>
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-300">
                                Username
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    value={credentials.username}
                                    onChange={e => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-950/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none"
                                    placeholder="Enter your username"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-300">
                                Password
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={credentials.password}
                                    onChange={e => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                                    className="w-full pl-10 pr-12 py-3 bg-slate-950/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-slate-500 hover:text-slate-400 transition-colors" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-slate-500 hover:text-slate-400 transition-colors" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 focus:ring-offset-slate-900"
                                />
                                <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                                    Remember me
                                </span>
                            </label>
                            <Link
                                href="/forgot-password"
                                className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-cyan-500/25"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5" />
                                    Sign In
                                </>
                            )}
                        </button>
                    </form>

                    {/* Demo Accounts */}
                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-700"></div>
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="px-2 bg-slate-900/50 text-slate-500">Demo Accounts</span>
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-3 gap-2">
                            {demoAccounts.map((account) => {
                                const Icon = account.icon;
                                const colors = {
                                    purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-300 hover:from-purple-500/30 hover:to-purple-600/30',
                                    blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-300 hover:from-blue-500/30 hover:to-blue-600/30',
                                    green: 'from-green-500/20 to-green-600/20 border-green-500/30 text-green-300 hover:from-green-500/30 hover:to-green-600/30',
                                };
                                
                                return (
                                    <button
                                        key={account.role}
                                        onClick={() => fillDemoCredentials(account.username, account.password)}
                                        className={`p-3 rounded-lg bg-gradient-to-br ${colors[account.color as keyof typeof colors]} border transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-1 group`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span className="text-xs font-medium">{account.role}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Register Link */}
                    <div className="mt-6 text-center">
                        <p className="text-slate-400 text-sm">
                            Don't have an account?{' '}
                            <Link 
                                href="/register" 
                                className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors relative group"
                            >
                                Register
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center mt-8 text-xs text-slate-600">
                    © 2024 EduPredict. All rights reserved.
                </p>
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                @keyframes fade-in-down {
                    0% { opacity: 0; transform: translateY(-20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-down {
                    animation: fade-in-down 0.6s ease-out;
                }
                @keyframes fade-in-up {
                    0% { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out;
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }
                .animate-shake {
                    animation: shake 0.6s ease-in-out;
                }
            `}</style>
        </div>
    );
}