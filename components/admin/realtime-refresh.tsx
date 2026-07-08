'use client'

import { useEffect } from 'react'

import { supabase } from '@/lib/supabase'


export default function RealtimeRefresh() {


  useEffect(() => {


    const channel =
      supabase

        .channel('contacts-changes')


        .on(

          'postgres_changes',

          {
            event: '*',
            schema: 'public',
            table: 'contacts',
          },


          () => {

            window.location.reload()

          }

        )


        .subscribe()





    return () => {

      supabase.removeChannel(channel)

    }


  }, [])




  return null

}