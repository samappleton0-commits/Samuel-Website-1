'use client'

import { useState } from 'react'

import {
  createClient,
} from '@/lib/supabase-browser'


import {
  Upload,
  Save,
} from 'lucide-react'



type HeroData = {

  id: string

  name: string

  roles: string[]

  intro: string

  availability: string

  hero_image: string | null

  hero_image_path: string | null

  background_image: string | null

  background_image_path: string | null

  resume_pdf: string | null

  resume_pdf_path: string | null

  experience_number: string

  experience_label: string

  projects_number: string

  projects_label: string

  primary_button_text: string

  primary_button_link: string

  secondary_button_text: string

  secondary_button_link: string

}




export default function HeroManager({

  initialHero,

}:{

  initialHero: HeroData | null

}){


  const supabase =
    createClient()



  const [hero,setHero] =
    useState<HeroData | null>(
      initialHero
    )



  const [saving,setSaving] =
    useState(false)



  const [message,setMessage] =
    useState('')





  if(!hero){

    return (

      <div className="
        rounded-2xl
        border
        p-6
      ">

        No Hero data found.

      </div>

    )

  }








  async function uploadFile(

    file:File,

    folder:string,

    oldPath:string | null

  ){



    if(oldPath){

      await supabase.storage
        .from('site-images')
        .remove([
          oldPath
        ])

    }





    const extension =
      file.name.split('.').pop()



    const fileName =
      `${Date.now()}.${extension}`



    const path =
      `${folder}/${fileName}`





    const {
      error
    } =
    await supabase.storage

      .from(
        folder === 'resume'
        ?
        'documents'
        :
        'site-images'
      )

      .upload(
        path,
        file,
        {
          upsert:false
        }
      )





    if(error){

      throw error

    }





    const {
      data
    } =
    supabase.storage

      .from(
        folder === 'resume'
        ?
        'documents'
        :
        'site-images'
      )

      .getPublicUrl(
        path
      )





    return {

      url:
        data.publicUrl,

      path

    }


  }








  async function handleSave(){


    try{


      setSaving(true)

      setMessage('')




      const {
        error
      } =
      await supabase

        .from('hero')

        .update({

          name:
            hero.name,


          roles:
            hero.roles,


          intro:
            hero.intro,


          availability:
            hero.availability,


          experience_number:
            hero.experience_number,


          experience_label:
            hero.experience_label,


          projects_number:
            hero.projects_number,


          projects_label:
            hero.projects_label,


          primary_button_text:
            hero.primary_button_text,


          primary_button_link:
            hero.primary_button_link,


          secondary_button_text:
            hero.secondary_button_text,


          secondary_button_link:
            hero.secondary_button_link,


          hero_image:
            hero.hero_image,


          hero_image_path:
            hero.hero_image_path,


          background_image:
            hero.background_image,


          background_image_path:
            hero.background_image_path,


          resume_pdf:
            hero.resume_pdf,


          resume_pdf_path:
            hero.resume_pdf_path,


          updated_at:
            new Date()



        })

        .eq(
          'id',
          hero.id
        )





      if(error){

        throw error

      }





      setMessage(
        'Hero updated successfully.'
      )


    }


    catch(error){


      console.error(error)


      setMessage(
        'Something went wrong.'
      )


    }


    finally{

      setSaving(false)

    }


  }









  async function handleUpload(

    e:
    React.ChangeEvent<HTMLInputElement>,

    type:
    'hero' |
    'background' |
    'resume'

  ){



    const file =
      e.target.files?.[0]



    if(!file)
      return




    try{


      const result =
        await uploadFile(

          file,

          type === 'resume'
          ?
          'resume'
          :
          `hero/${type}`,

          type === 'hero'
          ?
          hero.hero_image_path
          :
          type === 'background'
          ?
          hero.background_image_path
          :
          hero.resume_pdf_path

        )





      setHero({

        ...hero,


        ...(type === 'hero' && {

          hero_image:
            result.url,

          hero_image_path:
            result.path,

        }),



        ...(type === 'background' && {

          background_image:
            result.url,


          background_image_path:
            result.path,

        }),



        ...(type === 'resume' && {

          resume_pdf:
            result.url,


          resume_pdf_path:
            result.path,

        }),


      })



    }


    catch(error){

      console.error(error)

      setMessage(
        'Upload failed.'
      )

    }


  }









  return (

    <div className="space-y-8">





      <div className="
        grid
        gap-6
        rounded-3xl
        border
        bg-card
        p-6
      ">




        <Input

          label="Name"

          value={hero.name}

          onChange={(value)=>
            setHero({
              ...hero,
              name:value
            })
          }

        />





        <Input

          label="Introduction"

          value={hero.intro}

          onChange={(value)=>
            setHero({
              ...hero,
              intro:value
            })
          }

        />





        <Input

          label="Availability"

          value={hero.availability}

          onChange={(value)=>
            setHero({
              ...hero,
              availability:value
            })
          }

        />





        <Input

          label="Roles (separate with comma)"

          value={
            hero.roles.join(',')
          }

          onChange={(value)=>
            setHero({

              ...hero,

              roles:
                value.split(',')

            })
          }

        />






        <div className="grid sm:grid-cols-2 gap-5">


          <Input

            label="Experience Number"

            value={hero.experience_number}

            onChange={(value)=>
              setHero({
                ...hero,
                experience_number:value
              })
            }

          />



          <Input

            label="Experience Label"

            value={hero.experience_label}

            onChange={(value)=>
              setHero({
                ...hero,
                experience_label:value
              })
            }

          />


        </div>





        <div className="grid sm:grid-cols-2 gap-5">


          <Input

            label="Projects Number"

            value={hero.projects_number}

            onChange={(value)=>
              setHero({
                ...hero,
                projects_number:value
              })
            }

          />



          <Input

            label="Projects Label"

            value={hero.projects_label}

            onChange={(value)=>
              setHero({
                ...hero,
                projects_label:value
              })
            }

          />


        </div>








        <UploadBox

          label="Hero Image"

          onUpload={(e)=>
            handleUpload(
              e,
              'hero'
            )
          }

        />




        <UploadBox

          label="Background Image"

          onUpload={(e)=>
            handleUpload(
              e,
              'background'
            )
          }

        />




        <UploadBox

          label="Resume PDF"

          onUpload={(e)=>
            handleUpload(
              e,
              'resume'
            )
          }

        />







        <button

          onClick={handleSave}

          disabled={saving}

          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-accent
            px-5
            py-3
            text-white
          "

        >

          <Save size={18}/>

          {
            saving
            ?
            'Saving...'
            :
            'Save Changes'
          }


        </button>





        {
          message && (

            <p className="text-sm">

              {message}

            </p>

          )
        }





      </div>


    </div>

  )


}









function Input({

label,

value,

onChange,

}:{

label:string

value:string

onChange:(value:string)=>void

}){


return (

<div>


<label className="text-sm font-medium">

{label}

</label>


<input

value={value}

onChange={(e)=>
onChange(
e.target.value
)
}

className="
mt-2
w-full
rounded-xl
border
bg-background
px-4
py-3
"

/>


</div>

)


}








function UploadBox({

label,

onUpload,

}:{

label:string

onUpload:
(e:React.ChangeEvent<HTMLInputElement>)=>void

}){


return (

<div>

<p className="mb-2 text-sm font-medium">

{label}

</p>


<label
className="
flex
cursor-pointer
items-center
gap-2
rounded-xl
border
p-4
hover:bg-surface
"
>


<Upload size={18}/>


Upload File


<input

type="file"

hidden

onChange={onUpload}

/>


</label>


</div>

)

}