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

    user_id:string

  }

}







// =========================================================
// PAGE
// =========================================================


export default async function AdminCommentsPage(){



  // =====================================================
  // USER ROLE CHECK
  // =====================================================


  const userRole = await getUserRole()



  if(!userRole){

    redirect('/login')

  }





  const supabase = await createClient()



// =====================================================
// FETCH COMMENTS
// =====================================================


let data:any[] = []

let error:any = null



// =====================================================
// ADMIN
// GET ALL COMMENTS
// =====================================================


if(userRole.role === 'admin'){


const result = await supabase

.from('comments')

.select(`
id,
name,
email,
content,
status,
created_at,
post_id,

blog_posts(
title,
slug,
user_id
)

`)

.order(
'created_at',
{
ascending:false
}
)


data = result.data ?? []

error = result.error


}







// =====================================================
// EDITOR / USER
// ONLY THEIR ARTICLES
// =====================================================


else{


// Get their articles first


const {

data:articles,

error:articleError

}=await supabase

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

else{


const articleIds =
articles?.map(
article=>article.id
) ?? []





if(articleIds.length){


const result = await supabase

.from('comments')

.select(`
id,
name,
email,
content,
status,
created_at,
post_id,

blog_posts(
title,
slug,
user_id
)

`)

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



data = result.data ?? []

error = result.error



}



}



}



  if(error){

    console.error(

      'COMMENTS FETCH ERROR:',

      error

    )

  }





  const comments =

  (data ?? []) as unknown as Comment[]

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

comments.length === 0 ? (



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









{/* COMMENT MESSAGE */}



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









{/* ACTIONS */}


<CommentActions

commentId={comment.id}

role={userRole.role}

/>







</article>



))


}



</div>








</div>

)


}