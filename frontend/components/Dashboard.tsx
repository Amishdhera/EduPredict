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
// components/dashboards/StudentDashboard.tsx
'use client';

import React from 'react';
import { UserCircle, TrendingUp, BookOpen, Clock } from 'lucide-react';
import GaugeChart from '@/components/GaugeChart';
import RadarComparison from '@/components/RadarComparison';

export default function StudentDashboard({ userId }: { userId: string }) {
    // Fetch only this student's data
    const studentData = {
        name: 'John Doe',
        risk: 23,
        grades: [
            { subject: 'Mathematics', grade: 85, classAvg: 78 },
            { subject: 'Physics', grade: 72, classAvg: 75 },
            { subject: 'Chemistry', grade: 88, classAvg: 82 },
        ]
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Welcome Header */}
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-6 mb-8 border border-cyan-500/20">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-cyan-500/20 rounded-xl">
                        <UserCircle className="w-8 h-8 text-cyan-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Welcome back, {studentData.name}!</h1>
                        <p className="text-slate-400">Here's your academic progress overview</p>
                    </div>
                </div>
            </div>

            {/* Student Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                    <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="w-5 h-5 text-cyan-400" />
                        <h3 className="text-slate-400">Current Risk</h3>
                    </div>
                    <GaugeChart value={studentData.risk} label="Dropout Risk" />
                </div>

                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                    <div className="flex items-center gap-3 mb-4">
                        <BookOpen className="w-5 h-5 text-blue-400" />
                        <h3 className="text-slate-400">Grade Summary</h3>
                    </div>
                    <div className="space-y-3">
                        {studentData.grades.map((grade, idx) => (
                            <div key={idx} className="flex items-center justify-between">
                                <span className="text-slate-300">{grade.subject}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-white font-medium">{grade.grade}%</span>
                                    <span className="text-xs text-slate-500">(Avg: {grade.classAvg}%)</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                    <div className="flex items-center gap-3 mb-4">
                        <Clock className="w-5 h-5 text-purple-400" />
                        <h3 className="text-slate-400">Recent Activity</h3>
                    </div>
                    <div className="space-y-3">
                        <p className="text-sm text-slate-300">• Assignment submitted - Math</p>
                        <p className="text-sm text-slate-300">• Quiz completed - Physics</p>
                        <p className="text-sm text-slate-300">• Attendance marked - 95%</p>
                    </div>
                </div>
            </div>

            {/* Grade Comparison */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h2 className="text-lg font-semibold text-white mb-4">Grade Comparison</h2>
                <RadarComparison 
                    studentData={studentData.grades.map(g => ({
                        label: g.subject,
                        value: g.grade,
                        classAverage: g.classAvg
                    }))} 
                />
            </div>
        </div>
    );
}