'use client'


import StatsGrid from './stats-grid'

import QuickActions from './quick-actions'

import RecentMessages from './recent-messages'

import AnalyticsSummary from './analytics-summary'

import MessageChart from './charts/message-chart'

import StatusChart from './charts/status-chart'

import {
  useLiveMessages,
} from './live-messages'



export default function LiveDashboard() {


  const messages =
    useLiveMessages()



  return (

    <>


      <AnalyticsSummary

        messages={messages}

      />




      <StatsGrid

        messages={messages}

      />





      <QuickActions />






      <div className="
        mb-8
        grid
        gap-6
        xl:grid-cols-2
      ">


        <MessageChart

          messages={messages}

        />



        <StatusChart

          messages={messages}

        />


      </div>






      <RecentMessages

        messages={messages}

      />


    </>

  )

}