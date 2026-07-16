'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import {
  Loader2,
  ShieldCheck,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail
} from 'lucide-react'


import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase-browser'



export default function LoginPage() {


  const router = useRouter()

  const supabase = createClient()



  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const [showPassword,setShowPassword] = useState(false)

const [robotCheck,setRobotCheck] = useState(false)

const [error,setError] = useState('')

const [loading,setLoading] = useState(false)



  async function handleLogin(
    e:React.FormEvent<HTMLFormElement>
  ){

    
    e.preventDefault()


    setLoading(true)
    setError('')

if(!robotCheck){

  setError(
    'Please confirm that you are not a robot.'
  )

  setLoading(false)

  return

}

    const {error} =
      await supabase.auth.signInWithPassword({

        email,

        password

      })



    if(error){

      setError(
        'Invalid email or password. Please try again.'
      )

      setLoading(false)

      return

    }



    router.push('/admin')

    router.refresh()


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




{/* Logo */}


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

Admin Portal

</h1>


<p
className="
mt-2
text-sm
text-muted-foreground
"
>

 Sign in to access your account

</p>

</div>








<form
onSubmit={handleLogin}
>


<div
className="
space-y-5
"
>




{/* Email */}


<div>


<label
className="
mb-2
block
text-sm
font-medium
"
>

Email Address

</label>



<div
className="
relative
"
>


<Mail
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

type="email"

value={email}

onChange={
e=>setEmail(e.target.value)
}

placeholder="admin@example.com"

autoComplete="email"

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









{/* Password */}


<div>


<label
className="
mb-2
block
text-sm
font-medium
"
>

Password

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


type={
showPassword
?
'text'
:
'password'
}


value={password}


onChange={
e=>setPassword(e.target.value)
}


placeholder="Enter your password"


autoComplete="current-password"


required


className="
w-full
rounded-xl
border
border-surface-border
bg-surface
py-3
pl-11
pr-12
text-sm
outline-none
transition
focus:border-accent
focus:ring-2
focus:ring-accent/20
"

/>





<button

type="button"

onClick={()=>
setShowPassword(!showPassword)
}

className="
absolute
right-3
top-1/2
-translate-y-1/2
text-muted-foreground
hover:text-foreground
"

>


{
showPassword
?
<EyeOff className="h-5 w-5"/>
:
<Eye className="h-5 w-5"/>
}


</button>



</div>


</div>









{/* Security Options */}


<div
className="
flex
items-center
justify-between
"
>


<label

className="
flex
items-center
gap-2
text-sm
text-muted-foreground
"

>


<input

type="checkbox"

checked={robotCheck}

onChange={
(e)=>setRobotCheck(e.target.checked)
}

className="
h-4
w-4
rounded
accent-accent
"

/>


<span>

I'm not a robot

</span>


</label>





<Link

href="/forgot-password"

className="
text-sm
font-medium
text-accent
hover:underline
"

>

Forgot Password?

</Link>



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

loading ?

<span
className="
flex
items-center
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

Signing in...

</span>


:

'Sign In'

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


Authorized Access Only • Secure Session Enabled


</p>



</div>





</div>


</div>


</main>

)

}