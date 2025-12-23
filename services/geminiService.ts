
import { GoogleGenAI, Type } from "@google/genai";

/**
 * GeminiService handles interactions with Google's GenAI models.
 * Optimized for Free Tier stability using persistent caching and strict global throttling.
 */
export class GeminiService {
  private static instance: GeminiService;
  private cachePrefix = "gemini_v6_";
  private lastRequestTime = 0;
  private minRequestInterval = 8000; 
  
  private static quotaLockedUntil = 0;

  static getInstance() {
    if (!this.instance) {
      this.instance = new GeminiService();
    }
    return this.instance;
  }

  public isQuotaLocked(): boolean {
    this.checkPersistentLock();
    return Date.now() < GeminiService.quotaLockedUntil;
  }

  public getLockTimeRemaining(): number {
    return Math.max(0, Math.ceil((GeminiService.quotaLockedUntil - Date.now()) / 1000));
  }

  private setQuotaLock(durationMs: number = 120000) { 
    GeminiService.quotaLockedUntil = Date.now() + durationMs;
    localStorage.setItem('gemini_quota_lock', GeminiService.quotaLockedUntil.toString());
  }

  private checkPersistentLock() {
    const savedLock = localStorage.getItem('gemini_quota_lock');
    if (savedLock) {
      const lockTime = parseInt(savedLock, 10);
      if (lockTime > Date.now()) {
        GeminiService.quotaLockedUntil = lockTime;
      }
    }
  }

  private async throttle() {
    this.checkPersistentLock();
    if (this.isQuotaLocked()) {
      throw new Error(`QUOTA_EXCEEDED: System cooling down (${this.getLockTimeRemaining()}s remaining).`);
    }

    const now = Date.now();
    const timeSinceLast = now - this.lastRequestTime;
    if (timeSinceLast < this.minRequestInterval) {
      await new Promise(resolve => setTimeout(resolve, this.minRequestInterval - timeSinceLast));
    }
    this.lastRequestTime = Date.now();
  }

  private getCacheKey(key: string): string {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      const char = key.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return this.cachePrefix + Math.abs(hash).toString(36);
  }

  private getCached(key: string): string | null {
    try {
      return sessionStorage.getItem(this.getCacheKey(key));
    } catch {
      return null;
    }
  }

  private setCache(key: string, value: string) {
    try {
      sessionStorage.setItem(this.getCacheKey(key), value);
    } catch (e) {
      Object.keys(sessionStorage).forEach(k => {
        if (k.startsWith(this.cachePrefix)) sessionStorage.removeItem(k);
      });
      try {
        sessionStorage.setItem(this.getCacheKey(key), value);
      } catch {}
    }
  }

  private setCachedImage(key: string, value: string) {
    try {
      localStorage.setItem(this.getCacheKey(key), value);
    } catch (e) {
      Object.keys(localStorage).forEach(k => {
        if (k.startsWith(this.cachePrefix)) localStorage.removeItem(k);
      });
      try {
        localStorage.setItem(this.getCacheKey(key), value);
      } catch {}
    }
  }

  private handleError(error: any): never {
    const status = error?.status || error?.error?.code;
    const message = error?.message || "";

    if (status === 429 || message.includes("429") || message.includes("quota") || message.includes("RESOURCE_EXHAUSTED")) {
      this.setQuotaLock(120000); 
      throw new Error("QUOTA_EXCEEDED: API limit reached. Cooling down system.");
    }
    
    throw new Error(message || "Neural synchronization error.");
  }

  async generateImage(prompt: string, baseImageBase64?: string, aspectRatio: "1:1" | "16:9" | "9:16" | "4:3" | "3:4" = "1:1"): Promise<string> {
    const cacheKey = `img_${prompt}_${aspectRatio}_${baseImageBase64 ? 'ctx' : 'raw'}`;
    const cached = localStorage.getItem(this.getCacheKey(cacheKey));
    if (cached) return cached;

    await this.throttle();

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const parts: any[] = [{ text: prompt }];
      
      if (baseImageBase64) {
        parts.unshift({
          inlineData: {
            data: baseImageBase64.split(',')[1] || baseImageBase64,
            mimeType: 'image/png',
          }
        });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio
          }
        }
      });

      let result = "";
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          result = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }

      if (result) {
        this.setCachedImage(cacheKey, result);
        return result;
      }
      
      throw new Error('Empty visualization payload.');
    } catch (error) {
      this.handleError(error);
    }
  }

  async generateVideo(prompt: string, imageBase64?: string): Promise<string> {
    // @ts-ignore
    if (window.aistudio && !(await window.aistudio.hasSelectedApiKey())) {
      // @ts-ignore
      await window.aistudio.openSelectKey();
    }

    await this.throttle();

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const params: any = {
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      };

      if (imageBase64) {
        params.image = {
          imageBytes: imageBase64.split(',')[1] || imageBase64,
          mimeType: 'image/png'
        };
      }

      let operation = await ai.models.generateVideos(params);
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        const pollAi = new GoogleGenAI({ apiKey: process.env.API_KEY });
        operation = await pollAi.operations.getVideosOperation({ operation: operation });
      }
      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (!downloadLink) throw new Error("Temporal synthesis failed.");
      const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
      if (!response.ok) throw new Error(`Stream interrupted: ${response.statusText}`);
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error: any) {
      // @ts-ignore
      if (error.message?.includes("Requested entity was not found.") && window.aistudio) {
        // @ts-ignore
        await window.aistudio.openSelectKey();
      }
      this.handleError(error);
    }
  }

  async getTicTacToeHint(board: (string | null)[]): Promise<any> {
    await this.throttle();
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const boardStr = JSON.stringify(board.map(v => v || ""));
      const prompt = `Tic-Tac-Toe Hint: User=O, System=X. Recommend best move for O. JSON ONLY. Board: ${boardStr}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              recommendedIndex: { type: Type.INTEGER },
              reason: { type: Type.STRING },
              priority: { type: Type.STRING }
            },
            required: ["recommendedIndex", "reason"],
          }
        }
      });

      return JSON.parse(response.text || "{}");
    } catch (error) {
      this.handleError(error);
    }
  }

  async getNeuralGreeting(): Promise<string> {
    const cacheKey = "neural_greeting";
    const cached = this.getCached(cacheKey);
    if (cached) return cached;

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Write a 15-word hyper-sophisticated, minimalist greeting for a senior engineer's portfolio contact section. Theme: Swiss Precision meets Neural Networks. Do not use generic words like 'Welcome'.",
        config: {
          thinkingConfig: { thinkingBudget: 0 }
        }
      });

      const result = response.text || "Link established. Systems optimized for cross-sector architectural collaboration.";
      this.setCache(cacheKey, result);
      return result;
    } catch {
      return "Link established. Systems optimized for cross-sector architectural collaboration.";
    }
  }
}
