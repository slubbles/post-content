import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"

// Initialize Resend only if API key is available
let resend: any = null
if (process.env.RESEND_API_KEY) {
  const { Resend } = require("resend")
  resend = new Resend(process.env.RESEND_API_KEY)
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in to send feedback." },
        { status: 401 }
      )
    }

    const { message, email } = await request.json()

    if (!message || message.trim().length < 10) {
      return NextResponse.json(
        { error: "Feedback must be at least 10 characters long." },
        { status: 400 }
      )
    }

    if (message.length > 500) {
      return NextResponse.json(
        { error: "Feedback must be 500 characters or less." },
        { status: 400 }
      )
    }

    // Store feedback in database
    const feedback = await prisma.feedback.create({
      data: {
        userId: session.user.id,
        message: message.trim(),
        email: email || session.user.email,
      },
    })

    // Send email notification to developer using Resend (if configured)
    const developerEmail = process.env.DEVELOPER_EMAIL || "idderfsalem98@gmail.com"
    
    if (resend) {
      try {
        await resend.emails.send({
          from: "PostContent Feedback <feedback@postcontent.io>",
          to: developerEmail,
          replyTo: email || session.user.email || undefined,
          subject: `💛 New Feedback from ${session.user.name || session.user.email}`,
          html: `
          <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #f0ff5f; margin-bottom: 20px;">New Feedback Received</h2>
            
            <div style="background: #1a1a1a; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
              <p style="color: #888; margin: 0 0 10px 0;"><strong>From:</strong> ${session.user.name || "Anonymous"}</p>
              <p style="color: #888; margin: 0 0 10px 0;"><strong>Email:</strong> ${email || session.user.email}</p>
              <p style="color: #888; margin: 0 0 10px 0;"><strong>User ID:</strong> ${session.user.id}</p>
              <p style="color: #888; margin: 0;"><strong>Date:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <div style="background: #0a0a0a; border-radius: 8px; padding: 20px; border-left: 4px solid #f0ff5f;">
              <h3 style="margin-top: 0; color: #fff;">Message:</h3>
              <p style="color: #ccc; white-space: pre-wrap; line-height: 1.6;">${message}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #333;">
              <p style="color: #666; font-size: 12px; margin: 0;">
                Sent from PostContent.io feedback system
              </p>
            </div>
          </div>
        `,
        })
      } catch (emailError) {
        console.error("Failed to send feedback email:", emailError)
        // Don't fail the request if email fails - feedback is still saved to database
      }
    } else {
      // No email service configured - feedback saved to database only
    }

    return NextResponse.json({
      success: true,
      message: "Feedback sent! Thank you 💛",
      feedbackId: feedback.id,
    })

  } catch (error) {
    console.error("Feedback submission error:", error)
    return NextResponse.json(
      { error: "Failed to submit feedback. Please try again." },
      { status: 500 }
    )
  }
}
