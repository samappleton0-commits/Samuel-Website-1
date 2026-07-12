// ======================================================
// ADMIN USERS PAGE
// app/admin/users/page.tsx
// ======================================================

import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase-server'

import { getUserRole } from '@/lib/get-user-role'

import AddUserForm from '@/components/admin/users/add-user-form'
import UserManager from '@/components/admin/users/user-manager'


export default async function AdminUsersPage(){


  const userRole = await getUserRole()



  // Only admin can access user management

  if(
    !userRole ||
    userRole.role !== 'admin'
  ){

    redirect('/admin')

  }





  const supabase = await createClient()



  const {
    data: users,
    error
  } = await supabase

    .from('admin_users')

    .select('*')

    .order(
      'created_at',
      {
        ascending:false,
      }
    )





  if(error){

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


        <p className="
          mt-2
          text-muted-foreground
        ">

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