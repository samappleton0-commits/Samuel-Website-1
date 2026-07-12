'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, Send } from 'lucide-react'

import { createClient } from '@/lib/supabase-browser'


type Props = {

  id: string

  status: 'draft' | 'pending' | 'published'

  userRole: 'admin' | 'editor'

}



export default function BlogStatusButton({

  id,

  status,

  userRole,

}: Props) {


  const supabase = createClient()

  const router = useRouter()


  const [loading,setLoading] = useState(false)



  async function updateStatus(
    newStatus:'pending'|'published'
  ){


    if(newStatus === 'published'){

      const confirmPublish =
        window.confirm(
          'Approve and publish this article?'
        )

      if(!confirmPublish)

        return

    }



    try {


      setLoading(true)



      const { error } = await supabase

        .from('blog_posts')

        .update({

          status:newStatus,

          published_at:

            newStatus === 'published'

            ? new Date().toISOString()

            : null

        })

        .eq(
          'id',
          id
        )



      if(error){

        throw error

      }



      router.refresh()



    } catch(error){


      console.error(
        'Status update error:',
        error
      )


    } finally {


      setLoading(false)


    }

  }




  // ============================
  // ADMIN APPROVE
  // ============================

  if(

    userRole === 'admin' &&

    status === 'pending'

  ){

    return (

      <button

        onClick={()=>
          updateStatus('published')
        }

        disabled={loading}

        className="
          inline-flex
          items-center
          gap-2
          rounded-xl
          border
          border-green-300
          px-4
          py-2
          text-green-700
          transition
          hover:bg-green-50
          disabled:opacity-50
        "

      >

        <CheckCircle size={16}/>


        {
          loading

          ? 'Publishing...'

          : 'Approve & Publish'

        }


      </button>

    )

  }





  // ============================
  // EDITOR SEND FOR REVIEW
  // ============================

  if(

    userRole === 'editor' &&

    status === 'draft'

  ){

    return (

      <button

        onClick={()=>
          updateStatus('pending')
        }

        disabled={loading}

        className="
          inline-flex
          items-center
          gap-2
          rounded-xl
          border
          border-blue-300
          px-4
          py-2
          text-blue-700
          transition
          hover:bg-blue-50
          disabled:opacity-50
        "

      >

        <Send size={16}/>


        {
          loading

          ? 'Sending...'

          : 'Submit Review'

        }


      </button>

    )

  }





  return null

}