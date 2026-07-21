// =====================================================
// ADMIN COMMENT CARD
// components/admin/comments/CommentCard.tsx
// =====================================================

'use client'


import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  MessageCircle,
} from 'lucide-react'


import {
  useState,
} from 'react'


import CommentActions from './CommentActions'

import CommentReply from './CommentReply'

import CommentReplies from './CommentReplies'





// =====================================================
// TYPES
// =====================================================


type BlogPost = {

  title:string

  slug:string

  user_id:string

}





export type AdminComment = {


  id:string


  name:string


  email:string | null


  content:string


  status:
    | 'pending'
    | 'approved'
    | 'rejected'



  created_at:string


  post_id:string


  parent_id:string | null


  ip_address?:string | null


  user_id?:string | null



  blog_posts?:BlogPost | null



  replies?:AdminComment[]


}







type Props = {


  comment:AdminComment


  role:
    | 'admin'
    | 'editor'
    | 'user'


  expanded:boolean


  onToggle:()=>void


}









// =====================================================
// HELPERS
// =====================================================


function getInitials(name:string){


  return name

    .split(' ')

    .map(

      word=>word[0]

    )

    .slice(0,2)

    .join('')

    .toUpperCase()


}






function formatDate(date:string){


  return new Intl.DateTimeFormat(

    'en-US',

    {

      day:'numeric',

      month:'short',

      year:'numeric',

      timeZone:'UTC'

    }

  ).format(

    new Date(date)

  )


}









// =====================================================
// COMPONENT
// =====================================================


export default function CommentCard({

  comment,

  role,

  expanded,

  onToggle,

}:Props){



const [replying,setReplying] =

useState(false)





return (

  
  <article

    className="
      overflow-hidden
      rounded-3xl
      border
      border-surface-border
      bg-card
      transition
    "

  >







    {/* =====================================
        COLLAPSED HEADER
    ===================================== */}



    <button


      type="button"


      onClick={onToggle}


      className="
        flex
        w-full
        items-start
        gap-4
        p-5
        text-left
        transition
        hover:bg-muted/20
      "


    >





      {/* AVATAR */}


      <div

        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-primary/10
          text-sm
          font-bold
          text-primary
        "

      >

        {getInitials(comment.name)}

      </div>







      {/* SUMMARY */}


      <div

        className="
          min-w-0
          flex-1
        "

      >



        <div

          className="
            flex
            flex-wrap
            items-center
            gap-2
          "

        >



          <h3

            className="
              font-bold
            "

          >

            {comment.name}

          </h3>






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

            {comment.status}

          </span>





          <span

            className="
              text-xs
              text-muted-foreground
            "

          >

            {formatDate(comment.created_at)}

          </span>



        </div>







        <p

          className="
            mt-2
            line-clamp-2
            text-sm
            text-muted-foreground
          "

        >

          {comment.content}

        </p>



      </div>









      {/* EXPAND ICON */}


      <div

        className="
          shrink-0
          pt-2
        "

      >

        {

        expanded

        ?

        <ChevronUp size={20}/>

        :

        <ChevronDown size={20}/>

        }


      </div>






    </button>












    {/* =====================================
        EXPANDED AREA
    ===================================== */}



    {

    expanded && (



      <div

        className="
          border-t
          border-surface-border
          p-5
        "

      >







        {/* EMAIL */}



        {

        comment.email && (


          <p

            className="
              text-sm
              text-muted-foreground
            "

          >

            {comment.email}

          </p>


        )

        }












        {/* ARTICLE INFO */}



        {

        comment.blog_posts && (



          <div

            className="
              mt-5
              rounded-2xl
              bg-surface
              p-4
            "

          >



            <p

              className="
                text-xs
                uppercase
                text-muted-foreground
              "

            >

              Article

            </p>






            <div

              className="
                mt-2
                flex
                items-center
                justify-between
                gap-3
              "

            >



              <p

                className="
                  font-semibold
                "

              >

                {comment.blog_posts.title}

              </p>







              <a

                href={`/blog/${comment.blog_posts.slug}`}

                target="_blank"

                className="
                  inline-flex
                  items-center
                  gap-1
                  text-sm
                  font-semibold
                  text-primary
                "

              >

                View

                <ExternalLink size={14}/>

              </a>



            </div>




          </div>



        )

        }









        {/* FULL COMMENT */}



        <div

          className="
            mt-5
          "

        >



          <p

            className="
              whitespace-pre-line
              leading-7
            "

          >

            {comment.content}

          </p>





          <p

            className="
              mt-3
              text-xs
              text-muted-foreground
            "

          >

            {formatDate(comment.created_at)}

          </p>




        </div>

        





        {/* =====================================
            REPLIES
        ===================================== */}



        {

        comment.replies &&

        comment.replies.length > 0 && (



          <CommentReplies

            replies={comment.replies}

            role={role}

          />


        )

        }












        {/* =====================================
            REPLY BUTTON
        ===================================== */}



        <button


          type="button"


          onClick={()=>setReplying(!replying)}


          className="
            mt-5
            inline-flex
            items-center
            gap-2
            text-sm
            font-semibold
            text-primary
          "


        >


          <MessageCircle size={16}/>


          {

          replying

          ?

          'Cancel Reply'

          :

          'Reply'

          }


        </button>













        {/* =====================================
            REPLY BOX
        ===================================== */}



        {

        replying && (



          <div

            className="
              mt-4
              rounded-2xl
              border
              border-surface-border
              bg-surface/50
              p-4
            "

          >



            <CommentReply


              commentId={comment.id}


              postId={comment.post_id}


              onSuccess={()=>{


                setReplying(false)


              }}


            />


          </div>



        )

        }












        {/* =====================================
            ADMIN ACTIONS
        ===================================== */}



        <div

          className="
            mt-6
            border-t
            border-surface-border
            pt-5
          "

        >



          <CommentActions


            commentId={comment.id}


            role={role}


            status={comment.status}


          />



        </div>






      </div>



    )

    }





  </article>


)


}