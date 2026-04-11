// app/about/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import {
    User,
    Code2,
    Briefcase,
    GraduationCap,
    MapPin,
    Mail,
    Phone,
    Calendar,
    Github,
    Linkedin,
    Twitter,
    Instagram,
    Globe,
    Award,
    Users,
    Rocket,
    Heart,
    Coffee,
    Laptop,
    Server,
    Cloud,
    Database,
    Shield,
    Zap,
    TrendingUp,
    Sparkles,
    Star,
    CheckCircle,
    ArrowRight
} from 'lucide-react';

export default function AboutPage() {
    const stats = [
        { value: '5+', label: 'Years Experience', icon: Briefcase },
        { value: '50+', label: 'Projects Completed', icon: Code2 },
        { value: '20+', label: 'Happy Clients', icon: Users },
        { value: '24/7', label: 'Support', icon: Heart },
    ];

    const skills = [
        { name: 'React/Next.js', level: 95, color: 'from-cyan-500 to-blue-500' },
        { name: 'TypeScript', level: 90, color: 'from-blue-500 to-indigo-500' },
        { name: 'Python/Django', level: 85, color: 'from-green-500 to-emerald-500' },
        { name: 'Node.js', level: 88, color: 'from-green-500 to-teal-500' },
        { name: 'Tailwind CSS', level: 92, color: 'from-cyan-500 to-teal-500' },
        { name: 'PostgreSQL', level: 82, color: 'from-blue-500 to-purple-500' },
        { name: 'AWS/Cloud', level: 78, color: 'from-amber-500 to-orange-500' },
        { name: 'UI/UX Design', level: 85, color: 'from-pink-500 to-rose-500' },
    ];

    const services = [
        { icon: Laptop, title: 'Web Development', desc: 'Modern, responsive web applications using Next.js and React' },
        { icon: Server, title: 'Backend API', desc: 'Scalable RESTful APIs with Django, Node.js, and PostgreSQL' },
        { icon: Cloud, title: 'Cloud Solutions', desc: 'AWS, Vercel, and Docker deployment and management' },
        { icon: Database, title: 'Database Design', desc: 'Efficient data modeling and optimization' },
        { icon: Shield, title: 'Security', desc: 'Authentication, authorization, and data protection' },
        { icon: TrendingUp, title: 'Performance', desc: 'Optimization and SEO best practices' },
    ];

    const experience = [
        { year: '2024 - Present', role: 'Senior Full Stack Developer', company: 'Tech Innovations Inc.', desc: 'Leading development of enterprise web applications' },
        { year: '2022 - 2024', role: 'Full Stack Developer', company: 'Digital Solutions Pvt. Ltd.', desc: 'Built scalable e-commerce platforms and admin dashboards' },
        { year: '2020 - 2022', role: 'Frontend Developer', company: 'Creative Agency', desc: 'Developed responsive websites and UI components' },
        { year: '2019 - 2020', role: 'Intern Developer', company: 'StartUp Hub', desc: 'Learned modern web technologies and best practices' },
    ];

    const achievements = [
        { icon: Award, title: 'Best Developer Award', year: '2023', color: 'from-amber-500 to-yellow-500' },
        { icon: Rocket, title: 'Project of the Year', year: '2022', color: 'from-purple-500 to-pink-500' },
        { icon: Star, title: '5-Star Rating', year: '2024', color: 'from-cyan-500 to-blue-500' },
        { icon: Users, title: 'Team Leader', year: '2023', color: 'from-emerald-500 to-green-500' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl"></div>
            </div>

            <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <div className="relative inline-block">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                        <div className="relative w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 p-1">
                            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                                <span className="text-4xl font-bold text-white">AK</span>
                            </div>
                        </div>
                    </div>
                    
                    <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent mb-4">
                        Ameet Kumar Dheera
                    </h1>
                    <p className="text-xl text-cyan-400 mb-3 flex items-center justify-center gap-2">
                        <Code2 className="w-5 h-5" />
                        Full Stack Developer
                    </p>
                    <div className="flex items-center justify-center gap-4 text-slate-400 text-sm mb-6 flex-wrap">
                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Pakistan</span>
                        <span className="flex items-center gap-1"><Mail className="w-4 h-4" /> amishdhera@gmail.com</span>
                        <span className="flex items-center gap-1"><Phone className="w-4 h-4" /> 03161103616</span>
                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Available for work</span>
                    </div>
                    
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <a href="#" className="p-2 bg-slate-800/50 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-all">
                            <Github className="w-5 h-5" />
                        </a>
                        <a href="#" className="p-2 bg-slate-800/50 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-all">
                            <Linkedin className="w-5 h-5" />
                        </a>
                        <a href="#" className="p-2 bg-slate-800/50 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-all">
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a href="#" className="p-2 bg-slate-800/50 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-all">
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a href="#" className="p-2 bg-slate-800/50 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-all">
                            <Globe className="w-5 h-5" />
                        </a>
                    </div>

                    <p className="max-w-2xl mx-auto text-slate-300 text-lg leading-relaxed">
                        Passionate Full Stack Developer with 5+ years of experience building modern web applications. 
                        Specialized in React, Next.js, Python, and cloud technologies. Love creating elegant solutions 
                        to complex problems and helping students succeed in their academic journey.
                    </p>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div key={index} className="group relative overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300">
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                <div className="inline-flex p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl mb-4">
                                    <Icon className="w-6 h-6 text-cyan-400" />
                                </div>
                                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                                <p className="text-sm text-slate-400">{stat.label}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Skills Section */}
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 mb-12">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl">
                            <Code2 className="w-6 h-6 text-cyan-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Technical Skills</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {skills.map((skill, index) => (
                            <div key={index}>
                                <div className="flex justify-between mb-2">
                                    <span className="text-slate-300 font-medium">{skill.name}</span>
                                    <span className="text-cyan-400 text-sm">{skill.level}%</span>
                                </div>
                                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000`}
                                        style={{ width: `${skill.level}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Services Section */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl">
                            <Rocket className="w-6 h-6 text-purple-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">What I Do</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, index) => {
                            const Icon = service.icon;
                            return (
                                <div key={index} className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300">
                                    <div className="inline-flex p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                                        <Icon className="w-6 h-6 text-cyan-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
                                    <p className="text-sm text-slate-400">{service.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Experience Section */}
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 mb-12">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-xl">
                            <Briefcase className="w-6 h-6 text-emerald-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Work Experience</h2>
                    </div>
                    
                    <div className="space-y-6">
                        {experience.map((exp, index) => (
                            <div key={index} className="relative pl-6 border-l-2 border-cyan-500/30 hover:border-cyan-500 transition-all">
                                <div className="absolute -left-2 top-0 w-3 h-3 rounded-full bg-cyan-500"></div>
                                <div className="mb-1">
                                    <span className="text-sm text-cyan-400">{exp.year}</span>
                                </div>
                                <h3 className="text-lg font-semibold text-white">{exp.role}</h3>
                                <p className="text-slate-400 font-medium mb-2">{exp.company}</p>
                                <p className="text-sm text-slate-500">{exp.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Achievements Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-xl">
                                <Award className="w-6 h-6 text-amber-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">Achievements</h2>
                        </div>
                        
                        <div className="space-y-4">
                            {achievements.map((achieve, index) => {
                                const Icon = achieve.icon;
                                return (
                                    <div key={index} className="flex items-center gap-4 p-3 bg-slate-800/30 rounded-xl">
                                        <div className={`p-2 rounded-lg bg-gradient-to-r ${achieve.color} bg-opacity-20`}>
                                            <Icon className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-white font-medium">{achieve.title}</p>
                                            <p className="text-xs text-slate-500">{achieve.year}</p>
                                        </div>
                                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Contact/Call to Action */}
                    <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/30 text-center">
                        <div className="inline-flex p-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl mb-6">
                            <Coffee className="w-10 h-10 text-cyan-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">Let's Work Together!</h3>
                        <p className="text-slate-300 mb-6">Available for freelance projects and full-time opportunities</p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link href="/contact" className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2">
                                Contact Me
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link href="/projects" className="px-6 py-3 bg-slate-800/50 hover:bg-slate-800 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2">
                                View Projects
                                <Briefcase className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer Quote */}
                <div className="text-center pt-8 border-t border-slate-700/50">
                    <p className="text-slate-500 text-sm flex items-center justify-center gap-2">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        "Building digital experiences that matter"
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                    </p>
                    <p className="text-xs text-slate-600 mt-3">
                        © 2024 Ameet Kumar Dheera. All rights reserved.
                    </p>
                </div>
            </main>

            <style jsx>{`
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