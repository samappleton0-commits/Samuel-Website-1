// =====================================================
// PUBLIC SUPABASE CLIENT
// lib/supabase-public.ts
// =====================================================

import {
  createClient,
} from '@supabase/supabase-js'



export function createPublicClient(){


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




  return createClient(

    supabaseUrl,

    supabaseKey

  )

}