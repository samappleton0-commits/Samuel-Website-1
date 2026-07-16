'use client'


import StatCard from './stat-card'



type Props = {

  mode?: 'admin' | 'editor'

  stats: {

    total:number

    published:number

    pending:number

    featured:number

    comments:number

  }

}





export default function ArticleCards({

  mode='admin',

  stats,

}:Props){





const adminCards = [


{

title:'Total Articles',

value:stats.total,

description:'All blog articles created',

href:'/admin/blog',

icon:'FileText',

color:'bg-blue-500/10 text-blue-600',

},



{

title:'Published',

value:stats.published,

description:'Articles visible on website',

href:'/admin/blog?status=published',

icon:'Globe',

color:'bg-green-500/10 text-green-600',

},



{

title:'Pending',

value:stats.pending,

description:'Articles waiting for approval',

href:'/admin/blog?status=pending',

icon:'Clock',

color:'bg-yellow-500/10 text-yellow-600',

},



{

title:'Featured',

value:stats.featured,

description:'Featured blog content',

href:'/admin/blog?featured=true',

icon:'Star',

color:'bg-purple-500/10 text-purple-600',

},



{

title:'Comments',

value:stats.comments,

description:'Reader comments',

href:'/admin/comments',

icon:'MessageCircle',

color:'bg-orange-500/10 text-orange-600',

},



{

title:'Manage Blog',

description:'Create and manage articles',

href:'/admin/blog',

icon:'FilePlus',

color:'bg-cyan-500/10 text-cyan-600',

},



]





const editorCards = [



{

title:'My Articles',

value:stats.total,

description:'Articles you created',

href:'/admin/blog',

icon:'FileText',

color:'bg-blue-500/10 text-blue-600',

},



{

title:'Published',

value:stats.published,

description:'Your published articles',

href:'/admin/blog?status=published',

icon:'Globe',

color:'bg-green-500/10 text-green-600',

},



{

title:'Pending',

value:stats.pending,

description:'Waiting for approval',

href:'/admin/blog?status=pending',

icon:'Clock',

color:'bg-yellow-500/10 text-yellow-600',

},



{

title:'Comments',

value:stats.comments,

description:'Comments on your articles',

href:'/admin/comments',

icon:'MessageCircle',

color:'bg-orange-500/10 text-orange-600',

},



{

title:'Create Article',

description:'Write a new article',

href:'/admin/blog/create',

icon:'FilePlus',

color:'bg-purple-500/10 text-purple-600',

},



]





const cards = mode === 'admin'

? adminCards

: editorCards






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

cards.map((card)=>(


<StatCard

key={card.title}

title={card.title}

value={card.value}

description={card.description}

href={card.href}

icon={card.icon}

color={card.color}

/>


))

}


</div>


)


}