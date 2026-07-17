import { redirect } from 'next/navigation'

import { getUserRole } from './get-user-role'





// ======================================================
// GENERIC ROLE CHECK
// ======================================================


export async function requireRole(
  allowedRoles:string[]
){



const user = await getUserRole()






if(!user){

  redirect('/login')

}







if(
  !allowedRoles.includes(user.role)
){

  redirect('/admin')

}






return user


}









// ======================================================
// REQUIRE ADMIN ACCESS
// ADMIN ONLY
// ======================================================


export async function requireAdmin(){


return requireRole([

  'admin'

])


}









// ======================================================
// REQUIRE STAFF ACCESS
// ADMIN + EDITOR
// ======================================================


export async function requireStaff(){


return requireRole([

  'admin',

  'editor'

])


}









// ======================================================
// REQUIRE EDITOR ACCESS
// EDITOR + ADMIN
// BLOG ACCESS
// ======================================================


export async function requireEditor(){


return requireRole([

  'admin',

  'editor'

])


}