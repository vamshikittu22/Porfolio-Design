
import React from 'react';
import { motion } from 'framer-motion';

export const MobileDesignDecisions: React.FC = () => {
  return (
    <div className="mt-16 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
      <div className="flex items-center gap-4">
        <div className="w-8 h-px bg-amber-500" />
        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-t-fg-m">Mobile-First Decision Logic</h4>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* 1. Responsive Breakpoint Table */}
        <div className="p-8 rounded-[32px] bg-t-bg-el border border-t-border space-y-6">
          <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Layout Orchestration Tiers</span>
          <div className="overflow-hidden rounded-xl border border-t-border/50">
            <table className="w-full text-left bg-t-bg/50">
              <thead>
                <tr className="border-b border-t-border/50 bg-amber-500/5 text-[8px] font-black uppercase">
                  <th className="p-3 text-amber-600">Tier</th>
                  <th className="p-3">Width</th>
                  <th className="p-3">Core Adaptation</th>
                </tr>
              </thead>
              <tbody className="text-[10px]">
                <tr className="border-b border-t-border/10">
                  <td className="p-3 font-bold">Mobile</td>
                  <td className="p-3 opacity-60">320px+</td>
                  <td className="p-3 font-medium">Single column, Navigation at thumb-zone</td>
                </tr>
                <tr className="border-b border-t-border/10">
                  <td className="p-3 font-bold">Tablet</td>
                  <td className="p-3 opacity-60">768px+</td>
                  <td className="p-3 font-medium">Grid sharding, Expanded sidebar nav</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-amber-600">Desktop</td>
                  <td className="p-3 opacity-60">1024px+</td>
                  <td className="p-3 font-medium">3D Parallax, High-bitrate media</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[9px] font-bold text-t-fg-m opacity-50 italic">Utilizing Tailwind's mobile-first prefixing to ensure fluid growth from handheld to ultra-wide displays without layout shifts (CLS).</p>
        </div>

        {/* 2. Touch Target Optimization Diagram */}
        <div className="p-8 rounded-[32px] bg-t-bg-el border border-t-border space-y-6 flex flex-col items-center">
          <span className="text-[9px] font-black uppercase tracking-widest opacity-40 w-full">Touch Target (Human Factors)</span>
          <div className="flex-1 flex items-center justify-center gap-12 py-4">
            <div className="flex flex-col items-center gap-4">
               <div className="w-11 h-11 border-2 border-dashed border-rose-500/40 rounded-lg flex items-center justify-center relative">
                 <div className="w-6 h-6 bg-rose-500/20 rounded-md border border-rose-500" />
                 <span className="absolute -bottom-6 text-[7px] font-black text-rose-500 uppercase tracking-tighter">Poor (24px)</span>
               </div>
            </div>
            
            <div className="flex flex-col items-center gap-4">
               <div className="w-16 h-16 border-2 border-amber-500/60 rounded-xl flex items-center justify-center relative shadow-[0_0_20px_rgba(245,158,11,0.1)]">
                 <div className="w-11 h-11 bg-amber-500 rounded-lg shadow-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                 </div>
                 <span className="absolute -bottom-6 text-[7px] font-black text-amber-600 uppercase tracking-tighter">WCAG Ready (44px)</span>
               </div>
            </div>
          </div>
          <p className="text-[9px] font-bold text-t-fg-m opacity-50 text-center leading-relaxed italic">All interactive nodes strictly maintain a 44x44px minimum hit-box to accommodate thumb-driven navigation precision on mobile devices.</p>
        </div>

        {/* 3. Progressive Enhancement Strategy */}
        <div className="col-span-full p-8 rounded-[32px] bg-t-bg-el border border-t-border space-y-6">
          <span className="text-[9px] font-black uppercase tracking-widest opacity-40 block">Progressive Enhancement Architecture</span>
          <div className="p-6 bg-black/5 dark:bg-black/40 rounded-2xl font-mono text-[9px] leading-relaxed text-amber-500 border border-white/5 overflow-x-auto">
            <pre>{`
  [LAYER 01: CORE] ----> [LAYER 02: VISUAL] ----> [LAYER 03: INTERACTIVE]
         |                       |                         |
    Semantic HTML           CSS Flex/Grid             React Hydration
    (Universal)           (Viewport Adapt)           (Complex Logic)
            `}</pre>
          </div>
          <p className="text-[9px] font-bold text-t-fg-m opacity-50 text-center">The application remains functional even in low-bandwidth or legacy environments by layering complexity from the base HTML up.</p>
        </div>

        {/* 4. Mobile Performance Comparison */}
        <div className="col-span-full p-8 rounded-[32px] bg-t-bg-el border border-t-border">
          <div className="grid md:grid-cols-2 gap-8">
             <div className="space-y-4">
               <span className="text-[9px] font-black uppercase tracking-widest text-amber-600">Mobile (Fast 3G Profile)</span>
               <div className="space-y-3">
                 {[
                   { label: "Asset Sharding", val: "Eager only (120KB)" },
                   { label: "Image Policy", val: "800px WebP" },
                   { label: "TTI", val: "1.4s" }
                 ].map((m, i) => (
                   <div key={i} className="flex justify-between items-center py-2 border-b border-t-border/50 text-[10px]">
                     <span className="font-bold opacity-60 uppercase">{m.label}</span>
                     <span className="font-black text-amber-500">{m.val}</span>
                   </div>
                 ))}
               </div>
             </div>
             <div className="space-y-4">
               <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600">Desktop (Broadband)</span>
               <div className="space-y-3">
                 {[
                   { label: "Asset Sharding", val: "Full Hydration (420KB)" },
                   { label: "Image Policy", val: "2K/4K Dynamic" },
                   { label: "TTI", val: "0.6s" }
                 ].map((m, i) => (
                   <div key={i} className="flex justify-between items-center py-2 border-b border-t-border/50 text-[10px]">
                     <span className="font-bold opacity-60 uppercase">{m.label}</span>
                     <span className="font-black text-emerald-500">{m.val}</span>
                   </div>
                 ))}
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
