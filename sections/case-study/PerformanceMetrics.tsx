
import React from 'react';
import { motion } from 'framer-motion';

export const PerformanceMetrics: React.FC = () => {
  const metrics = [
    { label: 'FCP', before: 0.8, after: 0.3, unit: 's' },
    { label: 'LCP', before: 1.2, after: 0.4, unit: 's' },
    { label: 'TTI', before: 2.1, after: 0.8, unit: 's' },
  ];

  const lighthouse = [
    { label: 'Performance', score: 98, color: 'text-emerald-500' },
    { label: 'Accessibility', score: 100, color: 'text-indigo-500' },
    { label: 'Best Practices', score: 100, color: 'text-cyan-500' },
    { label: 'SEO', score: 100, color: 'text-amber-500' },
  ];

  return (
    <div className="mt-16 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
      <div className="flex items-center gap-4">
        <div className="w-8 h-px bg-t-accent" />
        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-t-fg-m">Performance Analytics</h4>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="p-8 rounded-[32px] bg-t-bg-el border border-t-border space-y-8">
          <div className="flex justify-between items-end text-[9px] font-black uppercase tracking-widest opacity-40">Load Metrics Delta</div>
          <div className="space-y-6">
            {metrics.map((m) => (
              <div key={m.label} className="space-y-2">
                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-t-fg">
                  <span>{m.label}</span>
                  <span>{m.after}{m.unit} <span className="opacity-30 line-through ml-2 font-medium">{m.before}{m.unit}</span></span>
                </div>
                <div className="h-1.5 w-full bg-t-fg/5 rounded-full overflow-hidden relative">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${(m.before / 2.5) * 100}%` }} className="absolute inset-0 bg-t-fg/10" />
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${(m.after / 2.5) * 100}%` }} className="absolute inset-0 bg-t-accent shadow-[0_0_10px_rgba(var(--color-accent-rgb),0.5)]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 rounded-[32px] bg-t-bg-el border border-t-border flex flex-col justify-between text-center">
           <span className="text-[9px] font-black uppercase tracking-widest opacity-40 mb-8 block">Asset Compression Strategy</span>
           <div className="flex items-center justify-around flex-1">
             <div className="text-[10px] font-black opacity-40">850KB</div>
             <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-[9px] font-black text-emerald-500">-60%</div>
             <div className="w-16 h-16 rounded-full bg-t-accent text-t-bg flex items-center justify-center text-[10px] font-black">340KB</div>
           </div>
           <p className="text-[9px] font-bold text-t-fg-m opacity-50 mt-6">Treeshaking & WebP Encoding Enabled.</p>
        </div>

        <div className="grid grid-cols-2 gap-4 col-span-full">
           {lighthouse.map((score) => (
             <div key={score.label} className="p-5 rounded-[32px] bg-t-bg-el border border-t-border flex flex-col items-center group hover:border-t-accent transition-colors">
               <div className={`text-2xl font-black mb-1 ${score.color}`}>{score.score}</div>
               <div className="text-[7px] font-black uppercase tracking-widest text-t-fg-m opacity-50">{score.label}</div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};
