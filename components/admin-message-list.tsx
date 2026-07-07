'use client'

import { useState } from 'react'
import AdminMessageActions from '@/components/admin-message-actions'

type Message = {
  id: string
  name: string
  email: string
  subject: string
  created_at: string
  read: boolean
}

type Props = {
  messages: Message[]
}

export default function AdminMessageList({
  messages,
}: Props) {

  const [search, setSearch] = useState('')


  const filteredMessages = messages.filter((message) => {

    const text = `
      ${message.name}
      ${message.email}
      ${message.subject}
    `.toLowerCase()


    return text.includes(search.toLowerCase())

  })


  return (
    <div>


      {/* Search */}
      <input
        type="text"
        placeholder="Search messages..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full rounded-xl border border-surface-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent"
      />



      <div className="space-y-5">


        {filteredMessages.length > 0 ? (

          filteredMessages.map((message) => (

            <div
              key={message.id}
              className="rounded-2xl border border-surface-border p-5"
            >


              <div className="flex flex-wrap justify-between gap-4">


                <div>

                  <div className="flex items-center gap-2">

                    <h3 className="font-semibold">
                      {message.name}
                    </h3>


                    {!message.read && (
                      <span className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent">
                        New
                      </span>
                    )}

                  </div>


                  <p className="text-sm text-muted-foreground">
                    {message.email}
                  </p>

                </div>



                    <p className="text-sm text-muted-foreground">
        {new Date(message.created_at).toISOString().split('T')[0]}
        </p>


              </div>



              <div className="mt-5">

                <p className="text-sm text-muted-foreground">
                  Subject
                </p>


                <p className="font-medium">
                  {message.subject}
                </p>

              </div>



              <div className="mt-5 flex flex-wrap items-center gap-3">


                <a
                  href={`/admin/messages/${message.id}`}
                  className="rounded-full border border-surface-border px-5 py-2 text-sm transition hover:bg-surface"
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

          <p className="text-muted-foreground">
            No matching messages found.
          </p>

        )}


      </div>

    </div>
  )
}