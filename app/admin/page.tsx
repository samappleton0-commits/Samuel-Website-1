import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'

import AdminSidebar from '@/components/admin-sidebar'
import AdminMessageList from '@/components/admin-message-list'
import AnalyticsCard from '@/components/admin/analytics-card'

export default async function AdminPage() {
  const supabase = await createClient()

  // Check login
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get all messages
  const { data: messages, error } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error)
  }

  const allMessages = messages ?? []

  // Analytics
  const totalMessages = allMessages.length

  const unreadMessages = allMessages.filter(
    (message) => !message.read
  ).length

  const inProgressMessages = allMessages.filter(
    (message) => message.status === 'In Progress'
  ).length

  const completedMessages = allMessages.filter(
    (message) => message.status === 'Completed'
  ).length

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[260px_1fr]">

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

          {/* Analytics Cards */}
          <div className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

            <AnalyticsCard
              title="Total Messages"
              value={totalMessages}
              icon="📨"
              color="bg-blue-500/10"
            />

            <AnalyticsCard
              title="Unread Messages"
              value={unreadMessages}
              icon="🔵"
              color="bg-cyan-500/10"
            />

            <AnalyticsCard
              title="In Progress"
              value={inProgressMessages}
              icon="🟡"
              color="bg-yellow-500/10"
            />

            <AnalyticsCard
              title="Completed"
              value={completedMessages}
              icon="🟢"
              color="bg-green-500/10"
            />

          </div>

          {/* Messages */}
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