import React from 'react';

/**
 * SectionLoader: A minimal, Swiss-style loading indicator used as a fallback
 * for Suspense boundaries during code splitting.
 */
const SectionLoader: React.FC = () => (
  <div className="h-[40rem] flex flex-col items-center justify-center space-y-6 opacity-40">
    <div className="w-12 h-12 border-4 border-t-accent border-r-transparent rounded-full animate-spin" />
    <span className="text-[10px] font-black uppercase tracking-[1em] text-t-fg-m pl-[1em]">
      Syncing Module
    </span>
  </div>
);

export default SectionLoader;