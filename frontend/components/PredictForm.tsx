
'use client';

import React, { useState, useEffect } from 'react';
import {
    ChevronRight,
    ChevronLeft,
    User,
    GraduationCap,
    Wallet,
    AlertTriangle,
    CheckCircle,
    Loader2,
    Info,
    TrendingUp,
    TrendingDown,
    BarChart3,
    Shield,
    Sparkles,
    RefreshCw
} from 'lucide-react';
import { PredictionInput, PredictionResult, predictionsApi } from '@/lib/api';

interface FormStep {
    title: string;
    icon: React.ReactNode;
    description: string;
    fields: Array<{
        name: keyof PredictionInput;
        label: string;
        type: 'number' | 'select';
        options?: { value: number; label: string }[];
        min?: number;
        max?: number;
        step?: number;
        tooltip?: string;
        required?: boolean;
    }>;
}

const FORM_STEPS: FormStep[] = [
    {
        title: 'Demographics',
        icon: <User className="w-5 h-5" />,
        description: 'Personal and background information',
        fields: [
            {
                name: 'marital_status',
                label: 'Marital Status',
                type: 'select',
                options: [
                    { value: 1, label: 'Single' },
                    { value: 2, label: 'Married' },
                    { value: 3, label: 'Widower' },
                    { value: 4, label: 'Divorced' },
                    { value: 5, label: 'Facto union' },
                    { value: 6, label: 'Legally separated' },
                ],
                tooltip: 'Current marital status of the student'
            },
            { 
                name: 'application_mode', 
                label: 'Application Mode', 
                type: 'number', 
                min: 1, 
                max: 57,
                tooltip: 'Mode of application (1-57)',
                required: true
            },
            { 
                name: 'application_order', 
                label: 'Application Order', 
                type: 'number', 
                min: 0, 
                max: 9,
                tooltip: 'Order of application preference'
            },
            { 
                name: 'course', 
                label: 'Course Code', 
                type: 'number', 
                min: 1, 
                max: 9999,
                required: true,
                tooltip: 'Course identification code'
            },
            {
                name: 'daytime_evening_attendance',
                label: 'Attendance',
                type: 'select',
                options: [
                    { value: 1, label: 'Daytime' },
                    { value: 0, label: 'Evening' },
                ],
                tooltip: 'Preferred attendance schedule'
            },
            { 
                name: 'previous_qualification', 
                label: 'Previous Qualification', 
                type: 'number', 
                min: 1, 
                max: 43,
                tooltip: 'Highest qualification before enrollment'
            },
            { 
                name: 'nationality', 
                label: 'Nationality Code', 
                type: 'number', 
                min: 1, 
                max: 109,
                tooltip: 'Student nationality code'
            },
            {
                name: 'gender',
                label: 'Gender',
                type: 'select',
                options: [
                    { value: 1, label: 'Male' },
                    { value: 0, label: 'Female' },
                ],
                required: true
            },
            { 
                name: 'age_at_enrollment', 
                label: 'Age at Enrollment', 
                type: 'number', 
                min: 17, 
                max: 70,
                required: true,
                tooltip: 'Student age when enrolled'
            },
            {
                name: 'international',
                label: 'International Student',
                type: 'select',
                options: [
                    { value: 1, label: 'Yes' },
                    { value: 0, label: 'No' },
                ]
            },
            {
                name: 'displaced',
                label: 'Displaced',
                type: 'select',
                options: [
                    { value: 1, label: 'Yes' },
                    { value: 0, label: 'No' },
                ],
                tooltip: 'Student is a displaced person'
            },
            {
                name: 'educational_special_needs',
                label: 'Special Educational Needs',
                type: 'select',
                options: [
                    { value: 1, label: 'Yes' },
                    { value: 0, label: 'No' },
                ]
            },
        ],
    },
    {
        title: 'Academic',
        icon: <GraduationCap className="w-5 h-5" />,
        description: 'Academic performance metrics',
        fields: [
            { 
                name: 'admission_grade', 
                label: 'Admission Grade', 
                type: 'number', 
                min: 0, 
                max: 200, 
                step: 0.1,
                required: true,
                tooltip: 'Grade obtained at admission'
            },
            { 
                name: 'curricular_units_1st_sem_credited', 
                label: '1st Sem Credits Earned', 
                type: 'number', 
                min: 0, 
                max: 30,
                tooltip: 'Number of credits earned in first semester'
            },
            { 
                name: 'curricular_units_1st_sem_enrolled', 
                label: '1st Sem Credits Enrolled', 
                type: 'number', 
                min: 0, 
                max: 30,
                required: true
            },
            { 
                name: 'curricular_units_1st_sem_evaluations', 
                label: '1st Sem Evaluations', 
                type: 'number', 
                min: 0, 
                max: 50 
            },
            { 
                name: 'curricular_units_1st_sem_approved', 
                label: '1st Sem Courses Approved', 
                type: 'number', 
                min: 0, 
                max: 30 
            },
            { 
                name: 'curricular_units_1st_sem_grade', 
                label: '1st Semester Grade', 
                type: 'number', 
                min: 0, 
                max: 20, 
                step: 0.01,
                required: true,
                tooltip: 'Average grade for first semester'
            },
            { 
                name: 'curricular_units_1st_sem_without_evaluations', 
                label: '1st Sem No Evaluation', 
                type: 'number', 
                min: 0, 
                max: 20 
            },
            { 
                name: 'curricular_units_2nd_sem_credited', 
                label: '2nd Sem Credits Earned', 
                type: 'number', 
                min: 0, 
                max: 30 
            },
            { 
                name: 'curricular_units_2nd_sem_enrolled', 
                label: '2nd Sem Credits Enrolled', 
                type: 'number', 
                min: 0, 
                max: 30,
                required: true
            },
            { 
                name: 'curricular_units_2nd_sem_evaluations', 
                label: '2nd Sem Evaluations', 
                type: 'number', 
                min: 0, 
                max: 50 
            },
            { 
                name: 'curricular_units_2nd_sem_approved', 
                label: '2nd Sem Courses Approved', 
                type: 'number', 
                min: 0, 
                max: 30 
            },
            { 
                name: 'curricular_units_2nd_sem_grade', 
                label: '2nd Semester Grade', 
                type: 'number', 
                min: 0, 
                max: 20, 
                step: 0.01,
                required: true,
                tooltip: 'Average grade for second semester'
            },
            { 
                name: 'curricular_units_2nd_sem_without_evaluations', 
                label: '2nd Sem No Evaluation', 
                type: 'number', 
                min: 0, 
                max: 20 
            },
        ],
    },
    {
        title: 'Socio-economic',
        icon: <Wallet className="w-5 h-5" />,
        description: 'Financial and economic background',
        fields: [
            { 
                name: 'mothers_qualification', 
                label: "Mother's Qualification", 
                type: 'number', 
                min: 1, 
                max: 44,
                tooltip: 'Highest qualification of mother'
            },
            { 
                name: 'fathers_qualification', 
                label: "Father's Qualification", 
                type: 'number', 
                min: 1, 
                max: 44 
            },
            { 
                name: 'mothers_occupation', 
                label: "Mother's Occupation", 
                type: 'number', 
                min: 0, 
                max: 200 
            },
            { 
                name: 'fathers_occupation', 
                label: "Father's Occupation", 
                type: 'number', 
                min: 0, 
                max: 200 
            },
            {
                name: 'scholarship_holder',
                label: 'Scholarship Holder',
                type: 'select',
                options: [
                    { value: 1, label: 'Yes' },
                    { value: 0, label: 'No' },
                ],
                tooltip: 'Student receives scholarship'
            },
            {
                name: 'debtor',
                label: 'Debtor',
                type: 'select',
                options: [
                    { value: 1, label: 'Yes' },
                    { value: 0, label: 'No' },
                ]
            },
            {
                name: 'tuition_fees_up_to_date',
                label: 'Tuition Fees Up to Date',
                type: 'select',
                options: [
                    { value: 1, label: 'Yes' },
                    { value: 0, label: 'No' },
                ]
            },
            { 
                name: 'unemployment_rate', 
                label: 'Unemployment Rate (%)', 
                type: 'number', 
                min: 0, 
                max: 50, 
                step: 0.1,
                tooltip: 'Current unemployment rate in region'
            },
            { 
                name: 'inflation_rate', 
                label: 'Inflation Rate (%)', 
                type: 'number', 
                min: -10, 
                max: 20, 
                step: 0.1 
            },
            { 
                name: 'gdp', 
                label: 'GDP Growth (%)', 
                type: 'number', 
                min: -10, 
                max: 10, 
                step: 0.01,
                tooltip: 'Gross Domestic Product growth rate'
            },
        ],
    },
];

const DEFAULT_VALUES: PredictionInput = {
    marital_status: 1,
    application_mode: 1,
    application_order: 1,
    course: 9500,
    daytime_evening_attendance: 1,
    previous_qualification: 1,
    nationality: 1,
    gender: 1,
    age_at_enrollment: 20,
    international: 0,
    displaced: 0,
    educational_special_needs: 0,
    mothers_qualification: 1,
    fathers_qualification: 1,
    mothers_occupation: 0,
    fathers_occupation: 0,
    scholarship_holder: 0,
    debtor: 0,
    tuition_fees_up_to_date: 1,
    admission_grade: 130,
    curricular_units_1st_sem_credited: 0,
    curricular_units_1st_sem_enrolled: 6,
    curricular_units_1st_sem_evaluations: 6,
    curricular_units_1st_sem_approved: 5,
    curricular_units_1st_sem_grade: 12.5,
    curricular_units_1st_sem_without_evaluations: 0,
    curricular_units_2nd_sem_credited: 0,
    curricular_units_2nd_sem_enrolled: 6,
    curricular_units_2nd_sem_evaluations: 6,
    curricular_units_2nd_sem_approved: 5,
    curricular_units_2nd_sem_grade: 13.0,
    curricular_units_2nd_sem_without_evaluations: 0,
    unemployment_rate: 10.8,
    inflation_rate: 1.4,
    gdp: 1.74,
};

interface PredictFormProps {
    onPrediction?: (result: PredictionResult) => void;
}

export default function PredictForm({ onPrediction }: PredictFormProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<PredictionInput>(DEFAULT_VALUES);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<PredictionResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showTooltip, setShowTooltip] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    const handleChange = (name: keyof PredictionInput, value: number) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error for this field
        if (fieldErrors[name]) {
            setFieldErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validateStep = (stepIndex: number): boolean => {
        const step = FORM_STEPS[stepIndex];
        const errors: Record<string, string> = {};
        
        step.fields.forEach(field => {
            if (field.required) {
                const value = formData[field.name];
                if (value === undefined || value === null || value === '') {
                    errors[field.name] = `${field.label} is required`;
                }
                if (field.type === 'number') {
                    const numValue = Number(value);
                    if (field.min !== undefined && numValue < field.min) {
                        errors[field.name] = `${field.label} must be at least ${field.min}`;
                    }
                    if (field.max !== undefined && numValue > field.max) {
                        errors[field.name] = `${field.label} must be at most ${field.max}`;
                    }
                }
            }
        });
        
        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            if (currentStep < FORM_STEPS.length - 1) {
                setCurrentStep(prev => prev + 1);
            }
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleSubmit = async () => {
        if (!validateStep(currentStep)) return;
        
        setIsLoading(true);
        setError(null);
        try {
            const prediction = await predictionsApi.predict({ ...formData, save_record: true });
            setResult(prediction);
            onPrediction?.(prediction);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to get prediction. Please check your connection.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setFormData(DEFAULT_VALUES);
        setResult(null);
        setError(null);
        setCurrentStep(0);
        setFieldErrors({});
    };

    const currentStepData = FORM_STEPS[currentStep];
    const progress = ((currentStep + 1) / FORM_STEPS.length) * 100;

    return (
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl">
            {/* Progress Header */}
            <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 px-6 py-5 border-b border-slate-700/50">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                            Student Prediction Form
                        </h2>
                        <p className="text-slate-400 text-sm mt-1 flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            {currentStepData.description}
                        </p>
                    </div>
                    <div className="text-right">
                        <span className="text-sm text-slate-400">Step {currentStep + 1}</span>
                        <p className="text-xs text-slate-500">of {FORM_STEPS.length}</p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="relative">
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="flex justify-between mt-2">
                        {FORM_STEPS.map((step, index) => (
                            <div
                                key={index}
                                className={`flex items-center gap-2 text-xs font-medium transition-all cursor-pointer ${
                                    index <= currentStep ? 'text-cyan-400' : 'text-slate-500'
                                }`}
                                onClick={() => {
                                    if (index < currentStep) setCurrentStep(index);
                                }}
                            >
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                                    index < currentStep ? 'bg-green-500 text-white' :
                                    index === currentStep ? 'bg-cyan-500 text-white' :
                                    'bg-slate-700 text-slate-400'
                                }`}>
                                    {index < currentStep ? (
                                        <CheckCircle className="w-3 h-3" />
                                    ) : (
                                        index + 1
                                    )}
                                </div>
                                <span className="hidden sm:inline">{step.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Form Content */}
            {!result ? (
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {currentStepData.fields.map((field) => (
                            <div key={field.name} className="space-y-1.5">
                                <label className="block text-sm font-medium text-slate-300">
                                    {field.label}
                                    {field.required && <span className="text-red-400 ml-1">*</span>}
                                    {field.tooltip && (
                                        <div className="relative inline-block ml-2">
                                            <button
                                                type="button"
                                                onMouseEnter={() => setShowTooltip(field.name)}
                                                onMouseLeave={() => setShowTooltip(null)}
                                                className="text-slate-500 hover:text-slate-300 transition-colors"
                                            >
                                                <Info className="w-3.5 h-3.5" />
                                            </button>
                                            {showTooltip === field.name && (
                                                <div className="absolute z-10 left-0 bottom-full mb-2 px-3 py-2 bg-slate-800 text-xs text-slate-300 rounded-lg shadow-xl whitespace-nowrap pointer-events-none">
                                                    {field.tooltip}
                                                    <div className="absolute top-full left-3 border-4 border-transparent border-t-slate-800"></div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </label>
                                
                                {field.type === 'select' ? (
                                    <select
                                        value={formData[field.name] as number}
                                        onChange={(e) => handleChange(field.name, Number(e.target.value))}
                                        className={`w-full px-4 py-2.5 bg-slate-800/50 border rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none ${
                                            fieldErrors[field.name] 
                                                ? 'border-red-500 focus:ring-red-500' 
                                                : 'border-slate-600 hover:border-slate-500'
                                        }`}
                                    >
                                        {field.options?.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        type="number"
                                        value={formData[field.name] as number}
                                        onChange={(e) => handleChange(field.name, Number(e.target.value))}
                                        min={field.min}
                                        max={field.max}
                                        step={field.step || 1}
                                        className={`w-full px-4 py-2.5 bg-slate-800/50 border rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all outline-none ${
                                            fieldErrors[field.name] 
                                                ? 'border-red-500 focus:ring-red-500' 
                                                : 'border-slate-600 hover:border-slate-500'
                                        }`}
                                    />
                                )}
                                {fieldErrors[field.name] && (
                                    <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                                        <AlertTriangle className="w-3 h-3" />
                                        {fieldErrors[field.name]}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                    {error && (
                        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3 text-red-400 animate-shake">
                            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-medium">Prediction Failed</p>
                                <p className="text-sm">{error}</p>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-700/50">
                        <button
                            onClick={handlePrevious}
                            disabled={currentStep === 0}
                            className="flex items-center gap-2 px-5 py-2.5 text-slate-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all rounded-lg hover:bg-slate-800/50"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Previous
                        </button>

                        {currentStep < FORM_STEPS.length - 1 ? (
                            <button
                                onClick={handleNext}
                                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg shadow-cyan-500/20"
                            >
                                Next
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-500/20"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Analyzing...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="w-4 h-4" />
                                        Get Prediction
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                /* Result Display */
                <div className="p-6 animate-fadeIn">
                    <div className={`p-6 rounded-xl border-2 ${result.high_risk
                        ? 'bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/50'
                        : result.predicted_class === 'Graduate'
                            ? 'bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/50'
                            : 'bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border-yellow-500/50'
                        }`}>
                        {result.high_risk && (
                            <div className="flex items-center gap-3 mb-6 p-4 bg-red-500/20 rounded-xl border border-red-500/30 animate-pulse">
                                <AlertTriangle className="w-8 h-8 text-red-400" />
                                <div>
                                    <p className="text-red-400 font-bold text-lg">HIGH RISK ALERT</p>
                                    <p className="text-red-300 text-sm">Immediate Academic Intervention Recommended</p>
                                </div>
                            </div>
                        )}

                        <div className="text-center mb-6">
                            <div className="inline-flex items-center justify-center p-3 rounded-full mb-4 bg-slate-800/50">
                                <BarChart3 className="w-8 h-8 text-cyan-400" />
                            </div>
                            <p className="text-slate-400 text-sm uppercase tracking-wider font-medium">Predicted Status</p>
                            <p className={`text-5xl font-bold mt-2 ${
                                result.predicted_class === 'Dropout' ? 'text-red-400' :
                                result.predicted_class === 'Graduate' ? 'text-green-400' :
                                'text-yellow-400'
                            }`}>
                                {result.predicted_class}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-slate-800/50 rounded-xl p-5 text-center hover:scale-105 transition-transform">
                                <p className="text-slate-400 text-sm mb-2">Dropout Risk</p>
                                <p className="text-3xl font-bold text-white">
                                    {(result.dropout_probability * 100).toFixed(1)}%
                                </p>
                                <div className="mt-2 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full rounded-full transition-all ${
                                            result.dropout_probability > 0.7 ? 'bg-red-500' :
                                            result.dropout_probability > 0.3 ? 'bg-yellow-500' :
                                            'bg-green-500'
                                        }`}
                                        style={{ width: `${result.dropout_probability * 100}%` }}
                                    />
                                </div>
                            </div>
                            <div className="bg-slate-800/50 rounded-xl p-5 text-center hover:scale-105 transition-transform">
                                <p className="text-slate-400 text-sm mb-2">Grade Trend</p>
                                <div className="flex items-center justify-center gap-2">
                                    {result.grade_trend >= 0 ? (
                                        <TrendingUp className="w-6 h-6 text-green-400" />
                                    ) : (
                                        <TrendingDown className="w-6 h-6 text-red-400" />
                                    )}
                                    <p className={`text-3xl font-bold ${result.grade_trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        {result.grade_trend >= 0 ? '+' : ''}{result.grade_trend.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-slate-800/30 rounded-xl">
                            <p className="text-slate-400 text-sm mb-3 flex items-center gap-2">
                                <BarChart3 className="w-4 h-4" />
                                Class Probabilities
                            </p>
                            <div className="space-y-3">
                                {Object.entries(result.all_probabilities).map(([cls, prob]) => (
                                    <div key={cls}>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className={`text-sm font-medium ${
                                                cls === 'Dropout' ? 'text-red-400' :
                                                cls === 'Graduate' ? 'text-green-400' :
                                                'text-yellow-400'
                                            }`}>
                                                {cls}
                                            </span>
                                            <span className="text-xs text-slate-400">
                                                {(prob * 100).toFixed(1)}%
                                            </span>
                                        </div>
                                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all duration-500 ${
                                                    cls === 'Dropout' ? 'bg-red-500' :
                                                    cls === 'Graduate' ? 'bg-green-500' :
                                                    'bg-yellow-500'
                                                }`}
                                                style={{ width: `${prob * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {result.high_risk && (
                            <div className="mt-4 p-4 bg-red-500/10 rounded-xl border border-red-500/30">
                                <p className="text-sm text-red-300 flex items-center gap-2">
                                    <Shield className="w-4 h-4" />
                                    Recommended Actions:
                                </p>
                                <ul className="text-xs text-red-300/80 mt-2 space-y-1 list-disc list-inside">
                                    <li>Schedule immediate academic counseling</li>
                                    <li>Review current course load and performance</li>
                                    <li>Check financial aid and scholarship status</li>
                                    <li>Connect with student support services</li>
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button
                            onClick={handleReset}
                            className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                        >
                            <RefreshCw className="w-4 h-4" />
                            New Prediction
                        </button>
                        <button
                            onClick={() => window.print()}
                            className="px-6 py-3 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-xl font-medium transition-all"
                        >
                            Export Report
                        </button>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
                    20%, 40%, 60%, 80% { transform: translateX(2px); }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out;
                }
                
                .animate-shake {
                    animation: shake 0.5s ease-in-out;
                }
            `}</style>
        </div>
    );
}