import { describe, it, expect, beforeEach } from 'vitest';
import { GeminiService } from './geminiService';

describe('GeminiService', () => {
  let service: GeminiService;

  beforeEach(() => {
    service = GeminiService.getInstance();
    localStorage.clear();
    sessionStorage.clear();
  });

  it('should be a consistent singleton instance', () => {
    const instance1 = GeminiService.getInstance();
    const instance2 = GeminiService.getInstance();
    expect(instance1).toBe(instance2);
  });

  it('should respect active quota locks', async () => {
    // Set a lock for 120 seconds
    service.setQuotaLock(120000);
    
    expect(service.isQuotaLocked()).toBe(true);
    
    await expect(
      service.generateImage('Test prompt')
    ).rejects.toThrow('QUOTA_EXCEEDED');
  });

  it('should calculate remaining lock time correctly', () => {
    const duration = 60000;
    service.setQuotaLock(duration);
    const remaining = service.getLockTimeRemaining();
    
    expect(remaining).toBeGreaterThan(50);
    expect(remaining).toBeLessThanOrEqual(60);
  });

  it('should handle image generation caching', async () => {
    const prompt = 'unique-test-cache-prompt';
    const fakeBase64 = 'data:image/png;base64,sample-payload';
    
    // Inject into internal cache key logic
    const key = (service as any).getCacheKey(`img_${prompt}_1:1_raw`);
    localStorage.setItem(key, fakeBase64);
    
    const result = await service.generateImage(prompt);
    expect(result).toBe(fakeBase64);
  });
});