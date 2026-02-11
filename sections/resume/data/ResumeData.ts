export interface ResumeItem {
  title: string;
  subtitle: string;
  location?: string;
  period: string;
  description: string[];
}

export const RESUME_CONTENT = {
  name: "Vamshi Krishna Pullaiahgari",
  role: "Software Engineer",
  contact: {
    phone: "+1 (913) 326-7373",
    email: "vamshikrishna2297@gmail.com",
    github: "github.com/vamshikittu22",
    linkedin: "linkedin.com/in/vamshi-krishna-pullaiahgari/",
    portfolio: "Portfolio",
    location: "Overland Park, KS"
  },
  summary: "Full Stack Developer with 5+ years of experience building scalable, secure enterprise applications across healthcare, finance, and banking domains. Strong expertise in Java (8–17), Spring Boot, Angular/React, AWS microservices, and Kafka-based real-time systems. Proven in delivering REST/GraphQL APIs, cloud-native deployments (ECS/EKS), CI/CD automation, and secure authentication using OAuth2/JWT. Recently contributed to AI-assisted analytics for claims processing and financial risk workflows.",
  experience: [
    {
      title: "Software Engineer",
      subtitle: "CVS Health",
      location: "Texas, USA",
      period: "Feb 2025 – Present",
      description: [
        "Engineered Java Spring Boot REST and GraphQL APIs to support claims processing workflows, enabling scalable feature delivery across sprint-based releases.",
        "Implemented Angular and Vue.js dashboards using reusable components and structured state management, improving UI consistency and reducing rework across features.",
        "Deployed containerized Spring Boot services on AWS ECS using CI/CD pipelines, improving deployment reliability and operational visibility.",
        "Orchestrated Kafka-based event-driven communication and WebSocket real-time updates, enabling timely claim status updates.",
        "Integrated AI-assisted claim analysis using OpenAI APIs, reducing manual review effort through automated summarization.",
        "Hardened application security by implementing JWT-based role-based access control integrated with AWS IAM."
      ]
    },
    {
      title: "Software Engineer",
      subtitle: "Citadel (Financial Services)",
      location: "Florida, USA",
      period: "Aug 2024 – Dec 2024",
      description: [
        "Developed Java Spring Boot microservices with REST APIs and Kafka-based streaming pipelines, supporting real-time processing of trading and risk data.",
        "Provisioned containerized services on Azure Kubernetes Service (AKS) using Azure Container Registry, ensuring controlled rollouts.",
        "Enabled asynchronous event ingestion using Azure Functions and Azure Event Hubs to improve scalability.",
        "Constructed React.js components with optimized Webpack builds, improving frontend performance and maintainability.",
        "Applied anomaly detection and predictive analytics features with monitoring via Azure Monitor."
      ]
    },
    {
      title: "Software Engineer",
      subtitle: "Mphasis",
      location: "Pune, India",
      period: "Feb 2021 – July 2023",
      description: [
        "Authored Java Spring Boot REST APIs and implemented business logic using C# (.NET Core), supporting integration across multiple internal banking systems.",
        "Assembled Angular UI modules with state-driven components and responsive layouts, supporting consistent user experiences.",
        "Secured application access by implementing OAuth 2.0 and JWT-based authentication in compliance-driven environments.",
        "Refined SQL queries for reporting and data retrieval, improving data access efficiency.",
        "Supported Oracle and PostgreSQL databases on Amazon RDS with containerized deployments via Jenkins CI/CD."
      ]
    },
    {
      title: "Associate Software Engineer",
      subtitle: "Covantech Pvt Ltd",
      location: "Hyderabad, India",
      period: "Aug 2019 – Jan 2021",
      description: [
        "Created a Python-based Selenium WebDriver automation framework, reducing manual regression testing effort and improving test repeatability.",
        "Automated REST API validation using Python Requests and unittest, improving backend service verification coverage.",
        "Validated Kafka message streams by verifying event flow and data consistency across distributed services.",
        "Embedded smoke and regression test suites into Jenkins pipelines, supporting Docker-based deployments on AWS ECS."
      ]
    }
  ],
  projects: [
    {
      title: "Future Job Fit | AI Resume Creation & Job Optimization Platform",
      subtitle: "React, TypeScript, Supabase, Gemini/OpenAI, Python (Pyodide), Node.js",
      period: "2024",
      description: [
        "Architected a full-stack platform enabling users to create resumes and optimize them against job descriptions using ATS-style keyword extraction and AI-assisted content generation.",
        "Designed a pluggable LLM integration layer with secure server-side API orchestration via Supabase Edge Functions.",
        "Integrated browser-based Python (Pyodide) for local document parsing and NLP preprocessing.",
        "Built modular React workflows for resume builder, job optimizer, and AI recommendations."
      ]
    },
    {
      title: "WanderlustTrails | Full Stack Travel Booking Platform",
      subtitle: "React, PHP, REST APIs, MySQL, JWT Authentication",
      period: "2024",
      description: [
        "Designed and implemented an end-to-end travel booking platform supporting user authentication, destination search, bookings, and role-based admin dashboards.",
        "Architected relational MySQL schemas and REST workflows, implementing JWT based authentication and authorization.",
        "Built modular backend services for bookings, payments, and real-time availability checks."
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
      description: []
    }
  ],
  technicalSkills: {
    languages: ["Java (8–17)", "Python", "JavaScript", "TypeScript", "C#", "PHP"],
    frontend: ["React.js", "Redux", "Angular", "HTML5/CSS3", "Bootstrap"],
    backend: ["Spring Boot", "Node.js", "Hibernate", "JPA", "JDBC", "REST APIs"],
    databases: ["Oracle", "PostgreSQL", "MySQL", "MongoDB", "DynamoDB"],
    cloud: ["AWS (ECS, EKS, Lambda, Fargate, S3, RDS)", "Azure"],
    devops: ["Docker", "Kubernetes", "Jenkins", "Terraform", "Git", "GitHub"],
    ai: ["OpenAI API", "Claude", "AI Chatbot Integration"],
    tools: ["Maven", "SonarQube", "JIRA", "Postman"],
    analytics: ["LLM Summarization", "Anomaly Detection", "Pipelines"],
    testing: ["JUnit", "Jest", "Selenium WebDriver"]
  }
};