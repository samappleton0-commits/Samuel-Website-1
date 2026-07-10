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


type Skill = {
  id: string
  name: string
}


type Props = {
  initialSkills: Skill[]
}


export default function SkillsManager({
  initialSkills,
}: Props) {


  const supabase = createClient()


  const [skills, setSkills] =
    useState(initialSkills)


  const [open, setOpen] =
    useState(false)


  const [editing, setEditing] =
    useState<Skill | null>(null)


  const [saving, setSaving] =
    useState(false)





  function addNew(){

    setEditing({

      id:'',

      name:'',

    })

    setOpen(true)

  }





  function editSkill(skill:Skill){

    setEditing(skill)

    setOpen(true)

  }





  function updateName(value:string){

    if(!editing) return


    setEditing({

      ...editing,

      name:value,

    })

  }







  async function saveSkill(){


    if(!editing) return


    setSaving(true)


    try{


      if(editing.id){


        await supabase

          .from('skills')

          .update({

            name: editing.name,

          })

          .eq(
            'id',
            editing.id
          )



        setSkills(

          skills.map(skill =>

            skill.id === editing.id

            ? editing

            : skill

          )

        )



      } else {



        const {

          data

        } = await supabase

          .from('skills')

          .insert({

            name: editing.name,

          })

          .select()

          .single()





        if(data){

          setSkills([

            ...skills,

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







  async function deleteSkill(id:string){


    await supabase

      .from('skills')

      .delete()

      .eq(
        'id',
        id
      )



    setSkills(

      skills.filter(

        skill => skill.id !== id

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

        Add Skill

      </button>







      <div className="
        flex
        flex-wrap
        gap-4
      ">


        {

          skills.map(skill => (


            <div

              key={skill.id}

              className="
                flex
                items-center
                gap-3
                rounded-xl
                border
                border-border
                bg-card
                px-4
                py-3
              "

            >


              <span>

                {skill.name}

              </span>




              <button

                onClick={()=>editSkill(skill)}

              >

                <Pencil size={16}/>

              </button>





              <button

                onClick={()=>deleteSkill(skill.id)}

              >

                <Trash2 size={16}/>

              </button>



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
                max-w-md
                rounded-3xl
                bg-background
                p-6
                space-y-5
              "
            >



              <div className="
                flex
                justify-between
              ">


                <h2 className="text-xl font-bold">

                  Skill

                </h2>



                <button
                  onClick={()=>setOpen(false)}
                >

                  <X/>

                </button>


              </div>





              <input

                value={editing.name}

                onChange={(e)=>
                  updateName(e.target.value)
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





              <button

                onClick={saveSkill}

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