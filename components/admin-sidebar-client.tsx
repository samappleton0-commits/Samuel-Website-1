'use client'




import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'


import {

  LayoutDashboard,

  Menu,

  X,

  ChevronDown,

  FolderKanban,

  Sparkles,

  UserRound,

  FileText,

  Phone,

  PanelBottom,

  Images,

} from 'lucide-react'


import LogoutButton from '@/components/logout-button'




type Role = 'admin' | 'editor'


type Props = {


role: Role


profile: {

name:string

email:string

avatar_url:string

}


}





type MenuItem = {

  name:string

  href:string

  icon:any

}




const contentLinks:MenuItem[] = [


  {
    name:'Hero',
    href:'/admin/hero',
    icon:Sparkles,
  },


  {
    name:'About',
    href:'/admin/about',
    icon:UserRound,
  },


  {
    name:'Resume',
    href:'/admin/resume',
    icon:FileText,
  },


  {
    name:'Contact',
    href:'/admin/contact',
    icon:Phone,
  },


  {
    name:'Footer',
    href:'/admin/footer',
    icon:PanelBottom,
  },


  {
    name:'Gallery',
    href:'/admin/gallery',
    icon:Images,
  },


  {
    name:'Projects',
    href:'/admin/projects',
    icon:FolderKanban,
  },


]






// ------------------------------------------------------
// ADMIN + EDITOR
// BLOG SECTION
// ------------------------------------------------------


const communicationLinks:MenuItem[] = [


  {
    name:'Blog',
    href:'/admin/blog',
    icon:FileText,
  },


]






// ------------------------------------------------------
// ADMIN ONLY
// MANAGEMENT
// ------------------------------------------------------


const managementLinks:MenuItem[] = [


  {
    name:'Users',
    href:'/admin/users',
    icon:UserRound,
  },


]






export default function AdminSidebarClient({

role,

profile,

}:Props){



const pathname = usePathname()








const [open,setOpen] = useState(false)


const [contentOpen,setContentOpen] = useState(true)


const [communicationOpen,setCommunicationOpen] = useState(true)


const [managementOpen,setManagementOpen] = useState(true)




function renderLinks(items:MenuItem[]){


return items.map((link)=>{


const Icon = link.icon



const active =
pathname === link.href






return (

<Link


key={link.name}


href={link.href}


onClick={()=>setOpen(false)}



className={`

flex

items-center

gap-3

rounded-xl

px-4

py-3

text-sm

transition



${
active

?

'bg-accent text-white'

:

'hover:bg-surface'

}


`}



>


<Icon size={20}/>


{link.name}


</Link>


)


})

}




return (

<>



<div

className="
flex
items-center
justify-between
rounded-3xl
glass
p-4
mb-4
lg:hidden
"

>


<h2 className="font-bold text-lg">

Admin Panel

</h2>




<button


onClick={()=>setOpen(true)}


className="
rounded-xl
p-2
hover:bg-surface
"


>


<Menu size={25}/>


</button>


</div>




{

open && (

<div


onClick={()=>setOpen(false)}


className="
fixed
inset-0
z-40
bg-black/50
lg:hidden
"


/>

)

}




<aside


className={`


flex

flex-col


rounded-3xl


p-6


bg-background


border

border-surface-border



fixed


top-0


left-0


z-50



h-screen


w-72



transition-transform


duration-300




${
open

?

'translate-x-0'

:

'-translate-x-full'

}




lg:static


lg:h-screen


lg:w-auto


lg:translate-x-0



`}


>




<div


className="
flex
justify-end
mb-4
lg:hidden
"


>


<button


onClick={()=>setOpen(false)}


className="
rounded-xl
p-2
hover:bg-surface
"


>


<X size={22}/>


</button>


</div>





<div


className="
mb-6
text-center
shrink-0
"


>

<Image

src={profile.avatar_url}

alt={profile.name}

width={90}

height={90}

className="
mx-auto
rounded-full
border
border-surface-border
object-cover
"

/>





<h2 className="mt-4 text-xl font-bold">

{profile.name}

</h2>





<p

className="
mt-1
text-sm
text-muted-foreground
"

>

{

role === 'admin'

?

'Administrator'

:

'Editor'

}


</p>




</div>




<nav


className="
flex-1
overflow-y-auto
hide-scrollbar
space-y-6
pr-1
"


>




<Link


href="/admin"


onClick={()=>setOpen(false)}



className={`


flex

items-center

gap-3

rounded-xl

px-4

py-3

text-sm

transition




${
pathname === '/admin'

?

'bg-accent text-white'

:

'hover:bg-surface'

}



`}



>


<LayoutDashboard size={20}/>


Dashboard


</Link>




{

role === 'admin' && (

<div>



<button


onClick={()=>setContentOpen(!contentOpen)}


className="
flex
w-full
items-center
justify-between
px-4
text-xs
font-semibold
uppercase
text-muted-foreground
"


>


Content



<ChevronDown


size={16}


className={`

transition


${
contentOpen

?

'rotate-180'

:

''

}


`}


/>


</button>







{

contentOpen && (


<div


className="
mt-2
space-y-2
"


>


{

renderLinks(contentLinks)

}


</div>


)

}




</div>


)

}




<div>



<button


onClick={()=>setCommunicationOpen(!communicationOpen)}



className="
flex
w-full
items-center
justify-between
px-4
text-xs
font-semibold
uppercase
text-muted-foreground
"



>


Communication





<ChevronDown


size={16}


className={`


transition


${
communicationOpen

?

'rotate-180'

:

''

}


`}


/>



</button>









{

communicationOpen && (


<div


className="
mt-2
space-y-2
"


>


{

renderLinks(communicationLinks)

}


</div>


)


}




</div>





{

role === 'admin' && (


<div>



<button


onClick={()=>setManagementOpen(!managementOpen)}



className="
flex
w-full
items-center
justify-between
px-4
text-xs
font-semibold
uppercase
text-muted-foreground
"



>


Management






<ChevronDown


size={16}


className={`


transition


${
managementOpen

?

'rotate-180'

:

''

}


`}


/>



</button>







{

managementOpen && (


<div


className="
mt-2
space-y-2
"


>


{

renderLinks(managementLinks)

}



</div>


)


}





</div>



)

}





</nav>




<div


className="
mt-6
shrink-0
"


>


<LogoutButton />


</div>







</aside>






</>

)



}