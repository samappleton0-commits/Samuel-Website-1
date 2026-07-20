'use client'

import { useState } from 'react'

export default function CommentsList({

  comments,

  role,

}:{

  comments:any[]

  role:'admin' | 'editor' | 'user'

}){

  const [

    activeComment,

    setActiveComment

  ] = useState<string | null>(null)

  return (

    <div>

      {comments.map(comment=>(

        <div

          key={comment.id}

          onClick={()=>

            setActiveComment(

              activeComment === comment.id

                ? null

                : comment.id

            )

          }

          className="cursor-pointer"

        >

          {comment.name}

        </div>

      ))}

    </div>

  )

}