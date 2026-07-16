'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import {
  Loader2,
  ShieldCheck,
  LockKeyhole
} from 'lucide-react'


import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase-browser'



export default function ResetPasswordPage() {


  const router = useRouter()

  const supabase = createClient()



  const [password,setPassword] = useState('')

  const [confirmPassword,setConfirmPassword] = useState('')

  const [error,setError] = useState('')

  const [message,setMessage] = useState('')

  const [loading,setLoading] = useState(false)







  async function handleUpdatePassword(
    e:React.FormEvent<HTMLFormElement>
  ){


    e.preventDefault()



    setError('')

    setMessage('')





    if(password !== confirmPassword){


      setError(
        'Passwords do not match.'
      )


      return


    }





    if(password.length < 6){


      setError(
        'Password must be at least 6 characters.'
      )


      return


    }






    setLoading(true)






    const {

      error

    } = await supabase.auth.updateUser({


      password


    })







    if(error){


      setError(error.message)


      setLoading(false)


      return


    }







    setMessage(
      'Password updated successfully. Redirecting to login...'
    )




    setLoading(false)






    setTimeout(()=>{


      router.push('/login')


    },2500)




  }








return (

<main

className="
relative
flex
min-h-screen
items-center
justify-center
overflow-hidden
bg-gradient-to-br
from-background
via-surface
to-accent/10
px-4
"

>





{/* Background decoration */}


<div

className="
absolute
left-10
top-10
h-40
w-40
rounded-full
bg-accent/20
blur-3xl
"

/>




<div

className="
absolute
bottom-10
right-10
h-60
w-60
rounded-full
bg-accent/10
blur-3xl
"

/>








<div

className="
relative
w-full
max-w-md
"

>



<div

className="
glass
rounded-3xl
p-8
shadow-2xl
backdrop-blur-xl
"

>








{/* Header */}



<div

className="
mb-8
text-center
"

>




<div

className="
mx-auto
mb-5
flex
h-20
w-20
items-center
justify-center
rounded-3xl
bg-accent
text-white
shadow-xl
"

>



<ShieldCheck

className="
h-10
w-10
"

/>



</div>








<h1

className="
text-3xl
font-bold
"

>

Create New Password

</h1>





<p

className="
mt-2
text-sm
text-muted-foreground
"

>

Choose a new password for your account

</p>





</div>









<form

onSubmit={handleUpdatePassword}

>


<div

className="
space-y-5
"

>









{/* New Password */}



<div>


<label

htmlFor="password"

className="
mb-2
block
text-sm
font-medium
"

>

New Password

</label>






<div

className="
relative
"

>



<LockKeyhole

className="
absolute
left-3
top-1/2
h-5
w-5
-translate-y-1/2
text-muted-foreground
"

/>





<input


id="password"


type="password"


placeholder="Enter new password"


value={password}


onChange={
(e)=>setPassword(e.target.value)
}


required


className="
w-full
rounded-xl
border
border-surface-border
bg-surface
py-3
pl-11
pr-4
text-sm
outline-none
transition
focus:border-accent
focus:ring-2
focus:ring-accent/20
"

/>




</div>



</div>









{/* Confirm Password */}




<div>


<label

htmlFor="confirmPassword"

className="
mb-2
block
text-sm
font-medium
"

>

Confirm Password

</label>






<div

className="
relative
"

>



<LockKeyhole

className="
absolute
left-3
top-1/2
h-5
w-5
-translate-y-1/2
text-muted-foreground
"

/>






<input


id="confirmPassword"


type="password"


placeholder="Confirm new password"


value={confirmPassword}


onChange={
(e)=>setConfirmPassword(e.target.value)
}


required


className="
w-full
rounded-xl
border
border-surface-border
bg-surface
py-3
pl-11
pr-4
text-sm
outline-none
transition
focus:border-accent
focus:ring-2
focus:ring-accent/20
"

/>



</div>


</div>









{/* Error */}



{

error &&


<div

className="
rounded-xl
border
border-red-200
bg-red-50
px-4
py-3
text-sm
text-red-600
"

>

{error}

</div>


}









{/* Success */}



{

message &&


<div

className="
rounded-xl
border
border-green-200
bg-green-50
px-4
py-3
text-sm
text-green-600
"

>

{message}

</div>


}









<Button


type="submit"


disabled={loading}


className="
h-12
w-full
rounded-xl
text-base
font-medium
shadow-lg
"

>


{

loading

?

<span

className="
flex
items-center
justify-center
gap-2
"

>


<Loader2

className="
h-5
w-5
animate-spin
"

/>


Updating...


</span>


:

'Update Password'


}



</Button>







</div>


</form>









{/* Footer */}



<div

className="
mt-8
border-t
border-surface-border
pt-6
"

>


<p

className="
text-center
text-xs
text-muted-foreground
"

>



<ShieldCheck

className="
mr-1
inline
h-4
w-4
"

/>



Authorized access only • Secure session enabled


</p>



</div>









</div>


</div>


</main>


)

}