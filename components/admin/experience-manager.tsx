
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



type Experience = {

  id: string

  position: string

  company: string

  location: string

  start_date: string

  end_date: string

  description: string | null

  display_order: number

}



type Props = {

  initialExperience: Experience[]

}





export default function ExperienceManager({

  initialExperience,

}: Props) {



  const supabase = createClient()



  const [experience, setExperience] =

    useState<Experience[]>(initialExperience)



  const [open, setOpen] =

    useState(false)



  const [editing, setEditing] =

    useState<Experience | null>(null)



  const [saving, setSaving] =

    useState(false)



  const [message, setMessage] =

    useState('')







  const sortedExperience = useMemo(() => {


    return [...experience].sort(

      (a, b) =>

        a.display_order - b.display_order

    )


  }, [experience])







  function createNew() {


    setEditing({

      id: '',

      position: '',

      company: '',

      location: '',

      start_date: '',

      end_date: '',

      description: '',

      display_order:

        Math.max(

          ...experience.map(

            item => item.display_order

          ),

          0

        ) + 1,

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


    if (!editing)

      return



    setEditing({

      ...editing,

      [field]: value,

    })


  }


  async function saveItem() {


    if (!editing)

      return




    try {


      setSaving(true)



      if (editing.id) {



        const { error } =

          await supabase

            .from('experience')

            .update({

              position:
                editing.position,

              company:
                editing.company,

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





        setExperience(current =>

          current.map(item =>

            item.id === editing.id

              ? editing

              : item

          )

        )



        setMessage(
          'Experience updated successfully.'
        )




      } else {



        const { data, error } =

          await supabase

            .from('experience')

            .insert({

              position:
                editing.position,

              company:
                editing.company,

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


          setExperience(current => [

            ...current,

            data,

          ])


        }




        setMessage(
          'Experience added successfully.'
        )


      }






      setOpen(false)


      setEditing(null)





    } catch (error) {



      console.error(error)



      setMessage(
        'Unable to save experience.'
      )



    } finally {



      setSaving(false)



    }



  }









  async function deleteItem(id: string) {



    const confirmed =

      window.confirm(

        'Are you sure you want to delete this experience?'

      )




    if (!confirmed)

      return





    const { error } =

      await supabase

        .from('experience')

        .delete()

        .eq(

          'id',

          id

        )





    if (error) {

  console.error(
    'Move down error:',
    error.message,
    error.details,
    error.hint
  )

  setMessage(
    'Failed to update order.'
  )

  return

}

if (error) {

  setMessage(
    error.message
  )

  return

}



    setExperience(current =>

      current.filter(item =>

        item.id !== id

      )

    )





    setMessage(
      'Experience deleted successfully.'
    )



  }









  async function moveUp(index: number) {



    if (index === 0)

      return





    const items = [

      ...sortedExperience

    ]




    const current =

      items[index]




    const previous =

      items[index - 1]





    const temp =

      current.display_order





    current.display_order =

      previous.display_order





    previous.display_order =

      temp






    setExperience(items)






    const { data, error } =
  await supabase
    .from('experience')
    .upsert([
      {
        id: current.id,
        display_order: current.display_order,
      },
      {
        id: next.id,
        display_order: next.display_order,
      },
    ])
    .select()


console.log('MOVE DOWN RESULT:', {
  data,
  error,
})


if (error) {

  setMessage(
    error.message
  )

  return

}


    if (error)

      console.error(error)



  }









  async function moveDown(index: number) {

  if (index === sortedExperience.length - 1) {
    return
  }


  try {

    const items = [...sortedExperience]


    const current = items[index]

    const next = items[index + 1]


    if (!current || !next) {

      console.log(
        'Missing item',
        {
          current,
          next,
        }
      )

      return
    }



    const currentOrder =
      current.display_order


    current.display_order =
      next.display_order


    next.display_order =
      currentOrder



    setExperience(items)



    const result =
      await supabase
        .from('experience')
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


    console.log(
      'MOVE DOWN RESULT',
      result
    )



    if (result.error) {

      console.log(
        'SUPABASE ERROR',
        result.error.message
      )

      setMessage(
        result.error.message
      )

      return
    }



    setMessage(
      'Experience order updated.'
    )


  } catch (error) {


    console.log(
      'MOVE DOWN CRASH',
      error
    )


    setMessage(
      'Move down failed.'
    )

  }


}


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






      <div
        className="
          flex
          items-center
          justify-between
          gap-4
        "
      >



        <div>


          <h2
            className="
              text-2xl
              font-bold
            "
          >

            Work Experience

          </h2>




          <p
            className="
              text-sm
              text-muted-foreground
            "
          >

            Manage your professional experience.

          </p>


        </div>






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



      </div>









      <div className="space-y-5">


        {
          sortedExperience.map(

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



                <h3
                  className="
                    text-xl
                    font-semibold
                  "
                >

                  {item.position}

                </h3>





                <p
                  className="
                    mt-1
                    text-muted-foreground
                  "
                >

                  {item.company}

                </p>





                <p
                  className="
                    mt-1
                    text-sm
                  "
                >

                  {item.location}

                </p>






                <p
                  className="
                    mt-2
                    text-sm
                  "
                >

                  {item.start_date}

                  {' - '}

                  {item.end_date}


                </p>







                {
                  item.description && (

                    <p
                      className="
                        mt-4
                        whitespace-pre-line
                        text-sm
                        text-muted-foreground
                      "
                    >

                      {item.description}

                    </p>


                  )
                }








                <div
                  className="
                    mt-6
                    flex
                    flex-wrap
                    gap-3
                  "
                >





                  <button

                    onClick={()=>
                      moveUp(index)
                    }

                    disabled={index === 0}

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
                      sortedExperience.length - 1
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



                <h2
                  className="
                    text-xl
                    font-bold
                  "
                >

                  {
                    editing.id
                    ?
                    'Edit Experience'
                    :
                    'Add Experience'
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
                    editing.position
                  }

                  onChange={(e)=>

                    updateField(

                      'position',

                      e.target.value

                    )

                  }

                  placeholder="Position / Job Title"

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
                    editing.company
                  }

                  onChange={(e)=>

                    updateField(

                      'company',

                      e.target.value

                    )

                  }

                  placeholder="Company / Organization"

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








                <div

                  className="
                    grid
                    gap-4
                    md:grid-cols-2
                  "

                >



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

                  placeholder="Responsibilities and achievements"

                  rows={6}

                  className="
                    w-full
                    rounded-xl
                    border
                    px-4
                    py-3
                  "

                />




              </div>









              <div

                className="
                  mt-6
                  flex
                  justify-end
                  gap-3
                "

              >




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