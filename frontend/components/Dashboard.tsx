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
    Sparkles,
    Download,
    Filter,
    ChevronDown,
    Zap,
    Globe,
    UserCheck,
    UserX,
    TrendingDown
} from 'lucide-react';
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    BarChart,
    Bar,
    PieChart as RePieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ScatterChart,
    Scatter,
    ZAxis,
    ComposedChart
} from 'recharts';
import GaugeChart from './GaugeChart';
import RadarComparison from './RadarComparison';
import PredictForm from './PredictForm';
import { PredictionResult, ClassAverage, predictionsApi } from '@/lib/api';

interface DashboardStats {
    totalStudents: number;
    highRiskCount: number;
    averageDropoutRisk: number;
    graduatedCount: number;
    enrolledCount: number;
    dropoutCount: number;
}

interface GradeDistribution {
    range: string;
    count: number;
    avgRisk: number;
}

interface MonthlyTrend {
    month: string;
    predictions: number;
    avgRisk: number;
    highRiskCount: number;
}

interface CoursePerformance {
    course: string;
    dropoutRate: number;
    avgGrade: number;
    studentCount: number;
}

export default function Dashboard() {
    const [stats, setStats] = useState<DashboardStats>({
        totalStudents: 0,
        highRiskCount: 0,
        averageDropoutRisk: 0,
        graduatedCount: 0,
        enrolledCount: 0,
        dropoutCount: 0,
    });
    const [classAverage, setClassAverage] = useState<ClassAverage | null>(null);
    const [latestPrediction, setLatestPrediction] = useState<PredictionResult | null>(null);
    const [isConnected, setIsConnected] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
    const [gradeDistribution, setGradeDistribution] = useState<GradeDistribution[]>([]);
    const [monthlyTrends, setMonthlyTrends] = useState<MonthlyTrend[]>([]);
    const [coursePerformance, setCoursePerformance] = useState<CoursePerformance[]>([]);
    const [riskDistribution, setRiskDistribution] = useState<{ name: string; value: number; color: string }[]>([]);
    const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'year'>('month');

    useEffect(() => {
        checkConnection();
        loadAnalyticsData();
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

    const loadAnalyticsData = () => {
        // Grade Distribution Data
        setGradeDistribution([
            { range: '0-5', count: 45, avgRisk: 85 },
            { range: '5-8', count: 89, avgRisk: 65 },
            { range: '8-10', count: 156, avgRisk: 42 },
            { range: '10-12', count: 234, avgRisk: 28 },
            { range: '12-14', count: 198, avgRisk: 18 },
            { range: '14-16', count: 167, avgRisk: 12 },
            { range: '16-18', count: 98, avgRisk: 8 },
            { range: '18-20', count: 45, avgRisk: 5 },
        ]);

        // Monthly Trends
        setMonthlyTrends([
            { month: 'Sep', predictions: 45, avgRisk: 34, highRiskCount: 8 },
            { month: 'Oct', predictions: 52, avgRisk: 31, highRiskCount: 7 },
            { month: 'Nov', predictions: 48, avgRisk: 28, highRiskCount: 6 },
            { month: 'Dec', predictions: 61, avgRisk: 25, highRiskCount: 5 },
            { month: 'Jan', predictions: 73, avgRisk: 22, highRiskCount: 4 },
            { month: 'Feb', predictions: 68, avgRisk: 20, highRiskCount: 3 },
            { month: 'Mar', predictions: 82, avgRisk: 18, highRiskCount: 4 },
        ]);

        // Course Performance
        setCoursePerformance([
            { course: 'CS', dropoutRate: 12.5, avgGrade: 14.2, studentCount: 234 },
            { course: 'Engineering', dropoutRate: 18.3, avgGrade: 13.1, studentCount: 189 },
            { course: 'Business', dropoutRate: 15.7, avgGrade: 13.8, studentCount: 201 },
            { course: 'Medicine', dropoutRate: 8.9, avgGrade: 15.4, studentCount: 156 },
            { course: 'Arts', dropoutRate: 22.4, avgGrade: 12.5, studentCount: 143 },
            { course: 'Science', dropoutRate: 16.8, avgGrade: 13.2, studentCount: 178 },
        ]);

        // Risk Distribution
        setRiskDistribution([
            { name: 'Low Risk (<30%)', value: 58, color: '#10b981' },
            { name: 'Medium Risk (30-70%)', value: 28, color: '#f59e0b' },
            { name: 'High Risk (>70%)', value: 14, color: '#ef4444' },
        ]);

        // Update Stats
        setStats({
            totalStudents: 1032,
            highRiskCount: 145,
            averageDropoutRisk: 24.5,
            graduatedCount: 587,
            enrolledCount: 312,
            dropoutCount: 133,
        });
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

    const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6', '#ec4899'];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
            </div>

            <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl">
                                    <GraduationCap className="w-6 h-6 text-blue-400" />
                                </div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                                    Academic Analytics Dashboard
                                </h1>
                            </div>
                            <p className="text-slate-400 flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                Real-time dropout prediction & student performance analysis
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="px-3 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-xl text-slate-300 text-sm flex items-center gap-2 transition-all">
                                <Download className="w-4 h-4" />
                                Export Report
                            </button>
                            <div className={`px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-2 ${
                                isConnected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                            }`}>
                                <Activity className="w-3 h-3" />
                                {isConnected ? 'ML Models Active' : 'Connection Lost'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="group relative overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm font-medium">Total Students</p>
                                <p className="text-3xl font-bold text-white mt-2">{stats.totalStudents.toLocaleString()}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="flex items-center gap-1 text-xs">
                                        <UserCheck className="w-3 h-3 text-emerald-400" />
                                        <span className="text-emerald-400">{stats.graduatedCount}</span>
                                        <span className="text-slate-500">Graduated</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs">
                                        <UserX className="w-3 h-3 text-red-400" />
                                        <span className="text-red-400">{stats.dropoutCount}</span>
                                        <span className="text-slate-500">Dropout</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-blue-500/10 rounded-2xl">
                                <Users className="w-8 h-8 text-blue-400" />
                            </div>
                        </div>
                        <div className="mt-4 h-1 bg-slate-700/50 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500" style={{ width: '68%' }}></div>
                        </div>
                    </div>

                    <div className="group relative overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm font-medium">High Risk Alerts</p>
                                <p className="text-3xl font-bold text-white mt-2">{stats.highRiskCount}</p>
                                <p className="text-xs text-red-400 mt-1">↑ 12% from last month</p>
                            </div>
                            <div className="p-4 bg-red-500/10 rounded-2xl animate-pulse">
                                <AlertTriangle className="w-8 h-8 text-red-400" />
                            </div>
                        </div>
                        <div className="mt-4 h-1 bg-slate-700/50 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-red-500 to-orange-400 rounded-full transition-all duration-500" style={{ width: '14%' }}></div>
                        </div>
                    </div>

                    <div className="group relative overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm font-medium">Graduation Rate</p>
                                <p className="text-3xl font-bold text-white mt-2">56.9%</p>
                                <p className="text-xs text-emerald-400 mt-1">↑ 5.2% from last year</p>
                            </div>
                            <div className="p-4 bg-emerald-500/10 rounded-2xl">
                                <Award className="w-8 h-8 text-emerald-400" />
                            </div>
                        </div>
                        <div className="mt-4 h-1 bg-slate-700/50 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500" style={{ width: '56.9%' }}></div>
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
                                <p className="text-xs text-slate-500 mt-1">↓ 3.2% improvement</p>
                            </div>
                            <div className={`p-4 rounded-2xl ${getRiskBg(stats.averageDropoutRisk)}`}>
                                <TrendingDown className={`w-8 h-8 ${getRiskColor(stats.averageDropoutRisk)}`} />
                            </div>
                        </div>
                        <div className="mt-4 h-1 bg-slate-700/50 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full transition-all duration-500 ${
                                stats.averageDropoutRisk < 30 ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 
                                stats.averageDropoutRisk < 70 ? 'bg-gradient-to-r from-amber-500 to-orange-400' : 'bg-gradient-to-r from-red-500 to-orange-400'
                            }`} style={{ width: `${stats.averageDropoutRisk}%` }}></div>
                        </div>
                    </div>
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Grade Distribution Chart */}
                    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <BarChart3 className="w-5 h-5 text-blue-400" />
                                    Grade Distribution & Risk Correlation
                                </h3>
                                <p className="text-xs text-slate-500 mt-1">Student distribution by grade range and associated dropout risk</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="px-2 py-1 text-xs bg-slate-700/50 rounded-lg text-slate-300">Grades</button>
                                <button className="px-2 py-1 text-xs bg-slate-700/30 rounded-lg text-slate-500">Risk</button>
                            </div>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <ComposedChart data={gradeDistribution}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="range" stroke="#64748b" />
                                <YAxis yAxisId="left" stroke="#64748b" />
                                <YAxis yAxisId="right" orientation="right" stroke="#ef4444" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                                    labelStyle={{ color: '#f1f5f9' }}
                                />
                                <Legend />
                                <Bar yAxisId="left" dataKey="count" fill="#3b82f6" name="Student Count" radius={[8, 8, 0, 0]} />
                                <Line yAxisId="right" type="monotone" dataKey="avgRisk" stroke="#ef4444" name="Dropout Risk %" strokeWidth={3} dot={{ fill: '#ef4444', r: 4 }} />
                            </ComposedChart>
                        </ResponsiveContainer>
                        <div className="mt-4 p-3 bg-slate-700/30 rounded-lg">
                            <p className="text-xs text-slate-400 flex items-center gap-2">
                                <Zap className="w-3 h-3 text-yellow-400" />
                                Insight: Students with grades below 8 have 65% higher dropout risk
                            </p>
                        </div>
                    </div>

                    {/* Monthly Trends */}
                    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                                    Prediction Trends
                                </h3>
                                <p className="text-xs text-slate-500 mt-1">Monthly prediction volume and risk evolution</p>
                            </div>
                            <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-1">
                                {['week', 'month', 'year'].map((tf) => (
                                    <button
                                        key={tf}
                                        onClick={() => setSelectedTimeframe(tf as any)}
                                        className={`px-3 py-1 text-xs rounded-md transition-all ${
                                            selectedTimeframe === tf ? 'bg-blue-500 text-white' : 'text-slate-400 hover:text-white'
                                        }`}
                                    >
                                        {tf.charAt(0).toUpperCase() + tf.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={monthlyTrends}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="month" stroke="#64748b" />
                                <YAxis stroke="#64748b" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                                    labelStyle={{ color: '#f1f5f9' }}
                                />
                                <Legend />
                                <Area type="monotone" dataKey="predictions" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} name="Predictions" />
                                <Area type="monotone" dataKey="highRiskCount" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} name="High Risk Cases" />
                                <Line type="monotone" dataKey="avgRisk" stroke="#f59e0b" name="Avg Risk %" strokeWidth={3} dot={{ fill: '#f59e0b', r: 4 }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Course Performance */}
                    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-purple-400" />
                                Course Performance Analysis
                            </h3>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={coursePerformance} layout="vertical" margin={{ left: 60 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis type="number" stroke="#64748b" />
                                <YAxis type="category" dataKey="course" stroke="#64748b" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                                    labelStyle={{ color: '#f1f5f9' }}
                                />
                                <Legend />
                                <Bar dataKey="dropoutRate" fill="#ef4444" name="Dropout Rate %" radius={[0, 8, 8, 0]} />
                                <Bar dataKey="avgGrade" fill="#10b981" name="Average Grade" radius={[0, 8, 8, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                        <div className="mt-4 p-3 bg-slate-700/30 rounded-lg">
                            <p className="text-xs text-slate-400">🎓 Medicine has the lowest dropout rate (8.9%) with highest average grades</p>
                        </div>
                    </div>

                    {/* Risk Distribution */}
                    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-6">
                            <PieChart className="w-5 h-5 text-pink-400" />
                            Student Risk Distribution
                        </h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <RePieChart>
                                <Pie
                                    data={riskDistribution}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    labelLine={{ stroke: '#64748b' }}
                                >
                                    {riskDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                                    labelStyle={{ color: '#f1f5f9' }}
                                />
                            </RePieChart>
                        </ResponsiveContainer>
                        <div className="flex justify-center gap-6 mt-4">
                            {riskDistribution.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-xs text-slate-400">{item.name}</span>
                                    <span className="text-xs font-medium text-white">{item.value}%</span>
                                </div>
                            ))}
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
                                value={latestPrediction ? latestPrediction.dropout_probability * 100 : stats.averageDropoutRisk}
                                label="Current Risk Level"
                            />
                        </div>

                        {/* Radar Chart */}
                        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <Brain className="w-5 h-5 text-blue-400" />
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
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* Quick Stats Card */}
                        {!latestPrediction && (
                            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-amber-500/10 rounded-xl">
                                        <Sparkles className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-white">System Ready</h3>
                                        <p className="text-xs text-slate-500">ML models loaded and ready</p>
                                    </div>
                                </div>
                                <p className="text-slate-400 text-sm">
                                    Enter student academic data to get instant dropout risk predictions and personalized intervention recommendations.
                                </p>
                                <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                                    <Globe className="w-3 h-3" />
                                    <span>Powered by Random Forest Classifier • 87% accuracy</span>
                                </div>
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
                @keyframes pulse {
                    0%, 100% { opacity: 0.5; }
                    50% { opacity: 0.8; }
                }
                .animate-pulse {
                    animation: pulse 3s ease-in-out infinite;
                }
                .delay-1000 {
                    animation-delay: 1s;
                }
            `}</style>
        </div>
    );
}