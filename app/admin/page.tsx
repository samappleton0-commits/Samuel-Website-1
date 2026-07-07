import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import LogoutButton from '@/components/logout-button'
import AdminMessageList from '@/components/admin-message-list'

export default async function AdminPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()


  if (!user) {
    redirect('/login')
  }


  const { data: messages, error } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false })


  if (error) {
    console.error(error)
  }


  const totalMessages = messages?.length ?? 0


  const unreadMessages =
    messages?.filter((message) => !message.read).length ?? 0



  return (
    <main className="min-h-screen px-4 py-16 sm:px-6">

      <div className="mx-auto max-w-6xl">


        {/* Header */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">

          <div>

            <h1 className="text-3xl font-bold">
              Admin Dashboard
            </h1>


            <p className="mt-2 text-muted-foreground">
              Welcome back, {user.email}
            </p>

          </div>


          <LogoutButton />

        </div>




        {/* Statistics */}
        <div className="mb-8 grid gap-5 sm:grid-cols-2">


          <div className="glass rounded-3xl p-6">

            <p className="text-sm text-muted-foreground">
              Total Messages
            </p>


            <p className="mt-2 text-3xl font-bold">
              {totalMessages}
            </p>

          </div>




          <div className="glass rounded-3xl p-6">

            <p className="text-sm text-muted-foreground">
              Unread Messages
            </p>


            <p className="mt-2 text-3xl font-bold">
              {unreadMessages}
            </p>

          </div>


        </div>





        {/* Messages */}
        <div className="glass rounded-3xl p-6">


          <h2 className="mb-6 text-xl font-semibold">
            Contact Messages
          </h2>


          <AdminMessageList
            messages={messages ?? []}
          />


        </div>



      </div>


    </main>
  )
}