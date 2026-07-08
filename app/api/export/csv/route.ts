import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }

  const headers = [
    'Name',
    'Email',
    'Subject',
    'Message',
    'Status',
    'Read',
    'Date',
  ]

  const rows = (data ?? []).map((message) => [
    `"${message.name ?? ''}"`,
    `"${message.email ?? ''}"`,
    `"${message.subject ?? ''}"`,
    `"${(message.message ?? '').replace(/"/g, '""')}"`,
    `"${message.status ?? 'New'}"`,
    message.read ? 'Yes' : 'No',
    message.created_at ?? '',
  ])

  const csv = [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n')

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="contacts-${new Date()
        .toISOString()
        .slice(0, 10)}.csv"`,
    },
  })
}