import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { BookOpen, HelpCircle, PlaySquare, Binary, CodeSquare, LayoutDashboard, Map, Sun, Moon, Terminal, GraduationCap, Menu, X } from 'lucide-react';
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
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-200 flex flex-col md:flex-row text-slate-900 dark:text-slate-50 font-sans">
        {/* Sidebar Overlay (Mobile) */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <nav className={cn(
          "fixed md:sticky top-0 left-0 h-full w-72 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 flex flex-col pt-6 pb-6 z-50 transition-transform duration-300 md:translate-x-0 cursor-default",
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}>
          <div className="px-6 mb-8 mt-2 flex items-center justify-between">
            <div>
              <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-black font-mono text-lg mb-4 shadow-lg shadow-blue-600/30">
                {'</>'}
              </div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-1">
                C++ <span className="text-blue-600 dark:text-blue-400">Reference</span>
              </h1>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                By Muhammad Mahran
              </p>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="p-2 md:hidden text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-1 px-4 space-y-1 overflow-y-auto">
            <NavItem onClick={() => setSidebarOpen(false)} to="/dashboard" icon={<LayoutDashboard size={18} />} label="Dashboard" />
            
            <div className="pt-4 pb-2">
              <span className="px-4 text-[10px] font-bold tracking-widest uppercase text-slate-600 dark:text-slate-500">Learn</span>
            </div>

            <NavItem onClick={() => setSidebarOpen(false)} to="/curriculum" icon={<Map size={18} />} label="Curriculum" />
            <NavItem onClick={() => setSidebarOpen(false)} to="/functions" icon={<CodeSquare size={18} />} label="Functions & Arrays" />

            <div className="pt-4 pb-2">
              <span className="px-4 text-[10px] font-bold tracking-widest uppercase text-slate-600 dark:text-slate-500">Interactive Labs</span>
            </div>
            
            <NavItem onClick={() => setSidebarOpen(false)} to="/playground" icon={<Terminal size={18} />} label={
              <div className="flex items-center justify-between w-full">
                <span>C++ Compiler Sandbox</span>
                <span className="text-[8px] px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded font-black uppercase tracking-tighter">Live</span>
              </div>
            } />
            <NavItem onClick={() => setSidebarOpen(false)} to="/exams" icon={<GraduationCap size={18} />} label="Final Exams Prep" />
            
            <div className="pt-4 pb-2">
              <span className="px-4 text-[10px] font-bold tracking-widest uppercase text-slate-600 dark:text-slate-500">Resources</span>
            </div>

            <NavItem onClick={() => setSidebarOpen(false)} to="/" icon={<BookOpen size={18} />} label="Definitions" />
            <NavItem onClick={() => setSidebarOpen(false)} to="/mcq" icon={<HelpCircle size={18} />} label="MCQ & Tricks" />
            <NavItem onClick={() => setSidebarOpen(false)} to="/videos" icon={<PlaySquare size={18} />} label="Video Lectures" />
            <NavItem onClick={() => setSidebarOpen(false)} to="/number-systems" icon={<Binary size={18} />} label="Number Systems" />
          </div>
          
          <div className="px-6 mt-auto pt-4 pb-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
            <a 
              href="https://discord.com/invite/kyfDh68RCh" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.792 19.792 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.579.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 006.012 3.033.078.078 0 00.085-.027c.46-.63.882-1.296 1.25-1.997a.077.077 0 00-.041-.107 12.31 12.31 0 01-1.78-.853.077.077 0 01-.008-.128c.115-.085.23-.174.343-.264a.078.078 0 01.084-.006 14.076 14.076 0 006.516 0 .078.078 0 01.084.006c.114.09.229.179.344.264a.077.077 0 01-.008.128 12.186 12.186 0 01-1.78.853.076.076 0 00-.04.107c.368.701.79 1.367 1.25 1.997a.078.078 0 00.085.027 19.845 19.845 0 006.012-3.033.08.08 0 00.031-.057c.484-5.111-.328-9.644-3.585-14.321a.07.07 0 00-.032-.027zM8.25 14.86c-1.07 0-1.954-.98-1.954-2.186 0-1.205.884-2.186 1.954-2.186 1.07 0 1.954.98 1.954 2.186 0 1.205-.884 2.186-1.954 2.186zm7.5 0c-1.07 0-1.954-.98-1.954-2.186 0-1.205.884-2.186 1.954-2.186 1.07 0 1.954.98 1.954 2.186 0 1.205-.884 2.186-1.954 2.186z" />
              </svg>
              Join Modern Academy’s Server
            </a>
            <div className="flex items-center justify-between text-[10px] font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500">
               <span>v1.2.0</span>
               <span>Modern Academy</span>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          {/* Header */}
          <header className="h-16 md:h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 md:px-8 z-30 shrink-0 shadow-sm relative transition-colors duration-200">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="p-2 md:hidden text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Menu size={20} />
              </button>
              <div className="hidden sm:block md:hidden font-bold font-mono text-slate-900 dark:text-white">
                C++ <span className="text-blue-600 dark:text-blue-400">Library</span>
              </div>
            </div>
            
            {/* Global Search Component */}
            <div className="flex-1 max-w-2xl ml-auto md:mx-auto relative px-2">
              <GlobalSearch />
            </div>
            
            <div className="flex ml-2 md:ml-4 w-12 items-center justify-end">
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

function NavItem({ to, icon, label, onClick }: { to: string; icon: React.ReactNode; label: React.ReactNode; onClick?: () => void }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
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
