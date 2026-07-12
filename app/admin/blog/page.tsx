// ======================================================
// ADMIN BLOG PAGE
// app/admin/blog/page.tsx
// ======================================================

import { createClient } from '@/lib/supabase-server'
import { getUserRole } from '@/lib/get-user-role'
import BlogManager from '@/components/admin/blog/blog-manager'
import { requireEditor } from '@/lib/require-role'


export default async function AdminBlogPage(){

  await requireEditor()


  const userRole = await getUserRole()

  const supabase = await createClient()

  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', {
      ascending: false,
    })

  if (error) {
    console.error(error)
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          Blog Manager
        </h1>

        <p className="text-muted-foreground mt-2">
          Create, edit and publish blog articles.
        </p>

      </div>

    <BlogManager

  initialPosts={posts ?? []}

  userRole={
    userRole?.role === 'admin'
      ? 'admin'
      : 'editor'
  }

/>

    </div>
  )
}