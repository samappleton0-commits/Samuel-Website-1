// =====================================================
// CREATE COMMENT API
// app/api/comment/route.ts
// =====================================================


import { NextResponse } from 'next/server'

import {
  createComment,
} from '@/lib/comments'





// =====================================================
// POST CREATE COMMENT / REPLY
// =====================================================


export async function POST(

  request:Request

){


  try {


    const body =

      await request.json()





    const {

      postId,

      parentId,

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
    // SAVE COMMENT / REPLY
    // =====================================================


    const comment =

      await createComment({

        postId,

        parentId:

          parentId || null,

        name,

        email,

        content

      })







    // =====================================================
    // RESPONSE
    // =====================================================


    return NextResponse.json(

      {

        success:true,

        comment,

        message:

          parentId

          ?

          'Reply submitted successfully'

          :

          'Comment submitted successfully'


      },

      {

        status:201

      }

    )





  }

  catch(error){



    console.error(

      'COMMENT API ERROR:',

      error

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