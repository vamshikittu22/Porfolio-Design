
// Fix: Added InsightType for categorized architecture field notes
export type InsightType = 'optimization' | 'challenge' | 'solution' | 'metric';

// Fix: Defined Insight interface to support structured technical commentary
export interface Insight {
  type: InsightType;
  title: string;
  description: string;
}

export interface TechItem {
  name: string;
  reason: string;
}

export interface Challenge {
  problem: string;
  solution: string;
  outcome: string;
}

export interface Metric {
  label: string;
  value: string;
}

export interface CodeSnippet {
  title: string;
  filename?: string;
  lang: string;
  code: string;
  highlightLines?: number[];
  sandboxUrl?: string;
}

/**
 * Fix: Narrowed type to allowed GlassCard accent literals to resolve TypeScript 
 * assignment errors when passing chapter.color to component props.
 */
export type CaseStudyColor = 'indigo' | 'emerald' | 'rose' | 'amber' | 'purple' | 'cyan' | 'orange' | 'slate' | 'white' | 'dark' | 'theme' | 'secondary';

export interface CaseStudyChapter {
  id: string;
  visualId: string;
  title: string;
  subtitle: string;
  introLabel: string; // Added to support "PROTOCOL 01: Name" style
  // Fix: Narrowed color from string to CaseStudyColor union to satisfy component prop requirements
  color: CaseStudyColor;
  content: {
    purpose: string;
    visualDescription: string;
    techStack: TechItem[];
    architecture: string;
    coreLogic: string;
    features: string[];
    challenges: Challenge[];
    metrics: Metric[];
    code: CodeSnippet;
    // Fix: Integrated insights property into chapter content to resolve missing property errors in Data and View components
    insights?: Insight[];
  };
}
