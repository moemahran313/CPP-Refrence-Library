import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { Trophy, Clock, Target, Flame } from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'motion/react';
import { useTheme } from '../contexts/ThemeContext';

const timeData = [
  { day: 'Mon', hours: 1.2 },
  { day: 'Tue', hours: 2.5 },
  { day: 'Wed', hours: 1.8 },
  { day: 'Thu', hours: 3.0 },
  { day: 'Fri', hours: 2.1 },
  { day: 'Sat', hours: 4.5 },
  { day: 'Sun', hours: 3.2 },
];

const conceptMastery = [
  { name: 'Variables', value: 95 },
  { name: 'Loops', value: 80 },
  { name: 'Functions', value: 65 },
  { name: 'Arrays', value: 45 },
  { name: 'Pointers', value: 25 },
  { name: 'Number Sys', value: 60 },
];

const mcqProgress = [
  { name: 'Completed', value: 142 },
  { name: 'Remaining', value: 58 },
];

export default function Dashboard() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const PIE_COLORS = isDark ? ['#3b82f6', '#1e293b'] : ['#3b82f6', '#f1f5f9'];
  const gridColor = isDark ? '#334155' : '#E2E8F0';
  const labelColor = isDark ? '#94A3B8' : '#64748B';

  const tooltipStyle = {
    backgroundColor: isDark ? '#0f172a' : '#ffffff',
    borderColor: isDark ? '#1e293b' : '#e2e8f0',
    color: isDark ? '#f8fafc' : '#0f172a',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Student Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Track your study progress and syllabus mastery.</p>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Study Streak", value: "14 Days", icon: Flame, color: "text-orange-500 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-950/40" },
          { label: "Total Time", value: "28.5 hrs", icon: Clock, color: "text-blue-500 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-950/40" },
          { label: "MCQs Solved", value: "142", icon: Target, color: "text-emerald-500 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/40" },
          { label: "Overall Mastery", value: "68%", icon: Trophy, color: "text-amber-500 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-950/40" },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm flex items-center gap-4"
          >
            <div className={clsx("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0", stat.bg, stat.color)}>
              <stat.icon size={24} strokeWidth={2.5} />
            </div>
            <div>
              <div className="font-medium text-slate-500 dark:text-slate-400 text-sm">{stat.label}</div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Time Spent Area */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Time Spent Studying (This Week)</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Visualizing your dedication across the week.</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timeData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: labelColor, fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: labelColor, fontSize: 12 }} />
                <RechartsTooltip 
                  cursor={{ fill: isDark ? 'rgba(51, 65, 85, 0.3)' : '#F1F5F9' }}
                  contentStyle={tooltipStyle}
                />
                <Bar dataKey="hours" fill="#3B82F6" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* MCQ Completion */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center">
          <div className="text-center mb-2">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">MCQ Completion</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Progress toward test bank.</p>
          </div>
          <div className="h-48 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={mcqProgress} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                  {mcqProgress.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-black text-slate-900 dark:text-white">71%</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Completed</span>
            </div>
          </div>
        </div>

      </div>

      {/* Concept Mastery Row */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Concept Mastery (Flashcards & Definitions)</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Identifies your weak points requiring further review.</p>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={conceptMastery} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: labelColor, fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: labelColor, fontSize: 12 }} domain={[0, 100]} />
              <RechartsTooltip 
                cursor={{ stroke: isDark ? '#475569' : '#94A3B8', strokeWidth: 1, strokeDasharray: '4 4' }}
                contentStyle={tooltipStyle}
              />
              <Line type="monotone" dataKey="value" stroke="#8B5CF6" strokeWidth={4} dot={{ strokeWidth: 4, r: 6, fill: isDark ? '#0f172a' : '#fff', stroke: '#8B5CF6' }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
