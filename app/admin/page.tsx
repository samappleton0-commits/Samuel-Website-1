import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'

import AdminSidebar from '@/components/admin-sidebar'
import AdminMessageList from '@/components/admin-message-list'

import StatsGrid from '@/components/admin/stats-grid'
import QuickActions from '@/components/admin/quick-actions'
import RecentMessages from '@/components/admin/recent-messages'

export default async function AdminPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: messages } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false })

  const allMessages = messages ?? []

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6">

      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[260px_1fr]">

        <AdminSidebar />

        <section>

          <div className="mb-10">

            <h1 className="text-3xl font-bold">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-muted-foreground">
              Welcome back, {user.email}
            </p>

          </div>

          <StatsGrid
            messages={allMessages}
          />

          <QuickActions />

          <div className="mb-8">
            <RecentMessages
              messages={allMessages}
            />
          </div>

          <div className="glass rounded-3xl p-6">

            <h2 className="mb-6 text-xl font-semibold">
              Contact Messages
            </h2>

            <AdminMessageList
              messages={allMessages}
            />

          </div>

        </section>

      </div>

    </main>
  )
}