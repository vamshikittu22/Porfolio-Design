
import React from 'react';

export const InteractionStateMachine: React.FC = () => {
  return (
    <div className="mt-16 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
      <div className="flex items-center gap-4">
        <div className="w-8 h-px bg-cyan-500" />
        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-t-fg-m">Interaction State Machine</h4>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="p-8 rounded-[32px] bg-t-bg-el border border-t-border space-y-6">
          <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Interaction Flowchart</span>
          <div className="p-6 bg-black/5 dark:bg-black/40 rounded-2xl font-mono text-[9px] leading-relaxed text-t-fg/80 border border-white/5">
            <pre>{`
  [ IDLE ]
     |
  (Hover) 
     |
     v
  [ FOCUS ] ----> { Scale Up / Elevate Z }
     |
  (Click) 
     |
     v
  [ FILTER ] ---> { Layout Displacement }
     |
  (Reset)
     |
     v
  [ IDLE ]
            `}</pre>
          </div>
        </div>

        <div className="p-8 rounded-[32px] bg-t-bg-el border border-t-border space-y-6">
          <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Filter Algorithm Explanation</span>
          <div className="p-6 bg-black/5 dark:bg-black/40 rounded-2xl font-mono text-[10px] leading-relaxed text-cyan-500 border border-white/5">
            <pre>{`
function applyFilter(nodes, activeCat) {
  return nodes.map(node => {
    const isMatch = activeCat === 'All' || 
                   node.cat === activeCat;
    return {
      ...node,
      opacity: isMatch ? 1.0 : 0.2,
      blur: isMatch ? 0 : '4px',
      grayscale: isMatch ? 0 : 1.0
    };
  });
}
            `}</pre>
          </div>
        </div>

        <div className="col-span-full p-8 rounded-[32px] bg-t-bg-el border border-t-border">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Magnetic Positioning Formula</span>
              <div className="p-6 bg-black/5 dark:bg-black/40 rounded-2xl font-mono text-xs text-t-accent-2 border border-white/5">
                <pre>{`
const dx = mouse.x - orb.center.x;
const dy = mouse.y - orb.center.y;
const dist = sqrt(dx*dx + dy*dy);

if (dist < 200) {
  const power = pow(1 - dist/200, 1.5);
  orb.pos.x += dx * power * 25;
  orb.pos.y += dy * power * 25;
}
                `}</pre>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <p className="text-xs text-t-fg-m font-medium leading-relaxed italic">
                The displacement logic utilizes an exponential decay factor (pow 1.5) to ensure the magnetic attraction feels elastic and organic rather than linear.
              </p>
              <div className="flex items-center gap-4 opacity-40">
                <div className="flex-1 h-px bg-t-border" />
                <span className="text-[8px] font-black uppercase tracking-widest">Vector Math applied in Real-time</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-full p-8 rounded-[32px] bg-t-bg-el border border-t-border">
          <span className="text-[9px] font-black uppercase tracking-widest opacity-40 block mb-6">Accessibility Compliance Checklist</span>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { attr: "aria-pressed", desc: "Toggles based on filter selection" },
              { attr: "role='tablist'", desc: "Groups category controllers" },
              { attr: "aria-label", desc: "Unique descriptive node tags" },
              { attr: "role='button'", desc: "Ensures nodes are interactable" }
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-2 group hover:border-cyan-500/50 transition-colors">
                <code className="text-[10px] font-black text-cyan-400">{item.attr}</code>
                <span className="text-[9px] font-bold text-t-fg-m opacity-50 group-hover:opacity-100">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
