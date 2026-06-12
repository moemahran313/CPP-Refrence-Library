import React from 'react';
import Markdown from 'react-markdown';
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

interface MathRegistry {
  blocks: string[];
  inlines: string[];
}

const blockRegex = /\$\$\s*([\s\S]+?)\s*\$\$/g;
const inlineRegex = /\$([^\$\n]+?)\$/g;

function preprocessMath(content: string, registry: MathRegistry): string {
  if (!content) return "";
  
  // 1. Extract block math
  let processed = content.replace(blockRegex, (match, formula) => {
    const placeholder = `MATHBLOCKID-${registry.blocks.length}-END`;
    registry.blocks.push(formula);
    return placeholder;
  });

  // 2. Extract inline math
  processed = processed.replace(inlineRegex, (match, formula) => {
    const placeholder = `MATHINLINEID-${registry.inlines.length}-END`;
    registry.inlines.push(formula);
    return placeholder;
  });

  return processed;
}

function restoreMath(text: string, registry: MathRegistry): React.ReactNode {
  if (!text) return text;

  // Match the placeholders split
  const tokenRegex = /(MATHBLOCKID-\d+-END|MATHINLINEID-\d+-END)/g;
  const parts = text.split(tokenRegex);

  if (parts.length === 1 && parts[0] === text) {
    return text;
  }

  return (
    <>
      {parts.map((part, idx) => {
        if (part.startsWith('MATHBLOCKID-')) {
          const match = part.match(/MATHBLOCKID-(\d+)-END/);
          if (match) {
            const index = parseInt(match[1], 10);
            const formula = registry.blocks[index];
            return (
              <span key={`block-${index}-${idx}`} className="block my-3 overflow-x-auto py-1.5 focus:outline-none select-text">
                <Latex>{`$$${formula}$$`}</Latex>
              </span>
            );
          }
        } else if (part.startsWith('MATHINLINEID-')) {
          const match = part.match(/MATHINLINEID-(\d+)-END/);
          if (match) {
            const index = parseInt(match[1], 10);
            const formula = registry.inlines[index];
            return (
              <span key={`inline-${index}-${idx}`} className="inline-block font-sans select-text">
                <Latex>{`$${formula}$`}</Latex>
              </span>
            );
          }
        }
        return part;
      })}
    </>
  );
}

function renderMathInChildren(children: React.ReactNode, registry: MathRegistry): React.ReactNode {
  if (!children) return children;
  return React.Children.map(children, child => {
    if (typeof child === 'string') {
      return restoreMath(child, registry);
    }
    if (React.isValidElement(child)) {
      const childElement = child as React.ReactElement<any>;
      if (childElement.props && childElement.props.children) {
        return React.cloneElement(childElement, {
          children: renderMathInChildren(childElement.props.children, registry)
        });
      }
    }
    return child;
  });
}

export default function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  const registryRef = React.useRef<MathRegistry>({ blocks: [], inlines: [] });
  // Dynamic initialization per render pass
  registryRef.current = { blocks: [], inlines: [] };

  const processedContent = preprocessMath(content, registryRef.current);

  return (
    <div className={`markdown-container ${className}`}>
      <Markdown
        components={{
          h1: ({node, ...props}) => <h1 className="text-2xl font-black text-slate-905 dark:text-white mt-6 mb-3 tracking-tight" {...props}>{renderMathInChildren(props.children, registryRef.current)}</h1>,
          h2: ({node, ...props}) => <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-5 mb-2.5 tracking-tight" {...props}>{renderMathInChildren(props.children, registryRef.current)}</h2>,
          h3: ({node, ...props}) => <h3 className="text-lg font-bold text-slate-905 dark:text-white mt-4 mb-2 tracking-tight" {...props}>{renderMathInChildren(props.children, registryRef.current)}</h3>,
          p: ({node, ...props}) => <p className="mb-4 last:mb-0 leading-relaxed font-normal text-slate-800 dark:text-slate-300" {...props}>{renderMathInChildren(props.children, registryRef.current)}</p>,
          strong: ({node, ...props}) => <strong className="font-extrabold text-slate-900 dark:text-white" {...props}>{renderMathInChildren(props.children, registryRef.current)}</strong>,
          em: ({node, ...props}) => <em className="italic" {...props}>{renderMathInChildren(props.children, registryRef.current)}</em>,
          ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4 space-y-1" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-4 space-y-1" {...props} />,
          li: ({node, ...props}) => <li className="pl-0.5 leading-relaxed text-slate-800 dark:text-slate-300" {...props}>{renderMathInChildren(props.children, registryRef.current)}</li>,
          code: ({node, ...props}) => {
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
        {processedContent}
      </Markdown>
    </div>
  );
}
