/* =========================================================
   PART 1 START
   Image Uploader Component
========================================================= */

'use client'

import { useState } from 'react'
import Image from 'next/image'
import { UploadCloud, X } from 'lucide-react'
import { toast } from 'sonner'

import { createClient } from '@/lib/supabase-browser'


type Props = {
  value: string
  onChange: (url: string) => void
}



export default function ImageUploader({
  value,
  onChange,
}: Props) {


  const supabase = createClient()


  const [preview, setPreview] =
    useState(value)


  const [uploading, setUploading] =
    useState(false)





  async function uploadImage(
    file: File
  ) {


    if (!file.type.startsWith('image/')) {

      toast.error(
        'Please select an image file'
      )

      return

    }



    if (file.size > 2 * 1024 * 1024) {

      toast.error(
        'Image must be smaller than 2MB'
      )

      return

    }





    setUploading(true)



    const fileExtension =
      file.name.split('.').pop()



    const fileName =
      `projects/${Date.now()}.${fileExtension}`






    const {
      error,
    } =
      await supabase.storage
        .from('portfolio-images')
        .upload(
          fileName,
          file
        )





    if(error){

      toast.error(
        'Image upload failed'
      )

      setUploading(false)

      return

    }





    const {
      data,
    } =
      supabase.storage
        .from('portfolio-images')
        .getPublicUrl(
          fileName
        )





    setPreview(
      data.publicUrl
    )


    onChange(
      data.publicUrl
    )



    toast.success(
      'Image uploaded'
    )


    setUploading(false)


  }







  function removeImage(){


    setPreview('')

    onChange('')


  }








  return (

    <div className="space-y-4">


      <label

        className="
          flex
          cursor-pointer
          flex-col
          items-center
          justify-center
          rounded-2xl
          border
          border-dashed
          border-border
          p-8
          transition
          hover:bg-surface
        "

      >


        <UploadCloud
          size={35}
        />


        <p className="mt-3 text-sm">

          {
            uploading
            ?
            'Uploading...'
            :
            'Click to upload image'
          }

        </p>



        <p className="
          mt-1
          text-xs
          text-muted-foreground
        ">

          JPG, PNG, WEBP (Max 2MB)

        </p>




        <input

          type="file"

          accept="image/*"

          className="hidden"

          onChange={(e)=>{

            const file =
              e.target.files?.[0]


            if(file){

              uploadImage(file)

            }

          }}

        />



      </label>






      {
        preview && (

          <div className="
            relative
            overflow-hidden
            rounded-2xl
            border
            border-border
          ">


            <Image

              src={preview}

              alt="Preview"

              width={600}

              height={400}

              className="
                h-56
                w-full
                object-cover
              "

            />



            <button

              type="button"

              onClick={removeImage}

              className="
                absolute
                right-3
                top-3
                rounded-full
                bg-black/60
                p-2
                text-white
              "

            >

              <X size={18}/>


            </button>



          </div>

        )
      }



    </div>

  )

}


/* =========================================================
   PART 1 END
========================================================= */