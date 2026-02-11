import React, { useState, useEffect, useCallback } from 'react';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { AboutHeader } from '../../components/about/AboutHeader';
import { SkillMatrix } from '../../components/about/SkillMatrix';
import { SkillBrief } from '../../components/about/SkillBrief';

// --- RICH SKILL DATA & ICON MAPPING ---
const ICON_MAP: Record<string, string> = {
  // Languages
  'Java (8-17)': 'java',
  'Core Java': 'corejava',
  'Python': 'python',
  'JavaScript': 'javascript',
  'TypeScript': 'typescript',
  'C#': 'csharp',
  'SQL': 'sql',
  'PHP': 'php',
  'HTML5': 'html5',
  'CSS3': 'css3',
  'C': 'c',

  // Frameworks
  'Spring Boot': 'springboot',
  'Spring Framework': 'spring',
  'Node.js': 'nodejs',
  'React.js': 'react',
  'Angular': 'angular',
  'Vue.js': 'vuejs',
  '.NET Core': 'dotnetcore',
  '.NET': 'dotnet',

  // Backend & APIs
  'RESTful APIs': 'restapi',
  'Microservices Architecture': 'microservices',
  'GraphQL': 'graphql',
  'Event-Driven Systems': 'eventdriven',
  'Apache Kafka': 'apachekafka',
  'Apache Pulsar': 'apachepulsar',
  'Kafka': 'kafka',
  'Hibernate': 'hibernate',
  'JPA': 'jpa',
  'JDBC': 'jdbc',

  // Databases & Data
  'Oracle': 'oracle',
  'MySQL': 'mysql',
  'PostgreSQL': 'postgresql',
  'DynamoDB': 'dynamodb',
  'BigQuery': 'bigquery',
  'SQL Server': 'microsoftsqlserver',
  'Data Modeling': 'datamodeling',
  'Data Warehousing': 'datawarehousing',
  'MongoDB': 'mongodb',

  // Cloud & Infra
  'AWS (EC2/ECS/EKS/Lambda)': 'amazonwebservices',
  'Google Cloud (GCP)': 'googlecloud',
  'Azure (AKS/Functions)': 'azure',
  'Docker': 'docker',
  'Kubernetes': 'kubernetes',
  'Cloud Computing': 'cloudcomputing',
  'Distributed Systems': 'distributedsystems',

  // DevOps & Ops
  'CI/CD': 'cicd',
  'Jenkins': 'jenkins',
  'GitHub Actions': 'githubactions',
  'Terraform': 'terraform',
  'Monitoring': 'monitoring',
  'Observability': 'observability',
  'CloudWatch': 'cloudwatch',
  'Azure Monitor': 'azuremonitor',

  // Testing & Quality
  'JUnit': 'junit',
  'Mockito': 'mockito',
  'Integration Testing': 'testing',
  'Test-Driven Development': 'tdd',
  'Code Reviews': 'codereview',
  'Postman': 'postman',

  // Tools & Collab
  'Git': 'git',
  'GitHub': 'github',
  'Maven': 'maven',
  'Gradle': 'gradle',
  'SonarQube': 'sonarqube',
  'JIRA': 'jira',
  'Confluence': 'confluence',

  // AI & Analytics
  'OpenAI API': 'openai',
  'LLM Integration': 'llmintegration',
  'Python Pipelines': 'pythonpipelines',
  'Power BI': 'powerbi',
  'AI': 'ai',
  'Information Security': 'informationsecurity'
};

type Category = 'All' | 'Languages' | 'Frameworks' | 'Backend & APIs' | 'Data & DB' | 'Cloud & Infra' | 'DevOps & Ops' | 'Testing & Quality' | 'Tools & Collab' | 'AI & Analytics' | 'Coursework';

const CATEGORY_COLORS: Record<string, string> = {
  'Languages': 'purple',
  'Frameworks': 'cyan',
  'Backend & APIs': 'indigo',
  'Data & DB': 'blue',
  'Cloud & Infra': 'emerald',
  'DevOps & Ops': 'orange',
  'Testing & Quality': 'rose',
  'Tools & Collab': 'slate',
  'AI & Analytics': 'violet',
  'Coursework': 'amber'
};

export const AboutSection: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleHover = useCallback((name: string | null) => setHoveredSkill(name), []);
  const handleCategorySelect = useCallback((cat: string) => setSelectedCategory(cat as Category), []);

  if (!isMounted) return null;

  return (
    <section id="about-section" className="mb-[20rem] scroll-mt-32 relative">
      <ScrollReveal>
        <AboutHeader />

        <div className="w-full bg-[#050505] rounded-[40px] border border-white/5 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row min-h-[700px] lg:h-[900px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.05)_0%,rgba(5,5,5,1)_100%)] pointer-events-none z-10" />
          <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay z-0" />

          <SkillMatrix
            hoveredSkill={hoveredSkill}
            setHoveredSkill={handleHover}
            selectedCategory={selectedCategory}
            setSelectedCategory={handleCategorySelect}
            iconMap={ICON_MAP}
            categoryColors={CATEGORY_COLORS}
          />

          <div className="relative w-full lg:w-[28%] bg-white/[0.01] border-t lg:border-t-0 lg:border-l border-white/5 backdrop-blur-xl p-8 lg:p-12 flex flex-col justify-between z-20 min-h-[350px]">
            <div>
              <div className="flex flex-wrap gap-2 mb-10 justify-end lg:justify-start">
                {(['All', 'Languages', 'Frameworks', 'Backend & APIs', 'Data & DB', 'Cloud & Infra', 'DevOps & Ops', 'Testing & Quality', 'Tools & Collab', 'AI & Analytics', 'Coursework'] as Category[]).map(cat => (
                  <button key={cat} onClick={(e) => { e.stopPropagation(); setSelectedCategory(cat); }}
                    className={`px-3 py-1.5 rounded-lg text-[8px] font-mono font-black uppercase tracking-widest transition-all border ${selectedCategory === cat ? 'bg-t-accent text-t-bg border-t-accent shadow-[0_0_15px_rgba(var(--color-accent-rgb),0.3)]' : 'bg-transparent text-white/40 border-white/5 hover:border-white/20 hover:text-white'}`}>
                    {cat}
                  </button>
                ))}
              </div>

              <SkillBrief skillName={hoveredSkill} />
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default AboutSection;
