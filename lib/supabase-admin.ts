// =====================================================
// SUPABASE ADMIN CLIENT
// lib/supabase-admin.ts
// =====================================================


import {
  createClient,
} from '@supabase/supabase-js'





function createSupabaseAdmin(){


  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL



  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY





  if(!supabaseUrl){

    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL'
    )

  }





  if(!serviceRoleKey){

    throw new Error(
      'Missing SUPABASE_SERVICE_ROLE_KEY'
    )

  }







  return createClient(

    supabaseUrl,

    serviceRoleKey,

    {

      auth:{

        autoRefreshToken:false,

        persistSession:false,

      }

    }

  )


}









// New safe function
export function getSupabaseAdmin(){


  return createSupabaseAdmin()


}







// Backward compatibility
// Allows existing files to keep:
// import { supabaseAdmin } from '@/lib/supabase-admin'


export const supabaseAdmin =
  createSupabaseAdmin()