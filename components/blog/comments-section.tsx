'use client'



import {

  useState,

} from 'react'



import {


  MessageCircle,

  Send,

  User,

  Reply,

  X,

  ChevronDown,

  ChevronUp,


} from 'lucide-react'







// =====================================================
// TYPES
// =====================================================


export type Comment = {


  id:string


  post_id:string


  parent_id:string | null


  name:string


  email:string | null


  content:string


  status:

    | 'pending'

    | 'approved'

    | 'rejected'


  created_at:string


  replies?:Comment[]


}









type Props = {


  postId:string


  initialComments:Comment[]


}

// =====================================================
// COMPONENT
// =====================================================


export default function CommentsSection({

  postId,

  initialComments,


}:Props){





  const [

    comments,

    setComments

  ] = useState<Comment[]>(

    initialComments

  )







  const [

    name,

    setName

  ] = useState('')






  const [

    email,

    setEmail

  ] = useState('')







  const [

    content,

    setContent

  ] = useState('')







  const [

    replyContent,

    setReplyContent

  ] = useState('')








  const [

    replyingTo,

    setReplyingTo

  ] = useState<string | null>(null)







  const [

    loading,

    setLoading

  ] = useState(false)







  const [

    message,

    setMessage

  ] = useState('')







  const [

    expandedReplies,

    setExpandedReplies

  ] = useState<Record<string,boolean>>({})












// =====================================================
// SUBMIT COMMENT / REPLY
// =====================================================


async function submitComment(

  parentId:string | null = null

){



  const text =

    parentId

    ? replyContent

    : content







  if(!name.trim()){


    setMessage(

      'Please enter your name.'

    )


    return

  }









  if(!text.trim()){


    setMessage(

      'Please enter a comment.'

    )


    return

  }









  try{



    setLoading(true)

    setMessage('')







    const response =

      await fetch(

        '/api/comment',

        {


          method:'POST',


          headers:{


            'Content-Type':

              'application/json'


          },


          body:JSON.stringify({


            postId,


            parentId,


            name,


            email,


            content:text


          })


        }


      )









    const result =

      await response.json()











    if(!response.ok){


      throw new Error(

        result.error ??

        'Unable to submit comment.'

      )


    }









    const newComment =

      result.comment as Comment










    // =====================================================
    // IMPORTANT
    //
    // Main comments are pending
    // They should NOT appear instantly
    //
    // Replies are approved
    // They can appear immediately
    //
    // =====================================================




    if(parentId){



      addReply(

        parentId,

        newComment

      )



      setReplyContent('')



    }

    else {



      // Do not add pending comment
      // to public list



      setContent('')



    }








    setReplyingTo(null)









    setMessage(


      parentId


      ?


      'Reply posted successfully.'



      :



      'Comment submitted. Waiting for admin approval.'



    )







  }

  catch(error){



    console.error(

      error

    )




    setMessage(

      error instanceof Error

      ? error.message

      : 'Something went wrong.'

    )




  }

  finally{


    setLoading(false)


  }



}











// =====================================================
// ADD REPLY LOCALLY
// =====================================================


function addReply(

  parentId:string,

  reply:Comment

){


  setComments(prev =>


    prev.map(comment=>{



      if(comment.id === parentId){


        return {


          ...comment,


          replies:[


            ...(comment.replies ?? []),

            reply


          ]

        }


      }




      return {


        ...comment,


        replies:

          comment.replies

          ?

          addNestedReply(

            comment.replies,

            parentId,

            reply

          )

          :

          []


      }


    })


  )


}









function addNestedReply(

  comments:Comment[],

  parentId:string,

  reply:Comment

):Comment[]{



  return comments.map(comment=>{


    if(comment.id === parentId){


      return {


        ...comment,


        replies:[


          ...(comment.replies ?? []),

          reply


        ]

      }


    }



    return {


      ...comment,


      replies:

        comment.replies

        ?

        addNestedReply(

          comment.replies,

          parentId,

          reply

        )

        :

        []


    }



  })


}

// =====================================================
// DATE FORMAT
// =====================================================


function formatDate(

  date:string

){


  return new Date(date)

    .toLocaleDateString(

      'en-GB',

      {


        day:'numeric',


        month:'long',


        year:'numeric'


      }


    )


}











// =====================================================
// TOGGLE REPLIES
// =====================================================


function toggleReplies(

  id:string

){


  setExpandedReplies(prev => ({


    ...prev,


    [id]:

      !prev[id]


  }))


}











// =====================================================
// RENDER
// =====================================================


return (


<section

className="space-y-8"

>




{/* =====================================================
    HEADER
===================================================== */}


<div

className="

flex

items-center

gap-3

"

>


<MessageCircle

size={26}

className="text-primary"

/>



<div>


<h2

className="

text-2xl

font-black

"

>

Comments ({comments.length})

</h2>



<p

className="

text-sm

text-muted-foreground

"

>

Join the discussion below.

</p>


</div>


</div>









{/* =====================================================
    COMMENT FORM
===================================================== */}



<div

className="

rounded-3xl

border

border-surface-border

bg-card

p-6

"

>


<div

className="

grid

gap-4

md:grid-cols-2

"

>


<input


value={name}


onChange={(e)=>

setName(e.target.value)

}


placeholder="Your name"


className="

rounded-xl

border

border-surface-border

bg-background

px-4

py-3

outline-none

focus:border-primary

"

/>






<input


value={email}


onChange={(e)=>

setEmail(e.target.value)

}


placeholder="Email (optional)"


className="

rounded-xl

border

border-surface-border

bg-background

px-4

py-3

outline-none

focus:border-primary

"

/>



</div>









<textarea


value={content}


onChange={(e)=>

setContent(e.target.value)

}


rows={5}


placeholder="Write your comment..."


className="

mt-4

w-full

rounded-xl

border

border-surface-border

bg-background

px-4

py-3

outline-none

focus:border-primary

"

/>










<button


onClick={()=>


submitComment(null)


}


disabled={loading}


className="

mt-4

inline-flex

items-center

gap-2

rounded-full

bg-primary

px-6

py-3

font-semibold

text-white

transition

hover:opacity-90

disabled:opacity-50

"

>


<Send size={16}/>



{


loading

?

'Sending...'

:

'Post Comment'


}



</button>









{

message && (


<p

className="

mt-3

text-sm

text-muted-foreground

"

>


{message}


</p>


)

}



</div>









{/* =====================================================
    COMMENTS LIST
===================================================== */}



<div

className="space-y-6"

>


{


comments.length === 0


?


(



<div

className="

rounded-3xl

border

border-dashed

p-10

text-center

"

>


<MessageCircle

size={34}

className="

mx-auto

mb-4

text-muted-foreground

"

/>



<h3

className="font-bold"

>

No comments yet

</h3>



<p

className="

mt-2

text-sm

text-muted-foreground

"

>

Be the first to start the conversation.

</p>



</div>


)



:



comments.map(comment=>(



<CommentItem


key={comment.id}


comment={comment}


replyingTo={replyingTo}


setReplyingTo={setReplyingTo}


replyContent={replyContent}


setReplyContent={setReplyContent}


submitComment={submitComment}


loading={loading}


formatDate={formatDate}


expandedReplies={expandedReplies}


toggleReplies={toggleReplies}


/>



))



}



</div>








</section>


)


}

// =====================================================
// COMMENT ITEM TYPES
// =====================================================


type CommentItemProps = {


  comment:Comment


  replyingTo:string | null


  setReplyingTo:(

    id:string | null

  )=>void



  replyContent:string



  setReplyContent:(

    value:string

  )=>void



  submitComment:(

    parentId:string | null

  )=>Promise<void>



  loading:boolean



  formatDate:(

    date:string

  )=>string



  expandedReplies:Record<string,boolean>



  toggleReplies:(

    id:string

  )=>void


}












// =====================================================
// COMMENT ITEM
// =====================================================


function CommentItem({

  comment,

  replyingTo,

  setReplyingTo,

  replyContent,

  setReplyContent,

  submitComment,

  loading,

  formatDate,

  expandedReplies,

  toggleReplies,


}:CommentItemProps){



return (



<article

className="

rounded-2xl

border

border-surface-border

bg-card

p-5

"

>





<div

className="

flex

items-start

gap-4

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

font-bold

text-primary

"

>


{


comment.name?.trim()


?


comment.name

.trim()

.charAt(0)

.toUpperCase()



:

<User size={18}/>


}



</div>









<div

className="flex-1"

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

className="font-bold"

>

{comment.name}

</h3>





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

mt-3

leading-7

text-muted-foreground

"

>

{comment.content}

</p>









{/* =====================================================
    REPLY BUTTON
===================================================== */}



<button


onClick={()=>{


setReplyingTo(


replyingTo === comment.id


?

null


:


comment.id


)



setReplyContent('')


}}



className="

mt-4

inline-flex

items-center

gap-2

text-sm

font-medium

text-primary

hover:underline

"

>


<Reply size={15}/>


Reply


</button>













{/* =====================================================
    REPLY FORM
===================================================== */}



{


replyingTo === comment.id && (



<div

className="

mt-4

rounded-xl

border

border-surface-border

bg-muted/30

p-4

"

>



<textarea


value={replyContent}


onChange={(e)=>

setReplyContent(

e.target.value

)

}


rows={3}


placeholder={

`Reply to ${comment.name}...`

}



className="

w-full

rounded-xl

border

border-surface-border

bg-background

px-4

py-3

outline-none

focus:border-primary

"

/>








<div

className="

mt-3

flex

flex-wrap

gap-3

"

>





<button


onClick={()=>


submitComment(comment.id)


}


disabled={loading}



className="

inline-flex

items-center

gap-2

rounded-full

bg-primary

px-5

py-2

text-white

disabled:opacity-50

"

>


<Send size={15}/>



{


loading

?

'Sending...'

:

'Reply'


}



</button>









<button


onClick={()=>{


setReplyingTo(null)


setReplyContent('')


}}



className="

inline-flex

items-center

gap-2

rounded-full

border

px-5

py-2

"

>


<X size={15}/>


Cancel


</button>





</div>



</div>



)

}












{/* =====================================================
    REPLIES TOGGLE
===================================================== */}



{


comment.replies &&

comment.replies.length > 0 && (



<button


onClick={()=>


toggleReplies(comment.id)


}



className="

mt-5

inline-flex

items-center

gap-2

text-sm

font-medium

text-primary

"

>


{


expandedReplies[comment.id]


?


<ChevronUp size={16}/>



:



<ChevronDown size={16}/>



}



{


expandedReplies[comment.id]


?


'Hide replies'



:



`View ${comment.replies.length} repl${

comment.replies.length > 1

?

'ies'

:

'y'

}`



}



</button>



)

}













{/* =====================================================
    NESTED REPLIES
===================================================== */}



{


expandedReplies[comment.id]


&&


comment.replies


&&

(



<div

className="

mt-6

ml-4

space-y-4

border-l

border-surface-border

pl-5

sm:ml-6

sm:pl-6

"

>



{


comment.replies.map(reply=>(



<CommentItem


key={reply.id}


comment={reply}


replyingTo={replyingTo}


setReplyingTo={setReplyingTo}


replyContent={replyContent}


setReplyContent={setReplyContent}


submitComment={submitComment}


loading={loading}


formatDate={formatDate}


expandedReplies={expandedReplies}


toggleReplies={toggleReplies}


/>



))


}



</div>



)



}








</div>


</div>


</article>



)



}