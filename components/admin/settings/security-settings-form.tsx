'use client'


import { useState } from 'react'
import { createClient } from '@/lib/supabase-browser'
import { useRouter } from 'next/navigation'



export default function SecuritySettingsForm(){


const supabase = createClient()

const router = useRouter()



const [password,setPassword] = useState('')

const [confirmPassword,setConfirmPassword] = useState('')

const [loading,setLoading] = useState(false)

const [message,setMessage] = useState('')







async function updatePassword(){



setMessage('')





if(password.length < 8){


setMessage(
'Password must be at least 8 characters.'
)


return


}





if(password !== confirmPassword){


setMessage(
'Passwords do not match.'
)


return


}





try{


setLoading(true)







// Update Supabase Auth password


const {

error:passwordError

}=await supabase.auth.updateUser({

password

})






if(passwordError){

throw passwordError

}







// Get current user


const {

data:{
user

}

}=await supabase.auth.getUser()






if(user){



await supabase

.from('admin_users')

.update({

must_change_password:false

})

.eq(

'user_id',

user.id

)



}







setMessage(

'Password updated successfully.'

)



setPassword('')

setConfirmPassword('')



router.refresh()



}



catch(error:any){



console.error(

'PASSWORD UPDATE ERROR:',

error

)



setMessage(

error.message ||

'Password update failed.'

)



}


finally{


setLoading(false)


}



}







return (



<div

className="
rounded-2xl
border
bg-card
p-6
space-y-5
"

>



<h2 className="text-xl font-bold">

Change Password

</h2>





<div>


<label className="text-sm font-medium">

New Password

</label>



<input

type="password"

value={password}

onChange={(e)=>

setPassword(e.target.value)

}

className="
mt-2
w-full
rounded-xl
border
px-4
py-3
"

placeholder="Enter new password"

/>


</div>







<div>


<label className="text-sm font-medium">

Confirm Password

</label>



<input

type="password"

value={confirmPassword}

onChange={(e)=>

setConfirmPassword(e.target.value)

}

className="
mt-2
w-full
rounded-xl
border
px-4
py-3
"

placeholder="Confirm password"

/>


</div>







{

message && (

<p className="text-sm">

{message}

</p>

)

}







<button

onClick={updatePassword}

disabled={loading}

className="
rounded-xl
bg-accent
px-5
py-3
text-white
disabled:opacity-50
"

>


{

loading

?

'Saving...'

:

'Update Password'

}



</button>





</div>


)


}