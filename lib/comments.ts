// =====================================================
// COMMENTS SERVICE
// lib/comments.ts
// =====================================================


import { createPublicClient } from '@/lib/supabase-public'





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

  status:string

  created_at:string

  replies?:Comment[]

}









// =====================================================
// GET APPROVED COMMENTS WITH REPLIES
// =====================================================


export async function getApprovedComments(

  postId:string

){


  const supabase =
    createPublicClient()





  const {

    data,

    error

  } = await supabase


    .from('comments')


    .select(`

      id,

      post_id,

      parent_id,

      name,

      email,

      content,

      status,

      created_at

    `)


    .eq(

      'post_id',

      postId

    )


    // Show:
    // 1. Approved main comments
    // 2. Approved replies

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

      error

    )


    return []

  }





  const comments =

    (data ?? []) as Comment[]






  const commentMap =

    new Map<string,Comment>()






  comments.forEach(comment => {


    commentMap.set(

      comment.id,

      {

        ...comment,

        replies:[]

      }

    )


  })






  const rootComments:Comment[] = []






  comments.forEach(comment => {


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


        parent.replies?.push(

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
// CREATE COMMENT / REPLY
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


}){



  const supabase =

    createPublicClient()






  const {

    data,

    error

  } = await supabase


    .from('comments')


    .insert({



      post_id:postId,



      parent_id:parentId,



      name:name.trim(),



      email:

        email?.trim() || null,



      content:

        content.trim(),



      // Main comments wait for approval
      // Replies appear instantly

      status:

        parentId

        ? 'approved'

        : 'pending'



    })


    .select(`

      id,

      post_id,

      parent_id,

      name,

      email,

      content,

      status,

      created_at

    `)


    .single()








  if(error){


    console.error(

      'CREATE COMMENT ERROR:',

      error

    )


    throw error


  }







  return data



}