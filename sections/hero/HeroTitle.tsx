import React from 'react';

export const HeroTitle: React.FC = () => {
  return (
    <div className="relative flex flex-col items-start leading-none select-none">
      <div className="relative">
        {/* First Name: Expands tracking individually on hover */}
        <h1 className="text-8xl md:text-[10rem] lg:text-[13rem] font-black font-display text-t-fg tracking-tighter hover:tracking-[0.05em] transition-all duration-700 ease-out uppercase relative z-20 cursor-default">
          Vamshi
        </h1>
        {/* Second Name: Becomes bolder (accent color + full opacity) individually on hover */}
        <h2 className="absolute top-1/2 left-0 text-8xl md:text-[10rem] lg:text-[13rem] font-black font-display text-t-fg opacity-10 dark:opacity-20 hover:opacity-100 hover:text-t-accent tracking-tighter transition-all duration-700 ease-out uppercase z-10 translate-y-4 lg:translate-y-8 cursor-default">
          Krishna
        </h2>
      </div>
    </div>
  );
};