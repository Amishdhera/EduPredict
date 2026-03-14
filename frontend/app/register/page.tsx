// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { useAuth } from '@/context/AuthContext';
// import { UserPlus, AlertTriangle, Loader2, CheckCircle } from 'lucide-react';

// export default function RegisterPage() {
//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         password: '',
//         first_name: '',
//         last_name: '',
//         role: 'Student' as const
//     });
//     const [error, setError] = useState<string | null>(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const { register } = useAuth();

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setError(null);
//         setIsLoading(true);
//         try {
//             await register(formData);
//         } catch (err: any) {
//             setError(err.response?.data?.username?.[0] || 'Registration failed. Please try again.');
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-12">
//             <div className="w-full max-w-lg bg-slate-900/50 p-8 rounded-2xl border border-slate-700/50 backdrop-blur-sm shadow-xl">
//                 <div className="text-center mb-8">
//                     <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
//                     <p className="text-slate-400">Join EduPredict today</p>
//                 </div>

//                 {error && (
//                     <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400">
//                         <AlertTriangle className="w-5 h-5 flex-shrink-0" />
//                         <p className="text-sm">{error}</p>
//                     </div>
//                 )}

//                 <form onSubmit={handleSubmit} className="space-y-5">
//                     <div className="grid grid-cols-2 gap-4">
//                         <div>
//                             <label className="block text-sm font-medium text-slate-300 mb-1.5">First Name</label>
//                             <input
//                                 type="text"
//                                 value={formData.first_name}
//                                 onChange={e => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
//                                 className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-slate-300 mb-1.5">Last Name</label>
//                             <input
//                                 type="text"
//                                 value={formData.last_name}
//                                 onChange={e => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
//                                 className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none"
//                             />
//                         </div>
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-slate-300 mb-1.5">Username</label>
//                         <input
//                             type="text"
//                             value={formData.username}
//                             onChange={e => setFormData(prev => ({ ...prev, username: e.target.value }))}
//                             className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none"
//                             required
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
//                         <input
//                             type="email"
//                             value={formData.email}
//                             onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
//                             className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none"
//                             required
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-slate-300 mb-1.5">Role</label>
//                         <select
//                             value={formData.role}
//                             onChange={e => setFormData(prev => ({ ...prev, role: e.target.value as any }))}
//                             className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none"
//                         >
//                             <option value="Student">Student</option>
//                             <option value="Teacher">Teacher</option>
//                             <option value="Analyst">Analyst</option>
//                         </select>
//                         <p className="text-xs text-slate-500 mt-1">Select your primary role.</p>
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
//                         <input
//                             type="password"
//                             value={formData.password}
//                             onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
//                             className="w-full px-4 py-3 bg-slate-950/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none"
//                             required
//                             minLength={8}
//                         />
//                     </div>

//                     <button
//                         type="submit"
//                         disabled={isLoading}
//                         className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2"
//                     >
//                         {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <UserPlus className="w-5 h-5" />}
//                         Create Account
//                     </button>
//                 </form>

//                 <div className="mt-6 text-center">
//                     <p className="text-slate-400 text-sm">
//                         Already have an account?{' '}
//                         <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
//                             Sign In
//                         </Link>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// }
// app/register/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { 
    UserPlus, 
    AlertTriangle, 
    Loader2, 
    CheckCircle,
    GraduationCap,
    Mail,
    Lock,
    Eye,
    EyeOff,
    User,
    Users,
    BookOpen,
    Shield,
    Calendar,
    Phone,
    MapPin
} from 'lucide-react';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        first_name: '',
        last_name: '',
        role: 'student' as const,
        phone: '',
        dateOfBirth: '',
        address: '',
        institution: ''
    });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const { register } = useAuth();

    useEffect(() => {
        setMounted(true);
    }, []);

    // Password strength checker
    useEffect(() => {
        let strength = 0;
        if (formData.password.length >= 8) strength += 25;
        if (formData.password.match(/[a-z]+/)) strength += 25;
        if (formData.password.match(/[A-Z]+/)) strength += 25;
        if (formData.password.match(/[0-9]+/)) strength += 25;
        setPasswordStrength(strength);
    }, [formData.password]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }

        setIsLoading(true);
        
        // Simulate registration (replace with actual API call)
        setTimeout(() => {
            setSuccess("Registration successful! Please check your email to verify your account.");
            setIsLoading(false);
            // Reset form
            setFormData({
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                first_name: '',
                last_name: '',
                role: 'student',
                phone: '',
                dateOfBirth: '',
                address: '',
                institution: ''
            });
        }, 2000);
    };

    const getPasswordStrengthColor = () => {
        if (passwordStrength <= 25) return 'bg-red-500';
        if (passwordStrength <= 50) return 'bg-orange-500';
        if (passwordStrength <= 75) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    const getPasswordStrengthText = () => {
        if (passwordStrength <= 25) return 'Weak';
        if (passwordStrength <= 50) return 'Fair';
        if (passwordStrength <= 75) return 'Good';
        return 'Strong';
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-12 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute top-40 left-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="w-full max-w-2xl relative z-10">
                {/* Logo */}
                <div className="text-center mb-6 animate-fade-in-down">
                    <div className="inline-flex p-3 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl shadow-xl shadow-emerald-500/20 mb-3">
                        <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                        Join EduPredict
                    </h2>
                    <p className="text-sm text-slate-400">Create your account to get started</p>
                </div>

                {/* Main Card */}
                <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm shadow-2xl animate-fade-in-up">
                    {/* Success Message */}
                    {success && (
                        <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center gap-3 text-emerald-400 animate-shake">
                            <CheckCircle className="w-5 h-5 flex-shrink-0" />
                            <p className="text-sm">{success}</p>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400 animate-shake">
                            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                            <p className="text-sm">{error}</p>
                        </div>
                    )}

                    {/* Registration Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="block text-sm font-medium text-slate-300">
                                    First Name <span className="text-red-400">*</span>
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-4 w-4 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        value={formData.first_name}
                                        onChange={e => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
                                        className="w-full pl-9 pr-3 py-2.5 bg-slate-950/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none text-sm"
                                        placeholder="John"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-sm font-medium text-slate-300">
                                    Last Name <span className="text-red-400">*</span>
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-4 w-4 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        value={formData.last_name}
                                        onChange={e => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
                                        className="w-full pl-9 pr-3 py-2.5 bg-slate-950/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none text-sm"
                                        placeholder="Doe"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Username */}
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-slate-300">
                                Username <span className="text-red-400">*</span>
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Users className="h-4 w-4 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    value={formData.username}
                                    onChange={e => setFormData(prev => ({ ...prev, username: e.target.value }))}
                                    className="w-full pl-9 pr-3 py-2.5 bg-slate-950/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none text-sm"
                                    placeholder="johndoe123"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-slate-300">
                                Email <span className="text-red-400">*</span>
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-4 w-4 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                    className="w-full pl-9 pr-3 py-2.5 bg-slate-950/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none text-sm"
                                    placeholder="john.doe@example.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Phone & DOB */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="block text-sm font-medium text-slate-300">Phone Number</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Phone className="h-4 w-4 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                                    </div>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                        className="w-full pl-9 pr-3 py-2.5 bg-slate-950/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none text-sm"
                                        placeholder="+1 234 567 8900"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-sm font-medium text-slate-300">Date of Birth</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Calendar className="h-4 w-4 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                                    </div>
                                    <input
                                        type="date"
                                        value={formData.dateOfBirth}
                                        onChange={e => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                                        className="w-full pl-9 pr-3 py-2.5 bg-slate-950/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Institution & Role */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="block text-sm font-medium text-slate-300">Institution</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <GraduationCap className="h-4 w-4 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        value={formData.institution}
                                        onChange={e => setFormData(prev => ({ ...prev, institution: e.target.value }))}
                                        className="w-full pl-9 pr-3 py-2.5 bg-slate-950/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none text-sm"
                                        placeholder="University Name"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-sm font-medium text-slate-300">
                                    Role <span className="text-red-400">*</span>
                                </label>
                                <div className="relative group">
                                    <select
                                        value={formData.role}
                                        onChange={e => setFormData(prev => ({ ...prev, role: e.target.value as any }))}
                                        className="w-full px-3 py-2.5 bg-slate-950/50 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none text-sm appearance-none"
                                    >
                                        <option value="student">Student</option>
                                        <option value="teacher">Teacher</option>
                                        <option value="admin">Administrator</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-slate-300">Address</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MapPin className="h-4 w-4 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    value={formData.address}
                                    onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
                                    className="w-full pl-9 pr-3 py-2.5 bg-slate-950/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none text-sm"
                                    placeholder="123 Main St, City, Country"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-slate-300">
                                Password <span className="text-red-400">*</span>
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-4 w-4 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
                                    className="w-full pl-9 pr-10 py-2.5 bg-slate-950/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none text-sm"
                                    placeholder="••••••••"
                                    required
                                    minLength={8}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4 text-slate-500 hover:text-slate-400 transition-colors" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-slate-500 hover:text-slate-400 transition-colors" />
                                    )}
                                </button>
                            </div>
                            
                            {/* Password Strength Meter */}
                            {formData.password && (
                                <div className="mt-2 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                                                style={{ width: `${passwordStrength}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-xs text-slate-400">{getPasswordStrengthText()}</span>
                                    </div>
                                    <p className="text-xs text-slate-500">
                                        Use at least 8 characters with uppercase, lowercase and numbers
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-slate-300">
                                Confirm Password <span className="text-red-400">*</span>
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-4 w-4 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                                </div>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={formData.confirmPassword}
                                    onChange={e => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                    className="w-full pl-9 pr-10 py-2.5 bg-slate-950/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none text-sm"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-4 w-4 text-slate-500 hover:text-slate-400 transition-colors" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-slate-500 hover:text-slate-400 transition-colors" />
                                    )}
                                </button>
                            </div>
                            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                                <p className="text-xs text-red-400 mt-1">Passwords don't match</p>
                            )}
                        </div>

                        {/* Terms */}
                        <div className="flex items-start gap-2">
                            <input
                                type="checkbox"
                                id="terms"
                                className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-700 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0 focus:ring-offset-slate-900"
                                required
                            />
                            <label htmlFor="terms" className="text-xs text-slate-400">
                                I agree to the{' '}
                                <Link href="/terms" className="text-emerald-400 hover:text-emerald-300">
                                    Terms of Service
                                </Link>{' '}
                                and{' '}
                                <Link href="/privacy" className="text-emerald-400 hover:text-emerald-300">
                                    Privacy Policy
                                </Link>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-medium rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-emerald-500/25 text-sm"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Creating Account...
                                </>
                            ) : (
                                <>
                                    <UserPlus className="w-4 h-4" />
                                    Create Account
                                </>
                            )}
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="mt-6 text-center">
                        <p className="text-slate-400 text-sm">
                            Already have an account?{' '}
                            <Link 
                                href="/login" 
                                className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors relative group"
                            >
                                Sign In
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center mt-6 text-xs text-slate-600">
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