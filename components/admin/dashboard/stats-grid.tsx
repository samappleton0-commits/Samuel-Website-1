'use client'

import Link from 'next/link'

import {
  FileText,
  CheckCircle,
  Clock,
  Star,
  Megaphone,
  Mail,
  Users,
  Settings,
  Globe,
  Briefcase,
  ArrowRight,
} from 'lucide-react'


type Props = {

  stats: {

    articles:number

    published:number

    pending:number

    featured:number

    messages:number

    users:number

  }

}


export default function StatsGrid({

  stats,

}:Props){


const cards = [

  {
    title:'Articles',
    value:stats.articles,
    description:'Manage blog posts',
    href:'/admin/blog',
    icon:FileText,
    color:'bg-blue-500',
  },


  {
    title:'Published',
    value:stats.published,
    description:'Live articles',
    href:'/admin/blog?status=published',
    icon:CheckCircle,
    color:'bg-green-500',
  },


  {
    title:'Pending',
    value:stats.pending,
    description:'Awaiting review',
    href:'/admin/blog?status=pending',
    icon:Clock,
    color:'bg-yellow-500',
  },


  {
    title:'Featured',
    value:stats.featured,
    description:'Featured articles',
    href:'/admin/blog?featured=true',
    icon:Star,
    color:'bg-purple-500',
  },


  {
    title:'Announcements',
    value:null,
    description:'Manage announcements',
    href:'/admin/announcements',
    icon:Megaphone,
    color:'bg-red-500',
  },


  {
    title:'Messages',
    value:stats.messages,
    description:'Contact inbox',
    href:'/admin/messages',
    icon:Mail,
    color:'bg-emerald-500',
  },


  {
    title:'Users',
    value:stats.users,
    description:'Manage users',
    href:'/admin/users',
    icon:Users,
    color:'bg-indigo-500',
  },


  {
    title:'Settings',
    value:null,
    description:'Website configuration',
    href:'/admin/settings',
    icon:Settings,
    color:'bg-slate-500',
  },


  {
    title:'Homepage',
    value:null,
    description:'Visit website',
    href:'/',
    icon:Globe,
    color:'bg-cyan-500',
    external:true,
  },


  {
    title:'Projects',
    value:null,
    description:'Manage projects',
    href:'/admin/projects',
    icon:Briefcase,
    color:'bg-orange-500',
  },


]


return (

<section

className="
grid
gap-5
sm:grid-cols-2
lg:grid-cols-3
xl:grid-cols-5
"

>

{

cards.map((card)=>{


const Icon = card.icon


return (

<Link

key={card.title}

href={card.href}

target={
  card.external
  ? '_blank'
  : undefined
}

rel={
  card.external
  ? 'noopener noreferrer'
  : undefined
}

className="
group
rounded-3xl
border
bg-card
p-6
transition-all
duration-300
hover:-translate-y-1
hover:shadow-xl
"

>

<div

className={`

flex
h-12
w-12
items-center
justify-center
rounded-2xl
text-white
${card.color}

`}

>

<Icon size={24}/>

</div>


<div className="mt-5 flex items-end justify-between">


<div>


{

card.value !== null && (

<p

className="
text-3xl
font-bold
"

>

{card.value}

</p>

)

}


<h3

className="
mt-1
font-semibold
"

>

{card.title}

</h3>


<p

className="
text-sm
text-muted-foreground
"

>

{card.description}

</p>


</div>


<ArrowRight

size={20}

className="
opacity-0
transition
group-hover:opacity-100
"

/>


</div>


</Link>

)


})

}


</section>

)

}