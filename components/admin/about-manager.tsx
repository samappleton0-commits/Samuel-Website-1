'use client'


import { useState } from 'react'

import {
  createClient,
} from '@/lib/supabase-browser'


import {
  Upload,
  Save,
} from 'lucide-react'





export default function AboutManager({

  initialAbout,

}:{

  initialAbout:any

}){


  const supabase =
    createClient()



  const [about,setAbout] =
    useState(initialAbout)



  const [saving,setSaving] =
    useState(false)



  const [message,setMessage] =
    useState('')






  if(!about){

    return (

      <div className="
        rounded-2xl
        border
        p-6
      ">

        No About data found.

      </div>

    )

  }







  async function uploadImage(
    file:File
  ){



    if(about.image_path){

      await supabase.storage

        .from('site-images')

        .remove([
          about.image_path
        ])

    }





    const fileName =
      `about-${Date.now()}-${file.name}`



    const path =
      `about/${fileName}`






    const {
      error
    } =
    await supabase.storage

      .from('site-images')

      .upload(
        path,
        file
      )





    if(error){

      throw error

    }





    const {
      data
    } =
    supabase.storage

      .from('site-images')

      .getPublicUrl(
        path
      )





    return {

      url:data.publicUrl,

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

      .from('about')

      .update({

        eyebrow:
          about.eyebrow,


        title:
          about.title,


        description:
          about.description,


        paragraph_one:
          about.paragraph_one,


        paragraph_two:
          about.paragraph_two,


        highlights:
          about.highlights,


        image_url:
          about.image_url,


        image_path:
          about.image_path,


        updated_at:
          new Date()


      })

      .eq(
        'id',
        about.id
      )






      if(error){

        throw error

      }





      setMessage(
        'About updated successfully.'
      )


    }


    catch(error){


      console.error(error)


      setMessage(
        'Update failed.'
      )


    }


    finally{

      setSaving(false)

    }


  }









  async function handleImageChange(

    e:
    React.ChangeEvent<HTMLInputElement>

  ){


    const file =
      e.target.files?.[0]



    if(!file)
      return




    try{


      const result =
        await uploadImage(file)




      setAbout({

        ...about,


        image_url:
          result.url,


        image_path:
          result.path


      })


    }


    catch(error){

      console.error(error)

      setMessage(
        'Image upload failed.'
      )

    }


  }









  return (

    <div className="
      rounded-3xl
      border
      bg-card
      p-6
      space-y-6
    ">






      <Field

        label="Eyebrow"

        value={about.eyebrow}

        onChange={(value)=>
          setAbout({
            ...about,
            eyebrow:value
          })
        }

      />






      <Field

        label="Title"

        value={about.title}

        onChange={(value)=>
          setAbout({
            ...about,
            title:value
          })
        }

      />






      <Field

        label="Description"

        value={about.description}

        onChange={(value)=>
          setAbout({
            ...about,
            description:value
          })
        }

      />







      <Field

        label="First Paragraph"

        value={about.paragraph_one}

        onChange={(value)=>
          setAbout({
            ...about,
            paragraph_one:value
          })
        }

      />








      <Field

        label="Second Paragraph"

        value={about.paragraph_two}

        onChange={(value)=>
          setAbout({
            ...about,
            paragraph_two:value
          })
        }

      />








      <Field

        label="Highlights (comma separated)"

        value={
          about.highlights.join(',')
        }

        onChange={(value)=>

          setAbout({

            ...about,

            highlights:
              value
              .split(',')
              .map(
                (item:string)=>
                item.trim()
              )

          })

        }

      />









      <div>


        <p className="
          mb-2
          text-sm
          font-medium
        ">

          Profile Image

        </p>



        <label className="
          flex
          cursor-pointer
          items-center
          gap-2
          rounded-xl
          border
          p-4
          hover:bg-surface
        ">


          <Upload size={18}/>


          Upload Image



          <input

            hidden

            type="file"

            accept="image/*"

            onChange={handleImageChange}

          />


        </label>


      </div>









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

  )

}









function Field({

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


<label className="
text-sm
font-medium
">

{label}

</label>


<textarea

value={value ?? ''}

onChange={(e)=>
onChange(
e.target.value
)
}

className="
mt-2
min-h-24
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