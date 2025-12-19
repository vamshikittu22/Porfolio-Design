
import { GoogleGenAI, Type } from "@google/genai";

/**
 * GeminiService handles interactions with Google's GenAI models (Gemini and Veo).
 */
export class GeminiService {
  private static instance: GeminiService;
  
  static getInstance() {
    if (!this.instance) {
      this.instance = new GeminiService();
    }
    return this.instance;
  }

  async generateImage(prompt: string, baseImageBase64?: string): Promise<string> {
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
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error('No image returned from Nano Banana');
  }

  async generateVideo(prompt: string, imageBase64?: string): Promise<string> {
    // @ts-ignore
    if (window.aistudio && !(await window.aistudio.hasSelectedApiKey())) {
      // @ts-ignore
      await window.aistudio.openSelectKey();
    }

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

    try {
      let operation = await ai.models.generateVideos(params);
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        const pollAi = new GoogleGenAI({ apiKey: process.env.API_KEY });
        operation = await pollAi.operations.getVideosOperation({ operation: operation });
      }
      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (!downloadLink) throw new Error("Video generation failed");
      const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
      if (!response.ok) throw new Error(`Video fetch failed: ${response.statusText}`);
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error: any) {
      // @ts-ignore
      if (error.message?.includes("Requested entity was not found.") && window.aistudio) {
        // @ts-ignore
        await window.aistudio.openSelectKey();
      }
      throw error;
    }
  }

  async getTicTacToeHint(board: (string | null)[]): Promise<any> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const boardStr = JSON.stringify(board.map(v => v || ""));
    const prompt = `You are a Tic-Tac-Toe "Hint Coach". The user plays O and the system plays X. Suggest the best move for O.
Return valid JSON only.
Schema: { "recommendedIndex": number, "recommendedRowCol": [number, number], "reason": string, "priority": string, "alternativeIndices": number[] }
Priority order: Win now, Block loss, Create fork, Block X fork, Center, Opposite corner, Any corner, Any side.
Current board: ${boardStr}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedIndex: { type: Type.INTEGER },
            recommendedRowCol: { type: Type.ARRAY, items: { type: Type.INTEGER } },
            reason: { type: Type.STRING },
            priority: { type: Type.STRING },
            alternativeIndices: { type: Type.ARRAY, items: { type: Type.INTEGER } },
          },
          required: ["recommendedIndex", "reason", "priority"],
        }
      }
    });

    return JSON.parse(response.text || "{}");
  }
}
