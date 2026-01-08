import React from 'react';
import { motion } from 'framer-motion';

export const PerformanceMetricsDashboard: React.FC = () => {
  const metrics = [
    { label: 'FCP', before: 0.8, after: 0.3, unit: 's' },
    { label: 'LCP', before: 1.2, after: 0.4, unit: 's' },
    { label: 'TTI', before: 2.1, after: 0.8, unit: 's' },
  ];

  const lighthouseData = [
    { label: 'Performance', score: 98 },
    { label: 'Accessibility', score: 100 },
    { label: 'Best Practices', score: 100 },
    { label: 'SEO', score: 100 },
  ];

  const getStatus = (score: number) => {
    if (score >= 90) return { label: 'Optimal', color: 'bg-emerald-500', text: 'text-emerald-500' };
    if (score >= 70) return { label: 'Needs Improvement', color: 'bg-amber-500', text: 'text-amber-500' };
    return { label: 'Poor', color: 'bg-rose-500', text: 'text-rose-500' };
  };

  return (
    <div className="mt-16 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
      <div className="flex items-center gap-4">
        <div className="w-8 h-px bg-t-accent" />
        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-t-fg-m">Performance Analytics</h4>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* 1. Comparison Metrics */}
        <div className="p-8 rounded-[32px] bg-t-bg-el border border-t-border space-y-8 shadow-sm">
          <div className="flex justify-between items-end">
            <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Optimization Results: Before & After</span>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-t-fg/10" />
                <span className="text-[8px] font-bold uppercase opacity-40">Initial</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-t-accent" />
                <span className="text-[8px] font-bold uppercase text-t-accent">Post-Vite</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            {metrics.map((m) => (
              <div key={m.label} className="space-y-2">
                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-t-fg">
                  <span>{m.label}</span>
                  <span>{m.after}{m.unit} <span className="opacity-30 line-through ml-2 font-medium">{m.before}{m.unit}</span></span>
                </div>
                <div className="h-1.5 w-full bg-t-fg/5 rounded-full overflow-hidden relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(m.before / 2.5) * 100}%` }}
                    className="absolute inset-0 bg-t-fg/10 rounded-full"
                  />
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(m.after / 2.5) * 100}%` }}
                    className="absolute inset-0 bg-t-accent rounded-full shadow-[0_0_10px_rgba(var(--color-accent-rgb),0.5)]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Lighthouse Score Cards */}
        <div className="grid grid-cols-2 gap-4">
           {lighthouseData.map((data) => {
             const status = getStatus(data.score);
             return (
               <div key={data.label} className="p-6 rounded-[32px] bg-t-bg-el border border-t-border flex flex-col items-center justify-between text-center group hover:border-t-accent transition-all duration-500 shadow-sm relative overflow-hidden">
                 {/* Fix: Combined duplicate className attributes into a single template literal */}
                 <div className={`absolute top-0 left-0 w-full h-1 opacity-20 ${status.color}`} />
                 
                 <div className="space-y-1">
                   <div className="text-[7px] font-black uppercase tracking-widest text-t-fg-m opacity-50 group-hover:opacity-100 transition-opacity">{data.label}</div>
                   <div className={`text-4xl font-black tracking-tighter ${status.text}`}>{data.score}</div>
                 </div>

                 <div className="mt-4 flex flex-col items-center gap-2">
                   <div className={`px-2 py-0.5 rounded-full text-[6px] font-black uppercase tracking-widest text-white shadow-sm ${status.color}`}>
                     {status.label}
                   </div>
                   <svg className="w-16 h-4 opacity-10" viewBox="0 0 100 20" fill="none" stroke="currentColor">
                      <motion.path 
                        d="M0 10 Q25 0 50 10 T100 10" 
                        strokeWidth="2" 
                        initial={{ pathLength: 0 }} 
                        whileInView={{ pathLength: 1 }} 
                        transition={{ duration: 2 }}
                        className={status.text}
                      />
                   </svg>
                 </div>
               </div>
             );
           })}
        </div>

        {/* 3. Hydration Strategy */}
        <div className="p-8 rounded-[32px] bg-t-bg-el border border-t-border col-span-full lg:col-span-1 shadow-sm">
          <span className="text-[9px] font-black uppercase tracking-widest opacity-40 block mb-6">Loading Strategy: Critical Path → Background Hydration</span>
          <div className="font-mono text-[9px] leading-relaxed text-t-fg/70 bg-black/5 dark:bg-black/40 p-5 rounded-xl shadow-inner border border-white/5">
            <div className="flex gap-4 items-center">
              <span className="text-t-accent font-black w-16 uppercase tracking-widest">Critical</span>
              <span className="flex-1 h-3 bg-t-accent/20 rounded border border-t-accent/40 relative">
                <span className="absolute inset-y-0 left-0 w-[30%] bg-t-accent shadow-[0_0_10px_rgba(var(--color-accent-rgb),0.5)]" />
              </span>
              <span className="opacity-40">0ms - 250ms</span>
            </div>
            <div className="flex gap-4 items-center mt-3 opacity-60">
              <span className="text-t-fg font-black w-16 uppercase tracking-widest">Idle</span>
              <span className="flex-1 h-3 bg-t-fg/10 rounded" />
              <span className="opacity-40">250ms - 600ms</span>
            </div>
            <div className="flex gap-4 items-center mt-3">
              <span className="text-t-accent-2 font-black w-16 uppercase tracking-widest">Background</span>
              <span className="flex-1 h-3 bg-t-accent-2/10 rounded border border-t-accent-2/40 relative">
                <span className="absolute inset-y-0 left-[60%] w-[40%] bg-t-accent-2 shadow-[0_0_10px_rgba(var(--color-accent-secondary-rgb),0.5)]" />
              </span>
              <span className="opacity-40">600ms - Hydrated</span>
            </div>
          </div>
        </div>

        {/* 4. Compression Results */}
        <div className="p-8 rounded-[32px] bg-t-bg-el border border-t-border flex flex-col justify-between col-span-full lg:col-span-1 shadow-sm">
          <span className="text-[9px] font-black uppercase tracking-widest opacity-40 mb-8">Asset Compression Strategy</span>
          <div className="flex items-center justify-around gap-8 flex-1">
             <div className="text-center space-y-4">
               <div className="w-24 h-24 rounded-full border border-dashed border-t-border flex items-center justify-center opacity-40">
                  <span className="text-[10px] font-black">850KB</span>
               </div>
               <p className="text-[8px] font-black uppercase tracking-widest opacity-30 text-t-fg">Standard</p>
             </div>
             
             <div className="flex flex-col items-center gap-2">
               <div className="h-px w-12 bg-t-accent/30" />
               <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black text-emerald-500">-60%</div>
               <div className="h-px w-12 bg-t-accent/30" />
             </div>

             <div className="text-center space-y-4">
               <div className="w-16 h-16 rounded-full bg-t-accent shadow-[0_0_40px_rgba(var(--color-accent-rgb),0.4)] flex items-center justify-center border border-white/20">
                  <span className="text-[10px] font-black text-t-bg">340KB</span>
               </div>
               <p className="text-[8px] font-black uppercase tracking-widest text-t-accent">Optimized</p>
             </div>
          </div>
          <p className="text-[9px] font-bold text-t-fg-m opacity-50 mt-6 text-center leading-relaxed italic">
            Treeshaking, Image WebP sharding, and edge-side GZIP/Brotli compression.
          </p>
        </div>
      </div>
    </div>
  );
};
