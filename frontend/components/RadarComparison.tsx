
// 'use client';

// import React, { useState } from 'react';
// import {
//     Radar,
//     RadarChart,
//     PolarGrid,
//     PolarAngleAxis,
//     PolarRadiusAxis,
//     ResponsiveContainer,
//     Legend,
//     Tooltip,
//     ComposedChart,
//     Bar,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Cell
// } from 'recharts';
// import { TrendingUp, TrendingDown, Minus, BarChart2, PieChart, Activity } from 'lucide-react';

// interface RadarComparisonProps {
//     studentData: {
//         label: string;
//         value: number;
//         classAverage: number;
//     }[];
//     chartType?: 'radar' | 'bar';
//     showComparison?: boolean;
//     animate?: boolean;
// }

// export default function RadarComparison({ 
//     studentData, 
//     chartType = 'radar',
//     showComparison = true,
//     animate = true 
// }: RadarComparisonProps) {
//     const [activeChart, setActiveChart] = useState<'radar' | 'bar'>(chartType);
//     const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);

//     const data = studentData.map(item => ({
//         subject: item.label,
//         student: item.value,
//         classAvg: item.classAverage,
//         difference: item.value - item.classAverage,
//         percentDiff: ((item.value - item.classAverage) / item.classAverage) * 100
//     }));

//     const getPerformanceColor = (difference: number) => {
//         if (difference > 2) return '#22c55e';
//         if (difference > 0.5) return '#84cc16';
//         if (difference > -0.5) return '#f59e0b';
//         if (difference > -2) return '#f97316';
//         return '#ef4444';
//     };

//     const getPerformanceIcon = (difference: number) => {
//         if (difference > 0.5) return <TrendingUp className="w-3 h-3" />;
//         if (difference < -0.5) return <TrendingDown className="w-3 h-3" />;
//         return <Minus className="w-3 h-3" />;
//     };

//     const CustomTooltip = ({ active, payload }: any) => {
//         if (active && payload && payload.length) {
//             const dataPoint = payload[0].payload;
//             return (
//                 <div className="bg-slate-800/95 backdrop-blur-sm border border-slate-700 rounded-lg p-3 shadow-xl">
//                     <p className="text-white font-medium text-sm mb-2">{dataPoint.subject}</p>
//                     <div className="space-y-1">
//                         <div className="flex items-center justify-between gap-4">
//                             <span className="text-slate-400 text-xs">Student:</span>
//                             <span className="text-cyan-400 font-semibold text-sm">
//                                 {dataPoint.student.toFixed(2)}
//                             </span>
//                         </div>
//                         <div className="flex items-center justify-between gap-4">
//                             <span className="text-slate-400 text-xs">Class Average:</span>
//                             <span className="text-purple-400 font-semibold text-sm">
//                                 {dataPoint.classAvg.toFixed(2)}
//                             </span>
//                         </div>
//                         <div className="border-t border-slate-700 my-1"></div>
//                         <div className="flex items-center justify-between gap-4">
//                             <span className="text-slate-400 text-xs">Difference:</span>
//                             <span className={`font-semibold text-sm ${
//                                 dataPoint.difference > 0 ? 'text-green-400' : 
//                                 dataPoint.difference < 0 ? 'text-red-400' : 'text-yellow-400'
//                             }`}>
//                                 {dataPoint.difference > 0 ? '+' : ''}{dataPoint.difference.toFixed(2)}
//                             </span>
//                         </div>
//                         <div className="flex items-center justify-between gap-4">
//                             <span className="text-slate-400 text-xs">Percent Diff:</span>
//                             <span className={`font-semibold text-sm ${
//                                 dataPoint.percentDiff > 0 ? 'text-green-400' : 
//                                 dataPoint.percentDiff < 0 ? 'text-red-400' : 'text-yellow-400'
//                             }`}>
//                                 {dataPoint.percentDiff > 0 ? '+' : ''}{dataPoint.percentDiff.toFixed(1)}%
//                             </span>
//                         </div>
//                     </div>
//                 </div>
//             );
//         }
//         return null;
//     };

//     const CustomLegend = () => (
//         <div className="flex items-center justify-center gap-6 mt-4">
//             <div className="flex items-center gap-2">
//                 <div className="w-3 h-3 rounded-full bg-cyan-500" />
//                 <span className="text-xs text-slate-400">Student Performance</span>
//             </div>
//             <div className="flex items-center gap-2">
//                 <div className="w-3 h-3 rounded-full bg-purple-500" />
//                 <span className="text-xs text-slate-400">Class Average</span>
//             </div>
//         </div>
//     );

//     const PerformanceSummary = () => {
//         const aboveAverage = data.filter(d => d.difference > 0).length;
//         const belowAverage = data.filter(d => d.difference < 0).length;
//         const average = data.reduce((sum, d) => sum + d.student, 0) / data.length;
//         const classAvg = data.reduce((sum, d) => sum + d.classAvg, 0) / data.length;
//         const overallDiff = average - classAvg;

//         return (
//             <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-700/50">
//                 <div className="text-center">
//                     <p className="text-xs text-slate-500">Above Average</p>
//                     <p className="text-lg font-bold text-green-400">{aboveAverage}</p>
//                     <p className="text-xs text-slate-600">metrics</p>
//                 </div>
//                 <div className="text-center">
//                     <p className="text-xs text-slate-500">Student Avg</p>
//                     <p className="text-lg font-bold text-white">{average.toFixed(1)}</p>
//                 </div>
//                 <div className="text-center">
//                     <p className="text-xs text-slate-500">Overall Trend</p>
//                     <div className={`flex items-center justify-center gap-1 ${
//                         overallDiff > 0 ? 'text-green-400' : 
//                         overallDiff < 0 ? 'text-red-400' : 'text-yellow-400'
//                     }`}>
//                         {getPerformanceIcon(overallDiff)}
//                         <span className="text-lg font-bold">
//                             {overallDiff > 0 ? '+' : ''}{overallDiff.toFixed(1)}
//                         </span>
//                     </div>
//                 </div>
//             </div>
//         );
//     };

//     const BarChartView = () => (
//         <ResponsiveContainer width="100%" height="100%">
//             <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
//                 <XAxis 
//                     dataKey="subject" 
//                     tick={{ fill: '#94a3b8', fontSize: 11 }}
//                     tickLine={{ stroke: '#475569' }}
//                     axisLine={{ stroke: '#475569' }}
//                 />
//                 <YAxis 
//                     tick={{ fill: '#64748b', fontSize: 10 }}
//                     tickLine={{ stroke: '#475569' }}
//                     axisLine={{ stroke: '#475569' }}
//                 />
//                 <Tooltip content={<CustomTooltip />} />
//                 <Bar dataKey="student" fill="#06b6d4" radius={[4, 4, 0, 0]}>
//                     {data.map((entry, index) => (
//                         <Cell 
//                             key={`cell-${index}`}
//                             fill={hoveredMetric === entry.subject ? '#0891b2' : '#06b6d4'}
//                             onMouseEnter={() => setHoveredMetric(entry.subject)}
//                             onMouseLeave={() => setHoveredMetric(null)}
//                         />
//                     ))}
//                 </Bar>
//                 <Bar dataKey="classAvg" fill="#8b5cf6" radius={[4, 4, 0, 0]}>
//                     {data.map((entry, index) => (
//                         <Cell 
//                             key={`cell-${index}`}
//                             fill={hoveredMetric === entry.subject ? '#7c3aed' : '#8b5cf6'}
//                             onMouseEnter={() => setHoveredMetric(entry.subject)}
//                             onMouseLeave={() => setHoveredMetric(null)}
//                         />
//                     ))}
//                 </Bar>
//                 <Legend content={<CustomLegend />} />
//             </ComposedChart>
//         </ResponsiveContainer>
//     );

//     const RadarChartView = () => (
//         <ResponsiveContainer width="100%" height="100%">
//             <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
//                 <defs>
//                     <linearGradient id="studentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//                         <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.6}/>
//                         <stop offset="100%" stopColor="#0891b2" stopOpacity={0.3}/>
//                     </linearGradient>
//                     <linearGradient id="classAvgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//                         <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.6}/>
//                         <stop offset="100%" stopColor="#6d28d9" stopOpacity={0.3}/>
//                     </linearGradient>
//                 </defs>
//                 <PolarGrid
//                     stroke="#475569"
//                     strokeDasharray="3 3"
//                     radialLines={false}
//                 />
//                 <PolarAngleAxis
//                     dataKey="subject"
//                     tick={{ 
//                         fill: (props: any) => {
//                             const diff = data.find(d => d.subject === props.payload.value)?.difference || 0;
//                             return diff > 0 ? '#4ade80' : diff < 0 ? '#f87171' : '#94a3b8';
//                         },
//                         fontSize: 11,
//                         fontWeight: 500
//                     }}
//                     tickLine={{ stroke: '#475569' }}
//                 />
//                 <PolarRadiusAxis
//                     angle={90}
//                     domain={[0, 'auto']}
//                     tick={{ fill: '#64748b', fontSize: 10 }}
//                     tickLine={{ stroke: '#475569' }}
//                     axisLine={{ stroke: '#475569' }}
//                 />
//                 <Radar
//                     name="Student"
//                     dataKey="student"
//                     stroke="#06b6d4"
//                     fill="url(#studentGradient)"
//                     fillOpacity={0.4}
//                     strokeWidth={2.5}
//                     isAnimationActive={animate}
//                     animationDuration={1000}
//                 />
//                 <Radar
//                     name="Class Average"
//                     dataKey="classAvg"
//                     stroke="#8b5cf6"
//                     fill="url(#classAvgGradient)"
//                     fillOpacity={0.3}
//                     strokeWidth={2}
//                     strokeDasharray="5 5"
//                     isAnimationActive={animate}
//                     animationDuration={1000}
//                 />
//                 <Tooltip content={<CustomTooltip />} />
//                 <Legend content={<CustomLegend />} />
//             </RadarChart>
//         </ResponsiveContainer>
//     );

//     return (
//         <div className="w-full">
//             {/* Chart Type Selector */}
//             <div className="flex items-center justify-between mb-4">
//                 <div className="flex items-center gap-2">
//                     <button
//                         onClick={() => setActiveChart('radar')}
//                         className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 ${
//                             activeChart === 'radar'
//                                 ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
//                                 : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800'
//                         }`}
//                     >
//                         <Activity className="w-3.5 h-3.5" />
//                         Radar View
//                     </button>
//                     <button
//                         onClick={() => setActiveChart('bar')}
//                         className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 ${
//                             activeChart === 'bar'
//                                 ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
//                                 : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800'
//                         }`}
//                     >
//                         <BarChart2 className="w-3.5 h-3.5" />
//                         Bar View
//                     </button>
//                 </div>
                
//                 {showComparison && (
//                     <div className="flex items-center gap-1 text-xs text-slate-500">
//                         <div className="w-2 h-2 rounded-full bg-green-400"></div>
//                         <span>Above Avg</span>
//                         <div className="w-2 h-2 rounded-full bg-red-400 ml-2"></div>
//                         <span>Below Avg</span>
//                     </div>
//                 )}
//             </div>

//             {/* Chart Display */}
//             <div className="w-full h-80">
//                 {activeChart === 'radar' ? <RadarChartView /> : <BarChartView />}
//             </div>

//             {/* Performance Summary */}
//             {showComparison && (
//                 <PerformanceSummary />
//             )}

//             {/* Detailed Metrics Table (Optional) */}
//             {showComparison && (
//                 <div className="mt-4 overflow-x-auto">
//                     <table className="w-full text-xs">
//                         <thead>
//                             <tr className="border-b border-slate-700">
//                                 <th className="text-left py-2 text-slate-500 font-medium">Metric</th>
//                                 <th className="text-right py-2 text-slate-500 font-medium">Student</th>
//                                 <th className="text-right py-2 text-slate-500 font-medium">Class Avg</th>
//                                 <th className="text-right py-2 text-slate-500 font-medium">Difference</th>
//                                 <th className="text-right py-2 text-slate-500 font-medium">Status</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {data.map((item, index) => (
//                                 <tr 
//                                     key={index} 
//                                     className="border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors"
//                                     onMouseEnter={() => setHoveredMetric(item.subject)}
//                                     onMouseLeave={() => setHoveredMetric(null)}
//                                 >
//                                     <td className="py-2 text-slate-300">{item.subject}</td>
//                                     <td className="text-right text-white font-mono">{item.student.toFixed(2)}</td>
//                                     <td className="text-right text-slate-400 font-mono">{item.classAvg.toFixed(2)}</td>
//                                     <td className={`text-right font-mono ${
//                                         item.difference > 0 ? 'text-green-400' : 
//                                         item.difference < 0 ? 'text-red-400' : 'text-yellow-400'
//                                     }`}>
//                                         {item.difference > 0 ? '+' : ''}{item.difference.toFixed(2)}
//                                     </td>
//                                     <td className="text-right">
//                                         <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${
//                                             item.difference > 0 ? 'bg-green-500/20 text-green-400' : 
//                                             item.difference < 0 ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
//                                         }`}>
//                                             {getPerformanceIcon(item.difference)}
//                                             <span className="text-xs">
//                                                 {item.difference > 0 ? 'Above' : item.difference < 0 ? 'Below' : 'At'} Avg
//                                             </span>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}

//             <style jsx>{`
//                 @keyframes fadeIn {
//                     from {
//                         opacity: 0;
//                         transform: translateY(10px);
//                     }
//                     to {
//                         opacity: 1;
//                         transform: translateY(0);
//                     }
//                 }
                
//                 .animate-fadeIn {
//                     animation: fadeIn 0.3s ease-out;
//                 }
//             `}</style>
//         </div>
//     );
// }
'use client';

import React from 'react';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Legend,
    Tooltip
} from 'recharts';

interface RadarDataPoint {
    label: string;
    value: number;
    classAverage: number;
}

interface RadarComparisonProps {
    studentData: RadarDataPoint[];
}

export default function RadarComparison({ studentData }: RadarComparisonProps) {
    // Transform data for recharts
    const chartData = studentData.map(item => ({
        subject: item.label,
        student: item.value,
        average: item.classAverage,
        fullMark: 20,
    }));

    // Custom colors
    const colors = {
        student: '#3b82f6',
        average: '#10b981'
    };

    // Custom tooltip
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-slate-800/95 backdrop-blur-sm p-3 rounded-lg border border-slate-700 shadow-xl">
                    <p className="text-white font-medium text-sm mb-2">{label}</p>
                    {payload.map((entry: any, index: number) => (
                        <p key={index} className="text-xs" style={{ color: entry.color }}>
                            {entry.name}: {entry.value.toFixed(1)}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    // Custom legend
    const renderLegend = (props: any) => {
        const { payload } = props;
        return (
            <div className="flex justify-center gap-6 mt-4">
                {payload.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                        <span className="text-xs text-slate-400">
                            {entry.value === 'student' ? 'Current Student' : 'Class Average'}
                        </span>
                    </div>
                ))}
            </div>
        );
    };

    if (!chartData.length) {
        return (
            <div className="h-80 flex items-center justify-center text-slate-500">
                <p className="text-sm">No data available for comparison</p>
            </div>
        );
    }

    return (
        <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis 
                        dataKey="subject" 
                        tick={{ fill: '#94a3b8', fontSize: 11 }}
                        tickLine={false}
                    />
                    <PolarRadiusAxis 
                        angle={30} 
                        domain={[0, 20]} 
                        tick={{ fill: '#64748b', fontSize: 10 }}
                        axisLine={{ stroke: '#334155' }}
                    />
                    <Radar
                        name="student"
                        dataKey="student"
                        stroke={colors.student}
                        fill={colors.student}
                        fillOpacity={0.3}
                        strokeWidth={2}
                    />
                    <Radar
                        name="average"
                        dataKey="average"
                        stroke={colors.average}
                        fill={colors.average}
                        fillOpacity={0.3}
                        strokeWidth={2}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend content={renderLegend} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}