// =====================================================
// SERVER SUPABASE CLIENT
// lib/supabase-server.ts
// =====================================================

import {
  createServerClient,
} from '@supabase/ssr'


import {
  cookies,
} from 'next/headers'



export async function createClient(){


  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL


  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY





  if(!supabaseUrl){

    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL'
    )

  }





  if(!supabaseKey){

    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_ANON_KEY'
    )

  }





  const cookieStore =
    await cookies()





  return createServerClient(

    supabaseUrl,

    supabaseKey,

    {

      cookies:{

        async getAll(){

          return cookieStore.getAll()

        },



        async setAll(
          cookiesToSet
        ){

          try{

            cookiesToSet.forEach(
              ({
                name,
                value,
                options
              })=>{

                cookieStore.set(
                  name,
                  value,
                  options
                )

              }
            )


          }

          catch{

            // Server components
            // cannot always modify cookies

          }

        }

      }

    }

  )


}