'use client'


import StatCard from './stat-card'





type Props = {

  mode?:'admin'|'editor'

}







export default function QuickActions({

  mode='admin',

}:Props){






const adminActions = [


{

title:'Settings',

description:'Manage website configuration',

href:'/admin/settings',

icon:'Settings',

color:'bg-slate-500/10 text-slate-600',

},



{

title:'Users',

description:'Manage system users',

href:'/admin/users',

icon:'Users',

color:'bg-indigo-500/10 text-indigo-600',

},



{

title:'Manage Website',

description:'Edit website contents',

href:'/admin/homepage',

icon:'Globe',

color:'bg-cyan-500/10 text-cyan-600',

},



{

title:'Comments',

description:'Review visitor comments',

href:'/admin/comments',

icon:'MessageCircle',

color:'bg-orange-500/10 text-orange-600',

},



]








const editorActions = [



{

title:'Create Article',

description:'Write new blog post',

href:'/admin/blog/create',

icon:'FilePlus',

color:'bg-green-500/10 text-green-600',

},




{

title:'My Articles',

description:'Manage your articles',

href:'/admin/blog',

icon:'FileText',

color:'bg-blue-500/10 text-blue-600',

},




{

title:'Comments',

description:'View comments',

href:'/admin/comments',

icon:'MessageCircle',

color:'bg-orange-500/10 text-orange-600',

},




{

title:'Profile',

description:'Update account',

href:'/admin/settings/profile',

icon:'UserCog',

color:'bg-purple-500/10 text-purple-600',

},



]







const actions = mode === 'admin'

?

adminActions

:

editorActions







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

actions.map(action=>(


<StatCard

key={action.title}

{...action}

/>


))


}



</div>


)


}