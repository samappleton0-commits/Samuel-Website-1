// =========================================================
// COMMENTS MANAGEMENT PAGE
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

import CommentReply from '@/components/admin/comment-reply'





// =========================================================
// TYPES
// =========================================================


type BlogPost = {

  title:string

  slug:string

  user_id:string

}




type Comment = {

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


  replies?:Comment[]

}







// =========================================================
// PAGE
// =========================================================


export default async function AdminCommentsPage(){



  // =====================================================
  // CHECK USER ROLE
  // =====================================================


  const userRole = await getUserRole()



  if(!userRole){


    redirect('/login')


  }




  const supabase = await createClient()

    // =====================================================
  // FETCH COMMENTS
  // =====================================================


  const commentSelect = `

    id,

    name,

    email,

    content,

    status,

    created_at,

    post_id,

    parent_id,

    blog_posts(

      title,

      slug,

      user_id

    )

  `




  let comments:Comment[] = []





  // =====================================================
  // ADMIN
  // SEE ALL COMMENTS
  // =====================================================


  if(userRole.role === 'admin'){



    const {

      data,

      error

    } = await supabase


      .from('comments')


      .select(commentSelect)


      .order(

        'created_at',

        {

          ascending:false

        }

      )





    if(error){


      console.error(

        'ADMIN COMMENTS ERROR:',

        error

      )


    }



    comments =

      (data ?? []) as unknown as Comment[]



  }









  // =====================================================
  // EDITOR / USER
  // ONLY COMMENTS ON THEIR POSTS
  // =====================================================


  else {



    const {

      data:articles,

      error:articleError


    } = await supabase


      .from('blog_posts')


      .select('id')


      .eq(

        'user_id',

        userRole.user_id

      )






    if(articleError){



      console.error(

        'ARTICLE LOOKUP ERROR:',

        articleError

      )



    }

    else {



      const articleIds =

        articles?.map(

          article => article.id

        ) ?? []







      if(articleIds.length){



        const {

          data,

          error


        } = await supabase


          .from('comments')


          .select(commentSelect)


          .in(

            'post_id',

            articleIds

          )


          .order(

            'created_at',

            {

              ascending:false

            }

          )






        if(error){


          console.error(

            'EDITOR COMMENTS ERROR:',

            error

          )


        }





        comments =

          (data ?? []) as unknown as Comment[]



      }



    }



  }









  // =====================================================
  // BUILD COMMENT TREE
  // =====================================================


  const commentMap =

    new Map<string,Comment>()




  comments.forEach(comment=>{


    commentMap.set(

      comment.id,

      {

        ...comment,

        replies:[]

      }

    )


  })






  const rootComments:Comment[] = []






  comments.forEach(comment=>{



    const current =

      commentMap.get(

        comment.id

      )





    if(!current){

      return

    }





    if(comment.parent_id){



      const parent =

        commentMap.get(

          comment.parent_id

        )





      if(parent){



        parent.replies!.push(

          current

        )


      }



    }


    else {



      rootComments.push(

        current

      )



    }




  })

    // =====================================================
  // STATS
  // =====================================================


  const pendingComments = comments.filter(

    comment =>

    comment.status === 'pending'

  )



  const approvedComments = comments.filter(

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




      {/* =====================================================
          HEADER
      ===================================================== */}


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

          {

          userRole.role === 'admin'

          ?

          'Review and manage all blog comments.'

          :

          'Review comments on your articles.'

          }


        </p>


      </div>









      {/* =====================================================
          STATS
      ===================================================== */}


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

            {/* =====================================================
          COMMENTS LIST
      ===================================================== */}



      <div

        className="
          space-y-6
        "

      >



      {

        rootComments.length === 0 ? (



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



        rootComments.map(comment => (



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









            {/* COMMENT */}


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








            {/* ADMIN ACTIONS */}


            <CommentActions

              commentId={comment.id}

              role={

                userRole.role as

                'admin' |

                'editor' |

                'user'

              }

            />







            {/* REPLY BOX */}



            <CommentReply

              commentId={comment.id}

              postId={comment.post_id}

            />









            {/* CHILD REPLIES */}



            {

            comment.replies &&

            comment.replies.length > 0 && (



              <div

                className="
                  mt-6
                  ml-6
                  space-y-4
                  border-l
                  pl-5
                "

              >



              {

              comment.replies.map(reply => (



                <div

                  key={reply.id}

                  className="
                    rounded-2xl
                    bg-surface
                    p-5
                  "

                >


                  <h4

                    className="
                      font-bold
                    "

                  >

                    {reply.name}

                  </h4>



                  <p

                    className="
                      mt-2
                      text-muted-foreground
                    "

                  >

                    {reply.content}

                  </p>



                  <p

                    className="
                      mt-3
                      text-xs
                      text-muted-foreground
                    "

                  >

                    Reply


                  </p>


                </div>



              ))

              }


              </div>



            )

            }





          </article>



        ))


      }



      </div>



    </div>

  )

}