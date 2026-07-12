'use server'

import { supabaseAdmin } from '@/lib/supabase-admin'

export async function createEditorUser(data: {
  name: string
  email: string
  password: string
}) {

  const { name, email, password } = data

  // Create the Auth user
  const {
    data: authUser,
    error: authError,
  } = await supabaseAdmin.auth.admin.createUser({

    email,

    password,

    email_confirm: true,

  })

  if (authError) {

    throw new Error(authError.message)

  }

  if (!authUser.user) {

    throw new Error('Unable to create user.')

  }

  // Create the role record
  const { error: roleError } =
    await supabaseAdmin
      .from('admin_users')
      .insert({

        user_id: authUser.user.id,

        name,

        email,

        role: 'editor',

      })

  if (roleError) {

    // Clean up the auth user if the database insert fails
    await supabaseAdmin.auth.admin.deleteUser(
      authUser.user.id
    )

    throw new Error(roleError.message)

  }

  return {

    success: true,

  }

}