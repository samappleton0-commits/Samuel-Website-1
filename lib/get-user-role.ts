'use server'

// ======================================================
// GET CURRENT USER ROLE + PROFILE
// lib/get-user-role.ts
// ======================================================

import { unstable_noStore as noStore } from 'next/cache'

import { createClient } from '@/lib/supabase-server'





export async function getUserRole(){


  // Prevent Next.js from caching user profile data
  noStore()



  const supabase = await createClient()





  // ======================================================
  // GET AUTH USER
  // ======================================================


  const {

    data:{
      user

    },

    error:userError

  } = await supabase.auth.getUser()





  if(userError || !user){


    console.error(

      'Authentication error:',

      userError

    )


    return null


  }







  // ======================================================
  // GET ADMIN PROFILE
  // ======================================================


  const {

    data:adminUser,

    error

  } = await supabase


    .from('admin_users')


    .select(`

      id,

      user_id,

      role,

      name,

      email,

      avatar_url

    `)


    .eq(

      'user_id',

      user.id

    )


    .maybeSingle()





  if(error){


    console.error(

      'Role lookup error:',

      error.message

    )


    return null


  }








  if(!adminUser){


    console.error(

      'No admin profile found for:',

      user.id

    )


    return null


  }







  console.log(

    'CURRENT ADMIN PROFILE:',

    adminUser

  )





  return adminUser



}