import { createClient } from '@/lib/supabase-server'

import StatsGrid from './stats-grid'
import QuickActions from './quick-actions'
import RecentPosts from './recent-posts'
import RecentContacts from './recent-contacts'
import ProfileCard from './profile-card'

type Props = {
  user: {
    name: string
    email: string
    role: string
    avatar_url?: string | null
  }
}

export default async function AdminDashboard({

  user,

}: Props) {

  const supabase = await createClient()

  /* ==========================================
      BLOG POSTS
  ========================================== */

  const {

    data: posts,

  } = await supabase

    .from('blog_posts')

    .select('*')

  /* ==========================================
      CONTACTS
  ========================================== */

  const {

    data: contacts,

  } = await supabase

    .from('contacts')

    .select('*')

  /* ==========================================
      USERS
  ========================================== */

  const {

    data: users,

  } = await supabase

    .from('admin_users')

    .select('*')

  /* ==========================================
      EXPERIENCE
  ========================================== */

  const {

    data: experience,

  } = await supabase

    .from('experience')

    .select('*')

  /* ==========================================
      EDUCATION
  ========================================== */

  const {

    data: education,

  } = await supabase

    .from('education')

    .select('*')

  return (

    <div className="space-y-8">

      <ProfileCard

        user={user}

      />

      <StatsGrid

  stats={{

    articles: posts?.length ?? 0,

    published:
      posts?.filter(
        post => post.status === 'published'
      ).length ?? 0,

    pending:
      posts?.filter(
        post => post.status === 'pending'
      ).length ?? 0,

    featured:
      posts?.filter(
        post => post.featured === true
      ).length ?? 0,

    messages:
      contacts?.length ?? 0,

    users:
      users?.length ?? 0,

  }}

/>

      <QuickActions />

      <div
        className="
          grid
          gap-6
          xl:grid-cols-2
        "
      >

        <RecentPosts

          posts={posts ?? []}

        />

        <RecentContacts

          contacts={contacts ?? []}

        />

      </div>

    </div>

  )

}