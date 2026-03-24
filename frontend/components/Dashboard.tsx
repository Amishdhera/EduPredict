// 'use client';

// import React, { useEffect, useState } from 'react';
// import {
//     Users,
//     GraduationCap,
//     AlertTriangle,
//     TrendingUp,
//     Activity,
//     RefreshCw
// } from 'lucide-react';
// import GaugeChart from './GaugeChart';
// import RadarComparison from './RadarComparison';
// import PredictForm from './PredictForm';
// import { PredictionResult, ClassAverage, predictionsApi } from '@/lib/api';

// interface DashboardStats {
//     totalStudents: number;
//     highRiskCount: number;
//     averageDropoutRisk: number;
// }

// export default function Dashboard() {
//     const [stats, setStats] = useState<DashboardStats>({
//         totalStudents: 0,
//         highRiskCount: 0,
//         averageDropoutRisk: 0,
//     });
//     const [classAverage, setClassAverage] = useState<ClassAverage | null>(null);
//     const [latestPrediction, setLatestPrediction] = useState<PredictionResult | null>(null);
//     const [isConnected, setIsConnected] = useState<boolean | null>(null);
//     const [isLoading, setIsLoading] = useState(true);
//     // const { logout, user } = useAuth(); // Moved to Navbar

//     useEffect(() => {
//         checkConnection();
//     }, []);

//     const checkConnection = async () => {
//         setIsLoading(true);
//         try {
//             const health = await predictionsApi.healthCheck();
//             setIsConnected(true);
//             if (health.ml_models_loaded) {
//                 loadClassAverage();
//             }
//         } catch {
//             setIsConnected(false);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const loadClassAverage = async () => {
//         try {
//             const avg = await predictionsApi.getClassAverage();
//             setClassAverage(avg);
//         } catch (err) {
//             console.error('Failed to load class average:', err);
//         }
//     };

//     const handlePrediction = (result: PredictionResult) => {
//         setLatestPrediction(result);
//         // Update stats
//         setStats(prev => ({
//             ...prev,
//             totalStudents: prev.totalStudents + 1,
//             highRiskCount: result.high_risk ? prev.highRiskCount + 1 : prev.highRiskCount,
//             averageDropoutRisk: (prev.averageDropoutRisk * prev.totalStudents + result.dropout_probability * 100) / (prev.totalStudents + 1),
//         }));
//     };

//     const radarData = latestPrediction && classAverage ? [
//         { label: '1st Sem Grade', value: latestPrediction.grade_trend + 12, classAverage: classAverage['1st_sem_grade'] },
//         { label: '2nd Sem Grade', value: latestPrediction.grade_trend + 13, classAverage: classAverage['2nd_sem_grade'] },
//         { label: 'Admission', value: 130 / 10, classAverage: classAverage.admission_grade / 10 },
//         { label: '1st Approved', value: 5, classAverage: classAverage['1st_sem_approved'] },
//         { label: '2nd Approved', value: 5, classAverage: classAverage['2nd_sem_approved'] },
//     ] : [];

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
//             {/* Header */}


//             <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                 {/* Stats Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//                     <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 rounded-xl p-6 border border-slate-700/50">
//                         <div className="flex items-center gap-4">
//                             <div className="p-3 bg-blue-500/20 rounded-xl">
//                                 <Users className="w-6 h-6 text-blue-400" />
//                             </div>
//                             <div>
//                                 <p className="text-slate-400 text-sm">Total Predictions</p>
//                                 <p className="text-2xl font-bold text-white">{stats.totalStudents}</p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 rounded-xl p-6 border border-slate-700/50">
//                         <div className="flex items-center gap-4">
//                             <div className="p-3 bg-red-500/20 rounded-xl">
//                                 <AlertTriangle className="w-6 h-6 text-red-400" />
//                             </div>
//                             <div>
//                                 <p className="text-slate-400 text-sm">High Risk Alerts</p>
//                                 <p className="text-2xl font-bold text-white">{stats.highRiskCount}</p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 rounded-xl p-6 border border-slate-700/50">
//                         <div className="flex items-center gap-4">
//                             <div className="p-3 bg-amber-500/20 rounded-xl">
//                                 <TrendingUp className="w-6 h-6 text-amber-400" />
//                             </div>
//                             <div>
//                                 <p className="text-slate-400 text-sm">Avg Dropout Risk</p>
//                                 <p className="text-2xl font-bold text-white">
//                                     {stats.averageDropoutRisk.toFixed(1)}%
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Main Content Grid */}
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                     {/* Prediction Form */}
//                     <div className="lg:col-span-2">
//                         <PredictForm onPrediction={handlePrediction} />
//                     </div>

//                     {/* Visualization Panel */}
//                     <div className="space-y-6">
//                         {/* Gauge Chart */}
//                         <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 rounded-xl p-6 border border-slate-700/50">
//                             <h3 className="text-lg font-semibold text-white mb-4">Dropout Risk</h3>
//                             <GaugeChart
//                                 value={latestPrediction ? latestPrediction.dropout_probability * 100 : 0}
//                                 label="Current Risk Level"
//                             />
//                         </div>

//                         {/* Radar Chart */}
//                         <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 rounded-xl p-6 border border-slate-700/50">
//                             <h3 className="text-lg font-semibold text-white mb-4">Grade Comparison</h3>
//                             {radarData.length > 0 ? (
//                                 <RadarComparison studentData={radarData} />
//                             ) : (
//                                 <div className="h-60 flex items-center justify-center text-slate-500">
//                                     <p>Make a prediction to see comparison</p>
//                                 </div>
//                             )}
//                         </div>

//                         {/* High Risk Alert Panel */}
//                         {latestPrediction?.high_risk && (
//                             <div className="bg-gradient-to-br from-red-900/30 to-red-800/20 rounded-xl p-6 border border-red-500/30 animate-pulse">
//                                 <div className="flex items-center gap-3 mb-3">
//                                     <AlertTriangle className="w-6 h-6 text-red-400" />
//                                     <h3 className="text-lg font-semibold text-red-400">Intervention Required</h3>
//                                 </div>
//                                 <p className="text-red-300 text-sm">
//                                     This student has a {(latestPrediction.dropout_probability * 100).toFixed(1)}% probability of dropout.
//                                     Academic intervention is strongly recommended.
//                                 </p>
//                                 <div className="mt-4 space-y-2">
//                                     <p className="text-red-200 text-sm font-medium">Recommended Actions:</p>
//                                     <ul className="text-red-300 text-sm space-y-1 list-disc list-inside">
//                                         <li>Schedule counseling session</li>
//                                         <li>Review academic support options</li>
//                                         <li>Connect with mentorship program</li>
//                                         <li>Assess financial aid eligibility</li>
//                                     </ul>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// }
'use client';

import React, { useEffect, useState } from 'react';
import {
    Users,
    GraduationCap,
    AlertTriangle,
    TrendingUp,
    Activity,
    RefreshCw,
    BarChart3,
    PieChart,
    Shield,
    Target,
    Award,
    BookOpen,
    Calendar,
    Clock,
    Brain,
    Sparkles
} from 'lucide-react';
import GaugeChart from './GaugeChart';
import RadarComparison from './RadarComparison';
import PredictForm from './PredictForm';
import { PredictionResult, ClassAverage, predictionsApi } from '@/lib/api';

interface DashboardStats {
    totalStudents: number;
    highRiskCount: number;
    averageDropoutRisk: number;
}

export default function Dashboard() {
    const [stats, setStats] = useState<DashboardStats>({
        totalStudents: 0,
        highRiskCount: 0,
        averageDropoutRisk: 0,
    });
    const [classAverage, setClassAverage] = useState<ClassAverage | null>(null);
    const [latestPrediction, setLatestPrediction] = useState<PredictionResult | null>(null);
    const [isConnected, setIsConnected] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

    useEffect(() => {
        checkConnection();
    }, []);

    const checkConnection = async () => {
        setIsLoading(true);
        try {
            const health = await predictionsApi.healthCheck();
            setIsConnected(true);
            if (health.ml_models_loaded) {
                loadClassAverage();
            }
        } catch {
            setIsConnected(false);
        } finally {
            setIsLoading(false);
        }
    };

    const loadClassAverage = async () => {
        try {
            const avg = await predictionsApi.getClassAverage();
            setClassAverage(avg);
        } catch (err) {
            console.error('Failed to load class average:', err);
        }
    };

    const handlePrediction = (result: PredictionResult) => {
        setLatestPrediction(result);
        setLastUpdated(new Date());
        setStats(prev => ({
            ...prev,
            totalStudents: prev.totalStudents + 1,
            highRiskCount: result.high_risk ? prev.highRiskCount + 1 : prev.highRiskCount,
            averageDropoutRisk: (prev.averageDropoutRisk * prev.totalStudents + result.dropout_probability * 100) / (prev.totalStudents + 1),
        }));
    };

    const radarData = latestPrediction && classAverage ? [
        { label: '1st Sem Grade', value: latestPrediction.grade_trend + 12, classAverage: classAverage['1st_sem_grade'] },
        { label: '2nd Sem Grade', value: latestPrediction.grade_trend + 13, classAverage: classAverage['2nd_sem_grade'] },
        { label: 'Admission', value: 130 / 10, classAverage: classAverage.admission_grade / 10 },
        { label: '1st Approved', value: 5, classAverage: classAverage['1st_sem_approved'] },
        { label: '2nd Approved', value: 5, classAverage: classAverage['2nd_sem_approved'] },
    ] : [];

    const getRiskColor = (risk: number) => {
        if (risk < 30) return 'text-emerald-400';
        if (risk < 70) return 'text-amber-400';
        return 'text-red-400';
    };

    const getRiskBg = (risk: number) => {
        if (risk < 30) return 'bg-emerald-500/20 border-emerald-500/30';
        if (risk < 70) return 'bg-amber-500/20 border-amber-500/30';
        return 'bg-red-500/20 border-red-500/30';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>

            <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                                Academic Analytics Dashboard
                            </h1>
                            <p className="text-slate-400 mt-1 flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                Real-time dropout prediction & student performance analysis
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 ${
                                isConnected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                            }`}>
                                <Activity className="w-3 h-3" />
                                {isConnected ? 'ML Models Active' : 'Connection Lost'}
                            </div>
                            {lastUpdated && (
                                <div className="text-xs text-slate-500 flex items-center gap-1">
                                    <RefreshCw className="w-3 h-3" />
                                    Updated {lastUpdated.toLocaleTimeString()}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="group relative overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm font-medium">Total Predictions</p>
                                <p className="text-3xl font-bold text-white mt-2">{stats.totalStudents}</p>
                                <p className="text-xs text-slate-500 mt-1">All-time predictions</p>
                            </div>
                            <div className="p-4 bg-blue-500/10 rounded-2xl">
                                <Users className="w-8 h-8 text-blue-400" />
                            </div>
                        </div>
                        <div className="mt-4 h-1 bg-slate-700/50 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${Math.min(stats.totalStudents, 100)}%` }}></div>
                        </div>
                    </div>

                    <div className="group relative overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm font-medium">High Risk Alerts</p>
                                <p className="text-3xl font-bold text-white mt-2">{stats.highRiskCount}</p>
                                <p className="text-xs text-slate-500 mt-1">Requires immediate attention</p>
                            </div>
                            <div className="p-4 bg-red-500/10 rounded-2xl">
                                <AlertTriangle className="w-8 h-8 text-red-400" />
                            </div>
                        </div>
                        <div className="mt-4 h-1 bg-slate-700/50 rounded-full overflow-hidden">
                            <div className="h-full bg-red-500 rounded-full transition-all duration-500" style={{ width: `${(stats.highRiskCount / (stats.totalStudents || 1)) * 100}%` }}></div>
                        </div>
                    </div>

                    <div className="group relative overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm font-medium">Avg Dropout Risk</p>
                                <p className={`text-3xl font-bold mt-2 ${getRiskColor(stats.averageDropoutRisk)}`}>
                                    {stats.averageDropoutRisk.toFixed(1)}%
                                </p>
                                <p className="text-xs text-slate-500 mt-1">Cohort average</p>
                            </div>
                            <div className={`p-4 rounded-2xl ${getRiskBg(stats.averageDropoutRisk)}`}>
                                <TrendingUp className={`w-8 h-8 ${getRiskColor(stats.averageDropoutRisk)}`} />
                            </div>
                        </div>
                        <div className="mt-4 h-1 bg-slate-700/50 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full transition-all duration-500 ${
                                stats.averageDropoutRisk < 30 ? 'bg-emerald-500' : 
                                stats.averageDropoutRisk < 70 ? 'bg-amber-500' : 'bg-red-500'
                            }`} style={{ width: `${stats.averageDropoutRisk}%` }}></div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Prediction Form */}
                    <div className="lg:col-span-2">
                        <PredictForm onPrediction={handlePrediction} />
                    </div>

                    {/* Visualization Panel */}
                    <div className="space-y-6">
                        {/* Gauge Chart */}
                        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <Target className="w-5 h-5 text-purple-400" />
                                    Dropout Risk Assessment
                                </h3>
                                {latestPrediction && (
                                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getRiskBg(latestPrediction.dropout_probability * 100)} ${getRiskColor(latestPrediction.dropout_probability * 100)}`}>
                                        {latestPrediction.dropout_probability * 100 < 30 ? 'Low Risk' : 
                                         latestPrediction.dropout_probability * 100 < 70 ? 'Moderate Risk' : 'Critical Risk'}
                                    </span>
                                )}
                            </div>
                            <GaugeChart
                                value={latestPrediction ? latestPrediction.dropout_probability * 100 : 0}
                                label="Current Risk Level"
                            />
                        </div>

                        {/* Radar Chart */}
                        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <BarChart3 className="w-5 h-5 text-blue-400" />
                                Performance Metrics
                            </h3>
                            {radarData.length > 0 ? (
                                <RadarComparison studentData={radarData} />
                            ) : (
                                <div className="h-60 flex flex-col items-center justify-center text-slate-500">
                                    <Brain className="w-12 h-12 mb-3 opacity-50" />
                                    <p className="text-sm">Make a prediction to see comparison</p>
                                    <p className="text-xs">Visual analytics will appear here</p>
                                </div>
                            )}
                        </div>

                        {/* High Risk Alert Panel */}
                        {latestPrediction?.high_risk && (
                            <div className="bg-gradient-to-br from-red-900/40 to-red-800/20 backdrop-blur-sm rounded-2xl p-6 border-2 border-red-500/50 animate-shake">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-red-500/20 rounded-xl animate-pulse">
                                        <AlertTriangle className="w-6 h-6 text-red-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-red-400">Immediate Intervention Required</h3>
                                        <p className="text-red-300 text-sm">Critical risk level detected</p>
                                    </div>
                                </div>
                                <p className="text-red-200 text-sm mb-4">
                                    This student has a <span className="font-bold text-red-300">{(latestPrediction.dropout_probability * 100).toFixed(1)}%</span> probability of dropout.
                                    Immediate academic intervention is strongly recommended.
                                </p>
                                <div className="mt-4 p-4 bg-red-950/50 rounded-xl border border-red-500/30">
                                    <p className="text-red-200 text-sm font-medium mb-3 flex items-center gap-2">
                                        <Shield className="w-4 h-4" />
                                        Recommended Intervention Plan:
                                    </p>
                                    <ul className="text-red-300 text-sm space-y-2">
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                                            Schedule emergency counseling session (within 24h)
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                                            Review academic performance & support options
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                                            Connect with mentorship program coordinator
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                                            Assess financial aid & scholarship eligibility
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                                            Create personalized academic success plan
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* Quick Tips Card */}
                        {!latestPrediction && (
                            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                                <div className="flex items-center gap-3 mb-3">
                                    <Sparkles className="w-5 h-5 text-amber-400" />
                                    <h3 className="text-sm font-semibold text-white">Getting Started</h3>
                                </div>
                                <p className="text-slate-400 text-sm">
                                    Enter student academic data to get instant dropout risk predictions and personalized intervention recommendations.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <style jsx>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-2px); }
                    75% { transform: translateX(2px); }
                }
                .animate-shake {
                    animation: shake 0.5s ease-in-out;
                }
            `}</style>
        </div>
    );
}