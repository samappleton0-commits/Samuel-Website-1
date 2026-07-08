import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { resend } from '@/lib/resend'

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          error: 'All fields are required.',
        },
        {
          status: 400,
        }
      )
    }

    // Get today's date (00:00 UTC)
    const today = new Date()
    today.setUTCHours(0, 0, 0, 0)

    // Check how many messages this email has sent today
    const { data: todayMessages, error: countError } =
      await supabase
        .from('contacts')
        .select('id')
        .eq('email', email)
        .gte('created_at', today.toISOString())

    if (countError) {
      return NextResponse.json(
        {
          success: false,
          error: countError.message,
        },
        {
          status: 500,
        }
      )
    }

    // Allow only 2 messages per day
    if ((todayMessages?.length ?? 0) >= 2) {
      return NextResponse.json(
        {
          success: false,
          error:
            'You have reached the daily limit of 2 messages. Please try again tomorrow.',
        },
        {
          status: 429,
        }
      )
    }

    // Save to Supabase
    const { error } = await supabase
      .from('contacts')
      .insert([
        {
          name,
          email,
          subject,
          message,
        },
      ])

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        {
          status: 500,
        }
      )
    }

    // Send notification email
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'samappleton0@gmail.com',
      subject: `New Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>

        <p><strong>Name:</strong> ${name}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Subject:</strong> ${subject}</p>

        <p><strong>Message:</strong></p>

        <p>${message}</p>
      `,
    })

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        success: false,
        error: 'Something went wrong.',
      },
      {
        status: 500,
      }
    )
  }
}