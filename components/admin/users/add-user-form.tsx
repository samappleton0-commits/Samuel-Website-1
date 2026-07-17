'use client'


import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  UserPlus,
  Loader2,
} from 'lucide-react'


import {
  createUser,
} from '@/app/admin/users/actions'






export default function AddUserForm(){


const router = useRouter()



const [name,setName] = useState('')

const [email,setEmail] = useState('')

const [role,setRole] = useState('editor')


const [loading,setLoading] = useState(false)


const [message,setMessage] = useState('')


const [temporaryPassword,setTemporaryPassword] = useState('')








async function handleCreateUser(
e:React.FormEvent
){


e.preventDefault()



setMessage('')

setTemporaryPassword('')





try{


setLoading(true)





const result = await createUser({

name,

email,

role,

})





setMessage(
'User created successfully.'
)



setTemporaryPassword(

result.temporaryPassword

)





setName('')

setEmail('')

setRole('editor')





router.refresh()



}

catch(error:any){



console.error(

'CREATE USER ERROR:',

error

)



setMessage(

error.message ||

'Unable to create user.'

)



}


finally{


setLoading(false)


}



}









return (



<form

onSubmit={handleCreateUser}

className="
space-y-5
rounded-2xl
border
bg-card
p-6
"

>





<h2

className="
flex
items-center
gap-2
text-xl
font-bold
"

>


<UserPlus size={22}/>


Add User


</h2>









{/* NAME */}


<div>


<label className="text-sm font-medium">

Full Name

</label>



<input


value={name}


onChange={(e)=>

setName(
e.target.value
)

}


placeholder="Full name"


className="
mt-2
w-full
rounded-xl
border
px-4
py-3
"


required


/>


</div>









{/* EMAIL */}



<div>


<label className="text-sm font-medium">

Email Address

</label>



<input


type="email"


value={email}


onChange={(e)=>

setEmail(
e.target.value
)

}


placeholder="email@example.com"


className="
mt-2
w-full
rounded-xl
border
px-4
py-3
"


required


/>


</div>









{/* ROLE */}



<div>


<label className="text-sm font-medium">

User Role

</label>



<select


value={role}


onChange={(e)=>

setRole(
e.target.value
)

}


className="
mt-2
w-full
rounded-xl
border
px-4
py-3
"

>


<option value="editor">

Editor

</option>



<option value="user">

User

</option>



</select>


</div>









{/* MESSAGE */}



{

message && (


<div

className="
space-y-3
rounded-xl
border
p-4
"

>


<p className="text-sm">

{message}

</p>





{

temporaryPassword && (


<div>


<p className="font-semibold">

Temporary Password

</p>



<p

className="
mt-1
rounded-lg
bg-muted
p-3
font-mono
"

>

{temporaryPassword}

</p>


<p

className="
mt-2
text-xs
text-muted-foreground
"

>

Give this password to the user.
They should change it after login.

</p>


</div>


)


}



</div>


)

}









<button


disabled={loading}


className="
flex
items-center
justify-center
gap-2
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


<>

<Loader2

size={18}

className="animate-spin"

/>


Creating...


</>


:


'Create User'


}



</button>






</form>


)


}