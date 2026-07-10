'use client'


import { useState } from 'react'

import {
  createClient,
} from '@/lib/supabase-browser'


import {
  Save,
} from 'lucide-react'





type Props = {

  initialContact:any

}





export default function ContactManager({

  initialContact,

}:Props){



  const supabase =
    createClient()



  const [contact,setContact] =
    useState(initialContact)



  const [saving,setSaving] =
    useState(false)



  const [message,setMessage] =
    useState('')







  function updateField(

    field:string,

    value:string

  ){


    setContact({

      ...contact,

      [field]:value

    })


  }









  async function saveContact(){


    try{


      setSaving(true)

      setMessage('')



      const {
        error
      } = await supabase

      .from('contact')

      .update({

        eyebrow:
          contact.eyebrow,


        title:
          contact.title,


        description:
          contact.description,


        email:
          contact.email,


        phone:
          contact.phone,


        location:
          contact.location,


        facebook:
          contact.facebook,


        whatsapp:
          contact.whatsapp,


        updated_at:
          new Date(),


      })

      .eq(

        'id',

        contact.id

      )





      if(error){

        throw error

      }




      setMessage(
        'Contact updated successfully.'
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

        value={contact.eyebrow}

        onChange={(v)=>
          updateField(
            'eyebrow',
            v
          )
        }

      />






      <Field

        label="Title"

        value={contact.title}

        onChange={(v)=>
          updateField(
            'title',
            v
          )
        }

      />






      <Field

        label="Description"

        value={contact.description}

        onChange={(v)=>
          updateField(
            'description',
            v
          )
        }

      />







      <Field

        label="Email"

        value={contact.email}

        onChange={(v)=>
          updateField(
            'email',
            v
          )
        }

      />






      <Field

        label="Phone"

        value={contact.phone}

        onChange={(v)=>
          updateField(
            'phone',
            v
          )
        }

      />






      <Field

        label="Location"

        value={contact.location}

        onChange={(v)=>
          updateField(
            'location',
            v
          )
        }

      />






      <Field

        label="Facebook URL"

        value={contact.facebook}

        onChange={(v)=>
          updateField(
            'facebook',
            v
          )
        }

      />






      <Field

        label="WhatsApp"

        value={contact.whatsapp}

        onChange={(v)=>
          updateField(
            'whatsapp',
            v
          )
        }

      />







      <button

        onClick={saveContact}

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

onChange:(v:string)=>void

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