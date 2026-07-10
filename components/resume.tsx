import ResumeClient from '@/components/resume-client'

import {
  getResumeProfile,
} from '@/lib/get-resume-profile'

import {
  createClient,
} from '@/lib/supabase-server'


export async function Resume() {


  const profile =
    await getResumeProfile()



  const supabase =
    await createClient()





  const {
    data: education,
  } =
  await supabase

    .from('education')

    .select('*')

    .order(
      'display_order',
      {
        ascending: true,
      }
    )





  const {
    data: experience,
  } =
  await supabase

    .from('experience')

    .select('*')

    .order(
      'display_order',
      {
        ascending: true,
      }
    )





  const {
    data: skills,
  } =
  await supabase

    .from('skills')

    .select('*')

    .order(
      'display_order',
      {
        ascending: true,
      }
    )







  const {
    data: references,
  } =
  await supabase

    .from('resume_references')

    .select('*')

    .order(
      'display_order',
      {
        ascending: true,
      }
    )






  return (

    <ResumeClient

      profile={profile}

      education={
        education ?? []
      }

      experience={
        experience ?? []
      }

      skills={
        skills ?? []
      }

      references={
        references ?? []
      }

    />

  )

}