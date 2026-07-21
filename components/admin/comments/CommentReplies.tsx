// =====================================================
// ADMIN COMMENT REPLIES
// components/admin/comments/CommentReplies.tsx
// =====================================================

'use client'


import {
  useState,
} from 'react'


import CommentCard from './CommentCard'







// =====================================================
// TYPES
// =====================================================


type AdminComment = {


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



  replies?:AdminComment[]


}







type Props = {


  replies:AdminComment[]


  role:

    | 'admin'
    | 'editor'
    | 'user'


  depth?:number


}









// =====================================================
// COMPONENT
// =====================================================


export default function CommentReplies({


  replies,


  role,


  depth = 1,


}:Props){





  const [expandedReplies,setExpandedReplies] =

    useState<Record<string,boolean>>({})







  function toggleReply(id:string){


    setExpandedReplies(prev => ({


      ...prev,


      [id]:

        !prev[id]


    }))


  }








  if(!replies || replies.length === 0){


    return null


  }









  return (



    <div


    className={`
  mt-5
  max-w-full
  space-y-4
  overflow-hidden
  border-l
  border-surface-border
  ${
    depth === 1
      ? 'pl-3 md:pl-5'
      : 'pl-2 md:pl-3'
  }
`}


    >





      {

      replies.map(reply => (



        <div


          key={reply.id}


          className="
            max-w-full
            overflow-hidden
          "


        >






          <CommentCard


            comment={reply}


            role={role}


            expanded={

              expandedReplies[reply.id]

              ??

              false

            }


            onToggle={()=>


              toggleReply(reply.id)


            }


          />








          {/* 
             Only allow second level display.
             Prevents endless width expansion.
          */}



         {
reply.replies &&

reply.replies.length > 0 && (


  <CommentReplies

    replies={reply.replies}

    role={role}

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