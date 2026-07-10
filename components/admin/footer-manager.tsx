'use client'


import { useState } from 'react'


import {
  createClient,
} from '@/lib/supabase-browser'


import {
  Save,
} from 'lucide-react'





type Props = {

  initialFooter:any

}







export default function FooterManager({

  initialFooter,

}:Props){



  const supabase =
    createClient()



  const [footer,setFooter] =
    useState(initialFooter)



  const [saving,setSaving] =
    useState(false)



  const [message,setMessage] =
    useState('')








  function updateField(

    field:string,

    value:string

  ){


    setFooter({

      ...footer,

      [field]:value,

    })


  }










  async function saveFooter(){


    try{


      setSaving(true)

      setMessage('')



      const {

        error

      } = await supabase

        .from('footer')

        .update({


          brand_name:
            footer.brand_name,


          copyright_name:
            footer.copyright_name,


          developer_credit:
            footer.developer_credit,


          email:
            footer.email,


          facebook:
            footer.facebook,


          whatsapp:
            footer.whatsapp,


          updated_at:
            new Date(),


        })


        .eq(

          'id',

          footer.id

        )








      if(error){

        throw error

      }





      setMessage(
        'Footer updated successfully.'
      )



    }

    catch(error){


      console.error(error)


      setMessage(
        'Unable to update footer.'
      )


    }


    finally{


      setSaving(false)


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

        label="Brand Name"

        value={footer.brand_name}

        onChange={(value)=>

          updateField(
            'brand_name',
            value
          )

        }

      />








      <Field

        label="Copyright Name"

        value={footer.copyright_name}

        onChange={(value)=>

          updateField(
            'copyright_name',
            value
          )

        }

      />








      <Field

        label="Developer Credit"

        value={footer.developer_credit}

        onChange={(value)=>

          updateField(
            'developer_credit',
            value
          )

        }

      />








      <Field

        label="Email"

        value={footer.email}

        onChange={(value)=>

          updateField(
            'email',
            value
          )

        }

      />








      <Field

        label="Facebook URL"

        value={footer.facebook}

        onChange={(value)=>

          updateField(
            'facebook',
            value
          )

        }

      />








      <Field

        label="WhatsApp URL"

        value={footer.whatsapp}

        onChange={(value)=>

          updateField(
            'whatsapp',
            value
          )

        }

      />









      <button

        onClick={saveFooter}

        disabled={saving}

        className="
          inline-flex
          items-center
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
block
text-sm
font-medium
">

{label}

</label>



<input

value={value ?? ''}

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