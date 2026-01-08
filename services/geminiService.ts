
import { GoogleGenAI, Type } from "@google/genai";

/**
 * Fallback greetings used when the AI service is unavailable or quota-locked.
 */
const FALLBACK_GREETINGS = [
  "Open for professional collaboration on innovative software systems.",
  "Ready to architect scalable full-stack solutions and AI integrations.",
  "Available for software engineering opportunities and technical leadership."
];

export class GeminiService {
  private static instance: GeminiService;
  private cachePrefix = "gemini_v8_";
  private lastRequestTime = 0;
  private minRequestInterval = 5000; 
  
  private static quotaLockedUntil = 0;

  static getInstance() {
    if (!this.instance) {
      this.instance = new GeminiService();
    }
    return this.instance;
  }

  private async retryWithBackoff<T>(
    fn: () => Promise<T>,
    context: string,
    maxRetries = 2
  ): Promise<T> {
    for (let i = 0; i < maxRetries; i++) {
      try {
        await this.throttle();
        return await fn();
      } catch (error: any) {
        const isLastAttempt = i === maxRetries - 1;
        
        const msg = typeof error === 'string' ? error : error?.message || JSON.stringify(error);
        const isQuotaError = 
          msg.toLowerCase().includes("429") || 
          msg.toLowerCase().includes("quota") || 
          msg.toLowerCase().includes("limit") ||
          msg.toLowerCase().includes("resource_exhausted");

        if (isQuotaError) {
          if (!this.isQuotaLocked()) this.setQuotaLock(120000);
          throw new Error(`QUOTA_EXCEEDED: API limit reached.`);
        }

        if (isLastAttempt) throw error;

        const delay = 1000 * Math.pow(2, i);
        await new Promise(r => setTimeout(r, delay));
      }
    }
    throw new Error('Retransmission failure');
  }

  public isQuotaLocked(): boolean {
    this.checkPersistentLock();
    return Date.now() < GeminiService.quotaLockedUntil;
  }

  public getLockTimeRemaining(): number {
    return Math.max(0, Math.ceil((GeminiService.quotaLockedUntil - Date.now()) / 1000));
  }

  public setQuotaLock(durationMs: number = 120000) { 
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
      throw new Error(`QUOTA_EXCEEDED: API limit reached.`);
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

  private handleError(error: any, context: string): never {
    let message = typeof error === 'string' ? error : error?.message || "";
    const isQuotaError = message.toLowerCase().includes("429") || message.toLowerCase().includes("quota");
    if (isQuotaError) this.setQuotaLock(120000);
    throw new Error(message || "UNEXPECTED_ERROR");
  }

  async generateImage(
    prompt: string, 
    baseImageBase64?: string, 
    aspectRatio: "1:1" | "16:9" | "9:16" | "4:3" | "3:4" = "1:1",
    physicalFallbackUrl?: string
  ): Promise<string> {
    const cacheKey = `img_${prompt}_${aspectRatio}`;
    const backupKey = `bkp_img_${prompt.substring(0, 15)}`;
    
    // LAYER 1: Session Cache (Instant)
    const cached = this.getCached(cacheKey);
    if (cached) return cached;

    const runAIGeneration = async () => {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const parts: any[] = [{ text: prompt }];
      if (baseImageBase64) {
        parts.push({ inlineData: { data: baseImageBase64.split(',')[1] || baseImageBase64, mimeType: 'image/png' } });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts },
        config: { imageConfig: { aspectRatio: aspectRatio } }
      });

      let result = "";
      for (const candidate of response.candidates || []) {
        for (const part of candidate.content?.parts || []) {
          if (part.inlineData) {
            result = `data:image/png;base64,${part.inlineData.data}`;
            break;
          }
        }
        if (result) break;
      }
      if (!result) throw new Error("Empty AI result");
      return result;
    };

    try {
      if (this.isQuotaLocked()) throw new Error("QUOTA_LOCKED");
      const result = await this.retryWithBackoff(runAIGeneration, 'generateImage', 1);
      this.setCache(cacheKey, result);
      localStorage.setItem(this.getCacheKey(backupKey), result);
      return result;
    } catch (error) {
      console.warn(`[GeminiService] AI Image Failure - Falling back to physical assets.`);
      // LAYER 3: Last Successful Build Backup (Persistent)
      const lastSuccess = localStorage.getItem(this.getCacheKey(backupKey));
      if (lastSuccess) return lastSuccess;

      // LAYER 4: Hardcoded Reliable Physical URL (Final Safety)
      if (physicalFallbackUrl) return physicalFallbackUrl;
      throw error;
    }
  }

  async generateVideo(prompt: string, baseImageBase64?: string): Promise<string> {
    if (this.isQuotaLocked()) throw new Error("QUOTA_LOCKED");
    
    return this.retryWithBackoff(async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const payload: any = {
          model: 'veo-3.1-fast-generate-preview',
          prompt: prompt,
          config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '16:9' }
        };

        if (baseImageBase64) {
          payload.image = { imageBytes: baseImageBase64.split(',')[1] || baseImageBase64, mimeType: 'image/png' };
        }

        let operation = await ai.models.generateVideos(payload);
        while (!operation.done) {
          await new Promise(resolve => setTimeout(resolve, 10000));
          operation = await ai.operations.getVideosOperation({ operation: operation });
        }

        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
        if (!downloadLink) throw new Error("Video link missing");

        const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const blob = await response.blob();
        return URL.createObjectURL(blob);
      } catch (error) {
        this.handleError(error, 'generateVideo');
      }
    }, 'generateVideo');
  }

  async getTicTacToeHint(board: (string | null)[]): Promise<any> {
    return this.retryWithBackoff(async () => {
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
        this.handleError(error, 'getTicTacToeHint');
      }
    }, 'getTicTacToeHint');
  }

  async getNeuralGreeting(): Promise<string> {
    const cacheKey = "neural_greeting";
    const cached = this.getCached(cacheKey);
    if (cached) return cached;
    const hour = new Date().getHours();
    const fallback = FALLBACK_GREETINGS[hour % FALLBACK_GREETINGS.length];
    if (this.isQuotaLocked()) return fallback;

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Write a 15-word professional greeting for a software engineer's portfolio. No jargon.",
      });
      const result = response.text || fallback;
      this.setCache(cacheKey, result);
      return result;
    } catch {
      return fallback;
    }
  }
}
