
import React from 'react';

export const DataPipelineArchitecture: React.FC = () => {
  return (
    <div className="mt-16 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
      <div className="flex items-center gap-4">
        <div className="w-8 h-px bg-emerald-500" />
        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-t-fg-m">Data Pipeline Architecture</h4>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="p-8 rounded-[32px] bg-t-bg-el border border-t-border space-y-6">
          <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Request Sequence (Latency Optimization)</span>
          <div className="p-6 bg-black/5 dark:bg-black/40 rounded-2xl font-mono text-[9px] leading-relaxed text-emerald-500 border border-white/5 overflow-x-auto">
            <pre>{`
  [USER] ----> [CACHE CHECK] ----> [API CALL] ----> [TRANSFORM] ----> [RENDER]
    |               |                |                 |                |
  Mount           Hit?             GraphQL           Map to           Update
  (0ms)        (Skip API)         (Fetch)           State           Visuals
            `}</pre>
          </div>
          <p className="text-[9px] font-bold text-t-fg-m opacity-50 italic">The pipeline prioritizes local hydration (SessionStorage) to ensure the UI feels instantaneous on return visits.</p>
        </div>

        <div className="p-8 rounded-[32px] bg-t-bg-el border border-t-border space-y-6">
          <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Protocol Optimization Comparison</span>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="text-[8px] font-black uppercase text-rose-500">REST API</span>
              <div className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/10 font-mono text-[10px]">
                3 Requests<br/>
                ~1.2s Latency<br/>
                High Payload
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-[8px] font-black uppercase text-emerald-500">GraphQL</span>
              <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 font-mono text-[10px]">
                1 Request<br/>
                ~0.4s Latency<br/>
                Optimized
              </div>
            </div>
          </div>
          <div className="pt-2">
            <div className="w-full bg-t-fg/5 h-1.5 rounded-full overflow-hidden flex">
              <div className="h-full bg-emerald-500 w-[30%]" />
              <div className="h-full bg-rose-500/20 w-[70%]" />
            </div>
            <span className="text-[8px] font-black uppercase opacity-40 mt-2 block">Network Efficiency: +70% Increase</span>
          </div>
        </div>

        <div className="col-span-full p-8 rounded-[32px] bg-t-bg-el border border-t-border space-y-8">
          <span className="text-[9px] font-black uppercase tracking-widest opacity-40 block text-center">Service Availability Fallback Cascade</span>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
            {[
              { label: "Live API", status: "Primary", icon: "⚡" },
              { label: "SessionStorage", status: "Secondary", icon: "💾" },
              { label: "LocalStorage", status: "Tertiary", icon: "📂" },
              { label: "Static JSON", status: "Final", icon: "📦" }
            ].map((step, i) => (
              <React.Fragment key={step.label}>
                <div className="flex flex-col items-center gap-3 group">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl group-hover:border-emerald-500/50 transition-colors">
                    {step.icon}
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-black text-t-fg uppercase">{step.label}</p>
                    <p className="text-[8px] font-bold text-emerald-500 uppercase opacity-60">{step.status}</p>
                  </div>
                </div>
                {i < 3 && <div className="hidden md:block w-12 h-px bg-emerald-500/20" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="col-span-full overflow-hidden rounded-[32px] border border-t-border">
          <table className="w-full text-left bg-t-bg-el">
            <thead>
              <tr className="bg-emerald-500/5 border-b border-t-border">
                <th className="p-6 text-[9px] font-black uppercase tracking-widest text-emerald-500">Feature</th>
                <th className="p-6 text-[9px] font-black uppercase tracking-widest text-t-fg-m">Standard Path</th>
                <th className="p-6 text-[9px] font-black uppercase tracking-widest text-emerald-500">Optimized Path</th>
                <th className="p-6 text-[9px] font-black uppercase tracking-widest text-emerald-500">Business Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-t-border/50 text-[10px]">
              <tr className="group hover:bg-emerald-500/[0.02] transition-colors">
                <td className="p-6 font-black uppercase tracking-tight">Rate Limit</td>
                <td className="p-6 opacity-60 italic">60 Requests / Hr</td>
                <td className="p-6 font-black text-emerald-500">Unlimited (Cache-First)</td>
                <td className="p-6 font-bold opacity-80">99.9% Availability</td>
              </tr>
              <tr className="group hover:bg-emerald-500/[0.02] transition-colors">
                <td className="p-6 font-black uppercase tracking-tight">Data Cost</td>
                <td className="p-6 opacity-60 italic">Fetch every visit</td>
                <td className="p-6 font-black text-emerald-500">Fetch once per session</td>
                <td className="p-6 font-bold opacity-80">Zero Overhead</td>
              </tr>
              <tr className="group hover:bg-emerald-500/[0.02] transition-colors">
                <td className="p-6 font-black uppercase tracking-tight">API Tokens</td>
                <td className="p-6 opacity-60 italic">Required for every hit</td>
                <td className="p-6 font-black text-emerald-500">Hidden via Proxy/Cache</td>
                <td className="p-6 font-bold opacity-80">Secure Architecture</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
