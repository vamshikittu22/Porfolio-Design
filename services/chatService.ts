
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
      Tech: ${p.tech.join(', ')}
      Overview: ${p.overview}
    `).join('\n');

    return `
      Profile: ${FULL_NAME}
      Work Auth: STEM OPT
      Experience: ${EXPERIENCE.length} roles, including AI Labs Web LLC and Mphasis.
      Skills: ${SKILLS_RESUME.languages.join(', ')}
      Frameworks: ${SKILLS_RESUME.frameworks.join(', ')}
      Projects: ${projectsCtx}
    `;
  }

  async sendMessage(message: string): Promise<string> {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const context = this.getContext();
      
      const systemInstruction = `
        You are the AI portfolio assistant for ${FULL_NAME}.
        Your goal is to answer recruiter questions concisely (2-4 sentences).
        Context: ${context}
        Always mention specific projects or skills when relevant.
      `;

      const contents = [
        ...this.history.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
        { role: 'user', parts: [{ text: message }] }
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: contents,
        config: { systemInstruction }
      });

      const reply = response.text || "I'm sorry, I couldn't process that request.";
      this.history.push({ role: 'user', text: message });
      this.history.push({ role: 'model', text: reply });
      return reply;
    } catch (error) {
      return "I'm having trouble connecting to my AI logic. Please check my Resume manually!";
    }
  }

  getHistory() { return this.history; }
  clearHistory() { this.history = []; }
}
