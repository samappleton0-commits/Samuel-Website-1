import {
  Mail,
  MailOpen,
  Clock3,
  CircleCheck,
} from 'lucide-react'

import AnalyticsCard from './analytics-card'


type Message = {
  read: boolean
  status: string
}


type Props = {
  messages: Message[]
}


export default function StatsGrid({
  messages,
}: Props) {

  const total = messages.length


  const unread = messages.filter(
    (message) => !message.read
  ).length


  const inProgress = messages.filter(
    (message) => message.status === 'In Progress'
  ).length


  const completed = messages.filter(
    (message) => message.status === 'Completed'
  ).length



  return (

    <div className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">


      <AnalyticsCard

        title="Total Messages"

        value={total}

        icon={
          <Mail
            size={26}
          />
        }

        color="bg-blue-500/10"

      />



      <AnalyticsCard

        title="Unread"

        value={unread}

        icon={
          <MailOpen
            size={26}
          />
        }

        color="bg-cyan-500/10"

      />



      <AnalyticsCard

        title="In Progress"

        value={inProgress}

        icon={
          <Clock3
            size={26}
          />
        }

        color="bg-yellow-500/10"

      />



      <AnalyticsCard

        title="Completed"

        value={completed}

        icon={
          <CircleCheck
            size={26}
          />
        }

        color="bg-green-500/10"

      />


    </div>

  )
}