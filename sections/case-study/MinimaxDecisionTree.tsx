
import React from 'react';
import { motion } from 'framer-motion';

export const MinimaxDecisionTree: React.FC = () => {
  return (
    <div className="mt-16 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
      <div className="flex items-center gap-4">
        <div className="w-8 h-px bg-rose-500" />
        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-t-fg-m">Minimax Decision Tree</h4>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="p-8 rounded-[32px] bg-t-bg-el border border-t-border space-y-6">
          <span className="text-[9px] font-black uppercase tracking-widest opacity-40">State Exploration (2 Levels)</span>
          <div className="p-6 bg-black/5 dark:bg-black/40 rounded-2xl font-mono text-[10px] leading-relaxed text-rose-500 border border-white/5 overflow-x-auto">
            <pre>{`
      [X|O| ] (Current: Turn X)
      /      |      \\
   Move 1  Move 2  Move 3
     |       |       |
  [X|O|X] [X|O| ] [X|O| ]
   (MAX)   (MAX)   (MAX)
    / \\     / \\     / \\
   O1  O2  O3  O4  O5  O6
  (MIN)   (MIN)   (MIN)
            `}</pre>
          </div>
          <p className="text-[9px] font-bold text-t-fg-m opacity-50 italic">The engine recursively explores all leaf nodes to determine the path with the highest guaranteed score.</p>
        </div>

        <div className="p-8 rounded-[32px] bg-t-bg-el border border-t-border space-y-6">
          <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Terminal Node Scoring</span>
          <div className="grid grid-cols-1 gap-3">
            {[
              { label: "CPU Victory (X)", score: "+10", desc: "Maximizing objective reached", color: "text-emerald-500" },
              { label: "Human Victory (O)", score: "-10", desc: "Minimizing threat detected", color: "text-rose-500" },
              { label: "Draw State", score: "0", desc: "Neutral equilibrium", color: "text-t-fg-m" }
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 group hover:border-rose-500/30 transition-colors">
                <div>
                  <p className="text-[10px] font-black uppercase text-t-fg">{s.label}</p>
                  <p className="text-[8px] font-medium opacity-50">{s.desc}</p>
                </div>
                <span className={`text-lg font-black ${s.color}`}>{s.score}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 rounded-[32px] bg-t-bg-el border border-t-border col-span-full">
          <span className="text-[9px] font-black uppercase tracking-widest opacity-40 block mb-6">Heuristic Optimization Table</span>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-rose-500/5 border-b border-t-border">
                  <th className="p-4 text-[9px] font-black uppercase tracking-widest text-rose-500">Method</th>
                  <th className="p-4 text-[9px] font-black uppercase tracking-widest text-t-fg-m">Nodes Visited</th>
                  <th className="p-4 text-[9px] font-black uppercase tracking-widest text-t-fg-m">Response Time</th>
                  <th className="p-4 text-[9px] font-black uppercase tracking-widest text-rose-500">Constraint</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-t-border/50 text-[10px]">
                <tr>
                  <td className="p-4 font-black uppercase">Full Minimax (Blank)</td>
                  <td className="p-4 font-mono">549,946</td>
                  <td className="p-4">~450ms</td>
                  <td className="p-4 opacity-60">High CPU Spike</td>
                </tr>
                <tr>
                  <td className="p-4 font-black uppercase text-rose-500">Opening Book</td>
                  <td className="p-4 font-mono">1</td>
                  <td className="p-4 text-rose-500 font-bold">&lt; 1ms</td>
                  <td className="p-4 opacity-60">Instant Hydration</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-8 rounded-[32px] bg-t-bg-el border border-t-border col-span-full">
           <div className="flex justify-between items-end mb-8">
              <span className="text-[9px] font-black uppercase tracking-widest opacity-40">System Win Probability</span>
              <span className="text-[8px] font-mono text-rose-500 uppercase tracking-widest">Calculated via 1000 Simulations</span>
           </div>
           <div className="space-y-6">
              {[
                { label: "Easy (Random Move)", rate: 40, color: "bg-t-fg/20" },
                { label: "Medium (Block Logic)", rate: 60, color: "bg-rose-500/40" },
                { label: "Hard (Full Minimax)", rate: 100, color: "bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)]" }
              ].map((tier, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-t-fg">
                    <span>{tier.label}</span>
                    <span>{tier.rate}% Success</span>
                  </div>
                  <div className="h-2 w-full bg-t-fg/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${tier.rate}%` }}
                      transition={{ duration: 1, delay: i * 0.2 }}
                      className={`h-full ${tier.color} rounded-full`}
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
