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


import {
  createPublicClient,
} from '@/lib/supabase-public'


import {
  getRememberedVisitor,
  rememberVisitor,
} from '@/lib/comment-visitors'












// =====================================================
// GET CLIENT IP
// =====================================================


function getClientIp(request:Request){


  return (

    request.headers.get('x-forwarded-for')

    ??

    request.headers.get('x-real-ip')

    ??

    'unknown'

  )

}













// =====================================================
// POST CREATE COMMENT / REPLY
// =====================================================


export async function POST(

  request:Request

){


  try {


    const body = await request.json()






    const {

      postId,

      parentId,

      name,

      email,

      content

    } = body










    if(

      !postId ||

      !content?.trim()

    ){


      return NextResponse.json(

        {

          success:false,

          error:'Comment content is required.'

        },

        {

          status:400

        }

      )

    }









    // =====================================================
    // PUBLIC SUPABASE CLIENT
    // =====================================================


    const supabase = createPublicClient()











    let finalName = ''


    let finalEmail:string | null = null


    let userId:string | null = null











    const ipAddress = getClientIp(request)












    // =====================================================
    // ANONYMOUS VISITOR
    // =====================================================


    const visitor =

      await getRememberedVisitor()










    finalName =


      name?.trim()

      ??

      visitor?.name

      ??

      ''










    finalEmail =


      email?.trim()

      ??

      null










    if(!finalName){


      return NextResponse.json(

        {

          success:false,

          error:'Please provide your name.'

        },

        {

          status:400

        }

      )

    }









    // =====================================================
    // REMEMBER VISITOR
    // =====================================================


    await rememberVisitor({

      name:finalName,

      hashedIp:ipAddress

    })













    console.log(

      'API COMMENT DATA:',

      {

        postId,

        parentId,

        userId,

        ipAddress,

        finalName,

        finalEmail

      }

    )














    // =====================================================
    // CREATE COMMENT
    // =====================================================


    const comment =


      await createComment(

        supabase,

        {

          postId,


          parentId:

            parentId || null,


          userId,


          ipAddress,


          name:finalName,


          email:finalEmail,


          content,

        }

      )













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