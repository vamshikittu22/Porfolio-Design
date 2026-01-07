
import { GoogleGenAI } from "@google/genai";
import { FULL_NAME, EDUCATION, EXPERIENCE, SKILLS_RESUME } from "../config/constants";
import { PROJECTS_CONFIG } from "../config/projects";

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export class ChatService {
  private static instance: ChatService;
  private history: ChatMessage[] = [];

  static getInstance() {
    if (!this.instance) {
      this.instance = new ChatService();
    }
    return this.instance;
  }

  private getContext(): string {
    const projectsCtx = PROJECTS_CONFIG.map(p => `
      Project: ${p.title}
      Tagline: ${p.tagline}
      Overview: ${p.overview}
      Tech Stack: ${p.tech.join(', ')}
      Role: ${p.roleHighlights.join('; ')}
      Use Cases: ${p.useCases.join('; ')}
      Category: ${p.category}
    `).join('\n');

    const expCtx = EXPERIENCE.map(e => `
      Role: ${e.title} at ${e.subtitle} (${e.period})
      Highlights: ${e.description.join('; ')}
    `).join('\n');

    // Fix: skill arrays contain strings, not objects with a .name property
    const languages = SKILLS_RESUME.languages.join(', ');
    const frameworks = SKILLS_RESUME.frameworks.join(', ');
    const cloud = SKILLS_RESUME.cloud_db.join(', ');
    const tools = SKILLS_RESUME.tools.join(', ');

    return `
      You are an AI assistant embedded in ${FULL_NAME}'s developer portfolio.
      
      CORE PROFILE:
      Name: ${FULL_NAME}
      Location: Charlotte, NC (US-based)
      Work Authorization: STEM OPT (Open to sponsorship/full-time roles)
      Target Roles: Software Engineer, Full-stack Developer, .NET/React Developer.
      
      SKILLS:
      Languages: ${languages}
      Frameworks: ${frameworks}
      Cloud/DB: ${cloud}
      Tools: ${tools}
      
      EXPERIENCE:
      ${expCtx}
      
      PROJECTS:
      ${projectsCtx}

      EDUCATION:
      ${EDUCATION.map(edu => `${edu.title} from ${edu.subtitle} (${edu.period})`).join('\n')}
    `;
  }

  async sendMessage(message: string): Promise<string> {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const context = this.getContext();
      
      const systemInstruction = `
        Your job is to help recruiters, hiring managers, and engineers quickly understand Vamshi's skills, projects, and experience.

        Rules:
        - Always be concise: 2-5 sentences unless the user explicitly asks for more detail.
        - Prioritize hiring information: tech stack, responsibilities, impact, work history, and work authorization.
        - Do NOT invent employers, dates, or skills. If unsure, say so and point them to the Resume or Projects section.
        - Use plain, professional language.
        - Redirect salary or confidential questions to direct contact (via the Contact section).
        - Reference section names like 'Projects section', 'Resume section', or 'Contact section' when helpful.
        - Do not answer questions unrelated to Vamshi or software development.
        
        Current Portfolio Context:
        ${context}
      `;

      const contents = [
        ...this.history.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
        { role: 'user', parts: [{ text: message }] }
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const reply = response.text || "I'm sorry, I couldn't process that request.";
      
      this.history.push({ role: 'user', text: message });
      this.history.push({ role: 'model', text: reply });

      return reply;
    } catch (error) {
      console.error("Chat Error:", error);
      return "I'm having trouble connecting to my AI logic. Please check the Resume or Projects section manually!";
    }
  }

  getHistory() {
    return this.history;
  }

  clearHistory() {
    this.history = [];
  }
}
