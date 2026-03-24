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
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { 
    UserPlus, 
    AlertTriangle, 
    Loader2, 
    CheckCircle, 
    Eye, 
    EyeOff,
    Mail,
    User,
    Briefcase,
    Lock,
    Shield,
    Sparkles,
    ArrowRight,
    GraduationCap,
    Users,
    BarChart3
} from 'lucide-react';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        first_name: '',
        last_name: '',
        role: 'Student' as const
    });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [passwordChecks, setPasswordChecks] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false
    });
    const { register } = useAuth();

    // Password strength checker
    useEffect(() => {
        const checks = {
            length: formData.password.length >= 8,
            uppercase: /[A-Z]/.test(formData.password),
            lowercase: /[a-z]/.test(formData.password),
            number: /[0-9]/.test(formData.password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password)
        };
        setPasswordChecks(checks);
        
        const strength = Object.values(checks).filter(Boolean).length;
        setPasswordStrength(strength);
    }, [formData.password]);

    const getPasswordStrengthText = () => {
        if (passwordStrength === 0) return '';
        if (passwordStrength <= 2) return 'Weak';
        if (passwordStrength <= 3) return 'Fair';
        if (passwordStrength <= 4) return 'Good';
        return 'Strong';
    };

    const getPasswordStrengthColor = () => {
        if (passwordStrength <= 2) return 'bg-red-500';
        if (passwordStrength <= 3) return 'bg-amber-500';
        if (passwordStrength <= 4) return 'bg-blue-500';
        return 'bg-green-500';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        
        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        
        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }
        
        if (passwordStrength < 3) {
            setError('Please create a stronger password (at least 3 requirements met)');
            return;
        }
        
        setIsLoading(true);
        try {
            await register({
                username: formData.username,
                email: formData.email,
                password: formData.password,
                first_name: formData.first_name,
                last_name: formData.last_name,
                role: formData.role
            });
            setSuccess('Account created successfully! Redirecting...');
            // Redirect will happen automatically via auth context
        } catch (err: any) {
            const errorMsg = err.response?.data?.username?.[0] || 
                            err.response?.data?.email?.[0] ||
                            err.response?.data?.password?.[0] ||
                            'Registration failed. Please try again.';
            setError(errorMsg);
            setIsLoading(false);
        }
    };

    const roleIcons = {
        Student: GraduationCap,
        Teacher: Users,
        Analyst: BarChart3
    };

    const RoleIcon = roleIcons[formData.role];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-12 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
                <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
                
                {/* Floating particles */}
                <div className="absolute top-20 left-10 w-1 h-1 bg-emerald-400 rounded-full animate-float"></div>
                <div className="absolute top-60 right-20 w-2 h-2 bg-cyan-400 rounded-full animate-float animation-delay-2000"></div>
                <div className="absolute bottom-40 left-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-float animation-delay-1500"></div>
            </div>

            <div className="w-full max-w-lg relative z-10">
                {/* Header */}
                <div className="text-center mb-8 animate-fadeInUp">
                    <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl shadow-lg shadow-emerald-500/20 mb-4">
                        <UserPlus className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
                        Create Account
                    </h1>
                    <p className="text-slate-400 flex items-center justify-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Join EduPredict and start predicting
                    </p>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-start gap-3 text-green-400 animate-slideDown">
                        <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <p className="text-sm font-medium">{success}</p>
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-400 animate-shake">
                        <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <p className="text-sm font-medium">{error}</p>
                        </div>
                    </div>
                )}

                {/* Registration Form */}
                <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl p-8 animate-fadeInUp animation-delay-200">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name Fields */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-300">
                                    First Name
                                </label>
                                <div className={`relative transition-all duration-200 ${
                                    focusedField === 'first_name' ? 'scale-[1.02]' : ''
                                }`}>
                                    <input
                                        type="text"
                                        value={formData.first_name}
                                        onChange={e => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
                                        onFocus={() => setFocusedField('first_name')}
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full px-4 py-3 bg-slate-950/50 border-2 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                                        placeholder="John"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-300">
                                    Last Name
                                </label>
                                <div className={`relative transition-all duration-200 ${
                                    focusedField === 'last_name' ? 'scale-[1.02]' : ''
                                }`}>
                                    <input
                                        type="text"
                                        value={formData.last_name}
                                        onChange={e => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
                                        onFocus={() => setFocusedField('last_name')}
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full px-4 py-3 bg-slate-950/50 border-2 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                                        placeholder="Doe"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Username */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-300 flex items-center gap-2">
                                <User className="w-4 h-4" />
                                Username
                            </label>
                            <div className={`relative transition-all duration-200 ${
                                focusedField === 'username' ? 'scale-[1.02]' : ''
                            }`}>
                                <input
                                    type="text"
                                    value={formData.username}
                                    onChange={e => setFormData(prev => ({ ...prev, username: e.target.value }))}
                                    onFocus={() => setFocusedField('username')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full px-4 py-3 bg-slate-950/50 border-2 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                                    placeholder="johndoe123"
                                    required
                                />
                                {formData.username && (
                                    <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                                )}
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-300 flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                Email Address
                            </label>
                            <div className={`relative transition-all duration-200 ${
                                focusedField === 'email' ? 'scale-[1.02]' : ''
                            }`}>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full px-4 py-3 bg-slate-950/50 border-2 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                                    placeholder="john@example.com"
                                    required
                                />
                                {formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                                    <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                                )}
                            </div>
                        </div>

                        {/* Role Selection */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-300 flex items-center gap-2">
                                <Briefcase className="w-4 h-4" />
                                Role
                            </label>
                            <div className="relative">
                                <select
                                    value={formData.role}
                                    onChange={e => setFormData(prev => ({ ...prev, role: e.target.value as any }))}
                                    className="w-full px-4 py-3 bg-slate-950/50 border-2 border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none appearance-none cursor-pointer"
                                >
                                    <option value="Student">Student</option>
                                    <option value="Teacher">Teacher</option>
                                    <option value="Analyst">Analyst</option>
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <RoleIcon className="w-5 h-5 text-slate-500" />
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                                <Shield className="w-3 h-3" />
                                Select your primary role in the system
                            </p>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-300 flex items-center gap-2">
                                <Lock className="w-4 h-4" />
                                Password
                            </label>
                            <div className={`relative transition-all duration-200 ${
                                focusedField === 'password' ? 'scale-[1.02]' : ''
                            }`}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full px-4 py-3 bg-slate-950/50 border-2 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none pr-12"
                                    placeholder="Create a strong password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            
                            {/* Password Strength Indicator */}
                            {formData.password && (
                                <div className="mt-2 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                                                style={{ width: `${(passwordStrength / 5) * 100}%` }}
                                            ></div>
                                        </div>
                                        <span className={`text-xs font-medium ${
                                            passwordStrength <= 2 ? 'text-red-400' :
                                            passwordStrength <= 3 ? 'text-amber-400' :
                                            passwordStrength <= 4 ? 'text-blue-400' :
                                            'text-green-400'
                                        }`}>
                                            {getPasswordStrengthText()}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <div className={`flex items-center gap-1 ${passwordChecks.length ? 'text-green-400' : 'text-slate-500'}`}>
                                            {passwordChecks.length ? <CheckCircle className="w-3 h-3" /> : <span className="w-3 h-3 border border-current rounded-full"></span>}
                                            <span>8+ characters</span>
                                        </div>
                                        <div className={`flex items-center gap-1 ${passwordChecks.uppercase ? 'text-green-400' : 'text-slate-500'}`}>
                                            {passwordChecks.uppercase ? <CheckCircle className="w-3 h-3" /> : <span className="w-3 h-3 border border-current rounded-full"></span>}
                                            <span>Uppercase</span>
                                        </div>
                                        <div className={`flex items-center gap-1 ${passwordChecks.lowercase ? 'text-green-400' : 'text-slate-500'}`}>
                                            {passwordChecks.lowercase ? <CheckCircle className="w-3 h-3" /> : <span className="w-3 h-3 border border-current rounded-full"></span>}
                                            <span>Lowercase</span>
                                        </div>
                                        <div className={`flex items-center gap-1 ${passwordChecks.number ? 'text-green-400' : 'text-slate-500'}`}>
                                            {passwordChecks.number ? <CheckCircle className="w-3 h-3" /> : <span className="w-3 h-3 border border-current rounded-full"></span>}
                                            <span>Number</span>
                                        </div>
                                        <div className={`flex items-center gap-1 col-span-2 ${passwordChecks.special ? 'text-green-400' : 'text-slate-500'}`}>
                                            {passwordChecks.special ? <CheckCircle className="w-3 h-3" /> : <span className="w-3 h-3 border border-current rounded-full"></span>}
                                            <span>Special character (!@#$%^&*)</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-300">
                                Confirm Password
                            </label>
                            <div className={`relative transition-all duration-200 ${
                                focusedField === 'confirmPassword' ? 'scale-[1.02]' : ''
                            }`}>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={formData.confirmPassword}
                                    onChange={e => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                    onFocus={() => setFocusedField('confirmPassword')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full px-4 py-3 bg-slate-950/50 border-2 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none pr-12"
                                    placeholder="Confirm your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                                <p className="text-xs text-red-400 mt-1">Passwords do not match</p>
                            )}
                            {formData.confirmPassword && formData.password === formData.confirmPassword && formData.password && (
                                <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3" />
                                    Passwords match
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden mt-6"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                            <span className="relative flex items-center justify-center gap-2">
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Creating account...
                                    </>
                                ) : (
                                    <>
                                        Create Account
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </span>
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="mt-6 pt-6 border-t border-slate-700/50 text-center">
                        <p className="text-slate-400 text-sm">
                            Already have an account?{' '}
                            <Link 
                                href="/login" 
                                className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors inline-flex items-center gap-1 group"
                            >
                                Sign In
                                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </p>
                    </div>

                    {/* Security Note */}
                    <div className="mt-4 p-3 bg-slate-800/30 rounded-lg border border-slate-700/30">
                        <p className="text-xs text-slate-400 text-center flex items-center justify-center gap-2">
                            <Shield className="w-3 h-3" />
                            Your information is secure and encrypted
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
                
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
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
                
                .animate-slideDown {
                    animation: slideDown 0.3s ease-out;
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