import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, ArrowRight, BookOpen, Brain, Zap, Activity, Info } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'motion/react';
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';
import { NUMBER_SYSTEMS_GUIDE } from '../data/number-systems-guide';

type Tab = 'learn' | 'practice';

export default function NumberSystems() {
  const [activeTab, setActiveTab] = useState<Tab>('learn');

  return (
    <div className="p-4 md:p-12 max-w-6xl mx-auto min-h-[calc(100vh-4rem)]">
      <div className="mb-12">
        <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">{NUMBER_SYSTEMS_GUIDE.title}</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-3 text-lg leading-relaxed max-w-3xl">{NUMBER_SYSTEMS_GUIDE.description}</p>
      </div>

      <div className="flex bg-slate-100 dark:bg-slate-900 p-1.5 rounded-full mb-12 inline-flex relative shadow-inner w-full sm:w-auto">
        <button
          onClick={() => setActiveTab('learn')}
          className={clsx(
            "flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3 rounded-full font-bold transition-all relative z-10 cursor-pointer",
            activeTab === 'learn' ? "text-slate-900 dark:text-slate-900" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          )}
        >
          <BookOpen size={18} /> Learn Tricks
         </button>
        <button
          onClick={() => setActiveTab('practice')}
          className={clsx(
            "flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3 rounded-full font-bold transition-all relative z-10 cursor-pointer",
            activeTab === 'practice' ? "text-slate-900 dark:text-slate-900" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          )}
        >
          <Brain size={18} /> Practice Arena
        </button>
        
        {/* Animated background pill */}
        <motion.div
           className="absolute top-1.5 bottom-1.5 rounded-full bg-white shadow-sm"
           initial={false}
           animate={{
             left: activeTab === 'learn' ? '6px' : '50%',
             width: 'calc(50% - 6px)'
           }}
           transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'learn' ? <LearnTab /> : <PracticeTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function LearnTab() {
  return (
    <div className="space-y-16">
      {/* Core Concepts */}
      <section className="bg-slate-900 dark:bg-slate-950 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <Brain size={250} />
        </div>
        <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
          <Info className="text-blue-400" />
          Core Concepts
        </h3>
        <div className="grid md:grid-cols-2 gap-8 relative z-10">
          {NUMBER_SYSTEMS_GUIDE.coreConcepts.map((concept, idx) => (
            <div key={idx} className="bg-slate-800/50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-700 dark:border-slate-800">
              <h4 className="font-bold text-xl mb-3 text-blue-300">{concept.title}</h4>
              <div className="text-slate-300 dark:text-slate-300 leading-relaxed space-y-2">
                {concept.content.split('\n').map((line, lIdx) => (
                  <p key={lIdx}><Latex>{line}</Latex></p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Methods */}
      <section>
        <div className="mb-8">
           <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Conversion Methods</h3>
           <p className="text-slate-500 dark:text-slate-400 mt-2">The fastest shortcuts for the exams.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {NUMBER_SYSTEMS_GUIDE.methods.map((method, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 dark:border-slate-850 overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-300">
              <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-850 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-950 dark:to-indigo-950/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-xl text-blue-500 dark:text-blue-450 shadow-sm border border-blue-100 dark:border-blue-900/30">
                    <Zap size={24} />
                  </div>
                  <h4 className="text-2xl font-extrabold text-blue-950 dark:text-blue-200">{method.title}</h4>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-800 rounded-lg text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest shadow-sm">
                  {method.from} <ArrowRight size={14} /> {method.to}
                </div>
              </div>
              <div className="p-6 md:p-8 flex-1 space-y-6">
                <div>
                  <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Fastest Method</div>
                  <p className="text-slate-800 dark:text-slate-300 font-medium leading-relaxed">{method.fastest}</p>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Example</div>
                  <div className="bg-slate-900 text-emerald-400 p-4 rounded-xl font-mono text-sm shadow-inner leading-relaxed space-y-1">
                    {method.example.split('\n').map((line, i) => (
                      <div key={i}><Latex>{line}</Latex></div>
                    ))}
                  </div>
                </div>
                <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-xl border border-red-100 dark:border-red-900/40">
                   <div className="text-xs font-bold text-red-500 dark:text-red-400 uppercase tracking-widest mb-1 flex items-center gap-2">Mistakes to Avoid</div>
                   <p className="text-red-900 dark:text-red-300 text-sm">{method.mistakes}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cheat Sheets */}
      <section className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-850">
        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-8 border-b border-slate-100 dark:border-slate-800 pb-4">Memorization Charts</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-4 uppercase tracking-widest text-xs">Powers of Two</h4>
            <div className="space-y-2">
              {NUMBER_SYSTEMS_GUIDE.memorizationTables.powersOfTwo.map((item, idx) => (
                <div key={idx} className="flex justify-between p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded text-sm font-mono border-b border-slate-50 dark:border-slate-800/40 last:border-none">
                  <span className="text-slate-500 dark:text-slate-400">{item.exp}</span>
                  <span className="font-bold text-slate-900 dark:text-white">{item.val}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
             <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-4 uppercase tracking-widest text-xs">Hexadecimal Map</h4>
             <div className="space-y-2">
               {NUMBER_SYSTEMS_GUIDE.memorizationTables.hexMapping.map((item, idx) => (
                 <div key={idx} className="flex justify-between p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded text-sm font-mono border-b border-slate-50 dark:border-slate-800/40 last:border-none">
                   <span className="font-bold text-purple-600 dark:text-purple-400">{item.hex}</span>
                   <span className="text-slate-500 dark:text-slate-400">{item.dec}</span>
                   <span className="text-slate-400 dark:text-slate-400">{item.bin}</span>
                 </div>
               ))}
             </div>
          </div>
          <div>
             <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-4 uppercase tracking-widest text-xs">Octal Map</h4>
             <div className="space-y-2">
               {NUMBER_SYSTEMS_GUIDE.memorizationTables.octalMapping.map((item, idx) => (
                 <div key={idx} className="flex justify-between p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded text-sm font-mono border-b border-slate-50 dark:border-slate-800/40 last:border-none">
                   <span className="font-bold text-emerald-600 dark:text-emerald-400">{item.oct}</span>
                   <span className="text-slate-400 dark:text-slate-500">{item.bin}</span>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* Flowchart Table */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 shadow-xl text-white">
         <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
          <Activity className="text-blue-300" /> Exam Strategy Workflow
         </h3>
         <div className="overflow-x-auto">
            <table className="w-full text-left font-sans min-w-[500px]">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="p-4 text-blue-200 text-xs uppercase tracking-widest font-bold">From</th>
                  <th className="p-4 text-blue-200 text-xs uppercase tracking-widest font-bold">To</th>
                  <th className="p-4 text-blue-200 text-xs uppercase tracking-widest font-bold">Fastest Method</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {NUMBER_SYSTEMS_GUIDE.strategyDecisionMap.map((strategy, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-bold">{strategy.from}</td>
                    <td className="p-4 font-bold">{strategy.to}</td>
                    <td className="p-4 text-blue-100">{strategy.act}</td>
                  </tr>
                ))}
              </tbody>
            </table>
         </div>
      </section>
    </div>
  );
}

function PracticeTab() {
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [question, setQuestion] = useState<{ num: string, fromBase: number, toBase: number, target: string } | null>(null);
  const [inputVal, setInputVal] = useState("");
  const [feedback, setFeedback] = useState<"idle" | "correct" | "incorrect">("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  const generateQuestion = () => {
    const bases = [2, 10]; 
    const fromBase = bases[Math.floor(Math.random() * bases.length)];
    const toBase = fromBase === 2 ? 10 : 2;
    
    // Generate a number specifically engineered for mental math practice (1-63)
    const val = Math.floor(Math.random() * 63) + 1; 
    const numStr = val.toString(fromBase);
    const targetStr = val.toString(toBase);

    setQuestion({ num: numStr, fromBase, toBase, target: targetStr });
    setInputVal("");
    setFeedback("idle");
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question || feedback !== "idle") return;

    if (inputVal.trim().toLowerCase() === question.target.toLowerCase()) {
      setFeedback("correct");
      setScore(s => s + 100 + (streak * 10));
      setStreak(s => s + 1);
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6']
      });
      setTimeout(() => {
        generateQuestion();
      }, 1500);
    } else {
      setFeedback("incorrect");
      setStreak(0);
      // Automatically reset to allow trying again
      setTimeout(() => {
        setFeedback("idle");
        inputRef.current?.focus();
      }, 1500);
    }
  };

  if (!question) return null;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-850 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-500 dark:text-amber-400 flex items-center justify-center">
              <Trophy size={24} />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Score Points</div>
              <div className="text-3xl font-black text-slate-800 dark:text-white">{score}</div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-850 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-50 dark:bg-orange-950/40 text-orange-500 dark:text-orange-400 flex items-center justify-center">
              <Activity size={24} />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Streak</div>
              <div className="text-3xl font-black flex items-center gap-2">
                <span className="text-slate-800 dark:text-white">{streak}</span>
                {streak > 2 && <span className="text-orange-500 text-xl">🔥</span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 dark:border-slate-850 overflow-hidden text-center p-8 md:p-16 relative">
        <div className="absolute top-8 left-8 text-slate-200 dark:text-slate-800">
           <Brain size={120} className="opacity-20" />
        </div>

        <h3 className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mb-12 relative z-10 text-sm">Convert Mentally Without Calculator</h3>
               <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 mb-16 relative z-10">
          <div className="px-8 py-6 bg-slate-50 dark:bg-slate-950/40 rounded-3xl border border-slate-200 dark:border-slate-800 min-w-[200px] shadow-inner">
            <div className="text-5xl font-black text-slate-800 dark:text-slate-200 font-mono tracking-widest mb-3">{question.num}</div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-200 dark:bg-slate-800 rounded-lg text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
              Base {question.fromBase}
            </div>
          </div>
          
          <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow-md border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-400 z-20">
            <ArrowRight size={24} />
          </div>
          
          <div className="px-8 py-6 bg-blue-50 dark:bg-blue-950/10 border-2 border-dashed border-blue-200 dark:border-blue-900/50 rounded-3xl min-w-[200px]">
            <div className="text-5xl font-black text-blue-900 dark:text-blue-300 font-mono mb-3">?</div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-200 dark:bg-blue-900/50 rounded-lg text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              Base {question.toBase}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-sm mx-auto relative z-10">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Your answer..."
              disabled={feedback === 'correct'}
              className={clsx(
                "w-full text-center text-4xl font-mono font-black p-6 rounded-2xl border-4 outline-none transition-all shadow-lg",
                feedback === 'idle' ? "focus:border-blue-500 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 dark:text-white" :
                feedback === 'correct' ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300 shadow-emerald-500/20" :
                "border-red-500 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-300 shadow-red-500/20"
              )}
            />
          </div>
          
          <button 
            type="submit"
            disabled={!inputVal.trim() || feedback !== 'idle'}
            className="w-full mt-6 py-5 bg-slate-900 dark:bg-slate-800 text-white dark:text-slate-100 rounded-2xl font-bold text-xl hover:bg-slate-800 dark:hover:bg-slate-700 hover:shadow-2xl hover:-translate-y-1 active:scale-95 transition-all shadow-xl disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none cursor-pointer"
          >
            Submit Answer
          </button>
        </form>

        <div className="h-16 mt-8">
          <AnimatePresence>
            {feedback === 'incorrect' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-red-500 dark:text-red-400 font-bold bg-red-50 dark:bg-red-900/20 py-3 px-6 rounded-full inline-block"
              >
                Not quite! Try using the tricks again.
              </motion.div>
            )}
            {feedback === 'correct' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-emerald-500 dark:text-emerald-400 font-bold text-xl flex justify-center items-center gap-2 bg-emerald-50 dark:bg-emerald-900/25 py-3 px-6 rounded-full inline-flex"
              >
                Spot on! +{100 + (streak * 10)} pts
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
