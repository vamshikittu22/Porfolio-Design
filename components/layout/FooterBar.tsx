import React from 'react';
import { GITHUB_USERNAME, LINKEDIN_URL, X_URL, INSTAGRAM_URL } from '../../config/constants';

interface FooterBarProps {
  onScrollToTop: () => void;
}

export const FooterBar: React.FC<FooterBarProps> = ({ onScrollToTop }) => {
  return (
    <footer className="relative py-12 lg:py-16 overflow-hidden print:hidden bg-t-bg-el dark:bg-t-bg-el transition-colors duration-500">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-t-accent via-t-accent-2 to-t-accent opacity-60" />
      <div className="max-w-[1440px] mx-auto px-10 lg:px-32 relative z-10">
        <div className="grid md:grid-cols-[1fr_auto] items-end gap-12 lg:gap-24">
          
          <div className="space-y-10">
            <div className="space-y-3">
               <h4 
                 onClick={onScrollToTop} 
                 className="text-4xl lg:text-6xl font-black text-t-fg uppercase tracking-tighter cursor-pointer transition-all hover:text-t-accent active:scale-95 origin-left leading-none"
               >
                 Vamshi Krishna.
               </h4>
               <div className="flex items-center gap-4">
                 <div className="w-1.5 h-1.5 rounded-full bg-t-accent" />
                 <p className="text-[9px] font-black text-t-fg uppercase tracking-[0.6em]">Full‑stack Software Architect</p>
               </div>
            </div>
            
            <div className="flex items-center gap-6 group/tag">
               <div className="px-5 py-2.5 rounded-full bg-t-fg text-t-bg text-[8px] font-black uppercase tracking-[0.4em] transition-all group-hover/tag:bg-t-accent group-hover/tag:text-t-bg">
                 Designed by Vamshi Krishna // 2025 TM
               </div>
               <p className="text-[7px] font-bold text-t-fg-m uppercase tracking-widest opacity-40 group-hover/tag:opacity-100 transition-opacity">
                 Verified Portfolio Ledger v2.5
               </p>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-10">
            <div className="flex flex-wrap gap-3">
              {[
                { url: LINKEDIN_URL, label: 'LinkedIn', icon: <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/> },
                { url: `https://github.com/${GITHUB_USERNAME}`, label: 'GitHub', icon: <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/> },
                { url: X_URL, label: 'X', icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/> },
                { url: INSTAGRAM_URL, label: 'Instagram', icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.058-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/> },
              ].map((link, i) => (
                <a 
                  key={i} 
                  href={link.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-11 h-11 rounded-full border border-t-border bg-t-bg/40 flex items-center justify-center text-t-fg transition-all duration-200 hover:text-lime-600 dark:hover:text-lime-400 hover:scale-110 active:scale-95 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-t-accent"
                  title={link.label}
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">{link.icon}</svg>
                </a>
              ))}
            </div>
            <div className="flex items-center gap-4">
               <div className="h-px w-6 bg-t-fg opacity-20" />
               <p className="text-[8px] font-black text-t-fg uppercase tracking-[0.6em] opacity-60">
                 Scalability // Clean Code // Integrity
               </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterBar;