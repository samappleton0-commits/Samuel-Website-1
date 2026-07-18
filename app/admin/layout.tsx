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
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <div className="flex min-h-screen w-full">

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
              MOBILE HEADER (FIXED)
          =========================================== */}

          <div
            className="
              fixed
              top-0
              left-0
              right-0
              z-40
              bg-background
              px-4
              pt-4
              pb-2
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
              pt-28
              pb-10
              sm:px-6
              md:px-8
              lg:px-8
              lg:pt-8
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