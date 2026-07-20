import { createClient } from '@supabase/supabase-js'


export function createPublicClient(){


  const client = createClient(

    process.env.NEXT_PUBLIC_SUPABASE_URL!,

    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  )


  console.log(
    'SUPABASE PUBLIC CLIENT CREATED'
  )


  return client

}