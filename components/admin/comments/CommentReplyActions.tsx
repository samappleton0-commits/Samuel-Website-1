// =====================================================
// ADMIN COMMENT REPLY ACTIONS
// components/admin/comments/CommentReplyActions.tsx
// =====================================================


'use client'


import {
  useState,
} from 'react'


import {
  Pencil,
  Trash2,
  Check,
  X,
} from 'lucide-react'


import {
  useRouter,
} from 'next/navigation'





type Props = {

  replyId:string

  content:string

}







export default function CommentReplyActions({

  replyId,

  content,

}:Props){



  const router = useRouter()



  const [

    editing,

    setEditing

  ] = useState(false)





  const [

    value,

    setValue

  ] = useState(content)






  const [

    loading,

    setLoading

  ] = useState(false)








  async function updateReply(){



    if(!value.trim()){

      return

    }




    try{


      setLoading(true)



      const response = await fetch(

        '/api/admin/comments/reply/update',

        {

          method:'POST',

          headers:{

            'Content-Type':

            'application/json'

          },

          body:JSON.stringify({

            replyId,

            content:value.trim()

          })

        }

      )






      if(!response.ok){


        throw new Error(

          'Update failed'

        )


      }






      setEditing(false)


      router.refresh()



    }


    catch(error){


      console.error(error)


    }


    finally{


      setLoading(false)


    }


  }









  async function deleteReply(){



    const confirmed =

      window.confirm(

        'Delete this reply?'

      )





    if(!confirmed){

      return

    }






    try{


      setLoading(true)



      const response = await fetch(

        '/api/admin/comments/reply/delete',

        {

          method:'POST',

          headers:{

            'Content-Type':

            'application/json'

          },


          body:JSON.stringify({

            replyId

          })


        }

      )







      if(!response.ok){


        throw new Error(

          'Delete failed'

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



  }








  return (



    <div

      className="
        mt-4
        flex
        flex-wrap
        gap-2
      "

    >




      {

      editing ? (



        <>



          <button

            disabled={loading}

            onClick={updateReply}

            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-green-600
              px-3
              py-1
              text-xs
              text-white
            "

          >

            <Check size={14}/>

            Save


          </button>





          <button

            onClick={()=>{

              setEditing(false)

              setValue(content)

            }}

            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-muted
              px-3
              py-1
              text-xs
            "

          >

            <X size={14}/>

            Cancel


          </button>



        </>



      )

      :


      (



        <>


          <button

            onClick={()=>setEditing(true)}

            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-muted
              px-3
              py-1
              text-xs
            "

          >

            <Pencil size={14}/>

            Edit


          </button>






          <button

            disabled={loading}

            onClick={deleteReply}

            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-red-600
              px-3
              py-1
              text-xs
              text-white
            "

          >

            <Trash2 size={14}/>

            Delete


          </button>



        </>


      )

      }






      {

      editing && (



        <textarea

          value={value}

          onChange={event=>

            setValue(

              event.target.value

            )

          }

          className="
            order-first
            w-full
            rounded-xl
            border
            border-surface-border
            bg-background
            p-3
            text-sm
          "

          rows={3}

        />


      )

      }




    </div>



  )

}