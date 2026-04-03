// 'use client';

// import React, { useEffect, useState } from 'react';
// import { supportApi, SupportTicket } from '@/lib/api';
// import { MessageSquare, Plus, Loader2 } from 'lucide-react';

// export default function SupportPage() {
//     const [tickets, setTickets] = useState<SupportTicket[]>([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [isCreating, setIsCreating] = useState(false);
//     const [formData, setFormData] = useState({ subject: '', message: '' });
//     const [sending, setSending] = useState(false);

//     useEffect(() => {
//         loadTickets();
//     }, []);

//     const loadTickets = async () => {
//         setIsLoading(true);
//         try {
//             const data = await supportApi.getTickets();
//             setTickets(data);
//         } catch (err) {
//             console.error(err);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setSending(true);
//         try {
//             const newTicket = await supportApi.createTicket(formData);
//             setTickets([newTicket, ...tickets]);
//             setIsCreating(false);
//             setFormData({ subject: '', message: '' });
//         } catch (err) {
//             console.error(err);
//         } finally {
//             setSending(false);
//         }
//     };

//     const getStatusColor = (status: string) => {
//         switch (status) {
//             case 'Open': return 'bg-cyan-500/20 text-cyan-400';
//             case 'In Progress': return 'bg-blue-500/20 text-blue-400';
//             case 'Resolved': return 'bg-green-500/20 text-green-400';
//             case 'Closed': return 'bg-slate-700 text-slate-400';
//             default: return 'bg-slate-700 text-slate-400';
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4">
//             <div className="max-w-4xl mx-auto">
//                 <div className="flex items-center justify-between mb-8">
//                     <div>
//                         <h1 className="text-3xl font-bold text-white mb-2">Support Center</h1>
//                         <p className="text-slate-400">Track issues and request assistance</p>
//                     </div>
//                     <button
//                         onClick={() => setIsCreating(!isCreating)}
//                         className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-medium hover:from-cyan-600 hover:to-blue-600 transition-all flex items-center gap-2"
//                     >
//                         {isCreating ? 'Cancel' : (
//                             <>
//                                 <Plus className="w-5 h-5" />
//                                 New Ticket
//                             </>
//                         )}
//                     </button>
//                 </div>

//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                     {/* Create Ticket Form */}
//                     {isCreating && (
//                         <div className="lg:col-span-1">
//                             <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm sticky top-24">
//                                 <h3 className="text-lg font-semibold text-white mb-4">New Request</h3>
//                                 <form onSubmit={handleSubmit} className="space-y-4">
//                                     <div>
//                                         <label className="block text-sm font-medium text-slate-300 mb-1.5">Subject</label>
//                                         <input
//                                             type="text"
//                                             value={formData.subject}
//                                             onChange={e => setFormData(prev => ({ ...prev, subject: e.target.value }))}
//                                             className="w-full px-4 py-2 bg-slate-950/50 border border-slate-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-cyan-500"
//                                             required
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium text-slate-300 mb-1.5">Message</label>
//                                         <textarea
//                                             value={formData.message}
//                                             onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
//                                             className="w-full px-4 py-2 bg-slate-950/50 border border-slate-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-cyan-500 min-h-[150px]"
//                                             required
//                                         />
//                                     </div>
//                                     <button
//                                         type="submit"
//                                         disabled={sending}
//                                         className="w-full py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2"
//                                     >
//                                         {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Submit Ticket'}
//                                     </button>
//                                 </form>
//                             </div>
//                         </div>
//                     )}

//                     {/* Ticket List */}
//                     <div className={isCreating ? 'lg:col-span-2' : 'lg:col-span-3'}>
//                         {isLoading ? (
//                             <div className="text-center py-12 text-slate-500">Loading tickets...</div>
//                         ) : tickets.length === 0 ? (
//                             <div className="text-center py-12 bg-slate-900/50 rounded-2xl border border-slate-700/50">
//                                 <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-4" />
//                                 <p className="text-slate-400">No support tickets found.</p>
//                             </div>
//                         ) : (
//                             <div className="space-y-4">
//                                 {tickets.map(ticket => (
//                                     <div key={ticket.id} className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-all">
//                                         <div className="flex items-center justify-between mb-2">
//                                             <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
//                                                 {ticket.status}
//                                             </span>
//                                             <span className="text-xs text-slate-500">
//                                                 {new Date(ticket.created_at).toLocaleDateString()}
//                                             </span>
//                                         </div>
//                                         <h3 className="text-lg font-semibold text-white mb-2">{ticket.subject}</h3>
//                                         <p className="text-slate-400 text-sm">{ticket.message}</p>
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
'use client';

import React, { useEffect, useState } from 'react';
import { supportApi, SupportTicket } from '@/lib/api';
import { 
    MessageSquare, 
    Plus, 
    Loader2, 
    X,
    CheckCircle,
    Clock,
    AlertCircle,
    Send,
    Paperclip,
    User,
    Calendar,
    Filter,
    ChevronDown,
    ChevronUp,
    Search,
    RefreshCw,
    HelpCircle,
    Phone,
    Mail,
    Clock3
} from 'lucide-react';

export default function SupportPage() {
    const [tickets, setTickets] = useState<SupportTicket[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [formData, setFormData] = useState({ subject: '', message: '' });
    const [sending, setSending] = useState(false);
    const [filter, setFilter] = useState<'all' | 'open' | 'in_progress' | 'resolved' | 'closed'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedTicket, setExpandedTicket] = useState<number | null>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadTickets();
    }, []);

    const loadTickets = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await supportApi.getTickets();
            // Ensure data is an array
            const ticketsArray = Array.isArray(data) ? data : data?.tickets || data?.data || [];
            setTickets(ticketsArray);
            setLastUpdated(new Date());
        } catch (err: any) {
            console.error('Failed to load tickets:', err);
            setError(err.message || 'Failed to load tickets');
            setTickets([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.subject.trim() || !formData.message.trim()) return;
        
        setSending(true);
        setError(null);
        try {
            const newTicket = await supportApi.createTicket(formData);
            setTickets(prev => [newTicket, ...(Array.isArray(prev) ? prev : [])]);
            setIsCreating(false);
            setFormData({ subject: '', message: '' });
        } catch (err: any) {
            console.error('Failed to create ticket:', err);
            setError(err.message || 'Failed to create ticket');
        } finally {
            setSending(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Open': 
                return {
                    bg: 'bg-cyan-500/10',
                    text: 'text-cyan-400',
                    border: 'border-cyan-500/20',
                    icon: AlertCircle
                };
            case 'In Progress': 
                return {
                    bg: 'bg-blue-500/10',
                    text: 'text-blue-400',
                    border: 'border-blue-500/20',
                    icon: Clock
                };
            case 'Resolved': 
                return {
                    bg: 'bg-green-500/10',
                    text: 'text-green-400',
                    border: 'border-green-500/20',
                    icon: CheckCircle
                };
            case 'Closed': 
                return {
                    bg: 'bg-slate-700/30',
                    text: 'text-slate-400',
                    border: 'border-slate-600/30',
                    icon: X
                };
            default: 
                return {
                    bg: 'bg-slate-700/30',
                    text: 'text-slate-400',
                    border: 'border-slate-600/30',
                    icon: AlertCircle
                };
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'High': return 'text-red-400 bg-red-500/10';
            case 'Medium': return 'text-amber-400 bg-amber-500/10';
            case 'Low': return 'text-green-400 bg-green-500/10';
            default: return 'text-slate-400 bg-slate-500/10';
        }
    };

    // Safely filter tickets - ensure it's an array first
    const filteredTickets = Array.isArray(tickets) ? tickets.filter(ticket => {
        if (filter !== 'all') {
            const statusMap: Record<string, string> = {
                open: 'Open',
                in_progress: 'In Progress',
                resolved: 'Resolved',
                closed: 'Closed'
            };
            if (ticket.status !== statusMap[filter]) return false;
        }
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return (ticket.subject?.toLowerCase().includes(query) || false) ||
                   (ticket.message?.toLowerCase().includes(query) || false);
        }
        return true;
    }) : [];

    const getStatusCounts = () => {
        const ticketsArray = Array.isArray(tickets) ? tickets : [];
        return {
            all: ticketsArray.length,
            open: ticketsArray.filter(t => t.status === 'Open').length,
            in_progress: ticketsArray.filter(t => t.status === 'In Progress').length,
            resolved: ticketsArray.filter(t => t.status === 'Resolved').length,
            closed: ticketsArray.filter(t => t.status === 'Closed').length
        };
    };

    const counts = getStatusCounts();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-20 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl shadow-lg shadow-cyan-500/20">
                                <MessageSquare className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                                    Support Center
                                </h1>
                                <p className="text-slate-400 text-sm mt-1">
                                    Get help and track your support requests
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => loadTickets()}
                                disabled={isLoading}
                                className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-all disabled:opacity-50"
                                title="Refresh"
                            >
                                <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
                            </button>
                            
                            <button
                                onClick={() => setIsCreating(!isCreating)}
                                className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl font-medium transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20"
                            >
                                {isCreating ? (
                                    <>
                                        <X className="w-5 h-5" />
                                        Cancel
                                    </>
                                ) : (
                                    <>
                                        <Plus className="w-5 h-5" />
                                        New Ticket
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-400">
                        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <p className="text-sm font-medium">Error</p>
                            <p className="text-sm opacity-90">{error}</p>
                        </div>
                        <button
                            onClick={loadTickets}
                            className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-sm"
                        >
                            Retry
                        </button>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Create Ticket Form */}
                    {isCreating && (
                        <div className="lg:col-span-1">
                            <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 sticky top-24 animate-slideIn">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                        <Plus className="w-5 h-5 text-cyan-400" />
                                        New Support Request
                                    </h3>
                                    <button
                                        onClick={() => setIsCreating(false)}
                                        className="p-1 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-all"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                                
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1.5">
                                            Subject <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.subject}
                                            onChange={e => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                                            className="w-full px-4 py-2.5 bg-slate-950/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none"
                                            placeholder="Brief description of your issue"
                                            required
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1.5">
                                            Message <span className="text-red-400">*</span>
                                        </label>
                                        <textarea
                                            value={formData.message}
                                            onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                            className="w-full px-4 py-2.5 bg-slate-950/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none min-h-[150px] resize-y"
                                            placeholder="Please provide detailed information about your issue..."
                                            required
                                        />
                                    </div>
                                    
                                    <div className="flex items-center justify-between pt-2">
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <Paperclip className="w-3 h-3" />
                                            <span>Attachments supported (coming soon)</span>
                                        </div>
                                        
                                        <button
                                            type="submit"
                                            disabled={sending || !formData.subject.trim() || !formData.message.trim()}
                                            className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium rounded-xl transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {sending ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-4 h-4" />
                                                    Submit Ticket
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                                
                                {/* Quick Tips */}
                                <div className="mt-6 pt-4 border-t border-slate-700/50">
                                    <p className="text-xs text-slate-500 flex items-center gap-1 mb-2">
                                        <HelpCircle className="w-3 h-3" />
                                        Quick Tips:
                                    </p>
                                    <ul className="text-xs text-slate-500 space-y-1 list-disc list-inside">
                                        <li>Be specific about your issue</li>
                                        <li>Include error messages if any</li>
                                        <li>Expected response time: 24-48 hours</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Ticket List Section */}
                    <div className={isCreating ? 'lg:col-span-2' : 'lg:col-span-3'}>
                        {/* Search and Filters */}
                        <div className="mb-6 space-y-4">
                            <div className="flex gap-3">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                        placeholder="Search tickets by subject or message..."
                                        className="w-full pl-9 pr-4 py-2.5 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none"
                                    />
                                </div>
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                                        showFilters ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-slate-800/50 text-slate-400 hover:text-white'
                                    }`}
                                >
                                    <Filter className="w-4 h-4" />
                                    <span>Filter</span>
                                    {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </button>
                            </div>
                            
                            {/* Status Filters */}
                            {showFilters && (
                                <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 animate-slideDown">
                                    <div className="flex flex-wrap gap-2">
                                        {[
                                            { key: 'all', label: 'All', count: counts.all },
                                            { key: 'open', label: 'Open', count: counts.open },
                                            { key: 'in_progress', label: 'In Progress', count: counts.in_progress },
                                            { key: 'resolved', label: 'Resolved', count: counts.resolved },
                                            { key: 'closed', label: 'Closed', count: counts.closed }
                                        ].map((status) => (
                                            <button
                                                key={status.key}
                                                onClick={() => setFilter(status.key as any)}
                                                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                                                    filter === status.key
                                                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                                                        : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                                                }`}
                                            >
                                                {status.label} ({status.count})
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {/* Ticket List */}
                        {isLoading ? (
                            <div className="text-center py-16">
                                <Loader2 className="w-12 h-12 text-slate-600 animate-spin mx-auto mb-4" />
                                <p className="text-slate-400">Loading tickets...</p>
                            </div>
                        ) : filteredTickets.length === 0 ? (
                            <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
                                <div className="inline-flex p-4 bg-slate-800/50 rounded-full mb-4">
                                    <MessageSquare className="w-12 h-12 text-slate-600" />
                                </div>
                                <p className="text-slate-400 text-lg font-medium mb-1">No tickets found</p>
                                <p className="text-slate-500 text-sm">
                                    {searchQuery || filter !== 'all' 
                                        ? 'Try adjusting your search or filters'
                                        : 'Create your first support ticket to get started'}
                                </p>
                                {!searchQuery && filter === 'all' && (
                                    <button
                                        onClick={() => setIsCreating(true)}
                                        className="mt-4 px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm font-medium hover:bg-cyan-500/30 transition-all"
                                    >
                                        Create New Ticket
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredTickets.map((ticket, index) => {
                                    const statusStyle = getStatusColor(ticket.status);
                                    const StatusIcon = statusStyle.icon;
                                    const isExpanded = expandedTicket === ticket.id;
                                    
                                    return (
                                        <div
                                            key={ticket.id}
                                            className="group bg-slate-900/30 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-slate-600 transition-all duration-300 overflow-hidden animate-slideIn"
                                            style={{ animationDelay: `${index * 50}ms` }}
                                        >
                                            <div className="p-5 cursor-pointer" onClick={() => setExpandedTicket(isExpanded ? null : ticket.id)}>
                                                <div className="flex items-start justify-between flex-wrap gap-3">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                                                            <span className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 ${statusStyle.bg} ${statusStyle.text} border ${statusStyle.border}`}>
                                                                <StatusIcon className="w-3 h-3" />
                                                                {ticket.status}
                                                            </span>
                                                            {ticket.priority && (
                                                                <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                                                                    {ticket.priority} Priority
                                                                </span>
                                                            )}
                                                        </div>
                                                        <h3 className="text-lg font-semibold text-white mb-1">
                                                            {ticket.subject}
                                                        </h3>
                                                        <p className={`text-slate-400 text-sm ${!isExpanded && 'line-clamp-2'}`}>
                                                            {ticket.message}
                                                        </p>
                                                    </div>
                                                    
                                                    <div className="flex flex-col items-end gap-2">
                                                        <span className="text-xs text-slate-500 flex items-center gap-1 whitespace-nowrap">
                                                            <Calendar className="w-3 h-3" />
                                                            {ticket.created_at 
                                                                ? new Date(ticket.created_at).toLocaleDateString(undefined, {
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                    year: 'numeric'
                                                                })
                                                                : 'Unknown date'
                                                            }
                                                        </span>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-xs text-slate-500 flex items-center gap-1">
                                                                <Clock3 className="w-3 h-3" />
                                                                {ticket.created_at 
                                                                    ? new Date(ticket.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                                                    : '--:--'
                                                                }
                                                            </span>
                                                            {!isExpanded && (
                                                                <ChevronDown className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* Expanded View */}
                                            {isExpanded && (
                                                <div className="px-5 pb-5 pt-2 border-t border-slate-700/50 animate-slideDown">
                                                    <div className="bg-slate-800/30 rounded-lg p-4 space-y-3">
                                                        <div className="flex items-center gap-2 text-sm">
                                                            <User className="w-4 h-4 text-slate-500" />
                                                            <span className="text-slate-400">Ticket ID: #{ticket.id}</span>
                                                        </div>
                                                        
                                                        <div className="flex items-start gap-2 text-sm">
                                                            <MessageSquare className="w-4 h-4 text-slate-500 mt-0.5" />
                                                            <div>
                                                                <p className="text-slate-300 font-medium mb-1">Full Message:</p>
                                                                <p className="text-slate-400">{ticket.message}</p>
                                                            </div>
                                                        </div>
                                                        
                                                        {/* Quick Actions */}
                                                        <div className="flex gap-2 pt-2">
                                                            <button className="px-3 py-1.5 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-xs text-slate-300 transition-all">
                                                                Add Comment
                                                            </button>
                                                            <button className="px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 rounded-lg text-xs text-cyan-400 transition-all">
                                                                View Details
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                        
                        {/* Contact Support Section */}
                        {tickets.length > 0 && !isLoading && (
                            <div className="mt-8 p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
                                <div className="flex items-center justify-between flex-wrap gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-cyan-500/10 rounded-lg">
                                            <Phone className="w-5 h-5 text-cyan-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-white font-medium">Need immediate help?</p>
                                            <p className="text-xs text-slate-400">Contact our support team directly</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <a href="mailto:support@edupredict.com" className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                                            <Mail className="w-4 h-4" />
                                            support@edupredict.com
                                        </a>
                                        <span className="text-slate-600">|</span>
                                        <span className="text-sm text-slate-400">Response within 24h</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
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