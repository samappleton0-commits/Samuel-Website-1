

import { createClient } from '@/lib/supabase-server'
import { requireAdmin } from '@/lib/require-role'

import AddUserForm from '@/components/admin/users/add-user-form'
import UserManager from '@/components/admin/users/user-manager'

export default async function AdminUsersPage() {

  // Only admins can access this page
  await requireAdmin()

  const supabase = await createClient()

  const {
    data: users,
    error,
  } = await supabase
    .from('admin_users')
    .select('*')
    .order('created_at', {
      ascending: false,
    })

  if (error) {

    console.error(
      'Users fetch error:',
      error
    )

  }

  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">

          User Management

        </h1>

        <p
          className="
            mt-2
            text-muted-foreground
          "
        >

          Manage admin and editor access.

        </p>

      </div>

      <AddUserForm />

      <UserManager
        users={users ?? []}
      />

    </div>

  )

}