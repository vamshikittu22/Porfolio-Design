import React, { useState, useEffect } from 'react';
import { GlassCard } from '../../../components/ui/GlassUI';
import { GITHUB_USERNAME } from '../../../config/constants';
import { motion, AnimatePresence } from 'framer-motion';

// --- TYPES & INTERFACES ---
interface GithubUser {
  avatar_url: string;
  created_at: string;
  public_repos: number;
  followers: number;
  login: string;
}

interface YearStats {
  year: number;
  count: number;
}

interface FeaturedRepo {
  name: string;
  tagline: string;
  desc: string;
  stars: number;
  forks: number;
  updated: string;
  tech: string;
}

// --- CONFIGURATION ---

const FOCUS_REPOS: FeaturedRepo[] = [
  {
    name: 'Mini Metro Simulator',
    tagline: 'Technical Highlight',
    desc: 'A high-performance transit engine with hybrid pathfinding & Gemini AI optimization.',
    stars: 12,
    forks: 4,
    updated: '2d ago',
    tech: 'React 19 · TypeScript'
  },
  {
    name: 'Future Job Fit',
    tagline: 'Latest Work',
    desc: 'AI-assisted resume architect with neural content scoring and Swiss-grid layouts.',
    stars: 8,
    forks: 2,
    updated: '1w ago',
    tech: 'Gemini API · Node.js'
  },
  {
    name: 'Wanderlust Trails',
    tagline: 'Full Stack',
    desc: 'Global logistics platform with inventory sync and modular booking systems.',
    stars: 15,
    forks: 5,
    updated: '3w ago',
    tech: 'PHP · MySQL'
  }
];

const YEAR_NARRATIVES: Record<number, string> = {
  2026: "Future: Planning next-gen AI architectures and Gemini 3.0 integration experiments.",
  2025: "Active: Shipped 3 major features, achieved 200+ contributions, and integrated Gemini 2.5 Flash.",
  2024: "Academic: Completed Master's degree and architected the core Event Node Pro system.",
  2023: "Enterprise: Scaled backend services for Mphasis enterprise clients and optimized SQL layers."
};

const FALLBACK_STATS: YearStats[] = [
  { year: 2026, count: 32 },
  { year: 2025, count: 228 },
  { year: 2024, count: 14 }
];

const GitHubStats: React.FC = () => {
  // --- STATE ---
  const [user, setUser] = useState<GithubUser | null>(null);
  const [yearlyStats, setYearlyStats] = useState<YearStats[]>([]);
  const [latestActivityDate, setLatestActivityDate] = useState<string>("Syncing...");
  const [loading, setLoading] = useState(true);
  const [usingLiveData, setUsingLiveData] = useState(false);

  // Navigation State
  const [currentRepoIndex, setCurrentRepoIndex] = useState(0);
  const [selectedYear, setSelectedYear] = useState<number>(2025);
  const [hoveringHeader, setHoveringHeader] = useState(false);

  const username = GITHUB_USERNAME;

  // --- DATA FETCHING ---
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = process.env.GITHUB_TOKEN ||
          process.env.VITE_GITHUB_TOKEN ||
          process.env.REACT_APP_GITHUB_TOKEN;

        const headers: HeadersInit = {
          'Accept': 'application/vnd.github.v3+json',
        };

        if (token) {
          headers['Authorization'] = `bearer ${token}`;
        } else {
          throw new Error("No Token");
        }

        const userRes = await fetch(`https://api.github.com/users/${username}`, { headers });
        if (!userRes.ok) throw new Error('GitHub API Error: Profile');
        const userData = await userRes.json();
        setUser(userData);

        const query = {
          query: `
            query {
              user(login: "${username}") {
                y2026: contributionsCollection(from: "2026-01-01T00:00:00Z", to: "2026-12-31T23:59:59Z") {
                  contributionCalendar { totalContributions }
                }
                y2025: contributionsCollection(from: "2025-01-01T00:00:00Z", to: "2025-12-31T23:59:59Z") {
                  contributionCalendar { totalContributions }
                }
                y2024: contributionsCollection(from: "2024-01-01T00:00:00Z", to: "2024-12-31T23:59:59Z") {
                  contributionCalendar { totalContributions }
                }
              }
            }
          `
        };

        const graphRes = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            ...headers,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(query),
        });

        if (!graphRes.ok) throw new Error("GraphQL Error");

        const graphData = await graphRes.json();
        const userStats = graphData.data?.user;

        if (userStats) {
          const liveStats = [
            { year: 2026, count: userStats.y2026.contributionCalendar.totalContributions },
            { year: 2025, count: userStats.y2025.contributionCalendar.totalContributions },
            { year: 2024, count: userStats.y2024.contributionCalendar.totalContributions },
          ];
          setYearlyStats(liveStats);
          setUsingLiveData(true);
        } else {
          throw new Error("Invalid GraphQL Data");
        }

        const eventsRes = await fetch(`https://api.github.com/users/${username}/events/public`, { headers });
        if (eventsRes.ok) {
          const events = await eventsRes.json();
          const lastPush = events.find((e: any) => e.type === 'PushEvent');
          if (lastPush) {
            setLatestActivityDate(new Date(lastPush.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }));
          } else {
            setLatestActivityDate("08/05/2025");
          }
        }
      } catch (error) {
        setUser({
          avatar_url: `https://github.com/${username}.png`,
          login: username,
          public_repos: 23,
          followers: 12,
          created_at: "2019-01-01T00:00:00Z"
        });
        setYearlyStats(FALLBACK_STATS);
        setLatestActivityDate("08/05/2025");
        setUsingLiveData(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  const cycleRepo = (direction: 'next' | 'prev') => {
    setCurrentRepoIndex(prev => {
      if (direction === 'next') return (prev + 1) % FOCUS_REPOS.length;
      return (prev - 1 + FOCUS_REPOS.length) % FOCUS_REPOS.length;
    });
  };

  const currentRepo = FOCUS_REPOS[currentRepoIndex];

  return (
    <section id="github-section" className="mb-[40rem] scroll-mt-32 print:hidden perspective-[2000px]">
      <motion.div
        animate={hoveringHeader ? { rotateX: 1, scale: 1.005 } : { rotateX: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="w-full"
      >
        <GlassCard className="p-0 overflow-hidden border-t-border bg-t-bg-el/40 backdrop-blur-3xl shadow-2xl relative flex flex-col" accent="theme">

          {/* HEADER STRIP */}
          <div
            className="flex flex-col md:flex-row items-start md:items-center justify-between px-6 py-5 border-b border-t-border/50 bg-t-bg/40 gap-4"
            onMouseEnter={() => setHoveringHeader(true)}
            onMouseLeave={() => setHoveringHeader(false)}
          >
            <div className="flex items-center gap-4">
              <div className="relative group/avatar">
                <div className="absolute -inset-1 rounded-xl bg-t-accent opacity-0 group-hover/avatar:opacity-30 transition-opacity blur-md" />
                <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-t-border shadow-sm bg-t-bg">
                  <img
                    src={user?.avatar_url}
                    loading="lazy"
                    className="w-full h-full object-cover transition-all duration-700 blur-sm"
                    onLoad={(e) => e.currentTarget.classList.remove('blur-sm')}
                    alt="Avatar"
                  />
                </div>
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-t-bg-el animate-pulse shadow-sm ${usingLiveData ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black text-t-fg tracking-tight">@{user?.login || username}</h3>
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase border ${usingLiveData ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>
                    {usingLiveData ? 'Live Data' : 'Cached Data'}
                  </span>
                </div>
                <p className="text-[9px] font-bold text-t-fg-m uppercase tracking-widest opacity-60">
                  {usingLiveData ? 'Open Source Profile' : 'Historical Data Overview'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 items-center">
              <div className="flex flex-col items-end">
                <span className="text-[7px] font-bold uppercase tracking-wider text-t-fg-m opacity-60">Projects</span>
                <span className="text-xs font-black text-t-fg">{user?.public_repos || 0}</span>
              </div>
              <div className="w-px h-6 bg-t-border opacity-50 hidden md:block" />
              <div className="flex flex-col items-end">
                <span className="text-[7px] font-bold uppercase tracking-wider text-t-fg-m opacity-60">Joined</span>
                <span className="text-xs font-black text-t-fg">{new Date(user?.created_at || Date.now()).getFullYear()}</span>
              </div>
              <div className="w-px h-6 bg-t-border opacity-50 hidden md:block" />
              <div className="flex flex-col items-end">
                <span className="text-[7px] font-bold uppercase tracking-wider text-t-fg-m opacity-60">Latest Activity</span>
                <span className="text-xs font-black text-t-fg">{latestActivityDate}</span>
              </div>
              <div className="w-px h-6 bg-t-border opacity-50 hidden md:block" />
              <div className="flex flex-col items-end">
                <span className="text-[7px] font-bold uppercase tracking-wider text-t-fg-m opacity-40">Data As Of</span>
                <span className="text-[10px] font-black text-t-fg-m opacity-60">Feb 2026</span>
              </div>
            </div>
          </div>

          {/* ACTIVITY ROW */}
          <div className="px-6 py-4 border-b border-t-border/50 bg-t-bg-el/20 flex flex-col md:flex-row gap-6 items-center">
            <div className="flex items-center gap-3 min-w-fit">
              <div className="w-1.5 h-1.5 rounded-full bg-t-accent animate-ping" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-t-accent">
                Recent Contributions
              </span>
            </div>

            <div className="flex items-end gap-1.5 h-8 flex-1 w-full justify-start md:justify-center overflow-hidden mask-linear-fade relative">
              <div className="absolute inset-0 z-10 hover:bg-transparent" title="Recent activity intensity" />

              {Array.from({ length: 24 }).map((_, i) => {
                const heightBase = 20 + Math.random() * 60;
                const isHigh = heightBase > 70;
                const isMedium = heightBase > 40 && heightBase <= 70;

                let colorClass = 'bg-t-fg-m/20';
                if (isMedium) colorClass = 'bg-t-accent/60';
                if (isHigh) colorClass = 'bg-t-accent-2 shadow-[0_0_8px_rgba(var(--color-accent-secondary-rgb),0.5)]';

                return (
                  <motion.div
                    key={i}
                    initial={{ height: `${heightBase}%` }}
                    animate={{
                      height: [`${heightBase}%`, `${Math.max(15, heightBase + (Math.random() * 30 - 15))}%`, `${heightBase}%`],
                    }}
                    transition={{
                      duration: 1.5 + Math.random(),
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.05
                    }}
                    className={`w-2 md:w-3 rounded-t-sm transition-colors duration-500 ${colorClass}`}
                  />
                );
              })}
            </div>
          </div>

          {/* FEATURED PROJECT ROW */}
          <div className="relative p-8 md:p-10 min-h-[260px] flex items-center bg-gradient-to-b from-transparent to-t-bg/10">
            <div className="absolute inset-0 z-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-t-accent/10 blur-[80px] rounded-full" />
            </div>

            <div className="w-full relative z-10 flex items-center gap-4 md:gap-8">
              <button
                onClick={() => cycleRepo('prev')}
                className="hidden md:flex w-10 h-10 rounded-full border border-t-border bg-t-bg-el/50 items-center justify-center hover:bg-t-accent hover:text-t-bg transition-all"
              >
                <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
              </button>

              <div className="flex-1 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentRepoIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-5"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-2 py-1 rounded text-[8px] font-black uppercase bg-t-accent/10 text-t-accent border border-t-accent/20">
                        Featured Project: {currentRepo.tagline}
                      </span>
                      <span className="text-[8px] font-bold uppercase text-t-fg-m tracking-widest">
                        {currentRepo.tech}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-3xl md:text-5xl font-black text-t-fg uppercase tracking-tight mb-2 leading-none">
                        {currentRepo.name}
                      </h3>
                      <p className="text-base md:text-lg text-t-fg-m font-medium italic max-w-2xl leading-relaxed">
                        "{currentRepo.desc}"
                      </p>
                    </div>

                    <div className="flex items-center gap-8 pt-3 border-t border-t-border/30 w-fit pr-10">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-t-accent-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" /></svg>
                        <div className="flex flex-col">
                          <span className="text-[8px] font-bold uppercase text-t-fg-m opacity-60 leading-none">Stars</span>
                          <span className="text-sm font-black text-t-fg leading-none">{currentRepo.stars}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-t-fg-m" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 5.5c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm0 4c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm6 5.5c0 1.104-.896 2-2 2s-2-.896-2-2 .896-2 2-2 2 .896 2 2zm0-4c0 1.104-.896 2-2 2s-2-.896-2-2 .896-2 2-2 2 .896 2 2z" /></svg>
                        <div className="flex flex-col">
                          <span className="text-[8px] font-bold uppercase text-t-fg-m opacity-60 leading-none">Forks</span>
                          <span className="text-sm font-black text-t-fg leading-none">{currentRepo.forks}</span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] font-bold uppercase text-t-fg-m opacity-60 leading-none">Updated</span>
                        <span className="text-xs font-black text-t-fg leading-none mt-0.5">{currentRepo.updated}</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <button
                onClick={() => cycleRepo('next')}
                className="hidden md:flex w-10 h-10 rounded-full border border-t-border bg-t-bg-el/50 items-center justify-center hover:bg-t-accent hover:text-t-bg transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>

          {/* TIMELINE ROW */}
          <div className="px-6 py-8 border-y border-t-border/50 bg-t-bg-el/30 flex flex-col items-center gap-6">
            <div className="flex flex-wrap justify-center gap-3">
              {loading ? (
                [2026, 2025, 2024].map(y => <div key={y} className="w-32 h-10 bg-t-fg/5 rounded-full animate-pulse" />)
              ) : (
                yearlyStats.map(stat => (
                  <button
                    key={stat.year}
                    onClick={() => setSelectedYear(stat.year)}
                    className={`
                         group relative pl-4 pr-5 py-2 rounded-full border transition-all duration-300 flex items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-t-accent
                         ${selectedYear === stat.year
                        ? 'bg-t-accent text-t-bg border-t-accent shadow-lg scale-105'
                        : 'bg-t-bg-el border-t-border text-t-fg hover:border-t-accent/50 hover:scale-105'}
                       `}
                  >
                    <span className="text-[10px] font-black uppercase tracking-wider">{stat.year}</span>
                    <div className={`w-px h-3 ${selectedYear === stat.year ? 'bg-t-bg/40' : 'bg-t-border'}`} />
                    <span className="text-sm font-black font-display">{stat.count}</span>
                    <span className={`text-[8px] font-bold uppercase opacity-60 ${selectedYear === stat.year ? 'text-t-bg' : 'text-t-fg-m'}`}>Contributions</span>
                  </button>
                ))
              )}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedYear}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-center max-w-3xl px-4"
              >
                <p className="text-[10px] md:text-xs font-bold text-t-fg-m uppercase tracking-[0.15em] leading-relaxed">
                  {YEAR_NARRATIVES[selectedYear] || "View activity for this year."}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CTA ROW */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-t-border/50">
            <button
              onClick={() => window.open(`https://github.com/${username}`, '_blank')}
              className="group relative p-6 hover:bg-t-bg-el/60 transition-colors flex flex-col items-center justify-center gap-2"
            >
              <div className="transform group-hover:scale-105 transition-transform duration-300 flex items-center gap-3">
                <span className="text-lg font-black font-display text-t-fg uppercase">Open Source Profile</span>
                <svg className="w-5 h-5 text-t-fg group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7M5 12h16" /></svg>
              </div>
              <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-t-fg-m opacity-50">
                Full Project List
              </span>
            </button>

            <button
              onClick={() => window.open(`https://github.com/${username}?tab=repositories`, '_blank')}
              className="group relative p-6 hover:bg-t-bg-el/60 transition-colors flex flex-col items-center justify-center gap-2"
            >
              <div className="transform group-hover:scale-105 transition-transform duration-300 flex items-center gap-3">
                <span className="text-lg font-black font-display text-t-fg uppercase">Activity Dashboard</span>
                <svg className="w-5 h-5 text-t-fg group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7M5 12h16" /></svg>
              </div>
              <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-t-fg-m opacity-50">
                Detailed contribution stats
              </span>
            </button>
          </div>

        </GlassCard>
      </motion.div>
    </section>
  );
};

export default GitHubStats;