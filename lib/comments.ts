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

  name,

  email,

  content,

  status,

  created_at

`







// =====================================================
// GET APPROVED COMMENTS
// PUBLIC COMMENTS + REPLIES
// =====================================================


export async function getApprovedComments(

  postId:string

):Promise<Comment[]> {



  const supabase =

    createPublicClient()





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








  const commentMap =

    new Map<string,Comment>()








  comments.forEach(comment=>{


    commentMap.set(

      comment.id,

      {

        ...comment,

        replies:[]

      }

    )


  })







  const rootComments:Comment[] = []







  comments.forEach(comment=>{


    const current =

      commentMap.get(

        comment.id

      )





    if(!current){

      return

    }







    if(comment.parent_id){



      const parent =

        commentMap.get(

          comment.parent_id

        )





      if(parent){


        parent.replies!.push(

          current

        )


      }



    }

    else {


      rootComments.push(

        current

      )


    }


  })








  return rootComments



}









// =====================================================
// CREATE COMMENT OR REPLY
// =====================================================


export async function createComment({

  postId,

  parentId = null,

  name,

  email,

  content,


}:{

  postId:string

  parentId?:string | null

  name:string

  email?:string | null

  content:string


}):Promise<Comment>{







  const supabase =

    createPublicClient()







  // =====================================================
  // SANITIZE INPUT
  // =====================================================


  const cleanName =

    name

      ?.trim()

      .slice(0,100)





  const cleanEmail =

    email

      ?.trim()

      .toLowerCase()

      || null





  const cleanContent =

    content

      ?.trim()

      .slice(0,5000)









  // =====================================================
  // VALIDATION
  // =====================================================


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
  // CHECK REPLY PARENT
  // =====================================================


  if(parentId){



    const {

      data:parentComment,

      error:parentError


    } = await supabase


      .from('comments')


      .select('id')


      .eq(

        'id',

        parentId

      )


      .single()






    if(

      parentError ||

      !parentComment

    ){

      throw new Error(

        'Original comment not found.'

      )

    }


  }









  // =====================================================
  // STATUS WORKFLOW
  //
  // New comment:
  // pending approval
  //
  // Reply:
  // approved immediately
  //
  // =====================================================


  const status:CommentStatus =


    parentId


      ? 'approved'


      : 'pending'










  // =====================================================
  // INSERT
  //
  // IMPORTANT:
  // No .select()
  // because pending comments are
  // hidden by public SELECT RLS
  //
  // =====================================================


  const {

    error

  } = await supabase


    .from('comments')


    .insert({


      post_id:postId,


      parent_id:parentId || null,


      name:cleanName,


      email:cleanEmail,


      content:cleanContent,


      status,


    })







  if(error){



    console.error(

      'CREATE COMMENT ERROR',

      {

        message:error.message,

        code:error.code,

        details:error.details,

        hint:error.hint,

      }

    )




    throw new Error(

      error.message

    )


  }









  // =====================================================
  // RETURN LOCAL RESPONSE
  //
  // Cannot fetch pending comment
  // because anon SELECT only sees approved.
  //
  // =====================================================


  return {


    id:'',


    post_id:postId,


    parent_id:parentId || null,


    name:cleanName,


    email:cleanEmail,


    content:cleanContent,


    status,


    created_at:new Date().toISOString(),


  }



}