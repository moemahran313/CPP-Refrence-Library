import React, { useState } from 'react';
import { MCQS } from '../data/mcq';
import { AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'motion/react';

export default function MCQ() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQ = MCQS[currentIndex];

  const handleSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedOption(index);
    setShowExplanation(true);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    setCurrentIndex((prev) => Math.min(prev + 1, MCQS.length - 1));
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
          
          <h3 className="text-xl font-medium text-slate-900 dark:text-white leading-relaxed">
            {currentQ.question}
          </h3>
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
                    "w-full text-left px-6 py-4 rounded-xl border-2 transition-all font-medium text-lg cursor-pointer",
                    btnClass
                  )}
                >
                  <div className="flex justify-between items-center">
                    <span>{option}</span>
                    {isReveal && isCorrect && <CheckCircle2 className="text-green-500" size={20} />}
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
                  <div className="flex items-start gap-3">
                    <AlertCircle className="text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" size={20} />
                    <div>
                      <h4 className="font-bold text-amber-900 dark:text-amber-400 mb-1">The Trick</h4>
                      <p className="text-amber-800 dark:text-amber-200/80 leading-relaxed">{currentQ.trick}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {showExplanation && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 flex justify-end"
            >
              <button
                onClick={handleNext}
                disabled={isLast}
                className={clsx(
                  "flex items-center gap-2 px-6 py-3 rounded-full font-bold shadow-sm transition-all cursor-pointer",
                  isLast 
                    ? "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed" 
                    : "bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 active:scale-95 hover:shadow-md"
                )}
              >
                {isLast ? "Completed" : "Next Question"} <ChevronRight size={18} />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
