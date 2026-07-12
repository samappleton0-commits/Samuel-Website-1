import Link from 'next/link'

import {
  ArrowLeft
} from 'lucide-react'

import { notFound } from 'next/navigation'

import BlogEditor from '@/components/admin/blog/blog-editor'

import { createClient } from '@/lib/supabase-server'
import { getUserRole } from '@/lib/get-user-role'



type Props = {

  params: Promise<{
    id:string
  }>

}



export default async function EditBlogPage({

  params,

}:Props){


  const { id } = await params



 const supabase = await createClient()

const userRole = await getUserRole()

  const { data:post,error } =

    await supabase

      .from('blog_posts')

      .select('*')

      .eq(

        'id',

        id

      )

      .single()





  if(error || !post){

    notFound()

  }





  return (

  <div className="space-y-8">


    {/* Back Button */}

    <Link

      href="/admin/blog"

      className="
        inline-flex
        items-center
        gap-2
        rounded-xl
        border
        px-4
        py-2
        text-sm
        transition
        hover:bg-muted
      "

    >

      <ArrowLeft size={16}/>

      Back to Blog Dashboard


    </Link>





    {/* Header */}

    <div>


      <h1

        className="
          text-3xl
          font-bold
        "

      >

        Edit Article

      </h1>


      <p

        className="
          mt-2
          text-muted-foreground
        "

      >

        Update your blog article.

      </p>


    </div>




<BlogEditor

  initialPost={post}

  userRole={
    userRole?.role === 'admin'
      ? 'admin'
      : 'editor'
  }

/>


  </div>

)
}