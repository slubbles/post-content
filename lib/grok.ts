import OpenAI from 'openai';
import { getGenerationPrompt, getTemperature, VOICE_ANALYSIS_PROMPT, THREAD_GENERATION_PROMPT, validateContent } from './prompts';

// Initialize OpenAI client with xAI endpoint (optional for build time)
const grok = process.env.XAI_API_KEY 
  ? new OpenAI({
      apiKey: process.env.XAI_API_KEY,
      baseURL: 'https://api.x.ai/v1',
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

export async function generatePosts(options: GeneratePostOptions): Promise<string[]> {
  const { input, tone, platform, userVoice } = options;

  // Check if API is configured
  if (!grok) {
    throw new Error('XAI_API_KEY is not configured. Add it to .env.local');
  }

  // Get system prompt from prompts library
  const systemPrompt = getGenerationPrompt(tone, platform, userVoice);
  const temperature = getTemperature(tone);

  const platformName = platform.charAt(0).toUpperCase() + platform.slice(1);
  const userPrompt = `Generate 3 different ${platformName} posts about: "${input}"

Make each post unique and authentic. Vary the approach across the 3 posts.`;

  try {
    const completion = await grok.chat.completions.create({
      model: 'grok-3-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature,
      max_tokens: platform === 'linkedin' ? 1500 : 500,
    });

    const response = completion.choices[0]?.message?.content || '';
    
    // Parse the response into individual posts
    const lines = response.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    // Import PLATFORM_CONFIGS to get char limits
    const { PLATFORM_CONFIGS } = await import('./prompts');
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
        console.warn('Post validation warnings:', validation.warnings);
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
    console.error('Grok API error:', error);
    throw new Error('Failed to generate posts. Please try again.');
  }
}

export async function analyzeVoice(posts: string[]): Promise<any> {
  if (!grok) {
    throw new Error('XAI_API_KEY is not configured. Add it to .env.local');
  }

  const userPrompt = `Analyze these posts:\n\n${posts.join('\n\n')}`;

  try {
    const completion = await grok.chat.completions.create({
      model: 'grok-3-mini',
      messages: [
        { role: 'system', content: VOICE_ANALYSIS_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.3,
      max_tokens: 300,
    });

    const response = completion.choices[0]?.message?.content || '{}';
    return JSON.parse(response);
  } catch (error) {
    console.error('Voice analysis error:', error);
    throw new Error('Failed to analyze voice. Please try again.');
  }
}

export async function generateReplies(postToReply: string, context?: string): Promise<any[]> {
  if (!grok) {
    throw new Error('XAI_API_KEY is not configured. Add it to .env.local');
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
    const completion = await grok.chat.completions.create({
      model: 'grok-3-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 400,
    });

    const response = completion.choices[0]?.message?.content || '';
    
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
    console.error('Reply generation error:', error);
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
  if (!grok) {
    throw new Error('XAI_API_KEY is not configured. Add it to .env.local');
  }

  let userPrompt = `Create a thread about: "${topic}"`;
  
  if (keyPoints && keyPoints.trim()) {
    userPrompt += `\n\nKey points to cover:\n${keyPoints}`;
  }
  
  if (threadLength && threadLength > 0) {
    userPrompt += `\n\nTarget thread length: ${threadLength} tweets`;
  }

  try {
    const completion = await grok.chat.completions.create({
      model: 'grok-3-mini',
      messages: [
        { role: 'system', content: THREAD_GENERATION_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.8,
      max_tokens: 800,
    });

    const response = completion.choices[0]?.message?.content || '';
    
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
    console.error('Thread generation error:', error);
    throw new Error('Failed to generate thread. Please try again.');
  }
}
