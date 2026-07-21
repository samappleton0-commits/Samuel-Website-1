// =====================================================
// ADMIN COMMENT CARD
// components/admin/comments/CommentCard.tsx
// =====================================================


'use client'


import {
  useState,
} from 'react'


import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  MessageCircle,
  Save,
  X,
  Pencil,
} from 'lucide-react'


import CommentActions from './CommentActions'

import CommentReply from '@/components/admin/comments/CommentReply'

import CommentReplies from './CommentReplies'







type BlogPost = {

  title:string

  slug:string

}








export type AdminComment = {


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



  replies?:AdminComment[]


}









type Props = {


  comment:AdminComment


  role:

    | 'admin'

    | 'editor'

    | 'user'


  currentUserId:string | null


  expanded:boolean


  onToggle:()=>void


  isReply?:boolean


}









export default function CommentCard({

  comment,

  role,

  currentUserId,

  expanded,

  onToggle,

  isReply=false,

}:Props){






const [

showReply,

setShowReply

]=useState(false)







const [

editing,

setEditing

]=useState(false)







const [

text,

setText

]=useState(comment.content)







const canEdit =

  comment.user_id &&

  comment.user_id === currentUserId







function initials(name:string){


return name

.split(' ')

.filter(Boolean)

.map(v=>v[0])

.slice(0,2)

.join('')

.toUpperCase()


}








function date(value:string){


return new Intl.DateTimeFormat(

'en-US',

{

day:'numeric',

month:'short',

year:'numeric'

}

).format(

new Date(value)

)


}










async function updateComment(){



if(!text.trim()) return





await fetch(

`/api/admin/comments/${comment.id}`,

{


method:'PATCH',


headers:{


'Content-Type':

'application/json'


},


body:JSON.stringify({

content:text.trim()

})


}

)





setEditing(false)

window.location.reload()



}











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





<div

className="

flex

gap-4

p-5

"

>







<div

className="

flex

h-10

w-10

shrink-0

items-center

justify-center

rounded-full

bg-primary/10

font-bold

text-primary

"

>

{initials(comment.name)}


</div>








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

className="font-bold"

>

{comment.name}

</h3>







{

!isReply && (

<span

className="

rounded-full

bg-surface

px-3

py-1

text-xs

uppercase

"

>

{comment.status}

</span>

)

}



</div>







<p

className="

mt-1

text-xs

text-muted-foreground

"

>

{date(comment.created_at)}

</p>









{

editing ? (



<div className="mt-4 space-y-3">


<textarea

value={text}

onChange={e=>setText(e.target.value)}

className="

w-full

rounded-xl

border

border-surface-border

bg-background

p-3

"

/>



<div className="flex gap-3">



<button

onClick={updateComment}

className="

inline-flex

items-center

gap-2

rounded-full

bg-green-600

px-4

py-2

text-white

"

>

<Save size={15}/>

Save

</button>





<button

onClick={()=>{

setEditing(false)

setText(comment.content)

}}

className="

rounded-full

bg-surface

px-4

py-2

"

>

<X size={15}/>

Cancel

</button>



</div>


</div>



)

:

(



<p

className="

mt-3

whitespace-pre-line

break-words

text-sm

leading-7

text-muted-foreground

"

>

{comment.content}

</p>



)



}









<div

className="

mt-5

flex

flex-wrap

gap-4

"

>





<button

onClick={()=>setShowReply(!showReply)}

className="

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

showReply

?

'Cancel'

:

'Reply'

}

</button>







{

canEdit && (


<button

onClick={()=>setEditing(true)}

className="

inline-flex

items-center

gap-2

text-sm

font-semibold

text-blue-600

"

>

<Pencil size={15}/>

Edit

</button>


)

}









<CommentActions

commentId={comment.id}

role={role}

status={comment.status}

isReply={isReply}

/>









{

!isReply && (


<button

onClick={onToggle}

className="

inline-flex

items-center

gap-2

text-sm

font-semibold

text-muted-foreground

"

>


{

expanded

?

<>

Hide

<ChevronUp size={16}/>

</>

:

<>

Details

<ChevronDown size={16}/>

</>

}


</button>



)

}



</div>








</div>



</div>









{

showReply && (


<div className="px-5 pb-5">


<CommentReply

commentId={comment.id}

postId={comment.post_id}

onSuccess={()=>setShowReply(false)}

/>



</div>


)

}









{

expanded && !isReply && (


<div

className="

border-t

border-surface-border

p-5

"

>





{

comment.blog_posts && (


<div

className="

rounded-2xl

bg-surface

p-4

"

>


<p className="text-xs uppercase">

Article

</p>



<div

className="

mt-2

flex

justify-between

gap-3

"

>


<span className="font-semibold">

{comment.blog_posts.title}

</span>



<a

href={`/blog/${comment.blog_posts.slug}`}

target="_blank"

className="text-primary"

>

View

<ExternalLink size={14}/>

</a>



</div>


</div>



)

}






{

comment.replies && comment.replies.length > 0 && (


<CommentReplies

replies={comment.replies}

role={role}

currentUserId={currentUserId}

/>


)

}



</div>



)

}



</article>



)


}