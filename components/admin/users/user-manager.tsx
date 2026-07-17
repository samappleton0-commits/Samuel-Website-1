'use client'


import UserAvatar from '@/components/admin/user-avatar'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import {
  Loader2,
  Save,
  Trash2,
} from 'lucide-react'


import {
  updateUserRole,
  deleteUser,
} from '@/app/admin/users/actions'






type User = {

  id:string

  user_id:string

  name:string

  email:string

  role:string

  created_at:string

  avatar_url:string | null

}





type Props = {

  users:User[]

}







export default function UserManager({

users,

}:Props){



const router = useRouter()



const [roles,setRoles] = useState<

Record<string,string>

>(


Object.fromEntries(

users.map(user=>[

user.id,

user.role

])

)


)





const [saving,setSaving] = useState<string | null>(null)

const [deleting,setDeleting] = useState<string | null>(null)







async function saveRole(user:User){


try{


setSaving(user.id)



await updateUserRole({

id:user.id,

role:roles[user.id]

})




router.refresh()



}

catch(error:any){


console.error(
'ROLE UPDATE ERROR:',
error
)



alert(

error.message ||

'Unable to update role.'

)


}


finally{


setSaving(null)


}


}








async function handleDelete(user:User){



const confirmDelete = window.confirm(

`Are you sure you want to delete ${user.name}?`

)



if(!confirmDelete){

return

}






try{


setDeleting(user.id)



await deleteUser(

user.id

)



router.refresh()



}

catch(error:any){



console.error(

'DELETE ERROR:',

error

)



alert(

error.message ||

'Unable to delete user.'

)



}


finally{


setDeleting(null)


}



}








return (


<div className="space-y-5">


{


users.length === 0 ? (


<div

className="
rounded-2xl
border
p-10
text-center
text-muted-foreground
"

>

No users found.

</div>


)

:

users.map(user=>(



<div

key={user.id}

className="
flex
flex-col
gap-5
rounded-2xl
border
bg-card
p-6
md:flex-row
md:items-center
md:justify-between
"

>






{/* USER DETAILS */}


<div

className="
flex
items-center
gap-4
"

>


<UserAvatar

name={user.name}

avatar_url={user.avatar_url}

/>





<div>


<h3 className="font-semibold">


{user.name}


</h3>





<p

className="
text-sm
text-muted-foreground
"

>

{user.email}

</p>





<p

className="
mt-1
text-xs
text-muted-foreground
"

>

Added:

{' '}

{

new Date(

user.created_at

)

.toLocaleDateString(

'en-US',

{

year:'numeric',

month:'long',

day:'numeric',

timeZone:'UTC'

}

)

}


</p>


</div>




</div>










{/* ACTION AREA */}



<div

className="
flex
flex-wrap
items-center
gap-3
"

>




{

user.role === 'admin'

?


<span

className="
rounded-full
bg-accent/10
px-4
py-2
text-sm
text-accent
"

>

Administrator

</span>


:

(


<>


<select


value={roles[user.id]}


onChange={(e)=>

setRoles({

...roles,

[user.id]:e.target.value

})

}


className="
rounded-xl
border
px-4
py-2
"

>


<option value="editor">

Editor

</option>



<option value="user">

User

</option>



</select>







<button


onClick={()=>saveRole(user)}


disabled={

saving === user.id

}


className="
flex
items-center
gap-2
rounded-xl
bg-accent
px-4
py-2
text-white
disabled:opacity-50
"

>



{

saving === user.id

?


<Loader2

size={18}

className="animate-spin"

/>


:

<Save size={18}/>


}



Save



</button>









<button


onClick={()=>handleDelete(user)}


disabled={

deleting === user.id

}


className="
flex
items-center
gap-2
rounded-xl
border
border-red-500
px-4
py-2
text-red-500
hover:bg-red-500
hover:text-white
disabled:opacity-50
"

>



{

deleting === user.id

?


<Loader2

size={18}

className="animate-spin"

/>


:

<Trash2 size={18}/>


}



Delete



</button>




</>


)


}



</div>







</div>



))


}



</div>


)


}