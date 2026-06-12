import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EXAMS_DATA, Exam, ExamQuestion } from '../data/exams';
import { 
  GraduationCap, Award, HelpCircle, Lightbulb, Play, ArrowRight, Code, 
  Flame, CheckCircle2, XCircle, ChevronRight, RefreshCw, AlertTriangle, 
  TrendingUp, Sparkles, HelpCircle as HelpIcon, PlaySquare, Compass 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Exams() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'pareto' | 'exams'>('pareto');
  const [selectedExamId, setSelectedExamId] = useState<string>(EXAMS_DATA[0].id);
  const [quizMode, setQuizMode] = useState<boolean>(false);
  const [quizStartIndex, setQuizStartIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | boolean | null>(null);
  const [showQuizDetails, setShowQuizDetails] = useState<boolean>(false);
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [totalAttempted, setTotalAttempted] = useState<number>(0);

  const selectedExam = EXAMS_DATA.find(e => e.id === selectedExamId) || EXAMS_DATA[0];

  // Pareto Principle tricks
  const PARETO_TRICKS = [
    {
      title: "The Reference Swapping Typo",
      subtitle: "Dr. Ehab's Classic Reference Modifier",
      icon: <Code className="text-yellow-500" size={24} />,
      principle: "Parameter swapping via 'Call by Reference' is tested on 100% of the core CMP exams. But watch out: the official 2021 printed answer key lists 'double getStudentMark(int &x, int &y)' instead of swap by typo! He always uses '&' to bypass local copys.",
      trick: "In C++, standard parameter changes inside functions disperse unless you pass-by-reference. Use `void swap(int &a, int &b)`.",
      importance: "High (15% of Exam score)"
    },
    {
      title: "The Struct Memory Trick",
      subtitle: "Declaration vs. Instantiation",
      icon: <TrendingUp className="text-blue-500" size={24} />,
      principle: "He loves to ask: 'What happens when the structure is declared?'. Students pick 'it allocates memory' or 'allocated and initialized'.",
      trick: "Declaring a struct consumes 0 Bytes. It is only an architectural cookie-cutter template on compilation. Memory is only allocated when you declare a variable of that struct's type.",
      importance: "Critical MCQ Trick"
    },
    {
      title: "Illegal Switch Expressions",
      subtitle: "Switch Float / Double Mismatches",
      icon: <AlertTriangle className="text-red-500" size={24} />,
      principle: "Another highly continuous True/False trap of his is: 'We can use a switch statement to switch on float or string variables'.",
      trick: "C++ switch evaluations strictly operate on integral or char types only. If you try to switch on `float`, `double` or `string`, compilation fails.",
      importance: "True/False Core point"
    },
    {
      title: "The Post-Increment Trap",
      subtitle: "y = x++ Execution Order",
      icon: <Sparkles className="text-purple-500" size={24} />,
      principle: "You will find standard statements like: 'y = x++ means we first increase x then assign to y'.",
      trick: "Post-increment (`x++`) assigns the OLD value of x to y first, and then increases x by 1. Pre-increment (`++x`) is what increases first.",
      importance: "Every Fall/Spring T/F list"
    },
    {
      title: "The 0-based Array Address",
      subtitle: "What is 'array' inside memory?",
      icon: <Flame className="text-orange-500" size={24} />,
      principle: "The MCQ question: 'Which of the following gives the memory address of the first element in array?' lists 'array[0]', 'array[1]' and 'array'.",
      trick: "The name of the array ('array') decays to a constant pointer to the first cell in RAM. Accessing 'array[0]' gives the value, not the address.",
      importance: "Core Array concept"
    },
    {
      title: "Do-While Timing",
      subtitle: "Post-test Loop Flow",
      icon: <Compass className="text-green-500" size={24} />,
      principle: "True/False: 'The do-while loop tests the conditions before executing the loop body.'",
      trick: "A do-while loop is a post-test loop. It always runs the body at least once, and only checks the condition at the bottom.",
      importance: "Frequent Logic Question"
    },
    {
      title: "Case-Sensitive Identifiers",
      subtitle: "Keywords as Variable Names",
      icon: <Award className="text-pink-500" size={24} />,
      principle: "Examiner asks: 'Is Int, Const, Integer or 1section legal/illegal?'.",
      trick: "Standard keywords like `int`, `const` are reserved (illegal to name variables). But because C++ is case-sensitive, capitalized words like `Int`, `Const`, or `Integer` are NOT reserved keywords and are perfectly legal!",
      importance: "Standard Identifier Question"
    }
  ];

  const runCodeInSandbox = (code: string, stdin?: string) => {
    localStorage.setItem('playground_override', JSON.stringify({
      code: code,
      stdin: stdin || ""
    }));
    navigate('/playground');
  };

  const handleQuizAnswer = (answer: number | boolean | string) => {
    const question = selectedExam.questions[quizStartIndex];
    const isCorrect = selectedOption === answer;

    if (isCorrect) {
      setCurrentScore(prev => prev + 1);
    }
    setTotalAttempted(prev => prev + 1);
    setShowQuizDetails(true);
  };

  const handleNextQuiz = () => {
    setSelectedOption(null);
    setShowQuizDetails(false);
    if (quizStartIndex < selectedExam.questions.length - 1) {
      setQuizStartIndex(prev => prev + 1);
    } else {
      // Finished
    }
  };

  const handleResetQuiz = () => {
    setCurrentScore(0);
    setTotalAttempted(0);
    setQuizStartIndex(0);
    setSelectedOption(null);
    setShowQuizDetails(false);
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto font-sans text-slate-800 dark:text-slate-100">
      
      {/* Page header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-rose-500 mb-1">
            <GraduationCap size={20} className="animate-pulse" />
            <span className="font-mono font-black uppercase tracking-widest text-xs">Modern Academy Crammer</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Professor Tricks & <span className="text-rose-600 dark:text-rose-400">Final Exams Prep</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Cram and solve past final examinations of <span className="font-bold">Dr. Ehab Elshimy</span>. Apply the Pareto principle to pinpoint the recurrent traps he places on CMP core exams.
          </p>
        </div>
        
        {/* Tab Selection */}
        <div className="flex bg-slate-100 dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 self-start md:self-auto shadow-sm">
          <button
            onClick={() => { setActiveTab('pareto'); setQuizMode(false); }}
            className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'pareto' 
                ? 'bg-rose-600 text-white shadow' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Lightbulb size={16} />
            Pareto Cheat Sheet (Core Tricks)
          </button>
          <button
            onClick={() => { setActiveTab('exams'); handleResetQuiz(); }}
            className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'exams' 
                ? 'bg-rose-600 text-white shadow' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Award size={16} />
            Interactive Exams & Quizzes
          </button>
        </div>
      </div>

      {activeTab === 'pareto' ? (
        // TABLE 1: PARETO CHEAT SHEET
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-amber-50 to-rose-50 dark:from-slate-900/60 dark:to-rose-950/20 border-l-4 border-amber-500 rounded-2xl p-6 shadow-sm">
            <h3 className="font-extrabold text-amber-900 dark:text-amber-400 text-lg mb-1 flex items-center gap-2">
              <Sparkles size={18} />
              What is the Pareto Principle (80/20 Rule) for exams?
            </h3>
            <p className="text-amber-800 dark:text-amber-200/80 text-sm leading-relaxed">
              Dr. Ehab's exams follow a highly predictable pattern. **80% of his points are allocated across 20% of core C++ concepts**: reference syntax arguments, structure memory footprints (0 bytes on declaration), post-increment offsets, local parameter swap copies, and menu-driven storage arrays. Master these 7 core traps to score an automatic A/A+.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PARETO_TRICKS.map((trick, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.05 }}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 font-mono text-[10px] font-bold px-3 py-1 rounded-bl-xl border-l border-b border-slate-100 dark:border-slate-800">
                  {trick.importance}
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-rose-100/60 dark:bg-rose-950/20 rounded-xl shrink-0 mt-1">
                    {trick.icon}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-lg leading-tight">
                      {trick.title}
                    </h4>
                    <span className="text-slate-400 text-xs font-medium block mt-0.5 mb-3 uppercase tracking-wider">
                      {trick.subtitle}
                    </span>
                    <p className="text-slate-650 dark:text-slate-300 text-sm leading-relaxed font-normal mb-4">
                      {trick.principle}
                    </p>
                  </div>
                </div>

                <div className="bg-rose-50/40 dark:bg-rose-950/10 rounded-xl p-4 border border-rose-200/35 mt-auto">
                  <div className="flex gap-2 text-rose-800 dark:text-rose-300 text-xs font-bold uppercase tracking-wider mb-1">
                    <Lightbulb size={14} className="shrink-0" />
                    How to defeat this trick:
                  </div>
                  <p className="text-xs text-rose-900/80 dark:text-rose-200/70 leading-relaxed font-mono">
                    {trick.trick}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        // TAB 2: EXAMS SELECTOR & SOLUTIONS / QUIZ ROOM
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Select Past Examination:</h3>
            <div className="flex flex-wrap gap-3">
              {EXAMS_DATA.map((exam) => (
                <button
                  key={exam.id}
                  onClick={() => { setSelectedExamId(exam.id); handleResetQuiz(); }}
                  className={`px-4 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                    selectedExamId === exam.id 
                      ? 'bg-rose-600 text-white shadow-md' 
                      : 'bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Award size={16} />
                  {exam.year} ({exam.semester})
                </button>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-slate-600 dark:text-slate-300">
              <div>
                <span className="text-slate-400 uppercase font-bold tracking-wider text-[10px] block">Course:</span>
                <span className="font-semibold text-slate-900 dark:text-white text-base leading-tight">{selectedExam.course}</span>
              </div>
              <div>
                <span className="text-slate-400 uppercase font-bold tracking-wider text-[10px] block">Time duration:</span>
                <span className="font-semibold text-slate-900 dark:text-white text-base">{selectedExam.duration}</span>
              </div>
              <div>
                <span className="text-slate-400 uppercase font-bold tracking-wider text-[10px] block">Examiner/Professor:</span>
                <span className="font-semibold text-slate-900 dark:text-white text-base">{selectedExam.professor}</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuizMode(!quizMode)}
                  className={`w-full py-3 px-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all ${
                    quizMode 
                      ? 'bg-amber-500 hover:bg-amber-600 text-white' 
                      : 'bg-rose-600 hover:bg-rose-700 text-white'
                  }`}
                >
                  {quizMode ? (
                    <>
                      <Compass size={18} />
                      View Textbook Answers
                    </>
                  ) : (
                    <>
                      <Flame size={18} />
                      Interactive Quiz Me!
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {!quizMode ? (
            // MODE A: SOLVED LIST
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="text-rose-600" size={20} />
                  Exam Questions Solved & Resolved ({selectedExam.questions.length} questions total)
                </h3>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-900 px-3 py-1 rounded-md">
                  Calculator strictly forbidden
                </span>
              </div>

              {selectedExam.questions.map((q, idx) => (
                <div 
                  key={q.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm"
                >
                  <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4">
                    <div className="flex gap-3">
                      <span className="bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-mono font-bold px-3 py-1 rounded-lg text-xs leading-none flex items-center">
                        Q{idx + 1}
                      </span>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-lg leading-tight">
                          {q.title}
                        </h4>
                        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 block">
                          Weight: {q.points} points
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {q.previewCode && (
                        <button
                          onClick={() => runCodeInSandbox(q.previewCode!, q.defaultStdin)}
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm transition-all"
                        >
                          <Play size={13} />
                          Test Code Sandbox
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="p-6 bg-slate-50/50 dark:bg-slate-950/10">
                    <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium whitespace-pre-wrap text-base">
                      {q.questionText}
                    </p>

                    {/* ASSISTANT GUIDANCE / HELPING COMPONENT */}
                    <div className="mt-4 bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/20 rounded-xl p-4">
                      <div className="flex gap-2 text-amber-900 dark:text-amber-400 font-extrabold text-sm mb-1 items-center">
                        <Lightbulb size={16} />
                        Helping C++ Assistant Hint:
                      </div>
                      <p className="text-xs text-amber-800 dark:text-amber-200/80 leading-relaxed font-medium">
                        {q.hint}
                      </p>
                    </div>

                    {/* CORE ANSWER BOX */}
                    <div className="mt-5 border-t border-slate-100 dark:border-slate-800 pt-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        <span className="text-xs uppercase font-extrabold tracking-wider text-green-700 dark:text-green-400">
                          Official Grade Solution:
                        </span>
                      </div>
                      
                      {q.type === 'program' || q.type === 'class' ? (
                        <div className="space-y-4">
                          <div className="bg-slate-900 text-slate-100 font-mono text-sm rounded-xl p-5 overflow-x-auto border border-slate-950">
                            <pre className="whitespace-pre">{q.previewCode || q.solution}</pre>
                          </div>
                          {q.previewCode && (
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                              {q.solution}
                            </p>
                          )}
                        </div>
                      ) : (
                        <p className="text-slate-700 dark:text-slate-300 text-sm whitespace-pre-line leading-relaxed font-normal bg-green-50/30 dark:bg-green-950/5 p-4 rounded-xl border border-green-200/10">
                          {q.solution}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // MODE B: INTERACTIVE QUIZ
            <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-6 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white">CMP 110 Exam Quiz Mode</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Attempting question {quizStartIndex + 1} of {selectedExam.questions.length}</p>
                </div>
                <div className="bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 border border-rose-200/50 rounded-lg px-3 py-1 text-sm font-bold flex items-center gap-2">
                  <span>Score: {currentScore} / {totalAttempted}</span>
                  <button onClick={handleResetQuiz} className="p-1 text-rose-500 hover:bg-rose-100/20 rounded">
                    <RefreshCw size={13} />
                  </button>
                </div>
              </div>

              {quizStartIndex < selectedExam.questions.length ? (
                <div className="p-6">
                  <div className="mb-4">
                    <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">
                      {selectedExam.questions[quizStartIndex].title}
                    </span>
                    <h4 className="text-lg md:text-xl font-bold leading-relaxed text-slate-900 dark:text-white whitespace-pre-wrap">
                      {selectedExam.questions[quizStartIndex].questionText}
                    </h4>
                  </div>

                  {/* HELPING ASSISTANT COMPONENT */}
                  <div className="mb-6 bg-amber-50/60 dark:bg-amber-950/10 border border-amber-200/20 rounded-xl p-4">
                    <div className="flex gap-2 text-amber-950 dark:text-amber-400 font-extrabold text-xs mb-1 items-center">
                      <Lightbulb size={15} />
                      Helping Assistant Hint:
                    </div>
                    <p className="text-xs text-amber-800 dark:text-amber-200/80 leading-relaxed">
                      {selectedExam.questions[quizStartIndex].hint}
                    </p>
                  </div>

                  {selectedExam.questions[quizStartIndex].options ? (
                    // OPTION BUTTONS list
                    <div className="space-y-3 mb-6">
                      {selectedExam.questions[quizStartIndex].options!.map((option, oIdx) => {
                        const isSelectOption = selectedOption === oIdx;

                        return (
                          <button
                            key={oIdx}
                            onClick={() => { if (!showQuizDetails) setSelectedOption(oIdx); }}
                            disabled={showQuizDetails}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all font-bold text-sm cursor-pointer flex justify-between items-center ${
                              showQuizDetails
                                ? oIdx === selectedExam.questions[quizStartIndex].correctAnswer
                                  ? 'border-green-500 bg-green-50 dark:bg-green-950/20 text-green-900 dark:text-green-300'
                                  : isSelectOption
                                    ? 'border-red-400 bg-red-50 dark:bg-red-950/20 text-red-900 dark:text-red-300'
                                    : 'border-slate-100 dark:border-slate-900 text-slate-400 opacity-60'
                                : isSelectOption
                                  ? 'border-rose-600 bg-rose-50/40 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400'
                                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900'
                            }`}
                          >
                            <span>{option}</span>
                            {showQuizDetails && oIdx === selectedExam.questions[quizStartIndex].correctAnswer && (
                              <CheckCircle2 size={16} className="text-green-500" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    // TEXT OR TRUE/FALSE OR CODE SUBMIT OR MANUAL COMPILATION REVEAL
                    <div className="space-y-4 mb-6">
                      {selectedExam.questions[quizStartIndex].type === 'true-false' ? (
                        <div className="grid grid-cols-2 gap-4">
                          {[true, false].map((val) => {
                            const isSelectOption = selectedOption === val;

                            return (
                              <button
                                key={val ? 'true' : 'false'}
                                onClick={() => { if (!showQuizDetails) setSelectedOption(val); }}
                                disabled={showQuizDetails}
                                className={`p-4 rounded-xl border-2 font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-1 block/inline ${
                                  showQuizDetails
                                    ? val === selectedExam.questions[quizStartIndex].correctAnswer
                                      ? 'border-green-500 bg-green-50 dark:bg-green-950/20 text-green-900 dark:text-green-300'
                                      : isSelectOption
                                        ? 'border-red-400 bg-red-50 dark:bg-red-950/20 text-red-900 dark:text-red-300'
                                        : 'border-slate-100 dark:border-slate-900 text-slate-400 opacity-60'
                                    : isSelectOption
                                      ? 'border-rose-600 bg-rose-50/40 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400'
                                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700'
                                }`}
                              >
                                {val ? <CheckCircle2 size={20} className="text-green-500" /> : <XCircle size={20} className="text-red-550" />}
                                <span>{val ? 'TRUE' : 'FALSE'}</span>
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="bg-slate-50 dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-800 rounded-xl text-center text-slate-500 text-sm">
                          This is a complex structured question (programming/binary conversion/diagram). Take a moment to write down your answer on a piece of scratch paper, then hit the "Reveal Solution" button to verify your concepts!
                        </div>
                      )}
                    </div>
                  )}

                  {!showQuizDetails ? (
                    <div className="flex justify-end gap-3">
                      {selectedExam.questions[quizStartIndex].previewCode && (
                        <button
                          onClick={() => runCodeInSandbox(selectedExam.questions[quizStartIndex].previewCode!, selectedExam.questions[quizStartIndex].defaultStdin)}
                          className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 border border-slate-200 dark:border-slate-800 font-bold text-sm px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all"
                        >
                          <Code size={16} />
                          Test in Compiler Sandbox
                        </button>
                      )}
                      <button
                        onClick={() => handleQuizAnswer(selectedExam.questions[quizStartIndex].correctAnswer ?? '')}
                        disabled={selectedOption === null && (selectedExam.questions[quizStartIndex].options !== undefined || selectedExam.questions[quizStartIndex].type === 'true-false')}
                        className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-1.5 cursor-pointer shadow-sm transition-all ${
                          selectedOption === null && (selectedExam.questions[quizStartIndex].options !== undefined || selectedExam.questions[quizStartIndex].type === 'true-false')
                            ? 'bg-slate-100 dark:bg-slate-900 text-slate-400 cursor-not-allowed'
                            : 'bg-rose-600 hover:bg-rose-700 text-white'
                        }`}
                      >
                        Reveal Solution
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-green-50/40 dark:bg-green-950/10 border border-green-200/40 rounded-xl p-5">
                        <div className="flex gap-2 text-green-900 dark:text-green-400 font-black text-sm mb-2 items-center">
                          <CheckCircle2 size={16} />
                          Correct Answer Solution Explanation:
                        </div>
                        {selectedExam.questions[quizStartIndex].previewCode ? (
                          <div className="space-y-3">
                            <div className="bg-slate-900 text-slate-100 font-mono text-xs rounded-xl p-4 overflow-x-auto border border-slate-950">
                              <pre className="whitespace-pre">{selectedExam.questions[quizStartIndex].previewCode}</pre>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                              {selectedExam.questions[quizStartIndex].solution}
                            </p>
                          </div>
                        ) : (
                          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap font-normal">
                            {selectedExam.questions[quizStartIndex].solution}
                          </p>
                        )}
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                          {(selectedExam.questions[quizStartIndex].options !== undefined || selectedExam.questions[quizStartIndex].type === 'true-false') && (
                            selectedOption === selectedExam.questions[quizStartIndex].correctAnswer
                              ? "✅ Correct choice" 
                              : "❌ Incorrect / check explanation"
                          )}
                        </p>
                        <button
                          onClick={handleNextQuiz}
                          className="bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl flex items-center gap-1.5 transition-all"
                        >
                          {quizStartIndex < selectedExam.questions.length - 1 ? (
                            <>
                              Next Question
                              <ChevronRight size={16} />
                            </>
                          ) : (
                            "Check Another Exam"
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-950/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200/50">
                    <Award size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Quiz Completed!</h4>
                  <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto text-sm mb-6">
                    Excellent prep! You scored <span className="font-bold text-rose-500">{currentScore}</span> out of <span className="font-bold">{totalAttempted}</span> on the {selectedExam.year} exam. Let's restart or check another semester.
                  </p>
                  <button
                    onClick={handleResetQuiz}
                    className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-all"
                  >
                    Reset & Practice Again
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
