
'use client'

import { useMemo, useState } from 'react'

import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  ArrowUp,
  ArrowDown,
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

  display_order: number

}



type Props = {

  initialEducation: Education[]

}



export default function EducationManager({

  initialEducation,

}: Props) {


  const supabase = createClient()



  const [education, setEducation] =

    useState<Education[]>(initialEducation)



  const [open, setOpen] =

    useState(false)



  const [editing, setEditing] =

    useState<Education | null>(null)



  const [saving, setSaving] =

    useState(false)



  const [message, setMessage] =

    useState('')





  const sortedEducation = useMemo(() => {


    return [...education].sort(

      (a, b) =>

        a.display_order - b.display_order

    )


  }, [education])





  function resetForm() {


    setEditing({

      id: '',

      institution: '',

      qualification: '',

      location: '',

      start_date: '',

      end_date: '',

      description: '',

     display_order:
  Math.max(
    ...education.map(
      item => item.display_order
    ),
    0
  ) + 1,

    })


    setOpen(true)


  }







  function editItem(item: Education) {


    setEditing(item)


    setOpen(true)


  }







  function updateField(

    field: keyof Education,

    value: string

  ) {


    if (!editing) return



    setEditing({

      ...editing,

      [field]: value,

    })


  }

// =====================================================
// EDUCATION MANAGER
// PART 2/4
// CRUD + Ordering Functions
// =====================================================


  async function saveItem() {


    if (!editing) return



    try {


      setSaving(true)



      if (editing.id) {


        const { error } =

          await supabase

            .from('education')

            .update({

              institution:
                editing.institution,

              qualification:
                editing.qualification,

              location:
                editing.location,

              start_date:
                editing.start_date,

              end_date:
                editing.end_date,

              description:
                editing.description,

              display_order:
                editing.display_order,

            })

            .eq(

              'id',

              editing.id

            )



        if (error)

          throw error




        setEducation(current =>

          current.map(item =>

            item.id === editing.id

              ? editing

              : item

          )

        )



        setMessage(
          'Education updated successfully.'
        )



      } else {


        const { data, error } =

          await supabase

            .from('education')

            .insert({

              institution:
                editing.institution,

              qualification:
                editing.qualification,

              location:
                editing.location,

              start_date:
                editing.start_date,

              end_date:
                editing.end_date,

              description:
                editing.description,

              display_order:
                editing.display_order,

            })

            .select()

            .single()




        if (error)

          throw error




        if (data) {


          setEducation(current => [

            ...current,

            data,

          ])


        }



        setMessage(
          'Education added successfully.'
        )


      }



      setOpen(false)


      setEditing(null)



    } catch (error) {


      console.error(error)


      setMessage(
        'Something went wrong while saving.'
      )



    } finally {


      setSaving(false)


    }


  }







  async function deleteItem(id: string) {


    const confirmDelete =

      window.confirm(

        'Are you sure you want to delete this education record?'

      )



    if (!confirmDelete)

      return





    const { error } =

      await supabase

        .from('education')

        .delete()

        .eq(

          'id',

          id

        )





    if (error) {


      console.error(error)


      setMessage(
        'Unable to delete education.'
      )


      return

    }





    setEducation(current =>

      current.filter(item =>

        item.id !== id

      )

    )



    setMessage(
      'Education deleted successfully.'
    )


  }







  async function moveUp(index: number) {


    if (index === 0)

      return





    const items = [...sortedEducation]



    const current = items[index]


    const previous = items[index - 1]





    const temp =

      current.display_order





    current.display_order =

      previous.display_order





    previous.display_order =

      temp






    setEducation(items)





    await supabase

      .from('education')

      .upsert([

        {

          id: current.id,

          display_order:
            current.display_order,

        },

        {

          id: previous.id,

          display_order:
            previous.display_order,

        },

      ])




  }







  async function moveDown(index: number) {


    if (

      index ===

      sortedEducation.length - 1

    )

      return





    const items = [...sortedEducation]



    const current = items[index]


    const next = items[index + 1]





    const temp =

      current.display_order





    current.display_order =

      next.display_order





    next.display_order =

      temp






    setEducation(items)





    await supabase

      .from('education')

      .upsert([

        {

          id: current.id,

          display_order:
            current.display_order,

        },

        {

          id: next.id,

          display_order:
            next.display_order,

        },

      ])




    setMessage(
      'Education order updated.'
    )


  }

// =====================================================
// EDUCATION MANAGER
// PART 3/4
// Main UI
// =====================================================


  return (

    <div className="space-y-6">


      {
        message && (

          <div
            className="
              rounded-xl
              border
              border-green-500/20
              bg-green-500/10
              px-4
              py-3
              text-sm
              text-green-700
            "
          >

            {message}

          </div>

        )
      }





      <div className="
        flex
        items-center
        justify-between
        gap-4
      ">


        <div>


          <h2 className="
            text-2xl
            font-bold
          ">

            Education

          </h2>



          <p className="
            text-sm
            text-muted-foreground
          ">

            Manage your education background.

          </p>


        </div>





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


      </div>







      <div className="space-y-5">


        {
          sortedEducation.map(

            (item,index)=>(


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



                <h3 className="
                  text-xl
                  font-semibold
                ">

                  {item.qualification}

                </h3>





                <p className="
                  mt-1
                  text-muted-foreground
                ">

                  {item.institution}

                </p>





                <p className="
                  mt-1
                  text-sm
                ">

                  {item.location}

                </p>





                <p className="
                  mt-2
                  text-sm
                ">

                  {item.start_date}

                  {' - '}

                  {item.end_date}


                </p>





                {
                  item.description && (

                    <p className="
                      mt-4
                      whitespace-pre-line
                      text-sm
                      text-muted-foreground
                    ">

                      {item.description}

                    </p>

                  )
                }







                <div className="
                  mt-6
                  flex
                  flex-wrap
                  gap-3
                ">



                  <button

                    onClick={()=>
                      moveUp(index)
                    }

                    disabled={index===0}

                    className="
                      flex
                      items-center
                      gap-2
                      rounded-lg
                      border
                      px-4
                      py-2
                      disabled:opacity-40
                    "

                  >

                    <ArrowUp size={16}/>

                    Up


                  </button>







                  <button

                    onClick={()=>
                      moveDown(index)
                    }

                    disabled={
                      index ===
                      sortedEducation.length - 1
                    }

                    className="
                      flex
                      items-center
                      gap-2
                      rounded-lg
                      border
                      px-4
                      py-2
                      disabled:opacity-40
                    "

                  >

                    <ArrowDown size={16}/>

                    Down


                  </button>







                  <button

                    onClick={()=>
                      editItem(item)
                    }

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

                    onClick={()=>
                      deleteItem(item.id)
                    }

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


            )

          )
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
                shadow-xl
              "
            >



              <div
                className="
                  mb-6
                  flex
                  items-center
                  justify-between
                "
              >


                <h2 className="
                  text-xl
                  font-bold
                ">

                  {
                    editing.id
                    ?
                    'Edit Education'
                    :
                    'Add Education'
                  }

                </h2>




                <button

                  onClick={()=>{

                    setOpen(false)

                    setEditing(null)

                  }}

                  className="
                    rounded-lg
                    p-2
                    hover:bg-muted
                  "

                >

                  <X size={20}/>


                </button>



              </div>








              <div className="space-y-4">



                <input

                  value={
                    editing.institution
                  }

                  onChange={(e)=>

                    updateField(
                      'institution',
                      e.target.value
                    )

                  }

                  placeholder="Institution"

                  className="
                    w-full
                    rounded-xl
                    border
                    px-4
                    py-3
                  "

                />





                <input

                  value={
                    editing.qualification
                  }

                  onChange={(e)=>

                    updateField(
                      'qualification',
                      e.target.value
                    )

                  }

                  placeholder="Qualification"

                  className="
                    w-full
                    rounded-xl
                    border
                    px-4
                    py-3
                  "

                />





                <input

                  value={
                    editing.location
                  }

                  onChange={(e)=>

                    updateField(
                      'location',
                      e.target.value
                    )

                  }

                  placeholder="Location"

                  className="
                    w-full
                    rounded-xl
                    border
                    px-4
                    py-3
                  "

                />





                <div className="
                  grid
                  gap-4
                  md:grid-cols-2
                ">



                  <input

                    value={
                      editing.start_date
                    }

                    onChange={(e)=>

                      updateField(
                        'start_date',
                        e.target.value
                      )

                    }

                    placeholder="Start Date"

                    className="
                      rounded-xl
                      border
                      px-4
                      py-3
                    "

                  />





                  <input

                    value={
                      editing.end_date
                    }

                    onChange={(e)=>

                      updateField(
                        'end_date',
                        e.target.value
                      )

                    }

                    placeholder="End Date"

                    className="
                      rounded-xl
                      border
                      px-4
                      py-3
                    "

                  />



                </div>







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

                  rows={5}

                  className="
                    w-full
                    rounded-xl
                    border
                    px-4
                    py-3
                  "

                />



              </div>








              <div className="
                mt-6
                flex
                justify-end
                gap-3
              ">



                <button

                  onClick={()=>{

                    setOpen(false)

                    setEditing(null)

                  }}

                  className="
                    rounded-xl
                    border
                    px-5
                    py-3
                  "

                >

                  Cancel


                </button>







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
                    disabled:opacity-50
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



          </div>


        )
      }



    </div>

  )

}