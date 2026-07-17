'use client'


import StatCard from './stat-card'





type Props = {

  stats: {

    totalMessages:number

    unreadMessages:number

    publishedArticles:number

    pendingArticles:number

  }

}








export default function OverviewMetrics({

  stats,

}:Props){





const cards = [



  {

    title:'Total Messages',

    value:stats.totalMessages,

    description:'All customer enquiries received',

    href:'/admin/messages',

    icon:'Inbox',

    color:'bg-blue-500/10 text-blue-600',

  },






  {

    title:'Unread Messages',

    value:stats.unreadMessages,

    description:'Messages waiting for review',

    href:'/admin/messages?status=unread',

    icon:'Mail',

    color:'bg-red-500/10 text-red-600',

  },








  {

    title:'Published Articles',

    value:stats.publishedArticles,

    description:'Articles visible on website',

    href:'/admin/blog?status=published',

    icon:'Globe',

    color:'bg-green-500/10 text-green-600',

  },








  {

    title:'Pending Articles',

    value:stats.pendingArticles,

    description:'Articles awaiting approval',

    href:'/admin/blog?status=pending',

    icon:'Clock',

    color:'bg-yellow-500/10 text-yellow-600',

  },




]









return (

<div

className="

grid

grid-cols-1

gap-5

sm:grid-cols-2

xl:grid-cols-4

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