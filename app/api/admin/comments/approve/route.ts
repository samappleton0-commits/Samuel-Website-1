import { NextResponse } from 'next/server'

import { createClient } from '@/lib/supabase-server'


export async function POST(
  request: Request
) {

  try {


    const {
      commentId
    } = await request.json()



    if(!commentId){

      return NextResponse.json(

        {
          error:'Missing comment id'
        },

        {
          status:400
        }

      )

    }



    const supabase =
      await createClient()



    // CHECK USER

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




    // CHECK ADMIN ROLE

    const {
      data:admin
    } = await supabase

      .from('admin_users')

      .select('role')

      .eq(
        'user_id',
        user.id
      )

      .single()



    if(
      !admin ||
      admin.role !== 'admin'
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




    // UPDATE COMMENT


    const {
      error
    } = await supabase

      .from('comments')

      .update({

        status:'approved'

      })

      .eq(

        'id',

        commentId

      )





    if(error){

      console.error(
        'Approve error:',
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
      'Approve API Error:',
      error
    )


    return NextResponse.json(

      {
        error:'Failed to approve comment'
      },

      {
        status:500
      }

    )

  }

}