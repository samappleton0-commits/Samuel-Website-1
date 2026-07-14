// =========================================================
// ADMIN COMMENTS PAGE
// app/admin/comments/page.tsx
// =========================================================


import Link from 'next/link'

import { redirect } from 'next/navigation'

import {

  MessageCircle,

  CheckCircle,

  Clock,

  ExternalLink,

} from 'lucide-react'


import { createClient } from '@/lib/supabase-server'

import { getUserRole } from '@/lib/get-user-role'

import CommentActions from '@/components/admin/comment-actions'






// =========================================================
// TYPES
// =========================================================


type Comment = {

  id:string

  name:string

  email:string | null

  content:string

  status:string

  created_at:string

  post_id:string


  blog_posts?:{

    title:string

    slug:string

  }

}







// =========================================================
// PAGE
// =========================================================


export default async function AdminCommentsPage(){



  // =====================================================
  // ADMIN ONLY PROTECTION
  // =====================================================


  const userRole =
    await getUserRole()



  if(

    userRole?.role !== 'admin'

  ){

    redirect('/admin')

  }







  // =====================================================
  // SUPABASE
  // =====================================================


  const supabase =
    await createClient()







  // =====================================================
  // FETCH COMMENTS
  // =====================================================


  const {

    data

  } = await supabase


    .from('comments')


    .select(

      `

      id,

      name,

      email,

      content,

      status,

      created_at,

      post_id,


      blog_posts(

        title,

        slug

      )


      `

    )


    .order(

      'created_at',

      {

        ascending:false

      }

    )


console.log(
  'ADMIN COMMENTS:',
  data
)


  const comments =
    (data ?? []) as unknown as Comment[]







  // =====================================================
  // STATS
  // =====================================================


  const pendingComments =

    comments.filter(

      comment =>

      comment.status === 'pending'

    )




  const approvedComments =

    comments.filter(

      comment =>

      comment.status === 'approved'

    )








  return (

    <div

      className="
        mx-auto
        max-w-6xl
      "

    >






      {/* HEADER */}


      <div

        className="
          mb-10
        "

      >

        <h1

          className="
            text-4xl
            font-black
          "

        >

          Comments

        </h1>


        <p

          className="
            mt-2
            text-muted-foreground
          "

        >

          Review and manage blog comments.

        </p>


      </div>









      {/* STATS */}


      <div

        className="
          mb-10
          grid
          gap-5
          md:grid-cols-3
        "

      >




        <div

          className="
            rounded-3xl
            border
            border-surface-border
            bg-card
            p-6
          "

        >

          <Clock size={24}/>


          <p

            className="
              mt-4
              text-sm
              text-muted-foreground
            "

          >

            Pending

          </p>


          <h2

            className="
              text-3xl
              font-black
            "

          >

            {pendingComments.length}

          </h2>


        </div>








        <div

          className="
            rounded-3xl
            border
            border-surface-border
            bg-card
            p-6
          "

        >

          <CheckCircle size={24}/>


          <p

            className="
              mt-4
              text-sm
              text-muted-foreground
            "

          >

            Approved

          </p>


          <h2

            className="
              text-3xl
              font-black
            "

          >

            {approvedComments.length}

          </h2>


        </div>







        <div

          className="
            rounded-3xl
            border
            border-surface-border
            bg-card
            p-6
          "

        >

          <MessageCircle size={24}/>


          <p

            className="
              mt-4
              text-sm
              text-muted-foreground
            "

          >

            Total

          </p>


          <h2

            className="
              text-3xl
              font-black
            "

          >

            {comments.length}

          </h2>


        </div>





      </div>









      {/* COMMENTS */}


      <div

        className="
          space-y-6
        "

      >



      {

        comments.length === 0

        ?


        (

          <div

            className="
              rounded-3xl
              border
              border-surface-border
              bg-card
              p-10
              text-center
            "

          >

            <MessageCircle

              className="
                mx-auto
                mb-3
              "

            />


            <p>

              No comments found.

            </p>


          </div>

        )


        :



        comments.map((comment)=>(


          <article

            key={comment.id}

            className="
              rounded-3xl
              border
              border-surface-border
              bg-card
              p-6
            "

          >





            {/* USER */}


            <div

              className="
                flex
                items-start
                justify-between
                gap-5
              "

            >



              <div>


                <h3

                  className="
                    font-bold
                  "

                >

                  {comment.name}

                </h3>



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


              </div>






              <span

                className="
                  rounded-full
                  bg-surface
                  px-4
                  py-1
                  text-xs
                  font-semibold
                  uppercase
                "

              >

                {comment.status}

              </span>



            </div>









            {/* ARTICLE */}


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




                    <Link

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


                    </Link>



                  </div>


                </div>

              )

            }









            {/* COMMENT CONTENT */}


            <p

              className="
                mt-5
                leading-7
                text-muted-foreground
              "

            >

              {comment.content}

            </p>







            {/* DATE */}


            <p

              className="
                mt-4
                text-xs
                text-muted-foreground
              "

            >

              {

                new Date(

                  comment.created_at

                )

                .toLocaleDateString(

                  'en-GB',

                  {

                    day:'numeric',

                    month:'long',

                    year:'numeric'

                  }

                )

              }


            </p>







            {/* ACTIONS */}


            <CommentActions

              commentId={comment.id}

            />





          </article>


        ))

      }



      </div>





    </div>

  )


}