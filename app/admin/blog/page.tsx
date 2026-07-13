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



  const supabase = await createClient()



  const userRole = await getUserRole()



  if(!userRole){

    return null

  }





  let query = supabase

    .from('blog_posts')

    .select('*')

    .order(
      'created_at',
      {
        ascending:false
      }
    )





  // ======================================================
  // EDITOR ACCESS
  // Editors see ONLY their own posts
  // regardless of status
  // ======================================================


  if(
    userRole.role === 'editor'
  ){


    query = query.eq(
      'user_id',
      userRole.user_id
    )


  }





  // ======================================================
  // ADMIN ACCESS
  // Admin sees EVERYTHING
  // including drafts and pending
  // ======================================================


  if(
    userRole.role === 'admin'
  ){

    query = query


  }







  const {

    data:posts,

    error

  } = await query





  if(error){

    console.error(
      "BLOG FETCH ERROR:",
      error.message
    )

  }





  console.log(
    "BLOG POSTS:",
    posts
  )





  return (

    <div className="space-y-8">


      <div>

        <h1 className="text-3xl font-bold">

          Blog Manager

        </h1>


        <p className="mt-2 text-muted-foreground">

          Create, edit and manage blog articles.

        </p>


      </div>





      <BlogManager


        initialPosts={

          posts ?? []

        }



        userRole={

          userRole.role === 'admin'

          ?

          'admin'

          :

          'editor'

        }


      />


    </div>

  )

}