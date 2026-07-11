import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase-server'
import BackToResume from '@/components/admin/back-to-resume'
import ReferencesManager from '@/components/admin/references-manager'


export default async function ReferencesPage() {


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
    data: references,
    error,
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






  if(error){

    console.error(
      'References loading error:',
      error
    )

  }







  return (

    <div className="max-w-6xl">

 <BackToResume />
      <div className="mb-10">


        <h1 className="text-3xl font-bold">

          References Management

        </h1>



        <p className="
          mt-2
          text-muted-foreground
        ">

          Add, edit, and manage your resume references.

        </p>


      </div>





      <ReferencesManager

        initialReferences={
          references ?? []
        }

      />



    </div>

  )

}