import React from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
import { HeroTitle } from './components/HeroTitle';
import { NameBackground } from './components/NameBackground';
import { HeroQuickActions } from './components/HeroQuickActions';
import { HeroStatus } from './components/HeroStatus';
import { HeroCard } from './components/HeroCard';

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
      className="relative min-h-screen flex items-center justify-center py-20 mb-[20rem] lg:mb-[30rem] print:hidden overflow-visible"
      onMouseMove={handleMouseMove}
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 z-0">
        <NameBackground />
      </div>

      <div className="grid lg:grid-cols-[1.4fr_0.6fr] gap-12 lg:gap-24 items-center w-full relative z-20">
        <div className="space-y-16 animate-in fade-in slide-in-from-left duration-1000">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-1 bg-t-accent" />
              <span className="text-[12px] font-black uppercase tracking-[1em] text-t-accent">Full Stack Developer</span>
            </div>
            <div id="hero-title">
              <HeroTitle mouseX={mouseXSpring} mouseY={mouseYSpring} />
            </div>
            <p className="text-xl lg:text-2xl font-bold text-t-fg-m uppercase tracking-widest">
              Full-Stack Software Engineer | Java • Spring Boot • React • Cloud Architecture
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_0.7fr] gap-12 items-start">
            <div className="max-w-xl space-y-8">
              <p className="text-xl lg:text-3xl text-t-fg font-medium leading-tight tracking-tight text-balance">
                Architecting <span className="text-t-accent font-black">scalable enterprise</span> ecosystems with Java, Spring Boot, and Cloud Native solutions.
              </p>
            </div>
            <HeroQuickActions onScroll={onScroll} />
          </div>
        </div>

        <div className="relative flex flex-col gap-10 items-center lg:items-end justify-center perspective-[2000px]">
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
