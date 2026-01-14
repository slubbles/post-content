import Anthropic from '@anthropic-ai/sdk';
import { getGenerationPrompt, getTemperature, VOICE_ANALYSIS_PROMPT, THREAD_GENERATION_PROMPT, validateContent, PLATFORM_CONFIGS } from './prompts';

// Initialize Anthropic client (optional for build time)
const anthropic = process.env.ANTHROPIC_API_KEY 
  ? new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    })
  : null;

export interface GeneratePostOptions {
  input: string;
  tone: string;
  platform: string;
  userVoice?: {
    sarcasmLevel: number;
    tiredLevel: number;
    favoriteWords: string[];
    avgLength: number;
  };
}

export interface Reply {
  text: string;
  tag: string;
  color: string;
}

export async function generatePosts(options: GeneratePostOptions): Promise<string[]> {
  const { input, tone, platform, userVoice } = options;

  // Check if API is configured
  if (!anthropic) {
    throw new Error('ANTHROPIC_API_KEY is not configured. Add it to .env.local');
  }

  // Get system prompt from prompts library
  const systemPrompt = getGenerationPrompt(tone, platform, userVoice);
  const temperature = getTemperature(tone);

  const platformName = platform.charAt(0).toUpperCase() + platform.slice(1);
  const userPrompt = `Generate 3 different ${platformName} posts about: "${input}"

Make each post unique and authentic. Vary the approach across the 3 posts.`;

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: platform === 'linkedin' ? 1500 : 500,
      temperature,
      system: [
        {
          type: 'text',
          text: systemPrompt,
          cache_control: { type: 'ephemeral' as const }
        }
      ],
      messages: [
        {
          role: 'user',
          content: userPrompt
        }
      ],
    });

    const response = message.content[0].type === 'text' ? message.content[0].text : '';
    
    // Parse the response into individual posts
    const lines = response.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    const platformConfig = PLATFORM_CONFIGS[platform] || PLATFORM_CONFIGS.twitter;
    const maxChars = platformConfig.maxChars;
    
    const posts = lines
      // Remove metadata/description lines (like "Here's three unique posts...")
      .filter(line => !line.toLowerCase().includes("here's") && !line.toLowerCase().includes("i've varied"))
      // Remove markdown headers like "### Post 1:"
      .filter(line => !line.match(/^(###\s*)?Post\s*[0-9]+[:.)]?\s*$/i))
      // Remove numbering prefixes like "1.", "2.", "3."
      .map(line => line.replace(/^[0-9]+\.\s*/, ''))
      // Remove surrounding quotes
      .map(line => line.replace(/^["']|["']$/g, ''))
      // Extract content from quoted posts
      .map(line => {
        const match = line.match(/^[0-9]+\.\s*["'](.+)["']\s*$/);
        return match ? match[1] : line;
      })
      .map(line => line.trim())
      // Filter valid posts based on platform limits
      .filter(post => post.length > 10 && post.length <= maxChars)
      .slice(0, 3);

    // Validate posts
    posts.forEach(post => {
      const validation = validateContent(post, platform);
      if (!validation.valid) {
        console.warn('Post validation warning:', validation.error);
      }
    });

    // Fallback if parsing fails
    if (posts.length < 3) {
      return [
        response.slice(0, 280),
        response.slice(280, 560),
        response.slice(560, 840),
      ].filter(p => p.trim().length > 0);
    }

    return posts;
  } catch (error) {
    if ((error as any)?.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.');
    }
    throw new Error('Failed to generate posts. Please try again.');
  }
}

export interface VoiceAnalysisResult {
  sarcasmLevel: number;
  tiredLevel: number;
  favoriteWords: string[];
  avgLength: number;
  tone: string;
}

export async function analyzeVoice(posts: string[]): Promise<VoiceAnalysisResult> {
  if (!anthropic) {
    throw new Error('ANTHROPIC_API_KEY is not configured. Add it to .env.local');
  }

  const userPrompt = `Analyze these posts:\n\n${posts.join('\n\n')}`;

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 300,
      temperature: 0.5,
      system: [
        {
          type: 'text',
          text: VOICE_ANALYSIS_PROMPT,
          cache_control: { type: 'ephemeral' as const }
        }
      ],
      messages: [
        {
          role: 'user',
          content: userPrompt
        }
      ],
    });

    const response = message.content[0].type === 'text' ? message.content[0].text : '{}';
    return JSON.parse(response);
  } catch (error) {
    if ((error as any)?.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.');
    }
    throw new Error('Failed to analyze voice. Please try again.');
  }
}

export async function generateReplies(postToReply: string, context?: string): Promise<Reply[]> {
  if (!anthropic) {
    throw new Error('ANTHROPIC_API_KEY is not configured. Add it to .env.local');
  }

  const systemPrompt = `You are a reply generator for X/Twitter. Create authentic, engaging replies that feel human.
Generate 3 different replies with varying tones:
1. Funny/playful
2. Insightful/valuable
3. Spicy/bold

Each reply should:
- Be under 280 characters
- Sound natural, not AI-generated
- Add value or engagement
- Match the vibe of the original post`;

  const userPrompt = context
    ? `Post to reply to: "${postToReply}"\n\nContext/angle: ${context}`
    : `Post to reply to: "${postToReply}"`;

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 800,
      temperature: 0.8,
      system: [
        {
          type: 'text',
          text: systemPrompt,
          cache_control: { type: 'ephemeral' as const }
        }
      ],
      messages: [
        {
          role: 'user',
          content: userPrompt
        }
      ],
    });

    const response = message.content[0].type === 'text' ? message.content[0].text : '';
    
    const replies = response
      .split('\n')
      .filter(line => line.trim().length > 0)
      .map(line => line.replace(/^["']|["']$/g, '').trim())
      .filter(reply => reply.length > 0 && reply.length <= 280)
      .slice(0, 3);

    return [
      { text: replies[0] || 'Great point!', tag: 'Funny', color: 'orange' },
      { text: replies[1] || 'Interesting perspective.', tag: 'Insightful', color: 'blue' },
      { text: replies[2] || 'Bold take!', tag: 'Spicy', color: 'purple' },
    ];
  } catch (error) {
    if ((error as any)?.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.');
    }
    throw new Error('Failed to generate replies. Please try again.');
  }
}

interface Tweet {
  id: string;
  text: string;
  number: number;
}

export async function generateThread(
  topic: string, 
  keyPoints?: string, 
  threadLength?: number
): Promise<Tweet[]> {
  if (!anthropic) {
    throw new Error('ANTHROPIC_API_KEY is not configured. Add it to .env.local');
  }

  let userPrompt = `Create a thread about: "${topic}"`;
  
  if (keyPoints && keyPoints.trim()) {
    userPrompt += `\n\nKey points to cover:\n${keyPoints}`;
  }
  
  if (threadLength && threadLength > 0) {
    userPrompt += `\n\nTarget thread length: ${threadLength} tweets`;
  }

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 800,
      temperature: 0.8,
      system: [
        {
          type: 'text',
          text: THREAD_GENERATION_PROMPT,
          cache_control: { type: 'ephemeral' as const }
        }
      ],
      messages: [
        {
          role: 'user',
          content: userPrompt
        }
      ],
    });

    const response = message.content[0].type === 'text' ? message.content[0].text : '';
    
    // Parse tweets from response
    const maxTweets = threadLength || 7;
    const tweetTexts = response
      .split(/\n\n+/)
      .map(line => line.replace(/^[0-9]+[:.\/)\]]\s*/, '').trim())
      .filter(text => text.length > 0 && text.length <= 280)
      .slice(0, maxTweets);

    // Convert to Tweet objects
    const tweets: Tweet[] = tweetTexts.map((text, index) => ({
      id: `${Date.now()}-${index}`,
      text,
      number: index + 1,
    }));

    return tweets;
  } catch (error) {
    if ((error as any)?.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.');
    }
    throw new Error('Failed to generate thread. Please try again.');
  }
}
