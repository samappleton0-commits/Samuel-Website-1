// =====================================================
// ADMIN COMMENT CARD
// components/admin/comments/CommentCard.tsx
// =====================================================


'use client'



import {

  ChevronDown,

  ChevronUp,

  ExternalLink,

} from 'lucide-react'



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
// COMPONENT
// =====================================================


export default function CommentCard({


  comment,


  role,


  expanded,


  onToggle,


}:Props){





  return (



    <article

      className="
        overflow-hidden
        rounded-3xl
        border
        border-surface-border
        bg-card
      "

    >








      {/* COLLAPSED HEADER */}



      <button


        type="button"


        onClick={onToggle}



        className="
          flex
          w-full
          items-start
          justify-between
          gap-4
          p-5
          text-left
          hover:bg-muted/20
        "


      >





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
              gap-3
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








        {

        expanded

        ?

        <ChevronUp size={20}/>

        :

        <ChevronDown size={20}/>

        }



      </button>













      {/* EXPANDED AREA */}



      {

      expanded && (



        <div

          className="
            border-t
            border-surface-border
            p-5
          "

        >







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









          <div

            className="
              mt-5
            "

          >



            <p

              className="
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

                new Date(comment.created_at)

              )

              }



            </p>




          </div>









          {/* REPLIES */}



          {

          comment.replies &&

          comment.replies.length > 0 && (



            <CommentReplies

              replies={comment.replies}

            />


          )

          }









          {/* REPLY BOX */}



          <CommentReply

            commentId={comment.id}

          />









          {/* ACTIONS */}



          <CommentActions

            commentId={comment.id}

            role={role}

            status={comment.status}

          />






        </div>



      )

      }







    </article>



  )



}