import Link from 'next/link'

type Message = {
  id: string
  name: string
  email: string
  subject: string
  created_at: string
  status: string
}

type Props = {
  messages: Message[]
}

export default function RecentMessages({
  messages,
}: Props) {
  const recentMessages = messages.slice(0, 5)

  return (
    <div className="glass rounded-3xl p-6">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-semibold">
            Recent Messages
          </h2>

          <p className="text-sm text-muted-foreground">
            Latest contact form submissions
          </p>

        </div>

      </div>

      {recentMessages.length === 0 ? (

        <p className="text-muted-foreground">
          No messages yet.
        </p>

      ) : (

        <div className="space-y-4">

          {recentMessages.map((message) => (

            <div
              key={message.id}
              className="flex items-center justify-between rounded-2xl border border-surface-border p-4"
            >

              <div>

                <h3 className="font-semibold">
                  {message.name}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {message.subject}
                </p>

              </div>

              <div className="text-right">

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    message.status === 'Completed'
                      ? 'bg-green-500/10 text-green-600'
                      : message.status === 'In Progress'
                      ? 'bg-yellow-500/10 text-yellow-600'
                      : 'bg-blue-500/10 text-blue-600'
                  }`}
                >
                  {message.status}
                </span>

                <p className="mt-2 text-xs text-muted-foreground">
                  {new Date(message.created_at)
                    .toISOString()
                    .split('T')[0]}
                </p>

              </div>

            </div>

          ))}

          <div className="pt-2">

            <Link
              href="/admin"
              className="inline-flex rounded-full border border-surface-border px-5 py-2 text-sm transition hover:bg-surface"
            >
              View All Messages
            </Link>

          </div>

        </div>

      )}

    </div>
  )
}