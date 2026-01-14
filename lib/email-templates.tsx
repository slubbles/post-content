import * as React from "react"

interface VerificationEmailProps {
  name: string
  verificationUrl: string
}

interface PasswordResetEmailProps {
  name: string
  resetUrl: string
}

export const VerificationEmail: React.FC<VerificationEmailProps> = ({ name, verificationUrl }) => (
  <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
      <h1 style={{ color: '#000', fontSize: '24px', fontWeight: 'bold', margin: '0' }}>PostContent</h1>
    </div>
    
    <div style={{ backgroundColor: '#f9fafb', borderRadius: '12px', padding: '32px', marginBottom: '24px' }}>
      <h2 style={{ color: '#000', fontSize: '20px', fontWeight: '600', marginTop: '0', marginBottom: '16px' }}>
        Hey {name}! 👋
      </h2>
      
      <p style={{ color: '#6b7280', fontSize: '16px', lineHeight: '1.6', margin: '0 0 24px 0' }}>
        Thanks for signing up! We're excited to have you on board. To get started, please verify your email address by clicking the button below.
      </p>
      
      <div style={{ textAlign: 'center', margin: '32px 0' }}>
        <a
          href={verificationUrl}
          style={{
            display: 'inline-block',
            backgroundColor: '#000',
            color: '#fff',
            padding: '14px 32px',
            borderRadius: '9999px',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '600',
          }}
        >
          Verify Email Address
        </a>
      </div>
      
      <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.5', margin: '24px 0 0 0' }}>
        If you didn't create this account, you can safely ignore this email.
      </p>
    </div>
    
    <div style={{ textAlign: 'center', color: '#9ca3af', fontSize: '12px' }}>
      <p style={{ margin: '0 0 8px 0' }}>
        Or copy and paste this link into your browser:
      </p>
      <p style={{ margin: '0', wordBreak: 'break-all' }}>
        <a href={verificationUrl} style={{ color: '#6b7280', textDecoration: 'none' }}>
          {verificationUrl}
        </a>
      </p>
    </div>
    
    <div style={{ textAlign: 'center', marginTop: '40px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
      <p style={{ color: '#9ca3af', fontSize: '12px', margin: '0' }}>
        © {new Date().getFullYear()} PostContent. All rights reserved.
      </p>
    </div>
  </div>
)

export const renderVerificationEmail = (props: VerificationEmailProps): string => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify your email</title>
</head>
<body style="margin: 0; padding: 0; background-color: #ffffff;">
  <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="text-align: center; margin-bottom: 40px;">
      <h1 style="color: #000; font-size: 24px; font-weight: bold; margin: 0;">PostContent</h1>
    </div>
    
    <div style="background-color: #f9fafb; border-radius: 12px; padding: 32px; margin-bottom: 24px;">
      <h2 style="color: #000; font-size: 20px; font-weight: 600; margin-top: 0; margin-bottom: 16px;">
        Hey ${props.name}! 👋
      </h2>
      
      <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
        Thanks for signing up! We're excited to have you on board. To get started, please verify your email address by clicking the button below.
      </p>
      
      <div style="text-align: center; margin: 32px 0;">
        <a
          href="${props.verificationUrl}"
          style="display: inline-block; background-color: #000; color: #fff; padding: 14px 32px; border-radius: 9999px; text-decoration: none; font-size: 16px; font-weight: 600;"
        >
          Verify Email Address
        </a>
      </div>
      
      <p style="color: #9ca3af; font-size: 14px; line-height: 1.5; margin: 24px 0 0 0;">
        If you didn't create this account, you can safely ignore this email.
      </p>
    </div>
    
    <div style="text-align: center; color: #9ca3af; font-size: 12px;">
      <p style="margin: 0 0 8px 0;">
        Or copy and paste this link into your browser:
      </p>
      <p style="margin: 0; word-break: break-all;">
        <a href="${props.verificationUrl}" style="color: #6b7280; text-decoration: none;">
          ${props.verificationUrl}
        </a>
      </p>
    </div>
    
    <div style="text-align: center; margin-top: 40px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
      <p style="color: #9ca3af; font-size: 12px; margin: 0;">
        © ${new Date().getFullYear()} PostContent. All rights reserved.
      </p>
    </div>
  </div>
  `
}

// Password Reset Email Component
export const PasswordResetEmail: React.FC<PasswordResetEmailProps> = ({ name, resetUrl }) => (
  <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
      <h1 style={{ color: '#000', fontSize: '24px', fontWeight: 'bold', margin: '0' }}>PostContent</h1>
    </div>
    
    <div style={{ backgroundColor: '#f9fafb', borderRadius: '12px', padding: '32px', marginBottom: '24px' }}>
      <h2 style={{ color: '#000', fontSize: '20px', fontWeight: '600', marginTop: '0', marginBottom: '16px' }}>
        Reset Your Password
      </h2>
      
      <p style={{ color: '#6b7280', fontSize: '16px', lineHeight: '1.6', margin: '0 0 16px 0' }}>
        Hey {name},
      </p>
      
      <p style={{ color: '#6b7280', fontSize: '16px', lineHeight: '1.6', margin: '0 0 24px 0' }}>
        We received a request to reset your password. Click the button below to create a new password. This link will expire in 1 hour.
      </p>
      
      <div style={{ textAlign: 'center', margin: '32px 0' }}>
        <a
          href={resetUrl}
          style={{
            display: 'inline-block',
            backgroundColor: '#000',
            color: '#fff',
            padding: '14px 32px',
            borderRadius: '9999px',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '600',
          }}
        >
          Reset Password
        </a>
      </div>
      
      <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.5', margin: '24px 0 0 0' }}>
        If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.
      </p>
    </div>
    
    <div style={{ textAlign: 'center', color: '#9ca3af', fontSize: '12px' }}>
      <p style={{ margin: '0 0 8px 0' }}>
        Or copy and paste this link into your browser:
      </p>
      <p style={{ margin: '0', wordBreak: 'break-all' }}>
        <a href={resetUrl} style={{ color: '#6b7280', textDecoration: 'none' }}>
          {resetUrl}
        </a>
      </p>
    </div>
    
    <div style={{ textAlign: 'center', marginTop: '40px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
      <p style={{ color: '#9ca3af', fontSize: '12px', margin: '0' }}>
        © {new Date().getFullYear()} PostContent. All rights reserved.
      </p>
    </div>
  </div>
)

// Password Reset Email HTML Renderer
export function renderPasswordResetEmail(props: PasswordResetEmailProps): string {
  return `
  <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="text-align: center; margin-bottom: 40px;">
      <h1 style="color: #000; font-size: 24px; font-weight: bold; margin: 0;">PostContent</h1>
    </div>
    
    <div style="background-color: #f9fafb; border-radius: 12px; padding: 32px; margin-bottom: 24px;">
      <h2 style="color: #000; font-size: 20px; font-weight: 600; margin-top: 0; margin-bottom: 16px;">
        Reset Your Password
      </h2>
      
      <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">
        Hey ${props.name},
      </p>
      
      <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
        We received a request to reset your password. Click the button below to create a new password. This link will expire in 1 hour.
      </p>
      
      <div style="text-align: center; margin: 32px 0;">
        <a
          href="${props.resetUrl}"
          style="display: inline-block; background-color: #000; color: #fff; padding: 14px 32px; border-radius: 9999px; text-decoration: none; font-size: 16px; font-weight: 600;"
        >
          Reset Password
        </a>
      </div>
      
      <p style="color: #9ca3af; font-size: 14px; line-height: 1.5; margin: 24px 0 0 0;">
        If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.
      </p>
    </div>
    
    <div style="text-align: center; color: #9ca3af; font-size: 12px;">
      <p style="margin: 0 0 8px 0;">
        Or copy and paste this link into your browser:
      </p>
      <p style="margin: 0; word-break: break-all;">
        <a href="${props.resetUrl}" style="color: #6b7280; text-decoration: none;">
          ${props.resetUrl}
        </a>
      </p>
    </div>
    
    <div style="text-align: center; margin-top: 40px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
      <p style="color: #9ca3af; font-size: 12px; margin: 0;">
        © ${new Date().getFullYear()} PostContent. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
  `.trim()
}

// Welcome Email Interface
interface WelcomeEmailProps {
  name: string
  dashboardUrl: string
}

// Welcome Email HTML Renderer
export function renderWelcomeEmail(props: WelcomeEmailProps): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to PostContent</title>
</head>
<body style="margin: 0; padding: 0; background-color: #ffffff;">
  <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="text-align: center; margin-bottom: 40px;">
      <h1 style="color: #000; font-size: 24px; font-weight: bold; margin: 0;">PostContent</h1>
    </div>
    
    <div style="background-color: #f9fafb; border-radius: 12px; padding: 32px; margin-bottom: 24px;">
      <h2 style="color: #000; font-size: 20px; font-weight: 600; margin-top: 0; margin-bottom: 16px;">
        Welcome to PostContent, ${props.name}! 🎉
      </h2>
      
      <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">
        We're thrilled to have you on board! Your account is now verified and ready to use.
      </p>
      
      <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
        PostContent helps you generate engaging social media content in seconds using AI. Whether you need posts, replies, or threads, we've got you covered.
      </p>
      
      <div style="background-color: #fff; border-radius: 8px; padding: 20px; margin: 24px 0;">
        <h3 style="color: #000; font-size: 16px; font-weight: 600; margin: 0 0 12px 0;">
          Quick Start Guide:
        </h3>
        <ul style="color: #6b7280; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
          <li>Generate posts for any topic or idea</li>
          <li>Create engaging replies to tweets</li>
          <li>Build full threads with multiple posts</li>
          <li>Train your voice profile for personalized content</li>
        </ul>
      </div>
      
      <div style="text-align: center; margin: 32px 0;">
        <a
          href="${props.dashboardUrl}"
          style="display: inline-block; background-color: #000; color: #fff; padding: 14px 32px; border-radius: 9999px; text-decoration: none; font-size: 16px; font-weight: 600;"
        >
          Get Started
        </a>
      </div>
      
      <p style="color: #9ca3af; font-size: 14px; line-height: 1.5; margin: 24px 0 0 0; text-align: center;">
        Need help? Check out our <a href="${process.env.NEXTAUTH_URL}/faq" style="color: #6b7280; text-decoration: underline;">FAQ</a> or <a href="${process.env.NEXTAUTH_URL}/contact" style="color: #6b7280; text-decoration: underline;">contact support</a>.
      </p>
    </div>
    
    <div style="text-align: center; margin-top: 40px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
      <p style="color: #9ca3af; font-size: 12px; margin: 0;">
        © ${new Date().getFullYear()} PostContent. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
  `.trim()
}

