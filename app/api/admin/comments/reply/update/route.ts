// =====================================================
// UPDATE COMMENT REPLY API
// app/api/admin/comments/reply/update/route.ts
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

      replyId,

      content

    } = await request.json()






    if(

      !replyId ||

      !content?.trim()

    ){


      return NextResponse.json(

        {

          error:'Reply id and content are required.'

        },

        {

          status:400

        }

      )


    }







    const supabase =

      await createClient()







    // ======================================
    // AUTH USER
    // ======================================


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









    // ======================================
    // GET USER ROLE
    // ======================================


    const {

      data:profile

    } = await supabase


      .from('admin_users')


      .select(

        'role'

      )


      .eq(

        'user_id',

        user.id

      )


      .single()







    if(

      !profile ||

      ![

        'admin',

        'editor'

      ].includes(profile.role)

    ){


      return NextResponse.json(

        {

          error:'Forbidden'

        },

        {

          status:403

        }

      )


    }









    // ======================================
    // GET REPLY DETAILS
    // ======================================


    const {

      data:reply,

      error:replyError

    } = await supabase


      .from('comments')


      .select(

        `

        id,

        post_id,

        parent_id,

        blog_posts(

          user_id

        )

        `

      )


      .eq(

        'id',

        replyId

      )


      .single()







    if(

      replyError ||

      !reply

    ){


      return NextResponse.json(

        {

          error:'Reply not found'

        },

        {

          status:404

        }

      )


    }









    // ======================================
    // EDITOR OWNERSHIP CHECK
    // ======================================


    if(

      profile.role === 'editor'

    ){


      const post =

        Array.isArray(

          reply.blog_posts

        )

        ?

        reply.blog_posts[0]

        :

        reply.blog_posts





      if(

        !post ||

        post.user_id !== user.id

      ){


        return NextResponse.json(

          {

            error:

            'You can only edit replies on your own posts.'

          },

          {

            status:403

          }

        )


      }


    }









    // ======================================
    // UPDATE REPLY
    // ======================================


    const {

      error

    } = await supabase


      .from('comments')


      .update({

        content:

        content.trim()

      })


      .eq(

        'id',

        replyId

      )








    if(error){


      console.error(

        'UPDATE REPLY ERROR',

        error

      )


      throw error


    }








    return NextResponse.json({

      success:true

    })





  }



  catch(error){


    console.error(

      'UPDATE REPLY API ERROR',

      error

    )



    return NextResponse.json(

      {

        error:

        'Failed to update reply'

      },

      {

        status:500

      }

    )


  }


}