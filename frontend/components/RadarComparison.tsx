
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