import React from 'react';
import Markdown from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  return (
    <div className={`markdown-container ${className}`}>
      <Markdown
        components={{
          h1: ({node, ...props}) => <h1 className="text-2xl font-black text-slate-905 dark:text-white mt-6 mb-3 tracking-tight" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-5 mb-2.5 tracking-tight" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-lg font-bold text-slate-905 dark:text-white mt-4 mb-2 tracking-tight" {...props} />,
          p: ({node, ...props}) => <p className="mb-4 last:mb-0 leading-relaxed font-normal" {...props} />,
          strong: ({node, ...props}) => <strong className="font-extrabold text-slate-900 dark:text-white" {...props} />,
          em: ({node, ...props}) => <em className="italic" {...props} />,
          ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4 space-y-1" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-4 space-y-1" {...props} />,
          li: ({node, ...props}) => <li className="pl-0.5 leading-relaxed" {...props} />,
          code: ({node, ...props}) => {
            // Check if it is inline code (does not span multiple lines)
            const isInline = !String(props.children).includes('\n');
            if (isInline) {
              return (
                <code className="bg-slate-100 dark:bg-slate-800 text-rose-600 dark:text-rose-400 font-mono text-[13px] px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-800 font-bold" {...props} />
              );
            }
            return (
              <code className="block bg-[#1d1f21] text-slate-200 font-mono text-[13px] p-4 rounded-xl border border-slate-800 overflow-x-auto my-4 whitespace-pre" {...props} />
            );
          },
          hr: () => <hr className="my-6 border-slate-200 dark:border-slate-800" />,
          blockquote: ({node, ...props}) => (
            <blockquote className="border-l-4 border-slate-300 dark:border-slate-700 pl-4 py-1 my-4 italic text-slate-600 dark:text-slate-400" {...props} />
          )
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}
