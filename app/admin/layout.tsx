/* =========================================================
   ADMIN LAYOUT START
========================================================= */

import AdminSidebar from '@/components/admin-sidebar'


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (

    <main className="min-h-screen">





      {/* =====================================================
          DESKTOP SIDEBAR
          Fixed position on large screens
      ===================================================== */}


      <aside
        className="
          hidden
          lg:fixed
          lg:left-0
          lg:top-0
          lg:block
          lg:h-screen
          lg:w-[280px]
          lg:p-6
        "
      >


        <AdminSidebar />


      </aside>







      {/* =====================================================
          MOBILE NAVBAR
          Stays at top on smaller screens
      ===================================================== */}


      <div
        className="
          sticky
          top-0
          z-50
          bg-background
          lg:hidden
        "
      >


        <AdminSidebar />


      </div>








      {/* =====================================================
          PAGE CONTENT
      ===================================================== */}


      <section

        className="
          px-4
          py-16
          sm:px-6
          lg:ml-[280px]
        "

      >

        {children}


      </section>





    </main>

  )

}


/* =========================================================
   ADMIN LAYOUT END
========================================================= */