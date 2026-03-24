// 'use client';

// import React, { useState, useCallback } from 'react';
// import { Upload, FileText, AlertTriangle, CheckCircle, Loader2, X } from 'lucide-react';
// import { useDropzone } from 'react-dropzone';
// import { predictionsApi } from '@/lib/api';

// export default function FileUpload() {
//     const [file, setFile] = useState<File | null>(null);
//     const [uploading, setUploading] = useState(false);
//     const [result, setResult] = useState<any | null>(null);
//     const [error, setError] = useState<string | null>(null);

//     const onDrop = useCallback((acceptedFiles: File[]) => {
//         if (acceptedFiles?.length > 0) {
//             setFile(acceptedFiles[0]);
//             setResult(null);
//             setError(null);
//         }
//     }, []);

//     const { getRootProps, getInputProps, isDragActive } = useDropzone({
//         onDrop,
//         accept: {
//             'text/csv': ['.csv'],
//         },
//         maxFiles: 1,
//     });

//     const handleUpload = async () => {
//         if (!file) return;

//         setUploading(true);
//         setError(null);
//         try {
//             const data = await predictionsApi.uploadCSV(file);
//             setResult(data);
//             setFile(null);
//         } catch (err: any) {
//             setError(err.response?.data?.error || 'Upload failed. Please check the file format.');
//         } finally {
//             setUploading(false);
//         }
//     };

//     return (
//         <div className="w-full max-w-2xl mx-auto">
//             {!result && (
//                 <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
//                     <div className="text-center mb-6">
//                         <h2 className="text-xl font-semibold text-white">Batch Prediction</h2>
//                         <p className="text-slate-400 text-sm mt-1">Upload a CSV file to process multiple student records at once.</p>
//                     </div>

//                     <div
//                         {...getRootProps()}
//                         className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all
//                             ${isDragActive
//                                 ? 'border-cyan-500 bg-cyan-500/10'
//                                 : 'border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800/50'
//                             }`}
//                     >
//                         <input {...getInputProps()} />
//                         {file ? (
//                             <div className="flex flex-col items-center">
//                                 <div className="p-4 bg-cyan-500/20 rounded-full mb-4">
//                                     <FileText className="w-8 h-8 text-cyan-400" />
//                                 </div>
//                                 <p className="text-white font-medium">{file.name}</p>
//                                 <p className="text-slate-400 text-sm mt-1">{(file.size / 1024).toFixed(1)} KB</p>
//                                 <button
//                                     onClick={(e) => {
//                                         e.stopPropagation();
//                                         setFile(null);
//                                     }}
//                                     className="mt-4 text-xs text-red-400 hover:text-red-300"
//                                 >
//                                     Remove File
//                                 </button>
//                             </div>
//                         ) : (
//                             <div className="flex flex-col items-center">
//                                 <div className="p-4 bg-slate-800 rounded-full mb-4">
//                                     <Upload className="w-8 h-8 text-slate-400" />
//                                 </div>
//                                 <p className="text-slate-300 font-medium">Click to upload or drag and drop</p>
//                                 <p className="text-slate-500 text-sm mt-1">CSV files only</p>
//                             </div>
//                         )}
//                     </div>

//                     {error && (
//                         <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400">
//                             <AlertTriangle className="w-5 h-5 flex-shrink-0" />
//                             <p className="text-sm">{error}</p>
//                         </div>
//                     )}

//                     <button
//                         onClick={handleUpload}
//                         disabled={!file || uploading}
//                         className={`w-full mt-6 py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2
//                             ${!file || uploading
//                                 ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
//                                 : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white'
//                             }`}
//                     >
//                         {uploading ? (
//                             <>
//                                 <Loader2 className="w-5 h-5 animate-spin" />
//                                 Processing...
//                             </>
//                         ) : (
//                             <>
//                                 <Upload className="w-5 h-5" />
//                                 Start Processing
//                             </>
//                         )}
//                     </button>

//                     <div className="mt-6 pt-6 border-t border-slate-700/50">
//                         <p className="text-xs text-slate-500 text-center">
//                             Expected CSV headers should match API fields (e.g., marital_status, course, etc.)
//                         </p>
//                     </div>
//                 </div>
//             )}

//             {result && (
//                 <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-700/50 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4">
//                     <div className="flex items-center gap-4 mb-6">
//                         <div className="p-3 bg-green-500/20 rounded-full">
//                             <CheckCircle className="w-6 h-6 text-green-400" />
//                         </div>
//                         <div>
//                             <h2 className="text-xl font-semibold text-white">Processing Complete</h2>
//                             <p className="text-slate-400 text-sm">Successfully analyzed batch data</p>
//                         </div>
//                         <button
//                             onClick={() => setResult(null)}
//                             className="ml-auto p-2 text-slate-400 hover:text-white"
//                         >
//                             <X className="w-5 h-5" />
//                         </button>
//                     </div>

//                     <div className="grid grid-cols-2 gap-4 mb-6">
//                         <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
//                             <p className="text-slate-400 text-sm">Processed Records</p>
//                             <p className="text-2xl font-bold text-white">{result.processed_count}</p>
//                         </div>
//                         <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
//                             <p className="text-slate-400 text-sm">High Risk Detected</p>
//                             <p className="text-2xl font-bold text-red-400">{result.high_risk_count}</p>
//                         </div>
//                     </div>

//                     {result.errors && result.errors.length > 0 && (
//                         <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
//                             <h4 className="text-red-400 font-medium mb-2 flex items-center gap-2">
//                                 <AlertTriangle className="w-4 h-4" />
//                                 Errors ({result.errors.length})
//                             </h4>
//                             <ul className="text-xs text-red-300 space-y-1 max-h-40 overflow-y-auto">
//                                 {result.errors.map((err: string, i: number) => (
//                                     <li key={i}>{err}</li>
//                                 ))}
//                             </ul>
//                         </div>
//                     )}

//                     <button
//                         onClick={() => setResult(null)}
//                         className="w-full mt-6 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition-all"
//                     >
//                         Upload Another File
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// }
'use client';

import React, { useState, useCallback } from 'react';
import { 
    Upload, 
    FileText, 
    AlertTriangle, 
    CheckCircle, 
    Loader2, 
    X,
    Download,
    FileSpreadsheet,
    Database,
    TrendingUp,
    BarChart3,
    Info,
    AlertCircle,
    Check,
    ArrowRight
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { predictionsApi } from '@/lib/api';

export default function FileUpload() {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [result, setResult] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showPreview, setShowPreview] = useState(false);
    const [previewData, setPreviewData] = useState<string[]>([]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles?.length > 0) {
            const selectedFile = acceptedFiles[0];
            setFile(selectedFile);
            setResult(null);
            setError(null);
            
            // Preview CSV content
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target?.result as string;
                const lines = text.split('\n').slice(0, 5);
                setPreviewData(lines);
            };
            reader.readAsText(selectedFile);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'text/csv': ['.csv'],
        },
        maxFiles: 1,
    });

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        setError(null);
        try {
            const data = await predictionsApi.uploadCSV(file);
            setResult(data);
            setFile(null);
            setPreviewData([]);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Upload failed. Please check the file format.');
        } finally {
            setUploading(false);
        }
    };

    const downloadTemplate = () => {
        const template = `student_id,marital_status,course,daytime_evening_attendance,previous_qualification,nacionality,mothers_qualification,fathers_qualification,mothers_occupation,fathers_occupation,displaced,educational_special_needs,debtor,tuition_fees_up_to_date,gender,scholarship_holder,age_at_enrollment,international,curricular_units_1st_sem_credited,curricular_units_1st_sem_enrolled,curricular_units_1st_sem_grade,curricular_units_2nd_sem_credited,curricular_units_2nd_sem_enrolled,curricular_units_2nd_sem_grade
S001,1,1,1,1,1,1,1,1,1,0,0,0,1,1,0,20,0,5,6,12.5,4,5,13.2
S002,2,2,0,2,2,2,2,2,2,0,0,0,1,2,1,22,0,4,5,11.8,5,6,12.9`;
        
        const blob = new Blob([template], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'student_data_template.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-20 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="w-full max-w-4xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl shadow-lg shadow-cyan-500/20 mb-4">
                        <FileSpreadsheet className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
                        Batch Prediction
                    </h1>
                    <p className="text-slate-400">
                        Upload CSV files to process multiple student records and generate dropout risk predictions
                    </p>
                </div>

                {!result ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Upload Area */}
                        <div className="lg:col-span-2">
                            <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6">
                                <div className="text-center mb-6">
                                    <h2 className="text-xl font-semibold text-white">Upload CSV File</h2>
                                    <p className="text-slate-400 text-sm mt-1">
                                        Drag and drop your file or click to browse
                                    </p>
                                </div>

                                <div
                                    {...getRootProps()}
                                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300
                                        ${isDragActive
                                            ? 'border-cyan-500 bg-cyan-500/10 scale-[1.02]'
                                            : 'border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800/30'
                                        }`}
                                >
                                    <input {...getInputProps()} />
                                    {file ? (
                                        <div className="flex flex-col items-center">
                                            <div className="p-4 bg-cyan-500/20 rounded-full mb-4 animate-pulse">
                                                <FileText className="w-10 h-10 text-cyan-400" />
                                            </div>
                                            <p className="text-white font-medium text-lg">{file.name}</p>
                                            <p className="text-slate-400 text-sm mt-1">
                                                {(file.size / 1024).toFixed(1)} KB
                                            </p>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setFile(null);
                                                    setPreviewData([]);
                                                }}
                                                className="mt-4 px-3 py-1.5 text-xs text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-all flex items-center gap-1"
                                            >
                                                <X className="w-3 h-3" />
                                                Remove File
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <div className="p-4 bg-slate-800 rounded-full mb-4 group-hover:scale-110 transition-transform">
                                                <Upload className="w-10 h-10 text-slate-400" />
                                            </div>
                                            <p className="text-slate-300 font-medium">
                                                {isDragActive ? 'Drop your file here' : 'Click to upload or drag and drop'}
                                            </p>
                                            <p className="text-slate-500 text-sm mt-2 flex items-center gap-1">
                                                <FileSpreadsheet className="w-3 h-3" />
                                                CSV files only (max 10MB)
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {error && (
                                    <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-400 animate-shake">
                                        <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">Upload Failed</p>
                                            <p className="text-sm opacity-90">{error}</p>
                                        </div>
                                    </div>
                                )}

                                <button
                                    onClick={handleUpload}
                                    disabled={!file || uploading}
                                    className={`group relative w-full mt-6 py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden
                                        ${!file || uploading
                                            ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                                        }`}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                                    <span className="relative flex items-center justify-center gap-2">
                                        {uploading ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="w-5 h-5" />
                                                Start Processing
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </span>
                                </button>

                                {/* File Preview */}
                                {file && previewData.length > 0 && (
                                    <div className="mt-6">
                                        <button
                                            onClick={() => setShowPreview(!showPreview)}
                                            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                                        >
                                            <FileText className="w-4 h-4" />
                                            {showPreview ? 'Hide Preview' : 'Show Preview'}
                                        </button>
                                        
                                        {showPreview && (
                                            <div className="mt-3 p-3 bg-slate-800/30 rounded-xl border border-slate-700/50 animate-slideDown">
                                                <p className="text-xs text-slate-400 mb-2">File Preview (first 5 lines):</p>
                                                <pre className="text-xs text-slate-300 overflow-x-auto whitespace-pre-wrap">
                                                    {previewData.map((line, i) => (
                                                        <div key={i} className="font-mono border-b border-slate-700/50 py-1">
                                                            {line || <span className="text-slate-600">[empty line]</span>}
                                                        </div>
                                                    ))}
                                                </pre>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Info Panel */}
                        <div className="lg:col-span-1">
                            <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 sticky top-24">
                                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <Info className="w-5 h-5 text-cyan-400" />
                                    Instructions
                                </h3>
                                
                                <div className="space-y-4">
                                    <div className="p-3 bg-slate-800/30 rounded-lg">
                                        <p className="text-sm text-slate-300 font-medium mb-2">📋 Required Format</p>
                                        <p className="text-xs text-slate-400">
                                            CSV file with headers matching the API schema. First row must contain column names.
                                        </p>
                                    </div>
                                    
                                    <div className="p-3 bg-slate-800/30 rounded-lg">
                                        <p className="text-sm text-slate-300 font-medium mb-2">📊 Key Fields</p>
                                        <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                                            <li>student_id - Unique identifier</li>
                                            <li>course - Course code</li>
                                            <li>gender - Student gender</li>
                                            <li>age_at_enrollment - Age when enrolled</li>
                                            <li>curricular_units_*_grade - Grades</li>
                                        </ul>
                                    </div>
                                    
                                    <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                                        <p className="text-sm text-cyan-400 font-medium mb-2 flex items-center gap-2">
                                            <Download className="w-4 h-4" />
                                            Need a template?
                                        </p>
                                        <button
                                            onClick={downloadTemplate}
                                            className="w-full px-3 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2"
                                        >
                                            <Download className="w-4 h-4" />
                                            Download CSV Template
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="mt-6 pt-4 border-t border-slate-700/50">
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        <AlertCircle className="w-3 h-3" />
                                        <span>Maximum file size: 10MB</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Results Section
                    <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8 animate-fadeIn">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-green-500/20 rounded-full">
                                <CheckCircle className="w-8 h-8 text-green-400" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-semibold text-white">Processing Complete</h2>
                                <p className="text-slate-400 text-sm">Successfully analyzed batch data</p>
                            </div>
                            <button
                                onClick={() => setResult(null)}
                                className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-5 rounded-xl border border-slate-700/50">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-blue-500/10 rounded-lg">
                                        <Database className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <p className="text-slate-400 text-sm">Processed Records</p>
                                </div>
                                <p className="text-3xl font-bold text-white">{result.processed_count}</p>
                            </div>
                            
                            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-5 rounded-xl border border-slate-700/50">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-red-500/10 rounded-lg">
                                        <AlertTriangle className="w-5 h-5 text-red-400" />
                                    </div>
                                    <p className="text-slate-400 text-sm">High Risk Detected</p>
                                </div>
                                <p className="text-3xl font-bold text-red-400">{result.high_risk_count}</p>
                            </div>
                            
                            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-5 rounded-xl border border-slate-700/50">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-amber-500/10 rounded-lg">
                                        <TrendingUp className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <p className="text-slate-400 text-sm">Success Rate</p>
                                </div>
                                <p className="text-3xl font-bold text-white">
                                                    {((result.processed_count - (result.errors?.length || 0)) / result.processed_count * 100).toFixed(1)}%
                                                </p>
                                            </div>
                                        </div>

                        {/* Errors Section */}
                        {result.errors && result.errors.length > 0 && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6">
                                <h4 className="text-red-400 font-medium mb-3 flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" />
                                    Processing Errors ({result.errors.length})
                                </h4>
                                <div className="max-h-40 overflow-y-auto space-y-1">
                                    {result.errors.map((err: string, i: number) => (
                                        <div key={i} className="text-xs text-red-300 font-mono bg-red-500/5 p-2 rounded">
                                            {err}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => setResult(null)}
                                className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2"
                            >
                                <Upload className="w-4 h-4" />
                                Upload Another File
                            </button>
                            <button
                                onClick={() => {
                                    // Download results as JSON
                                    const dataStr = JSON.stringify(result, null, 2);
                                    const blob = new Blob([dataStr], { type: 'application/json' });
                                    const url = URL.createObjectURL(blob);
                                    const a = document.createElement('a');
                                    a.href = url;
                                    a.download = 'prediction_results.json';
                                    a.click();
                                    URL.revokeObjectURL(url);
                                }}
                                className="px-6 py-3 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 font-medium rounded-xl transition-all flex items-center gap-2"
                            >
                                <Download className="w-4 h-4" />
                                Export Results
                            </button>
                        </div>
                    </div>
                )}

                {/* Features Section */}
                {!result && (
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-slate-800/30 rounded-xl p-4 text-center">
                            <BarChart3 className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                            <p className="text-xs text-slate-400">Bulk predictions for multiple students</p>
                        </div>
                        <div className="bg-slate-800/30 rounded-xl p-4 text-center">
                            <TrendingUp className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                            <p className="text-xs text-slate-400">Identify high-risk patterns at scale</p>
                        </div>
                        <div className="bg-slate-800/30 rounded-xl p-4 text-center">
                            <Download className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                            <p className="text-xs text-slate-400">Export results for further analysis</p>
                        </div>
                    </div>
                )}
            </div>

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
                
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
                    20%, 40%, 60%, 80% { transform: translateX(2px); }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out;
                }
                
                .animate-slideDown {
                    animation: slideDown 0.3s ease-out;
                }
                
                .animate-shake {
                    animation: shake 0.5s ease-in-out;
                }
            `}</style>
        </div>
    );
}