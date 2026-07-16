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

  value?:number | string

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

color="bg-primary/10 text-primary",

disabled=false,

}:Props){


const Icon = icons[icon] || FileText



const content=(


<div

className={`

group

flex

h-[180px]

w-full

flex-col

rounded-2xl

border

bg-card

p-5

transition-all

duration-300

overflow-hidden



${

disabled

?

'opacity-50'

:

'hover:-translate-y-1 hover:shadow-lg'

}

`}

>



<div

className={`

flex

h-11

w-11

items-center

justify-center

rounded-xl

${color}

`}

>


<Icon size={22}/>


</div>





<div className="mt-5">


{

value !== undefined &&

(

<p className="text-3xl font-bold">

{value}

</p>

)

}




<h3 className="mt-2 truncate text-base font-semibold">

{title}

</h3>


</div>





<p

className="

mt-auto

line-clamp-2

text-sm

text-muted-foreground

"

>

{description}

</p>





{

!disabled &&

(

<ArrowRight

size={18}

className="

absolute

bottom-5

right-5

opacity-0

transition

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

className="block h-full"

>

{content}

</Link>

)


}