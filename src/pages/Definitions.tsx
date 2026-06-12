import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DEFINITIONS } from '../data/definitions';
import { RefreshCcw, Check, X, Brain, HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';
import { useLocation } from 'react-router-dom';

function QuickQuizModal({ card, onClose }: { card: typeof DEFINITIONS[0], onClose: () => void }) {
  const [options, setOptions] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const wrongAnswers = DEFINITIONS.filter(d => d.term !== card.term)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(d => d.term);
    setOptions([...wrongAnswers, card.term].sort(() => 0.5 - Math.random()));
  }, [card]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={e => e.stopPropagation()}
        className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-lg w-full p-8 border border-slate-100 dark:border-slate-800"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center">
            <HelpCircle size={24} />
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Quick Quiz</h3>
          <button onClick={onClose} className="ml-auto p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="text-lg font-medium text-slate-700 dark:text-slate-350 mb-8 leading-relaxed">
          Which term matches this definition?
          <br/><br/>
          <span className="text-slate-500 dark:text-slate-400 italic block border-l-4 border-blue-200 dark:border-blue-800 pl-4 py-1">{card.definition}</span>
        </div>

        <div className="space-y-3">
          {options.map((opt, i) => {
            const isCorrect = opt === card.term;
            const isSelected = selected === opt;
            const showResult = selected !== null;
            
            return (
              <button
                key={i}
                disabled={showResult}
                onClick={() => setSelected(opt)}
                className={clsx(
                  "w-full text-left p-4 rounded-xl border-2 font-bold transition-all",
                  !showResult ? "border-slate-100 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-955/20 text-slate-700 dark:text-slate-300" :
                  isCorrect ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300" :
                  isSelected ? "border-red-500 bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-300" : "border-slate-100 dark:border-slate-800 opacity-50 text-slate-500"
                )}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {selected && (
          <div className="mt-8 text-center animate-fade-in">
            {selected === card.term ? (
              <div className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-100 dark:bg-emerald-950/40 px-4 py-2 rounded-full">
                <Check size={18} /> Correct! You know your stuff.
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 text-red-600 dark:text-red-400 font-bold bg-red-100 dark:bg-red-950/40 px-4 py-2 rounded-full">
                <X size={18} /> Incorrect. The right answer is {card.term}.
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function Definitions() {
  const location = useLocation();
  const [learningQueue, setLearningQueue] = useState([...DEFINITIONS]);
  const [knownList, setKnownList] = useState<typeof DEFINITIONS>([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  // Take the active card from the learning queue based on activeIdx
  const activeCard = learningQueue[activeIdx] || learningQueue[0];

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const termParam = queryParams.get('term');
    if (termParam) {
      setLearningQueue(currentQueue => {
        const qIdx = currentQueue.findIndex(d => d.term.toLowerCase() === termParam.toLowerCase());
        if (qIdx !== -1) {
          setActiveIdx(qIdx);
          setIsFlipped(false);
          return currentQueue;
        } else {
          const dIdx = DEFINITIONS.findIndex(d => d.term.toLowerCase() === termParam.toLowerCase());
          if (dIdx !== -1) {
            const card = DEFINITIONS[dIdx];
            const remaining = DEFINITIONS.filter(d => d.term.toLowerCase() !== termParam.toLowerCase());
            setActiveIdx(0);
            setIsFlipped(false);
            return [card, ...remaining];
          }
        }
        return currentQueue;
      });
    }
  }, [location.search]);

  const handleMark = (isKnown: boolean) => {
    setIsFlipped(false);
    
    // Tiny delay to let the flip animation start before swapping content
    setTimeout(() => {
      const card = learningQueue[activeIdx];
      if (!card) return;
      
      const newQueue = learningQueue.filter((_, idx) => idx !== activeIdx);
      
      if (isKnown) {
        setKnownList([...knownList, card]);
        setLearningQueue(newQueue);
        setActiveIdx(prev => Math.min(prev, Math.max(0, newQueue.length - 1)));
      } else {
        // Needs review: push it to the end of the queue
        const updatedQueue = [...newQueue, card];
        setLearningQueue(updatedQueue);
        setActiveIdx(prev => Math.min(prev, Math.max(0, updatedQueue.length - 1)));
      }
    }, 150);
  };

  const handleReset = () => {
    setLearningQueue([...DEFINITIONS].sort(() => Math.random() - 0.5));
    setKnownList([]);
    setIsFlipped(false);
    setActiveIdx(0);
  };

  const progress = (knownList.length / DEFINITIONS.length) * 100;

  return (
    <div className="p-4 md:p-12 max-w-5xl mx-auto flex flex-col min-h-[calc(100vh-4rem)]">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Active Recall</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Master core C++ terminology through spaced repetition.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 dark:border-slate-800">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest bg-slate-50 dark:bg-slate-950/40 px-2 py-0.5 rounded text-center mb-1">Mastery</span>
            <div className="text-2xl font-black text-slate-800 dark:text-slate-100 text-right">{knownList.length}<span className="text-slate-400 dark:text-slate-500 text-lg">/{DEFINITIONS.length}</span></div>
          </div>
          <div className="w-32 h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-blue-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Card Navigation Controls */}
        {learningQueue.length > 0 && (
          <div className="w-full max-w-2xl px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl mb-8 shadow-sm">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setIsFlipped(false);
                  setTimeout(() => {
                    setActiveIdx(prev => Math.max(0, prev - 1));
                  }, 100);
                }}
                disabled={activeIdx === 0}
                className={clsx(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer font-bold text-xs font-mono select-none",
                  activeIdx === 0
                    ? "border-transparent text-slate-300 dark:text-slate-705 cursor-not-allowed"
                    : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 active:scale-95"
                )}
              >
                <ChevronLeft size={14} /> Prev
              </button>
              
              <div className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 px-2.5 py-1 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-lg">
                <span className="text-blue-600 dark:text-blue-400">{activeIdx + 1}</span> <span className="text-slate-300">/</span> {learningQueue.length}
              </div>

              <button
                onClick={() => {
                  setIsFlipped(false);
                  setTimeout(() => {
                    setActiveIdx(prev => Math.min(learningQueue.length - 1, prev + 1));
                  }, 100);
                }}
                disabled={activeIdx === learningQueue.length - 1}
                className={clsx(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer font-bold text-xs font-mono select-none",
                  activeIdx === learningQueue.length - 1
                    ? "border-transparent text-slate-300 dark:text-slate-705 cursor-not-allowed"
                    : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 active:scale-95"
                )}
              >
                Next <ChevronRight size={14} />
              </button>
            </div>

            {/* Jump Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-mono text-slate-400">Quick Jump:</span>
              <select
                value={activeIdx}
                onChange={(e) => {
                  setIsFlipped(false);
                  const val = parseInt(e.target.value, 10);
                  setTimeout(() => {
                    setActiveIdx(val);
                  }, 100);
                }}
                className="text-xs font-sans font-semibold bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-305 px-3 py-1.5 rounded-xl outline-none focus:ring-1 focus:ring-blue-500 max-w-[220px]"
              >
                {learningQueue.map((item, idx) => (
                  <option key={idx} value={idx}>
                    {idx + 1}. {item.term}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {learningQueue.length > 0 ? (
            <motion.div 
              key={activeCard.term}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ duration: 0.4, type: 'spring' }}
              className="w-full max-w-2xl relative" 
            >
              <div style={{ perspective: 1500 }}>
                <motion.div
                  className="w-full min-h-[400px] cursor-pointer"
                  onClick={() => setIsFlipped(!isFlipped)}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.7, type: "spring", stiffness: 200, damping: 20 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front of Card */}
                  <div 
                    className="absolute inset-0 w-full h-full bg-white dark:bg-slate-900 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 dark:border-slate-800 p-10 flex flex-col items-center justify-center backface-hidden"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="absolute top-8 left-8 text-slate-300 dark:text-slate-700">
                      <Brain size={32} />
                    </div>
                    <div className="text-sm font-bold font-mono text-blue-500 dark:text-blue-400 mb-6 uppercase tracking-[0.2em] bg-blue-50 dark:bg-blue-950/40 px-4 py-1.5 rounded-full">Concept</div>
                    <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white text-center tracking-tight leading-tight">{activeCard.term}</h3>
                    <div className="absolute bottom-8 text-slate-400 dark:text-slate-500 flex items-center gap-2 text-sm font-medium">
                      <RefreshCcw size={16} className="animate-spin-slow opacity-50" /> Tap anywhere to flip
                    </div>
                  </div>

                  {/* Back of Card */}
                  <div 
                    className="absolute inset-0 w-full h-full bg-slate-950 dark:bg-slate-950 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-800 p-10 flex flex-col items-center justify-center backface-hidden"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <div className="absolute top-8 left-8 text-slate-700 dark:text-slate-800">
                      <RefreshCcw size={32} />
                    </div>
                    <div className="text-sm font-bold font-mono text-emerald-400 mb-6 uppercase tracking-[0.2em]">Definition</div>
                    <p className="text-2xl text-slate-200 text-center leading-relaxed font-medium">
                      {activeCard.definition}
                    </p>
                    {/* Quick Quiz Button */}
                    <div className="absolute top-8 right-8 cursor-auto">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setShowQuiz(true); }}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-blue-500/20"
                      >
                        <HelpCircle size={16} /> Quick Quiz
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Action Buttons (Only visible when flipped) */}
              <div className="h-24 mt-8 flex items-center justify-center relative">
                <AnimatePresence>
                  {isFlipped && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-6"
                    >
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleMark(false); }}
                        className="group flex flex-col items-center gap-2"
                      >
                        <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-900 border border-red-100 dark:border-red-950/80 flex items-center justify-center shadow-lg text-red-500 group-hover:bg-red-500 dark:group-hover:bg-red-700 group-hover:text-white group-hover:scale-110 group-active:scale-95 transition-all duration-300">
                          <X size={28} strokeWidth={3} />
                        </div>
                        <span className="text-sm font-bold text-slate-400 group-hover:text-red-500 transition-colors">Needs Review</span>
                      </button>

                      <button 
                        onClick={(e) => { e.stopPropagation(); handleMark(true); }}
                        className="group flex flex-col items-center gap-2"
                      >
                        <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-950/80 flex items-center justify-center shadow-lg text-emerald-500 group-hover:bg-emerald-500 dark:group-hover:bg-emerald-700 group-hover:text-white group-hover:scale-110 group-active:scale-95 transition-all duration-300">
                          <Check size={28} strokeWidth={3} />
                        </div>
                        <span className="text-sm font-bold text-slate-400 group-hover:text-emerald-500 transition-colors">Got It</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center bg-white dark:bg-slate-900 p-16 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 max-w-lg w-full"
            >
              <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-500 dark:text-emerald-450 rounded-full flex items-center justify-center mx-auto mb-8">
                <Trophy size={48} />
              </div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4">You're all caught up!</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-8 text-lg">You've mastered all {DEFINITIONS.length} definitions. Great memory!</p>
              <button 
                onClick={handleReset}
                className="px-8 py-4 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-3 mx-auto"
              >
                <RefreshCcw size={20} /> Practice Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showQuiz && (
          <QuickQuizModal card={activeCard} onClose={() => setShowQuiz(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

// Inline Trophy icon
function Trophy(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}
