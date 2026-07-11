

'use client'

import {
  useMemo,
  useState,
} from 'react'

import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  ArrowUp,
  ArrowDown,
} from 'lucide-react'

import {
  createClient,
} from '@/lib/supabase-browser'



type Skill = {

  id: string

  name: string

  display_order: number

}



type Props = {

  initialSkills: Skill[]

}





export default function SkillsManager({

  initialSkills,

}: Props) {



  const supabase = createClient()



  const [skills, setSkills] =
    useState<Skill[]>(initialSkills)



  const [open, setOpen] =
    useState(false)



  const [editing, setEditing] =
    useState<Skill | null>(null)



  const [saving, setSaving] =
    useState(false)



  const [message, setMessage] =
    useState('')





  const sortedSkills = useMemo(() => {


    return [...skills].sort(

      (a,b)=>

        a.display_order -
        b.display_order

    )


  },[skills])








  function createNew(){


    setEditing({

      id:'',

      name:'',

      display_order:

        Math.max(

          ...skills.map(

            item =>
              item.display_order

          ),

          0

        ) + 1,

    })


    setOpen(true)


  }








  function editItem(item: Skill){


    setEditing(item)


    setOpen(true)


  }







  function updateField(
    value:string
  ){


    if(!editing)

      return



    setEditing({

      ...editing,

      name:value,

    })


  }



  async function saveItem(){


    if(!editing)

      return



    try{


      setSaving(true)




      if(editing.id){



        const {error} =

          await supabase

            .from('skills')

            .update({

              name:
                editing.name,

              display_order:
                editing.display_order,

            })

            .eq(

              'id',

              editing.id

            )





        if(error)

          throw error






        setSkills(current =>

          current.map(item =>

            item.id === editing.id

              ?

              editing

              :

              item

          )

        )






        setMessage(
          'Skill updated successfully.'
        )






      }else{





        const {data,error}=

          await supabase

            .from('skills')

            .insert({

              name:
                editing.name,

              display_order:
                editing.display_order,

            })

            .select()

            .single()






        if(error)

          throw error






        if(data){


          setSkills(current=>[

            ...current,

            data

          ])


        }






        setMessage(
          'Skill added successfully.'
        )



      }






      setOpen(false)

      setEditing(null)



    }catch(error){


      console.error(error)


      setMessage(
        'Unable to save skill.'
      )


    }finally{


      setSaving(false)


    }


  }









  async function deleteItem(id:string){



    const confirmDelete =

      window.confirm(

        'Delete this skill?'

      )




    if(!confirmDelete)

      return





    const {error}=

      await supabase

        .from('skills')

        .delete()

        .eq(

          'id',

          id

        )





    if(error){


      console.error(error)


      setMessage(
        'Delete failed.'
      )


      return


    }






    setSkills(current =>

      current.filter(item =>

        item.id !== id

      )

    )




    setMessage(
      'Skill deleted.'
    )


  }









  async function moveUp(index:number){



    if(index===0)

      return






    const items=[

      ...sortedSkills

    ]





    const current =

      items[index]





    const previous =

      items[index-1]






    const oldOrder =

      current.display_order





    current.display_order =

      previous.display_order





    previous.display_order =

      oldOrder






    setSkills(items)







    const firstUpdate =

      await supabase

        .from('skills')

        .update({

          display_order:

            current.display_order

        })

        .eq(

          'id',

          current.id

        )







    const secondUpdate =

      await supabase

        .from('skills')

        .update({

          display_order:

            previous.display_order

        })

        .eq(

          'id',

          previous.id

        )







    if(
      firstUpdate.error ||
      secondUpdate.error
    ){


      console.error(

        firstUpdate.error ||
        secondUpdate.error

      )


      setMessage(
        'Unable to update order.'
      )


    }



  }









  async function moveDown(index:number){



    if(

      index === sortedSkills.length - 1

    )

      return






    const items=[

      ...sortedSkills

    ]





    const current =

      items[index]





    const next =

      items[index+1]







    const oldOrder =

      current.display_order





    current.display_order =

      next.display_order





    next.display_order =

      oldOrder






    setSkills(items)








    const firstUpdate =

      await supabase

        .from('skills')

        .update({

          display_order:

            current.display_order

        })

        .eq(

          'id',

          current.id

        )








    const secondUpdate =

      await supabase

        .from('skills')

        .update({

          display_order:

            next.display_order

        })

        .eq(

          'id',

          next.id

        )








    if(

      firstUpdate.error ||

      secondUpdate.error

    ){



      console.error(

        firstUpdate.error ||

        secondUpdate.error

      )



      setMessage(
        'Unable to update order.'
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

            Skills


          </h2>





          <p

            className="
              text-sm
              text-muted-foreground
            "

          >

            Manage your professional skills.


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


          Add Skill



        </button>





      </div>









      <div className="space-y-4">



        {
          sortedSkills.map(

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

                  {item.name}


                </h3>









                <div

                  className="
                    mt-5
                    flex
                    flex-wrap
                    gap-3
                  "

                >






                  <button


                    onClick={()=>moveUp(index)}


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


                    onClick={()=>moveDown(index)}



                    disabled={
                      index ===
                      sortedSkills.length - 1
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
                max-w-md
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
                    'Edit Skill'
                    :
                    'Add Skill'
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









              <input



                value={editing.name}



                onChange={(e)=>

                  updateField(

                    e.target.value

                  )

                }



                placeholder="Skill name"



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