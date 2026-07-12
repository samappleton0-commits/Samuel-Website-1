import { createClient } from '@/lib/supabase-server'


export async function getUserRole() {

  const supabase = await createClient()


  const {
    data: {
      user,
    },
    error: userError,
  } = await supabase.auth.getUser()



  if (userError || !user) {

  console.log(
    'CURRENT USER:',
    user
  )

  console.log(
    'USER ERROR:',
    userError
  )

  return null

}


  const {
    data: adminUser,
    error,
  } = await supabase

    .from('admin_users')

    .select('role,name,email')

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
      'No role found for user:',
      user.id
    )

    return null

  }



  return adminUser

}