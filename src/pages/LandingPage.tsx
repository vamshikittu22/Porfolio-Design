/**
 * LandingPage Component
 * 
 * Premium FAANG-style portfolio landing page with cinematic welcome hero,
 * senior dev signal section, and interactive chapter grid.
 * 
 * Features:
 * - Animated welcome hero with name reveal and role badge
 * - Senior developer credibility bar (companies, metrics, availability)
 * - Staggered chapter card grid with glass morphism
 * - Framer Motion entrance/micro-animations throughout
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChapterCardGrid } from '../components/cards/ChapterCardGrid';
import {
  FULL_NAME,
  LINKEDIN_URL,
  GITHUB_USERNAME,
  SKILLS_RESUME,
} from '../../config/constants';

/* ─────────────────────── animation config ─────────────────────── */
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

/* ─────────────────────── sub-components ─────────────────────── */

/** Rotating role titles in the hero */
const ROLES = [
  'Software Engineer',
  'Full-Stack Architect',
  'Cloud & DevOps Engineer',
  'AI/ML Integrator',
];

function RotatingRole() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="block relative h-[1.3em] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={ROLES[idx]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-0 text-center text-t-accent"
        >
          {ROLES[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/** Metric pill (e.g. "5+ YOE") */
function MetricPill({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      className="flex flex-col items-center gap-1 px-5 py-3 rounded-2xl bg-t-fg/[0.04] dark:bg-white/[0.04] border border-t-border/40"
    >
      <span className="text-xl md:text-2xl font-black font-heading text-t-accent tabular-nums">{value}</span>
      <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-t-fg-m/70">{label}</span>
    </motion.div>
  );
}

/** Company badge */
function CompanyBadge({ name, delay = 0 }: { name: string; delay?: number }) {
  return (
    <motion.span
      variants={fadeUp}
      custom={delay}
      className="px-4 py-1.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-[0.2em] border border-t-border/40 text-t-fg-m/80 bg-t-fg/[0.03] dark:bg-white/[0.03] hover:border-t-accent/40 hover:text-t-accent transition-all duration-300"
    >
      {name}
    </motion.span>
  );
}

/* ─────────────────────── main component ─────────────────────── */
export default function LandingPage() {
  const firstName = FULL_NAME.split(' ')[0]; // "Vamshi"
  const techCount = Object.values(SKILLS_RESUME).flat().length;

  return (
    <main
      className="min-h-screen w-full bg-t-bg"
      role="main"
      aria-label="Portfolio landing page"
    >
      {/* ═══════════════════ HERO WELCOME ═══════════════════ */}
      <motion.section
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative flex flex-col items-center text-center pt-8 pb-16 lg:pb-24"
      >
        {/* Subtle grid background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(var(--color-fg) 1px, transparent 1px),
              linear-gradient(90deg, var(--color-fg) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
          }}
        />

        {/* Status badge */}
        <motion.div variants={fadeUp} className="mb-8">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-t-border/40 bg-t-bg-el/80 backdrop-blur-xl shadow-lg">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-t-fg-m">
              Open to Opportunities
            </span>
          </div>
        </motion.div>

        {/* Name + rotating role */}
        <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-heading tracking-tight text-t-fg leading-[0.95] mb-6">
          Hi, I'm {firstName}
          <span className="text-t-accent">.</span>
        </motion.h1>

        <motion.div variants={fadeUp} className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold leading-snug max-w-3xl mb-4">
          <RotatingRole />
          <span className="block text-t-fg-m/60 mt-1">building systems that scale.</span>
        </motion.div>

        <motion.p variants={fadeUp} className="text-sm md:text-base text-t-fg-m/60 max-w-xl leading-relaxed mb-10 font-sans">
          5+ years shipping production software across enterprise platforms, cloud-native infrastructure, and AI-driven applications — from startup velocity to Fortune 500 reliability.
        </motion.p>

        {/* CTA buttons */}
        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-t-accent text-white text-[10px] font-mono font-bold uppercase tracking-[0.2em] shadow-xl shadow-t-accent/20 hover:shadow-2xl hover:shadow-t-accent/30 hover:scale-[1.03] transition-all duration-300"
          >
            <span>Connect on LinkedIn</span>
            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl border-2 border-t-border/40 text-t-fg text-[10px] font-mono font-bold uppercase tracking-[0.2em] hover:border-t-accent/50 hover:text-t-accent hover:bg-t-accent/5 hover:scale-[1.03] transition-all duration-300"
          >
            <span>View GitHub</span>
            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </motion.div>

        {/* ═══════════════════ CREDIBILITY BAR ═══════════════════ */}
        <motion.div variants={stagger} className="w-full max-w-4xl mx-auto px-4">
          {/* Metrics row */}
          <motion.div variants={stagger} className="flex flex-wrap items-center justify-center gap-3 md:gap-5 mb-8">
            <MetricPill value="5+" label="Years Exp" />
            <MetricPill value={`${techCount}+`} label="Technologies" />
            <MetricPill value="12+" label="Projects Shipped" />
            <MetricPill value="3" label="Cloud Platforms" />
          </motion.div>

          {/* Companies */}
          <motion.div variants={fadeUp} className="flex flex-col items-center gap-3">
            <span className="text-[8px] font-mono font-bold uppercase tracking-[0.35em] text-t-fg-m/40">
              Previously At
            </span>
            <motion.div variants={stagger} className="flex flex-wrap items-center justify-center gap-2.5">
              <CompanyBadge name="Citadel" />
              <CompanyBadge name="CVS Health" />
              <CompanyBadge name="Mphasis" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ═══════════════════ DIVIDER ═══════════════════ */}
      <div className="w-full max-w-5xl mx-auto px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-t-border/60 to-transparent" />
      </div>

      {/* ═══════════════════ CHAPTERS ═══════════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8"
      >
        {/* Section header */}
        <header className="text-center mb-14">
          <span className="inline-block text-[9px] font-mono font-bold uppercase tracking-[0.35em] text-t-accent mb-4">
            Portfolio Chapters
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-t-fg tracking-tight mb-4">
            Choose Your Chapter
          </h2>
          <p className="text-sm md:text-base text-t-fg-m/60 max-w-lg mx-auto">
            Six deep dives into engineering, design, and everything in between.
          </p>
        </header>

        {/* Chapter grid */}
        <ChapterCardGrid />
      </motion.section>
    </main>
  );
}
