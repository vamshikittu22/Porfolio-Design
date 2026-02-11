export interface SkillSpec {
    role: string;
    usedIn: string;
    exp: string;
    desc: string;
    strength: string;
}

export const SKILL_SPECIFICATIONS: Record<string, SkillSpec> = {
    // Languages
    'Java (8-17)': {
        role: 'Primary Backend Language',
        usedIn: 'CVS Health, Citadel, Mphasis',
        exp: '5+ Years',
        desc: 'Main language for high-performance microservices and enterprise legacy modernization.',
        strength: 'Concurrency & JVM Tuning'
    },
    'Python': {
        role: 'Scripts & Data Analysis',
        usedIn: 'CVS Health (Automation), Personal Projects',
        exp: '3 Years',
        desc: 'Used for building data pipelines, AI integrations, and backend automation tools.',
        strength: 'Automation & AI Libraries'
    },
    'JavaScript': {
        role: 'Frontend & Backend Development',
        usedIn: 'CVS Health, citadel, Zions Bank',
        exp: '5 Years',
        desc: 'Core language for building interactive UIs and Node.js backend services.',
        strength: 'ES6+ & Async Patterns'
    },
    'TypeScript': {
        role: 'Type-Safe Web Apps',
        usedIn: 'CVS Health, Personal Projects',
        exp: '3 Years',
        desc: 'Leveraged for large-scale enterprise frontends to ensure code quality and maintainability.',
        strength: 'Static Typing & Scalability'
    },
    'C#': {
        role: 'Full Stack Service Development',
        usedIn: 'Zions Bank, Enterprise Portals',
        exp: '3 Years',
        desc: 'Used for building robust Web API services and enterprise backend logic.',
        strength: 'LINQ & Entity Framework'
    },
    'SQL': {
        role: 'Database Management',
        usedIn: 'All Professional Projects',
        exp: '5+ Years',
        desc: 'Expertise in complex query optimization, schema design, and stored procedures.',
        strength: 'Optimization & Data Integrity'
    },

    // Frameworks
    'Spring Boot': {
        role: 'Backend Microservices',
        usedIn: 'CVS Health, Citadel, Mphasis',
        exp: '4+ Years',
        desc: 'Primary framework for building scalable REST/GraphQL APIs and cloud-native apps.',
        strength: 'Auto Configuration & Cloud Native'
    },
    'Spring Framework': {
        role: 'Enterprise Core Development',
        usedIn: 'Mphasis, Zions Bank',
        exp: '5 Years',
        desc: 'Deep knowledge of Spring Core, AOP, and Security for complex business logic.',
        strength: 'Inversion of Control & Security'
    },
    'Node.js': {
        role: 'Scalable Network Apps',
        usedIn: 'Personal Projects, Startup Engagements',
        exp: '3 Years',
        desc: 'Developing high-performance, event-driven backend services and real-time APIs.',
        strength: 'Event Loops & Middleware'
    },
    'React.js': {
        role: 'Modern UI Development',
        usedIn: 'Citadel, Personal Projects',
        exp: '4 Years',
        desc: 'Building responsive dashboards and highly interactive user interfaces.',
        strength: 'Hooks & Component Lifecycle'
    },
    'Angular': {
        role: 'Enterprise UI Architecture',
        usedIn: 'CVS Health, Mphasis',
        exp: '4+ Years',
        desc: 'Developing large-scale enterprise portals with complex state management.',
        strength: 'RxJS & Component Architecture'
    },
    'Vue.js': {
        role: 'Lightweight UI Development',
        usedIn: 'Internal Tools, Personal Projects',
        exp: '2 Years',
        desc: 'Rapidly prototyping and building performant web applications.',
        strength: 'Reactivity System & Composition API'
    },
    '.NET Core': {
        role: 'Cross-platform Services',
        usedIn: 'Zions Bank, Modernization Projects',
        exp: '3 Years',
        desc: 'Building scalable, cross-platform microservices and .NET web applications.',
        strength: 'Dependency Injection & Performance'
    },

    // Backend & APIs
    'RESTful APIs': {
        role: 'Service Integration',
        usedIn: 'CVS Health, Citadel, Mphasis',
        exp: '5 Years',
        desc: 'Designing and implementing decoupled, scalable REST interfaces.',
        strength: 'Resource Design & Security'
    },
    'Microservices Architecture': {
        role: 'System Design',
        usedIn: 'CVS Health, Citadel',
        exp: '3 Years',
        desc: 'Architecting distributed systems with focus on scalability and loose coupling.',
        strength: 'Saga Patterns & Discovery'
    },
    'GraphQL': {
        role: 'Efficient Data Fetching',
        usedIn: 'CVS Health, Recent Projects',
        exp: '2 Years',
        desc: 'Implementing flexible API layers to reduce over-fetching and improve performance.',
        strength: 'Schema Stitching & Subscriptions'
    },
    'Apache Kafka': {
        role: 'Real-time Event Streaming',
        usedIn: 'Citadel, Enterprise Log Aggregation',
        exp: '2 Years',
        desc: 'Building resilient data pipelines and real-time event-driven architectures.',
        strength: 'Message Persistence & Throttling'
    },
    'Hibernate': {
        role: 'Object-Relational Mapping',
        usedIn: 'CVS Health, Mphasis',
        exp: '4 Years',
        desc: 'Managing database interactions and mapping complex entities in Java applications.',
        strength: 'Lazy Loading & Caching'
    },

    // Databases
    'PostgreSQL': {
        role: 'Relational Data Storage',
        usedIn: 'CVS Health, Personal Apps',
        exp: '4 Years',
        desc: 'Primary choice for robust, ACID-compliant relational data management.',
        strength: 'Jsonb Support & ACID'
    },
    'MySQL': {
        role: 'General Purpose DB',
        usedIn: 'Mphasis, Mid-sized Apps',
        exp: '5 Years',
        desc: 'Managing data for various enterprise and web-scale applications.',
        strength: 'Read Scaling & Replication'
    },
    'DynamoDB': {
        role: 'NoSQL Data storage',
        usedIn: 'CVS Health, AWS Projects',
        exp: '2 Years',
        desc: 'Serverless NoSQL database for high-scale, low-latency applications.',
        strength: 'Key-Value Modeling'
    },
    'Oracle': {
        role: 'Enterprise Data Warehouse',
        usedIn: 'Mphasis, Zions Bank',
        exp: '4 Years',
        desc: 'Legacy and enterprise-grade relational database management.',
        strength: 'PL/SQL & Transactions'
    },

    // Cloud & Infra
    'AWS (EC2/ECS/EKS/Lambda)': {
        role: 'Cloud Provider',
        usedIn: 'CVS Health, Personal High-Scale Apps',
        exp: '3 Years',
        desc: 'Deploying and managing containerized and serverless workloads.',
        strength: 'Serverless & IAM'
    },
    'Azure (AKS/Functions)': {
        role: 'Enterprise Cloud Platform',
        usedIn: 'Zions Bank, Corporate IT',
        exp: '4 Years',
        desc: 'Enterprise-wide cloud migration and service management.',
        strength: 'AD Integration & Hybrid Cloud'
    },
    'Google Cloud (GCP)': {
        role: 'Modern Cloud Solutions',
        usedIn: 'AI Integrations, Startup Projects',
        exp: '2 Years',
        desc: 'Utilizing BigQuery and AI tools for data-intensive projects.',
        strength: 'BigQuery & Kubernetes Engine'
    },
    'Docker': {
        role: 'Containerization',
        usedIn: 'CVS Health, Citadel, Development',
        exp: '4 Years',
        desc: 'Packaging applications for consistent deployment across environments.',
        strength: 'Optimized Builds & Layering'
    },
    'Kubernetes': {
        role: 'Container Orchestration',
        usedIn: 'CVS Health, High-Availability Apps',
        exp: '2 Years',
        desc: 'Managing cluster deployments, auto-scaling, and self-healing systems.',
        strength: 'Helm & Resource Management'
    },

    // DevOps
    'CI/CD': {
        role: 'DevOps Lifecycle',
        usedIn: 'Citadel, CVS Health',
        exp: '3 Years',
        desc: 'Developing automated pipelines for seamless code integration and delivery.',
        strength: 'Pipeline as Code'
    },
    'Jenkins': {
        role: 'Automation Server',
        usedIn: 'CVS Health, Mphasis',
        exp: '4 Years',
        desc: 'Configuring and maintaining complex build and deployment jobs.',
        strength: 'Groovy Scripts & Plugins'
    },
    'GitHub Actions': {
        role: 'Workflow Automation',
        usedIn: 'Personal Projects, Recent Enterprise Apps',
        exp: '2 Years',
        desc: 'Native GitHub automation for CI/CD and repository management.',
        strength: 'Custom Actions & Yaml Config'
    },

    // AI & Analytics
    'OpenAI API': {
        role: 'Generative AI Integration',
        usedIn: 'CVS Health, Personal AI Agents',
        exp: '1 Year',
        desc: 'Building intelligent features like automated analysis and conversational interfaces.',
        strength: 'Prompt Engineering & Tuning'
    },
    'Power BI': {
        role: 'Data Visualization',
        usedIn: 'CVS Health, Corporate Reporting',
        exp: '2 Years',
        desc: 'Creating interactive dashboards to turn data into business insights.',
        strength: 'DAX & Data Modeling'
    },

    // Coursework
    'Distributed Systems': {
        role: 'MS Computer Science Theory',
        usedIn: 'University Projects, System Architecture',
        exp: 'Advanced Theory',
        desc: 'In-depth study of scalability, fault tolerance, and consensus protocols.',
        strength: 'CAP Theorem & Consensus'
    },
    'AI': {
        role: 'MS Computer Science Core',
        usedIn: 'Machine Learning Research',
        exp: '2 Years (Academic)',
        desc: 'Study of neural networks, search algorithms, and intelligent agents.',
        strength: 'Neural Networks & Heuristics'
    }
};

export const getSkillSpec = (name: string): SkillSpec => {
    return SKILL_SPECIFICATIONS[name] || {
        role: 'Technology Expert',
        usedIn: 'Enterprise Production Environments',
        exp: 'Full Competency',
        desc: 'Detailed proficiency and implementation experience in enterprise-grade software systems.',
        strength: 'Implementation & Performance'
    };
};
