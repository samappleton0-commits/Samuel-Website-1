import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import Link from 'next/link'
import AdminMessageActions from '@/components/admin-message-actions'

type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function MessageDetailsPage({ params }: Props) {
  const { id } = await params

  const supabase = await createClient()

  // Check login
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }


  // Get single message
  const { data: message, error } = await supabase
    .from('contacts')
    .select('*')
    .eq('id', id)
    .single()


  if (error || !message) {
    return (
      <main className="min-h-screen px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-2xl font-bold">
            Message not found
          </h1>

          <Link
            href="/admin"
            className="mt-4 inline-block text-accent"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </main>
    )
  }


  return (
    <main className="min-h-screen px-4 py-16 sm:px-6">

      <div className="mx-auto max-w-4xl">

        <Link
          href="/admin"
          className="text-sm text-accent"
        >
          ← Back to Dashboard
        </Link>


        <div className="glass mt-8 rounded-3xl p-8">

          <div className="flex flex-wrap justify-between gap-4">

            <div>
              <h1 className="text-3xl font-bold">
                {message.name}
              </h1>

              <p className="mt-2 text-muted-foreground">
                {message.email}
              </p>
            </div>


            <p className="text-sm text-muted-foreground">
              {new Date(
                message.created_at
              ).toLocaleDateString()}
            </p>

          </div>


          <div className="mt-8 space-y-5">

            <div>
              <p className="text-sm text-muted-foreground">
                Subject
              </p>

              <p className="mt-1 font-medium">
                {message.subject}
              </p>
            </div>


            <div>
              <p className="text-sm text-muted-foreground">
                Message
              </p>

              <p className="mt-2 whitespace-pre-wrap">
                {message.message}
              </p>
            </div>


          </div>


          <AdminMessageActions
            id={message.id}
            read={message.read}
          />


        </div>

      </div>

    </main>
  )
}