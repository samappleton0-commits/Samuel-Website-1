import { redirect } from 'next/navigation'

import { getUserRole } from './get-user-role'





// ======================================================
// REQUIRE ADMIN ACCESS
// ADMIN ONLY
// ======================================================


export async function requireAdmin(){



const user = await getUserRole()






if(!user){


redirect('/login')


}







if(user.role !== 'admin'){


redirect('/admin')


}






return user



}









// ======================================================
// REQUIRE STAFF ACCESS
// ADMIN + EDITOR
// ======================================================


export async function requireStaff(){



const user = await getUserRole()






if(!user){


redirect('/login')


}







if(

user.role !== 'admin' &&

user.role !== 'editor'

){


redirect('/admin')


}







return user



}









// ======================================================
// REQUIRE EDITOR OR ADMIN
// BLOG ACCESS
// ======================================================


export async function requireEditor(){


return requireStaff()


}