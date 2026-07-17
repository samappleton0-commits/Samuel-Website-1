import { createClient } from '@/lib/supabase-server'



export async function getUserRole(){


try{


const supabase = await createClient()





// Get logged in user

const {

data:{
user

},

error:userError

}=await supabase.auth.getUser()






if(
userError ||
!user

){

return null

}







// Get profile from admin_users


const {

data:profile,

error:profileError

}=await supabase

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






if(profileError){


console.error(

'Role lookup error:',

profileError.message

)


return null


}







return {


id:profile.id,

user_id:profile.user_id,

name:profile.name,

email:profile.email,

role:profile.role,

avatar_url:profile.avatar_url,

must_change_password:

profile.must_change_password,

created_at:

profile.created_at


}



}


catch(error){



console.error(

'GET USER ROLE ERROR:',

error

)


return null


}



}