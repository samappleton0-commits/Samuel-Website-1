import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase-server'
import BackToResume from '@/components/admin/back-to-resume'
import SkillsManager from '@/components/admin/skills-manager'


export default async function SkillsPage() {


  const supabase =
    await createClient()



  const {
    data: {
      user,
    },
  } =
  await supabase.auth.getUser()



  if (!user) {

    redirect('/login')

  }






  const {
    data: skills,
    error,
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





  if(error){

    console.error(
      'Skills loading error:',
      error
    )

  }







  return (

    <div className="max-w-6xl">

 <BackToResume />
      <div className="mb-10">


        <h1 className="text-3xl font-bold">

          Skills Management

        </h1>




        <p className="
          mt-2
          text-muted-foreground
        ">

          Add, edit, and manage your professional skills.

        </p>


      </div>





      <SkillsManager

        initialSkills={
          skills ?? []
        }

      />


    </div>

  )

}