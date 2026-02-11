import React, { useState, useMemo, useRef, useEffect } from 'react';
import { GlassCard } from '../../components/ui/GlassUI';
import { RESUME_CONTENT, ResumeItem } from '../resume/data/ResumeData';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { AnimatedDigit } from './components/AnimatedDigit';
import { BadgeFlipper } from './components/BadgeFlipper';
import { CareerStatGrid } from './components/CareerStatGrid';
import { CareerTimelineItem } from './components/CareerTimelineItem';

interface CareerItem extends ResumeItem {
  id: string;
  type: 'work' | 'education';
  year: string;
}

const CareerSnapshot: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const combinedData = useMemo(() => {
    const combined: CareerItem[] = [
      ...RESUME_CONTENT.experience.map((item, idx) => {
        const years = item.period.match(/\d{4}/g);
        const yearStr = years ? years[0] : '2025';
        return {
          ...item,
          id: `work-${idx}`,
          type: 'work' as const,
          year: yearStr,
        };
      }),
      ...RESUME_CONTENT.education.map((item, idx) => {
        const years = item.period.match(/\d{4}/g);
        const yearStr = years ? years[0] : '2024';
        return {
          ...item,
          id: `edu-${idx}`,
          type: 'education' as const,
          year: yearStr,
        };
      })
    ];

    return combined.sort((a, b) => {
      const yearA = parseInt(a.period.match(/\d{4}/)?.[0] || '0');
      const yearB = parseInt(b.period.match(/\d{4}/)?.[0] || '0');
      return yearB - yearA;
    });
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleInternalScroll = () => {
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.top + containerRect.height / 2;

      let closestIndex = 0;
      let minDistance = Infinity;

      itemRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const distance = Math.abs(containerCenter - itemCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = idx;
        }
      });

      if (closestIndex !== activeIndex) {
        setActiveIndex(closestIndex);
      }
    };

    container.addEventListener('scroll', handleInternalScroll);
    handleInternalScroll();

    return () => container.removeEventListener('scroll', handleInternalScroll);
  }, [activeIndex]);

  const activeItem = combinedData[activeIndex] || combinedData[0];

  if (!activeItem) return null;

  return (
    <section id="career-snapshot-section" className="mb-[20rem] scroll-mt-32 max-w-7xl mx-auto px-6">
      <ScrollReveal>
        <GlassCard className="p-8 lg:p-12 overflow-hidden bg-t-bg-el/60 border-t-accent/10" accent="theme">

          <div className="flex flex-col gap-8 mb-12">
            <div>
              <h2 className="text-4xl lg:text-6xl font-black font-display text-t-fg uppercase tracking-tighter leading-none mb-3">
                Work & <br /> <span className="text-t-accent">Education.</span>
              </h2>
              <p className="text-[9px] font-black uppercase tracking-[0.5em] text-t-fg-m opacity-50">
                A timeline of my professional experience
              </p>
            </div>

            <CareerStatGrid />
          </div>

          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8 items-stretch h-[500px] lg:h-[600px] overflow-hidden border-t border-t-border/20 pt-8">
            <div className="flex flex-col items-center justify-center text-center relative z-20">
              <div className="flex items-center justify-center text-7xl lg:text-9xl font-black font-display text-t-fg uppercase tracking-tighter leading-none">
                {activeItem.year.split('').map((d, i) => (
                  <AnimatedDigit key={i} digit={d} />
                ))}
              </div>
              <div className="mt-6">
                <BadgeFlipper type={activeItem.type} />
              </div>
            </div>

            <div
              ref={scrollContainerRef}
              className="w-full overflow-y-auto pr-4 scrollbar-hide space-y-8 snap-y snap-mandatory"
              style={{ scrollBehavior: 'smooth' }}
            >
              <div className="h-[200px] flex-shrink-0" />

              {combinedData.map((item, idx) => (
                <div
                  key={item.id}
                  ref={el => { itemRefs.current[idx] = el; }}
                  className="snap-center py-4"
                >
                  <CareerTimelineItem
                    item={item}
                    isActive={activeIndex === idx}
                  />
                </div>
              ))}

              <div className="h-[200px] flex-shrink-0" />
            </div>
          </div>
        </GlassCard>
      </ScrollReveal>
    </section>
  );
};

export default CareerSnapshot;