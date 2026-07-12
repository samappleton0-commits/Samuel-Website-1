import { getUserRole } from '@/lib/get-user-role'
import AdminSidebarClient from './admin-sidebar-client'

export default async function AdminSidebar() {

  const user = await getUserRole()

  return (

    <AdminSidebarClient
      role={
        user?.role === 'admin'
          ? 'admin'
          : 'editor'
      }
    />

  )

}