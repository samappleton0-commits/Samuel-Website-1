/* =========================================================
   ADMIN PROJECTS PAGE START
========================================================= */


import { redirect } from 'next/navigation'


import { createClient } from '@/lib/supabase-server'


import ProjectManager from '@/components/admin/project-manager'






export default async function ProjectsPage(){



  const supabase =
    await createClient()





  const {
    data:{
      user
    },
  } =
  await supabase.auth.getUser()





  if(!user){

    redirect('/login')

  }








  const {
    data: projects,
    error
  } =
  await supabase

    .from('projects')

    .select('*')

    .order(
      'created_at',
      {
        ascending:false,
      }
    )








  if(error){

    console.error(
      'Projects loading error:',
      error
    )

  }







  return (

    <div className="max-w-6xl">






      <div className="mb-10">



        <h1 className="text-3xl font-bold">

          Projects Management

        </h1>





        <p className="
          mt-2
          text-muted-foreground
        ">

          Add, edit, and manage your portfolio projects.

        </p>




      </div>









      <ProjectManager

        initialProjects={
          projects ?? []
        }

      />








    </div>

  )



}


/* =========================================================
   ADMIN PROJECTS PAGE END
========================================================= */