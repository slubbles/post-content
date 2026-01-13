#!/usr/bin/env node
/**
 * Test Resend email configuration
 * Usage: node scripts/test-email.mjs your-email@example.com
 */

import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const testEmail = process.argv[2];

if (!testEmail) {
  console.error('❌ Usage: node scripts/test-email.mjs your-email@example.com');
  process.exit(1);
}

if (!RESEND_API_KEY) {
  console.error('❌ RESEND_API_KEY environment variable not set');
  console.error('   Add it to .env.local: RESEND_API_KEY=re_xxxxxxxxx');
  process.exit(1);
}

console.log('🔍 Testing Resend email configuration...\n');
console.log(`📧 Sending test email to: ${testEmail}`);
console.log(`🔑 API Key: ${RESEND_API_KEY.slice(0, 10)}...`);

const resend = new Resend(RESEND_API_KEY);

try {
  const response = await resend.emails.send({
    from: 'PostContent <noreply@postcontent.io>',
    to: testEmail,
    subject: 'Test Email from PostContent',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>✅ Email Configuration Test</h1>
        <p>If you're reading this, your Resend integration is working correctly!</p>
        <p><strong>Domain:</strong> postcontent.io</p>
        <p><strong>From:</strong> noreply@postcontent.io</p>
        <p><strong>Time:</strong> ${new Date().toISOString()}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">
          This is a test email from your PostContent application.
        </p>
      </div>
    `,
  });

  console.log('\n✅ Email sent successfully!');
  console.log(`   Email ID: ${response.data.id}`);
  console.log(`\n📬 Check ${testEmail} for the test email`);
  console.log('   (Check spam folder if not in inbox)\n');
  
} catch (error) {
  console.error('\n❌ Failed to send email:');
  console.error(error);
  console.log('\n🔧 Troubleshooting:');
  console.log('   1. Verify RESEND_API_KEY is correct');
  console.log('   2. Check domain (postcontent.io) is verified in Resend');
  console.log('   3. Ensure DNS records (DKIM, SPF) are set up');
  console.log('   4. Check Resend dashboard for errors\n');
  process.exit(1);
}
