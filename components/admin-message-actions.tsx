'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { createClient } from '@/lib/supabase-browser'

import { Button } from '@/components/ui/button'



type Props = {
  id: string
  read: boolean
}



export default function AdminMessageActions({
  id,
  read,
}: Props) {


  const router =
    useRouter()



  const supabase =
    createClient()



  const [loading, setLoading] =
    useState(false)





  async function toggleRead() {


    setLoading(true)


    const { error } =
      await supabase

        .from('contacts')

        .update({
          read: !read,
        })

        .eq(
          'id',
          id
        )



    setLoading(false)



    if (error) {

      console.error(error)

      return

    }



    router.refresh()

  }







  async function deleteMessage() {


    const confirmDelete =
      window.confirm(
        'Are you sure you want to permanently delete this message?'
      )



    if (!confirmDelete) {

      return

    }





    setLoading(true)





    const { error } =
      await supabase

        .from('contacts')

        .delete()

        .eq(
          'id',
          id
        )





    setLoading(false)





    if (error) {

      console.error(error)

      return

    }





    router.push('/admin/messages')

    router.refresh()


  }







  return (

    <div className="flex flex-wrap gap-3">



      <Button

        onClick={toggleRead}

        disabled={loading}

        variant="outline"

        className="rounded-full"

      >

        {
          loading

          ? 'Updating...'

          :

          read

          ? 'Mark Unread'

          : 'Mark Read'
        }


      </Button>






      <Button

        onClick={deleteMessage}

        disabled={loading}

        variant="outline"

        className="
          rounded-full
          text-red-500
          hover:text-red-600
        "

      >

        {
          loading
          ? 'Deleting...'
          : 'Delete'
        }


      </Button>



    </div>

  )

}