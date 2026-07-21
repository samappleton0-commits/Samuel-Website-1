// =====================================================
// ADMIN COMMENT REPLIES
// components/admin/comments/CommentReplies.tsx
// =====================================================


'use client'


import CommentCard from './CommentCard'







// =====================================================
// TYPES
// =====================================================


type AdminComment = {


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


  replies?:AdminComment[]


}









type Props = {


  replies:AdminComment[]


  role:

    | 'admin'

    | 'editor'

    | 'user'


  currentUserId:string | null


  depth?:number


}









// =====================================================
// COMPONENT
// =====================================================


export default function CommentReplies({

  replies,

  role,

  currentUserId,

  depth = 1,

}:Props){





  if(!replies || replies.length === 0){


    return null


  }









  return (


<div


className={`

mt-5

space-y-4

border-l

border-surface-border

${

depth === 1

?

'ml-2 pl-4 md:ml-6 md:pl-6'

:

'ml-2 pl-3 md:ml-4 md:pl-5'

}

`}


>



{


replies.map(reply=>(



<div

key={reply.id}

>



<CommentCard


comment={reply}


role={role}


currentUserId={currentUserId}


expanded={false}


onToggle={()=>{}}


isReply={true}


/>









{

reply.replies &&

reply.replies.length > 0 && (


<CommentReplies


replies={reply.replies}


role={role}


currentUserId={currentUserId}


depth={depth + 1}


/>


)

}



</div>



))


}




</div>



  )


}