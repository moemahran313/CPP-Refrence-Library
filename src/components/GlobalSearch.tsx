import React, { useState, useEffect, useRef } from 'react';
import { Search, BookOpen, Brain, PlaySquare, Terminal, ChevronRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';

// Data imports
import { DEFINITIONS } from '../data/definitions';
import { MCQS } from '../data/mcq';
import { VIDEO_CATEGORIES } from '../data/videos';
import { FUNCTIONS_ARRAYS } from '../data/functions-arrays';

export default function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  // Close on navigation
  useEffect(() => {
    setIsOpen(false);
    setQuery('');
  }, [location.pathname, location.search]);

  // Search Logic
  const getResults = () => {
    if (query.trim().length < 2) return [];
    
    const q = query.toLowerCase();
    const results = [];
    
    // Search Definitions
    DEFINITIONS.forEach(d => {
      if (d.term.toLowerCase().includes(q) || d.definition.toLowerCase().includes(q)) {
        results.push({ type: 'Definition', title: d.term, icon: BookOpen, path: `/?term=${encodeURIComponent(d.term)}`,  color: 'text-emerald-500', bg: 'bg-emerald-50' });
      }
    });
    
    // Search MCQs
    MCQS.forEach((m) => {
      if (m.trick.toLowerCase().includes(q) || m.question.toLowerCase().includes(q)) {
        results.push({ type: 'MCQ Trick', title: m.trick.substring(0, 60) + '...', icon: Brain, path: `/mcq?q=${encodeURIComponent(m.trick)}`, color: 'text-amber-500', bg: 'bg-amber-50' });
      }
    });

    // Search Videos
    VIDEO_CATEGORIES.forEach(cat => {
      cat.videos.forEach(v => {
        if (v.title.toLowerCase().includes(q)) {
          results.push({ type: 'Video', title: `${cat.instructor}: ${v.title}`, icon: PlaySquare, path: '/videos', color: 'text-red-500', bg: 'bg-red-50' });
        }
      });
    });

    // Search Functions
    FUNCTIONS_ARRAYS.forEach(f => {
      if (f.title.toLowerCase().includes(q) || f.description.toLowerCase().includes(q) || f.code.toLowerCase().includes(q)) {
        results.push({ type: 'Code', title: f.title, icon: Terminal, path: `/functions?id=${f.id}`, color: 'text-blue-500', bg: 'bg-blue-50' });
      }
    });

    return results.slice(0, 6); // Limit results
  };

  const results = getResults();

  return (
    <div className="relative w-full max-w-xl z-50" ref={wrapperRef}>
      <div className={clsx(
        "flex items-center gap-3 px-4 h-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all shadow-sm",
        isOpen && query.length >= 2 ? "rounded-t-2xl border-b-transparent shadow-md" : "rounded-full focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500"
      )}>
        <Search size={18} className="text-slate-400" />
        <input 
          type="text" 
          placeholder="Search definitions, tricks, videos or code..." 
          className="flex-1 bg-transparent border-none outline-none text-slate-700 dark:text-slate-200 placeholder:text-slate-400 text-sm font-medium"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
        {query && (
           <button onClick={() => setQuery('')} className="text-xs text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 font-medium px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md">Esc</button>
        )}
      </div>

      {isOpen && query.length >= 2 && (
        <div className="absolute top-12 left-0 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-t-0 rounded-b-2xl shadow-xl overflow-hidden py-2">
          {results.length > 0 ? (
            <div className="flex flex-col">
              {results.map((r, i) => (
                <button 
                  key={i}
                  onClick={() => navigate(r.path)}
                  className="flex items-center gap-4 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left group"
                >
                  <div className={clsx("w-8 h-8 rounded-full flex items-center justify-center shrink-0", r.bg, r.color, "dark:bg-slate-800 dark:text-slate-200")}>
                    <r.icon size={14} strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-0.5">{r.type}</div>
                    <div className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">{r.title}</div>
                  </div>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
                </button>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500 text-sm">
              <Search size={24} className="mx-auto text-slate-300 mb-2" />
              No results found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
