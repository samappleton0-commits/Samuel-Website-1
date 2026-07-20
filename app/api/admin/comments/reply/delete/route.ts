// =====================================================
// DELETE COMMENT REPLY API
// app/api/admin/comments/reply/delete/route.ts
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

      replyId

    } = await request.json()






    if(!replyId){


      return NextResponse.json(

        {

          error:'Missing reply id'

        },

        {

          status:400

        }

      )


    }









    const supabase =

      await createClient()







    // ======================================
    // CHECK AUTH USER
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
    // CHECK ROLE
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

        parent_id,

        post_id,

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
    // ONLY REPLIES CAN BE DELETED HERE
    // ======================================


    if(!reply.parent_id){


      return NextResponse.json(

        {

          error:'Cannot delete main comments here.'

        },

        {

          status:400

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

            'You can only delete replies on your own posts.'

          },

          {

            status:403

          }

        )


      }


    }









    // ======================================
    // DELETE REPLY
    // ======================================


    const {

      error

    } = await supabase


      .from('comments')


      .delete()


      .eq(

        'id',

        replyId

      )








    if(error){


      console.error(

        'DELETE REPLY ERROR',

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

      'DELETE REPLY API ERROR',

      error

    )



    return NextResponse.json(

      {

        error:

        'Failed to delete reply'

      },

      {

        status:500

      }

    )


  }


}