'use client'


import StatCard from './stat-card'



type Props = {

  stats: {

    total:number

    unread:number

    completed:number

    newMessages:number

    important:number

  }

}




export default function MessageCards({

  stats,

}:Props){



const cards = [

  {

    title:'Total Messages',

    value:stats.total,

    description:'All contact submissions',

    href:'/admin/messages',

    icon:'Inbox',

    color:'bg-blue-500/10 text-blue-600',

  },


  {

    title:'Unread',

    value:stats.unread,

    description:'Messages waiting for review',

    href:'/admin/messages?status=unread',

    icon:'Mail',

    color:'bg-red-500/10 text-red-600',

  },


  {

    title:'Completed',

    value:stats.completed,

    description:'Resolved conversations',

    href:'/admin/messages?status=completed',

    icon:'CheckCircle',

    color:'bg-green-500/10 text-green-600',

  },


  {

    title:'New',

    value:stats.newMessages,

    description:'Recently received',

    href:'/admin/messages?status=new',

    icon:'MailOpen',

    color:'bg-purple-500/10 text-purple-600',

  },


  {

    title:'Important',

    value:stats.important,

    description:'Marked important',

    href:'/admin/messages?important=true',

    icon:'Star',

    color:'bg-yellow-500/10 text-yellow-600',

  },


  {

    title:'Inbox',

    description:'Open message center',

    href:'/admin/messages',

    icon:'Clock',

    color:'bg-cyan-500/10 text-cyan-600',

  },


]





return (

<div
className="
grid
grid-cols-2
gap-5
sm:grid-cols-3
lg:grid-cols-4
xl:grid-cols-6
"

>


{

cards.map(card=>(


<StatCard

key={card.title}

{...card}

/>


))

}


</div>


)


}