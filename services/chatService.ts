import { GoogleGenAI } from "@google/genai";
import { FULL_NAME, EMAIL } from "../config/constants";
import { RESUME_CONTENT } from "../sections/resume/ResumeData";

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
    const expCtx = RESUME_CONTENT.experience.map(e => `
      Role: ${e.title} at ${e.subtitle}
      Period: ${e.period}
      Summary: ${e.description.join(' ')}
    `).join('\n');

    /**
     * Fix: Replaced invalid 'technicalInfrastructure' with the correct 'technicalSkills' 
     * property and mapped the fields to match the RESUME_CONTENT definition.
     */
    return `
      Profile: ${FULL_NAME}
      Summary: ${RESUME_CONTENT.summary}
      Experience: ${expCtx}
      Skills: ${RESUME_CONTENT.technicalSkills.languages.join(', ')}
      Frontend: ${RESUME_CONTENT.technicalSkills.frontend.join(', ')}
      Backend: ${RESUME_CONTENT.technicalSkills.backend.join(', ')}
      AI: ${RESUME_CONTENT.technicalSkills.ai.join(', ')}
      Cloud: ${RESUME_CONTENT.technicalSkills.cloud.join(', ')}
      Databases: ${RESUME_CONTENT.technicalSkills.databases.join(', ')}
      Email: ${EMAIL}
    `;
  }

  async sendMessage(message: string): Promise<string> {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const context = this.getContext();
      
      const systemInstruction = `
        You are the AI portfolio assistant for ${FULL_NAME}.
        Ground all your answers strictly in the provided resume data.
        If asked about experience, highlight the 5+ years of full-stack expertise and recent roles at CVS Health and Citadel.
        Be professional, concise (2-4 sentences), and helpful. 
        Context: ${context}
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
      return "I'm having trouble connecting to my neural logic. Please review my Resume manually in the section below!";
    }
  }

  getHistory() { return this.history; }
  clearHistory() { this.history = []; }
}