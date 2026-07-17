import Link from 'next/link'
import {
 FolderKanban,
} from 'lucide-react'

import {
  Sparkles,
  UserRound,
  FileText,
  Phone,
  PanelBottom,
  Images,
} from 'lucide-react'



const homepageSections = [

  {
    name:'Hero Section',
    description:'Manage your homepage hero banner and introduction.',
    href:'/admin/hero',
    icon:Sparkles,
  },

{
name:'Projects Section',
description:'Manage your portfolio projects.',
href:'/admin/projects',
icon:FolderKanban,
},
  {
    name:'About Section',
    description:'Manage your about information.',
    href:'/admin/about',
    icon:UserRound,
  },


  {
    name:'Resume Section',
    description:'Manage your resume information.',
    href:'/admin/resume',
    icon:FileText,
  },


  {
    name:'Contact Section',
    description:'Manage homepage contact details.',
    href:'/admin/contact',
    icon:Phone,
  },


  {
    name:'Footer Section',
    description:'Manage footer content.',
    href:'/admin/footer',
    icon:PanelBottom,
  },


  {
    name:'Gallery Section',
    description:'Manage homepage gallery images.',
    href:'/admin/gallery',
    icon:Images,
  },


]






export default function HomepageManagerPage(){


return (


<div className="space-y-8">


<div>


<h1 className="text-3xl font-bold">

Homepage Manager

</h1>


<p className="mt-2 text-muted-foreground">

Manage all sections displayed on your homepage.

</p>


</div>







<div className="
grid
gap-6
sm:grid-cols-2
lg:grid-cols-3
">


{

homepageSections.map((section)=>{


const Icon = section.icon



return (


<Link

key={section.name}

href={section.href}

className="
rounded-3xl
border
p-6
transition
hover:shadow-lg
hover:-translate-y-1
"

>


<div className="
flex
items-center
gap-4
">


<div className="
rounded-2xl
bg-accent
p-3
text-white
">


<Icon size={24}/>


</div>


<div>


<h2 className="font-semibold">

{section.name}

</h2>


<p className="text-sm text-muted-foreground">

{section.description}

</p>


</div>


</div>


</Link>


)


})


}


</div>



</div>


)


}