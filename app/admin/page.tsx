import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase-server'

import AdminSidebar from '@/components/admin-sidebar'

import StatsGrid from '@/components/admin/stats-grid'

import QuickActions from '@/components/admin/quick-actions'

import RecentMessages from '@/components/admin/recent-messages'

import AnalyticsSummary from '@/components/admin/analytics-summary'

import MessageChart from '@/components/admin/charts/message-chart'

import StatusChart from '@/components/admin/charts/status-chart'


export default async function AdminPage() {


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



  const allMessages =
    messages ?? []



  return (

    <main className="min-h-screen px-4 py-16 sm:px-6">


      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px_1fr]">



        {/* Sidebar */}

        <AdminSidebar />





        {/* Main Content */}

        <section>



          {/* Header */}

          <div className="mb-10">


            <h1 className="text-3xl font-bold">

              Admin Dashboard

            </h1>


            <p className="mt-2 text-muted-foreground">

              Welcome back, {user.email}

            </p>


          </div>





          {/* Extra Analytics */}

          <AnalyticsSummary

            messages={allMessages}

          />





          {/* Stats */}

          <StatsGrid

            messages={allMessages}

          />





          {/* Quick Actions */}

          <QuickActions />





          {/* Charts */}

          <div className="mb-8 grid gap-6 xl:grid-cols-2">


            <MessageChart

              messages={allMessages}

            />


            <StatusChart

              messages={allMessages}

            />


          </div>





          {/* Recent Messages */}

          <RecentMessages

            messages={allMessages}

          />





          {/* All Messages */}

         



        </section>



      </div>


    </main>

  )
}