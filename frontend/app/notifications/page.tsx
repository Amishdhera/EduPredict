
'use client';

import React, { useEffect, useState } from 'react';
import { notificationApi, Notification } from '@/lib/api';
import { 
    Bell, 
    CheckCircle, 
    Info, 
    AlertTriangle, 
    AlertOctagon, 
    Check,
    Filter,
    Trash2,
    Calendar,
    ChevronDown,
    ChevronUp,
    Loader2,
    Mail,
    MailCheck,
    RefreshCw
} from 'lucide-react';

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadNotifications();
    }, []);

    const loadNotifications = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await notificationApi.getNotifications();
            // Ensure data is an array
            const notificationsArray = Array.isArray(data) ? data : data?.notifications || data?.data || [];
            setNotifications(notificationsArray);
        } catch (err: any) {
            console.error('Failed to load notifications:', err);
            setError(err.message || 'Failed to load notifications');
            // Set empty array to prevent filter errors
            setNotifications([]);
        } finally {
            setIsLoading(false);
        }
    };

    const markRead = async (id: number) => {
        try {
            await notificationApi.markRead(id);
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
        } catch (err) {
            console.error(err);
        }
    };

    const markAllRead = async () => {
        try {
            await notificationApi.markAllRead();
            setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
        } catch (err) {
            console.error(err);
        }
    };

    const deleteNotification = async (id: number) => {
        try {
            await notificationApi.deleteNotification(id);
            setNotifications(prev => prev.filter(n => n.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-400" />;
            case 'error': return <AlertOctagon className="w-5 h-5 text-red-400" />;
            case 'success': return <CheckCircle className="w-5 h-5 text-green-400" />;
            default: return <Info className="w-5 h-5 text-blue-400" />;
        }
    };

    const getTypeStyles = (type: string) => {
        switch (type) {
            case 'warning':
                return {
                    bg: 'bg-amber-500/10',
                    border: 'border-amber-500/20',
                    glow: 'shadow-amber-500/10'
                };
            case 'error':
                return {
                    bg: 'bg-red-500/10',
                    border: 'border-red-500/20',
                    glow: 'shadow-red-500/10'
                };
            case 'success':
                return {
                    bg: 'bg-green-500/10',
                    border: 'border-green-500/20',
                    glow: 'shadow-green-500/10'
                };
            default:
                return {
                    bg: 'bg-blue-500/10',
                    border: 'border-blue-500/20',
                    glow: 'shadow-blue-500/10'
                };
        }
    };

    // Safely filter notifications - ensure it's an array first
    const filteredNotifications = Array.isArray(notifications) ? notifications.filter(notification => {
        if (filter === 'unread') return !notification.is_read;
        if (filter === 'read') return notification.is_read;
        return true;
    }) : [];

    const unreadCount = Array.isArray(notifications) ? notifications.filter(n => !n.is_read).length : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-20 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl shadow-lg shadow-cyan-500/20">
                                <Bell className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                                    Notifications
                                </h1>
                                <p className="text-slate-400 text-sm mt-1">
                                    Stay updated with system alerts and important updates
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            {unreadCount > 0 && (
                                <div className="px-3 py-1.5 bg-cyan-500/20 rounded-lg border border-cyan-500/30">
                                    <span className="text-cyan-400 text-sm font-medium">
                                        {unreadCount} unread
                                    </span>
                                </div>
                            )}
                            
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="px-3 py-2 bg-slate-800/50 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-all flex items-center gap-2"
                            >
                                <Filter className="w-4 h-4" />
                                <span className="text-sm">Filter</span>
                                {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                            
                            <button
                                onClick={markAllRead}
                                disabled={unreadCount === 0}
                                className="px-4 py-2 bg-slate-800/50 hover:bg-slate-800 text-white rounded-lg text-sm font-medium transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <MailCheck className="w-4 h-4" />
                                Mark all read
                            </button>

                            <button
                                onClick={loadNotifications}
                                disabled={isLoading}
                                className="p-2 bg-slate-800/50 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-all disabled:opacity-50"
                            >
                                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                            </button>
                        </div>
                    </div>

                    {/* Filter Bar */}
                    {showFilters && (
                        <div className="mt-4 p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 animate-slideDown">
                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={() => setFilter('all')}
                                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                                        filter === 'all'
                                            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                                            : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                                    }`}
                                >
                                    All
                                </button>
                                <button
                                    onClick={() => setFilter('unread')}
                                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                                        filter === 'unread'
                                            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                                            : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                                    }`}
                                >
                                    Unread
                                </button>
                                <button
                                    onClick={() => setFilter('read')}
                                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                                        filter === 'read'
                                            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                                            : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                                    }`}
                                >
                                    Read
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Error Display */}
                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-400">
                        <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <p className="text-sm font-medium">Failed to load notifications</p>
                            <p className="text-sm opacity-90">{error}</p>
                        </div>
                        <button
                            onClick={loadNotifications}
                            className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-sm"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* Notifications List */}
                <div className="space-y-3">
                    {isLoading ? (
                        <div className="text-center py-16">
                            <Loader2 className="w-12 h-12 text-slate-600 animate-spin mx-auto mb-4" />
                            <p className="text-slate-400">Loading notifications...</p>
                        </div>
                    ) : filteredNotifications.length === 0 ? (
                        <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
                            <div className="inline-flex p-4 bg-slate-800/50 rounded-full mb-4">
                                <Bell className="w-12 h-12 text-slate-600" />
                            </div>
                            <p className="text-slate-400 text-lg font-medium mb-1">No notifications yet</p>
                            <p className="text-slate-500 text-sm">
                                {filter !== 'all' ? `No ${filter} notifications found` : 'Check back later for updates and alerts'}
                            </p>
                            {filter !== 'all' && (
                                <button
                                    onClick={() => setFilter('all')}
                                    className="mt-4 px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg text-sm transition-all"
                                >
                                    Show all notifications
                                </button>
                            )}
                        </div>
                    ) : (
                        <>
                            {filteredNotifications.map((notification, index) => {
                                const typeStyles = getTypeStyles(notification.type);
                                const isExpanded = expandedId === notification.id;
                                
                                return (
                                    <div
                                        key={notification.id}
                                        className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:scale-[1.01] ${
                                            notification.is_read
                                                ? 'bg-slate-900/30 border-slate-700/30 opacity-80'
                                                : `bg-slate-800/50 border-slate-700 shadow-lg ${typeStyles.glow} animate-slideIn`
                                        }`}
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        {/* Gradient Border Effect */}
                                        {!notification.is_read && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        )}
                                        
                                        <div className="relative p-5">
                                            <div className="flex gap-4">
                                                {/* Icon Section */}
                                                <div className={`p-3 rounded-xl h-fit ${typeStyles.bg} border ${typeStyles.border}`}>
                                                    {getIcon(notification.type)}
                                                </div>
                                                
                                                {/* Content Section */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-4 flex-wrap">
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <h3 className={`font-semibold ${
                                                                    notification.is_read ? 'text-slate-400' : 'text-white'
                                                                }`}>
                                                                    {notification.title}
                                                                </h3>
                                                                {!notification.is_read && (
                                                                    <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 text-xs rounded-full">
                                                                        New
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <p className={`text-sm mt-1 ${
                                                                isExpanded ? 'text-slate-300' : 'text-slate-400 line-clamp-2'
                                                            }`}>
                                                                {notification.message}
                                                            </p>
                                                            
                                                            {/* Expand/Collapse for long messages */}
                                                            {notification.message && notification.message.length > 150 && (
                                                                <button
                                                                    onClick={() => setExpandedId(isExpanded ? null : notification.id)}
                                                                    className="mt-2 text-xs text-cyan-400 hover:text-cyan-300 font-medium"
                                                                >
                                                                    {isExpanded ? 'Show less' : 'Read more'}
                                                                </button>
                                                            )}
                                                        </div>
                                                        
                                                        {/* Actions Section */}
                                                        <div className="flex flex-col items-end gap-2">
                                                            <span className="text-xs text-slate-500 flex items-center gap-1 whitespace-nowrap">
                                                                <Calendar className="w-3 h-3" />
                                                                {notification.created_at 
                                                                    ? new Date(notification.created_at).toLocaleDateString(undefined, {
                                                                        month: 'short',
                                                                        day: 'numeric',
                                                                        hour: '2-digit',
                                                                        minute: '2-digit'
                                                                    })
                                                                    : 'Unknown date'
                                                                }
                                                            </span>
                                                            
                                                            <div className="flex items-center gap-2">
                                                                {!notification.is_read && (
                                                                    <button
                                                                        onClick={() => markRead(notification.id)}
                                                                        className="px-3 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-lg text-xs font-medium transition-all flex items-center gap-1"
                                                                    >
                                                                        <Check className="w-3 h-3" />
                                                                        Mark read
                                                                    </button>
                                                                )}
                                                                <button
                                                                    onClick={() => deleteNotification(notification.id)}
                                                                    className="p-1.5 hover:bg-red-500/10 rounded-lg text-slate-500 hover:text-red-400 transition-all"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Unread Indicator */}
                                        {!notification.is_read && (
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 to-blue-500"></div>
                                        )}
                                    </div>
                                );
                            })}
                        </>
                    )}
                </div>

                {/* Footer Stats */}
                {notifications.length > 0 && !isLoading && (
                    <div className="mt-6 pt-4 border-t border-slate-700/50 flex items-center justify-between text-sm">
                        <div className="text-slate-500">
                            Total: {notifications.length} notifications
                        </div>
                        <div className="text-slate-500 flex items-center gap-2">
                            <Mail className="w-3 h-3" />
                            Showing: {filteredNotifications.length} of {notifications.length}
                        </div>
                    </div>
                )}
            </div>

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
                
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateX(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                .animate-slideDown {
                    animation: slideDown 0.3s ease-out;
                }
                
                .animate-slideIn {
                    animation: slideIn 0.4s ease-out forwards;
                    opacity: 0;
                }
            `}</style>
        </div>
    );
}