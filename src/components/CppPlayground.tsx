import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/themes/prism-tomorrow.css';
import { Play, RotateCcw, TerminalSquare } from 'lucide-react';

const DEFAULT_CODE = `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    
    // Write your code here
    
    return 0;
}`;

export default function CppPlayground() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const runCode = () => {
    setIsRunning(true);
    setOutput(null);

    // Simulate compilation and execution
    setTimeout(() => {
      let simulatedOutput = '';
      
      // Extremely basic regex-based output simulation just for the demo
      try {
        const coutMatches = code.match(/cout\s*<<\s*([^;]+);/g);
        if (coutMatches) {
          coutMatches.forEach(match => {
            let inner = match.replace(/cout\s*<<\s*|;/g, '').trim();
            // Handle simple strings
            if (inner.startsWith('"') && inner.includes('endl')) {
              inner = inner.split('<<')[0].trim().replace(/^"|"$/g, '') + '\\n';
            } else {
              inner = inner.replace(/^"|"$/g, '').replace(/<<\s*endl\s*$/, '\\n');
            }
            simulatedOutput += inner;
          });
        }
        
        if (!simulatedOutput) {
          simulatedOutput = 'Program exited with code 0 (No output produced).';
        }
      } catch (e) {
        simulatedOutput = 'Compilation Error or Syntax Error.';
      }

      setOutput(simulatedOutput);
      setIsRunning(false);
    }, 1500);
  };

  const resetCode = () => {
    setCode(DEFAULT_CODE);
    setOutput(null);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <TerminalSquare size={16} className="text-blue-400" />
            C++ Editor
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={resetCode}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            title="Reset Code"
          >
            <RotateCcw size={16} />
          </button>
          <button 
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg text-sm font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRunning ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" />
            ) : (
              <Play size={14} className="fill-current" />
            )}
            {isRunning ? 'Compiling...' : 'Run'}
          </button>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-[500px]">
        {/* Editor Area */}
        <div className="flex-1 overflow-y-auto bg-[#1d1f21] border-r border-slate-800">
          <Editor
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => Prism.highlight(code, Prism.languages.cpp, 'cpp')}
            padding={24}
            style={{
              fontFamily: '"JetBrains Mono", "Fira Code", monospace',
              fontSize: 14,
              backgroundColor: 'transparent',
              minHeight: '100%',
              color: '#c5c8c6'
            }}
            textareaClassName="focus:outline-none"
          />
        </div>

        {/* Output Console */}
        <div className="w-full md:w-80 shrink-0 bg-slate-950 flex flex-col">
          <div className="px-4 py-2 border-b border-slate-800/80 text-xs font-bold uppercase tracking-widest text-slate-500 bg-slate-900/50">
            Console Output
          </div>
          <div className="flex-1 p-4 overflow-y-auto font-mono text-sm text-slate-300">
            {isRunning ? (
              <div className="text-slate-500 animate-pulse">Building and running executable...</div>
            ) : output !== null ? (
              <div className="whitespace-pre-wrap">{output}</div>
            ) : (
              <div className="text-slate-600 italic">Click "Run" to see output here.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
