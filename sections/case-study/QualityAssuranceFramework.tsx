
import React from 'react';

export const QualityAssuranceFramework: React.FC = () => {
  return (
    <div className="mt-16 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
      <div className="flex items-center gap-4">
        <div className="w-8 h-px bg-emerald-500" />
        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-t-fg-m">Quality Assurance Framework</h4>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="p-8 rounded-[32px] bg-t-bg-el border border-t-border space-y-8 flex flex-col items-center">
          <span className="text-[9px] font-black uppercase tracking-widest opacity-40 w-full">Test Coverage Pyramid</span>
          <div className="flex flex-col items-center gap-1 w-full max-w-[280px]">
            <div className="w-1/3 h-12 bg-emerald-500 rounded-t-lg flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <span className="text-[8px] font-black text-white uppercase">E2E</span>
            </div>
            <div className="w-2/3 h-12 bg-emerald-500/60 flex items-center justify-center">
              <span className="text-[8px] font-black text-white uppercase">Integration</span>
            </div>
            <div className="w-full h-12 bg-emerald-500/30 rounded-b-lg flex items-center justify-center border border-emerald-500/20">
              <span className="text-[8px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Unit Tests (Base)</span>
            </div>
          </div>
          <p className="text-[9px] font-bold text-t-fg-m opacity-50 italic text-center">A strong base of Vitest unit tests ensures core logic stability before integration layers are validated.</p>
        </div>

        <div className="p-8 rounded-[32px] bg-t-bg-el border border-t-border space-y-6">
          <span className="text-[9px] font-black uppercase tracking-widest opacity-40">From Code Commit to Live Production</span>
          <div className="p-6 bg-black/5 dark:bg-black/40 rounded-2xl font-mono text-[9px] leading-relaxed text-emerald-500 border border-white/5 overflow-x-auto">
            <pre>{`
  [COMMIT] ----> [BUILD] ----> [TEST] ----> [DEPLOY]
     |            |            |             |
   Push         Vite         Vitest        Vercel
   Main        Bundle        Run          Production
            `}</pre>
          </div>
          <div className="flex justify-between items-center px-2">
            <div className="flex flex-col gap-1">
              <span className="text-[7px] font-black text-t-fg-m uppercase opacity-40">Frequency</span>
              <span className="text-[10px] font-bold text-t-fg uppercase">On Push</span>
            </div>
            <div className="flex flex-col gap-1 text-right">
              <span className="text-[7px] font-black text-t-fg-m uppercase opacity-40">Target</span>
              <span className="text-[10px] font-bold text-t-fg uppercase">Main Branch</span>
            </div>
          </div>
        </div>

        <div className="col-span-full overflow-hidden rounded-[32px] border border-t-border">
          <table className="w-full text-left bg-t-bg-el">
            <thead>
              <tr className="bg-emerald-500/5 border-b border-t-border">
                <th className="p-6 text-[9px] font-black uppercase tracking-widest text-emerald-500">Component Integration Verification</th>
                <th className="p-6 text-[9px] font-black uppercase tracking-widest text-t-fg-m">Test Type</th>
                <th className="p-6 text-[9px] font-black uppercase tracking-widest text-emerald-500">Coverage %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-t-border/50 text-[10px]">
              {[
                { c: "GeminiService", t: "Unit (Logic Isolation)", v: "98%" },
                { c: "ChatAssistant", t: "Integration (UI + API)", v: "85%" },
                { c: "ProjectCards", t: "Snapshot (UI Consistency)", v: "92%" }
              ].map((row, i) => (
                <tr key={i} className="group hover:bg-emerald-500/[0.02] transition-colors">
                  <td className="p-6 font-black uppercase tracking-tight">{row.c}</td>
                  <td className="p-6 opacity-60 italic">{row.t}</td>
                  <td className="p-6 font-black text-emerald-500">{row.v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-span-full p-8 rounded-[32px] bg-t-bg-el border border-t-border space-y-6">
          <span className="text-[9px] font-black uppercase tracking-widest opacity-40 block">WCAG Standards Audit (Accessibility Checklist)</span>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Semantic HTML", desc: "Native button and header tags used exclusively" },
              { label: "ARIA Patterns", desc: "Implemented aria-pressed and labels for active states" },
              { label: "Keyboard Nav", desc: "Custom focus-visible rings for all interactive nodes" },
              { label: "Color Contrast", desc: "Verified 4.5:1 ratio for all primary body text" }
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-2xl bg-emerald-500/[0.03] border border-emerald-500/10 group hover:border-emerald-500/30 transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-4 h-4 rounded-md bg-emerald-500 flex items-center justify-center text-white">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="text-[10px] font-black uppercase text-t-fg tracking-tight">{item.label}</span>
                </div>
                <p className="text-[9px] font-medium text-t-fg-m opacity-60 leading-relaxed italic">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
