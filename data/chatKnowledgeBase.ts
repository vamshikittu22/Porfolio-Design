
/**
 * Local Knowledge Base / Cache for Chat Assistant
 * Stores common questions and their answers to save token usage and provide instant responses.
 */

export interface CachedResponse {
  query: string;
  answer: string;
}

export const CHAT_KNOWLEDGE_BASE: CachedResponse[] = [
  {
    query: "Who is Vamshi?",
    answer: "Vamshi Krishna Pullaiahgari is a highly accomplished Software Engineer with over 5 years of industry experience across healthcare, finance, and banking domains. He specializes in building robust, scalable enterprise applications using Java (Spring Boot), microservices architecture, and modern cloud technologies like AWS and Azure. Known for his analytical approach and commitment to continuous learning, Vamshi excels at bridging complex backend logic with responsive, user-centric frontends. For a complete deep dive into his background and executive profile, I recommend exploring Chapter 1. [GO_CHAPTER: 1]"
  },
  {
    query: "What are Vamshi's core technical strengths?",
    answer: "Vamshi's technical arsenal is built on a foundation of 40+ modern technologies. His core strengths include: \n1. Backend Mastery: Expert-level Java (8-17) and Spring Boot for high-performance microservices. \n2. Cloud & DevOps: Extensive experience with AWS (ECS/EKS/Lambda) and Azure (AKS), utilizing Docker and Kubernetes for containerization. \n3. Data Engineering: Proficient in real-time streaming with Kafka and managing diverse databases like PostgreSQL, Oracle, and MongoDB. \n4. Security-First Design: Deep knowledge of OAuth2 and JWT-based authentication. \nYou can view his full technical stack and skill badges in Chapter 1. [GO_CHAPTER: 1]"
  },
  {
    query: "Tell me about his experience at CVS Health.",
    answer: "At CVS Health, Vamshi plays a pivotal role in engineering Java Spring Boot and GraphQL APIs to streamline claims processing workflows. His work involves orchestrating Kafka-based event-driven communication and integrating AI-assisted analysis to automate manual reviews, significantly reducing processing time. He also maintains the operational visibility of these services by deploying them on AWS ECS through automated CI/CD pipelines. To see a detailed breakdown of his timeline and professional journey, please visit Chapter 4. [GO_CHAPTER: 4]"
  },
  // {
  //   query: "What did he do at Citadel?",
  //   answer: "During his tenure at Citadel within the financial services sector, Vamshi engineered mission-critical Java microservices supporting real-time trading and risk data pipelines. He leveraged Azure Kubernetes Service (AKS) for container orchestration and implemented Azure Functions for high-scale asynchronous event ingestion. His contributions ensured the reliability and speed of data flow across high-frequency trading environments. For more insights into his career path and previous roles, check out Chapter 4. [GO_CHAPTER: 4]"
  // },
  {
    query: "Tell me about your top 3 software projects.",
    answer: "Vamshi has architected several high-impact projects, with his top three being: \n1. Future Job Fit: An AI-driven resume optimization platform using React and Gemini to help users match jobs using NLP. [OPEN_LINK: Future Job Fit] \n2. Wanderlust Trails: A full-stack travel booking platform with secure JWT authentication and complex relational schemas. [OPEN_LINK: Wanderlust Trails] \n3. Mini Metro Simulator: A high-performance transit simulation replicating Mini Metro mechanics with AI pathfinding. [OPEN_LINK: Mini Metro Simulator] \nEach project showcases his ability to combine clean code with sophisticated AI integrations. You can explore the full case studies and architecture diagrams in Chapter 3. [GO_CHAPTER: 3]"
  },
  {
    query: "How can I contact Vamshi?",
    answer: "Vamshi is always open to professional collaborations and technical discussions. You can reach him directly at vamshikrishna2297@gmail.com or via phone at +1 (913) 326-7373. For social connections, he is active on LinkedIn and GitHub. You can also find all these links and a scheduling option in Chapter 7. [GO_CHAPTER: 7] [OPEN_LINK: LinkedIn] [OPEN_LINK: GitHub]"
  },
  {
    query: "Summarize Vamshi's profile for a recruiter.",
    answer: "For a recruiter, Vamshi is best described as a high-impact, full-stack engineer with 5+ years of experience delivering secure, cloud-native solutions in high-stakes environments like CVS Health and Mphasis. He is a 'Builder' who architectures systems that solve real business problems through automation and AI. For an executive summary and his downloadable resume, visit Chapter 4. [GO_CHAPTER: 4] [OPEN_LINK: Resume]"
  }
];
