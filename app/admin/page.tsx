import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import AdminSidebar from '@/components/admin-sidebar'
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
    messages?.filter(
      (message) => !message.read
    ).length ?? 0




  return (
    <main className="min-h-screen px-4 py-8 sm:px-6">


      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[260px_1fr]">



        {/* Sidebar */}
        <AdminSidebar />





        {/* Main Content */}
        <section>


          <div className="mb-10">


            <h1 className="text-3xl font-bold">
              Admin Dashboard
            </h1>


            <p className="mt-2 text-muted-foreground">
              Welcome back, {user.email}
            </p>


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




        </section>



      </div>



    </main>
  )
}