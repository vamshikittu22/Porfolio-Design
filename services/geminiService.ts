import { GoogleGenAI, Type } from "@google/genai";

/**
 * Fallback greetings used when the AI service is unavailable or quota-locked.
 * Rotates based on the current hour to ensure variety even in offline mode.
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

  /**
   * retryWithBackoff: Executes an async function with exponential backoff retries.
   * Standard strategy: 1s -> 2s -> 4s wait intervals.
   */
  private async retryWithBackoff<T>(
    fn: () => Promise<T>,
    context: string,
    maxRetries = 3
  ): Promise<T> {
    for (let i = 0; i < maxRetries; i++) {
      try {
        // ALWAYS check quota at the start of an attempt to catch concurrent locks
        await this.throttle();
        return await fn();
      } catch (error: any) {
        const isLastAttempt = i === maxRetries - 1;
        
        // Normalize error message for parsing
        const msg = typeof error === 'string' ? error : error?.message || JSON.stringify(error);
        
        // IMMEDIATE EXIT for Quota/Rate Limit issues
        if (
          msg.includes("429") || 
          msg.includes("quota") || 
          msg.includes("RESOURCE_EXHAUSTED") || 
          msg.includes("QUOTA_EXCEEDED")
        ) {
          // Trigger the lock if not already set by handleError
          if (!this.isQuotaLocked()) this.setQuotaLock(120000);
          throw error; 
        }

        if (isLastAttempt) {
          console.error(`[GeminiService] Max retries reached for ${context}:`, error);
          throw error;
        }

        const delay = 1000 * Math.pow(2, i);
        console.warn(`[GeminiService] Retry ${i + 1}/${maxRetries} for ${context} in ${delay}ms`);
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
      throw new Error(`QUOTA_EXCEEDED: API limit reached. Try again in ${this.getLockTimeRemaining()} seconds.`);
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
    // Better handling of SDK error objects vs JSON strings
    let message = typeof error === 'string' ? error : error?.message || "";
    
    // If the error message is a stringified JSON (common in Gemini SDK), parse it
    if (message.startsWith('{') && message.includes('"error"')) {
      try {
        const parsed = JSON.parse(message);
        message = parsed.error?.message || parsed.error?.status || message;
      } catch (e) { /* fallback to original message */ }
    }

    console.error(`[GeminiService] Error in ${context}:`, message);

    if (
      message.includes("429") || 
      message.includes("quota") || 
      message.includes("RESOURCE_EXHAUSTED") ||
      error?.status === "RESOURCE_EXHAUSTED"
    ) {
      this.setQuotaLock(120000); 
      throw new Error(`QUOTA_EXCEEDED: API limit reached. Try again in ${this.getLockTimeRemaining()} seconds.`);
    }
    
    if (message.includes("Failed to fetch") || message.includes("NetworkError")) {
      throw new Error("NETWORK_ISSUE: Unable to reach AI service. Check your connection.");
    }

    throw new Error(message || "UNEXPECTED_ERROR: Service connection error.");
  }

  async generateImage(prompt: string, baseImageBase64?: string, aspectRatio: "1:1" | "16:9" | "9:16" | "4:3" | "3:4" = "1:1"): Promise<string> {
    const cacheKey = `img_${prompt}_${aspectRatio}_${baseImageBase64 ? 'ctx' : 'raw'}`;
    const cached = localStorage.getItem(this.getCacheKey(cacheKey));
    if (cached) return cached;

    // Check lock before even entering the retry loop
    if (this.isQuotaLocked()) {
      throw new Error(`QUOTA_EXCEEDED: API limit reached. Try again in ${this.getLockTimeRemaining()} seconds.`);
    }

    return this.retryWithBackoff(async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const parts: any[] = [{ text: prompt }];
        
        if (baseImageBase64) {
          parts.push({
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
        
        throw new Error('INVALID_RESPONSE: AI generated invalid response.');
      } catch (error) {
        this.handleError(error, 'generateImage');
      }
    }, 'generateImage');
  }

  async generateVideo(prompt: string, baseImageBase64?: string): Promise<string> {
    if (this.isQuotaLocked()) {
      throw new Error(`QUOTA_EXCEEDED: API limit reached. Try again in ${this.getLockTimeRemaining()} seconds.`);
    }
    
    if (typeof window !== 'undefined' && (window as any).aistudio) {
      const hasKey = await (window as any).aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await (window as any).aistudio.openSelectKey();
      }
    }

    return this.retryWithBackoff(async () => {
      try {
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

        while (!operation.done) {
          await new Promise(resolve => setTimeout(resolve, 10000));
          operation = await ai.operations.getVideosOperation({ operation: operation });
        }

        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
        if (!downloadLink) throw new Error("MEDIA_UNAVAILABLE: Video generation link missing.");

        const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        if (!response.ok) {
          const errorText = await response.text();
          if (errorText.includes("Requested entity was not found.")) {
             if (typeof window !== 'undefined' && (window as any).aistudio) {
               await (window as any).aistudio.openSelectKey();
             }
          }
          throw new Error("FETCH_FAILED: Failed to fetch generated video media.");
        }

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

    // Determine deterministic fallback based on the current hour
    const hour = new Date().getHours();
    const fallback = FALLBACK_GREETINGS[hour % FALLBACK_GREETINGS.length];

    if (this.isQuotaLocked()) return fallback;

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Write a 15-word professional, welcoming greeting for a software engineer's portfolio. Focus on collaboration and engineering excellence. No jargon.",
      });

      const result = response.text || fallback;
      this.setCache(cacheKey, result);
      return result;
    } catch (error) {
      console.warn("[GeminiService] Neural greeting failed, using high-fidelity fallback.");
      return fallback;
    }
  }
}