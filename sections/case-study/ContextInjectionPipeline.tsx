
import React from 'react';

export const ContextInjectionPipeline: React.FC = () => {
  return (
    <div className="mt-16 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
      <div className="flex items-center gap-4">
        <div className="w-8 h-px bg-amber-500" />
        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-t-fg-m">Context Injection Pipeline</h4>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="p-8 rounded-[32px] bg-t-bg-el border border-t-border space-y-6">
          <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Behind the Scenes: How Your Resume Becomes Chat Context</span>
          <div className="p-6 bg-black/5 dark:bg-black/40 rounded-2xl font-mono text-[9px] leading-relaxed text-amber-500 border border-white/5 overflow-x-auto">
            <pre>{`
  [RESUME DATA] ----> [JSON STRINGIFY]
         |                  |
         v                  v
  [PARSE RESPONSE] <--- [GEMINI API] <--- [SYSTEM PROMPT]
            `}</pre>
          </div>
          <p className="text-[9px] font-bold text-t-fg-m opacity-50 italic">Pipeline converts static resume structures into conversational context for the LLM to navigate.</p>
        </div>

        <div className="p-8 rounded-[32px] bg-t-bg-el border border-t-border space-y-6">
          <span className="text-[9px] font-black uppercase tracking-widest opacity-40">What Happens When AI Service is Overloaded?</span>
          <div className="flex flex-col gap-4">
            {[
              { id: 'Active', desc: 'Accepting requests', color: 'bg-emerald-500' },
              { id: 'Quota Hit', desc: '429 Error detected', color: 'bg-rose-500' },
              { id: 'Cooldown', desc: 'Exponential backoff (60-120s)', color: 'bg-amber-500' }
            ].map((state, i) => (
              <div key={state.id} className="flex items-center gap-4 group">
                <div className={`w-3 h-3 rounded-full ${state.color} shadow-sm group-hover:scale-125 transition-transform`} />
                <div className="flex-1 border-b border-t-border pb-2">
                  <p className="text-[10px] font-black uppercase text-t-fg">{state.id}</p>
                  <p className="text-[8px] font-bold text-t-fg-m opacity-50">{state.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-full p-8 rounded-[32px] bg-t-bg-el border border-t-border">
          <span className="text-[9px] font-black uppercase tracking-widest opacity-40 block mb-6">Comparison: Unsafe AI Responses vs Grounded (Safe) Responses</span>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <span className="text-[8px] font-black uppercase text-rose-500 flex items-center gap-2">Naive Implementation</span>
              <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/20 font-mono text-[10px] leading-relaxed opacity-60">
                "Answer questions about this user. Here is his info: [Data Block]"
              </div>
              <p className="text-[8px] font-bold text-t-fg-m opacity-50 italic">Risk: Factual hallucinations and security leaks of raw logic.</p>
            </div>
            <div className="space-y-4">
              <span className="text-[8px] font-black uppercase text-amber-500 flex items-center gap-2">Optimized RAG</span>
              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 font-mono text-[10px] leading-relaxed text-amber-600 dark:text-amber-400">
                "Act as Vamshi's Assistant. Using only the provided JSON context, provide 3-sentence professional summaries."
              </div>
              <p className="text-[8px] font-bold text-t-fg-m opacity-50 italic">Value: Grounded responses with zero-inventory error handling.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
