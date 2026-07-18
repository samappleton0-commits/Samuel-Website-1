'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { useRouter } from 'next/navigation'


type Props = {

  commentId:string

  postId:string

}



export default function CommentReply({

  commentId,

  postId,

}:Props){


  const router = useRouter()


  const [reply,setReply] = useState('')

  const [loading,setLoading] = useState(false)

  const [message,setMessage] = useState('')




  async function submitReply(){


    if(!reply.trim()){

      setMessage('Please write a reply.')

      return

    }



    try{


      setLoading(true)

      setMessage('')



      const response = await fetch(

        '/api/admin/comments/reply',

        {

          method:'POST',

          headers:{

            'Content-Type':'application/json'

          },

          body:JSON.stringify({

            commentId,

            postId,

            content:reply

          })

        }

      )




      const result = await response.json()



      if(!response.ok){

        throw new Error(

          result.error || 'Reply failed'

        )

      }



      setReply('')

      setMessage('Reply sent.')

      router.refresh()



    }

    catch(error){


      setMessage(

        error instanceof Error

        ? error.message

        : 'Something went wrong.'

      )


    }

    finally{


      setLoading(false)


    }


  }





  return (

    <div className="
      mt-5
      rounded-2xl
      border
      border-surface-border
      bg-muted/20
      p-4
    ">


      <textarea

        value={reply}

        onChange={(e)=>
          setReply(e.target.value)
        }

        rows={3}

        placeholder="Reply to this comment..."

        className="
          w-full
          rounded-xl
          border
          border-surface-border
          bg-background
          px-4
          py-3
          outline-none
        "

      />



      <button

        onClick={submitReply}

        disabled={loading}

        className="
          mt-3
          inline-flex
          items-center
          gap-2
          rounded-full
          bg-primary
          px-5
          py-2
          text-white
        "

      >

        <Send size={15}/>

        {
          loading
          ?
          'Sending...'
          :
          'Reply'
        }

      </button>



      {
        message && (

          <p className="
            mt-3
            text-sm
            text-muted-foreground
          ">

            {message}

          </p>

        )
      }


    </div>

  )

}