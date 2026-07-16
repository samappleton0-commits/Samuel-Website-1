'use client'

import { useState } from 'react'
import Link from 'next/link'

import {
  Loader2,
  ShieldCheck,
  Mail
} from 'lucide-react'


import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase-browser'



export default function ForgotPasswordPage() {


  const supabase = createClient()



  const [email,setEmail] = useState('')

  const [error,setError] = useState('')

  const [message,setMessage] = useState('')

  const [loading,setLoading] = useState(false)





  async function handleReset(
    e:React.FormEvent<HTMLFormElement>
  ){


    e.preventDefault()



    setLoading(true)

    setError('')

    setMessage('')




    const {
      error

    } = await supabase.auth.resetPasswordForEmail(

      email,

      {
        redirectTo:
        `${window.location.origin}/reset-password`
      }

    )






    if(error){


      setError(error.message)

      setLoading(false)

      return


    }





    setMessage(
      'Password reset link sent. Please check your email.'
    )


    setLoading(false)



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







{/* Icon Header */}


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

Forgot Password

</h1>






<p

className="
mt-2
text-sm
text-muted-foreground
"

>

Enter your email to receive a password reset link

</p>



</div>









<form

onSubmit={handleReset}

>


<div

className="
space-y-5
"

>








{/* Email */}



<div>


<label

htmlFor="email"

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


id="email"


type="email"


placeholder="admin@example.com"


value={email}


onChange={
(e)=>setEmail(e.target.value)
}


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


Sending...


</span>


:

'Send Reset Link'


}



</Button>








<div

className="
text-center
"

>


<Link

href="/login"

className="
text-sm
font-medium
text-accent
hover:underline
"

>

Back to Login

</Link>


</div>





</div>


</form>









{/* Security Footer */}


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