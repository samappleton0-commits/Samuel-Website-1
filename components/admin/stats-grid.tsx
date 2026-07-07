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
    (m) => !m.read
  ).length

  const inProgress = messages.filter(
    (m) => m.status === 'In Progress'
  ).length

  const completed = messages.filter(
    (m) => m.status === 'Completed'
  ).length

  return (
    <div className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

      <AnalyticsCard
        title="Total Messages"
        value={total}
        icon="📨"
        color="bg-blue-500/10"
      />

      <AnalyticsCard
        title="Unread"
        value={unread}
        icon="🔵"
        color="bg-cyan-500/10"
      />

      <AnalyticsCard
        title="In Progress"
        value={inProgress}
        icon="🟡"
        color="bg-yellow-500/10"
      />

      <AnalyticsCard
        title="Completed"
        value={completed}
        icon="🟢"
        color="bg-green-500/10"
      />

    </div>
  )
}