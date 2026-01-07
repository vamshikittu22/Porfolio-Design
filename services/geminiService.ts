
import { GoogleGenAI, Type } from "@google/genai";

export class GeminiService {
  private static instance: GeminiService;
  private cachePrefix = "gemini_v7_";
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

  private handleError(error: any): never {
    const message = error?.message || "";
    if (message.includes("429") || message.includes("quota") || message.includes("RESOURCE_EXHAUSTED")) {
      this.setQuotaLock(120000); 
      throw new Error("QUOTA_EXCEEDED: API limit reached. Cooling down system.");
    }
    throw new Error(message || "Service connection error.");
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
        localStorage.setItem(this.getCacheKey(cacheKey), result);
        return result;
      }
      
      throw new Error('Image generation failed.');
    } catch (error) {
      this.handleError(error);
    }
  }

  // Fix: Added generateVideo implementation to satisfy AIPlayground requirements
  async generateVideo(prompt: string, baseImageBase64?: string): Promise<string> {
    await this.throttle();
    
    // Check for API key selection for Veo models as per mandatory requirements
    if (typeof window !== 'undefined' && (window as any).aistudio) {
      const hasKey = await (window as any).aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await (window as any).aistudio.openSelectKey();
      }
    }

    try {
      // Create a new instance right before making an API call to ensure latest key is used
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const payload: any = {
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      };

      if (baseImageBase64) {
        payload.image = {
          imageBytes: baseImageBase64.split(',')[1] || baseImageBase64,
          mimeType: 'image/png',
        };
      }

      let operation = await ai.models.generateVideos(payload);

      // Long-running operation polling
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (!downloadLink) throw new Error("Video generation failed: Link unavailable.");

      // Fetch from download link appending the API key
      const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
      if (!response.ok) {
        const errorText = await response.text();
        if (errorText.includes("Requested entity was not found.")) {
           if (typeof window !== 'undefined' && (window as any).aistudio) {
             await (window as any).aistudio.openSelectKey();
           }
        }
        throw new Error("Failed to fetch generated video media.");
      }

      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
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
              reason: { type: Type.STRING }
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
        contents: "Write a 15-word professional, welcoming greeting for a software engineer's portfolio. Focus on collaboration and engineering excellence. No jargon.",
      });

      const result = response.text || "Connection established. Open for professional collaboration and engineering opportunities.";
      this.setCache(cacheKey, result);
      return result;
    } catch {
      return "Connection established. Open for professional collaboration and engineering opportunities.";
    }
  }
}
