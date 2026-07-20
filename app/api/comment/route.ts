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
  createClient,
} from '@/lib/supabase-server'


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

    null

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
    // AUTHENTICATED USER CHECK
    // =====================================================


    const supabase = await createClient()





    const {

      data:{

        user

      }

    } = await supabase.auth.getUser()







    let finalName = ''

    let userId:string | null = null

    let finalEmail:string | null = null







    // =====================================================
    // LOGGED-IN USER
    // =====================================================


    if(user){



      userId = user.id


      finalEmail = user.email ?? null






      const {

        data:profile

      } = await supabase


        .from('admin_users')


        .select(`

          name

        `)


        .eq(

          'user_id',

          user.id

        )


        .maybeSingle()







      finalName =


        profile?.name


        ??

        user.email

        ??

        'User'



    }







    // =====================================================
    // ANONYMOUS VISITOR
    // =====================================================


    else {



      const visitor =

        await getRememberedVisitor()








      finalName =


        name?.trim()


        ??

        visitor?.name


        ??

        ''









      if(!finalName){



        return NextResponse.json(


          {


            success:false,


            error:

            'Please provide your name.'



          },


          {


            status:400


          }


        )


      }







      await rememberVisitor({


        name:finalName,


        hashedIp:getClientIp(request)



      })


    }









    // =====================================================
    // CREATE COMMENT
    // =====================================================


    const comment =

      await createComment({


        postId,


        parentId:

          parentId || null,


        userId,


        name:finalName,


        email:

          finalEmail,


        content,


      })









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