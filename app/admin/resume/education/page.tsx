import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase-server'
import BackToResume from '@/components/admin/back-to-resume'

import EducationManager from '@/components/admin/education-manager'


export default async function EducationPage() {


  const supabase =
    await createClient()


  const {
    data: {
      user
    },
  } =
  await supabase.auth.getUser()



  if (!user) {

    redirect('/login')

  }





  const {
    data: education,
    error,
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





  if(error){

    console.error(
      'Education loading error:',
      error
    )

  }






  return (

    <div className="max-w-6xl">


      <div className="mb-10">
 <BackToResume />

        <h1 className="text-3xl font-bold">

          Education Management

        </h1>



        <p className="
          mt-2
          text-muted-foreground
        ">

          Add, edit, and manage your academic background and certifications.

        </p>


      </div>




      <EducationManager

        initialEducation={
          education ?? []
        }

      />



    </div>
    

  )

}