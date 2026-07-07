import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'

export default async function AdminPage() {
  const supabase = await createClient()

  // Check if user is logged in
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get contact messages
  const { data: messages, error } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error)
  }

  return (
    <main className="min-h-screen px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">

        <div className="mb-10">
          <h1 className="text-3xl font-bold">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage your contact messages.
          </p>
        </div>


        <div className="glass rounded-3xl p-6">

          <h2 className="mb-6 text-xl font-semibold">
            Messages ({messages?.length ?? 0})
          </h2>


          <div className="space-y-5">

            {messages && messages.length > 0 ? (
              messages.map((message) => (

                <div
                  key={message.id}
                  className="rounded-2xl border border-surface-border p-5"
                >

                  <div className="flex flex-wrap justify-between gap-3">

                    <div>
                      <h3 className="font-semibold">
                        {message.name}
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        {message.email}
                      </p>
                    </div>


                    <p className="text-sm text-muted-foreground">
                      {new Date(message.created_at).toLocaleDateString()}
                    </p>

                  </div>


                  <div className="mt-4">

                    <p className="font-medium">
                      {message.subject}
                    </p>

                    <p className="mt-2 text-sm text-muted-foreground">
                      {message.message}
                    </p>

                  </div>

                </div>

              ))
            ) : (

              <p className="text-muted-foreground">
                No messages found.
              </p>

            )}

          </div>

        </div>

      </div>
    </main>
  )
}