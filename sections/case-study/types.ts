
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

export interface CaseStudyChapter {
  id: string;
  visualId: string;
  title: string;
  subtitle: string;
  color: 'indigo' | 'emerald' | 'rose' | 'amber' | 'purple' | 'cyan';
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
  };
}
