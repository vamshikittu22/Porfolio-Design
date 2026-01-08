
import React from 'react';

export const ContextInjection: React.FC = () => {
  return (
    <div className="mt-16 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
      <div className="flex items-center gap-4">
        <div className="w-8 h-px bg-amber-500" />
        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-t-fg-m">Context Injection Pipeline</h4>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="p-8 rounded-[32px] bg-t-bg-el border border-t-border space-y-6">
          <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Knowledge Flow</span>
          <div className="p-6 bg-black/40 rounded-2xl font-mono text-[9px] text-amber-500 border border-white/5">
            <pre>{`[DATA] -> [JSON] -> [PROMPT] -> [GEMINI] -> [UI]`}</pre>
          </div>
        </div>

        <div className="p-8 rounded-[32px] bg-t-bg-el border border-t-border space-y-6">
          <span className="text-[9px] font-black uppercase tracking-widest opacity-40">RAG Strategy</span>
          <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 font-mono text-[10px] text-amber-400 leading-relaxed">
            "Act as Vamshi's Assistant. Using the provided context, summarize roles..."
          </div>
          <p className="text-[8px] font-bold opacity-50 italic">Prevents hallucination by strict context grounding.</p>
        </div>
      </div>
    </div>
  );
};
