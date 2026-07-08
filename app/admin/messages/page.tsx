import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase-server'

import AdminMessageList from '@/components/admin-message-list'


export default async function MessagesPage() {


  const supabase =
    await createClient()



  const {
    data: {
      user,
    },
  } =
    await supabase.auth.getUser()



  if (!user) {

    redirect('/login')

  }



  const {
    data: messages,
    error,
  } =
    await supabase

      .from('contacts')

      .select('*')

      .order(
        'created_at',
        {
          ascending: false,
        }
      )



  if (error) {

    console.error(error)

  }



  return (

    <main className="min-h-screen px-4 py-16 sm:px-6">


      <div className="mx-auto max-w-6xl">



        {/* Header */}

        <div className="mb-10">


          <h1 className="text-3xl font-bold">

            Contact Messages

          </h1>



          <p className="mt-2 text-muted-foreground">

            Manage messages received from your portfolio website.

          </p>


        </div>





        {/* Messages */}

        <div className="glass rounded-3xl p-6">


          <h2 className="mb-6 text-xl font-semibold">

            All Messages ({messages?.length ?? 0})

          </h2>



          <AdminMessageList

            messages={messages ?? []}

          />


        </div>



      </div>


    </main>

  )
}