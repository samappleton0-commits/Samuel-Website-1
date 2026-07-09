'use client'


import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'


import { supabase } from '@/lib/supabase'





type Message = {

  id: string

  name: string

  email: string

  subject: string

  created_at: string

  read: boolean

  status: string

}





type Props = {

  initialMessages: Message[]

  children: ReactNode

}







const MessagesContext =
  createContext<Message[]>([])







export function useLiveMessages() {

  return useContext(MessagesContext)

}








export default function LiveMessages({

  initialMessages,

  children,

}: Props) {



  const [messages,setMessages] =
    useState<Message[]>(
      initialMessages
    )







  useEffect(() => {



    // Prevent duplicate realtime channels

    const existingChannel =
      supabase.getChannels()
        .find(
          channel =>
          channel.topic ===
          'realtime:contacts-live'
        )



    if(existingChannel){

      supabase.removeChannel(
        existingChannel
      )

    }








    const channel =

      supabase

        .channel(
          'contacts-live'
        )



        .on(

          'postgres_changes',

          {
            event:'*',

            schema:'public',

            table:'contacts',
          },


          (payload)=>{





            if(
              payload.eventType === 'INSERT'
            ){


              setMessages(
                current => [

                  payload.new as Message,

                  ...current,

                ]
              )

            }







            if(
              payload.eventType === 'UPDATE'
            ){



              setMessages(
                current =>

                current.map(
                  message =>


                  message.id === payload.new.id

                  ?

                  payload.new as Message

                  :

                  message


                )
              )

            }








            if(
              payload.eventType === 'DELETE'
            ){



              setMessages(
                current =>

                current.filter(
                  message =>

                  message.id !== payload.old.id

                )

              )

            }





          }

        )



        .subscribe()







    return () => {


      supabase.removeChannel(
        channel
      )


    }





  },[])








  return (

    <MessagesContext.Provider

      value={
        messages
      }

    >

      {children}


    </MessagesContext.Provider>

  )

}