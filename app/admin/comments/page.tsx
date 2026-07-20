// =========================================================
// COMMENTS MANAGEMENT PAGE
// app/admin/comments/page.tsx
// =========================================================


import {
  redirect,
} from 'next/navigation'


import {
  MessageCircle,
  CheckCircle,
  Clock,
} from 'lucide-react'


import {
  createClient,
} from '@/lib/supabase-server'


import {
  getUserRole,
} from '@/lib/get-user-role'


import CommentManager from '@/components/admin/comments/CommentManager'







// =========================================================
// TYPES
// =========================================================


type BlogPost = {

  title:string

  slug:string

  user_id:string

}





export type Comment = {

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



  const userRole = await getUserRole()





  if(!userRole){


    redirect('/login')


  }






  const supabase = await createClient()







  const select = `

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
  // FETCH COMMENTS
  // =====================================================



  if(userRole.role === 'admin'){





    const {

      data,

      error


    } = await supabase


      .from('comments')


      .select(select)


      .order(

        'created_at',

        {

          ascending:false

        }

      )






    if(error){

      console.error(

        'COMMENTS FETCH ERROR',

        error

      )

    }






    comments =

      (data ?? []) as unknown as Comment[]



  }





  else {



    const {

      data:posts,

      error


    } = await supabase


      .from('blog_posts')


      .select('id')


      .eq(

        'user_id',

        userRole.user_id

      )







    if(error){

      console.error(

        'POST LOOKUP ERROR',

        error

      )

    }







    const postIds =

      posts?.map(

        post=>post.id

      ) ?? []







    if(postIds.length){





      const {

        data,

        error


      } = await supabase


        .from('comments')


        .select(select)


        .in(

          'post_id',

          postIds

        )


        .order(

          'created_at',

          {

            ascending:false

          }

        )








      if(error){

        console.error(

          'COMMENT FETCH ERROR',

          error

        )

      }






      comments =

        (data ?? []) as unknown as Comment[]



    }




  }









  // =====================================================
  // BUILD FLAT REPLY STRUCTURE
  // =====================================================



  const rootComments:Comment[] = []





  const replyMap =

    new Map<string,Comment[]>()






  comments.forEach(comment=>{



    if(!comment.parent_id){



      rootComments.push({

        ...comment,

        replies:[]

      })



      replyMap.set(

        comment.id,

        []

      )


    }



  })








  comments.forEach(comment=>{



    if(comment.parent_id){



      const replies =

        replyMap.get(

          comment.parent_id

        )






      if(replies){



        replies.push({

          ...comment,

          replies:[]

        })



      }



    }



  })








  rootComments.forEach(comment=>{



    comment.replies =

      replyMap.get(

        comment.id

      ) ?? []



  })









  // =====================================================
  // STATS
  // =====================================================



  const pending =

    comments.filter(

      comment =>

      comment.status === 'pending'

    ).length






  const approved =

    comments.filter(

      comment =>

      comment.status === 'approved'

    ).length










  return (



    <div

      className="
        mx-auto
        max-w-6xl
      "

    >





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

          Manage blog comments and replies.


        </p>




      </div>









      <div

        className="
          mb-10
          grid
          gap-5
          md:grid-cols-3
        "

      >





        <StatCard

          icon={<Clock size={22}/>}

          title="Pending"

          value={pending}

        />





        <StatCard

          icon={<CheckCircle size={22}/>}

          title="Approved"

          value={approved}

        />





        <StatCard

          icon={<MessageCircle size={22}/>}

          title="Total"

          value={comments.length}

        />




      </div>









      <CommentManager


        comments={rootComments}


        role={

          userRole.role as

          'admin'

          |

          'editor'

          |

          'user'

        }


      />






    </div>



  )


}









// =========================================================
// STAT CARD
// =========================================================


function StatCard({

  icon,

  title,

  value,

}:{

  icon:React.ReactNode

  title:string

  value:number

}){


  return (


    <div

      className="
        rounded-3xl
        border
        border-surface-border
        bg-card
        p-6
      "

    >



      {icon}



      <p

        className="
          mt-4
          text-sm
          text-muted-foreground
        "

      >

        {title}


      </p>




      <h2

        className="
          text-3xl
          font-black
        "

      >

        {value}


      </h2>



    </div>


  )


}