'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase-browser'
import { toast } from 'sonner'
import { Trash2, Pencil, X } from 'lucide-react'


type Announcement = {
  id: string
  title: string
  message: string
  active: boolean
  created_at: string
}


type Props = {
  initialAnnouncements: Announcement[]
}


export default function AnnouncementManager({
  initialAnnouncements,
}: Props) {


  const supabase = createClient()


  const [announcements, setAnnouncements] =
    useState(initialAnnouncements)


  const [title, setTitle] =
    useState('')


  const [message, setMessage] =
    useState('')


  const [editingId, setEditingId] =
    useState<string | null>(null)


  const [loading, setLoading] =
    useState(false)





  function resetForm() {

    setTitle('')
    setMessage('')
    setEditingId(null)

  }







  async function saveAnnouncement() {


    if (!title || !message) {

      toast.error(
        'Please fill in all fields'
      )

      return

    }



    setLoading(true)



    if (editingId) {


      const {
        data,
        error,
      } = await supabase

        .from('site_announcements')

        .update({
          title,
          message,
        })

        .eq(
          'id',
          editingId
        )

        .select()

        .single()



      if (error) {

        toast.error(
          'Failed to update announcement'
        )

        setLoading(false)

        return

      }




      setAnnouncements(
        announcements.map(item =>
          item.id === editingId
          ? data
          : item
        )
      )



      toast.success(
        'Announcement updated'
      )



    } else {


      const {
        data,
        error,
      } = await supabase

        .from('site_announcements')

        .insert({
          title,
          message,
          active: true,
        })

        .select()

        .single()



      if (error) {

        toast.error(
          'Failed to create announcement'
        )

        setLoading(false)

        return

      }




      setAnnouncements([
        data,
        ...announcements,
      ])




      toast.success(
        'Announcement created'
      )


    }



    resetForm()

    setLoading(false)

  }







  function editAnnouncement(
    item: Announcement
  ) {

    setTitle(item.title)

    setMessage(item.message)

    setEditingId(item.id)

  }









  async function deleteAnnouncement(
    id:string
  ) {


    const {
      error,
    } = await supabase

      .from('site_announcements')

      .delete()

      .eq(
        'id',
        id
      )



    if(error){

      toast.error(
        'Delete failed'
      )

      return

    }



    setAnnouncements(
      announcements.filter(
        item =>
          item.id !== id
      )
    )



    toast.success(
      'Announcement deleted'
    )

  }









  async function toggleActive(
    item: Announcement
  ){


    const {
      error,
    } = await supabase

      .from('site_announcements')

      .update({
        active: !item.active,
      })

      .eq(
        'id',
        item.id
      )



    if(error){

      toast.error(
        'Update failed'
      )

      return

    }



    setAnnouncements(
      announcements.map(
        announcement =>
          announcement.id === item.id

          ? {
              ...announcement,
              active:
                !announcement.active,
            }

          : announcement
      )
    )



    toast.success(
      'Status updated'
    )

  }









  return (

    <div className="space-y-8">





      {/* FORM */}


      <div className="
        rounded-2xl
        border
        border-border
        bg-card
        p-6
      ">



        <h2 className="mb-5 text-xl font-semibold">

          {
            editingId
            ? 'Edit Announcement'
            : 'Create Announcement'
          }

        </h2>





        <div className="space-y-4">



          <input

            value={title}

            onChange={
              e =>
              setTitle(e.target.value)
            }

            placeholder="Announcement title"

            className="
              w-full
              rounded-xl
              border
              bg-background
              px-4
              py-3
              outline-none
            "

          />





          <textarea

            value={message}

            onChange={
              e =>
              setMessage(e.target.value)
            }

            placeholder="Announcement message"

            rows={4}

            className="
              w-full
              rounded-xl
              border
              bg-background
              px-4
              py-3
              outline-none
            "

          />






          <div className="flex gap-3">


            <button

              onClick={saveAnnouncement}

              disabled={loading}

              className="
                rounded-xl
                bg-primary
                px-6
                py-3
                font-semibold
                text-primary-foreground
              "

            >

              {
                loading

                ? 'Saving...'

                : editingId
                ? 'Update Announcement'
                : 'Create Announcement'
              }


            </button>




            {
              editingId && (

                <button

                  onClick={resetForm}

                  className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    px-5
                    py-3
                  "

                >

                  <X size={18}/>

                  Cancel

                </button>

              )
            }



          </div>



        </div>


      </div>







      {/* LIST */}



      <div className="space-y-4">



        <h2 className="text-xl font-semibold">

          Existing Announcements

        </h2>





        {
          announcements.map(item => (



            <div

              key={item.id}

              className="
                rounded-2xl
                border
                border-border
                bg-card
                p-5
              "

            >




              <div className="
                flex
                items-start
                justify-between
                gap-4
              ">



                <div>


                  <h3 className="font-semibold">

                    {item.title}

                  </h3>



                  <p className="
                    mt-2
                    text-sm
                    text-muted-foreground
                  ">

                    {item.message}

                  </p>




                  <button

                    onClick={() =>
                      toggleActive(item)
                    }

                    className="
                      mt-4
                      rounded-full
                      px-4
                      py-1
                      text-sm
                    "

                  >

                    {
                      item.active
                      ? 'Active'
                      : 'Inactive'
                    }


                  </button>



                </div>






                <div className="flex gap-2">


                  <button

                    onClick={() =>
                      editAnnouncement(item)
                    }

                    className="
                      rounded-lg
                      p-2
                      hover:bg-surface
                    "

                  >

                    <Pencil size={18}/>

                  </button>





                  <button

                    onClick={() =>
                      deleteAnnouncement(item.id)
                    }

                    className="
                      rounded-lg
                      p-2
                      text-red-400
                      hover:bg-red-400/10
                    "

                  >

                    <Trash2 size={18}/>

                  </button>



                </div>



              </div>



            </div>


          ))
        }



      </div>




    </div>

  )

}