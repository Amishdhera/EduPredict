// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { useAuth } from '@/context/AuthContext';
// import { GraduationCap, LayoutDashboard, Upload, LogOut, FileText, Bell, MessageSquare } from 'lucide-react';

// export default function Navbar() {
//     const pathname = usePathname();
//     const { logout, user } = useAuth();

//     const isActive = (path: string) => pathname === path;

//     return (
//         <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex items-center justify-between h-16">
//                     <div className="flex items-center gap-3">
//                         <Link href="/" className="flex items-center gap-3 group">
//                             <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl group-hover:shadow-lg group-hover:shadow-cyan-500/20 transition-all">
//                                 <GraduationCap className="w-6 h-6 text-white" />
//                             </div>
//                             <div>
//                                 <h1 className="text-xl font-bold text-white">EduPredict</h1>
//                                 <p className="text-xs text-slate-400">Student Retention System</p>
//                             </div>
//                         </Link>
//                     </div>

//                     {user && (
//                         <nav className="flex items-center gap-1">
//                             <Link
//                                 href="/"
//                                 className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2
//                                     ${isActive('/')
//                                         ? 'bg-slate-800 text-white'
//                                         : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
//                             >
//                                 <LayoutDashboard className="w-4 h-4" />
//                                 Dashboard
//                             </Link>
//                             <Link
//                                 href="/upload"
//                                 className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2
//                                     ${isActive('/upload')
//                                         ? 'bg-slate-800 text-white'
//                                         : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
//                             >
//                                 <Upload className="w-4 h-4" />
//                                 Batch Upload
//                             </Link>
//                             <Link
//                                 href="/notifications"
//                                 className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2
//                                     ${isActive('/notifications')
//                                         ? 'bg-slate-800 text-white'
//                                         : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
//                             >
//                                 <Bell className="w-4 h-4" />
//                                 Alerts
//                             </Link>
//                             <Link
//                                 href="/support"
//                                 className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2
//                                     ${isActive('/support')
//                                         ? 'bg-slate-800 text-white'
//                                         : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
//                             >
//                                 <MessageSquare className="w-4 h-4" />
//                                 Support
//                             </Link>

//                             <div className="w-px h-6 bg-slate-700 mx-2" />

//                             <button
//                                 onClick={logout}
//                                 className="px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
//                             >
//                                 <LogOut className="w-4 h-4" />
//                                 Logout
//                             </button>
//                         </nav>
//                     )}
//                 </div>
//             </div>
//         </header>
//     );
// }


'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
    GraduationCap, 
    LayoutDashboard, 
    Upload, 
    LogOut, 
    FileText, 
    Bell, 
    MessageSquare,
    Menu,
    X,
    User,
    ChevronDown,
    Sparkles,
    Shield,
    Zap
} from 'lucide-react';

export default function Navbar() {
    const pathname = usePathname();
    const { logout, user } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [notifications, setNotifications] = useState(3); // Example notification count

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path: string) => pathname === path;

    const navItems = [
        { path: '/', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/upload', label: 'Batch Upload', icon: Upload },
        { path: '/notifications', label: 'Alerts', icon: Bell, badge: notifications },
        { path: '/support', label: 'Support', icon: MessageSquare },
    ];

    return (
        <>
            <header className={`
                fixed top-0 w-full z-50 transition-all duration-300
                ${scrolled 
                    ? 'bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 shadow-lg' 
                    : 'bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/30'
                }
            `}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo Section */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                                <div className="relative p-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl group-hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-cyan-500/30">
                                    <GraduationCap className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div className="hidden sm:block">
                                <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                                    EduPredict
                                </h1>
                                <p className="text-xs text-slate-400 flex items-center gap-1">
                                    <Sparkles className="w-3 h-3" />
                                    Student Retention System
                                </p>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        {user && (
                            <>
                                <nav className="hidden md:flex items-center gap-1">
                                    {navItems.map((item) => {
                                        const Icon = item.icon;
                                        const active = isActive(item.path);
                                        return (
                                            <Link
                                                key={item.path}
                                                href={item.path}
                                                className={`
                                                    relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                                                    flex items-center gap-2 group
                                                    ${active
                                                        ? 'text-white bg-gradient-to-r from-slate-800 to-slate-800/80 shadow-lg'
                                                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                                                    }
                                                `}
                                            >
                                                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${active ? 'text-cyan-400' : ''}`} />
                                                <span>{item.label}</span>
                                                {item.badge && item.badge > 0 && (
                                                    <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full animate-pulse">
                                                        {item.badge}
                                                    </span>
                                                )}
                                                {active && (
                                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
                                                )}
                                            </Link>
                                        );
                                    })}

                                    <div className="w-px h-6 bg-gradient-to-b from-transparent via-slate-600 to-transparent mx-2" />

                                    {/* User Profile Dropdown */}
                                    <div className="relative ml-2">
                                        <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-all group">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg">
                                                <User className="w-4 h-4 text-white" />
                                            </div>
                                            <div className="hidden lg:block text-left">
                                                <p className="text-sm font-medium text-white">
                                                    {user?.email?.split('@')[0] || 'User'}
                                                </p>
                                                <p className="text-xs text-slate-400">Admin</p>
                                            </div>
                                            <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                                        </button>
                                    </div>

                                    <button
                                        onClick={logout}
                                        className="ml-2 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg text-sm font-medium transition-all flex items-center gap-2 group"
                                    >
                                        <LogOut className="w-4 h-4 transition-transform group-hover:scale-110" />
                                        <span className="hidden lg:inline">Logout</span>
                                    </button>
                                </nav>

                                {/* Mobile Menu Button */}
                                <button
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    className="md:hidden p-2 rounded-lg hover:bg-slate-800/50 transition-all"
                                >
                                    {isMobileMenuOpen ? (
                                        <X className="w-6 h-6 text-white" />
                                    ) : (
                                        <Menu className="w-6 h-6 text-white" />
                                    )}
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Menu */}
                {user && isMobileMenuOpen && (
                    <div className="md:hidden bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 animate-slideDown">
                        <div className="px-4 py-3 space-y-1">
                            {/* User Info */}
                            <div className="flex items-center gap-3 px-3 py-3 mb-2 bg-slate-800/30 rounded-xl">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                                    <User className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-white">
                                        {user?.email?.split('@')[0] || 'User'}
                                    </p>
                                    <p className="text-xs text-slate-400">{user?.email}</p>
                                </div>
                            </div>

                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const active = isActive(item.path);
                                return (
                                    <Link
                                        key={item.path}
                                        href={item.path}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`
                                            flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                                            ${active
                                                ? 'bg-gradient-to-r from-slate-800 to-slate-800/80 text-white'
                                                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                                            }
                                        `}
                                    >
                                        <Icon className={`w-5 h-5 ${active ? 'text-cyan-400' : ''}`} />
                                        <span className="font-medium">{item.label}</span>
                                        {item.badge && item.badge > 0 && (
                                            <span className="ml-auto px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                                                {item.badge}
                                            </span>
                                        )}
                                    </Link>
                                );
                            })}

                            <div className="h-px bg-slate-700/50 my-2" />

                            <button
                                onClick={() => {
                                    logout();
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
                            >
                                <LogOut className="w-5 h-5" />
                                <span className="font-medium">Logout</span>
                            </button>
                        </div>
                    </div>
                )}
            </header>

            {/* Spacer to prevent content from hiding under fixed header */}
            <div className="h-16"></div>

            <style jsx>{`
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
                .animate-slideDown {
                    animation: slideDown 0.2s ease-out;
                }
            `}</style>
        </>
    );
}