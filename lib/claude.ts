import Anthropic from '@anthropic-ai/sdk';
import { 
  getGenerationPrompt, 
  getTemperature, 
  VOICE_ANALYSIS_PROMPT, 
  THREAD_GENERATION_PROMPT, 
  validateContent, 
  PLATFORM_CONFIGS,
  HUMANNESS_LEVELS,
  type HumannessLevel
} from './prompts';
import { checkAIDetectionRisk } from './validation';
import type { AIDetectionResult, GenerationResult } from '@/types/api';

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
  humanness?: HumannessLevel;
  multiHumanness?: boolean;
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
  const { input, tone, platform, humanness, userVoice } = options;

  // Check if API is configured
  if (!anthropic) {
    throw new Error('ANTHROPIC_API_KEY is not configured. Add it to .env.local');
  }

  // Build system prompt with humanness layer if specified
  let systemPrompt = getGenerationPrompt(tone, platform, userVoice);
  
  if (humanness) {
    const humannessConfig = HUMANNESS_LEVELS[humanness];
    systemPrompt += `\n\n## HUMANNESS LEVEL: ${humannessConfig.description}\n\n`;
    systemPrompt += `**Detection Risk Target:** ${humannessConfig.detectionRisk}\n\n`;
    systemPrompt += humannessConfig.instructions;
  }
  
  // Use humanness temperature if set, otherwise use tone temperature
  const temperature = humanness 
    ? HUMANNESS_LEVELS[humanness].temperature 
    : getTemperature(tone);

  const platformName = platform.charAt(0).toUpperCase() + platform.slice(1);
  const userPrompt = `Generate exactly 3 different ${platformName} posts about: "${input}"

CRITICAL FORMATTING RULES:
- Output ONLY the raw post text, no labels, no numbering, no markdown
- No "Post 1:", "**Post**", or any prefixes
- Each post on its own line, separated by a blank line
- No quotes around the posts
- No explanations or commentary
- Just the pure post text ready to copy-paste

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
        console.warn('Post validation warning:', validation.warnings.join(', '));
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

/**
 * Generate posts with AI detection analysis
 * Returns posts with humanness level and detection scores
 */
export async function generatePostsWithDetection(
  options: GeneratePostOptions
): Promise<GenerationResult[]> {
  const { multiHumanness, humanness } = options;
  
  if (!anthropic) {
    throw new Error('ANTHROPIC_API_KEY is not configured');
  }
  
  // MULTI-HUMANNESS MODE: Generate 3 versions at different levels
  if (multiHumanness) {
    const levels: HumannessLevel[] = [
      'professional_authentic',
      'casual_authentic',
      'texting_friend'
    ];
    
    const results = await Promise.all(
      levels.map(async (level) => {
        const posts = await generatePosts({
          ...options,
          humanness: level,
          multiHumanness: false
        });
        
        const humannessConfig = HUMANNESS_LEVELS[level];
        
        // Use first post from the generation
        const content = posts[0] || '';
        const aiDetection = checkAIDetectionRisk(content);
        
        return {
          content,
          humanness: humannessConfig.description,
          aiDetection
        };
      })
    );
    
    return results;
  }
  
  // STANDARD MODE: Generate posts and analyze
  const posts = await generatePosts(options);
  
  return posts.map(content => ({
    content,
    humanness: humanness ? HUMANNESS_LEVELS[humanness].description : undefined,
    aiDetection: checkAIDetectionRisk(content)
  }));
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

/**
 * Humanize AI-generated content to reduce detection risk
 * Makes content sound more natural and human-written
 */
export interface HumanizedResult {
  humanized: string;
  before: AIDetectionResult;
  after: AIDetectionResult;
  improvements: string[];
}

export interface VoiceProfile {
  sarcasmLevel: number;
  tiredLevel: number;
  favoriteWords: string[];
  avgLength: number;
}

export async function humanizeContent(
  content: string,
  currentTone: string,
  platform: string,
  voiceProfile?: VoiceProfile | null
): Promise<HumanizedResult> {
  
  if (!anthropic) {
    throw new Error('ANTHROPIC_API_KEY is not configured');
  }
  
  const beforeScore = checkAIDetectionRisk(content);
  const platformConfig = PLATFORM_CONFIGS[platform] || PLATFORM_CONFIGS.twitter;
  
  const humanizePrompt = `
You are an expert at making AI-generated content sound authentically human.

ORIGINAL CONTENT:
${content}

CURRENT SETTINGS:
- Tone: ${currentTone}
- Platform: ${platform}
- Character Limit: ${platformConfig.maxChars}

${voiceProfile ? `
USER'S VOICE PROFILE:
- Sarcasm level: ${voiceProfile.sarcasmLevel}%
- Tired/burnout vibes: ${voiceProfile.tiredLevel}%
- Signature words: ${voiceProfile.favoriteWords.join(', ')}
- Average sentence length: ${voiceProfile.avgLength} words
` : ''}

YOUR MISSION: Make this sound like a real person wrote it quickly, not an AI.

APPLY THESE CHANGES:

1. **Simplify Vocabulary** (Critical)
   - Replace: leverage → use, robust → strong, comprehensive → complete
   - Replace: delve → explore, tapestry → mix, paradigm → model
   - Use everyday words a friend would use

2. **Add Casual Elements**
   - Use contractions naturally: I'm, you're, it's, don't, can't
   - Can add occasional fillers: honestly, actually, tbh (sparingly)
   - Lowercase 'i' once or twice if it feels natural
   - Can use "idk", "lol" if tone allows

3. **Create Natural Imperfections**
   - Vary sentence rhythm dramatically (mix 5-word and 20-word sentences)
   - Use fragments where they'd naturally occur
   - Can trail off with ... if appropriate
   - Break "perfect" parallel structure in lists
   - Remove overly polished transitions

4. **Fix AI Tells**
   - Cut all AI buzzwords completely
   - Remove formal punctuation (em-dashes, semicolons)
   - Eliminate perfect parallel structure
   - NO generic openings ("Here are...", "Let me...")
   - Reduce exclamation marks to 1-2 max

5. **Add Authenticity**
   - Include personal pronouns (I, my, we)
   - Can admit uncertainty: "I think", "maybe", "probably"
   - Sound typed quickly, not carefully edited
   - Personal voice over corporate voice
   - Can be slightly imperfect (it's humanizing)

6. **Maintain Quality**
   - Keep the core message intact
   - Preserve the framework structure (Hook-Story-Offer)
   - Same value proposition
   - Just change HOW it's said, not WHAT

CRITICAL RULES:
- Character limit: ${platformConfig.maxChars} (strict)
- Keep the same tone essence (${currentTone})
- Don't lose the conversion elements
- Sound like someone typing to their audience, not a bot

OUTPUT: Return ONLY the rewritten content, nothing else.
`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      temperature: 0.9, // High temp for natural variation
      messages: [{
        role: 'user',
        content: humanizePrompt
      }]
    });

    const humanized = response.content[0].type === 'text' 
      ? response.content[0].text.trim() 
      : content;
      
    const afterScore = checkAIDetectionRisk(humanized);
    
    // Calculate improvements
    const improvements: string[] = [];
    
    if (afterScore.riskScore < beforeScore.riskScore) {
      const improvement = beforeScore.riskScore - afterScore.riskScore;
      improvements.push(`Risk score reduced by ${improvement} points`);
    }
    
    if (!beforeScore.metrics.hasPersonalPronouns && afterScore.metrics.hasPersonalPronouns) {
      improvements.push('Added personal pronouns');
    }
    
    if (!beforeScore.metrics.hasContractions && afterScore.metrics.hasContractions) {
      improvements.push('Added contractions');
    }
    
    if (beforeScore.metrics.aiBuzzwordCount > afterScore.metrics.aiBuzzwordCount) {
      const removed = beforeScore.metrics.aiBuzzwordCount - afterScore.metrics.aiBuzzwordCount;
      improvements.push(`Removed ${removed} AI buzzword${removed > 1 ? 's' : ''}`);
    }
    
    if (beforeScore.metrics.avgSentenceLength > afterScore.metrics.avgSentenceLength + 3) {
      improvements.push('Shortened average sentence length');
    }
    
    return {
      humanized,
      before: beforeScore,
      after: afterScore,
      improvements
    };
  } catch (error) {
    console.error('Humanize error:', error);
    throw new Error('Failed to humanize content. Please try again.');
  }
}
