'use client'

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'


type Message = {
  status: string
}


type Props = {
  messages: Message[]
}


export default function StatusChart({
  messages,
}: Props) {


  const statuses = messages.reduce(
    (
      acc: Record<string, number>,
      message
    ) => {

      const status =
        message.status || 'New'


      acc[status] =
        (acc[status] || 0) + 1


      return acc

    },
    {}
  )


  const data = Object.entries(
    statuses
  ).map(
    ([name, value]) => ({
      name,
      value,
    })
  )


  return (

    <div className="glass rounded-3xl p-6">

      <h2 className="mb-6 text-xl font-semibold">
        Status Overview
      </h2>


      <div className="h-[300px]">


        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
            >

              {data.map(
                (_, index) => (

                  <Cell
                    key={index}
                  />

                )
              )}

            </Pie>


            <Tooltip />


          </PieChart>


        </ResponsiveContainer>


      </div>


    </div>

  )
}