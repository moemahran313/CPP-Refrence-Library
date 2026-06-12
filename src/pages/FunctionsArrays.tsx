import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FUNCTIONS_ARRAYS } from '../data/functions-arrays';
import { Terminal, Code, BookOpen, Info, Zap, X, PenTool } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'motion/react';
import CppPlayground from '../components/CppPlayground';

const KEYWORDS_DICT: Record<string, { doc: string; type: string }> = {
  "#include": { doc: "Preprocessor directive to include a library file before compiling.", type: "Directive" },
  "<iostream>": { doc: "Input/Output Stream library. Allows us to use cin and cout.", type: "Library" },
  "using": { doc: "Tells the compiler to use a specific namespace.", type: "Keyword" },
  "namespace": { doc: "A declarative region that provides a scope to the identifiers inside it.", type: "Keyword" },
  "std": { doc: "Standard namespace where C++ standard library functions are defined.", type: "Namespace" },
  "const": { doc: "Declares a constant variable whose value cannot be changed after initialization.", type: "Keyword" },
  "int": { doc: "Integer data type (whole numbers).", type: "Keyword" },
  "double": { doc: "Double-precision floating-point data type (numbers with decimals).", type: "Keyword" },
  "string": { doc: "Sequence of characters (text).", type: "Keyword" },
  "void": { doc: "Return type indicating the function does not return any value.", type: "Keyword" },
  "main": { doc: "The main execution entry point of every C++ program.", type: "Function" },
  "cout": { doc: "Standard character output device (usually the screen).", type: "ObjectStream" },
  "cin": { doc: "Standard character input device (usually the keyboard).", type: "ObjectStream" },
  "<<": { doc: "Insertion operator. Sends data to the output stream (like cout).", type: "Operator" },
  ">>": { doc: "Extraction operator. Extracts data from the input stream (like cin) to a variable.", type: "Operator" },
  "endl": { doc: "End line. Inserts a newline character and flushes the stream.", type: "ObjectStream" },
  "for": { doc: "A loop that executes a block of code a specific number of times.", type: "Keyword" },
  "if": { doc: "A conditional statement that executes code only if the condition is true.", type: "Keyword" },
  "else": { doc: "Executes logic if its corresponding 'if' condition evaluated to false.", type: "Keyword" },
  "return": { doc: "Exits the function and optionally returns a value to the caller.", type: "Keyword" },
  "&": { doc: "Reference operator (or Address-of). Allows a function to modify the original variable.", type: "Operator" },
  "*": { doc: "Pointer/Dereference operator (or Multiplication). Deals with memory addresses directly.", type: "Operator" }
};

type InspectorData = {
  type: 'keyword' | 'variable' | 'line' | null;
  title: string;
  doc: string;
} | null;

function InteractiveCode({ 
  code, 
  variables, 
  lineExplanations,
  onInspect 
}: { 
  code: string, 
  variables: Record<string, string>, 
  lineExplanations: Record<number, string>,
  onInspect: (data: InspectorData) => void
}) {
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);
  
  const lines = code.split('\n');

  const varNames = Object.keys(variables || {});
  const kwNames = Object.keys(KEYWORDS_DICT);
  const allTokens = [...kwNames, ...varNames].sort((a,b) => b.length - a.length);
  
  const escapeRe = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const union = allTokens.map(t => /^\w+$/.test(t) ? `\\b${escapeRe(t)}\\b` : escapeRe(t)).join('|');
  const tokenRegex = new RegExp(`(${union})`, 'g');

  const handleLineEnter = (lineNum: number) => {
    setHoveredLine(lineNum);
    const expl = lineExplanations?.[lineNum];
    if (expl) {
      onInspect({ type: 'line', title: `Line ${lineNum}`, doc: expl });
    }
  };

  const handleLineLeave = () => {
    setHoveredLine(null);
    onInspect(null);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Keyword': return 'text-blue-300 border-b border-blue-500/30 hover:bg-blue-500/20';
      case 'Directive': return 'text-purple-300 border-b border-purple-500/30 hover:bg-purple-500/20';
      case 'Library': return 'text-orange-300 border-b border-orange-500/30 hover:bg-orange-500/20';
      case 'Namespace': return 'text-blue-200 border-b border-blue-400/30 hover:bg-blue-400/20';
      case 'Function': return 'text-amber-200 border-b border-amber-400/30 hover:bg-amber-400/20';
      case 'ObjectStream': return 'text-sky-300 border-b border-sky-500/30 hover:bg-sky-500/20';
      case 'Operator': return 'text-pink-300 hover:bg-pink-500/20';
      default: return 'text-slate-300';
    }
  };

  return (
    <div className="font-mono text-xs md:text-[13px] leading-relaxed relative" onMouseLeave={handleLineLeave}>
      {lines.map((line, idx) => {
        const lineNum = idx + 1;
        const tokens = line.split(tokenRegex).filter(Boolean);
        const hasExpl = !!lineExplanations?.[lineNum];
        const isHovered = hoveredLine === lineNum;

        return (
          <div 
            key={idx}
            onMouseEnter={() => handleLineEnter(lineNum)}
            className={clsx(
              "flex py-0.5 px-2 -mx-2 rounded transition-colors group cursor-default",
              isHovered && "bg-slate-800/80 shadow-[inset_2px_0_0_0_rgb(59,130,246)]",
              !isHovered && hasExpl && "hover:bg-slate-800/40"
            )}
          >
            <div className="w-8 shrink-0 text-slate-600 select-none text-right mr-4 font-mono">
              {lineNum}
            </div>
            <div className="flex-1 whitespace-pre break-all">
              {tokens.map((token, tIdx) => {
                const kwData = KEYWORDS_DICT[token];
                const varData = variables?.[token];

                if (kwData) {
                  return (
                    <span 
                      key={tIdx} 
                      onMouseEnter={(e) => { e.stopPropagation(); onInspect({type:'keyword', title: token, doc: kwData.doc}); }}
                      className={clsx("cursor-help transition-all duration-200 inline-block px-0.5 rounded-sm", getTypeColor(kwData.type))}
                    >
                      {token}
                    </span>
                  );
                }
                if (varData) {
                  return (
                    <span 
                      key={tIdx} 
                      onMouseEnter={(e) => { e.stopPropagation(); onInspect({type:'variable', title: token, doc: varData}); }}
                      className="text-emerald-300 border-b border-emerald-500/30 hover:bg-emerald-500/20 cursor-help transition-all duration-200 inline-block px-0.5 rounded-sm"
                    >
                      {token}
                    </span>
                  );
                }
                return <span key={tIdx} className="text-slate-300">{token}</span>;
              })}
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default function FunctionsArrays() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const requestedId = searchParams.get('id');

  const [activeId, setActiveId] = useState(requestedId || FUNCTIONS_ARRAYS[0].id);
  const [inspectedData, setInspectedData] = useState<InspectorData>(null);
  const [viewMode, setViewMode] = useState<'dissect' | 'playground'>('dissect');

  useEffect(() => {
    if (requestedId && requestedId !== activeId) {
      setActiveId(requestedId);
    }
  }, [requestedId]);

  const updateActiveFunction = (id: string) => {
    setActiveId(id);
    setInspectedData(null);
    navigate(`/functions?id=${id}`, { replace: true });
  };

  const activeData = FUNCTIONS_ARRAYS.find(f => f.id === activeId) || FUNCTIONS_ARRAYS[0];

  return (
    <div className="max-w-[1600px] mx-auto h-full flex flex-col items-stretch lg:flex-row min-h-[calc(100vh-6rem)]">
      {/* Sidebar Topics */}
      <div className="w-full lg:w-72 bg-white/50 dark:bg-slate-900/50 border-r border-slate-200 dark:border-slate-800 overflow-y-auto shrink-0 flex flex-col p-4 relative z-10 hidden lg:flex">
        <div className="mb-6 px-2">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
            <Terminal size={20} />
            <h3 className="font-bold uppercase tracking-widest text-xs">Library Modules</h3>
          </div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white leading-tight">Mastering<br/>Functions & Arrays</h2>
        </div>

        <div className="space-y-1">
          {FUNCTIONS_ARRAYS.map((func) => (
            <button
              key={func.id}
              onClick={() => updateActiveFunction(func.id)}
              className={clsx(
                "w-full flex items-start gap-3 p-3 rounded-xl transition-all text-left group",
                activeId === func.id 
                  ? "bg-slate-900 dark:bg-slate-800 text-white shadow-xl shadow-slate-900/10 scale-[1.02]"
                  : "text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800/80 hover:shadow border border-transparent hover:border-slate-100 dark:hover:border-slate-700/50"
              )}
            >
              <Code size={18} className={clsx("shrink-0 mt-0.5 transition-colors", activeId === func.id ? "text-blue-400" : "text-slate-400 group-hover:text-blue-500")} />
              <div>
                <div className={clsx("font-bold text-sm leading-tight", activeId === func.id ? "text-white" : "text-slate-800 dark:text-slate-200")}>
                  {func.title}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Viewer Area */}
      <div className="flex-1 bg-slate-50/50 dark:bg-slate-950/20 overflow-y-auto p-4 lg:p-8 flex flex-col gap-8">
        
        {/* Mobile Nav */}
        <div className="lg:hidden mb-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 block">Module Selection</label>
          <select
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-bold"
            value={activeId}
            onChange={(e) => updateActiveFunction(e.target.value)}
          >
            {FUNCTIONS_ARRAYS.map((func) => (
              <option key={func.id} value={func.id}>
                {func.title}
              </option>
            ))}
          </select>
        </div>

        {/* Toggle Nav */}
        <div className="flex bg-slate-200/50 dark:bg-slate-800/60 p-1 rounded-full w-fit">
          <button
            onClick={() => setViewMode('dissect')}
            className={clsx(
              "flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-all duration-300",
              viewMode === 'dissect' ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-md transform scale-105" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white/50"
            )}
          >
            <BookOpen size={16} /> Dissection
          </button>
          <button
            onClick={() => setViewMode('playground')}
            className={clsx(
              "flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-all duration-300",
              viewMode === 'playground' ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-md transform scale-105" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white/50"
            )}
          >
            <Terminal size={16} /> Playground
          </button>
        </div>

        {viewMode === 'dissect' ? (
          <div className="flex flex-col xl:flex-row gap-8">
            {/* Left Side: Code Visualizer */}
            <div className="flex-1 flex flex-col max-w-4xl">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeData.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1"
                >
                  <div className="mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100/50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-900/40 rounded-lg text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
                      Interactive Dissection
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">{activeData.title}</h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">{activeData.description}</p>
                  </div>

                  {/* Code Snippet Area */}
                  <div className="bg-[#0f172a] rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden mb-10 border border-slate-800 relative z-20">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
                      <div className="flex items-center gap-2.5">
                        <div className="w-3.5 h-3.5 rounded-full bg-slate-800 hover:bg-red-500 transition-colors shadow-inner"></div>
                        <div className="w-3.5 h-3.5 rounded-full bg-slate-800 hover:bg-amber-500 transition-colors shadow-inner"></div>
                        <div className="w-3.5 h-3.5 rounded-full bg-slate-800 hover:bg-emerald-500 transition-colors shadow-inner"></div>
                      </div>
                      <div className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                        <Terminal size={14} /> C++ Engine
                      </div>
                    </div>
                    <div className="p-6 md:p-8 overflow-x-auto selection:bg-blue-500/30">
                      <InteractiveCode 
                        code={activeData.code} 
                        variables={activeData.variables || {}} 
                        lineExplanations={activeData.lineExplanations || {}}
                        onInspect={setInspectedData}
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Side: The Smart Inspector */}
            <div className="w-full xl:w-80 shrink-0 flex flex-col gap-6 sticky top-8 h-fit">
               <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col h-full min-h-[300px]">
                  <div className="p-5 border-b border-slate-100 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-950/40 flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                        <Zap size={16} className="fill-current" />
                     </div>
                     <h3 className="font-extrabold text-slate-900 dark:text-white tracking-tight">Insight Inspector</h3>
                  </div>
                  
                  <div className="flex-1 p-6 relative">
                     <AnimatePresence mode="wait">
                        {inspectedData ? (
                           <motion.div 
                              key={inspectedData.title + inspectedData.type}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.15 }}
                              className="flex flex-col h-full"
                           >
                              <div className={clsx(
                                 "text-xs font-bold uppercase tracking-widest px-2 py-1 rounded inline-flex w-fit mb-4",
                                 inspectedData.type === 'line' ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400" :
                                 inspectedData.type === 'variable' ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400" :
                                 "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400"
                              )}>
                                 {inspectedData.type === 'line' ? 'Line Execution' :
                                  inspectedData.type === 'variable' ? 'Variable' : 
                                  'Syntax Keyword'}
                              </div>
                              
                              <h4 className="text-xl font-black text-slate-900 dark:text-white mb-4 font-mono tracking-tight leading-tight">
                                 {inspectedData.title}
                              </h4>
                              
                              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                 {inspectedData.doc}
                              </p>
                           </motion.div>
                        ) : (
                           <motion.div 
                              key="empty"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-slate-400"
                           >
                              <div className="w-16 h-16 rounded-full border-2 border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center mb-4">
                                 <Info size={24} className="text-slate-300 dark:text-slate-600" />
                              </div>
                              <p className="text-sm font-medium text-slate-400 dark:text-slate-500">
                                 Hover over any <span className="text-blue-500 font-bold border-b border-blue-500/20">keyword</span>, <span className="text-emerald-600 dark:text-emerald-400 font-bold border-b border-emerald-500/20">variable</span>, or <span className="text-slate-800 dark:text-slate-200 font-bold border-b border-slate-200/20">line</span> inside the code editor to instantly understand its purpose.
                              </p>
                           </motion.div>
                        )}
                     </AnimatePresence>
                  </div>
               </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 min-h-[600px] pb-8">
             <div className="mb-6">
                <h1 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Interactive Playground</h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">Write and test your C++ snippets. Start typing below.</p>
             </div>
             <div className="h-[calc(100%-6rem)]">
               <CppPlayground />
             </div>
          </div>
        )}

      </div>
    </div>
  );
}
