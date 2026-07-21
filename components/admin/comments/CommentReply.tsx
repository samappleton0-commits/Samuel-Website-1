// =====================================================
// COMMENT REPLY FORM
// components/comments/CommentReply.tsx
// =====================================================

'use client'


import {
  useState,
} from 'react'



type Props = {

  commentId:string

  postId:string

  onSuccess?:()=>void

}





export default function CommentReply({

  commentId,

  postId,

  onSuccess,

}:Props){



  const [content,setContent] =

    useState('')



  const [loading,setLoading] =

    useState(false)



  const [error,setError] =

    useState('')



  const [success,setSuccess] =

    useState(false)





  async function submitReply(){



    setError('')

    setSuccess(false)





    if(!content.trim()){


      setError(

        'Please enter a reply.'

      )


      return

    }





    try {


      setLoading(true)





      const response = await fetch(

        '/api/comment',

        {


          method:'POST',


          headers:{


            'Content-Type':

              'application/json'


          },


          body:JSON.stringify({


            postId,


            parentId:commentId,


            content:content.trim()


          })


        }

      )







      const data = await response.json()







      if(!response.ok){


        throw new Error(

          data.error ||

          'Unable to submit reply.'

        )


      }







      setContent('')


      setSuccess(true)



      onSuccess?.()





    }


    catch(error){



      setError(


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


    <div

      className="
        mt-6
        rounded-2xl
        border
        border-surface-border
        bg-surface
        p-4
      "

    >




      <p

        className="
          mb-3
          text-sm
          font-semibold
        "

      >

        Replying to this comment

      </p>





      <textarea


        value={content}


        onChange={e=>

          setContent(e.target.value)

        }


        placeholder="Write your reply..."


        rows={4}


        className="
          w-full
          rounded-xl
          border
          border-surface-border
          bg-background
          p-3
          text-sm
          outline-none
          focus:ring-2
          focus:ring-primary
        "

      />






      {

      error && (


        <p

          className="
            mt-2
            text-sm
            text-red-500
          "

        >

          {error}

        </p>


      )

      }






      {

      success && (


        <p

          className="
            mt-2
            text-sm
            text-green-600
          "

        >

          Reply submitted successfully.

        </p>


      )

      }









      <div

        className="
          mt-4
          flex
          justify-end
        "

      >



        <button


          type="button"


          disabled={loading}


          onClick={submitReply}


          className="
            rounded-xl
            bg-primary
            px-5
            py-2
            text-sm
            font-semibold
            text-white
            disabled:opacity-50
          "

        >


          {

          loading

          ?


          'Sending...'


          :


          'Post Reply'


          }


        </button>



      </div>






    </div>


  )


}