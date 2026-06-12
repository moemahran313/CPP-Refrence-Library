import React, { useState, useEffect } from 'react';
import { MCQS } from '../data/mcq';
import { AlertCircle, CheckCircle2, ChevronRight, ChevronLeft, HelpCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'motion/react';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { useLocation } from 'react-router-dom';

export default function MCQ() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answeredStates, setAnsweredStates] = useState<Record<number, { selectedOption: number | null, showExplanation: boolean }>>({});
  const location = useLocation();

  const currentQ = MCQS[currentIndex];
  const currentState = answeredStates[currentIndex] || { selectedOption: null, showExplanation: false };
  const selectedOption = currentState.selectedOption;
  const showExplanation = currentState.showExplanation;

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const qParam = queryParams.get('q');
    const indexParam = queryParams.get('index');
    
    if (indexParam !== null) {
      const idx = parseInt(indexParam, 10);
      if (idx >= 0 && idx < MCQS.length) {
        setCurrentIndex(idx);
      }
    } else if (qParam) {
      const matchedIndex = MCQS.findIndex(m => m.trick.toLowerCase().includes(qParam.toLowerCase()) || m.question.toLowerCase().includes(qParam.toLowerCase()));
      if (matchedIndex !== -1) {
        setCurrentIndex(matchedIndex);
      }
    }
  }, [location.search]);

  const handleSelect = (index: number) => {
    if (showExplanation) return;
    setAnsweredStates(prev => ({
      ...prev,
      [currentIndex]: { selectedOption: index, showExplanation: true }
    }));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, MCQS.length - 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleRevealTrick = () => {
    setAnsweredStates(prev => ({
      ...prev,
      [currentIndex]: { selectedOption: null, showExplanation: true }
    }));
  };

  const handleResetQuestion = () => {
    setAnsweredStates(prev => {
      const updated = { ...prev };
      delete updated[currentIndex];
      return updated;
    });
  };

  const isLast = currentIndex === MCQS.length - 1;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">MCQ & Tricks Analyzer</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Practice common final exam questions and learn the core tricks behind them.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-850 overflow-hidden">
        <div className="p-8 border-b border-slate-100 dark:border-slate-850">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-350 font-mono font-bold px-3 py-1 rounded-md text-sm">
              Q{currentIndex + 1}
            </span>
            <span className="text-sm font-medium text-slate-400 dark:text-slate-500">
              of {MCQS.length}
            </span>
          </div>
          
          <div className="text-xl font-medium text-slate-900 dark:text-white leading-relaxed">
            <MarkdownRenderer content={currentQ.question} />
          </div>
        </div>

        <div className="p-8 bg-slate-50/50 dark:bg-slate-950/20">
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = currentQ.correctAnswer === idx;
              const isReveal = showExplanation;

              let btnClass = "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-blue-400 dark:hover:border-slate-700 hover:bg-blue-50 dark:hover:bg-slate-800/60";
              
              if (isReveal) {
                if (isCorrect) {
                  btnClass = "border-green-500 bg-green-50 dark:bg-green-950/20 text-green-900 dark:text-green-300";
                } else if (isSelected && !isCorrect) {
                  btnClass = "border-red-400 dark:border-red-500/50 bg-red-50 dark:bg-red-950/20 text-red-900 dark:text-red-300";
                } else {
                  btnClass = "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-600 opacity-60";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isReveal}
                  className={clsx(
                    "w-full text-left px-6 py-4 rounded-xl border-2 transition-all font-medium text-base md:text-lg cursor-pointer",
                    btnClass
                  )}
                >
                  <div className="flex justify-between items-center">
                    <div className="text-base select-none">
                      <MarkdownRenderer content={option} />
                    </div>
                    {isReveal && isCorrect && <CheckCircle2 className="text-green-500 shrink-0 ml-4" size={20} />}
                  </div>
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" size={20} />
                    <div>
                      <h4 className="font-bold text-amber-900 dark:text-amber-400 mb-1">The Trick</h4>
                      <div className="text-amber-800 dark:text-amber-200/80 leading-relaxed font-semibold">
                        <MarkdownRenderer content={currentQ.trick} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Interactive Pagination and Switch Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={clsx(
                  "flex items-center gap-1 px-3 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer font-mono select-none",
                  currentIndex === 0
                    ? "border-transparent text-slate-300 dark:text-slate-700 cursor-not-allowed"
                    : "border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95"
                )}
              >
                <ChevronLeft size={14} /> Prev
              </button>

              {/* Display surrounding pagination items */}
              {Array.from({ length: MCQS.length }, (_, i) => i)
                .filter(i => Math.abs(i - currentIndex) <= 2)
                .map(i => {
                  const isCurrent = i === currentIndex;
                  const isAnswered = answeredStates[i] !== undefined;

                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={clsx(
                        "w-8 h-8 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-center border",
                        isCurrent
                          ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20"
                          : isAnswered
                            ? "bg-green-100/50 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-900 text-emerald-600 dark:text-emerald-400"
                            : "bg-white dark:bg-slate-900 border-slate-250 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-600"
                      )}
                    >
                      {i + 1}
                    </button>
                  );
                })}

              <button
                onClick={handleNext}
                disabled={currentIndex === MCQS.length - 1}
                className={clsx(
                  "flex items-center gap-1 px-3 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer font-mono select-none",
                  currentIndex === MCQS.length - 1
                    ? "border-transparent text-slate-300 dark:text-slate-700 cursor-not-allowed"
                    : "border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95"
                )}
              >
                Next <ChevronRight size={14} />
              </button>
            </div>

            {/* Quick jump input and manual trigger */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold font-mono text-slate-400">Jump Q:</span>
                <input
                  type="number"
                  min={1}
                  max={MCQS.length}
                  value={currentIndex + 1}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    if (val >= 1 && val <= MCQS.length) {
                      setCurrentIndex(val - 1);
                    }
                  }}
                  className="w-14 h-8 px-1 text-center font-mono font-bold text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                onClick={handleRevealTrick}
                disabled={showExplanation}
                className={clsx(
                  "px-3 py-1.5 text-xs font-extrabold rounded-xl border transition-all cursor-pointer flex items-center gap-1 select-none font-mono",
                  showExplanation
                    ? "border-transparent text-slate-300 dark:text-slate-700 cursor-not-allowed"
                    : "border-amber-300 bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-950/40 active:scale-95"
                )}
              >
                <HelpCircle size={13} className="text-amber-500" /> Reveal Trick
              </button>

              {showExplanation && (
                <button
                  type="button"
                  onClick={handleResetQuestion}
                  className="px-3 py-1.5 text-xs font-bold rounded-xl border border-red-200 dark:border-red-950 bg-red-50 dark:bg-red-950/20 text-red-650 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-950/40 cursor-pointer active:scale-95 transition-all select-none font-mono"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
