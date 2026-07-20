// =====================================================
// COMMENTS SERVICE
// lib/comments.ts
// =====================================================


import {
  createPublicClient,
} from '@/lib/supabase-public'





// =====================================================
// TYPES
// =====================================================


export type CommentStatus =

  | 'pending'

  | 'approved'

  | 'rejected'





export type Comment = {


  id:string


  post_id:string


  parent_id:string | null


  user_id:string | null


  name:string


  email:string | null


  content:string


  status:CommentStatus


  created_at:string


  replies?:Comment[]


}







// =====================================================
// DATABASE SELECT FIELDS
// =====================================================


const COMMENT_FIELDS = `

  id,

  post_id,

  parent_id,

  user_id,

  name,

  email,

  content,

  status,

  created_at

`










// =====================================================
// GET APPROVED COMMENTS
// ONLY ONE LEVEL REPLY DISPLAY
// =====================================================


export async function getApprovedComments(

  postId:string

):Promise<Comment[]> {


  const supabase = createPublicClient()






  const {

    data,

    error

  } = await supabase


    .from('comments')


    .select(

      COMMENT_FIELDS

    )


    .eq(

      'post_id',

      postId

    )


    .eq(

      'status',

      'approved'

    )


    .order(

      'created_at',

      {

        ascending:true

      }

    )







  if(error){


    console.error(

      'GET COMMENTS ERROR:',

      error.message

    )


    return []


  }







  const comments =

    (data ?? []) as Comment







  // =====================================================
  // ONLY MAIN COMMENTS
  // =====================================================


  const mainComments = comments.filter(

    comment =>

      comment.parent_id === null

  )







  // =====================================================
  // ATTACH DIRECT REPLIES ONLY
  // =====================================================


  return mainComments.map(comment => ({


    ...comment,


    replies:

      comments.filter(reply =>

        reply.parent_id === comment.id

      )


  }))





}






// =====================================================
// CREATE COMMENT OR REPLY
// =====================================================


export async function createComment({


  postId,


  parentId = null,


  userId = null,


  name,


  email,


  content,



}:{


  postId:string


  parentId?:string | null


  userId?:string | null


  name:string


  email?:string | null


  content:string


}):Promise<Comment>{





  const supabase = createPublicClient()







  const cleanName =

    name

      .trim()

      .slice(0,100)







  const cleanEmail =

    email

      ?.trim()

      .toLowerCase()

      || null







  const cleanContent =

    content

      .trim()

      .slice(0,5000)









  if(


    !postId ||


    !cleanName ||


    !cleanContent


  ){


    throw new Error(

      'Name and comment are required.'

    )


  }








  // =====================================================
  // CHECK REPLY TARGET
  // ONLY MAIN COMMENTS ACCEPT REPLIES
  // =====================================================


  if(parentId){



    const {


      data:parentComment,


      error



    } = await supabase


      .from('comments')


      .select(`

        id,

        parent_id

      `)


      .eq(

        'id',

        parentId

      )


      .single()







    if(error || !parentComment){


      throw new Error(

        'Original comment not found.'

      )


    }








    // =====================================================
    // BLOCK REPLY TO REPLY
    // =====================================================


    if(parentComment.parent_id){


      throw new Error(

        'Replies can only be made to main comments.'

      )


    }




  }









  const status:CommentStatus =


    parentId


    ?


    'approved'


    :


    'pending'







  console.log(

    'INSERTING COMMENT:',

    {

      postId,

      parentId,

      cleanName,

      cleanEmail,

      cleanContent,

      status

    }

  )










  const {


    data,


    error



  } = await supabase


    .from('comments')


    .insert({



      post_id:postId,


      parent_id:parentId,


      user_id:userId,


      name:cleanName,


      email:cleanEmail,


      content:cleanContent,


      status,



    })


    .select(

      COMMENT_FIELDS

    )


    .single()











  if(error){



    console.error(

      'CREATE COMMENT ERROR',

      error

    )



    throw new Error(

      error.message

    )



  }








  return data as Comment




}






// =====================================================
// END OF COMMENTS SERVICE
// =====================================================