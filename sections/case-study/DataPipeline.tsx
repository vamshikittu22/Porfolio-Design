
import React from 'react';

export const DataPipeline: React.FC = () => {
  return (
    <div className="mt-16 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
      <div className="flex items-center gap-4">
        <div className="w-8 h-px bg-emerald-500" />
        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-t-fg-m">Data Pipeline Architecture</h4>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="p-8 rounded-[32px] bg-t-bg-el border border-t-border space-y-6">
          <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Request Sequence</span>
          <div className="p-6 bg-black/40 rounded-2xl font-mono text-[9px] text-emerald-500 border border-white/5 overflow-x-auto">
            <pre>{`[USER] ----> [CACHE] ----> [GRAPHQL API] ----> [RENDER]`}</pre>
          </div>
          <p className="text-[9px] font-bold text-t-fg-m opacity-50 italic">Prioritizes local hydration to ensure instantaneous feel.</p>
        </div>

        <div className="p-8 rounded-[32px] bg-t-bg-el border border-t-border space-y-6">
          <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Efficiency Delta</span>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/10 font-mono text-[10px]">REST: 3 Req</div>
            <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 font-mono text-[10px]">GQL: 1 Req</div>
          </div>
          <div className="w-full bg-t-fg/5 h-1.5 rounded-full overflow-hidden flex">
            <div className="h-full bg-emerald-500 w-[30%]" />
            <div className="h-full bg-rose-500/20 w-[70%]" />
          </div>
          <span className="text-[8px] font-black uppercase opacity-40 mt-2 block">Network Optimization: +70%</span>
        </div>
      </div>
    </div>
  );
};
