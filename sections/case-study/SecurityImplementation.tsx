
import React from 'react';
import { motion } from 'framer-motion';

export const SecurityImplementation: React.FC = () => {
  return (
    <div className="mt-16 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
      <div className="flex items-center gap-4">
        <div className="w-8 h-px bg-rose-500" />
        <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-t-fg-m">Security Implementation</h4>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* 1. Security Layers Diagram */}
        <div className="p-8 rounded-[32px] bg-t-bg-el border border-t-border space-y-6">
          <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Defense in Depth Architecture</span>
          <div className="p-6 bg-black/5 dark:bg-black/40 rounded-2xl font-mono text-[9px] leading-relaxed text-rose-500 border border-white/5 overflow-x-auto">
            <pre>{`
  [CLIENT] ----> [VALIDATION] ----> [RATE LIMIT]
     |              (Zod/Regex)        (429 Lock)
     |                                     |
  [HTTP] <------- [CORS POLICY] <------- [AUTH]
 (TLS 1.3)        (Origin Lock)       (SDK Keys)
            `}</pre>
          </div>
          <p className="text-[9px] font-bold text-t-fg-m opacity-50 italic">Multi-layered defensive strategy ensuring that even if one node is compromised, the data origin remains secure.</p>
        </div>

        {/* 2. Content Security Policy Snippet */}
        <div className="p-8 rounded-[32px] bg-t-bg-el border border-t-border space-y-6">
          <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Content Security Policy (CSP)</span>
          <div className="p-4 bg-[#0d1117] rounded-xl font-mono text-[10px] text-rose-300 leading-relaxed overflow-x-auto border border-white/5">
            <pre>{`default-src 'self';
script-src 'self' 'unsafe-eval' esm.sh;
img-src 'self' data: images.unsplash.com;
connect-src 'self' generativelanguage.googleapis.com api.github.com;
frame-ancestors 'none';`}</pre>
          </div>
          <p className="text-[8px] font-bold text-t-fg-m opacity-50 uppercase tracking-widest text-center mt-2">Zero-Trust Script Execution Protocol</p>
        </div>

        {/* 3. Sensitive Data Handling Table */}
        <div className="col-span-full overflow-hidden rounded-[32px] border border-t-border">
          <table className="w-full text-left bg-t-bg-el">
            <thead>
              <tr className="bg-rose-500/5 border-b border-t-border">
                <th className="p-6 text-[9px] font-black uppercase tracking-widest text-rose-500">Asset Type</th>
                <th className="p-6 text-[9px] font-black uppercase tracking-widest text-t-fg-m">Handling Strategy</th>
                <th className="p-6 text-[9px] font-black uppercase tracking-widest text-rose-500">Storage Node</th>
                <th className="p-6 text-[9px] font-black uppercase tracking-widest text-rose-500">Risk Mitigation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-t-border/50 text-[10px]">
              {[
                { a: "API Keys", h: "Server-Side Injection", s: "Vercel Secrets", r: "No Client Exposure" },
                { a: "User Inputs", h: "Strict Sanitization", s: "Memory Only", r: "XSS Prevention" },
                { a: "Session IDs", h: "HttpOnly Cookies", s: "SessionStorage", r: "CSRF Defense" },
                { a: "Analytics Tokens", h: "Domain Scoping", s: "Environment Vars", r: "Scoped Access" }
              ].map((row, i) => (
                <tr key={i} className="group hover:bg-rose-500/[0.02] transition-colors">
                  <td className="p-6 font-black uppercase tracking-tight">{row.a}</td>
                  <td className="p-6 opacity-60 italic">{row.h}</td>
                  <td className="p-6 font-bold">{row.s}</td>
                  <td className="p-6 font-black text-rose-500 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
                    {row.r}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 4. OWASP Top 10 Compliance Checklist */}
        <div className="col-span-full p-8 rounded-[32px] bg-t-bg-el border border-t-border space-y-6">
          <span className="text-[9px] font-black uppercase tracking-widest opacity-40 block">OWASP Top 10 Compliance Audit</span>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { id: "A01", label: "Broken Access Control", status: true },
              { id: "A03", label: "Injection (XSS/SQL)", status: true },
              { id: "A05", label: "Security Misconfig", status: true },
              { id: "A07", label: "ID & Auth Failures", status: true },
              { id: "A09", label: "Logging Failures", status: true }
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-rose-500/[0.03] border border-rose-500/10 flex flex-col gap-3 group hover:border-rose-500/40 transition-all">
                <div className="flex justify-between items-center">
                  <span className="text-[8px] font-black text-rose-500">{item.id}</span>
                  {item.status && (
                    <div className="w-4 h-4 rounded-full bg-rose-500 flex items-center justify-center text-white">
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={4}><path d="M5 13l4 4L19 7" /></svg>
                    </div>
                  )}
                </div>
                <span className="text-[9px] font-black uppercase text-t-fg leading-tight tracking-tight">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
