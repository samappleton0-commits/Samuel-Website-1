/* =========================================================
   ADMIN LAYOUT
   app/admin/layout.tsx
========================================================= */


import { redirect } from 'next/navigation'

import AdminSidebar from '@/components/admin-sidebar'

import { createClient } from '@/lib/supabase-server'





export default async function AdminLayout({

  children,

}: {

  children: React.ReactNode

}) {





  // =====================================================
  // AUTH CHECK
  // =====================================================


  const supabase = await createClient()



  const {

    data: {

      user,

    },

  } = await supabase.auth.getUser()





  if (!user) {

    redirect('/login')

  }





  return (


    <div

      className="

        min-h-screen

        overflow-x-hidden

        bg-background

      "

    >



      <div

        className="

          flex

          min-h-screen

          w-full

        "

      >




        {/* =============================================
            DESKTOP SIDEBAR
        ============================================== */}


        <aside

          className="

            hidden

            lg:flex

            lg:w-72

            lg:shrink-0

            lg:p-5

          "

        >


          <AdminSidebar />


        </aside>







        {/* =============================================
            MAIN CONTENT
        ============================================== */}


        <main

          className="

            flex-1

            min-w-0

            bg-background

          "

        >



          {/* ==========================================
              MOBILE SIDEBAR / HEADER
          =========================================== */}


          <div

            className="

              sticky

              top-0

              z-30

              block

              px-4

              pt-4

              lg:hidden

            "

          >


            <AdminSidebar />


          </div>







          {/* ==========================================
              PAGE CONTENT
          =========================================== */}


          <section

            className="

              w-full

              px-4

              pb-10

              pt-6


              sm:px-6


              md:px-8


              lg:px-8


              xl:px-10

            "

          >


            {children}


          </section>





        </main>





      </div>





    </div>


  )

}