import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase-server'

import ResumeProfileManager from '@/components/admin/resume-profile-manager'

export default async function ResumeProfilePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile, error } = await supabase
    .from('resume_profile')
    .select('*')
    .single()

  if (error) {
    console.error('Resume Profile Error:', error)
  }

  return (
    <div className="max-w-5xl">

      <div className="mb-10">

        <h1 className="text-3xl font-bold">
          Personal Information
        </h1>

        <p className="mt-2 text-muted-foreground">
          Update your personal details and career objective.
        </p>

      </div>

      <ResumeProfileManager
        initialProfile={
          profile ?? {
            id: '',
            full_name: '',
            professional_title: '',
            address: '',
            email: '',
            phone_one: '',
            phone_two: '',
            objective: '',
          }
        }
      />

    </div>
  )
}