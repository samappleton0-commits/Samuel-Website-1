// ======================================================
// BLOG DELETE BUTTON
// components/admin/blog/blog-delete-button.tsx
// ======================================================

'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { createClient } from '@/lib/supabase-browser'


type Props = {

  id: string

  status: 'draft' | 'pending' | 'published'

  userRole: 'admin' | 'editor'

}

export default function BlogDeleteButton({

  id,

  status,

  userRole,

}: Props){


  const supabase = createClient()

  const router = useRouter()


  const [loading,setLoading] =

    useState(false)



  async function deletePost() {


    const confirmDelete =

      window.confirm(

        'Are you sure you want to delete this article?'

      )



    if(!confirmDelete)

      return




    try {


      setLoading(true)



      const { error } =

        await supabase

          .from('blog_posts')

          .delete()

          .eq(

            'id',

            id

          )




      if(error)

        throw error




      router.refresh()



    } catch(error) {


      console.error(

        'Delete blog error:',

        error

      )



    } finally {


      setLoading(false)


    }


  }




if(
  userRole === 'editor' &&
  status === 'published'
){

  return null

}



return (

  <button

    onClick={deletePost}

    disabled={loading}

    className="
      inline-flex
      items-center
      gap-2
      rounded-xl
      border
      border-red-300
      px-4
      py-2
      text-red-600
      transition
      hover:bg-red-50
      disabled:opacity-50
    "

  >

    <Trash2 size={16}/>


    {
      loading

      ? 'Deleting...'

      : 'Delete'
    }


  </button>

)


}