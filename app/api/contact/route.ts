import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

// Initialize Resend only if API key is available
let resend: any = null
if (process.env.RESEND_API_KEY) {
  const { Resend } = require("resend")
  resend = new Resend(process.env.RESEND_API_KEY)
}

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      )
    }

    // Save to database
    await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    })

    // Send notification email to support team
    const supportEmail = process.env.SUPPORT_EMAIL || "idderfsalem98@gmail.com"
    
    if (resend) {
      try {
        // Send to support team
        await resend.emails.send({
          from: "PostContent Contact <hello@postcontent.io>",
          to: supportEmail,
          replyTo: email,
          subject: `Contact Form: ${subject}`,
          html: `
            <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #f0ff5f; margin-bottom: 20px;">New Contact Form Submission</h2>
              
              <div style="background: #f5f5f5; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                <p style="margin: 0 0 10px 0;"><strong>From:</strong> ${name}</p>
                <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${email}</p>
                <p style="margin: 0 0 10px 0;"><strong>Subject:</strong> ${subject}</p>
                <p style="margin: 0;"><strong>Date:</strong> ${new Date().toLocaleString()}</p>
              </div>
              
              <div style="background: #fff; border-radius: 8px; padding: 20px; border-left: 4px solid #f0ff5f;">
                <h3 style="margin-top: 0;">Message:</h3>
                <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
              </div>
            </div>
          `,
        })

        // Send confirmation to user
        await resend.emails.send({
          from: "PostContent <hello@postcontent.io>",
          to: email,
          subject: "We received your message - PostContent",
          html: `
            <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #f0ff5f; margin-bottom: 20px;">Thank you for reaching out!</h2>
              
              <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
                Hi ${name},
              </p>
              
              <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">
                We've received your message and our team will get back to you within 24 hours.
              </p>
              
              <div style="background: #f5f5f5; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                <p style="margin: 0 0 10px 0;"><strong>Your message:</strong></p>
                <p style="color: #666; white-space: pre-wrap; line-height: 1.6;">${message}</p>
              </div>
              
              <p style="color: #333; line-height: 1.6;">
                In the meantime, you can reach us directly at 
                <a href="mailto:support@postcontent.io" style="color: #f0ff5f;">support@postcontent.io</a>
              </p>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #666; font-size: 12px; margin: 0;">
                  PostContent - AI Content Generator for Social Media
                </p>
              </div>
            </div>
          `,
        })
      } catch (emailError) {
        console.error("Failed to send contact form emails:", emailError)
        // Don't fail the request if email fails - message is still saved to database
      }
    }

    return NextResponse.json({
      message: "Message received! We'll get back to you within 24 hours.",
      redirect: "/contact/success"
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    )
  }
}
