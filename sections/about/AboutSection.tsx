import React, { useState, useMemo, useEffect } from 'react';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { SKILLS_RESUME } from '../../config/constants';
import { AnimatePresence, motion } from 'framer-motion';

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

import { SkillBrief } from '../../components/about/SkillBrief';
import { getSkillSpec } from '../../config/skillSpecs';

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

  const bubbleData = useMemo(() => {
    const getIconUrl = (name: string) => {
      const slug = ICON_MAP[name] || name.toLowerCase().replace(/[^a-z0-9]/g, '');
      // Use local static icons instead of CDN
      return `/icons/${slug}.svg`;
    };

    const items = [
      ...SKILLS_RESUME.languages.map(s => ({ name: s as string, cat: 'Languages', icon: getIconUrl(s as string) })),
      ...SKILLS_RESUME.frameworks.map(s => ({ name: s as string, cat: 'Frameworks', icon: getIconUrl(s as string) })),
      ...SKILLS_RESUME.backend_apis.map(s => ({ name: s as string, cat: 'Backend & APIs', icon: getIconUrl(s as string) })),
      ...SKILLS_RESUME.data_db.map(s => ({ name: s as string, cat: 'Data & DB', icon: getIconUrl(s as string) })),
      ...SKILLS_RESUME.cloud_infra.map(s => ({ name: s as string, cat: 'Cloud & Infra', icon: getIconUrl(s as string) })),
      ...SKILLS_RESUME.devops_ops.map(s => ({ name: s as string, cat: 'DevOps & Ops', icon: getIconUrl(s as string) })),
      ...SKILLS_RESUME.testing_quality.map(s => ({ name: s as string, cat: 'Testing & Quality', icon: getIconUrl(s as string) })),
      ...SKILLS_RESUME.tools_collab.map(s => ({ name: s as string, cat: 'Tools & Collab', icon: getIconUrl(s as string) })),
      ...SKILLS_RESUME.ai_analytics.map(s => ({ name: s as string, cat: 'AI & Analytics', icon: getIconUrl(s as string) })),
      ...SKILLS_RESUME.coursework.map(s => ({ name: s as string, cat: 'Coursework', icon: getIconUrl(s as string) }))
    ];

    const shuffled = [...items].sort(() => Math.random() - 0.5);
    const cols = 8;
    const rows = Math.ceil(shuffled.length / cols);

    return shuffled.map((item, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const jitterX = Math.random() * 12 - 6;
      const jitterY = Math.random() * 12 - 6;

      const left = (col * (100 / cols) + (100 / cols / 2)) + jitterX;
      const top = (row * (100 / rows) + (100 / rows / 2)) + jitterY;

      return {
        ...item,
        left: `${Math.max(5, Math.min(95, left))}%`,
        top: `${Math.max(5, Math.min(95, top))}%`,
        duration: 5 + Math.random() * 5,
        delay: Math.random() * -5,
        floatX: Math.random() * 12 - 6,
        floatY: Math.random() * 12 - 6,
        color: CATEGORY_COLORS[item.cat as keyof typeof CATEGORY_COLORS] || 'gray'
      };
    });
  }, []);

  return (
    <section id="about-section" className="mb-[20rem] scroll-mt-32 relative">
      <ScrollReveal>
        <div className="flex flex-col gap-6 mb-16 px-4 lg:px-0">
          <div className="flex flex-col gap-4">
            <div className="h-px w-20 bg-t-accent" />
            <span className="text-[10px] font-black uppercase tracking-[1em] text-t-accent">About Me</span>
          </div>
          <h2 className="text-6xl lg:text-8xl font-black font-display text-t-fg uppercase tracking-tighter leading-[0.85]">
            Executive <br /> <span className="text-t-fg-m opacity-40">Profile.</span>
          </h2>
          <div className="space-y-8 border-l-4 border-t-accent/20 pl-10 py-4 max-w-4xl">
            <p className="text-xl lg:text-2xl text-t-fg font-medium leading-relaxed italic">
              "Full Stack Software Engineer with 5+ years of experience building scalable, secure enterprise applications across healthcare, financial services, and banking domains."
            </p>
            <p className="text-base lg:text-lg text-t-fg-m leading-relaxed opacity-90">
              I specialize in Java/Spring Boot microservices and modern frontend architectures using Angular, React, and Vue.js. Currently at CVS Health, I engineer REST and GraphQL APIs for claims processing workflows while integrating AI-assisted analytics using OpenAI APIs. My experience spans from low-latency trading systems at Citadel to digital banking modernization at Mphasis, with a focus on cloud-native deployments, event-driven architectures, and secure authentication using OAuth 2.0 and JWT.
            </p>
            <p className="text-base lg:text-lg text-t-fg-m leading-relaxed opacity-90">
              I'm passionate about building scalable systems that solve real business problems, whether it's reducing manual review effort through AI automation or optimizing API response times through efficient database design. I'm seeking senior engineering roles where I can leverage my full-stack expertise and cloud architecture experience to drive impactful solutions. Open to opportunities nationwide and excited to contribute to innovative teams building the next generation of enterprise applications.
            </p>
          </div>
        </div>

        <div className="w-full bg-[#050505] rounded-[40px] border border-white/5 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row min-h-[700px] lg:h-[900px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.05)_0%,rgba(5,5,5,1)_100%)] pointer-events-none z-10" />
          <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay z-0" />

          <div className="relative w-full lg:w-[72%] h-[550px] lg:h-full overflow-hidden group/matrix cursor-pointer" onClick={() => { setSelectedCategory('All'); setHoveredSkill(null); }}>
            {isMounted && bubbleData.map((item) => {
              const isHovered = hoveredSkill === item.name;
              const isFreeMode = selectedCategory === 'All';
              const isInSelectedCategory = selectedCategory === item.cat;
              let targetScale = isHovered ? 1.3 : (!isFreeMode && isInSelectedCategory ? 1.15 : (!isFreeMode ? 0.75 : 1));
              let targetOpacity = isHovered ? 1 : (!isFreeMode && isInSelectedCategory ? 1 : (!isFreeMode ? 0.2 : 0.6));
              return (
                <motion.button key={item.name} initial={{ scale: 0, opacity: 0 }}
                  animate={{ x: [0, item.floatX * 1.5, 0], y: [0, item.floatY * 1.5, 0], scale: targetScale, opacity: targetOpacity }}
                  transition={{
                    x: { duration: item.duration * 1.2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: item.delay },
                    y: { duration: item.duration * 1.2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: item.delay },
                    scale: { duration: 0.4 }, opacity: { duration: 0.4 }
                  }}
                  style={{ left: item.left, top: item.top, position: 'absolute' }}
                  onMouseEnter={() => setHoveredSkill(item.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  onClick={(e) => { e.stopPropagation(); setSelectedCategory(item.cat as Category); }}
                  className="w-10 h-10 lg:w-14 lg:h-14 flex items-center justify-center rounded-2xl outline-none"
                >
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 backdrop-blur-[4px] shadow-[0_8px_16px_rgba(0,0,0,0.8)] transition-all duration-500 ${(isHovered || (!isFreeMode && isInSelectedCategory)) ? `bg-white/15 border-white/30` : 'hover:bg-white/10'}`} />
                  <img
                    src={item.icon}
                    alt={item.name}
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"%3E%3Cpath d="M16 18L22 12L16 6M8 6L2 12L8 18"/%3E%3C/svg%3E';
                    }}
                    className={`relative w-[60%] h-[60%] object-contain drop-shadow-lg transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}
                  />
                </motion.button>
              );
            })}
          </div>

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