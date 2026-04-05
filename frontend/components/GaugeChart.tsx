
'use client';

import React, { useEffect, useState } from 'react';

interface GaugeChartProps {
    value: number; // 0-100
    label: string;
    size?: number;
    showAnimation?: boolean;
    showThresholds?: boolean;
}

export default function GaugeChart({ 
    value, 
    label, 
    size = 200, 
    showAnimation = true,
    showThresholds = true 
}: GaugeChartProps) {
    const [animatedValue, setAnimatedValue] = useState(showAnimation ? 0 : value);
    const clampedValue = Math.max(0, Math.min(100, value));
    
    useEffect(() => {
        if (showAnimation) {
            let startTime: number;
            const duration = 1000;
            
            const animate = (currentTime: number) => {
                if (!startTime) startTime = currentTime;
                const elapsed = currentTime - startTime;
                const progress = Math.min(1, elapsed / duration);
                
                setAnimatedValue(clampedValue * progress);
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            
            requestAnimationFrame(animate);
        } else {
            setAnimatedValue(clampedValue);
        }
    }, [clampedValue, showAnimation]);

    const currentDisplayValue = showAnimation ? animatedValue : clampedValue;
    const rotation = (currentDisplayValue / 100) * 180 - 90;

    // Enhanced color scheme with gradients
    const getColor = (val: number) => {
        if (val <= 30) return { 
            main: '#10b981', 
            glow: '#10b98160',
            gradient: ['#10b981', '#34d399'],
            text: '#10b981',
            label: 'Low Risk'
        };
        if (val <= 50) return { 
            main: '#f59e0b', 
            glow: '#f59e0b60',
            gradient: ['#f59e0b', '#fbbf24'],
            text: '#f59e0b',
            label: 'Moderate Risk'
        };
        if (val <= 70) return { 
            main: '#f97316', 
            glow: '#f9731660',
            gradient: ['#f97316', '#fb923c'],
            text: '#f97316',
            label: 'Elevated Risk'
        };
        return { 
            main: '#ef4444', 
            glow: '#ef444460',
            gradient: ['#ef4444', '#f87171'],
            text: '#ef4444',
            label: 'Critical Risk'
        };
    };

    const colors = getColor(currentDisplayValue);
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.4;
    const startAngle = -90;
    const endAngle = 90;

    // Calculate arc path
    const getArcPath = (angle: number) => {
        const radian = (angle * Math.PI) / 180;
        const x = centerX + radius * Math.cos(radian);
        const y = centerY + radius * Math.sin(radian);
        return { x, y };
    };

    const startPoint = getArcPath(startAngle);
    const endPoint = getArcPath(endAngle);
    
    const largeArcFlag = 0;
    const sweepFlag = 1;
    
    const backgroundArc = `M ${startPoint.x} ${startPoint.y} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${endPoint.x} ${endPoint.y}`;

    // Calculate progress arc
    const progressAngle = startAngle + (currentDisplayValue / 100) * 180;
    const progressPoint = getArcPath(progressAngle);
    const progressArc = `M ${startPoint.x} ${startPoint.y} A ${radius} ${radius} 0 ${progressAngle > 0 ? 1 : 0} ${sweepFlag} ${progressPoint.x} ${progressPoint.y}`;

    return (
        <div className="flex flex-col items-center w-full">
            <div className="relative" style={{ width: size, height: size / 1.8 }}>
                <svg
                    width={size}
                    height={size / 1.8}
                    viewBox={`0 0 ${size} ${size / 1.8}`}
                    className="overflow-visible"
                >
                    {/* Background Arc with gradient */}
                    <defs>
                        <linearGradient id="backgroundGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#334155" />
                            <stop offset="100%" stopColor="#475569" />
                        </linearGradient>
                        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor={colors.gradient[0]} />
                            <stop offset="100%" stopColor={colors.gradient[1]} />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>
                    
                    {/* Background arc */}
                    <path
                        d={backgroundArc}
                        fill="none"
                        stroke="url(#backgroundGradient)"
                        strokeWidth={size * 0.08}
                        strokeLinecap="round"
                    />
                    
                    {/* Colored progress arc */}
                    <path
                        d={progressArc}
                        fill="none"
                        stroke="url(#progressGradient)"
                        strokeWidth={size * 0.08}
                        strokeLinecap="round"
                        style={{ 
                            filter: `url(#glow)`,
                            transition: showAnimation ? 'stroke-dashoffset 0.5s ease-out' : 'none'
                        }}
                    />
                    
                    {/* Decorative markers */}
                    {showThresholds && [0, 30, 50, 70, 100].map((threshold) => {
                        const angle = startAngle + (threshold / 100) * 180;
                        const point = getArcPath(angle);
                        return (
                            <g key={threshold}>
                                <line
                                    x1={point.x}
                                    y1={point.y}
                                    x2={point.x - (point.x - centerX) * 0.85}
                                    y2={point.y - (point.y - centerY) * 0.85}
                                    stroke="#475569"
                                    strokeWidth="2"
                                />
                                <text
                                    x={point.x - (point.x - centerX) * 0.7}
                                    y={point.y - (point.y - centerY) * 0.7}
                                    fill="#64748b"
                                    fontSize={size * 0.045}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                >
                                    {threshold}%
                                </text>
                            </g>
                        );
                    })}
                    
                    {/* Needle with shadow */}
                    <g transform={`translate(${centerX}, ${centerY})`}>
                        <circle 
                            r={size * 0.07} 
                            fill="url(#backgroundGradient)" 
                            stroke={colors.main} 
                            strokeWidth="2"
                            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
                        />
                        <circle 
                            r={size * 0.04} 
                            fill={colors.main}
                            style={{ filter: `drop-shadow(0 0 4px ${colors.glow})` }}
                        />
                        <line
                            x1="0"
                            y1="0"
                            x2="0"
                            y2={-size * 0.35}
                            stroke={colors.main}
                            strokeWidth="4"
                            strokeLinecap="round"
                            transform={`rotate(${rotation})`}
                            style={{
                                transition: showAnimation ? 'transform 0.5s cubic-bezier(0.34, 1.2, 0.64, 1)' : 'none',
                                filter: `drop-shadow(0 0 4px ${colors.glow})`
                            }}
                        />
                        {/* Needle center cap */}
                        <circle r={size * 0.025} fill="white" />
                    </g>
                    
                    {/* Min/Max labels with icons */}
                    <text 
                        x={centerX - radius * 0.85} 
                        y={centerY + size * 0.12} 
                        fill="#64748b" 
                        fontSize={size * 0.045} 
                        textAnchor="middle"
                        className="font-medium"
                    >
                        0%
                    </text>
                    <text 
                        x={centerX + radius * 0.85} 
                        y={centerY + size * 0.12} 
                        fill="#64748b" 
                        fontSize={size * 0.045} 
                        textAnchor="middle"
                        className="font-medium"
                    >
                        100%
                    </text>
                </svg>
                
                {/* Value display with background */}
                <div
                    className="absolute left-1/2 transform -translate-x-1/2 text-center"
                    style={{ bottom: size * 0.02 }}
                >
                    <div 
                        className="px-4 py-2 rounded-xl bg-slate-800/50 backdrop-blur-sm"
                        style={{ borderColor: `${colors.main}40`, borderWidth: '1px' }}
                    >
                        <span
                            className="text-4xl font-bold"
                            style={{ color: colors.text }}
                        >
                            {currentDisplayValue.toFixed(1)}%
                        </span>
                    </div>
                </div>
            </div>
            
            {/* Label with risk indicator */}
            <div className="mt-4 text-center">
                <p className="text-slate-400 text-sm font-medium">{label}</p>
                <div className="flex items-center justify-center gap-2 mt-1">
                    <div 
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ backgroundColor: colors.main }}
                    />
                    <span 
                        className="text-xs font-medium"
                        style={{ color: colors.text }}
                    >
                        {colors.label}
                    </span>
                </div>
            </div>
        </div>
    );
}