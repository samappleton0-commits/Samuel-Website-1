import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase-server'

import MessageStatus from '@/components/message-status'

import AdminMessageActions from '@/components/admin-message-actions'


type Props = {
  params: Promise<{
    id: string
  }>
}



export default async function MessageDetailsPage({
  params,
}: Props) {


  const { id } =
    await params




  const supabase =
    await createClient()




  const {
    data: {
      user,
    },
  } =
    await supabase.auth.getUser()




  if (!user) {

    redirect('/login')

  }





  const {
    data: message,
    error,
  } =
    await supabase

      .from('contacts')

      .select('*')

      .eq(
        'id',
        id
      )

      .single()




  if (error || !message) {

    notFound()

  }





  // Mark message as read

  if (!message.read) {


    await supabase

      .from('contacts')

      .update({
        read: true,
      })

      .eq(
        'id',
        id
      )

  }






  return (

    <div className="max-w-5xl">



      {/* Header */}

      <div className="
        mb-8
        flex
        flex-wrap
        items-center
        justify-between
        gap-4
      ">


        <div>


          <h1 className="text-3xl font-bold">

            Message Details

          </h1>



          <p className="
            mt-2
            text-muted-foreground
          ">

            View and manage this contact message.

          </p>


        </div>




        <Link

          href="/admin/messages"

          className="
            rounded-xl
            border
            border-surface-border
            px-5
            py-2
            transition
            hover:bg-surface
          "

        >

          ← Back to Messages

        </Link>



      </div>







      <div className="
        glass
        rounded-3xl
        p-8
      ">






        {/* Sender Information */}

        <div>


          <h2 className="text-xl font-semibold">

            Sender Information

          </h2>




          <div className="
            mt-6
            grid
            gap-6
            md:grid-cols-2
          ">



            <div>

              <p className="
                text-sm
                text-muted-foreground
              ">

                Name

              </p>


              <p className="mt-1 text-lg font-semibold">

                {message.name}

              </p>


            </div>





            <div>

              <p className="
                text-sm
                text-muted-foreground
              ">

                Email

              </p>


              <p className="mt-1">

                {message.email}

              </p>


            </div>





            <div>

              <p className="
                text-sm
                text-muted-foreground
              ">

                IP Address

              </p>


              <p className="mt-1">

                {message.ip_address || 'Not available'}

              </p>


            </div>





            <div>

              <p className="
                text-sm
                text-muted-foreground
              ">

                Received

              </p>



              <p className="mt-1">

                {
                  new Date(
                    message.created_at
                  )
                  .toLocaleString(
                    'en-US',
                    {
                      dateStyle:'medium',
                      timeStyle:'short',
                    }
                  )
                }

              </p>


            </div>



          </div>


        </div>









        {/* Subject */}

        <div className="mt-8">


          <p className="
            text-sm
            text-muted-foreground
          ">

            Subject

          </p>



          <p className="
            mt-1
            text-lg
            font-semibold
          ">

            {message.subject}

          </p>


        </div>








        {/* Message */}

        <div className="mt-8">


          <p className="
            text-sm
            text-muted-foreground
          ">

            Message

          </p>




          <div className="
            mt-3
            whitespace-pre-wrap
            rounded-2xl
            border
            border-surface-border
            p-6
            leading-relaxed
          ">

            {message.message}

          </div>


        </div>







        {/* Actions */}

        <div className="
          mt-8
          flex
          flex-wrap
          items-center
          gap-3
        ">



          <MessageStatus

            id={message.id}

            status={message.status}

          />





          <AdminMessageActions

            id={message.id}

            read={true}

          />






          <a

            href={`mailto:${message.email}?subject=Re: ${message.subject}`}

            className="
              rounded-full
              bg-accent
              px-5
              py-2
              text-sm
              font-medium
              text-white
              transition
              hover:opacity-90
            "

          >

            Reply Email

          </a>



        </div>





      </div>


    </div>

  )

}