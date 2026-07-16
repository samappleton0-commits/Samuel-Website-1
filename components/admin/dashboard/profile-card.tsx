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

  user:{

    name:string

    email:string

    role:string

    avatar_url?:string | null

  }

}







export default function ProfileCard({

  user,

}:Props){



const [greeting,setGreeting] = useState('')

const [dateTime,setDateTime] = useState('')






useEffect(()=>{


function updateDashboardInfo(){


const now = new Date()



// =============================
// GREETING
// =============================


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







// =============================
// DATE + TIME
// =============================


const date = now.toLocaleDateString(

'en-US',

{

weekday:'long',

year:'numeric',

month:'long',

day:'numeric',

}

)




const time = now.toLocaleTimeString(

'en-US',

{

hour:'numeric',

minute:'2-digit',

hour12:true,

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









return (


<section


className="

rounded-3xl

border

bg-card

p-6

shadow-sm

"


>



<div


className="

flex

flex-col

gap-8

lg:flex-row

lg:items-center

lg:justify-between

"


>






{/* ==================================
    LEFT PROFILE SECTION
================================== */}



<div


className="

flex

items-center

gap-5

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


width={90}


height={90}


className="

h-20

w-20

rounded-full

border

object-cover

"


/>



):(



<div


className="

flex

h-20

w-20

items-center

justify-center

rounded-full

bg-primary

text-3xl

font-bold

text-white

"


>


{

user.name

.charAt(0)

.toUpperCase()

}


</div>



)

}




{/* ACTIVE STATUS */}


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







<div>


<h1

className="
text-2xl
font-bold
sm:text-3xl
"

>

{greeting}, {user.name} 👋

</h1>



<h2

className="
mt-2
text-lg
font-semibold
"

>

Welcome back to your dashboard.

</h2>




<p

className="
mt-2
max-w-xl
text-sm
text-muted-foreground
sm:text-base
"

>

Manage your website from one place.
Control your articles, messages, projects,
announcements, users, and website content.

</p>



</div>

</div>







{/* ==================================
    RIGHT INFORMATION SECTION
================================== */}



<div


className="

grid

gap-3

text-sm

"


>






<div


className="

flex

items-center

gap-3

rounded-xl

bg-muted/40

px-4

py-3

"


>


<Shield size={18}/>



<div>


<p


className="

text-xs

text-muted-foreground

"


>

Role

</p>


<p


className="

font-semibold

capitalize

"


>

{user.role}


</p>


</div>


</div>









<div


className="

flex

items-center

gap-3

rounded-xl

bg-muted/40

px-4

py-3

"


>


<Mail size={18}/>



<div>


<p


className="

text-xs

text-muted-foreground

"


>

Email

</p>


<p


className="

font-semibold

"


>

{user.email}


</p>


</div>


</div>









<div


className="

flex

items-center

gap-3

rounded-xl

bg-muted/40

px-4

py-3

"


>


<Calendar size={18}/>



<div>


<p


className="

text-xs

text-muted-foreground

"


>

Date & Time

</p>


<p


className="

font-semibold

"


>

{dateTime || 'Loading...'}


</p>


</div>


</div>







</div>







</div>



</section>


)


}