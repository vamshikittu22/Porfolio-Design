
import { GoogleGenAI } from "@google/genai";
import { FULL_NAME, EMAIL } from "../config/constants";
import { RESUME_CONTENT } from "../sections/resume/data/ResumeData";
import { getChapterContext } from '../data/chapterContent';
import { ChapterId } from '../types/chapters';
import { CHAPTERS } from '../data/chapters';
import { CHAT_KNOWLEDGE_BASE } from '../data/chatKnowledgeBase';

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
      this.instance.loadHistory();
    }
    return this.instance;
  }

  private loadHistory() {
    const saved = localStorage.getItem('vk_chat_history');
    if (saved) {
      try {
        this.history = JSON.parse(saved);
      } catch (e) {
        this.history = [];
      }
    }
  }

  private saveHistory() {
    localStorage.setItem('vk_chat_history', JSON.stringify(this.history));
  }

  private getCachedAnswer(query: string): string | null {
    const q = query.toLowerCase().trim();
    
    // 1. Check Hardcoded Knowledge Base
    const kbMatch = CHAT_KNOWLEDGE_BASE.find(k => 
      q.includes(k.query.toLowerCase()) || k.query.toLowerCase().includes(q)
    );
    if (kbMatch) return kbMatch.answer;

    // 2. Check Dynamic LocalStorage Cache
    const dynamicCache = localStorage.getItem('vk_chat_cache');
    if (dynamicCache) {
      try {
        const cache = JSON.parse(dynamicCache);
        if (cache[q]) return cache[q];
      } catch (e) {}
    }

    return null;
  }

  private saveToDynamicCache(query: string, answer: string) {
    const q = query.toLowerCase().trim();
    const dynamicCache = localStorage.getItem('vk_chat_cache') || '{}';
    try {
      const cache = JSON.parse(dynamicCache);
      cache[q] = answer;
      localStorage.setItem('vk_chat_cache', JSON.stringify(cache));
    } catch (e) {}
  }

  private getContext(currentChapter: ChapterId | null): string {
    const expCtx = RESUME_CONTENT.experience.map(e => `
      Role: ${e.title} at ${e.subtitle}
      Period: ${e.period}
      Summary: ${e.description.join(' ')}
    `).join('\n');

    const chapterCtx = getChapterContext(currentChapter);

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
      
      ${chapterCtx}
    `;
  }

  async sendMessage(message: string, currentChapter: ChapterId | null = null): Promise<string> {
    const userMsg: ChatMessage = { role: 'user', text: message };
    
    // 1. Check Caches first to save tokens
    const cached = this.getCachedAnswer(message);
    if (cached) {
      this.history.push(userMsg);
      this.history.push({ role: 'model', text: cached });
      this.saveHistory();
      return cached;
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const context = this.getContext(currentChapter);

      const chapterMap = CHAPTERS.map(ch => 
        `${ch.number}. ${ch.title} (${ch.id}): ${ch.description}`
      ).join('\n');

      const systemInstruction = `
        You are the VK Neural Assistant, the advanced AI representative for ${FULL_NAME}.
        
        RESPONSE POLICY:
        1. DETAIL FIRST: Provide a comprehensive explanation first.
        2. NARRATIVE FLOW: Act as a guide. Professional, sophisticated, and helpful.
        3. ABSOLUTE MANDATORY ACTION TRIGGERS: Every single time you mention a Chapter, a Project, the Resume, or a social link, you MUST include the corresponding tag immediately after the mention. This is NOT optional. If you mention Chapter 4 twice, you must include the tag twice.
           Format: [GO_CHAPTER: X] or [OPEN_LINK: Name]
           
           Example: "You can see my work history in Chapter 4 [GO_CHAPTER: 4]. [OPEN_LINK: Resume]"
           Example: "Check out the Future Job Fit project. [OPEN_LINK: Future Job Fit]"
           
           Valid Links: LinkedIn, GitHub, Resume, Contact, Future Job Fit, Mini Metro Simulator, Wanderlust Trails, Local SLM API, Cinematic Discovery, Event Node Pro.
        
        CHAPTER MAPPING:
        ${chapterMap}
        
        ACCURACY RULES:
        - Resume Location: The resume section and download are located in Chapter 4. Whenever referencing the resume, use [GO_CHAPTER: 4] and [OPEN_LINK: Resume].
        - Project Repos: Use [OPEN_LINK: Project Name] to show the specific source code button for that project.
        - Ground all answers strictly in provided data.
        
        Constraint: Do not use markdown bolding. Use natural paragraphs.
        
        Context: ${context}
      `;

      const contents = [
        ...this.history.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
        { role: 'user', parts: [{ text: message }] }
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: contents,
        config: { 
          systemInstruction: systemInstruction 
        }
      });

      const reply = response.text || "I'm sorry, I couldn't process that request.";
      this.history.push(userMsg);
      this.history.push({ role: 'model', text: reply });
      this.saveHistory();
      this.saveToDynamicCache(message, reply);
      return reply;
    } catch (error: any) {
      console.error("VK Neural Error:", error);
      
      const errorMsg = error?.message || "";
      if (errorMsg.includes("403") || errorMsg.includes("PERMISSION_DENIED")) {
        const activationUrlMatch = errorMsg.match(/https?:\/\/console\.developers\.google\.com\/apis\/api\/generativelanguage\.googleapis\.com\/overview\?project=\d+/);
        const url = activationUrlMatch ? activationUrlMatch[0] : "https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com";
        return `The Generative Language API is not enabled for your project. Please enable it here: ${url}`;
      }

      return this.getLocalFallbackResponse(message);
    }
  }

  private getLocalFallbackResponse(query: string): string {
    const q = query.toLowerCase();
    
    if (q.includes("who") || q.includes("profile") || q.includes("about")) {
      return `Vamshi is a ${RESUME_CONTENT.role} with 5+ years of experience in full-stack development. ${RESUME_CONTENT.summary}`;
    }
    if (q.includes("skill") || q.includes("tech") || q.includes("languages")) {
      return `Vamshi is proficient in ${RESUME_CONTENT.technicalSkills.languages.join(", ")}. He also works with ${RESUME_CONTENT.technicalSkills.frontend.join(", ")} and ${RESUME_CONTENT.technicalSkills.backend.join(", ")}.`;
    }
    if (q.includes("experience") || q.includes("work") || q.includes("history")) {
      const latest = RESUME_CONTENT.experience[0];
      return `Currently, Vamshi is a ${latest.title} at ${latest.subtitle} (${latest.period}). He has also worked at Citadel and Mphasis.`;
    }
    if (q.includes("contact") || q.includes("email") || q.includes("reach")) {
      return `You can reach Vamshi at ${EMAIL} or through his LinkedIn: ${RESUME_CONTENT.contact.linkedin}`;
    }
    if (q.includes("project") || q.includes("built")) {
      const projects = RESUME_CONTENT.projects.map(p => p.title).join(", ");
      return `Some of Vamshi's key projects include: ${projects}. You can find more details in Chapter 3: The Builder.`;
    }
    if (q.includes("education") || q.includes("study")) {
      const edu = RESUME_CONTENT.education[0];
      return `Vamshi holds a ${edu.title} from ${edu.subtitle}, completed in ${edu.period}.`;
    }

    return "I'm having trouble connecting to my neural logic (API Disabled). However, you can review my Resume manually in the section below, or check out my experience, skills, and projects in the different chapters!";
  }

  getHistory() { return this.history; }
  
  clearHistory() { 
    this.history = []; 
    localStorage.removeItem('vk_chat_history');
  }
}