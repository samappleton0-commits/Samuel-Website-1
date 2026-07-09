/* =========================================================
   ADMIN DASHBOARD PAGE START
========================================================= */


import Link from 'next/link'

import {
  redirect,
} from 'next/navigation'


import {
  Megaphone,
  FolderKanban,
} from 'lucide-react'


import {
  createClient,
} from '@/lib/supabase-server'


import LiveMessages from '@/components/admin/live-messages'

import LiveDashboard from '@/components/admin/live-dashboard'







export default async function AdminPage(){



  const supabase =
    await createClient()





  const {
    data:{
      user,
    },
  } =
  await supabase.auth.getUser()





  if(!user){

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







  if(error){

    console.error(error)

  }







  const allMessages =
    messages ?? []








  return (


    <div className="max-w-6xl">






      {/* ===============================
          HEADER
      =============================== */}



      <div className="mb-10">



        <h1 className="text-3xl font-bold">

          Admin Dashboard

        </h1>





        <p
          className="
            mt-2
            text-muted-foreground
          "
        >

          Welcome back, {user.email}

        </p>




      </div>









      {/* ===============================
          QUICK MANAGEMENT
      =============================== */}



      <div
        className="
          mb-10
          grid
          gap-5
          sm:grid-cols-2
        "
      >





        <Link


          href="/admin/announcements"


          className="
            group
            rounded-2xl
            border
            border-border
            bg-card
            p-6
            transition
            hover:-translate-y-1
            hover:border-accent/50
          "


        >


          <div
            className="
              flex
              items-center
              gap-4
            "
          >



            <div
              className="
                rounded-xl
                bg-accent/10
                p-3
              "
            >

              <Megaphone
                size={25}
              />

            </div>





            <div>


              <h2 className="font-semibold">

                Manage Announcements

              </h2>



              <p
                className="
                  mt-1
                  text-sm
                  text-muted-foreground
                "
              >

                Create, edit, and remove announcements.

              </p>


            </div>



          </div>


        </Link>









        <Link


          href="/admin/projects"


          className="
            group
            rounded-2xl
            border
            border-border
            bg-card
            p-6
            transition
            hover:-translate-y-1
            hover:border-accent/50
          "


        >


          <div
            className="
              flex
              items-center
              gap-4
            "
          >



            <div
              className="
                rounded-xl
                bg-accent/10
                p-3
              "
            >

              <FolderKanban
                size={25}
              />

            </div>





            <div>


              <h2 className="font-semibold">

                Manage Projects

              </h2>



              <p
                className="
                  mt-1
                  text-sm
                  text-muted-foreground
                "
              >

                Add, edit, and manage portfolio projects.

              </p>


            </div>



          </div>


        </Link>






      </div>









      {/* ===============================
          DASHBOARD CONTENT
      =============================== */}




      <LiveMessages

        initialMessages={
          allMessages
        }

      >


        <LiveDashboard />


      </LiveMessages>






    </div>


  )

}



/* =========================================================
   ADMIN DASHBOARD PAGE END
========================================================= */