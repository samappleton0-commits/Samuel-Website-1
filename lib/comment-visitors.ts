// =====================================================
// COMMENT VISITOR SERVICE
// lib/comment-visitors.ts
// =====================================================


import {
  cookies,
} from 'next/headers'


import {
  randomUUID,
} from 'crypto'


import {
  getSupabaseAdmin,
} from '@/lib/supabase-admin'







// =====================================================
// CONSTANTS
// =====================================================


const COOKIE_NAME =
  'comment_visitor_token'





const COOKIE_OPTIONS = {

  httpOnly:true,

  secure:
    process.env.NODE_ENV === 'production',

  sameSite:
    'lax' as const,

  maxAge:
    60 * 60 * 24 * 365,

  path:'/'

}









// =====================================================
// GET VISITOR TOKEN
// =====================================================


export async function getVisitorToken(){


  const cookieStore =
    await cookies()



  return (

    cookieStore

      .get(COOKIE_NAME)

      ?.value

      ??

      null

  )


}









// =====================================================
// GET REMEMBERED VISITOR
// =====================================================


export async function getRememberedVisitor(){


  const token =
    await getVisitorToken()





  if(!token){

    return null

  }





  const supabaseAdmin =
    getSupabaseAdmin()





  const {

    data,

    error

  } = await supabaseAdmin


    .from('comment_visitors')


    .select(`

      id,

      name,

      visitor_token,

      created_at,

      updated_at

    `)


    .eq(

      'visitor_token',

      token

    )


    .maybeSingle()





  if(error){


    console.error(

      'GET VISITOR ERROR:',

      error.message

    )


    return null


  }





  return data ?? null


}











// =====================================================
// REMEMBER OR UPDATE VISITOR
// =====================================================


export async function rememberVisitor({


  name,


  hashedIp = null,


}:{

  name:string

  hashedIp?:string | null


}){





  const cleanName =

    name

      .trim()

      .slice(0,100)





  if(!cleanName){


    throw new Error(

      'Visitor name is required.'

    )


  }







  const supabaseAdmin =
    getSupabaseAdmin()





  const cookieStore =
    await cookies()





  let token =

    cookieStore

      .get(COOKIE_NAME)

      ?.value







  if(!token){



    token =
      randomUUID()





    cookieStore.set(

      COOKIE_NAME,

      token,

      COOKIE_OPTIONS

    )


  }









  const {

    data:existing,

    error:findError


  } = await supabaseAdmin


    .from('comment_visitors')


    .select('id')


    .eq(

      'visitor_token',

      token

    )


    .maybeSingle()







  if(findError){


    console.error(

      'VISITOR LOOKUP ERROR:',

      findError.message

    )


  }









  if(existing){





    const {

      error:updateError

    } = await supabaseAdmin


      .from('comment_visitors')


      .update({


        name:cleanName,


        hashed_ip:hashedIp,


        updated_at:

          new Date()

          .toISOString()


      })


      .eq(

        'visitor_token',

        token

      )







    if(updateError){


      console.error(

        'VISITOR UPDATE ERROR:',

        updateError.message

      )


    }





  }


  else {





    const {

      error:insertError

    } = await supabaseAdmin


      .from('comment_visitors')


      .insert({


        visitor_token:token,


        name:cleanName,


        hashed_ip:hashedIp


      })








    if(insertError){


      console.error(

        'VISITOR INSERT ERROR:',

        insertError.message

      )


    }



  }








  return {


    token,


    name:cleanName


  }



}