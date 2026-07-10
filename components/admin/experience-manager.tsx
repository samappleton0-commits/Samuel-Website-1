'use client'

import { useState } from 'react'
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
} from 'lucide-react'

import { createClient } from '@/lib/supabase-browser'


type Experience = {
  id: string
  position: string
  company: string
  location: string
  start_date: string
  end_date: string
  description: string | null
}


type Props = {
  initialExperience: Experience[]
}


export default function ExperienceManager({
  initialExperience,
}: Props) {


  const supabase = createClient()


  const [experience, setExperience] =
    useState(initialExperience)


  const [open, setOpen] =
    useState(false)


  const [editing, setEditing] =
    useState<Experience | null>(null)


  const [saving, setSaving] =
    useState(false)



  function createNew() {

    setEditing({

      id: '',

      position: '',

      company: '',

      location: '',

      start_date: '',

      end_date: '',

      description: '',

    })


    setOpen(true)

  }





  function editItem(item: Experience) {

    setEditing(item)

    setOpen(true)

  }






  function updateField(
    field: keyof Experience,
    value: string
  ) {

    if (!editing) return


    setEditing({

      ...editing,

      [field]: value,

    })

  }







  async function saveItem() {


    if (!editing) return


    setSaving(true)



    try {


      if (editing.id) {


        await supabase

          .from('experience')

          .update({

            position: editing.position,

            company: editing.company,

            location: editing.location,

            start_date: editing.start_date,

            end_date: editing.end_date,

            description: editing.description,

          })

          .eq(
            'id',
            editing.id
          )



        setExperience(

          experience.map(item =>

            item.id === editing.id

              ? editing

              : item

          )

        )



      } else {


        const {

          data,

        } = await supabase

          .from('experience')

          .insert({

            position: editing.position,

            company: editing.company,

            location: editing.location,

            start_date: editing.start_date,

            end_date: editing.end_date,

            description: editing.description,

          })

          .select()

          .single()





        if (data) {


          setExperience([

            ...experience,

            data,

          ])

        }


      }





      setOpen(false)

      setEditing(null)



    } finally {


      setSaving(false)


    }


  }








  async function deleteItem(id:string) {


    await supabase

      .from('experience')

      .delete()

      .eq(
        'id',
        id
      )



    setExperience(

      experience.filter(

        item => item.id !== id

      )

    )


  }








  return (

    <div className="space-y-6">


      <button

        onClick={createNew}

        className="
          flex
          items-center
          gap-2
          rounded-xl
          bg-accent
          px-5
          py-3
          text-white
        "

      >

        <Plus size={18}/>

        Add Experience

      </button>





      <div className="space-y-4">


        {

          experience.map(item => (


            <div

              key={item.id}

              className="
                rounded-2xl
                border
                border-border
                bg-card
                p-6
              "

            >


              <h2 className="text-lg font-semibold">

                {item.position}

              </h2>



              <p className="text-muted-foreground">

                {item.company}

              </p>



              <p className="mt-2 text-sm">

                {item.start_date}

                {' - '}

                {item.end_date}

              </p>





              <div className="mt-4 flex gap-3">


                <button

                  onClick={() => editItem(item)}

                  className="
                    flex
                    items-center
                    gap-2
                    rounded-lg
                    border
                    px-4
                    py-2
                  "

                >

                  <Pencil size={16}/>

                  Edit

                </button>





                <button

                  onClick={() => deleteItem(item.id)}

                  className="
                    flex
                    items-center
                    gap-2
                    rounded-lg
                    border
                    px-4
                    py-2
                  "

                >

                  <Trash2 size={16}/>

                  Delete

                </button>



              </div>


            </div>


          ))

        }


      </div>







      {
        open && editing && (

          <div
            className="
              fixed
              inset-0
              z-50
              flex
              items-center
              justify-center
              bg-black/50
              p-4
            "
          >

            <div
              className="
                w-full
                max-w-xl
                rounded-3xl
                bg-background
                p-6
                space-y-4
              "
            >


              <div className="flex justify-between">

                <h2 className="text-xl font-bold">
                  Work Experience
                </h2>


                <button
                  onClick={() => setOpen(false)}
                >

                  <X />

                </button>

              </div>





              {
                [
                  ['position','Position'],
                  ['company','Company / Organization'],
                  ['location','Location'],
                  ['start_date','Start Date'],
                  ['end_date','End Date'],
                ].map(([field,label]) => (


                  <input

                    key={field}

                    value={
                      editing[field as keyof Experience] as string
                    }

                    onChange={(e)=>

                      updateField(

                        field as keyof Experience,

                        e.target.value

                      )

                    }

                    placeholder={label}

                    className="
                      w-full
                      rounded-xl
                      border
                      px-4
                      py-3
                    "

                  />


                ))

              }





              <textarea

                value={
                  editing.description ?? ''
                }

                onChange={(e)=>

                  updateField(
                    'description',
                    e.target.value
                  )

                }

                placeholder="Responsibilities and achievements"

                rows={5}

                className="
                  w-full
                  rounded-xl
                  border
                  px-4
                  py-3
                "

              />






              <button

                onClick={saveItem}

                disabled={saving}

                className="
                  flex
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
                    ? 'Saving...'
                    : 'Save'
                }


              </button>




            </div>

          </div>

        )
      }



    </div>

  )

}