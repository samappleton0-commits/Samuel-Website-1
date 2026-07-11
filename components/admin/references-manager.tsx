

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
  createClient
} from '@/lib/supabase-browser'






type Reference = {

  id: string

  name: string

  position: string

  organization: string

  location: string

  phone: string

  display_order: number

}






type Props = {

  initialReferences: Reference[]

}








export default function ReferencesManager({

  initialReferences,

}: Props) {



  const supabase = createClient()






  const [references, setReferences] =

    useState<Reference[]>(initialReferences)





  const [open,setOpen] =

    useState(false)





  const [editing,setEditing] =

    useState<Reference | null>(null)





  const [saving,setSaving] =

    useState(false)





  const [message,setMessage] =

    useState('')









  const sortedReferences = useMemo(()=>{


    return [

      ...references

    ].sort(

      (a,b)=>

        a.display_order -

        b.display_order

    )


  },[references])









  function createNew(){


    setEditing({


      id:'',

      name:'',

      position:'',

      organization:'',

      location:'',

      phone:'',

      display_order:

        Math.max(

          ...references.map(

            item=>

              item.display_order

          ),

          0

        ) + 1,


    })



    setOpen(true)


  }









  function editItem(item:Reference){


    setEditing(item)


    setOpen(true)


  }









  function updateField(

    field:keyof Reference,

    value:string

  ){



    if(!editing)

      return





    setEditing({

      ...editing,

      [field]:value,

    })


  }




  async function saveItem(){



    if(!editing)

      return






    try{



      setSaving(true)






      if(editing.id){






        const {error}=

          await supabase

            .from('resume_references')

            .update({


              name:
                editing.name,


              position:
                editing.position,


              organization:
                editing.organization,


              location:
                editing.location,


              phone:
                editing.phone,


              display_order:
                editing.display_order,


            })

            .eq(

              'id',

              editing.id

            )








        if(error)

          throw error







        setReferences(current =>


          current.map(item =>


            item.id === editing.id

              ?

              editing

              :

              item


          )

        )





        setMessage(
          'Reference updated successfully.'
        )








      }else{






        const {data,error}=

          await supabase

            .from('resume_references')

            .insert({



              name:
                editing.name,


              position:
                editing.position,


              organization:
                editing.organization,


              location:
                editing.location,


              phone:
                editing.phone,


              display_order:
                editing.display_order,



            })

            .select()

            .single()








        if(error)

          throw error







        if(data){


          setReferences(current=>[


            ...current,


            data,


          ])


        }






        setMessage(
          'Reference added successfully.'
        )



      }







      setOpen(false)

      setEditing(null)





    }catch(error){


  console.log(
    'REFERENCE SAVE ERROR:',
    error
  )


  setMessage(
    'Unable to save reference.'
  )


}finally{



      setSaving(false)



    }


  }












  async function deleteItem(id:string){



    const confirmDelete =

      window.confirm(

        'Delete this reference?'

      )






    if(!confirmDelete)

      return






    const {error}=

      await supabase

        .from('resume_references')

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








    setReferences(current =>


      current.filter(item =>


        item.id !== id


      )


    )





    setMessage(
      'Reference deleted.'
    )



  }












  async function moveUp(index:number){



    if(index===0)

      return






    const items=[

      ...sortedReferences

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







    setReferences(items)








    const firstUpdate =

      await supabase

        .from('resume_references')

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

        .from('resume_references')

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

      index === sortedReferences.length - 1

    )

      return






    const items=[

      ...sortedReferences

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







    setReferences(items)








    const firstUpdate =

      await supabase

        .from('resume_references')

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

        .from('resume_references')

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

            References


          </h2>






          <p

            className="
              text-sm
              text-muted-foreground
            "

          >

            Manage professional references.


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



          Add Reference



        </button>





      </div>













      <div className="space-y-4">





        {

          sortedReferences.map(

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







                <p

                  className="
                    text-muted-foreground
                  "

                >



                  {item.position}



                </p>







                <p

                  className="
                    text-sm
                  "

                >



                  {item.organization}



                </p>








                <p

                  className="
                    mt-2
                    text-sm
                  "


                >


                  {item.location}



                </p>








                <p

                  className="
                    text-sm
                  "

                >


                  {item.phone}



                </p>









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

                      sortedReferences.length - 1

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
                max-w-xl
                rounded-3xl
                bg-background
                p-6
                shadow-xl
                space-y-4
              "


            >





              <div


                className="
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
                    'Edit Reference'
                    :
                    'Add Reference'
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












              {
                [

                  ['name','Name'],

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









              <div


                className="
                  flex
                  justify-end
                  gap-3
                  pt-4
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