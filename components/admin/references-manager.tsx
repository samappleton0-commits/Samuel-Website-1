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


type Reference = {

  id: string

  name: string

  position: string

  organization: string

  location: string

  phone: string

}



type Props = {

  initialReferences: Reference[]

}



export default function ReferencesManager({

  initialReferences,

}: Props) {


  const supabase = createClient()



  const [references, setReferences] =
    useState(initialReferences)



  const [open, setOpen] =
    useState(false)



  const [editing, setEditing] =
    useState<Reference | null>(null)



  const [saving, setSaving] =
    useState(false)







  function addNew(){


    setEditing({

      id:'',

      name:'',

      position:'',

      organization:'',

      location:'',

      phone:'',

    })


    setOpen(true)


  }








  function editReference(item:Reference){


    setEditing(item)

    setOpen(true)


  }








  function updateField(

    field:keyof Reference,

    value:string

  ){


    if(!editing) return



    setEditing({

      ...editing,

      [field]:value,

    })


  }








  async function saveReference(){


    if(!editing) return



    setSaving(true)



    try{



      if(editing.id){



        await supabase

          .from('resume_references')

          .update({

            name:editing.name,

            position:editing.position,

            organization:editing.organization,

            location:editing.location,

            phone:editing.phone,

          })

          .eq(

            'id',

            editing.id

          )





        setReferences(

          references.map(item =>

            item.id === editing.id

            ? editing

            : item

          )

        )



      }

      else {



        const {

          data

        } = await supabase

          .from('resume_references')

          .insert({

            name:editing.name,

            position:editing.position,

            organization:editing.organization,

            location:editing.location,

            phone:editing.phone,

          })

          .select()

          .single()





        if(data){


          setReferences([

            ...references,

            data,

          ])


        }


      }





      setOpen(false)

      setEditing(null)



    }

    finally{


      setSaving(false)


    }


  }









  async function deleteReference(id:string){


    await supabase

      .from('resume_references')

      .delete()

      .eq(

        'id',

        id

      )





    setReferences(

      references.filter(

        item => item.id !== id

      )

    )


  }










  return (

    <div className="space-y-6">





      <button

        onClick={addNew}

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

        Add Reference

      </button>






      <div className="space-y-4">


        {

          references.map(item => (


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

                {item.name}

              </h2>



              <p className="text-accent">

                {item.position}

              </p>



              <p className="text-sm text-muted-foreground">

                {item.organization}

              </p>



              <div className="mt-4 flex gap-3">


                <button

                  onClick={()=>editReference(item)}

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

                  onClick={()=>deleteReference(item.id)}

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


          <div className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/50
            p-4
          ">


            <div className="
              w-full
              max-w-xl
              rounded-3xl
              bg-background
              p-6
              space-y-4
            ">



              <div className="
                flex
                justify-between
              ">


                <h2 className="text-xl font-bold">

                  Reference

                </h2>



                <button
                  onClick={()=>setOpen(false)}
                >

                  <X/>

                </button>


              </div>








              {
                [

                  ['name','Full Name'],

                  ['position','Position'],

                  ['organization','Organization'],

                  ['location','Location'],

                  ['phone','Phone'],


                ].map(([field,label])=>(


                  <input

                    key={field}

                    value={
                      editing[field as keyof Reference] as string
                    }

                    onChange={(e)=>

                      updateField(

                        field as keyof Reference,

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





              <button

                onClick={saveReference}

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