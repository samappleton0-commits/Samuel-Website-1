import { createClient } from '@/lib/supabase-server'


import DashboardSection from './dashboard-section'

import ProfileCard from './profile-card'

import MessageCards from './message-cards'

import ArticleCards from './article-cards'

import QuickActions from './quick-actions'

import RecentPosts from './recent-posts'

import RecentContacts from './recent-contacts'


import {

  Mail,

  FileText,

  Zap,

} from 'lucide-react'



type Props = {

  user: {

    id:string

    user_id:string

    name:string

    email:string

    role:string

    avatar_url?:string|null

  }

}





export default async function AdminDashboard({

  user,

}:Props){


const supabase = await createClient()



// =====================================================
// BLOG POSTS
// =====================================================


const {

  data:posts,

} = await supabase

.from('blog_posts')

.select('*')

.order(

'created_at',

{

ascending:false

}

)




// =====================================================
// CONTACTS
// =====================================================


const {

 data:contacts,

} = await supabase

.from('contacts')

.select('*')

.order(

'created_at',

{

ascending:false

}

)




// =====================================================
// USERS
// =====================================================


const {

 data:users,

} = await supabase

.from('admin_users')

.select('*')





// =====================================================
// COMMENTS
// =====================================================


const {

 data:comments,

} = await supabase

.from('comments')

.select('*')





// =====================================================
// MESSAGE STATS
// =====================================================


const messageStats = {


 total:

 contacts?.length ?? 0,


 unread:

 contacts?.filter(

 item => !item.read

 ).length ?? 0,



 completed:

 contacts?.filter(

 item => item.status === 'completed'

 ).length ?? 0,



 newMessages:

 contacts?.filter(

 item => item.status === 'new'

 ).length ?? 0,



 important:

 contacts?.filter(

 item => item.important === true

 ).length ?? 0,


}





// =====================================================
// ARTICLE STATS
// =====================================================


const articleStats = {


 total:

 posts?.length ?? 0,



 published:

 posts?.filter(

 item => item.status === 'published'

 ).length ?? 0,



 pending:

 posts?.filter(

 item => item.status === 'pending'

 ).length ?? 0,



 featured:

 posts?.filter(

 item => item.featured === true

 ).length ?? 0,



 comments:

 comments?.length ?? 0,


}





return (

<div

className="
space-y-10
"

>


{/* HEADER */}

<ProfileCard

user={user}

/>





{/* MESSAGE SECTION */}


<DashboardSection

title="Messages"

description="Manage customer enquiries and communication"

icon={<Mail size={22}/>}

>


<MessageCards

stats={messageStats}

/>


</DashboardSection>







{/* ARTICLE SECTION */}


<DashboardSection

title="Articles"

description="Manage website blog content"

icon={<FileText size={22}/>}

>


<ArticleCards

mode="admin"

stats={articleStats}

/>


</DashboardSection>








{/* QUICK ACTIONS */}



<DashboardSection

title="Quick Actions"

description="Manage website features"

icon={<Zap size={22}/>}

>


<QuickActions

mode="admin"

/>


</DashboardSection>








{/* RECENT CONTENT */}



<div

className="
grid
gap-6
xl:grid-cols-2
"

>


<RecentContacts

contacts={contacts ?? []}

/>



<RecentPosts

posts={posts ?? []}

/>


</div>





</div>

)


}