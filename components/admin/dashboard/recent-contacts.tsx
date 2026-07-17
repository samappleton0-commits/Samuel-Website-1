'use client'


import Link from 'next/link'


import {
  Calendar,
  ArrowRight,
  Mail,
} from 'lucide-react'





type Contact = {

  id:string

  name:string

  email:string

  subject:string | null

  message:string

  created_at:string

  read:boolean

}





type Props = {

  contacts?:Contact[] | null

}







export default function RecentContacts({

  contacts,

}:Props){





const recentMessages = Array.isArray(contacts)

?

contacts

.slice()

.sort(

(a,b)=>

new Date(b.created_at).getTime()

-

new Date(a.created_at).getTime()

)

.slice(0,4)

:

[]








return (


<section

className="

w-full

min-w-0

rounded-3xl

border

bg-card

p-4

sm:p-5

"

>



{/* HEADER */}



<div

className="

mb-5

flex

flex-col

gap-3

sm:flex-row

sm:items-center

sm:justify-between

"

>



<div className="min-w-0">


<h2

className="

truncate

text-xl

font-bold

"

>

Recent Messages

</h2>



<p

className="

text-sm

text-muted-foreground

"

>

Latest contact submissions

</p>


</div>






<Link

href="/admin/messages"

className="

w-fit

text-sm

font-medium

text-primary

hover:underline

"

>

View All

</Link>





</div>









{

recentMessages.length === 0 ? (


<div

className="

rounded-xl

border

py-8

text-center

text-sm

text-muted-foreground

"

>

No messages yet.

</div>


)

:

(


<div

className="

space-y-3

"

>


{

recentMessages.map(contact=>(


<Link

key={contact.id}

href={`/admin/messages/${contact.id}`}

className="

group

block

rounded-2xl

border

p-4

transition

hover:bg-muted/50

hover:shadow-sm

"

>







<div

className="

flex

items-start

justify-between

gap-3

"

>



<div

className="

flex

min-w-0

items-center

gap-3

"

>


<div

className="

flex

h-10

w-10

shrink-0

items-center

justify-center

rounded-full

bg-primary/10

font-bold

text-primary

"

>

{contact.name?.charAt(0).toUpperCase()}

</div>





<div className="min-w-0">


<h3

className="

truncate

font-semibold

"

>

{contact.name}

</h3>



<p

className="

flex

items-center

gap-1

truncate

text-xs

text-muted-foreground

"

>


<Mail size={12}/>

{contact.email}


</p>


</div>




</div>







{

!contact.read && (


<span

className="

shrink-0

rounded-full

bg-green-500

px-2

py-1

text-xs

font-medium

text-white

"

>

New

</span>


)


}



</div>









{

contact.subject && (


<p

className="

mt-3

truncate

text-sm

font-semibold

"

>

{contact.subject}

</p>


)


}








<p

className="

mt-2

line-clamp-2

text-sm

text-muted-foreground

"

>

{contact.message}

</p>








<div

className="

mt-3

flex

items-center

justify-between

"

>



<div

className="

flex

items-center

gap-2

text-xs

text-muted-foreground

"

>


<Calendar size={13}/>


{

new Date(contact.created_at)

.toLocaleDateString(

'en-US',

{

month:'short',

day:'numeric'

}

)

}


</div>





<ArrowRight

size={16}

className="

opacity-0

transition

group-hover:translate-x-1

group-hover:opacity-100

"

/>



</div>





</Link>


))


}



</div>


)


}



</section>


)

}