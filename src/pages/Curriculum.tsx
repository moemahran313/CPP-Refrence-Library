import React, { useState, useEffect } from 'react';
import { CURRICULUM_TOPICS } from '../data/curriculum';
import { BookOpen, Terminal, ChevronRight } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/components/prism-cpp';
import 'prismjs/themes/prism-tomorrow.css';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'motion/react';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { useLocation } from 'react-router-dom';

export default function Curriculum() {
  const [activeTopicId, setActiveTopicId] = useState(CURRICULUM_TOPICS[0].id);
  const location = useLocation();

  const activeTopic = CURRICULUM_TOPICS.find((t) => t.id === activeTopicId) || CURRICULUM_TOPICS[0];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const topicParam = params.get('topic');
    if (topicParam) {
      const exists = CURRICULUM_TOPICS.some((t) => t.id === topicParam);
      if (exists) {
        setActiveTopicId(topicParam);
      }
    }
  }, [location.search]);

  React.useEffect(() => {
    Prism.highlightAll();
  }, [activeTopicId]);

  return (
    <div className="max-w-[1600px] mx-auto h-full flex flex-col items-stretch lg:flex-row min-h-[calc(100vh-6rem)]">
      {/* Sidebar Topics */}
      <div className="w-full lg:w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 overflow-y-auto shrink-0 flex flex-col p-4 relative z-10 hidden lg:flex">
        <div className="mb-6 px-2">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-2">
            <BookOpen size={20} />
            <span className="font-bold uppercase tracking-widest text-xs">Learn C++</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Curriculum</h2>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-1">
          {CURRICULUM_TOPICS.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setActiveTopicId(topic.id)}
              className={clsx(
                "w-full text-left px-4 py-3 rounded-xl flex items-center justify-between transition-colors",
                activeTopicId === topic.id
                  ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-bold"
                  : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium"
              )}
            >
              <span>{topic.title}</span>
              {activeTopicId === topic.id && <ChevronRight size={16} />}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Viewer Area */}
      <div className="flex-1 bg-slate-50 dark:bg-slate-950 overflow-y-auto p-4 md:p-12 flex flex-col">
        {/* Mobile Nav */}
        <div className="lg:hidden mb-6">
          <select
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
            value={activeTopicId}
            onChange={(e) => setActiveTopicId(e.target.value)}
          >
            {CURRICULUM_TOPICS.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.title}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTopic.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex flex-col"
            >
              <div className="mb-10">
                <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
                  {activeTopic.title}
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                  {activeTopic.description}
                </p>
              </div>

              <div className="space-y-12 pb-12">
                {activeTopic.sections.map((section, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="p-6 md:p-8">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{section.title}</h3>
                      <div className="max-w-none text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                        <MarkdownRenderer content={section.content} />
                      </div>

                      {section.code && (
                        <div className="mt-6 rounded-2xl overflow-hidden shadow-lg border border-slate-800">
                          <div className="px-4 py-2 bg-slate-900 text-slate-400 text-xs font-mono font-bold border-b border-slate-800 flex items-center gap-2">
                             <Terminal size={14} /> Example
                          </div>
                          <pre className="!m-0 !p-6 object-cover bg-[#1d1f21]">
                            <code className="language-cpp !text-sm">{section.code.trim()}</code>
                          </pre>
                        </div>
                      )}

                      {section.trick && (
                        <div className="mt-8 bg-amber-50 dark:bg-amber-900/10 border-l-4 border-amber-500 p-6 rounded-r-2xl">
                          <h4 className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-500 mb-2">
                            <span className="text-xl">💡</span> Pro Tip / Trick
                          </h4>
                          <div className="text-amber-900 dark:text-amber-200/80 leading-relaxed font-medium">
                            <MarkdownRenderer content={section.trick} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
