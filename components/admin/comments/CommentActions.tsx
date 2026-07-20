// =====================================================
// ADMIN COMMENT ACTIONS
// components/admin/comments/CommentActions.tsx
// =====================================================


'use client'


import {
  useState,
} from 'react'


import {
  Check,
  X,
  Trash2,
} from 'lucide-react'


import {
  useRouter,
} from 'next/navigation'






type Props = {

  commentId:string

  role:
    | 'admin'
    | 'editor'
    | 'user'


  status:
    | 'pending'
    | 'approved'
    | 'rejected'

}









export default function CommentActions({

  commentId,

  role,

  status,

}:Props){





  const router = useRouter()





  const [

    loading,

    setLoading

  ] = useState(false)









  async function action(

    type:
      | 'approve'
      | 'reject'
      | 'delete'

  ){






    if(type === 'delete'){



      const confirmed =

        window.confirm(

          'Are you sure you want to delete this comment?'

        )





      if(!confirmed){

        return

      }



    }







    try{



      setLoading(true)






      const response = await fetch(

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







      const result =

        await response.json()






      if(!response.ok){


        throw new Error(

          result.error ||

          'Action failed'

        )


      }






      router.refresh()




    }


    catch(error){



      console.error(

        error

      )



    }


    finally{


      setLoading(false)


    }




  }









  if(role !== 'admin'){


    return null


  }









  return (



    <div

      className="
        mt-6
        flex
        flex-wrap
        gap-3
      "

    >








      {/* APPROVE */}



      <button


        type="button"


        disabled={

          loading ||

          status === 'approved'

        }


        onClick={()=>action('approve')}


        className={

          `

          inline-flex

          items-center

          gap-2

          rounded-full

          px-4

          py-2

          text-sm

          font-semibold

          text-white


          ${

          status === 'approved'

          ?

          'bg-green-400 opacity-50 cursor-not-allowed'

          :

          'bg-green-600'

          }


          `

        }


      >



        <Check size={16}/>


        {

        status === 'approved'

        ?

        'Approved'

        :

        'Approve'

        }



      </button>









      {/* REJECT */}



      <button


        type="button"


        disabled={

          loading ||

          status === 'rejected'

        }


        onClick={()=>action('reject')}



        className={

          `

          inline-flex

          items-center

          gap-2

          rounded-full

          px-4

          py-2

          text-sm

          font-semibold

          text-white


          ${

          status === 'rejected'

          ?

          'bg-yellow-300 opacity-50 cursor-not-allowed'

          :

          'bg-yellow-500'

          }


          `

        }


      >



        <X size={16}/>


        {

        status === 'rejected'

        ?

        'Rejected'

        :

        'Reject'

        }



      </button>









      {/* DELETE */}



      <button


        type="button"


        disabled={loading}


        onClick={()=>action('delete')}



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
          disabled:opacity-50
        "


      >



        <Trash2 size={16}/>


        Delete



      </button>







    </div>



  )


}