'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'


type Message = {
  created_at: string
}


type Props = {
  messages: Message[]
}


export default function MessageChart({
  messages,
}: Props) {


  const grouped = messages.reduce(
    (acc: Record<string, number>, message) => {

      const date = new Date(
        message.created_at
      ).toLocaleDateString(
        'en-US',
        {
          month: 'short',
          day: 'numeric',
        }
      )


      acc[date] = (acc[date] || 0) + 1

      return acc

    },
    {}
  )


  const chartData = Object.entries(
    grouped
  ).map(
    ([date, count]) => ({
      date,
      count,
    })
  )


  return (

    <div className="glass rounded-3xl p-6">

      <h2 className="mb-6 text-xl font-semibold">
        Message Activity
      </h2>


      <div className="h-[300px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart data={chartData}>

            <CartesianGrid
              strokeDasharray="3 3"
            />


            <XAxis
              dataKey="date"
            />


            <YAxis
              allowDecimals={false}
            />


            <Tooltip />


            <Line
              type="monotone"
              dataKey="count"
              stroke="currentColor"
              strokeWidth={3}
            />


          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>

  )
}