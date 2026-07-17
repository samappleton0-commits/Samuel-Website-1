'use client'


import Link from 'next/link'


import {
  ArrowRight,
  FileText,
  Globe,
  Clock,
  Star,
  MessageCircle,
  Mail,
  Inbox,
  CheckCircle,
  MailOpen,
  Settings,
  Users,
  Megaphone,
  FolderKanban,
  Images,
  FilePlus,
  UserCog,
} from 'lucide-react'





type Props = {

  title:string

  value?:number|string

  description:string

  href?:string

  icon:string

  color?:string

  disabled?:boolean

}







const icons:any = {


FileText,

Globe,

Clock,

Star,

MessageCircle,

Mail,

Inbox,

CheckCircle,

MailOpen,

Settings,

Users,

Megaphone,

FolderKanban,

Images,

FilePlus,

UserCog,


}










export default function StatCard({

title,

value,

description,

href,

icon,

color='bg-primary/10 text-primary',

disabled=false,

}:Props){






const Icon = icons[icon] || FileText







const content=(


<div


className={`

group

relative

flex

min-h-[170px]

w-full

flex-col

overflow-hidden

rounded-2xl

border

bg-card

p-5

transition-all

duration-300



${

disabled

?

'opacity-50'

:

'hover:-translate-y-1 hover:shadow-lg'

}

`}


>









{/* ICON */}



<div


className={`

flex

h-11

w-11

shrink-0

items-center

justify-center

rounded-xl

${color}

`}


>


<Icon size={22}/>


</div>









{/* CONTENT */}



<div

className="

mt-5

min-w-0

"

>



{

value !== undefined && (


<p

className="

text-3xl

font-bold

"

>

{value}

</p>


)

}








<h3

className="

mt-2

line-clamp-2

text-base

font-semibold

"

>

{title}

</h3>





</div>









{/* DESCRIPTION */}



<p


className="

mt-auto

pr-6

pt-4

line-clamp-2

text-sm

text-muted-foreground

"


>

{description}

</p>










{

!disabled && (


<ArrowRight


size={18}


className="

absolute

bottom-5

right-5

opacity-0

transition-all

group-hover:translate-x-1

group-hover:opacity-100

"

/>


)


}






</div>



)









if(!href || disabled){

return content

}







return (


<Link

href={href}

className="

block

h-full

"

>

{content}

</Link>


)


}