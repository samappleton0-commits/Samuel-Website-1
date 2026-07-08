import AdminSidebar from '@/components/admin-sidebar'


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (

    <main className="min-h-screen px-4 py-16 sm:px-6">


      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px_1fr]">


        {/* Sidebar */}

        <AdminSidebar />



        {/* Page Content */}

        <section>

          {children}

        </section>


      </div>


    </main>

  )

}