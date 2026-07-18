// =====================================================
// CREATE COMMENT API
// app/api/comment/route.ts
// =====================================================


import {
  NextResponse,
} from 'next/server'


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



    // =====================================================
    // READ REQUEST BODY
    // =====================================================


    const body =

      await request.json()







    const {


      postId,


      parentId,


      name,


      email,


      content



    } = body






    console.log(

      'COMMENT REQUEST:',

      {

        postId,

        parentId,

        name,

        email,

        content,

      }

    )









    // =====================================================
    // VALIDATION
    // =====================================================


    if(

      !postId ||

      !name?.trim() ||

      !content?.trim()

    ){



      return NextResponse.json(

        {

          success:false,

          error:

          'Name and comment are required.'

        },

        {

          status:400

        }

      )



    }









    if(

      content.trim().length < 3

    ){


      return NextResponse.json(

        {

          success:false,

          error:

          'Comment is too short.'

        },

        {

          status:400

        }

      )


    }









    if(

      content.trim().length > 5000

    ){


      return NextResponse.json(

        {

          success:false,

          error:

          'Comment is too long.'

        },

        {

          status:400

        }

      )


    }









    // =====================================================
    // CREATE COMMENT
    // =====================================================


    const comment =

      await createComment({

        postId,


        parentId:

          parentId || null,


        name,


        email,


        content,


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


          'Reply submitted successfully.'



          :



          'Comment submitted and waiting for approval.'



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


        success:false,


        error:


          error instanceof Error

          ?


          error.message



          :



          'Unable to submit comment.'



      },


      {


        status:500


      }



    )




  }


}