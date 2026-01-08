
import React from 'react';
import { motion } from 'framer-motion';

export const MobileDesignDecisions: React.FC = () => {
  return (
    <div className="mt-16 space-y-20 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
      <div className="flex items-center gap-4">
        <div className="w-8 h-px bg-amber-500" />
        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-t-fg-m">Mobile-First Decision Logic</h4>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* 1. Responsive Breakpoint Viewport Diagram */}
        <div className="p-8 rounded-[40px] bg-t-bg-el border border-t-border space-y-8 flex flex-col items-center">
          <div className="w-full">
            <span className="text-[9px] font-black uppercase tracking-widest opacity-40 block mb-2">Adaptive Breakpoint Spec</span>
            <div className="h-px w-full bg-t-border/50" />
          </div>

          <div className="relative w-full aspect-video bg-black/5 dark:bg-black/40 rounded-2xl flex items-center justify-center gap-4 overflow-hidden border border-white/5 shadow-inner">
             {/* Mobile Viewport Representatitve */}
             <div className="flex flex-col items-center gap-2">
               <div className="w-12 h-20 rounded-lg border-2 border-amber-500/40 bg-t-bg-el flex flex-col p-1.5 gap-1 shadow-xl">
                 <div className="h-1 w-full bg-t-accent/20 rounded-full" />
                 <div className="flex-1 bg-t-fg/5 rounded" />
               </div>
               <span className="text-[7px] font-black uppercase opacity-40 tracking-tighter">320px+</span>
             </div>

             {/* Tablet Viewport Representative */}
             <div className="flex flex-col items-center gap-2">
               <div className="w-20 h-16 rounded-xl border-2 border-amber-500/60 bg-t-bg-el flex p-2 gap-2 shadow-2xl">
                 <div className="w-4 h-full bg-t-accent/10 rounded" />
                 <div className="flex-1 bg-t-fg/5 rounded" />
               </div>
               <span className="text-[7px] font-black uppercase opacity-40 tracking-tighter">768px+</span>
             </div>

             {/* Desktop Viewport Representative */}
             <div className="flex flex-col items-center gap-2">
               <div className="w-32 h-16 rounded-lg border-2 border-amber-500 bg-t-bg-el flex flex-col p-1.5 gap-1 shadow-2xl relative">
                  <div className="flex gap-1">
                    <div className="w-6 h-1.5 bg-t-accent/30 rounded" />
                    <div className="w-6 h-1.5 bg-t-accent/10 rounded" />
                  </div>
                  <div className="flex-1 flex gap-2">
                    <div className="flex-1 bg-t-fg/5 rounded" />
                    <div className="w-8 h-full bg-t-fg/5 rounded" />
                  </div>
                  {/* Aspect Ratio Label */}
                  <div className="absolute -top-3 -right-3 bg-amber-500 text-white text-[6px] font-black px-1.5 py-0.5 rounded shadow-lg">1024+</div>
               </div>
               <span className="text-[7px] font-black uppercase opacity-40 tracking-tighter">Desktop Grid</span>
             </div>
          </div>

          <div className="w-full overflow-hidden rounded-xl border border-t-border/50">
            <table className="w-full text-left bg-t-bg/50">
              <thead>
                <tr className="border-b border-t-border/50 bg-amber-500/5 text-[8px] font-black uppercase">
                  <th className="p-3 text-amber-600">Tier</th>
                  <th className="p-3">Width</th>
                  <th className="p-3">Core Strategy</th>
                </tr>
              </thead>
              <tbody className="text-[10px]">
                <tr className="border-b border-t-border/10">
                  <td className="p-3 font-bold">Mobile</td>
                  <td className="p-3 opacity-60">320px</td>
                  <td className="p-3 font-medium">Single column, Stacked UI</td>
                </tr>
                <tr className="border-b border-t-border/10">
                  <td className="p-3 font-bold">Tablet</td>
                  <td className="p-3 opacity-60">768px</td>
                  <td className="p-3 font-medium">2-Column, Hybrid Nav</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-amber-600">Desktop</td>
                  <td className="p-3 opacity-60">1024px+</td>
                  <td className="p-3 font-medium">Full Grid, 3D Transforms</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. Touch Target Optimization Diagram */}
        <div className="p-8 rounded-[40px] bg-t-bg-el border border-t-border space-y-8 flex flex-col items-center relative overflow-hidden">
          <div className="w-full">
            <span className="text-[9px] font-black uppercase tracking-widest opacity-40 block mb-2">Ergonomic Precision (Human Factors)</span>
            <div className="h-px w-full bg-t-border/50" />
          </div>

          <div className="relative flex-1 flex items-center justify-center gap-16 py-8">
            {/* Visual Heatmap / Thumb Zone Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.1)_0%,transparent_60%)] pointer-events-none" />
            
            <div className="flex flex-col items-center gap-4">
               <div className="w-12 h-12 border-2 border-dashed border-rose-500/40 rounded-lg flex items-center justify-center relative bg-rose-500/5">
                 <div className="w-6 h-6 bg-rose-500/20 rounded-md border border-rose-500" />
                 <span className="absolute -bottom-8 text-[7px] font-black text-rose-500 uppercase tracking-tighter text-center leading-tight">Sub-optimal<br/>(24px)</span>
               </div>
            </div>
            
            <div className="flex flex-col items-center gap-4">
               <div className="w-20 h-20 border-2 border-amber-500/60 rounded-3xl flex items-center justify-center relative shadow-[0_0_30px_rgba(245,158,11,0.15)] bg-amber-500/5">
                 <div className="w-11 h-11 bg-amber-500 rounded-xl shadow-xl flex items-center justify-center transition-transform hover:scale-95 cursor-pointer group/tap">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover/tap:opacity-100 transition-opacity" />
                 </div>
                 <span className="absolute -bottom-8 text-[7px] font-black text-amber-600 uppercase tracking-tighter text-center leading-tight">WCAG Ready<br/>(44px)</span>
                 {/* Visual Dimension Label */}
                 <div className="absolute -right-12 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-40">
                    <div className="h-px w-6 bg-t-fg" />
                    <span className="text-[8px] font-mono whitespace-nowrap">44dp</span>
                 </div>
               </div>
            </div>
          </div>

          <p className="text-[10px] font-bold text-t-fg-m opacity-60 text-center leading-relaxed italic max-w-sm">
            All primary interactive nodes adhere to the 44x44px ergonomic standard to ensure zero mis-taps in thumb-driven mobile contexts.
          </p>
        </div>

        {/* 3. Progressive Enhancement Layered Strategy */}
        <div className="col-span-full p-10 rounded-[48px] bg-t-bg-el border border-t-border space-y-10">
          <div className="w-full">
            <span className="text-[9px] font-black uppercase tracking-widest opacity-40 block mb-2">Progressive Enhancement Hierarchy</span>
            <div className="h-px w-full bg-t-border/50" />
          </div>

          <div className="flex flex-col items-center space-y-2">
            {[
              { label: "GEN-AI (ENHANCED)", color: "bg-amber-500", w: "w-full", desc: "Generative visuals, Neural Chat, Kinetic Backgrounds", opacity: "opacity-100" },
              { label: "JS HYDRATION (KINETIC)", color: "bg-amber-500/80", w: "w-[90%]", desc: "Minimax AI, Framer Motion, GraphQL Fetching", opacity: "opacity-90" },
              { label: "CSS LAYOUT (VISUAL)", color: "bg-amber-500/60", w: "w-[80%]", desc: "Responsive Grids, Flexbox, Fluid Typography", opacity: "opacity-75" },
              { label: "SEMANTIC HTML (CORE)", color: "bg-amber-500/40", w: "w-[70%]", desc: "Functional without JS, Screen-reader optimized", opacity: "opacity-50" }
            ].map((layer, i) => (
              <div key={i} className={`flex flex-col items-center ${layer.w} group cursor-default`}>
                <div className={`h-12 w-full ${layer.color} rounded-xl flex items-center justify-between px-6 transition-all group-hover:scale-[1.01] group-hover:brightness-110 shadow-lg`}>
                  <span className="text-[9px] font-black text-white uppercase tracking-widest">{layer.label}</span>
                  <span className="text-[8px] font-bold text-white/80 uppercase tracking-tight hidden md:block">{layer.desc}</span>
                </div>
                {i < 3 && <div className="h-2 w-0.5 bg-amber-500/20" />}
              </div>
            ))}
          </div>
          
          <p className="text-[9px] font-bold text-t-fg-m opacity-50 text-center leading-relaxed">
            The application stack is designed for resilience: users on 2G connections or legacy browsers still receive the core textual payload before visual enhancements hydrate.
          </p>
        </div>

        {/* 4. Mobile Performance Matrix Comparison */}
        <div className="col-span-full p-10 rounded-[48px] bg-t-bg-el border border-t-border relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] select-none pointer-events-none">
            <span className="text-8xl font-black uppercase tracking-tighter">METRICS</span>
          </div>

          <div className="grid md:grid-cols-2 gap-12 relative z-10">
             <div className="space-y-6">
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white shadow-lg">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zM7 4h10v14H7V4z"/></svg>
                 </div>
                 <span className="text-[11px] font-black uppercase tracking-widest text-amber-600">Mobile Profile (Fast 3G)</span>
               </div>
               
               <div className="space-y-4">
                 {[
                   { label: "Hydration Cost", val: "120KB (Eager)", color: "text-amber-500" },
                   { label: "Image Policy", val: "800px / WebP", color: "text-amber-500" },
                   { label: "Interaction Latency", val: "< 100ms", color: "text-amber-500" },
                   { label: "Lighthouse Performance", val: "98/100", color: "text-emerald-500" }
                 ].map((m, i) => (
                   <div key={i} className="flex justify-between items-center py-3 border-b border-t-border/50 text-[10px]">
                     <span className="font-bold opacity-60 uppercase tracking-tight">{m.label}</span>
                     <span className={`font-black uppercase ${m.color}`}>{m.val}</span>
                   </div>
                 ))}
               </div>
             </div>

             <div className="space-y-6">
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white shadow-lg">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/></svg>
                 </div>
                 <span className="text-[11px] font-black uppercase tracking-widest text-emerald-600">Desktop Profile (Broadband)</span>
               </div>
               
               <div className="space-y-4">
                 {[
                   { label: "Hydration Cost", val: "420KB (Full)", color: "text-emerald-500" },
                   { label: "Image Policy", val: "Dynamic / 4K", color: "text-emerald-500" },
                   { label: "Interaction Latency", val: "< 16ms", color: "text-emerald-500" },
                   { label: "Lighthouse Performance", val: "100/100", color: "text-emerald-500" }
                 ].map((m, i) => (
                   <div key={i} className="flex justify-between items-center py-3 border-b border-t-border/50 text-[10px]">
                     <span className="font-bold opacity-60 uppercase tracking-tight">{m.label}</span>
                     <span className={`font-black uppercase ${m.color}`}>{m.val}</span>
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
