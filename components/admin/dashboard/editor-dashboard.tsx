/* =====================================================
   PREMIUM EDITOR DASHBOARD
===================================================== */

import { createClient } from '@/lib/supabase-server'

import Link from 'next/link'

import ProfileCard from './profile-card'
import DashboardSection from './dashboard-section'
import QuickActions from './quick-actions'
import EditorArticleList from './editor-article-list'
import StatCard from './stat-card'

import {
  FileText,
  Clock,
  Globe,
} from 'lucide-react'

type Props = {
  user: {
    id: string
    user_id: string
    name: string
    email: string
    role: string
    avatar_url?: string | null
  }
}

export default async function EditorDashboard({
  user,
}: Props) {

  const supabase = await createClient()

  /* =====================================================
     GET EDITOR ARTICLES
  ===================================================== */

  const {
    data: articles,
    error,
  } = await supabase

    .from('blog_posts')

    .select(`
      id,
      title,
      status,
      created_at,
      featured_image
    `)

    .eq(
  'user_id',
  user.user_id
)

    .order(
      'created_at',
      {
        ascending: false,
      }
    )

  if (error) {

    console.error(
      'EDITOR ARTICLE ERROR:',
      error
    )

  }

  const editorArticles = articles ?? []

  /* =====================================================
     ARTICLE STATISTICS
  ===================================================== */

  const totalArticles = editorArticles.length

  const draftArticles = editorArticles.filter(
    (article) => article.status === 'draft'
  ).length

  const publishedArticles = editorArticles.filter(
    (article) => article.status === 'published'
  ).length

  return (

    <div className="space-y-10">

      {/* =====================================================
          PROFILE
      ===================================================== */}

      <ProfileCard
        user={user}
      />

      {/* =====================================================
          WEBSITE NAVIGATION
      ===================================================== */}

      <div
        className="
          flex
          flex-wrap
          justify-end
          gap-3
        "
      >

        <Link
          href="/"
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            px-4
            py-2
            text-sm
            transition
            hover:bg-surface
          "
        >
          <Globe size={18} />

          Portfolio Page
        </Link>

        <Link
          href="/blog"
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            px-4
            py-2
            text-sm
            transition
            hover:bg-surface
          "
        >
          <FileText size={18} />

          Blog Page
        </Link>

      </div>


      {/* =====================================================
          ARTICLE OVERVIEW
      ===================================================== */}

      <DashboardSection
        title="Article Overview"
        description="Monitor your writing activity and publishing progress."
      >

        <div
          className="
            grid
            gap-5
            md:grid-cols-3
          "
        >

          <StatCard
            title="My Articles"
            value={totalArticles}
            description="Total articles you have created."
            href="/admin/blog"
            icon={<FileText size={22} />}
            color="bg-blue-500/10 text-blue-600"
          />

          <StatCard
            title="Drafts"
            value={draftArticles}
            description="Articles waiting to be published."
            href="/admin/blog?status=draft"
            icon={<Clock size={22} />}
            color="bg-amber-500/10 text-amber-600"
          />

          <StatCard
            title="Published"
            value={publishedArticles}
            description="Articles currently visible to visitors."
            href="/admin/blog?status=published"
            icon={<Globe size={22} />}
            color="bg-green-500/10 text-green-600"
          />

        </div>

      </DashboardSection>

      {/* =====================================================
          QUICK ACTIONS
      ===================================================== */}

      <DashboardSection
        title="Quick Actions"
        description="Create and manage your blog content."
        icon={<FileText size={22} />}
      >

        <QuickActions
          mode="editor"
        />

      </DashboardSection>

      {/* =====================================================
          ARTICLE MANAGEMENT
      ===================================================== */}

      <DashboardSection
        title="My Articles"
        description="Search and manage your submitted articles."
        icon={<FileText size={22} />}
      >

        <EditorArticleList
          articles={editorArticles}
        />

      </DashboardSection>

    </div>

  )

}