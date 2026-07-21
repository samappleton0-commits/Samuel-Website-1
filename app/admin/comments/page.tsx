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


  user_id:string | null


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
// BUILD COMMENT TREE
// =========================================================


function buildCommentTree(

  comments:Comment[]

){



  const map =

    new Map<string,Comment>()






  const roots:Comment[] = []








  comments.forEach(comment=>{


    map.set(

      comment.id,

      {

        ...comment,

        replies:[]

      }

    )


  })









  comments.forEach(comment=>{


    const current =

      map.get(

        comment.id

      )







    if(!current){

      return

    }








    if(comment.parent_id){



      const parent =

        map.get(

          comment.parent_id

        )







      if(parent){


        parent.replies?.push(

          current

        )


      }



    }


    else{


      roots.push(

        current

      )


    }



  })








  return roots



}












// =========================================================
// PAGE
// =========================================================


export default async function AdminCommentsPage(){





  const userRole =

    await getUserRole()







  if(!userRole){


    redirect('/login')


  }








  const supabase =

    await createClient()










  const select = `

    id,

    user_id,

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
  // ADMIN GET ALL COMMENTS
  // =====================================================


  if(

    userRole.role === 'admin'

  ){



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









  // =====================================================
  // EDITOR / USER POSTS ONLY
  // =====================================================


  else {



    const {

      data:posts,

      error:postError


    } = await supabase


      .from('blog_posts')


      .select('id')


      .eq(

        'user_id',

        userRole.user_id

      )







    if(postError){


      console.error(

        'POST FETCH ERROR',

        postError

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












  const rootComments =

    buildCommentTree(

      comments

    )









  // =====================================================
  // STATS
  // =====================================================


  const pending =

    comments.filter(

      comment=>

      comment.status === 'pending'

    ).length






  const approved =

    comments.filter(

      comment=>

      comment.status === 'approved'

    ).length










  return (


<div

className="mx-auto max-w-6xl"

>








<div className="mb-10">


<h1

className="text-4xl font-black"

>

Comments

</h1>



<p

className="mt-2 text-muted-foreground"

>

Manage blog comments and replies.

</p>



</div>









<div

className="mb-10 grid gap-5 md:grid-cols-3"

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


currentUserId={userRole.user_id}


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

className="text-3xl font-black"

>

{value}

</h2>



</div>



)



}