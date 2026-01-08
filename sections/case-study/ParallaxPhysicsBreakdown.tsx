
import React from 'react';
import { motion } from 'framer-motion';

export const ParallaxPhysicsBreakdown: React.FC = () => {
  return (
    <div className="mt-16 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
      <div className="flex items-center gap-4">
        <div className="w-8 h-px bg-purple-500" />
        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-t-fg-m">Parallax Physics Breakdown</h4>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="p-8 rounded-[32px] bg-t-bg-el border border-t-border space-y-6 relative overflow-hidden group">
          <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Multi-Plane Interaction Model</span>
          <div className="h-64 relative flex items-center justify-center perspective-[1000px]">
            <svg viewBox="0 0 400 300" className="w-full h-full drop-shadow-2xl overflow-visible">
              <motion.rect 
                x="50" y="80" width="300" height="140" rx="12"
                fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4"
                className="text-purple-500/20"
                animate={{ x: [-10, 10, -10], rotateY: [20, 20, 20], rotateX: [10, 10, 10] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
              <text x="60" y="100" className="fill-purple-500/30 text-[8px] font-black uppercase tracking-widest">Z-Index: 0 (Slow)</text>
              <motion.rect 
                x="30" y="60" width="300" height="140" rx="12"
                fill="none" stroke="currentColor" strokeWidth="2"
                className="text-purple-500/40"
                animate={{ x: [-25, 25, -25], rotateY: [20, 20, 20], rotateX: [10, 10, 10] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <text x="40" y="80" className="fill-purple-500/50 text-[8px] font-black uppercase tracking-widest">Z-Index: 10 (Medium)</text>
              <motion.rect 
                x="10" y="40" width="300" height="140" rx="12"
                fill="rgba(168, 85, 247, 0.05)" stroke="currentColor" strokeWidth="3"
                className="text-purple-500"
                animate={{ x: [-45, 45, -45], rotateY: [20, 20, 20], rotateX: [10, 10, 10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <text x="20" y="60" className="fill-purple-500 text-[8px] font-black uppercase tracking-widest">Z-Index: 50 (Fast)</text>
            </svg>
          </div>
          <p className="text-[9px] font-bold text-t-fg-m opacity-50 text-center leading-relaxed">
            Layers are mapped to mouse delta. Displacement intensity is inversely proportional to Z-depth, creating an organic sense of volume.
          </p>
        </div>

        <div className="p-8 rounded-[32px] bg-t-bg-el border border-t-border flex flex-col justify-between">
          <span className="text-[9px] font-black uppercase tracking-widest opacity-40 mb-8">Depth Complexity Visualization</span>
          <div className="flex-1 flex items-center justify-center gap-1">
             {[0.1, 0.2, 0.3, 0.4, 0.6, 0.8, 1].map((op, i) => (
               <div key={i} className="flex flex-col items-center gap-4">
                 <div 
                  className="w-8 lg:w-10 rounded-lg bg-purple-500 shadow-lg group-hover:scale-y-110 transition-transform duration-500"
                  style={{ height: `${20 + (i * 15)}px`, opacity: op }}
                 />
                 <span className="text-[7px] font-mono opacity-30">Z:{i * 10}</span>
               </div>
             ))}
          </div>
          <div className="mt-8 pt-6 border-t border-t-border flex justify-between items-center">
             <span className="text-[8px] font-black uppercase text-purple-500">Distance: Infinity</span>
             <div className="h-px flex-1 bg-purple-500/20 mx-4" />
             <span className="text-[8px] font-black uppercase text-purple-500">Distance: Zero</span>
          </div>
        </div>

        <div className="col-span-full">
           <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/10 text-gray-300 font-mono text-xs leading-relaxed overflow-x-auto shadow-inner">
             <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/5">
                <span className="text-[9px] font-black uppercase tracking-widest text-purple-400">Kinetic Mapping Function</span>
                <span className="text-[8px] opacity-40">TypeScript / Framer</span>
             </div>
             <pre>{`// Mouse Delta -0.5 to 0.5 mapped to Rotation degrees
const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [5, -5]);
const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-5, 5]);

// Translate Delta based on Z-depth coefficient
const layerOffset = useTransform(mouseXSpring, [-0.5, 0.5], [zDepth * -30, zDepth * 30]);`}</pre>
           </div>
        </div>

        <div className="p-8 rounded-[32px] bg-t-bg-el border border-t-border col-span-full overflow-hidden">
          <span className="text-[9px] font-black uppercase tracking-widest opacity-40 block mb-6 text-center">Procedural Rendering Efficiency</span>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-t-border">
                  <th className="pb-4 text-[9px] font-black uppercase tracking-widest text-t-fg-m">Metric</th>
                  <th className="pb-4 text-[9px] font-black uppercase tracking-widest text-t-fg-m">Static Asset</th>
                  <th className="pb-4 text-[9px] font-black uppercase tracking-widest text-purple-500">Procedural Cloud</th>
                  <th className="pb-4 text-[9px] font-black uppercase tracking-widest text-emerald-500">Delta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-t-border/50">
                {[
                  { m: 'Frame Rate (FPS)', s: '60', p: '60', d: 'Stable' },
                  { m: 'Memory Usage', s: '4.2MB', p: '0.8MB', d: '-81%' },
                  { m: 'Paint Time', s: '12ms', p: '4ms', d: '-66%' },
                  { m: 'Interactivity', s: 'Zero', p: 'Real-time', d: 'Infinite' },
                ].map((row, i) => (
                  <tr key={i} className="group hover:bg-purple-500/[0.02] transition-colors">
                    <td className="py-4 text-[10px] font-bold text-t-fg-m uppercase tracking-tight">{row.m}</td>
                    <td className="py-4 text-[10px] font-medium opacity-60 italic">{row.s}</td>
                    <td className="py-4 text-[10px] font-black text-purple-500">{row.p}</td>
                    <td className="py-4 text-[10px] font-black text-emerald-500">{row.d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
