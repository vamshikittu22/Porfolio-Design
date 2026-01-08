
import React from 'react';
import { motion } from 'framer-motion';

export const MinimaxLogic: React.FC = () => {
  return (
    <div className="mt-16 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
      <div className="flex items-center gap-4">
        <div className="w-8 h-px bg-rose-500" />
        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-t-fg-m">Minimax Decision Tree</h4>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="p-8 rounded-[32px] bg-t-bg-el border border-t-border space-y-6">
          <span className="text-[9px] font-black uppercase tracking-widest opacity-40">State Exploration</span>
          <div className="p-6 bg-black/40 rounded-2xl font-mono text-[10px] text-rose-500 border border-white/5">
            <pre>{`[X|O| ] -- Move 1 --> [X|O|X] (MAX)\n         -- Move 2 --> [X|O| ] (MAX)`}</pre>
          </div>
        </div>

        <div className="p-8 rounded-[32px] bg-t-bg-el border border-t-border space-y-6">
          <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Victory Scoring</span>
          <div className="space-y-3">
            <div className="flex justify-between p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[10px] font-black text-t-fg">CPU Victory</span>
              <span className="text-emerald-500 font-black">+10</span>
            </div>
            <div className="flex justify-between p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[10px] font-black text-t-fg">Human Victory</span>
              <span className="text-rose-500 font-black">-10</span>
            </div>
          </div>
        </div>

        <div className="col-span-full p-8 rounded-[32px] bg-t-bg-el border border-t-border">
          <span className="text-[9px] font-black uppercase tracking-widest opacity-40 block mb-6">System Win Probability</span>
          <div className="space-y-6">
            {[ { l: "Easy", r: 40 }, { l: "Hard", r: 100 } ].map((t, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-[9px] font-black text-t-fg"><span>{t.l}</span><span>{t.r}% Success</span></div>
                <div className="h-2 w-full bg-t-fg/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${t.r}%` }} transition={{ duration: 1 }} className="h-full bg-rose-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
