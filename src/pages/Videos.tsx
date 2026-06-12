import React, { useState } from 'react';
import { VIDEO_CATEGORIES, VideoCategory, VideoContent } from '../data/videos';
import { PlayCircle, Video, GraduationCap, FileVideo, BookOpen } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'motion/react';

export default function Videos() {
  const [activeCategory, setActiveCategory] = useState<VideoCategory>(VIDEO_CATEGORIES[0]);
  const [activeVideo, setActiveVideo] = useState<VideoContent>(VIDEO_CATEGORIES[0].videos[0]);

  return (
    <div className="max-w-[1600px] mx-auto h-full flex flex-col items-stretch lg:flex-row min-h-[calc(100vh-6rem)]">
      {/* Sidebar: Categories and Video List */}
      <div className="w-full lg:w-96 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 overflow-y-auto shrink-0 flex flex-col p-4 relative z-10 hidden lg:flex">
        
        <div className="mb-6 px-2">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-2">
            <GraduationCap size={20} />
            <span className="font-bold uppercase tracking-widest text-xs">Instructors</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Video Lectures</h2>
        </div>

        {/* Instructor Tabs */}
        <div className="flex flex-col gap-2 mb-8">
          {VIDEO_CATEGORIES.map(cat => (
             <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat);
                  setActiveVideo(cat.videos[0]);
                }}
                className={clsx(
                  "text-left p-4 rounded-2xl transition-all duration-300 border-2",
                  activeCategory.id === cat.id 
                    ? cat.color === 'emerald' ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500" : "bg-blue-50 dark:bg-blue-950/30 border-blue-500"
                    : "bg-white dark:bg-slate-900 border-transparent hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                )}
             >
                <div className="font-bold text-slate-900 dark:text-amber-50 mb-1">{cat.instructor}</div>
                <div className="text-sm font-medium opacity-80">{cat.title}</div>
             </button>
          ))}
        </div>

        {/* Video Playlist */}
        <div className="px-2 mb-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
           Playlist
        </div>
        <div className="flex-1 overflow-y-auto pr-2 space-y-2">
          <AnimatePresence mode="popLayout">
            {activeCategory.videos.map((vid, idx) => {
              const isActive = activeVideo.id === vid.id;
              return (
                <motion.button
                  layout
                  key={vid.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setActiveVideo(vid)}
                  className={clsx(
                    "w-full text-left p-3 rounded-xl flex items-center gap-3 transition-colors",
                    isActive ? "bg-slate-900 dark:bg-slate-800 text-white" : "hover:bg-slate-100 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-300"
                  )}
                >
                  <div className={clsx(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                    isActive ? "bg-white/20 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-400"
                  )}>
                    {isActive ? <PlayCircle size={16} className="fill-current" /> : <Video size={16} />}
                  </div>
                  <div className="flex-1 truncate font-medium text-sm">
                    {vid.title}
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Content Viewer Area */}
      <div className="flex-1 bg-slate-50 dark:bg-slate-950 overflow-y-auto p-4 md:p-8 flex flex-col">
        {/* Mobile controls */}
        <div className="lg:hidden flex flex-col gap-4 mb-6">
           <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Video Lectures</h2>
           <select 
             className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-bold p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
             value={activeCategory.id}
             onChange={e => {
               const cat = VIDEO_CATEGORIES.find(c => c.id === e.target.value);
               if (cat) {
                 setActiveCategory(cat);
                 setActiveVideo(cat.videos[0]);
               }
             }}
           >
             {VIDEO_CATEGORIES.map(cat => (
               <option key={cat.id} value={cat.id}>{cat.instructor} - {cat.title}</option>
             ))}
           </select>

           <select
             className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
             value={activeVideo.id}
             onChange={e => {
               const vid = activeCategory.videos.find(v => v.id === e.target.value);
               if (vid) setActiveVideo(vid);
             }}
           >
              {activeCategory.videos.map(vid => (
                <option key={vid.id} value={vid.id}>{vid.title}</option>
              ))}
           </select>
        </div>

        <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col">
           <AnimatePresence mode="wait">
             <motion.div
                key={activeCategory.id + activeVideo.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col"
             >
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-200/50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
                    {activeCategory.instructor} • {activeCategory.title}
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">{activeVideo.title}</h1>
                  <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                     {activeVideo.source === 'youtube' 
                       ? "Official university YouTube playlist. Expand to fullscreen for the best experience."
                       : "Comprehensive supplementary material from Google Drive. Ensure you are signed in for access if prompted."}
                  </p>
                </div>

                <div className="flex-1 bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 overflow-hidden relative min-h-[400px]">
                  <iframe 
                    src={activeVideo.url} 
                    className="absolute inset-0 w-full h-full border-0"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
             </motion.div>
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
