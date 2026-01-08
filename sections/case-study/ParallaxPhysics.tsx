
import React from 'react';
import { motion } from 'framer-motion';

export const ParallaxPhysics: React.FC = () => {
  return (
    <div className="mt-16 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
      <div className="flex items-center gap-4">
        <div className="w-8 h-px bg-purple-500" />
        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-t-fg-m">Parallax Physics Breakdown</h4>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="p-8 rounded-[32px] bg-t-bg-el border border-t-border space-y-6 relative overflow-hidden group">
          <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Multi-Plane Model</span>
          <div className="h-64 relative flex items-center justify-center perspective-[1000px]">
            <svg viewBox="0 0 400 300" className="w-full h-full drop-shadow-2xl overflow-visible">
              <motion.rect x="10" y="40" width="300" height="140" rx="12" fill="rgba(168, 85, 247, 0.05)" stroke="#A855F7" strokeWidth="3" animate={{ x: [-45, 45, -45] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
              <text x="20" y="60" className="fill-purple-500 text-[8px] font-black uppercase">Z-Index: 50 (Fast)</text>
            </svg>
          </div>
        </div>

        <div className="p-8 rounded-[32px] bg-t-bg-el border border-t-border flex flex-col justify-between">
          <span className="text-[9px] font-black uppercase tracking-widest opacity-40 mb-8">Depth Complexity</span>
          <div className="flex-1 flex items-center justify-center gap-1">
             {[0.2, 0.4, 0.6, 0.8, 1].map((op, i) => (
               <div key={i} className="w-8 lg:w-10 bg-purple-500 rounded-lg transition-all duration-500" style={{ height: `${20 + (i * 20)}px`, opacity: op }} />
             ))}
          </div>
          <p className="text-[9px] font-bold text-t-fg-m opacity-50 mt-6 text-center italic">Displacement is inversely proportional to Z-depth.</p>
        </div>
      </div>
    </div>
  );
};
