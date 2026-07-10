import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase-server'

import ExperienceManager from '@/components/admin/experience-manager'


export default async function ExperiencePage() {


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
    data: experience,
    error,
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





  if(error){

    console.error(
      'Experience loading error:',
      error
    )

  }





  return (

    <div className="max-w-6xl">


      <div className="mb-10">


        <h1 className="text-3xl font-bold">

          Work Experience Management

        </h1>




        <p className="
          mt-2
          text-muted-foreground
        ">

          Add, edit, and manage your professional work history.

        </p>


      </div>





      <ExperienceManager

        initialExperience={
          experience ?? []
        }

      />



    </div>

  )

}