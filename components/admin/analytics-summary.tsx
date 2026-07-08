import {
  TrendingUp,
  MessageSquare,
  CheckCircle,
} from 'lucide-react'


type Message = {
  status: string
  created_at: string
}


type Props = {
  messages: Message[]
}


export default function AnalyticsSummary({
  messages,
}: Props) {


  const total =
    messages.length


  const completed =
    messages.filter(
      (message) =>
        message.status === 'Completed'
    ).length


  const completionRate =
    total === 0
      ? 0
      : Math.round(
          (completed / total) * 100
        )



  const thisMonth =
    messages.filter(
      (message) => {

        const date =
          new Date(
            message.created_at
          )

        const now =
          new Date()


        return (
          date.getMonth() === now.getMonth()
          &&
          date.getFullYear() === now.getFullYear()
        )

      }
    ).length



  return (

    <div className="mb-8 grid gap-5 sm:grid-cols-3">


      <div className="glass rounded-3xl p-6">

        <MessageSquare size={28}/>

        <p className="mt-4 text-sm text-muted-foreground">
          Total Messages
        </p>

        <h3 className="text-3xl font-bold">
          {total}
        </h3>

      </div>



      <div className="glass rounded-3xl p-6">

        <TrendingUp size={28}/>

        <p className="mt-4 text-sm text-muted-foreground">
          This Month
        </p>

        <h3 className="text-3xl font-bold">
          {thisMonth}
        </h3>

      </div>



      <div className="glass rounded-3xl p-6">

        <CheckCircle size={28}/>

        <p className="mt-4 text-sm text-muted-foreground">
          Completion Rate
        </p>

        <h3 className="text-3xl font-bold">
          {completionRate}%
        </h3>

      </div>


    </div>

  )
}