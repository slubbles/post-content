require('dotenv').config();

console.log('=== ENVIRONMENT VARIABLES CHECK ===\n');

const required = [
  'DATABASE_URL',
  'NEXTAUTH_SECRET', 
  'NEXTAUTH_URL',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'XAI_API_KEY'
];

const missing = required.filter(v => !process.env[v]);

if (missing.length) {
  console.log('❌ Missing variables:', missing.join(', '));
  process.exit(1);
} else {
  console.log('✅ All critical env vars present\n');
  
  required.forEach(key => {
    const value = process.env[key];
    if (value) {
      // Show first/last chars for verification without exposing full value
      const masked = key.includes('URL') ? value : `${value.substring(0, 5)}...${value.substring(value.length - 5)}`;
      console.log(`${key}: ✅ ${masked}`);
    } else {
      console.log(`${key}: ❌ Missing`);
    }
  });
  
  console.log('\n✅ Environment check passed!');
}
