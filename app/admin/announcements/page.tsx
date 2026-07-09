import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'

import AnnouncementManager from '@/components/admin/announcement-manager'


export default async function AnnouncementsPage() {

  const supabase = await createClient()


  const {
    data: {
      user,
    },
  } = await supabase.auth.getUser()


  if (!user) {
    redirect('/login')
  }


  const {
    data: announcements,
    error,
  } = await supabase
    .from('site_announcements')
    .select('*')
    .order(
      'created_at',
      {
        ascending: false,
      }
    )


  if (error) {
    console.error(error)
  }


  return (

    <div className="max-w-6xl">


      <div className="mb-10">

        <h1 className="text-3xl font-bold">
          Announcements
        </h1>


        <p className="mt-2 text-muted-foreground">
          Manage messages displayed to your website visitors.
        </p>

      </div>



      <AnnouncementManager
        initialAnnouncements={announcements ?? []}
      />


    </div>

  )
}