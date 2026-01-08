
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
          <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Search Tree: Every Possible Move the AI Considers</span>
          <div className="p-6 bg-black/5 dark:bg-black/40 rounded-2xl font-mono text-[10px] leading-relaxed text-rose-500 border border-white/5 overflow-x-auto">
            <pre>{`
      [X|O| ] (Current: Turn X)
      /      |      \\
   Move 1  Move 2  Move 3
     |       |       |
  [X|O|X] [X|O| ] [X|O| ]
   (MAX)   (MAX)   (MAX)
            `}</pre>
          </div>
          <p className="text-[9px] font-bold text-t-fg-m opacity-50 italic">The engine recursively explores leaf nodes to determine the path with the highest guaranteed score.</p>
        </div>

        <div className="p-8 rounded-[32px] bg-t-bg-el border border-t-border space-y-6">
          <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Scoring System: Win, Lose, or Draw</span>
          <div className="grid grid-cols-1 gap-3">
            {[
              { label: "CPU Victory (X)", score: "+10", color: "text-emerald-500" },
              { label: "Human Victory (O)", score: "-10", color: "text-rose-500" },
              { label: "Draw State", score: "0", color: "text-t-fg-m" }
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 group hover:border-rose-500/30 transition-colors">
                <p className="text-[10px] font-black uppercase text-t-fg">{s.label}</p>
                <span className={`text-lg font-black ${s.color}`}>{s.score}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 rounded-[32px] bg-t-bg-el border border-t-border col-span-full">
          <span className="text-[9px] font-black uppercase tracking-widest opacity-40 block mb-6">Speed Comparison: Full Search vs Smart Shortcuts</span>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-rose-500/5 border-b border-t-border">
                  <th className="p-4 text-[9px] font-black uppercase tracking-widest text-rose-500">Method</th>
                  <th className="p-4 text-[9px] font-black uppercase tracking-widest text-t-fg-m">Nodes Visited</th>
                  <th className="p-4 text-[9px] font-black uppercase tracking-widest text-t-fg-m">Response Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-t-border/50 text-[10px]">
                <tr>
                  <td className="p-4 font-black uppercase">Full Minimax (Blank)</td>
                  <td className="p-4 font-mono">549,946</td>
                  <td className="p-4">~450ms</td>
                </tr>
                <tr>
                  <td className="p-4 font-black uppercase text-rose-500">Opening Book (Instant)</td>
                  <td className="p-4 font-mono">1</td>
                  <td className="p-4 text-rose-500 font-bold">&lt; 1ms</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
