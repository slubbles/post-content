// Quick Detection Test - Run with: node scripts/quick-detection-test.mjs

// Simplified checkAIDetectionRisk for testing (copy of lib/validation.ts logic)
const AI_BUZZWORDS = [
  'delve', 'tapestry', 'leverage', 'dive deep', 'unpack',
  'landscape', 'paradigm', 'synergy', 'robust', 'comprehensive',
  'innovative', 'cutting-edge', 'revolutionary', 'game-changer',
  'unlock', 'harness', 'seamless', 'elevate', 'transform',
  'optimize', 'streamline', 'empower', 'dynamic'
];

function checkAIDetectionRisk(content) {
  let riskScore = 0;
  const flags = [];

  // Metric 1: AI Buzzwords (15 points each)
  const buzzwordMatches = AI_BUZZWORDS.filter(word => 
    content.toLowerCase().includes(word.toLowerCase())
  );
  const buzzwordCount = buzzwordMatches.length;
  if (buzzwordCount > 0) {
    const points = buzzwordCount * 15;
    riskScore += points;
    buzzwordMatches.forEach(word => {
      flags.push(`❌ AI buzzword: "${word}"`);
    });
  }

  // Metric 2: Sentence Length (20 points if avg >25 words)
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const totalWords = content.split(/\s+/).length;
  const avgSentenceLength = sentences.length > 0 ? totalWords / sentences.length : 0;
  
  if (avgSentenceLength > 25) {
    riskScore += 20;
    flags.push(`❌ Long sentences (avg ${Math.round(avgSentenceLength)} words)`);
  }

  // Metric 3: Personal Pronouns (25 points if missing)
  const hasPersonalPronouns = /\b(I|I'm|my|me|we|our)\b/i.test(content);
  if (!hasPersonalPronouns) {
    riskScore += 25;
    flags.push('❌ No personal pronouns');
  }

  // Metric 4: Contractions (15 points if missing)
  const hasContractions = /\b(I'm|you're|it's|don't|can't|won't|isn't|aren't)\b/i.test(content);
  if (!hasContractions && content.length > 50) {
    riskScore += 15;
    flags.push('❌ No contractions');
  }

  // Metric 5: Complex Punctuation (10 points)
  const hasComplexPunctuation = /[—;]/.test(content) || (content.match(/:/g) || []).length > 1;
  if (hasComplexPunctuation) {
    riskScore += 10;
    flags.push('❌ Complex punctuation');
  }

  // Metric 6: Generic Openings (10 points)
  const genericOpenings = ['Here are', 'Let me', 'Today I want', 'I am excited to', 'In this post', 'Allow me to'];
  const hasGenericOpening = genericOpenings.some(opening =>
    content.toLowerCase().startsWith(opening.toLowerCase())
  );
  if (hasGenericOpening) {
    riskScore += 10;
    flags.push('❌ Generic opening');
  }

  // Metric 7: Excessive Exclamation Marks (5 points if >3)
  const exclamationCount = (content.match(/!/g) || []).length;
  if (exclamationCount > 3) {
    riskScore += 5;
    flags.push(`❌ Too many exclamations (${exclamationCount})`);
  }

  let riskLevel;
  if (riskScore < 20) riskLevel = 'MINIMAL';
  else if (riskScore < 40) riskLevel = 'LOW';
  else if (riskScore < 60) riskLevel = 'MEDIUM';
  else riskLevel = 'HIGH';

  return {
    riskScore,
    riskLevel,
    passed: riskScore < 40,
    flags
  };
}

// Sample posts
const HUMAN_SAMPLES = [
  "just shipped our biggest feature yet. took 3 months and way too much coffee 🚀",
  "idk if anyone else does this but I test in prod when it's 2am lol",
  "honestly the best advice I got was 'stop overthinking it' and just ship",
  "I've spent 10 years in product and the #1 thing: listen to your users",
  "Quick tip for founders: your MVP should embarrass you a little",
  "shipping > perfection",
  "been remote for 3 years now. it's not for everyone. and that's okay.",
  "my biggest mistake? hiring too fast. second biggest? not firing fast enough.",
  "tried that viral growth hack. it didn't work. saved you 6 weeks.",
  "really cool to see how our community has grown. thanks everyone 💙"
];

const AI_SAMPLES = [
  "Let us delve into the comprehensive landscape of digital transformation.",
  "Organizations must leverage cutting-edge technologies to unlock unprecedented value.",
  "The tapestry of AI continues to evolve, offering revolutionary opportunities.",
  "As we navigate the ever-changing landscape of technology, we must embrace innovation.",
  "Here are the top 10 strategies that will transform your startup journey.",
  "Let me share some valuable insights I've gathered from years of experience.",
  "Today I want to discuss the importance of digital transformation.",
  "It is essential to understand that the foundation of any successful business is built upon consistency.",
  "Success in entrepreneurship—much like success in any endeavor—requires dedication.",
  "Embracing a data-driven mindset is no longer optional; it's imperative for organizations."
];

// Run test
console.log('🧪 Quick AI Detection Test\n');
console.log('=' .repeat(60));

console.log('\n📝 Human Posts (Expected: <40):');
let humanScores = [];
HUMAN_SAMPLES.forEach((post, i) => {
  const result = checkAIDetectionRisk(post);
  humanScores.push(result.riskScore);
  const emoji = result.riskScore < 20 ? '🟢' : result.riskScore < 40 ? '🟢' : result.riskScore < 60 ? '🟡' : '🔴';
  console.log(`${emoji} ${result.riskScore} - ${post.substring(0, 50)}...`);
});

console.log('\n🤖 AI Posts (Expected: ≥40):');
let aiScores = [];
AI_SAMPLES.forEach((post, i) => {
  const result = checkAIDetectionRisk(post);
  aiScores.push(result.riskScore);
  const emoji = result.riskScore < 20 ? '🟢' : result.riskScore < 40 ? '🟢' : result.riskScore < 60 ? '🟡' : '🔴';
  console.log(`${emoji} ${result.riskScore} - ${post.substring(0, 50)}...`);
});

// Calculate stats
const humanAvg = humanScores.reduce((a, b) => a + b, 0) / humanScores.length;
const aiAvg = aiScores.reduce((a, b) => a + b, 0) / aiScores.length;
const humanCorrect = humanScores.filter(s => s < 40).length;
const aiCorrect = aiScores.filter(s => s >= 40).length;
const accuracy = ((humanCorrect + aiCorrect) / 20) * 100;

console.log('\n' + '='.repeat(60));
console.log('📊 Results:');
console.log(`Human Average: ${humanAvg.toFixed(1)} (${humanCorrect}/10 correct)`);
console.log(`AI Average: ${aiAvg.toFixed(1)} (${aiCorrect}/10 correct)`);
console.log(`Overall Accuracy: ${accuracy.toFixed(0)}%`);
console.log('='.repeat(60));

if (accuracy >= 85) {
  console.log('\n✅ Great! Detection is working well.');
} else if (accuracy >= 70) {
  console.log('\n⚠️  Moderate accuracy. May need threshold adjustments.');
} else {
  console.log('\n❌ Low accuracy. Algorithm needs tuning.');
}
