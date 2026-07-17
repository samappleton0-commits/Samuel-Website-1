'use server'


import { supabaseAdmin } from '@/lib/supabase-admin'
import { createClient } from '@/lib/supabase-server'



const DEFAULT_PASSWORD = 'Welcome@2026'





// ======================================================
// CHECK CURRENT ADMIN
// ======================================================


async function verifyAdmin(){


const supabase = await createClient()



const {
  data:{
    user
  }
}=await supabase.auth.getUser()



if(!user){

throw new Error(
'Unauthorized'
)

}




const {
data:admin
}=await supabaseAdmin

.from('admin_users')

.select('role')

.eq(
'user_id',
user.id
)

.single()





if(
!admin ||
admin.role !== 'admin'
){

throw new Error(
'Admin access required.'
)

}



return user


}









// ======================================================
// CREATE USER
// ADMIN ONLY
// ======================================================


export async function createUser(data:{
name:string
email:string
role:string
}){


const {

name,
email,
role

}=data





await verifyAdmin()






if(
role !== 'editor' &&
role !== 'user'
){

throw new Error(
'Invalid user role.'
)

}







// Create Supabase Auth account


const {
data:authUser,
error:authError

}=await supabaseAdmin.auth.admin.createUser({

email,

password:DEFAULT_PASSWORD,

email_confirm:true

})





if(authError){

throw new Error(
authError.message
)

}





if(!authUser.user){

throw new Error(
'User creation failed.'
)

}








// Create profile


const {
error

}=await supabaseAdmin

.from('admin_users')

.insert({

user_id:authUser.user.id,

name,

email,

role,

avatar_url:null,

must_change_password:true

})





if(error){


await supabaseAdmin.auth.admin.deleteUser(

authUser.user.id

)


throw new Error(
error.message
)


}




return {

success:true,

temporaryPassword:DEFAULT_PASSWORD

}



}









// ======================================================
// UPDATE USER ROLE
// ADMIN ONLY
// ======================================================


export async function updateUserRole(data:{
id:string
role:string
}){



const {

id,
role

}=data



await verifyAdmin()





if(
role !== 'editor' &&
role !== 'user'
){

throw new Error(
'Invalid role.'
)

}





const {
data:targetUser,
error

}=await supabaseAdmin

.from('admin_users')

.select('role')

.eq(
'id',
id
)

.single()





if(error){

throw new Error(
error.message
)

}





if(
targetUser.role === 'admin'
){

throw new Error(
'Admin role cannot be changed.'
)

}







const {
error:updateError

}=await supabaseAdmin

.from('admin_users')

.update({

role

})

.eq(
'id',
id
)







if(updateError){

throw new Error(
updateError.message
)

}



return {

success:true

}



}









// ======================================================
// DELETE USER
// ADMIN ONLY
// ======================================================


export async function deleteUser(
id:string
){



await verifyAdmin()





const {
data:targetUser,
error

}=await supabaseAdmin

.from('admin_users')

.select(

'user_id, role'

)

.eq(
'id',
id
)

.single()





if(error){

throw new Error(
error.message
)

}







// Protect admin account


if(
targetUser.role === 'admin'
){

throw new Error(
'Administrator cannot be deleted.'
)

}








// Delete auth account first


const {
error:authError

}=await supabaseAdmin.auth.admin.deleteUser(

targetUser.user_id

)





if(authError){

throw new Error(
authError.message
)

}






// Delete profile record


const {
error:deleteError

}=await supabaseAdmin

.from('admin_users')

.delete()

.eq(
'id',
id
)





if(deleteError){

throw new Error(
deleteError.message
)

}




return {

success:true

}



}