// =====================================================
// ADMIN COMMENT REPLIES
// components/admin/comments/CommentReplies.tsx
// =====================================================


'use client'



import {

  MessageCircle,

} from 'lucide-react'





// =====================================================
// TYPES
// =====================================================


type Reply = {

  id:string

  name:string

  email:string | null

  content:string

  created_at:string

  status:
    | 'pending'
    | 'approved'
    | 'rejected'


}







type Props = {

  replies:Reply[]

}









// =====================================================
// COMPONENT
// =====================================================


export default function CommentReplies({

  replies,

}:Props){






  if(!replies || replies.length === 0){


    return null


  }







  return (



    <div

      className="
        mt-6
        space-y-4
      "

    >






      <div

        className="
          flex
          items-center
          gap-2
          text-sm
          font-semibold
          text-muted-foreground
        "

      >



        <MessageCircle size={16}/>



        Replies ({replies.length})



      </div>









      {

      replies.map(reply=>(



        <div


          key={reply.id}


          className="
            rounded-2xl
            border
            border-surface-border
            bg-muted/20
            p-4
          "


        >








          {/* HEADER */}



          <div

            className="
              flex
              flex-wrap
              items-center
              justify-between
              gap-3
            "

          >





            <div>



              <h4

                className="
                  font-bold
                "

              >

                {reply.name}


              </h4>





              {

              reply.email && (


                <p

                  className="
                    text-xs
                    text-muted-foreground
                  "

                >

                  {reply.email}


                </p>


              )

              }





            </div>







            <span

              className="
                rounded-full
                bg-surface
                px-3
                py-1
                text-xs
                font-semibold
                uppercase
              "

            >

              {reply.status}


            </span>






          </div>












          {/* CONTENT */}




          <p

            className="
              mt-4
              leading-7
              text-sm
            "

          >

            {reply.content}


          </p>












          {/* DATE */}



          <p

            className="
              mt-3
              text-xs
              text-muted-foreground
            "

          >



            {

            new Intl.DateTimeFormat(

              'en-US',

              {

                day:'numeric',

                month:'long',

                year:'numeric',

                timeZone:'UTC'

              }

            ).format(

              new Date(reply.created_at)

            )

            }



          </p>








        </div>



      ))

      }






    </div>



  )



}