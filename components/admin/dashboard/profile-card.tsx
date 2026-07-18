/* =====================================================
   RESPONSIVE PROFILE CARD
   components/admin/dashboard/profile-card.tsx
===================================================== */

'use client'

import Image from 'next/image'

import {
  useEffect,
  useState,
} from 'react'

import {
  Shield,
  Calendar,
  Mail,
} from 'lucide-react'



type Props = {

  user: {

    name: string

    email: string

    role: string

    avatar_url?: string | null

  }

}



export default function ProfileCard({

  user,

}: Props) {


const [greeting,setGreeting] = useState('')

const [dateTime,setDateTime] = useState('')





useEffect(()=>{


function updateDashboardInfo(){


const now = new Date()

const hour = now.getHours()



if(hour < 12){

setGreeting('Good Morning')

}

else if(hour < 18){

setGreeting('Good Afternoon')

}

else if(hour < 22){

setGreeting('Good Evening')

}

else{

setGreeting('Good Night')

}





const date = now.toLocaleDateString(

'en-US',

{

weekday:'long',

year:'numeric',

month:'long',

day:'numeric'

}

)



const time = now.toLocaleTimeString(

'en-US',

{

hour:'numeric',

minute:'2-digit',

hour12:true

}

)



setDateTime(

`${date} • ${time}`

)



}



updateDashboardInfo()


const timer = setInterval(

updateDashboardInfo,

60000

)


return ()=>clearInterval(timer)


},[])





const initials = user.name

.split(' ')

.filter(Boolean)

.slice(0,2)

.map(word=>word[0])

.join('')

.toUpperCase()
return (

<section

className="
w-full
rounded-3xl
border
bg-card
p-4
shadow-sm
sm:p-6
"

>


<div

className="
flex
flex-col
gap-6
lg:flex-row
lg:items-center
lg:justify-between
"

>



{/* ==========================
    PROFILE INFORMATION
========================== */}


<div

className="
flex
min-w-0
flex-col
items-center
gap-3
text-center
sm:flex-row
sm:gap-5
sm:text-left
"

>



<div

className="
relative
shrink-0
"

>


{

user.avatar_url ? (


<Image

src={user.avatar_url}

alt={user.name}

width={96}

height={96}

className="
h-20
w-20
rounded-full
border
object-cover
sm:h-24
sm:w-24
"

/>


)

:

(


<div

className="
flex
h-20
w-20
items-center
justify-center
rounded-full
bg-primary
text-2xl
font-bold
text-primary-foreground
sm:h-24
sm:w-24
sm:text-3xl
"

>

{initials}

</div>


)

}



<span

className="
absolute
bottom-1
right-1
h-5
w-5
rounded-full
border-2
border-card
bg-green-500
"

/>


</div>





<div

className="
min-w-0
"

>


<h1

className="
text-xl
font-bold
sm:text-2xl
"

>

<span

className="
block
text-muted-foreground
sm:inline
"

>

{greeting},

</span>


<span

className="
block
sm:ml-2
sm:inline
"

>

{user.name} 👋

</span>


</h1>





<p

className="
mt-2
text-sm
font-semibold
"

>

Welcome back to your dashboard.

</p>





<p

className="
mt-2
max-w-xl
text-sm
leading-6
text-muted-foreground
"

>

Manage your Website Contents,

Articles, and Settings

from one place.

</p>



</div>




</div>





{/* ==========================
    INFORMATION CARDS
========================== */}


<div

className="
grid
w-full
gap-3
sm:max-w-sm
lg:max-w-md
"

>


<InfoCard

icon={<Mail size={18}/>}

label="Email"

value={user.email}

/>



<InfoCard

icon={<Shield size={18}/>}

label="Role"

value={user.role}

/>



<InfoCard

icon={<Calendar size={18}/>}

label="Date & Time"

value={dateTime || 'Loading...'}

/>



</div>



</div>



</section>

)

}

function InfoCard({

icon,

label,

value,

}:{

icon:React.ReactNode

label:string

value:string

}){


return (


<div

className="
flex
items-center
gap-3
rounded-xl
bg-muted/40
px-3
py-3
sm:px-4
"

>


<div className="shrink-0">

{icon}

</div>




<div

className="
min-w-0
"

>


<p

className="
text-xs
text-muted-foreground
"

>

{label}

</p>





<p

className="
truncate
text-sm
font-semibold
"

>

{value}

</p>



</div>



</div>


)

}