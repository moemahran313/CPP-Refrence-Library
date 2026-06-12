import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { BookOpen, HelpCircle, PlaySquare, Binary, CodeSquare, LayoutDashboard, Map, Sun, Moon, Terminal, GraduationCap } from 'lucide-react';
import { cn } from './lib/utils';
import Definitions from './pages/Definitions';
import MCQ from './pages/MCQ';
import Videos from './pages/Videos';
import NumberSystems from './pages/NumberSystems';
import FunctionsArrays from './pages/FunctionsArrays';
import GlobalSearch from './components/GlobalSearch';
import Dashboard from './pages/Dashboard';
import Curriculum from './pages/Curriculum';
import Playground from './pages/Playground';
import Exams from './pages/Exams';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="p-2 ml-4 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}

function AppContent() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-200 flex flex-col md:flex-row text-slate-900 dark:text-slate-50 font-sans">
        {/* Sidebar */}
        <nav className="w-full md:w-72 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 flex flex-col pt-6 pb-4 z-20 hidden md:flex">
          <div className="px-6 mb-8 mt-2">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-black font-mono text-lg mb-4 shadow-lg shadow-blue-600/30">
              {'</>'}
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-1">
              C++ <span className="text-blue-600 dark:text-blue-400">Reference</span>
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Modern Academy
            </p>
          </div>
          
          <div className="flex-1 px-4 space-y-2">
            <NavItem to="/dashboard" icon={<LayoutDashboard size={18} />} label="Dashboard" />
            
            <div className="pt-4 pb-2">
              <span className="px-4 text-[10px] font-bold tracking-widest uppercase text-slate-600 dark:text-slate-500">Learn</span>
            </div>

            <NavItem to="/curriculum" icon={<Map size={18} />} label="Curriculum" />
            <NavItem to="/functions" icon={<CodeSquare size={18} />} label="Functions & Arrays" />

            <div className="pt-4 pb-2">
              <span className="px-4 text-[10px] font-bold tracking-widest uppercase text-slate-600 dark:text-slate-500">Interactive Labs</span>
            </div>
            
            <NavItem to="/playground" icon={<Terminal size={18} />} label="C++ Compiler Sandbox" />
            <NavItem to="/exams" icon={<GraduationCap size={18} />} label="Final Exams Prep" />
            
            <div className="pt-4 pb-2">
              <span className="px-4 text-[10px] font-bold tracking-widest uppercase text-slate-600 dark:text-slate-500">Resources</span>
            </div>

            <NavItem to="/" icon={<BookOpen size={18} />} label="Definitions" />
            <NavItem to="/mcq" icon={<HelpCircle size={18} />} label="MCQ & Tricks" />
            <NavItem to="/videos" icon={<PlaySquare size={18} />} label="Video Lectures" />
            <NavItem to="/number-systems" icon={<Binary size={18} />} label="Number Systems" />
          </div>
          
          <div className="px-6 mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="text-[10px] font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-1">v1.2.0</div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              by <span className="font-bold text-slate-800 dark:text-slate-300">Muhammad Mahran</span>
            </p>
          </div>
        </nav>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          {/* Header */}
          <header className="h-16 md:h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 md:px-8 z-30 shrink-0 shadow-sm relative transition-colors duration-200">
            <div className="md:hidden font-bold font-mono text-slate-900 dark:text-white">
              C++ <span className="text-blue-600 dark:text-blue-400">Library</span>
            </div>
            
            {/* Global Search Component */}
            <div className="flex-1 max-w-2xl ml-auto md:mx-auto relative">
              <GlobalSearch />
            </div>
            
            <div className="hidden md:flex ml-4 w-12 items-center justify-end">
               <ThemeToggle />
            </div> 
          </header>

          {/* Main Scrollable Area */}
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Definitions />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/curriculum" element={<Curriculum />} />
              <Route path="/playground" element={<Playground />} />
              <Route path="/exams" element={<Exams />} />
              <Route path="/mcq" element={<MCQ />} />
              <Route path="/functions" element={<FunctionsArrays />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/number-systems" element={<NumberSystems />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function NavItem({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
          isActive 
            ? "bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 font-bold" 
            : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
        )
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}
