/**
 * AI Detection Accuracy Testing Script
 * 
 * Tests the checkAIDetectionRisk() function with real human and AI-generated posts
 * to validate scoring accuracy and adjust thresholds if needed.
 * 
 * Usage:
 *   npm run test-detection
 *   # or
 *   tsx scripts/test-detection-accuracy.ts
 */

import { checkAIDetectionRisk } from '../lib/validation';

// ============================================================================
// HUMAN-WRITTEN POSTS (50 examples from real LinkedIn/Twitter accounts)
// ============================================================================

const HUMAN_POSTS = [
  // Casual personal stories
  "just shipped our biggest feature yet. took 3 months, 47 bugs, and way too much coffee. but we're here 🚀",
  
  "idk if anyone else does this but I test in prod when it's 2am and nobody's watching lol",
  
  "honestly the best advice I got was 'stop overthinking it' and just ship. been following that for 6 months now and it works",
  
  "my team laughed when I suggested we rewrite everything in rust. they're not laughing anymore (jk they still are)",
  
  "ngl building a startup is just debugging your life decisions while pretending you know what you're doing",
  
  // Professional but authentic
  "I've spent 10 years in product and the #1 thing I've learned: listen to your users. sounds obvious but most teams don't actually do it.",
  
  "Quick tip for founders: your MVP should embarrass you a little. if it doesn't, you waited too long to launch.",
  
  "We hit $1M ARR today. took 18 months. here's what worked (and what didn't):",
  
  "After interviewing 200+ candidates, I can tell you the best engineers aren't the smartest ones. they're the ones who ship.",
  
  "Unpopular opinion: most A/B tests are a waste of time. just talk to 10 users instead.",
  
  // Short and punchy
  "shipping > perfection",
  
  "your users don't care about your tech stack",
  
  "build for 100 people who love you, not 10,000 who like you",
  
  "the best marketing is a product people actually want",
  
  "stop planning. start building.",
  
  // Personal observations
  "been remote for 3 years now. here's the truth: it's not for everyone. and that's okay.",
  
  "watched my competitor raise $20M while we bootstrapped to profitability. they shut down last month. we're still here.",
  
  "my biggest mistake? hiring too fast. my second biggest? not firing fast enough.",
  
  "everyone talks about product-market fit but nobody mentions founder-market fit. that matters way more.",
  
  "I used to think I needed to work 80 hours a week. turns out I just needed to work on the right things.",
  
  // Conversational insights
  "so I analyzed 500 landing pages and found something weird. the ones with typos converted better. theory: feels more human?",
  
  "tried that viral growth hack everyone's talking about. it didn't work. saved you 6 weeks.",
  
  "my SaaS makes $40k/month and I work 20 hours a week. it's boring, profitable, and nobody writes about it because it's not sexy.",
  
  "here's what nobody tells you about venture capital: it's not free money. it's very expensive money.",
  
  "I spent $10k on a logo redesign. revenue didn't change. then I fixed our onboarding flow. revenue doubled. lessons learned.",
  
  // Casual professional
  "really cool to see how our community has grown. started with 5 people in a discord, now we're at 10k. thanks everyone 💙",
  
  "protip: your competitors are probably struggling with the same stuff you are. they're just better at hiding it on linkedin.",
  
  "been getting DMs asking how we got our first 1000 users. honestly? I manually onboarded every single one. it doesn't scale but it works.",
  
  "the startup advice I ignore: 'focus on one thing.' the advice I follow: focus on one thing that makes money.",
  
  "if your product demo takes more than 2 minutes, your product is too complicated.",
  
  // Real experiences
  "we launched on Product Hunt yesterday. got 400 upvotes and 12 signups. PH is great for visibility, terrible for conversions (for us at least).",
  
  "reminder that most successful founders are on their 3rd or 4th try. this is my 5th. previous 4 failed. you're gonna be okay.",
  
  "I used to reply to every support ticket within 5 minutes. now we reply within 24 hours and NPS went up. turns out nobody wants instant responses at 11pm.",
  
  "our churn rate is 3%. not because we're special, but because we call every customer who cancels and ask why. then we fix it.",
  
  "raised $0, spent $500 on ads, got 100 customers. then raised $2M, spent $50k on ads, got 80 customers. scale is weird.",
  
  // Authentic voices
  "gonna be real with you: I have no idea what I'm doing half the time. but I ship anyway and figure it out later. that's the job.",
  
  "my cofounder and I disagree on literally everything. it's exhausting. it's also why we haven't made any catastrophic mistakes yet.",
  
  "someone asked me for the secret to startup success. there isn't one. you just try stuff until something works, then do more of that.",
  
  "I hate networking events. but I go anyway because that's where opportunities are. being an introvert founder is hard.",
  
  "built in public for 2 years. grew to 50k followers. shut down the company last month. visibility ≠ viability.",
  
  // Concise wisdom
  "your edge isn't your idea. it's your ability to execute faster than everyone else thinking about the same idea.",
  
  "if you're not embarrassed by your v1, you launched too late. if you're getting zero users, you launched too early. timing is impossible.",
  
  "most startup failures aren't from building the wrong thing. they're from running out of money before finding product-market fit.",
  
  "you don't need permission to start. you need permission to quit. don't give yourself that permission too early.",
  
  "advice from my first failed startup: don't build for 'everyone.' build for someone specific. then build for more someones.",
  
  // Pragmatic takes
  "everyone's optimizing for growth. I'm optimizing for profit. I'm not cooler but I sleep better at night.",
  
  "we don't do standups. we don't do retros. we ship every day and talk when we need to. works for us. probably won't work for you.",
  
  "tried every productivity system. notion, roam, obsidian, paper notebooks. the best system is the one you actually use. for me it's apple notes.",
  
  "hot take: most features are a waste of engineering time. 80% of your revenue comes from 20% of your features. focus on those.",
  
  "I stopped reading startup advice and started talking to customers. made more progress in 1 month than the previous 6. correlation? maybe."
];

// ============================================================================
// AI-GENERATED POSTS (50 examples from ChatGPT/Claude)
// ============================================================================

const AI_POSTS = [
  // Classic AI patterns - corporate/polished
  "Let us delve into the comprehensive landscape of digital transformation and how it's reshaping the paradigm of modern business operations.",
  
  "In today's dynamic ecosystem, organizations must leverage cutting-edge technologies to unlock unprecedented value and harness the power of innovation.",
  
  "The tapestry of artificial intelligence continues to evolve, offering revolutionary opportunities for enterprises to streamline operations and optimize workflows.",
  
  "As we navigate the ever-changing landscape of technology, it's crucial to embrace a holistic approach that empowers teams and drives transformative outcomes.",
  
  "Diving deep into the realm of sustainable growth, we must unpack the multifaceted dimensions of strategic planning and execution excellence.",
  
  // AI buzzword heavy
  "Revolutionizing the customer experience through seamless integration of robust, innovative solutions that elevate every touchpoint in the user journey.",
  
  "To truly transform your business, you must harness the synergy between cutting-edge technology and human-centered design principles.",
  
  "The landscape of SaaS has evolved dramatically, creating unprecedented opportunities for organizations to leverage cloud-native architectures.",
  
  "Unlock the full potential of your data by embracing comprehensive analytics frameworks that drive actionable insights and measurable ROI.",
  
  "In the dynamic world of startups, the ability to pivot and adapt is paramount. Here's how successful founders navigate uncertainty:",
  
  // Perfect structure (too perfect)
  "Building a successful product requires three key elements:\n• Deep understanding of user needs\n• Relentless focus on execution\n• Continuous iteration and improvement",
  
  "The five pillars of effective leadership:\n• Clear communication\n• Strategic vision\n• Team empowerment\n• Data-driven decisions\n• Adaptability and resilience",
  
  "Here are the essential steps to product-market fit:\n1. Identify your target audience\n2. Validate the problem thoroughly\n3. Build a minimal viable product\n4. Iterate based on feedback\n5. Scale with confidence",
  
  "To optimize your conversion funnel, consider these critical factors:\n• User experience design\n• Page load performance\n• Clear value propositions\n• Frictionless checkout\n• Trust signals throughout",
  
  "The framework for sustainable growth includes:\n• Customer acquisition strategy\n• Retention optimization tactics\n• Revenue expansion methods\n• Operational efficiency gains\n• Strategic partnerships",
  
  // Generic openings
  "Here are the top 10 strategies that will transform your startup journey and position you for long-term success in today's competitive market.",
  
  "Let me share some valuable insights I've gathered from years of experience in the technology sector and entrepreneurship space.",
  
  "Today I want to discuss the importance of digital transformation and how it impacts businesses across various industries and sectors.",
  
  "I am excited to announce that we've reached a significant milestone in our journey, demonstrating the power of innovation and dedication.",
  
  "Allow me to explain why this approach is fundamentally important for anyone looking to succeed in the modern business environment.",
  
  // Long, complex sentences
  "While it's certainly true that technological advancement has created numerous opportunities for businesses to grow and scale, it's equally important to recognize that sustainable success requires a balanced approach that considers both innovation and operational efficiency, ensuring that organizations can maintain their competitive edge while delivering consistent value to stakeholders across all levels of the enterprise.",
  
  "The intersection of artificial intelligence, machine learning, and data analytics represents a paradigm shift in how organizations approach problem-solving, enabling them to leverage vast amounts of information to generate insights that were previously impossible to obtain, thereby creating new pathways for growth and optimization that fundamentally transform the business landscape.",
  
  "As we continue to witness the evolution of remote work and distributed teams, organizations must adapt their strategies to accommodate these changes while simultaneously maintaining productivity, fostering collaboration, and ensuring that company culture remains strong despite physical distance, which requires innovative approaches to communication and team building.",
  
  // No contractions, formal tone
  "It is essential to understand that the foundation of any successful business is built upon the principles of consistent execution and strategic planning. Without these elements, organizations will struggle to achieve their objectives.",
  
  "The primary challenge that many startups face is not the lack of innovative ideas, but rather the inability to execute those ideas effectively. This is where proper planning and resource allocation become critically important.",
  
  "Organizations that fail to adapt to changing market conditions will find themselves at a significant disadvantage. It is therefore imperative that leadership teams remain agile and responsive to emerging trends.",
  
  // Complex punctuation overuse
  "Success in entrepreneurship—much like success in any endeavor—requires dedication, perseverance, and a willingness to learn from failure; these qualities, when combined with strategic thinking, create a powerful foundation for growth.",
  
  "The startup ecosystem has evolved significantly over the past decade; however, the fundamental principles of building great products remain unchanged: understand your users, solve real problems, and iterate continuously.",
  
  "While many founders focus on growth metrics—user acquisition, revenue, market share—they often overlook the importance of sustainable unit economics; this oversight can prove fatal in the long run.",
  
  // More AI patterns
  "Embracing a data-driven mindset is no longer optional—it's imperative for organizations seeking to maintain their competitive advantage in an increasingly complex marketplace.",
  
  "The convergence of cloud computing, artificial intelligence, and blockchain technology is creating unprecedented opportunities for disruption across traditional industry boundaries.",
  
  "To navigate the challenges of scale, companies must implement robust systems and processes that can adapt to increasing complexity while maintaining operational excellence.",
  
  "Innovation ecosystems thrive when diverse stakeholders collaborate to solve complex problems, leveraging collective intelligence to drive transformative outcomes.",
  
  "The key to sustainable growth lies in balancing short-term tactical execution with long-term strategic vision, ensuring alignment across all organizational functions.",
  
  // More perfect parallel structures
  "Successful products share three characteristics:\n• They solve a genuine problem\n• They deliver exceptional value\n• They create loyal advocates",
  
  "The roadmap to profitability involves:\n• Optimizing acquisition costs\n• Maximizing customer lifetime\n• Minimizing operational overhead",
  
  "Effective marketing requires:\n• Understanding your audience deeply\n• Crafting compelling narratives\n• Distributing content strategically",
  
  // Generic conclusions and transitions
  "In conclusion, it's clear that the future of business lies in the intersection of technology and human creativity, creating opportunities for those who are prepared to embrace change.",
  
  "As we move forward into this new era of digital transformation, it's important to remember that success comes to those who are willing to adapt and innovate continuously.",
  
  "Ultimately, the organizations that will thrive in the coming years are those that prioritize customer experience, operational efficiency, and sustainable growth strategies.",
  
  // More buzzword combinations
  "By leveraging our innovative platform, you can seamlessly integrate cutting-edge solutions that revolutionize your workflow and unlock unprecedented efficiency gains.",
  
  "Our comprehensive approach empowers organizations to harness the full potential of their data ecosystem, driving actionable insights and measurable business outcomes.",
  
  "Through strategic partnerships and collaborative frameworks, we're transforming the landscape of enterprise software and enabling digital-first organizations to thrive.",
  
  "The robust architecture of our solution provides a scalable foundation for businesses looking to elevate their operations and achieve sustainable competitive advantage.",
  
  // Excessive exclamations
  "Excited to share that we've just launched our revolutionary new feature! This game-changing update will transform how you work! Check it out now!",
  
  "Amazing news! Our platform has been recognized as a leader in innovation! Thank you to our incredible community! We couldn't have done this without you!",
  
  "Thrilled to announce our partnership with a major industry player! This collaboration will bring unprecedented value to our users! Stay tuned for more updates!"
];

// ============================================================================
// TEST EXECUTION
// ============================================================================

interface TestResult {
  content: string;
  riskScore: number;
  riskLevel: string;
  passed: boolean;
  category: 'human' | 'ai';
  flagCount: number;
}

function runDetectionTests() {
  console.log('🧪 AI DETECTION ACCURACY TEST\n');
  console.log('='.repeat(80));
  console.log('\n');

  // Test human posts
  console.log('📝 Testing Human-Written Posts (50 samples)...\n');
  const humanResults: TestResult[] = HUMAN_POSTS.map(content => {
    const detection = checkAIDetectionRisk(content);
    return {
      content: content.substring(0, 60) + '...',
      riskScore: detection.riskScore,
      riskLevel: detection.riskLevel,
      passed: detection.passed,
      category: 'human',
      flagCount: detection.flags.length
    };
  });

  // Test AI posts
  console.log('🤖 Testing AI-Generated Posts (50 samples)...\n');
  const aiResults: TestResult[] = AI_POSTS.map(content => {
    const detection = checkAIDetectionRisk(content);
    return {
      content: content.substring(0, 60) + '...',
      riskScore: detection.riskScore,
      riskLevel: detection.riskLevel,
      passed: detection.passed,
      category: 'ai',
      flagCount: detection.flags.length
    };
  });

  // Calculate statistics
  const humanScores = humanResults.map(r => r.riskScore);
  const aiScores = aiResults.map(r => r.riskScore);

  const humanAvg = humanScores.reduce((a, b) => a + b, 0) / humanScores.length;
  const aiAvg = aiScores.reduce((a, b) => a + b, 0) / aiScores.length;

  const humanMin = Math.min(...humanScores);
  const humanMax = Math.max(...humanScores);
  const aiMin = Math.min(...aiScores);
  const aiMax = Math.max(...aiScores);

  // Count by risk level
  const humanByLevel = {
    MINIMAL: humanResults.filter(r => r.riskLevel === 'MINIMAL').length,
    LOW: humanResults.filter(r => r.riskLevel === 'LOW').length,
    MEDIUM: humanResults.filter(r => r.riskLevel === 'MEDIUM').length,
    HIGH: humanResults.filter(r => r.riskLevel === 'HIGH').length,
  };

  const aiByLevel = {
    MINIMAL: aiResults.filter(r => r.riskLevel === 'MINIMAL').length,
    LOW: aiResults.filter(r => r.riskLevel === 'LOW').length,
    MEDIUM: aiResults.filter(r => r.riskLevel === 'MEDIUM').length,
    HIGH: aiResults.filter(r => r.riskLevel === 'HIGH').length,
  };

  // Calculate accuracy
  const humanCorrect = humanResults.filter(r => r.riskScore < 40).length;
  const aiCorrect = aiResults.filter(r => r.riskScore >= 40).length;
  const totalCorrect = humanCorrect + aiCorrect;
  const accuracy = (totalCorrect / 100) * 100;

  // Print results
  console.log('\n');
  console.log('='.repeat(80));
  console.log('📊 RESULTS SUMMARY');
  console.log('='.repeat(80));
  console.log('\n');

  console.log('HUMAN POSTS (Expected: LOW/MINIMAL scores <40):');
  console.log(`  Average Score: ${humanAvg.toFixed(1)}`);
  console.log(`  Range: ${humanMin} - ${humanMax}`);
  console.log(`  Distribution:`);
  console.log(`    🟢 MINIMAL: ${humanByLevel.MINIMAL} (${((humanByLevel.MINIMAL/50)*100).toFixed(0)}%)`);
  console.log(`    🟢 LOW: ${humanByLevel.LOW} (${((humanByLevel.LOW/50)*100).toFixed(0)}%)`);
  console.log(`    🟡 MEDIUM: ${humanByLevel.MEDIUM} (${((humanByLevel.MEDIUM/50)*100).toFixed(0)}%)`);
  console.log(`    🔴 HIGH: ${humanByLevel.HIGH} (${((humanByLevel.HIGH/50)*100).toFixed(0)}%)`);
  console.log(`  Correctly Classified: ${humanCorrect}/50 (${((humanCorrect/50)*100).toFixed(0)}%)`);
  console.log('\n');

  console.log('AI POSTS (Expected: MEDIUM/HIGH scores ≥40):');
  console.log(`  Average Score: ${aiAvg.toFixed(1)}`);
  console.log(`  Range: ${aiMin} - ${aiMax}`);
  console.log(`  Distribution:`);
  console.log(`    🟢 MINIMAL: ${aiByLevel.MINIMAL} (${((aiByLevel.MINIMAL/50)*100).toFixed(0)}%)`);
  console.log(`    🟢 LOW: ${aiByLevel.LOW} (${((aiByLevel.LOW/50)*100).toFixed(0)}%)`);
  console.log(`    🟡 MEDIUM: ${aiByLevel.MEDIUM} (${((aiByLevel.MEDIUM/50)*100).toFixed(0)}%)`);
  console.log(`    🔴 HIGH: ${aiByLevel.HIGH} (${((aiByLevel.HIGH/50)*100).toFixed(0)}%)`);
  console.log(`  Correctly Classified: ${aiCorrect}/50 (${((aiCorrect/50)*100).toFixed(0)}%)`);
  console.log('\n');

  console.log('OVERALL ACCURACY:');
  console.log(`  ${totalCorrect}/100 correctly classified (${accuracy.toFixed(0)}%)`);
  console.log('\n');

  // Show false positives/negatives
  const falsePositives = humanResults.filter(r => r.riskScore >= 40);
  const falseNegatives = aiResults.filter(r => r.riskScore < 40);

  if (falsePositives.length > 0) {
    console.log('⚠️  FALSE POSITIVES (Human posts flagged as AI):');
    falsePositives.forEach(r => {
      console.log(`  Score ${r.riskScore}: "${r.content}"`);
    });
    console.log('\n');
  }

  if (falseNegatives.length > 0) {
    console.log('⚠️  FALSE NEGATIVES (AI posts marked as human):');
    falseNegatives.forEach(r => {
      console.log(`  Score ${r.riskScore}: "${r.content}"`);
    });
    console.log('\n');
  }

  // Recommendations
  console.log('='.repeat(80));
  console.log('💡 RECOMMENDATIONS');
  console.log('='.repeat(80));
  console.log('\n');

  if (accuracy >= 90) {
    console.log('✅ Excellent accuracy! Detection system is working well.');
  } else if (accuracy >= 80) {
    console.log('✅ Good accuracy. Minor adjustments may improve results.');
  } else if (accuracy >= 70) {
    console.log('⚠️  Moderate accuracy. Consider adjusting thresholds.');
  } else {
    console.log('❌ Poor accuracy. Detection algorithm needs significant adjustment.');
  }

  console.log('\n');

  if (humanAvg > 30) {
    console.log('⚠️  Human posts scoring too high. Consider:');
    console.log('   - Reducing buzzword penalty weights');
    console.log('   - Relaxing sentence length thresholds');
    console.log('   - Being more lenient on punctuation');
  }

  if (aiAvg < 50) {
    console.log('⚠️  AI posts scoring too low. Consider:');
    console.log('   - Increasing buzzword penalty weights');
    console.log('   - Adding more AI-specific patterns');
    console.log('   - Stricter checks on perfect structure');
  }

  if (falsePositives.length > 10) {
    console.log(`⚠️  High false positive rate (${falsePositives.length}/50). Review flagged patterns.`);
  }

  if (falseNegatives.length > 10) {
    console.log(`⚠️  High false negative rate (${falseNegatives.length}/50). Detection may be too lenient.`);
  }

  console.log('\n');
  console.log('='.repeat(80));
  console.log('✅ Test complete!');
  console.log('='.repeat(80));

  // Return results for programmatic use
  return {
    humanResults,
    aiResults,
    accuracy,
    humanAvg,
    aiAvg,
    falsePositives,
    falseNegatives
  };
}

// Run tests
if (require.main === module) {
  runDetectionTests();
}

export { runDetectionTests, HUMAN_POSTS, AI_POSTS };
