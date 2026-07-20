// =====================================================
// ADMIN COMMENT REPLY API
// app/api/admin/comments/reply/route.ts
// =====================================================


import {
  NextResponse,
} from 'next/server'


import {
  createClient,
} from '@/lib/supabase-server'







export async function POST(

  request:Request

){



  try {



    const {

      commentId,

      content

    } = await request.json()







    if(

      !commentId ||

      !content?.trim()

    ){


      return NextResponse.json(

        {

          error:

          'Comment id and reply content are required.'

        },

        {

          status:400

        }

      )


    }









    const supabase =

      await createClient()









    // =====================================================
    // CHECK AUTH USER
    // =====================================================



    const {

      data:{

        user

      }

    } = await supabase.auth.getUser()






    if(!user){


      return NextResponse.json(

        {

          error:'Unauthorized'

        },

        {

          status:401

        }

      )


    }









    // =====================================================
    // GET USER ROLE
    // =====================================================



    const {

      data:profile,

      error:profileError


    } = await supabase


      .from('admin_users')


      .select(

        'name, role'

      )


      .eq(

        'user_id',

        user.id

      )


      .single()






    if(

      profileError ||

      !profile

    ){



      return NextResponse.json(

        {

          error:

          'Permission denied.'

        },

        {

          status:403

        }

      )


    }









    if(

      !['admin','editor']

        .includes(profile.role)

    ){



      return NextResponse.json(

        {

          error:

          'You cannot reply to comments.'

        },

        {

          status:403

        }

      )


    }









    // =====================================================
    // GET ORIGINAL COMMENT
    // =====================================================



    const {

      data:parentComment,

      error:commentError


    } = await supabase


      .from('comments')


      .select(

        `

        id,

        post_id

        `

      )


      .eq(

        'id',

        commentId

      )


      .single()








    if(

      commentError ||

      !parentComment

    ){



      return NextResponse.json(

        {

          error:

          'Original comment not found.'

        },

        {

          status:404

        }

      )


    }









    // =====================================================
    // EDITOR OWNERSHIP CHECK
    // =====================================================



    if(profile.role === 'editor'){





      const {

        data:post,

        error:postError


      } = await supabase


        .from('blog_posts')


        .select('user_id')


        .eq(

          'id',

          parentComment.post_id

        )


        .single()








      if(

        postError ||

        !post ||

        post.user_id !== user.id

      ){



        return NextResponse.json(

          {

            error:

            'You cannot reply to this post.'

          },

          {

            status:403

          }

        )


      }


    }









    // =====================================================
    // CREATE REPLY
    // =====================================================



    const {

      data:reply,

      error


    } = await supabase


      .from('comments')


      .insert({



        post_id:

        parentComment.post_id,



        parent_id:

        parentComment.id,



        name:

        profile.name,



        email:

        null,



        content:

        content.trim(),



        status:

        'approved'



      })


      .select()


      .single()









    if(error){


      console.error(

        'CREATE REPLY ERROR',

        error

      )


      throw error


    }









    return NextResponse.json(

      {

        success:true,

        reply

      }

    )





  }



  catch(error){



    console.error(

      'ADMIN REPLY ERROR',

      error

    )





    return NextResponse.json(

      {

        error:

        'Failed to create reply.'

      },

      {

        status:500

      }

    )



  }



}