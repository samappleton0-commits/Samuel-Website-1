import Link from 'next/link'

type Contact = {

  id: string

  name: string

  email: string

  subject: string | null

  message: string

  created_at: string

  read: boolean

}

type Props = {

  contacts: Contact[]

}

export default function RecentContacts({

  contacts,

}: Props) {

  return (

    <div
      className="
        rounded-2xl
        border
        bg-card
        p-6
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

        <div>

          <h2
            className="
              text-xl
              font-bold
            "
          >
            Recent Messages
          </h2>

          <p
            className="
              text-sm
              text-muted-foreground
            "
          >
            Latest contact form submissions
          </p>

        </div>

        <Link
          href="/admin/messages"
          className="
            text-sm
            font-medium
            text-primary
            hover:underline
          "
        >
          View All
        </Link>

      </div>

      {

        contacts.length === 0 ? (

          <div
            className="
              rounded-xl
              border
              py-12
              text-center
              text-muted-foreground
            "
          >

            No messages yet.

          </div>

        ) : (

          <div className="space-y-4">

            {

              contacts.map((contact) => (

                <Link

                  key={contact.id}

                  href={`/admin/messages/${contact.id}`}

                  className="
                    block
                    rounded-xl
                    border
                    p-4
                    transition
                    hover:bg-muted
                  "

                >

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >

                    <div>

                      <h3 className="font-semibold">

                        {contact.name}

                      </h3>

                      <p
                        className="
                          text-sm
                          text-muted-foreground
                        "
                      >

                        {contact.email}

                      </p>

                    </div>

                    {

                      !contact.read && (

                        <span
                          className="
                            rounded-full
                            bg-blue-500
                            px-2
                            py-1
                            text-xs
                            text-white
                          "
                        >

                          New

                        </span>

                      )

                    }

                  </div>

                  {

                    contact.subject && (

                      <p
                        className="
                          mt-3
                          font-medium
                        "
                      >

                        {contact.subject}

                      </p>

                    )

                  }

                  <p
                    className="
                      mt-2
                      line-clamp-2
                      text-sm
                      text-muted-foreground
                    "
                  >

                    {contact.message}

                  </p>

                  <p
                    className="
                      mt-3
                      text-xs
                      text-muted-foreground
                    "
                  >

                    {

                      new Date(
                        contact.created_at
                      ).toLocaleDateString()

                    }

                  </p>

                </Link>

              ))

            }

          </div>

        )

      }

    </div>

  )

}