
import React from 'react';

export const HeroTitle: React.FC = () => {
  return (
    <div className="relative flex flex-col items-start leading-none select-none">
      <div className="relative">
        <h1 className="text-8xl md:text-[10rem] lg:text-[13rem] font-black font-display text-white tracking-tighter uppercase relative z-20">
          Vamshi
        </h1>
        <h2 className="absolute top-1/2 left-0 text-8xl md:text-[10rem] lg:text-[13rem] font-black font-display text-t-fg opacity-20 dark:opacity-30 tracking-tighter uppercase z-10 translate-y-4 lg:translate-y-8">
          Krishna
        </h2>
      </div>
    </div>
  );
};
