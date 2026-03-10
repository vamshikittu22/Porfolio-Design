import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChapterCardGrid } from '../components/cards/ChapterCardGrid';
import { useNavigation } from '../../contexts/NavigationContext';
import {
  FULL_NAME,
  LINKEDIN_URL,
  GITHUB_USERNAME,
  SKILLS_RESUME,
} from '../../config/constants';
import { getAllBadges, type BadgeHighlight } from '../../data/badges';

/* ─────────────────────── animation config ─────────────────────── */
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/* ─────────────────────── sub-components ─────────────────────── */

/** Rotating role titles in the hero */
const ROLES = [
  'Software Engineer',
  'Full-Stack Architect',
  'Cloud & DevOps Engineer',
  'AI/ML Integrator',
];

function BadgeSpotlightCard({ badge }: { badge: BadgeHighlight }) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.05 }}
      className="flex flex-col items-center gap-3 p-4 rounded-2xl border border-t-border/40 bg-t-bg-el/60 backdrop-blur-xl min-w-[150px] group transition-all duration-300"
    >
      <div className="w-14 h-14 flex-shrink-0 relative">
        <div className="absolute inset-0 bg-t-accent/10 rounded-full blur-xl group-hover:bg-t-accent/20 transition-colors" />
        <img
          src={badge.image}
          alt={badge.title}
          className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(var(--color-accent-rgb),0.3)]"
          loading="lazy"
        />
      </div>
      <div className="text-center">
        <span className="block text-[7.5px] font-mono uppercase tracking-[0.2em] text-t-accent/60 mb-0.5">{badge.issuer}</span>
        <h3 className="text-[9px] font-black uppercase tracking-wider text-t-fg leading-tight max-w-[120px] line-clamp-2">{badge.title}</h3>
      </div>
    </motion.div>
  );
}

function CredentialMarquee() {
  const allBadges = getAllBadges();
  // Duplicate triple times to ensure enough items for continuous scroll
  const marqueeItems = [...allBadges, ...allBadges, ...allBadges];

  return (
    <div className="relative w-full overflow-hidden py-10">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-t-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-t-bg to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-4 w-max"
        animate={{
          x: ["0%", "-33.333%"]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 40,
            ease: "linear",
          },
        }}
        style={{ willChange: "transform" }}
      >
        {marqueeItems.map((badge, idx) => (
          <BadgeSpotlightCard key={`${badge.id}-${idx}`} badge={badge} />
        ))}
      </motion.div>
    </div>
  );
}

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
  const { navigateToChapter } = useNavigation();

  return (
    <main
      className="min-h-[100dvh] w-full bg-t-bg flex flex-col"
      role="main"
      aria-label="Portfolio landing page"
    >
      {/* ═══════════════════ HERO WELCOME ═══════════════════ */}
      <motion.section
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative pt-12 pb-16 lg:pb-32 overflow-hidden flex-1 flex flex-col justify-center"
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

        <div className="w-full max-w-[min(1600px,94vw)] mx-auto px-6 relative z-20 flex flex-col items-center text-center">

          {/* Status badge */}
          <motion.div variants={fadeUp} className="mb-8">
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-t-border/40 bg-t-bg-el/80 backdrop-blur-xl shadow-lg">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-[clamp(8px,1vw,10px)] font-mono font-bold uppercase tracking-[0.25em] text-t-fg-m">
                Open to Opportunities
              </span>
            </div>
          </motion.div>

          {/* Name + rotating role - FLUID TYPOGRAPHY */}
          <motion.h1
            variants={fadeUp}
            className="text-[clamp(2.5rem,10vw,8rem)] font-black font-heading tracking-tight text-t-fg leading-[0.9] mb-8"
          >
            Hi, I'm {firstName}
            <span className="text-t-accent">.</span>
          </motion.h1>

          <motion.div
            variants={fadeUp}
            className="text-[clamp(1.1rem,3vw,2.5rem)] font-heading font-semibold leading-tight max-w-[min(1000px,90vw)] mb-6 w-full"
          >
            <RotatingRole />
            <span className="block text-t-fg-m/60 mt-1">building systems that scale.</span>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="text-[clamp(0.875rem,1.2vw,1.1rem)] text-t-fg-m/60 max-w-[clamp(400px,50vw,700px)] leading-relaxed mb-12 font-sans"
          >
            5+ years shipping production software across enterprise platforms, cloud-native infrastructure, and AI-driven applications — from startup velocity to Fortune 500 reliability.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg mb-16 px-4">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-t-accent text-white text-[11px] font-mono font-bold uppercase tracking-[0.2em] shadow-xl shadow-t-accent/20 hover:shadow-2xl hover:shadow-t-accent/30 hover:scale-[1.03] transition-all duration-300"
            >
              <span>LinkedIn</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
            </a>
            <button
              onClick={() => navigateToChapter('06-connection')}
              className="group flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl border-2 border-t-border/40 text-t-fg text-[11px] font-mono font-bold uppercase tracking-[0.2em] hover:border-t-accent/50 hover:text-t-accent hover:bg-t-accent/5 hover:scale-[1.03] transition-all duration-300"
            >
              <span>Connect Me</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
            </button>
            <button
              onClick={() => navigateToChapter('03-journey')}
              className="group flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-t-bg-el/60 backdrop-blur-xl border border-t-border/40 text-t-fg text-[11px] font-mono font-bold uppercase tracking-[0.2em] hover:scale-[1.03] transition-all duration-300 shadow-xl"
            >
              <span>Experience</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
            </button>
            <a
              href="/assets/downloads/Vamshi_Krishna_Resume.pdf"
              download="Vamshi_Krishna_Resume.pdf"
              className="group flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[11px] font-mono font-bold uppercase tracking-[0.2em] hover:bg-emerald-500/20 hover:scale-[1.03] transition-all duration-300"
            >
              <span>Download CV</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
            </a>
          </motion.div>

          {/* ═══════════════════ CREDIBILITY BAR ═══════════════════ */}
          <div className="w-full flex flex-col items-center">
            {/* Metrics row */}
            <motion.div variants={stagger} className="flex flex-wrap items-center justify-center gap-4 mb-10">
              <MetricPill value="5+" label="Years Exp" />
              <MetricPill value={`${techCount}+`} label="Technologies" />
              <MetricPill value="12+" label="Projects" />
            </motion.div>

            {/* Companies */}
            <motion.div variants={fadeUp} className="flex flex-col items-center gap-4">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-t-fg-m/40">
                Previously At
              </span>
              <motion.div variants={stagger} className="flex flex-wrap items-center justify-center gap-4">
                <CompanyBadge name="Citadel" />
                <CompanyBadge name="CVS Health" />
                <CompanyBadge name="Mphasis" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Badge preview marquee - FULL WIDTH TREATMENT */}
        <motion.div
          variants={stagger}
          className="w-full mt-24 bg-t-fg/[0.02] dark:bg-white/[0.02] border-y border-t-border/10"
        >
          <div className="max-w-[min(1400px,94vw)] mx-auto px-4 md:px-8 text-center pt-8">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-t-accent mb-1 inline-block">
              ENGINEERING CREDENTIALS
            </span>
          </div>
          <CredentialMarquee />
        </motion.div>
      </motion.section>

      {/* ═══════════════════ DIVIDER ═══════════════════ */}
      <div className="w-full max-w-[min(1400px,90vw)] mx-auto px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-t-border/60 to-transparent" />
      </div>

      {/* ═══════════════════ CHAPTERS ═══════════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[min(1440px,94vw)] mx-auto px-4 py-24 sm:px-6 lg:px-8"
      >
        {/* Section header */}
        <header className="text-center mb-16">
          <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-t-accent mb-4">
            Portfolio Chapters
          </span>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black font-heading text-t-fg tracking-tight mb-4">
            Choose Your Chapter
          </h2>
          <p className="text-[clamp(0.875rem,1.1vw,1.1rem)] text-t-fg-m/60 max-w-lg mx-auto">
            Six deep dives into engineering, design, and everything in between.
          </p>
        </header>

        {/* Chapter grid */}
        <ChapterCardGrid />
      </motion.section>
    </main>
  );
}
