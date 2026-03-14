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


// components/Navbar.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
    GraduationCap,
    LayoutDashboard,
    Upload,
    LogOut,
    Bell,
    MessageSquare,
    Users,
    Settings,
    BookOpen,
    UserCircle,
    ChevronDown,
    Menu,
    X,
    FileText,
    BarChart3,
    AlertTriangle,
    Shield
} from 'lucide-react';

export default function Navbar() {
    const pathname = usePathname();
    const { logout, user } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    const isActive = (path: string) => pathname === path;

    // Role-based styling
    const getRoleBadge = () => {
        switch(user?.role) {
            case 'admin':
                return (
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        Admin
                    </span>
                );
            case 'teacher':
                return (
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        Teacher
                    </span>
                );
            case 'student':
                return (
                    <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-medium flex items-center gap-1">
                        <UserCircle className="w-3 h-3" />
                        Student
                    </span>
                );
            default:
                return null;
        }
    };

    // Navigation items based on role
    const getNavItems = () => {
        const items = [
            {
                path: '/',
                label: 'Dashboard',
                icon: LayoutDashboard,
                roles: ['admin', 'teacher', 'student']
            },
            {
                path: '/analytics',
                label: 'Analytics',
                icon: BarChart3,
                roles: ['admin', 'teacher']
            },
            {
                path: '/students',
                label: 'Students',
                icon: Users,
                roles: ['admin', 'teacher']
            },
            {
                path: '/upload',
                label: 'Batch Upload',
                icon: Upload,
                roles: ['admin']
            },
            {
                path: '/reports',
                label: 'Reports',
                icon: FileText,
                roles: ['admin', 'teacher']
            },
            {
                path: '/my-progress',
                label: 'My Progress',
                icon: BarChart3,
                roles: ['student']
            },
            {
                path: '/notifications',
                label: 'Alerts',
                icon: Bell,
                roles: ['admin', 'teacher', 'student']
            },
            {
                path: '/support',
                label: 'Support',
                icon: MessageSquare,
                roles: ['admin', 'teacher', 'student']
            }
        ];

        return items.filter(item => item.roles.includes(user?.role || ''));
    };

    const navItems = getNavItems();

    return (
        <>
            <header className="bg-slate-900/95 backdrop-blur-xl border-b border-slate-800/50 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo Section */}
                        <div className="flex items-center gap-3">
                            <Link href="/" className="flex items-center gap-3 group">
                                <div className="p-2 bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500 rounded-xl group-hover:shadow-lg group-hover:shadow-cyan-500/25 transition-all duration-300">
                                    <GraduationCap className="w-6 h-6 text-white" />
                                </div>
                                <div className="hidden sm:block">
                                    <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                                        EduPredict
                                    </h1>
                                    <p className="text-xs text-slate-500">
                                        Student Retention System
                                    </p>
                                </div>
                            </Link>

                            {/* Role Badge - Mobile */}
                            <div className="block sm:hidden">
                                {getRoleBadge()}
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        {user && (
                            <>
                                <nav className="hidden md:flex items-center gap-1">
                                    {navItems.map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <Link
                                                key={item.path}
                                                href={item.path}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 group relative
                                                    ${isActive(item.path)
                                                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white border border-cyan-500/30'
                                                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                                                    }`}
                                            >
                                                <Icon className={`w-4 h-4 ${isActive(item.path) ? 'text-cyan-400' : 'group-hover:text-cyan-400 transition-colors'}`} />
                                                {item.label}
                                                {item.label === 'Alerts' && (
                                                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                                                )}
                                            </Link>
                                        );
                                    })}
                                </nav>

                                {/* Right Section */}
                                <div className="flex items-center gap-3">
                                    {/* Role Badge - Desktop */}
                                    <div className="hidden sm:block">
                                        {getRoleBadge()}
                                    </div>

                                    {/* Profile Menu */}
                                    <div className="relative">
                                        <button
                                            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-all duration-200 group"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                                                <UserCircle className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="hidden lg:block text-left">
                                                <p className="text-sm font-medium text-white">
                                                    {user?.username || 'User'}
                                                </p>
                                                <p className="text-xs text-slate-500">
                                                    {user?.email || 'user@edupredict.com'}
                                                </p>
                                            </div>
                                            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        {/* Profile Dropdown */}
                                        {isProfileMenuOpen && (
                                            <>
                                                <div
                                                    className="fixed inset-0 z-40"
                                                    onClick={() => setIsProfileMenuOpen(false)}
                                                />
                                                <div className="absolute right-0 mt-2 w-64 bg-slate-800 rounded-xl border border-slate-700 shadow-xl z-50 overflow-hidden">
                                                    <div className="p-4 border-b border-slate-700">
                                                        <p className="text-sm font-medium text-white">{user?.username}</p>
                                                        <p className="text-xs text-slate-400 mt-1">{user?.email}</p>
                                                        <div className="mt-2">
                                                            {getRoleBadge()}
                                                        </div>
                                                    </div>
                                                    <div className="p-2">
                                                        <Link
                                                            href="/profile"
                                                            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all"
                                                            onClick={() => setIsProfileMenuOpen(false)}
                                                        >
                                                            <UserCircle className="w-4 h-4" />
                                                            Profile Settings
                                                        </Link>
                                                        <Link
                                                            href="/settings"
                                                            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all"
                                                            onClick={() => setIsProfileMenuOpen(false)}
                                                        >
                                                            <Settings className="w-4 h-4" />
                                                            Preferences
                                                        </Link>
                                                    </div>
                                                    <div className="p-2 border-t border-slate-700">
                                                        <button
                                                            onClick={() => {
                                                                setIsProfileMenuOpen(false);
                                                                logout();
                                                            }}
                                                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                                                        >
                                                            <LogOut className="w-4 h-4" />
                                                            Logout
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* Mobile Menu Button */}
                                    <button
                                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                        className="md:hidden p-2 rounded-lg hover:bg-slate-800/50 transition-all"
                                    >
                                        {isMobileMenuOpen ? (
                                            <X className="w-5 h-5 text-slate-400" />
                                        ) : (
                                            <Menu className="w-5 h-5 text-slate-400" />
                                        )}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && user && (
                    <div className="md:hidden border-t border-slate-800 bg-slate-900/95 backdrop-blur-xl">
                        <nav className="max-w-7xl mx-auto px-4 py-3 space-y-1">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.path}
                                        href={item.path}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 relative
                                            ${isActive(item.path)
                                                ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white border border-cyan-500/30'
                                                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                                            }`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <Icon className={`w-5 h-5 ${isActive(item.path) ? 'text-cyan-400' : ''}`} />
                                        {item.label}
                                        {item.label === 'Alerts' && (
                                            <span className="ml-auto w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                )}
            </header>

            {/* Breadcrumb */}
            {user && (
                <div className="bg-slate-900/50 border-b border-slate-800/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
                        <div className="flex items-center gap-2 text-sm">
                            <Link href="/" className="text-slate-500 hover:text-cyan-400 transition-colors">
                                Home
                            </Link>
                            <span className="text-slate-600">/</span>
                            <span className="text-slate-300 capitalize">
                                {pathname === '/' ? 'Dashboard' : pathname.slice(1)}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}