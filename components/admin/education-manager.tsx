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


type Education = {
  id: string
  institution: string
  qualification: string
  location: string
  start_date: string
  end_date: string
  description: string | null
}


type Props = {
  initialEducation: Education[]
}


export default function EducationManager({
  initialEducation,
}: Props) {


  const supabase = createClient()


  const [education, setEducation] =
    useState(initialEducation)


  const [open, setOpen] =
    useState(false)


  const [editing, setEditing] =
    useState<Education | null>(null)


  const [saving, setSaving] =
    useState(false)



  function resetForm(){

    setEditing({
      id:'',
      institution:'',
      qualification:'',
      location:'',
      start_date:'',
      end_date:'',
      description:'',
    })

    setOpen(true)

  }




  function editItem(item:Education){

    setEditing(item)

    setOpen(true)

  }





  async function saveItem(){


    if(!editing) return


    try{


      setSaving(true)


      if(editing.id){


        await supabase
          .from('education')
          .update({
            institution: editing.institution,
            qualification: editing.qualification,
            location: editing.location,
            start_date: editing.start_date,
            end_date: editing.end_date,
            description: editing.description,
          })
          .eq(
            'id',
            editing.id
          )


      }else{


        const {data} =
          await supabase
          .from('education')
          .insert({
            institution: editing.institution,
            qualification: editing.qualification,
            location: editing.location,
            start_date: editing.start_date,
            end_date: editing.end_date,
            description: editing.description,
          })
          .select()
          .single()


        if(data){

          setEducation([
            ...education,
            data
          ])

        }

      }


      setOpen(false)

      setEditing(null)


    }finally{

      setSaving(false)

    }


  }





  async function deleteItem(id:string){


    await supabase
      .from('education')
      .delete()
      .eq(
        'id',
        id
      )


    setEducation(
      education.filter(
        item=>item.id!==id
      )
    )

  }





  function updateField(
    field:keyof Education,
    value:string
  ){

    if(!editing) return


    setEditing({

      ...editing,

      [field]:value

    })

  }




  return (

    <div className="space-y-6">


      <button

        onClick={resetForm}

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

        Add Education

      </button>





      <div className="space-y-4">


        {
          education.map((item)=>(


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

                {item.qualification}

              </h2>


              <p className="text-muted-foreground">

                {item.institution}

              </p>


              <p className="mt-2 text-sm">

                {item.start_date}
                {' - '}
                {item.end_date}

              </p>



              <div className="mt-4 flex gap-3">


                <button

                  onClick={()=>editItem(item)}

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

                  onClick={()=>deleteItem(item.id)}

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
                  Education
                </h2>


                <button
                  onClick={()=>{
                    setOpen(false)
                  }}
                >

                  <X/>

                </button>

              </div>



              {
                [
                  ['institution','Institution'],
                  ['qualification','Qualification'],
                  ['location','Location'],
                  ['start_date','Start Date'],
                  ['end_date','End Date'],
                ].map(([field,label])=>(

                  <input

                    key={field}

                    value={
                      editing[field as keyof Education] as string
                    }

                    onChange={(e)=>
                      updateField(
                        field as keyof Education,
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

                placeholder="Description"

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
                  ?
                  'Saving...'
                  :
                  'Save'
                }

              </button>



            </div>

          </div>

        )
      }


    </div>

  )

}