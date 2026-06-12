import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Trophy, Clock, Target, Flame, Terminal, HelpCircle, 
  BookOpen, Binary, GraduationCap, Compass, Search, 
  Sparkles, PlayCircle, Code, ArrowRight, CheckCircle2, 
  XCircle, RefreshCw, Eye, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CURRICULUM_TOPICS } from '../data/curriculum';
import { DEFINITIONS } from '../data/definitions';
import { EXAMS_DATA } from '../data/exams';
import { MCQS } from '../data/mcq';
import { VIDEO_CATEGORIES } from '../data/videos';

export default function Dashboard() {
  const navigate = useNavigate();

  // Calculation of real data states
  const totalTopics = CURRICULUM_TOPICS.length;
  const totalSections = CURRICULUM_TOPICS.reduce((acc, topic) => acc + topic.sections.length, 0);
  const totalMCQs = MCQS.length;
  const totalDefinitions = DEFINITIONS.length;
  const totalExams = EXAMS_DATA.length;
  const totalVideos = VIDEO_CATEGORIES.reduce((acc, cat) => acc + cat.videos.length, 0);

  // 1. Interactive MCQ Widget State
  const [mcqIndex, setMcqIndex] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);

  // Load a random MCQ
  const loadRandomMCQ = () => {
    const randomIdx = Math.floor(Math.random() * MCQS.length);
    setMcqIndex(randomIdx);
    setSelectedOptionIdx(null);
    setQuizAnswered(false);
  };

  useEffect(() => {
    loadRandomMCQ();
  }, []);

  const currentMcq = MCQS[mcqIndex] || MCQS[0];

  const handleMcqSelect = (idx: number) => {
    if (quizAnswered) return;
    setSelectedOptionIdx(idx);
  };

  const handleMcqSubmit = () => {
    if (selectedOptionIdx === null) return;
    setQuizAnswered(true);
  };

  // 2. Term search & word of the day State
  const [searchTerm, setSearchTerm] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [isWordFlipped, setIsWordFlipped] = useState(false);

  useEffect(() => {
    const dailyIdx = Math.floor((new Date().getDate() * 7) % DEFINITIONS.length);
    setWordIdx(dailyIdx);
  }, []);

  const wordOfTheDay = DEFINITIONS[wordIdx] || DEFINITIONS[0];

  const rotateWord = () => {
    setIsWordFlipped(false);
    setTimeout(() => {
      setWordIdx((prev) => (prev + 1) % DEFINITIONS.length);
    }, 150);
  };

  const handleSearchTerm = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?term=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  // 3. Mini Number Systems Converter State
  const [inputVal, setInputVal] = useState('149');
  const [inputBase, setInputBase] = useState<'decimal' | 'binary'>('decimal');
  const [conversionResult, setConversionResult] = useState<{
    dec: string;
    bin: string;
    oct: string;
    hex: string;
    isValid: boolean;
  }>({ dec: '', bin: '', oct: '', hex: '', isValid: true });

  const calculateConversions = (val: string, base: 'decimal' | 'binary') => {
    const trimmed = val.trim();
    if (!trimmed) {
      setConversionResult({ dec: '-', bin: '-', oct: '-', hex: '-', isValid: true });
      return;
    }

    if (base === 'decimal') {
      const parsedNum = parseInt(trimmed, 10);
      if (isNaN(parsedNum) || !/^\d+$/.test(trimmed)) {
        setConversionResult({ dec: 'NaN', bin: 'NaN', oct: 'NaN', hex: 'NaN', isValid: false });
        return;
      }
      setConversionResult({
        dec: parsedNum.toString(10),
        bin: parsedNum.toString(2),
        oct: parsedNum.toString(8),
        hex: parsedNum.toString(16).toUpperCase(),
        isValid: true
      });
    } else {
      if (!/^[01]+$/.test(trimmed)) {
        setConversionResult({ dec: 'NaN', bin: 'NaN', oct: 'NaN', hex: 'NaN', isValid: false });
        return;
      }
      const parsedNum = parseInt(trimmed, 2);
      setConversionResult({
        dec: parsedNum.toString(10),
        bin: trimmed,
        oct: parsedNum.toString(8),
        hex: parsedNum.toString(16).toUpperCase(),
        isValid: true
      });
    }
  };

  useEffect(() => {
    calculateConversions(inputVal, inputBase);
  }, [inputVal, inputBase]);

  // 4. C++ Playground launcher presets
  const sandboxPresets = [
    {
      name: 'Hello World',
      description: 'Main standard boilerplate',
      code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello World from the Reference Hub!" << endl;\n    return 0;\n}`,
      stdin: ''
    },
    {
      name: 'Pass-by-Reference',
      description: 'Address value swapper model',
      code: `#include <iostream>\nusing namespace std;\n\nvoid swapValue(int &a, int &b) {\n    int temp = a;\n    a = b;\n    b = temp;\n}\n\nint main() {\n    int x = 10, y = 20;\n    cout << "Before swap: x=" << x << ", y=" << y << endl;\n    swapValue(x, y);\n    cout << "After swap: x=" << x << ", y=" << y << endl;\n    return 0;\n}`,
      stdin: ''
    },
    {
      name: 'Ticket Struct',
      description: 'Heterogeneous memory structures',
      code: `#include <iostream>\n#include <string>\nusing namespace std;\n\nstruct FlightTicket {\n    int id;\n    string destination;\n    double price;\n};\n\nint main() {\n    FlightTicket ticket = {809, "Rome", 450.75};\n    cout << "Ticket [#" << ticket.id << "] to " << ticket.destination << " costs $" << ticket.price << endl;\n    return 0;\n}`,
      stdin: ''
    }
  ];

  const launchSandboxPreset = (preset: typeof sandboxPresets[0]) => {
    localStorage.setItem('playground_override', JSON.stringify({
      code: preset.code,
      stdin: preset.stdin
    }));
    navigate('/playground');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 md:p-10 max-w-7xl mx-auto space-y-10"
    >
      
      {/* Dynamic Header Section */}
      <motion.div 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 border-b border-slate-200 dark:border-slate-800"
      >
        <div>
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-mono">Modern Academy Hub</span>
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mt-1">C++ Reference Hub</h1>
          <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mt-2 font-medium">
            Explore authentic academic tools, source templates, and solutions. No fake progress, only high-fidelity interactive training modules.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 p-4 rounded-2xl shrink-0 self-start md:self-center">
          <Sparkles className="text-indigo-500 dark:text-indigo-400 animate-pulse shrink-0" size={24} />
          <div>
            <div className="text-[10px] uppercase tracking-wider font-extrabold text-indigo-400">Library Integrity</div>
            <div className="text-sm font-black text-indigo-900 dark:text-indigo-200">100% Real Course Materials</div>
          </div>
        </div>
      </motion.div>

      {/* Dynamic Integrity Counter Cards */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.2 }
          }
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          { label: "Syllabus Sections", value: totalSections, phrase: `${totalTopics} Core Chapters`, icon: BookOpen, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-950/20", border: "border-purple-100 dark:border-purple-900/30" },
          { label: "Compiler Presets", value: sandboxPresets.length, phrase: "Syntactical Code Blocks", icon: Terminal, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-950/20", border: "border-blue-100 dark:border-blue-900/30" },
          { label: "Tricky MCQ Bank", value: totalMCQs, phrase: "Instant Scoring & Reset", icon: HelpCircle, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-950/20", border: "border-amber-100 dark:border-amber-900/30" },
          { label: "Past Exam Papers", value: totalExams, phrase: "With Official Solutions", icon: GraduationCap, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/20", border: "border-emerald-100 dark:border-emerald-900/30" },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 }
            }}
            className={`p-5 bg-white dark:bg-slate-900 border ${stat.border} rounded-2xl flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${stat.bg} ${stat.color}`}>
              <stat.icon size={22} strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{stat.label}</div>
              <div className="text-2xl font-black text-slate-900 dark:text-white leading-none mt-1">{stat.value}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">{stat.phrase}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bento-style Grid of Actual Library Tools */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6"
      >
        
        {/* Card 1: C++ Compiler Sandbox Preset Launcher (3 Cols Wide) */}
        <div className="md:col-span-2 lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:border-slate-350 dark:hover:border-slate-700 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Terminal size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">C++ Compiler Sandbox</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Verify standard programs directly</p>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-300 px-2.5 py-1 rounded-full">Interactive compiler</span>
            </div>
            
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 font-medium">
              Run real-time diagnostics, declare headers, and input values into standard code blocks. Instant execution diagnostics helps trace custom programs.
            </p>

            <div className="space-y-3 mb-6">
              <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest font-mono">Launch a Starter Code Preset</span>
              <div className="grid grid-cols-1 gap-2.5">
                {sandboxPresets.map((preset, i) => (
                  <button
                    key={i}
                    onClick={() => launchSandboxPreset(preset)}
                    className="w-full text-left p-3.5 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-blue-50/50 dark:hover:bg-blue-950/10 hover:border-blue-300 dark:hover:border-blue-900 group transition-all flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <div className="text-xs font-black text-slate-800 dark:text-slate-200 flex items-center gap-1.5 font-mono">
                        <Code size={12} className="text-blue-500" /> {preset.name}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{preset.description}</div>
                    </div>
                    <ArrowRight size={14} className="text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/playground')}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/10 transition-all font-mono active:scale-98"
          >
            Launch Clean Sandbox Editor <Terminal size={14} />
          </button>
        </div>

        {/* Card 2: Daily C++ MCQ Challenge - Answering widget directly here! (3 Cols Wide) */}
        <div className="md:col-span-2 lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:border-slate-350 dark:hover:border-slate-700 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <HelpCircle size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">MCQ & Tricks Challenge</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Verify standard C++ traps</p>
                </div>
              </div>
              <button 
                onClick={loadRandomMCQ}
                className="p-2 text-slate-500 hover:text-amber-500 dark:hover:text-amber-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                title="Randomize MCQ"
              >
                <RefreshCw size={16} />
              </button>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-850 mb-5">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono mb-1">C++ TRICK PROBLEM:</div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-relaxed font-sans line-clamp-3">
                {currentMcq.question}
              </p>
            </div>

            <div className="space-y-2 mb-6">
              {currentMcq.options.map((opt, oIdx) => {
                const isSelected = selectedOptionIdx === oIdx;
                const isCorrectAns = oIdx === currentMcq.correctAnswer;
                
                return (
                  <button
                    key={oIdx}
                    disabled={quizAnswered}
                    onClick={() => handleMcqSelect(oIdx)}
                    className={`w-full text-left p-3 rounded-xl border text-xs font-semibold font-mono transition-all flex items-center justify-between ${
                      quizAnswered
                        ? isCorrectAns
                          ? "bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold"
                          : isSelected
                            ? "bg-red-500/10 border-red-500 text-red-600 dark:text-red-400"
                            : "border-slate-100 dark:border-slate-850 opacity-40 text-slate-500"
                        : isSelected
                          ? "border-amber-500 bg-amber-50/50 dark:bg-amber-950/10 text-amber-900 dark:text-amber-300 font-bold"
                          : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-350"
                    }`}
                  >
                    <span className="truncate pr-4">{opt}</span>
                    {quizAnswered && isCorrectAns && <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />}
                    {quizAnswered && isSelected && !isCorrectAns && <XCircle size={13} className="text-red-500 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-2">
            {!quizAnswered ? (
              <button
                onClick={handleMcqSubmit}
                disabled={selectedOptionIdx === null}
                className={`flex-1 py-3 font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all font-mono select-none ${
                  selectedOptionIdx === null
                    ? "bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 cursor-not-allowed"
                    : "bg-amber-500 hover:bg-amber-600 text-white cursor-pointer"
                }`}
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={() => navigate(`/mcq?q=${encodeURIComponent(currentMcq.trick)}`)}
                className="flex-1 py-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 text-amber-700 dark:text-amber-400 font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all font-mono"
              >
                View Full Trick Explanation <ArrowRight size={13} />
              </button>
            )}
            <button
              onClick={() => navigate('/mcq')}
              className="py-3 px-4 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-xs font-mono text-slate-600 dark:text-slate-400 cursor-pointer"
              title="Open All MCQs"
            >
              All MCQs ({totalMCQs})
            </button>
          </div>
        </div>

        {/* Card 3: Past Exam Papers Room (2 Cols Wide) */}
        <div className="md:col-span-1 lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:border-slate-350 dark:hover:border-slate-700 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">Past Exams</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Authentic exam practice</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4 font-semibold">
              Attempt historical test questions compiled from formal examinations with fully formulated marking guides and solution scripts.
            </p>

            <div className="space-y-2 mb-6">
              {EXAMS_DATA.map((exam) => (
                <div 
                  key={exam.id}
                  className="p-3 border border-slate-150 dark:border-slate-850 rounded-xl hover:border-slate-300 dark:hover:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 text-left"
                >
                  <div className="text-xs font-extrabold text-slate-800 dark:text-slate-200 leading-tight">
                    {exam.year} ({exam.semester})
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium block leading-relaxed truncate">{exam.course}</span>
                  
                  <div className="flex gap-1.5 mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-850">
                    <button
                      onClick={() => navigate(`/exams?id=${exam.id}`)}
                      className="px-2 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-[9px] font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 cursor-pointer flex items-center gap-0.5 font-mono"
                    >
                      <Eye size={10} /> Solutions
                    </button>
                    <button
                      onClick={() => navigate(`/exams?id=${exam.id}&mode=quiz`)}
                      className="px-2 py-1 bg-emerald-500/10 border border-emerald-100 dark:border-emerald-900 rounded-lg text-[9px] font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 cursor-pointer flex items-center gap-0.5 font-mono"
                    >
                      <Trophy size={10} /> Practice Quiz
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => navigate('/exams')}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1 transition-all font-mono shadow-md shadow-emerald-500/10 active:scale-98"
          >
            Review Marking Guide Center <ArrowRight size={13} />
          </button>
        </div>

        {/* Card 4: Curriculum Syllabus Chapter Quick Nav (2 Cols Wide) */}
        <div className="md:col-span-1 lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:border-slate-350 dark:hover:border-slate-700 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">Academic Syllabus</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Core curriculum lessons</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4 font-semibold">
              Browse structured C++ programming lessons. Each topic contains fundamental code templates, syntactic breakdowns, and special tricks.
            </p>

            <div className="grid grid-cols-1 gap-2 mb-6">
              {CURRICULUM_TOPICS.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => navigate(`/curriculum?topic=${topic.id}`)}
                  className="w-full p-2.5 text-left border border-slate-150 dark:border-slate-850 rounded-xl hover:bg-purple-50/30 dark:hover:bg-purple-950/5 hover:border-purple-200 dark:hover:border-purple-900 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="truncate pr-2">
                    <div className="text-[11px] font-extrabold text-slate-800 dark:text-slate-200 font-sans truncate">{topic.title}</div>
                    <div className="text-[9px] text-slate-400 font-medium truncate mt-0.5">{topic.description}</div>
                  </div>
                  <ChevronRight size={13} className="text-slate-400 group-hover:text-purple-500 shrink-0 font-bold" />
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => navigate('/curriculum')}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-purple-500/10 transition-all font-mono active:scale-98"
          >
            Syllabus Curriculum Desk <ArrowRight size={13} />
          </button>
        </div>

        {/* Card 5: Live Number Systems Converter (2 Cols Wide) */}
        <div className="md:col-span-1 lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:border-slate-350 dark:hover:border-slate-700 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Binary size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">Number Systems Lab</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Real-time conversions</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4 font-semibold">
              Practicing base conversion is essential for C++ binary weight exams. Try converting decimal integers and binary streams on the fly below.
            </p>

            <div className="space-y-3.5 mb-6">
              <div className="flex items-center bg-slate-100 dark:bg-slate-950 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => { setInputBase('decimal'); setInputVal('149'); }}
                  className={`flex-1 text-center py-2 text-[10px] font-bold rounded-lg transition-all ${inputBase === 'decimal' ? 'bg-white dark:bg-slate-850 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-750'}`}
                >
                  Decimal Base-10
                </button>
                <button
                  type="button"
                  onClick={() => { setInputBase('binary'); setInputVal('10010101'); }}
                  className={`flex-1 text-center py-2 text-[10px] font-bold rounded-lg transition-all ${inputBase === 'binary' ? 'bg-white dark:bg-slate-850 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-750'}`}
                >
                  Binary Base-2
                </button>
              </div>

              <div>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  className={`w-full p-2.5 rounded-xl text-center text-sm font-black font-mono border ${
                    conversionResult.isValid 
                      ? "border-slate-200 dark:border-slate-800 focus:border-indigo-500 text-slate-800 dark:text-slate-100" 
                      : "border-red-400 text-red-500 focus:outline-none dark:bg-red-950/15"
                  } bg-white dark:bg-slate-900`}
                  placeholder={inputBase === 'decimal' ? 'e.g. 149' : 'e.g. 1010101'}
                />
                {!conversionResult.isValid && (
                  <span className="text-[9px] text-red-500 font-extrabold font-mono mt-1 block">
                    * Invalid format for base selection!
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 bg-slate-50 dark:bg-slate-950/20 p-3 rounded-2xl border border-slate-150 dark:border-slate-850">
                <div className="text-center p-1 border-r border-slate-100 dark:border-slate-850">
                  <div className="text-[8px] font-bold text-slate-400 uppercase font-mono">Decimal (10)</div>
                  <div className="text-xs font-black text-slate-700 dark:text-slate-350 font-mono tracking-tight mt-0.5">{conversionResult.dec}</div>
                </div>
                <div className="text-center p-1">
                  <div className="text-[8px] font-bold text-slate-400 uppercase font-mono">Binary (2)</div>
                  <div className="text-xs font-black text-slate-700 dark:text-slate-350 font-mono tracking-tight mt-0.5 truncate max-w-full" title={conversionResult.bin}>{conversionResult.bin}</div>
                </div>
                <div className="text-center p-1 border-t border-r border-slate-100 dark:border-slate-850 pt-2">
                  <div className="text-[8px] font-bold text-slate-400 uppercase font-mono">Hex (16)</div>
                  <div className="text-xs font-black text-slate-700 dark:text-slate-350 font-mono tracking-tight mt-0.5">{conversionResult.hex}</div>
                </div>
                <div className="text-center p-1 border-t border-slate-100 dark:border-slate-850 pt-2">
                  <div className="text-[8px] font-bold text-slate-400 uppercase font-mono">Octal (8)</div>
                  <div className="text-xs font-black text-slate-700 dark:text-slate-350 font-mono tracking-tight mt-0.5">{conversionResult.oct}</div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/number-systems')}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1 transition-all font-mono shadow-md shadow-indigo-500/10 active:scale-98"
          >
            Number System Quick Solver <ArrowRight size={13} />
          </button>
        </div>

      </motion.div>

      {/* Glossary & Video Lesson Spotlight Footer Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        
        {/* Glossary Terms Deck Search */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:border-slate-350 dark:hover:border-slate-700 transition-colors">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                <Compass size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Definitions & Flashcards</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Core terminology lookup</p>
              </div>
            </div>

            <form onSubmit={handleSearchTerm} className="relative mb-5">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Lookup standard keywords (e.g. Struct, Array, Function)"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-medium rounded-xl pl-9 pr-4 py-3 outline-none focus:border-cyan-500 hover:border-slate-300 dark:hover:border-slate-700 transition-all font-sans"
              />
              <Search size={14} className="text-slate-400 absolute left-3 top-3.5" />
            </form>

            <div className="bg-slate-50 dark:bg-slate-950/40 p-4 border border-slate-150 dark:border-slate-850 rounded-2xl flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="text-[10px] uppercase font-bold text-cyan-500 tracking-wider font-mono mb-1">Spotlight Flashcard</div>
                <div className="text-xs font-black text-slate-800 dark:text-slate-200 font-sans">{wordOfTheDay.term}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-semibold mt-1">
                  {!isWordFlipped ? "Definition card is currently hidden." : wordOfTheDay.definition}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsWordFlipped(!isWordFlipped)}
                className="px-2.5 py-1.5 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-850 text-[10px] font-bold border border-slate-200 dark:border-slate-800 rounded-lg shrink-0 cursor-pointer text-slate-650"
              >
                {!isWordFlipped ? "Flip Card" : "Hide"}
              </button>
            </div>
          </div>

          <div className="flex gap-2 mt-5">
            <button
              onClick={rotateWord}
              className="flex-1 py-3 bg-slate-100 dark:bg-slate-850 rounded-xl font-bold font-mono text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
            >
              Get Another Word
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-extrabold font-mono text-xs rounded-xl flex items-center justify-center gap-1 transition-all active:scale-98"
            >
              Lexicon Deck <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* Video Lectures Quick Launch */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:border-slate-350 dark:hover:border-slate-700 transition-colors">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <PlayCircle size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Video Seminar Series</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Dynamic video explanations</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4 font-semibold">
              Review pre-recorded intensive sessions and problem-solving seminars recorded by academic teaching assistants covering C++ labs.
            </p>

            <div className="space-y-2 mb-4">
              {VIDEO_CATEGORIES.slice(0, 2).map((cat, i) => {
                const sampleVideo = cat.videos[0];
                return (
                  <div 
                    key={i}
                    onClick={() => navigate(`/videos?cat=${cat.id}&vid=${sampleVideo.id}`)}
                    className="p-3 border border-slate-150 dark:border-slate-850 rounded-xl hover:bg-rose-50/20 hover:border-rose-300 dark:hover:border-rose-900 transition-all text-left flex items-center justify-between cursor-pointer group"
                  >
                    <div>
                      <div className="text-[11px] font-black text-slate-800 dark:text-slate-200">{cat.title}</div>
                      <span className="text-[9px] text-slate-400 font-medium block mt-0.5">{cat.instructor} · {sampleVideo.duration || 'Session content'}</span>
                    </div>
                    <PlayCircle size={18} className="text-rose-400 group-hover:text-rose-600 shrink-0 group-hover:scale-110 transition-all" />
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => navigate('/videos')}
            className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs  rounded-xl flex items-center justify-center gap-1 transition-all font-mono shadow-md shadow-rose-500/10 active:scale-98"
          >
            Video Lecture Room ({totalVideos} videos) <ArrowRight size={13} />
          </button>
        </div>

      </div>

    </motion.div>
  );
}
