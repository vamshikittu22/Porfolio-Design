
import React from 'react';
import { motion } from 'framer-motion';

export const ProductionDeploymentArchitecture: React.FC = () => {
  return (
    <div className="mt-16 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
      <div className="flex items-center gap-4">
        <div className="w-8 h-px bg-cyan-500" />
        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-t-fg-m">Production Deployment Architecture</h4>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="p-8 rounded-[32px] bg-t-bg-el border border-t-border space-y-6">
          <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Global Delivery Infrastructure</span>
          <div className="p-6 bg-black/5 dark:bg-black/40 rounded-2xl font-mono text-[9px] leading-relaxed text-cyan-500 border border-white/5 overflow-x-auto">
            <pre>{`
  [USER] ----> [VERCEL EDGE] ----> [GLOBAL CDN]
    |               |                 |
  Request        L3 Cache          Static Assets
  Routing        (Sub-50ms)        (Images/JS)
         \\                          /
          -----> [ORIGIN SERVER] <-----
                    (Vercel)
            `}</pre>
          </div>
          <p className="text-[9px] font-bold text-t-fg-m opacity-50 italic">The architecture leverages Vercel's Edge Network to minimize TTFB (Time to First Byte) by serving logic closer to the user's geographical node.</p>
        </div>

        <div className="p-8 rounded-[32px] bg-t-bg-el border border-t-border space-y-6">
          <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Build Efficiency Delta</span>
          <div className="overflow-hidden rounded-xl border border-t-border/50">
            <table className="w-full text-left bg-t-bg/50">
              <thead>
                <tr className="border-b border-t-border/50 bg-cyan-500/5 text-[8px] font-black uppercase">
                  <th className="p-3">Asset Tier</th>
                  <th className="p-3">Dev (Unoptimized)</th>
                  <th className="p-3 text-cyan-500">Prod (Brotli)</th>
                </tr>
              </thead>
              <tbody className="text-[10px]">
                <tr className="border-b border-t-border/10">
                  <td className="p-3 font-bold">JavaScript</td>
                  <td className="p-3 opacity-50">2.4 MB</td>
                  <td className="p-3 font-black text-cyan-500">420 KB</td>
                </tr>
                <tr className="border-b border-t-border/10">
                  <td className="p-3 font-bold">CSS / Tailwind</td>
                  <td className="p-3 opacity-50">850 KB</td>
                  <td className="p-3 font-black text-cyan-500">28 KB</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">LCP Media</td>
                  <td className="p-3 opacity-50">1.2 MB (Raw)</td>
                  <td className="p-3 font-black text-cyan-500">140 KB (WebP)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[8px] font-black text-emerald-500 uppercase tracking-widest text-center mt-2">Overall Reduction: -82.4%</p>
        </div>

        <div className="col-span-full p-8 rounded-[32px] bg-t-bg-el border border-t-border space-y-6">
          <span className="text-[9px] font-black uppercase tracking-widest opacity-40 block">Environment Logic Matrix</span>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: "Core API Keys", items: ["GEMINI_API_KEY", "GITHUB_TOKEN"], color: "cyan" },
              { label: "Feature Flags", items: ["ENABLE_AI_ILLUSTRATION", "DEBUG_MINIMAX"], color: "emerald" },
              { label: "Telemetrics", items: ["WEB3FORMS_ACCESS_KEY", "ANALYTICS_ID"], color: "purple" }
            ].map((group, i) => (
              <div key={i} className="space-y-4">
                <h5 className={`text-[9px] font-black uppercase text-${group.color}-500 tracking-widest`}>{group.label}</h5>
                <div className="space-y-2">
                  {group.items.map(item => (
                    <div key={item} className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10 group hover:border-cyan-500/30 transition-all">
                      <div className="w-1 h-1 rounded-full bg-cyan-500 opacity-40 group-hover:scale-150 group-hover:opacity-100 transition-all" />
                      <code className="text-[9px] font-mono text-t-fg-m group-hover:text-t-fg">{item}</code>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-full p-8 rounded-[32px] bg-t-bg-el border border-t-border space-y-8">
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Core Web Vitals Strategy</span>
            <div className="flex gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[8px] font-black uppercase tracking-widest text-emerald-500">Optimized</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { label: "LCP", sub: "Largest Contentful Paint", target: "< 1.2s", current: "0.4s", progress: 95 },
              { label: "FID", sub: "First Input Delay", target: "< 100ms", current: "14ms", progress: 98 },
              { label: "CLS", sub: "Cumulative Layout Shift", target: "< 0.1", current: "0.01", progress: 100 }
            ].map((vital, i) => (
              <div key={i} className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <div>
                    <p className="text-2xl font-black text-t-fg font-display">{vital.label}</p>
                    <p className="text-[7px] font-black uppercase tracking-widest text-t-fg-m opacity-40">{vital.sub}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-cyan-500">{vital.current}</p>
                    <p className="text-[7px] font-bold text-t-fg-m opacity-30">Target: {vital.target}</p>
                  </div>
                </div>
                <div className="h-1 w-full bg-t-fg/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${vital.progress}%` }}
                    transition={{ duration: 1.5, delay: i * 0.2 }}
                    className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
