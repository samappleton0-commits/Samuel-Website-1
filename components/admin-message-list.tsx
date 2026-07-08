'use client'

import { useState } from 'react'

import AdminMessageActions from '@/components/admin-message-actions'

import MessageStatus from '@/components/message-status'


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
  messages: Message[]
  initialStatus?: string
}


export default function AdminMessageList({
  messages,
  initialStatus = 'All',
}: Props) {


  const [search, setSearch] = useState('')


  const [statusFilter, setStatusFilter] =
    useState(initialStatus)



  const filteredMessages =
    messages.filter((message) => {


      const text = `
        ${message.name}
        ${message.email}
        ${message.subject}
        ${message.status}
      `.toLowerCase()



      const matchesSearch =
        text.includes(
          search.toLowerCase()
        )



      const matchesStatus =
        statusFilter === 'All' ||
        message.status === statusFilter



      return (
        matchesSearch &&
        matchesStatus
      )

    })




  const allCount =
    messages.length



  const newCount =
    messages.filter(
      (message) => !message.read
    ).length



  const progressCount =
    messages.filter(
      (message) =>
        message.status === 'In Progress'
    ).length



  const completedCount =
    messages.filter(
      (message) =>
        message.status === 'Completed'
    ).length




  const filters = [

    {
      name: 'All',
      count: allCount,
    },

    {
      name: 'New',
      count: newCount,
    },

    {
      name: 'In Progress',
      count: progressCount,
    },

    {
      name: 'Completed',
      count: completedCount,
    },

  ]




  return (

    <div>



      {/* Search */}

      <input

        type="text"

        placeholder="Search messages..."

        value={search}

        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }

        className="
          mb-6
          w-full
          rounded-xl
          border
          border-surface-border
          bg-surface
          px-4
          py-3
          text-sm
          outline-none
          focus:border-accent
        "

      />





      {/* Filters */}

      <div className="
        mb-6
        flex
        flex-wrap
        gap-3
      ">


        {filters.map((filter) => (

          <button

            key={filter.name}

            onClick={() =>
              setStatusFilter(
                filter.name
              )
            }

            className={`
              rounded-full
              border
              px-5
              py-2
              text-sm
              transition

              ${
                statusFilter === filter.name

                ? 'bg-accent text-white'

                : 'border-surface-border hover:bg-surface'

              }
            `}

          >

            {filter.name}

            <span className="ml-2">

              ({filter.count})

            </span>


          </button>


        ))}


      </div>






      {/* Messages */}

      <div className="space-y-5">


        {filteredMessages.length > 0 ? (


          filteredMessages.map((message) => (


            <div

              key={message.id}

              className="
                rounded-2xl
                border
                border-surface-border
                p-5
              "

            >




              {/* Header */}

              <div className="
                flex
                flex-wrap
                justify-between
                gap-4
              ">



                <div>



                  <div className="
                    flex
                    items-center
                    gap-2
                  ">


                    <h3 className="font-semibold">

                      {message.name}

                    </h3>




                    {!message.read && (

                      <span className="
                        rounded-full
                        bg-accent/10
                        px-3
                        py-1
                        text-xs
                        text-accent
                      ">

                        New

                      </span>

                    )}



                  </div>




                  <p className="
                    text-sm
                    text-muted-foreground
                  ">

                    {message.email}

                  </p>



                </div>




                <p className="
                  text-sm
                  text-muted-foreground
                ">

                  {new Date(message.created_at)
                    .toISOString()
                    .split('T')[0]}

                </p>



              </div>






              {/* Subject */}

              <div className="mt-5">


                <p className="
                  text-sm
                  text-muted-foreground
                ">

                  Subject

                </p>



                <p className="font-medium">

                  {message.subject}

                </p>



              </div>







              {/* Status + Actions */}

              <div className="
                mt-5
                flex
                flex-wrap
                items-center
                gap-3
              ">



                <MessageStatus

                  id={message.id}

                  status={message.status}

                />





                <a

                  href={`/admin/messages/${message.id}`}

                  className="
                    rounded-full
                    border
                    border-surface-border
                    px-5
                    py-2
                    text-sm
                    transition
                    hover:bg-surface
                  "

                >

                  View Message

                </a>





                <AdminMessageActions

                  id={message.id}

                  read={message.read}

                />



              </div>





            </div>


          ))



        ) : (


          <div className="
            rounded-2xl
            border
            border-surface-border
            p-10
            text-center
          ">


            <p className="text-3xl">
              📭
            </p>


            <p className="
              mt-3
              text-muted-foreground
            ">

              No matching messages found.

            </p>


          </div>


        )}



      </div>



    </div>

  )

}