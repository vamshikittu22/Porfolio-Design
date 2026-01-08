
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Global Prism access from index.html
declare var Prism: any;

interface CodePlaygroundProps {
  code: string;
  lang: string;
  filename?: string;
  highlightLines?: number[];
  sandboxUrl?: string;
  accent: string;
}

export const CodePlayground: React.FC<CodePlaygroundProps> = ({ 
  code, 
  lang, 
  filename = 'Source', 
  highlightLines = [], 
  sandboxUrl,
  accent 
}) => {
  const [copied, setCopied] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current && typeof Prism !== 'undefined') {
      Prism.highlightElement(codeRef.current);
      setIsHighlighted(true);
    }
  }, [code, lang]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const lines = code.split('\n');

  return (
    <div className="relative rounded-3xl border border-white/10 bg-[#0d1117] overflow-hidden shadow-2xl group/code">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white/5 border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
          </div>
          <div className="h-4 w-px bg-white/10 mx-2" />
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{lang}</span>
            <span className="text-[10px] font-bold text-white/60 font-mono tracking-tight">{filename}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {sandboxUrl && (
            <button 
              onClick={() => window.open(sandboxUrl, '_blank')}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[9px] font-black uppercase tracking-widest text-white/60 transition-colors flex items-center gap-2"
            >
              <span>Try It</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </button>
          )}
          <button 
            onClick={handleCopy}
            className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2
              ${copied ? 'bg-emerald-500 text-white' : 'bg-white/5 hover:bg-white/10 text-white/60'}
            `}
          >
            {copied ? 'Copied!' : 'Copy Code'}
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
          </button>
        </div>
      </div>

      {/* Code Area */}
      <div className="relative font-mono text-[11px] lg:text-xs leading-6 overflow-x-auto">
        <div className="flex min-w-full">
          {/* Line Numbers */}
          <div className="sticky left-0 py-6 px-4 text-white/20 text-right select-none bg-[#0d1117] border-r border-white/5 min-w-[50px] z-10">
            {lines.map((_, i) => (
              <div key={i} className="h-6 flex items-center justify-end">{i + 1}</div>
            ))}
          </div>
          
          {/* Syntax Content */}
          <div className="relative flex-1 py-6">
            {/* Diff/Highlight Layer */}
            <div className="absolute inset-y-6 inset-x-0 pointer-events-none">
              {lines.map((line, i) => {
                const lineNum = i + 1;
                const isHighlighted = highlightLines.includes(lineNum);
                const isAddition = line.startsWith('+');
                const isDeletion = line.startsWith('-');
                
                return (
                  <div 
                    key={i} 
                    className={`h-6 w-full ${isHighlighted ? 'bg-white/[0.04]' : ''} ${isAddition ? 'bg-emerald-500/10' : ''} ${isDeletion ? 'bg-rose-500/10' : ''}`}
                  >
                    {(isHighlighted || isAddition || isDeletion) && (
                      <div 
                        className="h-full w-1" 
                        style={{ backgroundColor: isAddition ? '#10b981' : isDeletion ? '#f43f5e' : accent }} 
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Prism Layer */}
            <pre className={`language-${lang} px-6`}>
              <code ref={codeRef} className={`language-${lang} block`}>
                {code}
              </code>
            </pre>
          </div>
        </div>
      </div>

      {/* Success Toast Overlay */}
      <AnimatePresence>
        {copied && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest shadow-2xl z-50 pointer-events-none"
          >
            Module Copied to Clipboard
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
