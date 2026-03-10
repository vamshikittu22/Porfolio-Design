import { motion } from 'framer-motion';
import { BADGES } from '../../data/badges';

const container = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.12 } },
};

const card = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function BadgeHighlights() {
  return (
    <section className="glass-panel border border-t-border/40 rounded-3xl p-8 space-y-6">
      <div className="flex flex-col gap-3">
        <p className="text-[10px] font-mono font-bold uppercase tracking-[0.35em] text-t-accent">
          Credentials
        </p>
        <div>
          <h2 className="text-3xl font-black text-t-fg">Proof that I walk the talk</h2>
          <p className="text-sm text-t-fg-m/70 mt-2 max-w-2xl">
            Cloud + AI badges aren’t vanity trophies—they reflect active playbooks I apply across the Builder chapter’s projects.
            Each credential links to issuer verification, core skills, and the impact it unlocked.
          </p>
        </div>
      </div>

      <motion.div
        className="grid gap-4 md:grid-cols-2"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {BADGES.map(badge => (
          <motion.article
            key={badge.id}
            variants={card}
            className="glass-card border border-t-border/30 rounded-2xl p-6 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-t-accent-2">{badge.issuer}</p>
                <h3 className="text-xl font-semibold text-t-fg mt-1">{badge.title}</h3>
              </div>
              <span className="text-[10px] font-mono text-t-fg-m/60">{new Date(badge.issuedOn).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
            </div>
            <p className="text-sm text-t-fg-m/70 leading-relaxed">{badge.summary}</p>
            <div className="flex flex-wrap gap-2 text-[11px] font-mono text-t-accent/80">
              {badge.skills.map(skill => (
                <span key={skill} className="px-3 py-1 rounded-full bg-t-accent/10 border border-t-accent/30">{skill}</span>
              ))}
            </div>
            <a
              href={badge.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-t-accent hover:text-t-accent-2 transition-colors"
            >
              Verify badge
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.2}>
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
