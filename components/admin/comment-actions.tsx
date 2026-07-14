'use client'


import { useState } from 'react'

import {
  Check,
  X,
  Trash2,
} from 'lucide-react'

import { useRouter } from 'next/navigation'





type Props = {

  commentId:string

}






export default function CommentActions({

  commentId,

}:Props){


  const router = useRouter()


  const [loading,setLoading] =
    useState(false)





 const action = async(

  type:'approve'|'reject'|'delete'

)=>{


  if(

    type === 'delete'

  ){

    const confirmed =
      window.confirm(
        'Are you sure you want to delete this comment? This action cannot be undone.'
      )


    if(!confirmed){

      return

    }

  }




  if(

    type === 'reject'

  ){

    const confirmed =
      window.confirm(
        'Reject this comment?'
      )


    if(!confirmed){

      return

    }

  }




  try{


    setLoading(true)



    const response =
      await fetch(

        `/api/admin/comments/${type}`,

        {

          method:'POST',

          headers:{

            'Content-Type':
            'application/json'

          },


          body:JSON.stringify({

            commentId

          })

        }

      )





    if(!response.ok){

      throw new Error(
        'Action failed'
      )

    }




    router.refresh()



  }


  catch(error){


    console.error(error)


  }


  finally{


    setLoading(false)


  }





    try{


      setLoading(true)



      await fetch(

        `/api/admin/comments/${type}`,

        {

          method:'POST',

          headers:{

            'Content-Type':
            'application/json'

          },


          body:JSON.stringify({

            commentId

          })

        }

      )



      router.refresh()



    }


    catch(error){


      console.error(error)


    }


    finally{


      setLoading(false)


    }


  }






  return (

    <div

      className="
        mt-5
        flex
        flex-wrap
        gap-3
      "

    >



      <button

        disabled={loading}

        onClick={()=>
          action('approve')
        }

        className="
          inline-flex
          items-center
          gap-2
          rounded-full
          bg-green-600
          px-4
          py-2
          text-sm
          font-semibold
          text-white
          transition
          hover:opacity-90
        "

      >

        <Check size={16}/>

        Approve

      </button>







      <button

        disabled={loading}

        onClick={()=>
          action('reject')
        }

        className="
          inline-flex
          items-center
          gap-2
          rounded-full
          bg-yellow-500
          px-4
          py-2
          text-sm
          font-semibold
          text-white
          transition
          hover:opacity-90
        "

      >

        <X size={16}/>

        Reject

      </button>








      <button

        disabled={loading}

        onClick={()=>
          action('delete')
        }

        className="
          inline-flex
          items-center
          gap-2
          rounded-full
          bg-red-600
          px-4
          py-2
          text-sm
          font-semibold
          text-white
          transition
          hover:opacity-90
        "

      >

        <Trash2 size={16}/>

        Delete

      </button>



    </div>

  )

}