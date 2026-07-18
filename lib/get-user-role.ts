import { createClient } from '@/lib/supabase-server'



export async function getUserRole() {


  try {


    const supabase = await createClient()



    /*
    =====================================================
    GET AUTHENTICATED USER
    =====================================================
    */


    const {

      data: {
        user

      },

      error: userError

    } = await supabase.auth.getUser()





    if (

      userError ||

      !user

    ) {

      return null

    }





    /*
    =====================================================
    GET USER PROFILE
    =====================================================
    */


    const {

      data: profile,

      error: profileError

    } = await supabase

      .from('admin_users')

      .select(`

        id,

        user_id,

        name,

        email,

        role,

        avatar_url,

        must_change_password,

        created_at

      `)

      .eq(

        'user_id',

        user.id

      )

      .single()





    if (profileError || !profile) {


      console.error(

        'ROLE LOOKUP ERROR:',

        profileError?.message

      )


      return null


    }





    /*
    =====================================================
    NORMALIZE ROLE
    Keeps database role unchanged
    =====================================================
    */


    const role =

      profile.role === 'admin'

      ? 'admin'


      : profile.role === 'editor'

      ? 'editor'


      : 'user'





    /*
    =====================================================
    RETURN USER DATA
    =====================================================
    */


    return {


      id: profile.id,


      user_id: profile.user_id,


      name: profile.name,


      email: profile.email,


      role,


      avatar_url: profile.avatar_url,


      must_change_password:

      profile.must_change_password,


      created_at:

      profile.created_at


    }





  }


  catch(error) {


    console.error(

      'GET USER ROLE ERROR:',

      error

    )


    return null


  }


}