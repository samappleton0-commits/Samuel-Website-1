/* =========================================================
   LIVE DASHBOARD START
========================================================= */

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



      {/* ===============================
          SUMMARY
      =============================== */}


      <AnalyticsSummary

        messages={
          messages
        }

      />








      {/* ===============================
          SMALL STAT CARDS
      =============================== */}


      <StatsGrid

        messages={
          messages
        }

      />








      {/* ===============================
          QUICK ACTIONS
      =============================== */}


      <QuickActions />









      {/* ===============================
          RECENT MESSAGES
          Maximum 3 items
      =============================== */}


      <RecentMessages

        messages={
          messages.slice(0,3)
        }

      />








      {/* ===============================
          ACTIVITY + STATUS
      =============================== */}



      <div

        className="
          mt-8
          grid
          gap-6
          xl:grid-cols-2
        "

      >



        <MessageChart

          messages={
            messages
          }

        />




        <StatusChart

          messages={
            messages
          }

        />




      </div>






    </>

  )

}



/* =========================================================
   LIVE DASHBOARD END
========================================================= */