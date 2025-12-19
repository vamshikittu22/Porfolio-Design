
import { SocialPost } from '../types';
import { INSTAGRAM_HANDLE, X_HANDLE } from '../constants';

/**
 * SocialService handles the logic for fetching live data from external APIs.
 * In a production app, these would call your own backend proxy to keep keys hidden.
 */
export class SocialService {
  private static instance: SocialService;

  // These would typically be provided via your hosting provider's Environment Variables
  private config = {
    instagramToken: '', // Set via process.env.INSTAGRAM_TOKEN in production
    xApiKey: '',        // Set via process.env.X_API_KEY in production
    linkedinToken: '',  // Set via process.env.LINKEDIN_TOKEN in production
  };

  static getInstance() {
    if (!this.instance) {
      this.instance = new SocialService();
    }
    return this.instance;
  }

  /**
   * Checks if live keys are configured
   */
  hasKeysConfigured(): boolean {
    return !!(this.config.instagramToken || this.config.xApiKey || this.config.linkedinToken);
  }

  /**
   * Example of how to fetch Instagram posts with a token
   */
  async fetchInstagramPosts(limit: number = 5): Promise<SocialPost[]> {
    if (!this.config.instagramToken) throw new Error("Instagram Token missing");

    const response = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,timestamp&access_token=${this.config.instagramToken}`);
    const data = await response.json();
    
    return data.data.slice(0, limit).map((item: any) => ({
      id: item.id,
      platform: 'instagram',
      content: item.caption || '',
      imageUrl: item.media_url,
      date: new Date(item.timestamp).toLocaleDateString(),
      link: item.permalink
    }));
  }

  /**
   * Example of how to fetch X (Twitter) posts
   */
  async fetchXPosts(limit: number = 5): Promise<SocialPost[]> {
    if (!this.config.xApiKey) throw new Error("X API Key missing");

    // Note: Twitter API v2 usually requires a Bearer token and has strict CORS
    const response = await fetch(`https://api.twitter.com/2/users/by/username/${X_HANDLE}/tweets`, {
      headers: { 'Authorization': `Bearer ${this.config.xApiKey}` }
    });
    const data = await response.json();
    
    return data.data.slice(0, limit).map((tweet: any) => ({
      id: tweet.id,
      platform: 'x',
      content: tweet.text,
      date: 'Recent',
      link: `https://x.com/${X_HANDLE}/status/${tweet.id}`
    }));
  }
}
