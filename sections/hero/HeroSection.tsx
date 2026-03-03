import React from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
import { HeroTitle } from './components/HeroTitle';
import { NameBackground } from './components/NameBackground';
import { HeroQuickActions } from './components/HeroQuickActions';
import { HeroStatus } from './components/HeroStatus';
import { HeroCard } from './components/HeroCard';
import '../../src/styles/glass-morphism.css';

interface HeroProps {
  image: string | null;
  loading: boolean;
  onScroll: (id: string) => void;
}

export const HeroSection: React.FC<HeroProps> = ({ image, loading, onScroll }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = (mouseX / rect.width) - 0.5;
    const yPct = (mouseY / rect.height) - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  return (
    <section
      id="hero-section"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      aria-labelledby="hero-title"
    >
      {/* Full-screen background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <NameBackground />
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 md:px-10 lg:px-16 xl:px-32 grid lg:grid-cols-[1.4fr_0.6fr] gap-8 md:gap-12 lg:gap-16 xl:gap-24 items-center relative z-20">
        <div className="space-y-8 md:space-y-12 lg:space-y-16">
          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-8 md:w-12 h-1 bg-t-accent" />
              <span className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.5em] md:tracking-[1em] text-t-accent">Full Stack Developer</span>
            </div>
            <div id="hero-title">
              <HeroTitle mouseX={mouseXSpring} mouseY={mouseYSpring} />
            </div>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-t-fg-m uppercase tracking-wide md:tracking-widest">
              Full-Stack Software Engineer | Java • Spring Boot • React • Cloud Architecture
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_0.7fr] gap-8 md:gap-12 items-start">
            <div className="max-w-xl space-y-6 md:space-y-8">
            <p className="text-base md:text-lg lg:text-xl text-t-fg font-medium leading-tight tracking-tight text-balance">
              Architecting <span className="text-t-accent font-black">scalable enterprise</span> ecosystems with Java, Spring Boot, and Cloud Native solutions.
            </p>
            </div>
            <HeroQuickActions onScroll={onScroll} />
          </div>
        </div>

        <div className="relative flex flex-col gap-6 md:gap-10 items-center lg:items-end justify-center perspective-[2000px]">
          <HeroStatus />
          <HeroCard
            image={image}
            loading={loading}
            mouseX={mouseXSpring}
            mouseY={mouseYSpring}
          />
        </div>
      </div>
    </section>
  );
};


export default HeroSection;
