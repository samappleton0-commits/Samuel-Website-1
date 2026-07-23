import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'
import { resend } from '@/lib/resend'

export async function POST(request: NextRequest) {
  try {

    const supabase = await createClient()
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

    // Get visitor IP address
    const ipAddress =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1'

    console.log('Visitor IP:', ipAddress)


    // Get today's date (UTC midnight)
    const today = new Date()
    today.setUTCHours(0, 0, 0, 0)


   // Check daily message limit by IP or email
const { data: todayMessages, error: countError } = await supabase
  .from('contacts')
  .select('id')
  .gte(
    'created_at',
    today.toISOString()
  )
  .or(
    `ip_address.eq.${ipAddress},email.eq.${email}`
  )

console.log(
  'Messages today:',
  todayMessages?.length
)
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


    // Allow maximum 2 messages per IP per day
    if ((todayMessages?.length ?? 0) >= 2) {
      return NextResponse.json(
        {
          success: false,
          error:
            'You have reached the daily message limit. Please try again tomorrow.',
        },
        {
          status: 429,
        }
      )
    }


    // Save contact message to Supabase
    const { error: insertError } = await supabase
      .from('contacts')
      .insert([
        {
          name,
          email,
          subject,
          message,
          ip_address: ipAddress,
        },
      ])


    if (insertError) {
      return NextResponse.json(
        {
          success: false,
          error: insertError.message,
        },
        {
          status: 500,
        }
      )
    }


    // Send notification email
    const emailResult = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'samappleton0@gmail.com',
      subject: `New Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>

        <p><strong>Name:</strong> ${name}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Subject:</strong> ${subject}</p>

        <p><strong>IP Address:</strong> ${ipAddress}</p>

        <p><strong>Message:</strong></p>

        <p>${message}</p>
      `,
    })


    if (emailResult.error) {
      console.error('Resend error:', emailResult.error)

      return NextResponse.json(
        {
          success: false,
          error: 'Message saved but email notification failed.',
        },
        {
          status: 500,
        }
      )
    }


    return NextResponse.json({
      success: true,
      message: 'Message sent successfully.',
    })


  } catch (error) {
    console.error('API Error:', error)

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