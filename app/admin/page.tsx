import { getUserRole } from '@/lib/get-user-role'

import AdminDashboard from '@/components/admin/dashboard/admin-dashboard'
import EditorDashboard from '@/components/admin/dashboard/editor-dashboard'

export const dynamic = 'force-dynamic'
export default async function AdminPage() {


  const user = await getUserRole()


  if (!user) {

    return null

  }



  if (user.role === 'admin') {

    return (

      <AdminDashboard

        user={user}

      />

    )

  }



  // Editor + User share the same dashboard

  return (

    <EditorDashboard

      user={user}

    />

  )


}