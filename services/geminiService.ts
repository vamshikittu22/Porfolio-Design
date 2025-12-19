
import { GoogleGenAI } from "@google/genai";

/**
 * GeminiService handles interactions with Google's GenAI models (Gemini and Veo).
 * Note: AIStudio types and window.aistudio are assumed to be pre-configured globally.
 */
export class GeminiService {
  private static instance: GeminiService;
  
  static getInstance() {
    if (!this.instance) {
      this.instance = new GeminiService();
    }
    return this.instance;
  }

  /**
   * Generates or edits an image using Nano Banana (Gemini 2.5 Flash Image)
   */
  async generateImage(prompt: string, baseImageBase64?: string): Promise<string> {
    // Create a new instance right before the API call to ensure latest API key
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

    // Iterate through all parts to find the image part (do not assume it's the first one)
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error('No image returned from Nano Banana');
  }

  /**
   * Generates a video using Veo
   */
  async generateVideo(prompt: string, imageBase64?: string): Promise<string> {
    // Check whether an API key has been selected for Veo models as per guidelines
    // Assuming window.aistudio is pre-configured in the execution context
    // @ts-ignore
    if (window.aistudio && !(await window.aistudio.hasSelectedApiKey())) {
      // @ts-ignore
      await window.aistudio.openSelectKey();
      // Assume success after trigger to mitigate race conditions
    }

    // Create a new instance right before the API call to ensure latest API key
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
        // Create a new instance for the polling operation as well
        const pollAi = new GoogleGenAI({ apiKey: process.env.API_KEY });
        operation = await pollAi.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (!downloadLink) throw new Error("Video generation failed");

      // Must append API key when fetching from the download link
      const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
      if (!response.ok) throw new Error(`Video fetch failed: ${response.statusText}`);
      
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error: any) {
      // If request fails with "Requested entity was not found", reset and prompt for key
      // @ts-ignore
      if (error.message?.includes("Requested entity was not found.") && window.aistudio) {
        // @ts-ignore
        await window.aistudio.openSelectKey();
      }
      throw error;
    }
  }
}
