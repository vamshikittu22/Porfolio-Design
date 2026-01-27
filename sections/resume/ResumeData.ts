export interface ResumeItem {
  title: string;
  subtitle: string;
  location?: string;
  period: string;
  description: string[];
}

export const RESUME_CONTENT = {
  name: "Vamshi Krishna Pullaiahgari",
  role: "Full Stack Developer",
  contact: {
    phone: "+1 (913) 326-7373",
    email: "vamshikrishna2297@gmail.com",
    github: "github.com/vamshikittu22",
    linkedin: "linkedin.com/in/vamshi-krishna-pullaiahgari/",
    portfolio: "vamshikrishna.dev",
    location: "Overland Park, KS // STEM OPT"
  },
  summary: "Full Stack Developer with 5+ years of experience building scalable, secure enterprise applications across healthcare, finance, and banking domains. Strong expertise in Java (8–17), Spring Boot, Angular/React, AWS microservices, and Kafka-based real-time systems. Proven in delivering REST/GraphQL APIs, cloud-native deployments (ECS/EKS), CI/CD automation, and secure authentication using OAuth2/JWT. Recently contributed to AI-assisted analytics for claims processing and financial risk workflows.",
  experience: [
    {
      title: "Full Stack Developer",
      subtitle: "CVS Health",
      location: "Texas, USA",
      period: "Feb 2025 – Present",
      description: [
        "Designed and implemented REST and GraphQL APIs using Spring Boot to support insurance claims submission, approval, and billing workflows, improving processing throughput and enforcing secure role-based access.",
        "Built a real-time claims analytics dashboard with Angular and NgRx, integrating D3.js visualizations to surface KPIs and claim trends, reducing operational review time for analysts.",
        "Developed reusable Vue.js components for advanced filtering and visualization of claims data, improving UI consistency and accelerating feature delivery across modules.",
        "Containerized Spring Boot microservices and deployed on AWS ECS with RDS backend, enabling modular releases and improving application scalability under peak workloads.",
        "Integrated WebSocket communication for live claim status updates and notifications, enhancing operational visibility across claims processing teams.",
        "Optimized application performance through lazy loading, query tuning on AWS RDS, and CDN caching, reducing latency and improving dashboard responsiveness.",
        "Secured microservices using OAuth2, Spring Security, and JWT, ensuring HIPAA-compliant authentication and authorization across distributed services.",
        "Implemented LLM-assisted claim summarization and trend analysis using OpenAI APIs to generate contextual insights for complex claims, reducing manual review effort for claim analysts."
      ]
    },
    {
      title: "Software Engineer",
      subtitle: "Citadel (Financial Services)",
      location: "Florida, USA",
      period: "Aug 2024 – Dec 2024",
      description: [
        "Developed low-latency Spring Boot microservices supporting trading and risk workflows, enabling reliable real-time financial transaction processing across distributed systems.",
        "Contributed to migrating legacy trading services to AWS, deploying containerized workloads on EKS and integrating Lambda for serverless components, improving platform scalability and operational efficiency.",
        "Implemented REST APIs and Kafka-based streaming pipelines for secure, sub-millisecond data exchange across trading, pricing, and risk systems.",
        "Built AI-assisted anomaly detection pipelines over Kafka trade streams using statistical models and Python services, reducing false-positive alerts, and improving risk signal accuracy.",
        "Developed React.js dashboards for real-time market exposure and ML-enriched analytics, enabling traders and portfolio managers to make faster, data-driven decisions."
      ]
    },
    {
      title: "Full Stack Developer",
      subtitle: "Mphasis",
      location: "Pune, India",
      period: "Feb 2021 – July 2023",
      description: [
        "Designed and delivered Spring Boot microservices supporting digital banking workflows including account management, payments, and loan origination, improving platform scalability and service reliability.",
        "Developed and optimized REST APIs with asynchronous processing, caching, and pagination, reducing average API response times by 25% and increasing overall system throughput.",
        "Implemented secure authentication and authorization using OAuth 2.0 / JWT and API gateway policies, aligning services with enterprise compliance and audit standards.",
        "Built modular Angular (TypeScript) components with responsive design and reusable directives, improving UI performance and maintainability across customer-facing banking portals.",
        "Tuned JPA/Hibernate mappings and optimized SQL queries in Oracle and PostgreSQL, reducing data access latency and improving transaction processing efficiency.",
        "Automated containerized deployments using Docker and Jenkins on AWS EKS, strengthening release reliability, and minimizing manual intervention across environments."
      ]
    },
    {
      title: "Associate Software Engineer",
      subtitle: "Covantech Pvt Ltd",
      location: "Hyderabad, India",
      period: "Aug 2019 – Jan 2021",
      description: [
        "Developed a Python-based Selenium WebDriver automation framework to validate end-to-end healthcare CRM workflows, reducing manual regression effort by 40% and improving release stability.",
        "Engineered REST API automation using Python Requests and UnitTest to validate Spring Boot microservices for claim submission and adjudication, accelerating backend verification cycles.",
        "Simulated and validated Kafka event streams to ensure real-time synchronization across distributed CRM modules, improving claims data consistency across systems.",
        "Integrated automated smoke and regression suites into Jenkins CI/CD pipelines for Docker deployments on AWS ECS, increasing build reliability and deployment confidence.",
        "Built Python utilities to parse and validate large XML/CSV healthcare claim files, reconciling backend persistence across Oracle and MongoDB to ensure data accuracy and compliance."
      ]
    }
  ],
  projects: [
    {
      title: "Future Job Fit | AI Resume Creation & Job Optimization Platform",
      subtitle: "React, TypeScript, Supabase Edge Functions, LLM APIs, Python, Node.js",
      period: "2024",
      description: [
        "Architected a full-stack platform enabling users to create resumes and optimize them against job descriptions using ATS-style keyword extraction, job-to-skill mapping, and AI-assisted content generation.",
        "Designed a pluggable LLM integration layer (default Gemini) with secure server-side API orchestration via Supabase Edge Functions, supporting multi-provider inference while protecting credentials.",
        "Integrated browser-based Python (Pyodide) for local document parsing and NLP preprocessing, combining client-side analytics with server-side AI services to deliver real-time JD-specific feedback.",
        "Built modular React workflows for resume builder, job optimizer, and AI recommendations, implementing scalable state management and extensible components for future feature expansion."
      ]
    },
    {
      title: "WanderlustTrails | Full Stack Travel Booking Platform",
      subtitle: "React, PHP, REST APIs, MySQL, JWT Authentication",
      period: "2024",
      description: [
        "Designed and implemented an end-to-end travel booking platform with React frontend and PHP REST services, supporting user authentication, destination search, bookings, reviews, and role-based admin dashboards.",
        "Architected relational MySQL schemas and REST workflows for users, packages, bookings, and reviews, implementing JWT-based authentication and authorization for secure multi-role access across the platform.",
        "Built modular backend services for bookings, payments, blogs, and user management, enabling real-time availability checks, transactional consistency, and scalable feature expansion through loosely coupled APIs."
      ]
    }
  ],
  education: [
    {
      title: "Masters in Computer Information Systems",
      subtitle: "University of Central Missouri, Warrensburg, USA.",
      period: "Dec 2024",
      description: []
    },
    {
      title: "Bachelors in Computer Science Engineering",
      subtitle: "Jawaharlal Nehru Technological University, Hyderabad, India.",
      period: "Jul 2019",
      description: [
        "Relevant Coursework: Distributed Systems, Cloud Computing, Information Security Management, Artificial Intelligence, Data Warehousing & Analytics, Advanced Systems Design."
      ]
    }
  ],
  awards: [
    {
      title: 'Top Performer Q3',
      subtitle: 'Mphasis',
      period: 'Dec 2022',
      description: ['Recognized for excellent client service, agility, and KPI delivery.']
    }
  ],
  technicalInfrastructure: {
    languages: ["Java (8–17)", "Python", "JavaScript", "TypeScript", "C#", "PHP"],
    frontend: ["React.js", "Redux", "Angular", "HTML5/CSS3", "Bootstrap"],
    backend: ["Spring Boot", "Node.js", "Hibernate", "JPA", "JDBC", "REST APIs"],
    ai_data: ["OpenAI API", "LLM-based Summarization", "Python Data Pipelines"],
    databases: ["Oracle", "PostgreSQL", "MySQL", "MongoDB", "DynamoDB"],
    cloud: ["AWS (ECS, EKS, Lambda, Fargate, S3, RDS, IAM, KMS)"],
    devops: ["Docker", "Kubernetes", "Jenkins", "Terraform", "Git", "GitHub"],
    testing: ["JUnit", "Jest", "Selenium WebDriver"]
  }
};