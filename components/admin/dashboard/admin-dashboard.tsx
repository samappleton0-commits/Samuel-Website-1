import { createClient } from '@/lib/supabase-server'

import Link from 'next/link'

import DashboardSection from './dashboard-section'

import ProfileCard from './profile-card'

import OverviewMetrics from './overview-metrics'

import QuickActions from './quick-actions'

import RecentPosts from './recent-posts'

import RecentContacts from './recent-contacts'

import {

  Mail,

  FileText,

  Zap,

  Globe,

  MessageCircle,

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

}: Props) {



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
  // COMMENTS
  // =====================================================


  const {

    data:comments,

  } = await supabase

    .from('comments')

    .select('*')








  // =====================================================
  // OVERVIEW METRICS
  // =====================================================


  const overviewStats = {


    totalMessages:

      contacts?.length ?? 0,



    unreadMessages:

      contacts?.filter(

        item => !item.read

      ).length ?? 0,




    publishedArticles:

      posts?.filter(

        item => item.status === 'published'

      ).length ?? 0,




    pendingArticles:

      posts?.filter(

        item => item.status === 'pending'

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

        w-full

        min-w-0

        space-y-10

      "


    >








      {/* =====================================================
          PROFILE HEADER
      ===================================================== */}


      <ProfileCard

        user={user}

      />









      {/* =====================================================
          WEBSITE NAVIGATION
      ===================================================== */}



      <div


        className="

          flex

          flex-wrap

          justify-end

          gap-3

        "


      >


<Link

href="/"

className="
flex
items-center
gap-2
rounded-xl
border
px-4
py-2
text-sm
transition
hover:bg-surface
"

>

<Globe size={18}/>

Portfolio Page

</Link>








        <Link


          href="/blog"


          className="

            flex

            items-center

            gap-2

            rounded-xl

            border

            px-4

            py-2

            text-sm

            transition

            hover:bg-surface

          "


        >


          <FileText size={18}/>


          Blog Page


        </Link>





      </div>









      {/* =====================================================
          OVERVIEW METRICS
      ===================================================== */}



      <DashboardSection


        title="Overview Metrics"


        description="Website and communication summary"


        icon={<Mail size={22}/>}


      >


        <OverviewMetrics


          stats={overviewStats}


        />


      </DashboardSection>









      {/* =====================================================
          QUICK ACTIONS
      ===================================================== */}



      <DashboardSection


        title="Quick Actions"


        description="Manage important website features"


        icon={<Zap size={22}/>}


      >


        <QuickActions


          mode="admin"


        />


      </DashboardSection>









      {/* =====================================================
          OVERVIEW PANELS
      ===================================================== */}



      <DashboardSection


        title="Overview Panels"


        description="Recent website activity"


        icon={<MessageCircle size={22}/>}


      >



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



      </DashboardSection>







    </div>


  )


}