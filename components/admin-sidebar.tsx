// ======================================================
// ADMIN SIDEBAR SERVER COMPONENT
// components/admin-sidebar.tsx
// ======================================================

import { unstable_noStore as noStore } from 'next/cache'

import { getUserRole } from '@/lib/get-user-role'

import AdminSidebarClient from './admin-sidebar-client'





export default async function AdminSidebar(){


  // Prevent sidebar profile caching

  noStore()





  const user = await getUserRole()





  return (

    <AdminSidebarClient


      role={

        user?.role === 'admin'

        ? 'admin'

        : 'editor'

      }



      profile={{


        name:

          user?.name ??

          'User',




        email:

          user?.email ??

          '',




        avatar_url:

          user?.avatar_url ??

          '/profileme.png',



      }}



    />

  )


}