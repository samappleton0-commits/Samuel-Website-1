import { createPublicClient } from '@/lib/supabase-public'



// =====================================================
// TYPES
// =====================================================

export type Comment = {

  id:string

  post_id:string

  name:string

  email?:string | null

  content:string

  status:string

  created_at:string

}





// =====================================================
// GET APPROVED COMMENTS
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

    .select(

      `
      id,
      post_id,
      name,
      email,
      content,
      status,
      created_at
      `

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

        ascending:false

      }

    )





  if(error){

    console.error(
      'Get comments error:',
      error
    )

    return []

  }



  return data as Comment[]



}







// =====================================================
// CREATE COMMENT
// =====================================================

export async function createComment({

  postId,

  name,

  email,

  content,

}:{

  postId:string

  name:string

  email?:string

  content:string

}){



 const supabase =
  createPublicClient()





  const {

    error

  } = await supabase

    .from('comments')

    .insert({

      post_id:postId,

      name:name.trim(),

      email:
        email?.trim() || null,

      content:content.trim(),

      status:'pending'

    })





  if(error){

    console.error(

      'Create comment error:',

      error

    )


    throw error

  }



  return true


}