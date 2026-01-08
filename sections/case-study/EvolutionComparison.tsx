
import React from 'react';
import { motion } from 'framer-motion';

interface ComparisonProps {
  type: 'hero' | 'skills' | 'github' | 'chat';
  accentColor: string;
}

export const EvolutionComparison: React.FC<ComparisonProps> = ({ type, accentColor }) => {
  const data = {
    hero: {
      before: "Static Image Hero",
      after: "Dynamic Keyword Cloud",
      description: "Transitioned from a low-engagement static asset to a procedurally generated 3D keyword constellation that reacts to user proximity.",
      beforeVisual: (
        <div className="w-full h-full flex items-center justify-center p-4">
          <div className="w-32 h-40 bg-slate-300 rounded-lg border-4 border-slate-400 opacity-50 flex items-center justify-center">
             <svg className="w-12 h-12 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
        </div>
      ),
      afterVisual: (
        <div className="w-full h-full relative overflow-hidden p-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute text-[6px] font-black uppercase tracking-widest whitespace-nowrap"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                color: accentColor,
                opacity: 0.4 + Math.random() * 0.6
              }}
              animate={{ x: [0, 5, -5, 0], y: [0, -5, 5, 0] }}
              transition={{ duration: 3 + Math.random() * 2, repeat: Infinity }}
            >
              {['React', 'Vite', 'Gemini', 'UI', 'UX', 'Deploy'][i % 6]}
            </motion.span>
          ))}
        </div>
      )
    },
    skills: {
      before: "Bullet-point List",
      after: "Interactive Matrix",
      description: "Standard lists fail to show proficiency. The new matrix uses physics-based grouping and category filtering to visualize a complex tech ecosystem.",
      beforeVisual: (
        <div className="w-full h-full flex flex-col gap-2 p-6 justify-center">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-1 h-1 bg-slate-500 rounded-full" />
              <div className="h-1.5 w-24 bg-slate-300 rounded" />
            </div>
          ))}
        </div>
      ),
      afterVisual: (
        <div className="w-full h-full flex items-center justify-center p-4">
           <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 9 }).map((_, i) => (
                <motion.div 
                  key={i} 
                  className="w-6 h-6 rounded-lg border flex items-center justify-center bg-white/10"
                  style={{ borderColor: accentColor }}
                  whileHover={{ scale: 1.2, backgroundColor: accentColor }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
                </motion.div>
              ))}
           </div>
        </div>
      )
    },
    github: {
      before: "Static Profile Link",
      after: "Live Data Dashboard",
      description: "Replaced a generic hyperlink with a real-time GraphQL-powered dashboard visualizing commit density and repository velocity.",
      beforeVisual: (
        <div className="w-full h-full flex items-center justify-center p-4">
          <div className="px-4 py-2 border border-slate-400 rounded-full text-[8px] font-bold text-slate-500 uppercase tracking-widest">
            github.com/profile
          </div>
        </div>
      ),
      afterVisual: (
        <div className="w-full h-full flex items-end justify-center gap-1 p-6">
           {Array.from({ length: 12 }).map((_, i) => (
             <motion.div
               key={i}
               className="w-1.5 rounded-t-sm"
               style={{ backgroundColor: accentColor }}
               animate={{ height: [10, 30, 15, 40, 20] }}
               transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
             />
           ))}
        </div>
      )
    },
    chat: {
      before: "Standard Form",
      after: "AI-Powered Proxy",
      description: "Moved beyond one-way forms to a contextual RAG-based chat assistant that can answer specific recruiter inquiries in real-time.",
      beforeVisual: (
        <div className="w-full h-full flex flex-col gap-2 p-6 justify-center">
          <div className="h-4 w-full bg-slate-200 rounded border border-slate-300" />
          <div className="h-8 w-full bg-slate-200 rounded border border-slate-300" />
          <div className="h-4 w-1/2 bg-slate-400 rounded" />
        </div>
      ),
      afterVisual: (
        <div className="w-full h-full flex flex-col gap-2 p-4 justify-end">
          <div className="p-2 rounded-xl rounded-bl-none border self-start max-w-[80%]" style={{ borderColor: accentColor + '40', backgroundColor: accentColor + '10' }}>
            <div className="h-1 w-12 rounded bg-current opacity-30" style={{ color: accentColor }} />
          </div>
          <div className="p-2 rounded-xl rounded-br-none self-end max-w-[80%] text-white" style={{ backgroundColor: accentColor }}>
            <div className="h-1 w-8 rounded bg-white opacity-40" />
          </div>
          <div className="flex gap-1 items-center px-1">
             <div className="w-1 h-1 rounded-full animate-bounce" style={{ backgroundColor: accentColor }} />
             <div className="w-1 h-1 rounded-full animate-bounce [animation-delay:0.2s]" style={{ backgroundColor: accentColor }} />
             <div className="w-1 h-1 rounded-full animate-bounce [animation-delay:0.4s]" style={{ backgroundColor: accentColor }} />
          </div>
        </div>
      )
    }
  };

  const current = data[type];

  return (
    <div className="mt-16 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700">
      <div className="flex items-center gap-4">
        <div className="w-8 h-px" style={{ backgroundColor: accentColor }} />
        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-t-fg-m">UX Evolution Path</h4>
      </div>

      <div className="relative group">
        <div className="grid grid-cols-2 rounded-[32px] border border-t-border overflow-hidden bg-t-bg-el/50 backdrop-blur-md shadow-xl min-h-[220px]">
          {/* BEFORE - Grayscale */}
          <div className="relative border-r border-t-border flex flex-col grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
            <div className="absolute top-4 left-4 text-[8px] font-black uppercase tracking-widest opacity-40">Previous Phase</div>
            <div className="flex-1">
               {current.beforeVisual}
            </div>
            <div className="p-4 bg-black/5 text-center">
               <span className="text-[9px] font-bold text-t-fg-m uppercase tracking-widest">{current.before}</span>
            </div>
          </div>

          {/* AFTER - Color */}
          <div className="relative flex flex-col bg-gradient-to-br from-transparent to-white/5">
            <div className="absolute top-4 right-4 text-[8px] font-black uppercase tracking-widest text-white px-2 py-0.5 rounded" style={{ backgroundColor: accentColor }}>Engineering v2.5</div>
            <div className="flex-1">
               {current.afterVisual}
            </div>
            <div className="p-4 bg-black/5 text-center">
               <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: accentColor }}>{current.after}</span>
            </div>
          </div>
        </div>
        
        {/* Comparison Text */}
        <div className="mt-4 px-2">
           <p className="text-[11px] font-medium text-t-fg-m leading-relaxed italic opacity-80">
              {current.description}
           </p>
        </div>
      </div>
    </div>
  );
};
