// =====================================================
// COMMENTS SECTION
// components/comments-section.tsx
// PART 1/4
// =====================================================


'use client'


import {
  useEffect,
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

  Edit3,

} from 'lucide-react'







// =====================================================
// TYPES
// =====================================================


export type Comment = {


  id:string


  post_id:string


  parent_id:string | null


  user_id:string | null


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








type CommentsSectionProps = {


  postId:string


  initialComments:Comment[]


}









// =====================================================
// MAIN COMPONENT
// =====================================================


export default function CommentsSection({

  postId,

  initialComments,

}:CommentsSectionProps){







const [

  comments,

  setComments

] = useState<Comment[]>(

  initialComments

)







// =====================================================
// VISITOR STATE
// =====================================================


const [

  visitorName,

  setVisitorName

] = useState('')




const [

  visitorLoaded,

  setVisitorLoaded

] = useState(false)





const [

  showNameInput,

  setShowNameInput

] = useState(true)








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








// =====================================================
// REPLY STATE
// =====================================================


const [

  replyContents,

  setReplyContents

] = useState<Record<string,string>>({})





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
// LOAD VISITOR NAME
// =====================================================


useEffect(()=>{


async function loadVisitor(){


try{


const response = await fetch(

  '/api/comment/visitor'

)



const result = await response.json()





if(result.visitor?.name){


setVisitorName(

  result.visitor.name

)


setShowNameInput(false)


}



}


catch(error){


console.error(

  'VISITOR LOAD ERROR:',

  error

)


}



finally{


setVisitorLoaded(true)


}



}



loadVisitor()



},[])









// =====================================================
// DISPLAY NAME
// =====================================================


function getDisplayName(){


return (

  visitorName ||

  name.trim()

)


}









// =====================================================
// UPDATE REPLY TEXT
// =====================================================


function updateReplyContent(

  commentId:string,

  value:string

){


setReplyContents(prev=>({


  ...prev,


  [commentId]:value


}))



}









// =====================================================
// SUBMIT COMMENT / REPLY
// =====================================================


async function submitComment(

  parentId:string | null = null

){


const text = parentId

?

replyContents[parentId] || ''

:

content







const displayName = getDisplayName()







if(!displayName){


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







const response = await fetch(

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


name:displayName,


email,


content:text



})


}


)








const result = await response.json()





if(!response.ok){


throw new Error(

result.error ||

'Unable to submit comment.'

)


}







const newComment = result.comment as Comment







setVisitorName(displayName)

setShowNameInput(false)







if(parentId){


addReply(

parentId,

newComment

)


setReplyContents(prev=>({


...prev,


[parentId]:''


}))



}

else{


setContent('')


}








setReplyingTo(null)






setMessage(

parentId

?

'Reply posted successfully.'

:

'Comment submitted and waiting for approval.'

)



}



catch(error){


console.error(

'COMMENT ERROR:',

error

)



setMessage(

error instanceof Error

?

error.message

:

'Something went wrong.'

)


}



finally{


setLoading(false)


}



}









// =====================================================
// END OF PART 1
// =====================================================

// =====================================================
// PART 2/4
// COMMENT FUNCTIONS
// =====================================================







// =====================================================
// CHANGE NAME
// =====================================================


function changeName(){


setShowNameInput(true)

setName('')


}









// =====================================================
// ADD REPLY LOCALLY
// =====================================================


function addReply(

parentId:string,

reply:Comment

){



setComments(prev=>

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











// =====================================================
// ADD NESTED REPLY
// =====================================================


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
// FORMAT DATE
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


setExpandedReplies(prev=>({


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

className="flex items-center gap-3"

>


<MessageCircle

size={26}

className="text-primary"

/>



<div>


<h2

className="text-2xl font-black"

>

Comments ({comments.length})

</h2>



<p

className="text-sm text-muted-foreground"

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
p-4
sm:p-6
"

>





{

visitorLoaded && !showNameInput && (


<div

className="mb-4 flex items-center justify-between rounded-xl bg-muted/40 p-4"

>


<div>


<p

className="text-sm text-muted-foreground"

>

Commenting as

</p>


<p

className="font-bold"

>

{visitorName}

</p>


</div>







<button

onClick={changeName}

className="flex items-center gap-2 text-sm text-primary"

>

<Edit3 size={15}/>

Change name

</button>




</div>



)

}









{

showNameInput && (


<div
className="
grid
gap-4
sm:grid-cols-2
"

>


<input


value={name}


onChange={(e)=>

setName(e.target.value)

}


placeholder="Your name"


className="rounded-xl border px-4 py-3"


/>






<input


value={email}


onChange={(e)=>

setEmail(e.target.value)

}


placeholder="Email (optional)"


className="rounded-xl border px-4 py-3"


/>



</div>



)

}










<textarea


value={content}


onChange={(e)=>

setContent(e.target.value)

}


rows={5}


placeholder="Write your comment..."


className="mt-4 w-full rounded-xl border px-4 py-3"



/>







<button


onClick={()=>submitComment(null)}


disabled={loading}


className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-white disabled:opacity-50"

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

className="mt-3 text-sm text-muted-foreground"

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


<div

className="rounded-3xl border border-dashed p-10 text-center"

>


<MessageCircle

size={34}

className="mx-auto mb-4 text-muted-foreground"

/>



<h3

className="font-bold"

>

No comments yet

</h3>




<p

className="mt-2 text-sm text-muted-foreground"

>

Be the first to start the conversation.

</p>



</div>


:


comments.map(comment=>(


<CommentItem

key={comment.id}


comment={comment}


replyingTo={replyingTo}


setReplyingTo={setReplyingTo}


replyContents={replyContents}


updateReplyContent={updateReplyContent}


setReplyContents={setReplyContents}


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
// COMMENT ITEM PROPS
// =====================================================


type CommentItemProps = {


comment:Comment



replyingTo:string | null



setReplyingTo:(

id:string | null

)=>void





replyContents:Record<string,string>



setReplyContents:(

value:Record<string,string>

)=>void





updateReplyContent:(

commentId:string,

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
// END OF PART 3
// =====================================================

// =====================================================
// PART 4/4
// COMMENT ITEM + REPLY SYSTEM
// =====================================================



function CommentItem({

comment,

replyingTo,

setReplyingTo,

replyContents,

setReplyContents,

updateReplyContent,

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
bg-card
p-4
sm:p-5
overflow-hidden
"

>



<div

className="
flex
items-start
gap-3
sm:gap-4
"

>





{/* AVATAR */}

<div
className="
flex
h-9
w-9
sm:h-11
sm:w-11
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

comment.name

?

comment.name.trim().charAt(0).toUpperCase()

:

<User size={18}/>


}



</div>








<div

className="flex-1"

>






<div

className="flex flex-wrap items-center gap-3"

>


<h3

className="font-bold"

>

{comment.name}

</h3>



<span

className="text-xs text-muted-foreground"

>

{formatDate(comment.created_at)}

</span>



</div>








<p

className="mt-3 leading-7 text-muted-foreground"

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



setReplyContents({

...replyContents,


[comment.id]:''


})



}}



className="mt-4 inline-flex items-center gap-2 text-sm text-primary"

>


<Reply size={15}/>


Reply


</button>













{/* =====================================================
REPLY BOX
===================================================== */}



{

replyingTo === comment.id && (



<div

className="mt-4 rounded-xl border bg-muted/30 p-4"

>



<textarea


value={

replyContents[comment.id] || ''

}



onChange={(e)=>

updateReplyContent(

comment.id,

e.target.value

)

}


rows={4}


placeholder={`Reply to ${comment.name}...`}



className="w-full rounded-xl border bg-background px-4 py-3"



/>







<div

className="
mt-3
flex
flex-col
gap-3
sm:flex-row
"

>


<button


onClick={()=>submitComment(comment.id)}


disabled={loading}


className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-white disabled:opacity-50"

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


setReplyContents({

...replyContents,


[comment.id]:''


})


}}



className="inline-flex items-center gap-2 rounded-full border px-5 py-2"

>


<X size={15}/>


Cancel


</button>





</div>





</div>


)

}













{/* =====================================================
SHOW REPLIES BUTTON
===================================================== */}



{

comment.replies && comment.replies.length > 0 && (


<button

onClick={()=>toggleReplies(comment.id)}

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

<>

<ChevronUp size={16}/>

Hide replies

</>


:

<>

<ChevronDown size={16}/>

View {comment.replies.length} repl{comment.replies.length > 1 ? 'ies' : 'y'}

</>


}


</button>


)

}



{/* =====================================================
REPLIES DISPLAY
===================================================== */}


{

expandedReplies[comment.id] &&

comment.replies &&

comment.replies.length > 0 && (


<div

className="
mt-5
space-y-3
rounded-xl
bg-muted/30
p-4
"

>


<p

className="
text-sm
font-semibold
text-muted-foreground
"

>

Replies

</p>



{

comment.replies.map(reply=>(


<div

key={reply.id}

className="
rounded-xl
border
bg-background
p-4
"

>


<div

className="
flex
items-center
gap-3
"

>


<div

className="
flex
h-8
w-8
items-center
justify-center
rounded-full
bg-primary/10
font-bold
text-primary
"

>

{reply.name.charAt(0).toUpperCase()}

</div>



<div>

<p className="font-semibold">

{reply.name}

</p>


<p className="text-xs text-muted-foreground">

{formatDate(reply.created_at)}

</p>

</div>


</div>



<p

className="
mt-3
text-sm
leading-6
text-muted-foreground
"

>

{reply.content}

</p>


</div>


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







// =====================================================
// END OF PART 4
// END OF FILE
// =====================================================