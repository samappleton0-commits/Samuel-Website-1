// =====================================================
// ADMIN COMMENT MANAGER
// components/admin/comments/CommentManager.tsx
// =====================================================


'use client'


import {
  useState,
} from 'react'


import CommentCard from './CommentCard'







// =====================================================
// TYPES
// =====================================================


type BlogPost = {


  title:string


  slug:string


  user_id:string


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


  comments:AdminComment[]


  role:

    | 'admin'

    | 'editor'

    | 'user'


  currentUserId:string | null



}











// =====================================================
// COMPONENT
// =====================================================


export default function CommentManager({

  comments,

  role,

  currentUserId,


}:Props){





  const [

    expandedComments,

    setExpandedComments

  ] = useState<Set<string>>(

    new Set()

  )









  function toggleComment(

    id:string

  ){



    setExpandedComments(

      previous=>{


        const updated =

          new Set(previous)





        if(updated.has(id)){


          updated.delete(id)


        }

        else{


          updated.add(id)


        }






        return updated


      }

    )


  }









  if(!comments.length){


    return (


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


        No comments found.


      </div>


    )


  }












  return (



<div

className="space-y-5"

>



{

comments.map(comment=>(



<CommentCard



key={comment.id}



comment={comment}



role={role}



currentUserId={currentUserId}



expanded={

expandedComments.has(

comment.id

)

}



onToggle={

()=>toggleComment(

comment.id

)

}



isReply={false}



/>



))

}







</div>



  )


}