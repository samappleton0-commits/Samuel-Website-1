import { redirect } from 'next/navigation'


import { createClient } from '@/lib/supabase-server'


import LiveMessages from '@/components/admin/live-messages'

import LiveDashboard from '@/components/admin/live-dashboard'



export default async function AdminPage() {


  const supabase =
    await createClient()




  const {
    data:{
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
          ascending:false,
        }
      )





  if (error) {

    console.error(error)

  }





  const allMessages =
    messages ?? []






  return (

    <div className="max-w-6xl">



      <div className="mb-10">



        <h1 className="text-3xl font-bold">

          Admin Dashboard

        </h1>




        <p className="mt-2 text-muted-foreground">

          Welcome back, {user.email}

        </p>



      </div>






      <LiveMessages

        initialMessages={allMessages}

      >


        <LiveDashboard />


      </LiveMessages>




    </div>

  )

}