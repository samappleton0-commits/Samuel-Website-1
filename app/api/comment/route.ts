import { NextResponse } from 'next/server'

import { createComment } from '@/lib/comments'



// =====================================================
// CREATE COMMENT API
// =====================================================

export async function POST(

  request: Request

) {


  try {


    const body = await request.json()



    const {

      postId,

      name,

      email,

      content

    } = body






    // =====================================================
    // VALIDATION
    // =====================================================


    if(

      !postId ||

      !name ||

      !content

    ){

      return NextResponse.json(

        {

          error:
          'Name and comment are required'

        },

        {

          status:400

        }

      )

    }







    // =====================================================
    // SAVE COMMENT
    // =====================================================


    await createComment({

      postId,

      name,

      email,

      content

    })







    return NextResponse.json(

      {

        success:true,

        message:
        'Comment submitted successfully'

      },

      {

        status:201

      }

    )





  }

 catch(error){



    console.error(

      'Comment API Error:',

      JSON.stringify(

        error,

        null,

        2

      )

    )



    return NextResponse.json(

      {

        error:
        'Unable to submit comment'

      },

      {

        status:500

      }

    )


  }


}