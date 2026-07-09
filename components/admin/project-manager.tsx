/* =========================================================
   PROJECT MANAGER PART 1 START
   Imports, Types & States
========================================================= */

'use client'


import { useState } from 'react'

import {
  Pencil,
  Trash2,
  X,
} from 'lucide-react'


import { toast } from 'sonner'


import {
  createClient,
} from '@/lib/supabase-browser'


import ImageUploader from '@/components/admin/image-uploader'





type Project = {

  id: string

  title: string

  image: string

  description: string

  demo: string

  created_at: string

}





type Props = {

  initialProjects: Project[]

}







export default function ProjectManager({

  initialProjects,

}: Props) {



  const supabase =
    createClient()





  const [projects,setProjects] =
    useState(
      initialProjects
    )





  const [title,setTitle] =
    useState('')





  const [image,setImage] =
    useState('')





  const [description,setDescription] =
    useState('')





  const [demo,setDemo] =
    useState('#')





  const [editingId,setEditingId] =
    useState<string | null>(null)





  const [loading,setLoading] =
    useState(false)


/* =========================================================
   PROJECT MANAGER PART 2 START
   Functions and Database Logic
========================================================= */



function resetForm(){


  setTitle('')

  setImage('')

  setDescription('')

  setDemo('#')

  setEditingId(null)


}







async function deleteStorageImage(
  imageUrl:string
){


  if(!imageUrl) return




  const filePath =
    imageUrl.split(
      '/portfolio-images/'
    )[1]




  if(!filePath){

    console.log(
      'No storage path found'
    )

    return

  }




  const {
    error
  } =
  await supabase.storage
    .from('portfolio-images')
    .remove([
      filePath
    ])




  if(error){

    console.error(
      'Storage delete error:',
      error
    )

  }


}









async function saveProject(){



  if(
    !title ||
    !image ||
    !description
  ){

    toast.error(
      'Please complete all required fields'
    )

    return

  }




  setLoading(true)






  if(editingId){



    const oldProject =
      projects.find(
        p =>
        p.id === editingId
      )





    const {
      data,
      error
    } =
    await supabase
      .from('projects')
      .update({

        title,

        image,

        description,

        demo,

      })
      .eq(
        'id',
        editingId
      )
      .select()
      .single()





    if(error){

      toast.error(
        'Update failed'
      )

      setLoading(false)

      return

    }





    // Remove old image if replaced

    if(
      oldProject?.image &&
      oldProject.image !== image
    ){

      await deleteStorageImage(
        oldProject.image
      )

    }





    setProjects(
      projects.map(
        project =>
        project.id === editingId
        ? data
        : project
      )
    )





    toast.success(
      'Project updated'
    )




  } else {





    const {
      data,
      error
    } =
    await supabase
      .from('projects')
      .insert({

        title,

        image,

        description,

        demo,

      })
      .select()
      .single()





    if(error){

      toast.error(
        'Project creation failed'
      )

      setLoading(false)

      return

    }





    setProjects([
      data,
      ...projects,
    ])





    toast.success(
      'Project added'
    )




  }





  resetForm()

  setLoading(false)



}









function editProject(
  project:Project
){


  setTitle(
    project.title
  )


  setImage(
    project.image
  )


  setDescription(
    project.description
  )


  setDemo(
    project.demo
  )


  setEditingId(
    project.id
  )


}









async function deleteProject(
  id:string
){


  const project =
    projects.find(
      p =>
      p.id === id
    )





  if(
    project?.image
  ){

    await deleteStorageImage(
      project.image
    )

  }






  const {
    error
  } =
  await supabase
    .from('projects')
    .delete()
    .eq(
      'id',
      id
    )





  if(error){

    toast.error(
      'Delete failed'
    )

    return

  }





  setProjects(
    projects.filter(
      project =>
      project.id !== id
    )
  )





  toast.success(
    'Project deleted'
  )


}


/* =========================================================
   PROJECT MANAGER PART 3 START
   User Interface
========================================================= */


return (

  <div className="space-y-8">



    {/* ==========================
        PROJECT FORM
    =========================== */}


    <div
      className="
        rounded-2xl
        border
        border-border
        bg-card
        p-6
      "
    >


      <h2
        className="
          mb-5
          text-xl
          font-semibold
        "
      >

        {
          editingId
          ?
          'Edit Project'
          :
          'Add New Project'
        }

      </h2>





      <div className="space-y-4">





        <input

          value={title}

          onChange={
            e =>
            setTitle(
              e.target.value
            )
          }

          placeholder="Project title"

          className="
            w-full
            rounded-xl
            border
            bg-background
            px-4
            py-3
          "

        />







        <ImageUploader

          value={image}

          onChange={
            setImage
          }

        />







        <textarea


          value={description}


          onChange={
            e =>
            setDescription(
              e.target.value
            )
          }


          placeholder="Project description"


          rows={4}


          className="
            w-full
            rounded-xl
            border
            bg-background
            px-4
            py-3
          "


        />







        <input


          value={demo}


          onChange={
            e =>
            setDemo(
              e.target.value
            )
          }


          placeholder="Live demo URL"


          className="
            w-full
            rounded-xl
            border
            bg-background
            px-4
            py-3
          "


        />







        <div className="flex gap-3">





          <button


            onClick={
              saveProject
            }


            disabled={
              loading
            }


            className="
              rounded-xl
              bg-primary
              px-6
              py-3
              font-semibold
              text-primary-foreground
            "


          >


            {
              loading
              ?
              'Saving...'
              :
              editingId
              ?
              'Update Project'
              :
              'Add Project'
            }


          </button>







          {
            editingId && (

              <button


                onClick={
                  resetForm
                }


                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  px-5
                  py-3
                "


              >

                <X size={18}/>

                Cancel


              </button>


            )
          }





        </div>




      </div>



    </div>









    {/* ==========================
        PROJECT LIST
    =========================== */}



    <div className="space-y-4">



      <h2
        className="
          text-xl
          font-semibold
        "
      >

        Existing Projects

      </h2>







      {
        projects.map(
          project => (


            <div

              key={
                project.id
              }


              className="
                rounded-2xl
                border
                border-border
                bg-card
                p-5
              "


            >





              <div
                className="
                  flex
                  justify-between
                  gap-5
                "
              >





                <div>


                  <h3
                    className="
                      font-semibold
                    "
                  >

                    {
                      project.title
                    }

                  </h3>





                  <p
                    className="
                      mt-2
                      text-sm
                      text-muted-foreground
                    "
                  >

                    {
                      project.description
                    }

                  </p>



                </div>








                <div className="flex gap-2">



                  <button


                    onClick={() =>
                      editProject(
                        project
                      )
                    }


                    className="
                      rounded-lg
                      p-2
                      hover:bg-surface
                    "


                  >


                    <Pencil size={18}/>



                  </button>








                  <button


                    onClick={() =>
                      deleteProject(
                        project.id
                      )
                    }


                    className="
                      rounded-lg
                      p-2
                      text-red-400
                      hover:bg-red-400/10
                    "


                  >


                    <Trash2 size={18}/>


                  </button>





                </div>






              </div>





            </div>


          )

        )
      }





    </div>






  </div>


)


}