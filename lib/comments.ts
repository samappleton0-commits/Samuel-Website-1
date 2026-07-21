// =====================================================
// COMMENTS SERVICE
// lib/comments.ts
// =====================================================


import type {
  SupabaseClient,
} from '@supabase/supabase-js'


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


  ip_address:string | null


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

  ip_address,

  name,

  email,

  content,

  status,

  created_at

`










// =====================================================
// BUILD COMMENT TREE
// =====================================================


function buildCommentTree(

  comments:Comment[]

):Comment[]{


  const map = new Map<string,Comment>()



  comments.forEach(comment=>{


    map.set(

      comment.id,

      {

        ...comment,

        replies:[]

      }

    )


  })





  const roots:Comment[] = []





  comments.forEach(comment=>{


    const current =

      map.get(comment.id)





    if(!current){

      return

    }






    if(comment.parent_id){


      const parent =

        map.get(

          comment.parent_id

        )





      if(parent){


        parent.replies?.push(

          current

        )


      }


    }

    else {


      roots.push(

        current

      )


    }



  })




  return roots


}











// =====================================================
// GET APPROVED COMMENTS
// PUBLIC BLOG DISPLAY
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

      error

    )


    return []

  }








  return buildCommentTree(

    (data ?? []) as Comment[]

  )

}


// =====================================================
// CREATE COMMENT OR REPLY
// USED BY API ROUTE
// =====================================================


export async function createComment(


  supabase:SupabaseClient,


  {


    postId,


    parentId = null,


    userId = null,


    ipAddress = null,


    name,


    email = null,


    content,



  }:{




    postId:string


    parentId?:string | null


    userId?:string | null


    ipAddress?:string | null


    name:string


    email?:string | null


    content:string



  }



):Promise<Comment>{







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
  // ALLOWS REPLY TO REPLY
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


      userId,


      ipAddress,


      cleanName,


      cleanEmail,


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


      ip_address:ipAddress,


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

      '=========================='

    )


    console.error(

      'SUPABASE INSERT ERROR'

    )


    console.error(

      error

    )


    console.error(

      '=========================='

    )




    throw new Error(

      error.message

    )



  }









  return data as Comment



}