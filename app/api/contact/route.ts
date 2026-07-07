import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    const { error } = await supabase.from('contacts').insert([
      {
        name,
        email,
        subject,
        message,
      },
    ])

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Message saved successfully.',
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Something went wrong.' },
      { status: 500 }
    )
  }
}