'use client'

import Link from 'next/link'

import {
  Mail,
  Globe,
  Settings,
} from 'lucide-react'

import ExportCsvButton from './export-csv-button'


export default function QuickActions() {

  return (

    <div className="glass mb-8 rounded-3xl p-6">


      <h2 className="mb-6 text-xl font-semibold">
        Quick Actions
      </h2>



      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">



        {/* Messages */}

        <Link
          href="/admin"
          className="rounded-2xl border border-surface-border p-5 transition hover:-translate-y-1 hover:shadow-lg"
        >

          <Mail
            size={32}
            className="mb-4"
          />


          <h3 className="font-semibold">
            Messages
          </h3>


          <p className="mt-1 text-sm text-muted-foreground">
            View all contact messages
          </p>


        </Link>





        {/* Portfolio */}

        <Link
          href="/"
          target="_blank"
          className="rounded-2xl border border-surface-border p-5 transition hover:-translate-y-1 hover:shadow-lg"
        >

          <Globe
            size={32}
            className="mb-4"
          />


          <h3 className="font-semibold">
            Portfolio
          </h3>


          <p className="mt-1 text-sm text-muted-foreground">
            Open your website
          </p>


        </Link>





        {/* Settings */}

        <Link
          href="/admin/settings"
          className="rounded-2xl border border-surface-border p-5 transition hover:-translate-y-1 hover:shadow-lg"
        >

          <Settings
            size={32}
            className="mb-4"
          />


          <h3 className="font-semibold">
            Settings
          </h3>


          <p className="mt-1 text-sm text-muted-foreground">
            Manage your account
          </p>


        </Link>





        {/* Export */}

        <div
          className="rounded-2xl border border-surface-border p-5 transition hover:-translate-y-1 hover:shadow-lg"
        >

          <div className="mb-4">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />

              <polyline points="7 10 12 15 17 10" />

              <line
                x1="12"
                y1="15"
                x2="12"
                y2="3"
              />

            </svg>

          </div>



          <h3 className="font-semibold">
            Export Contacts
          </h3>


          <p className="mb-4 mt-1 text-sm text-muted-foreground">
            Download contacts as CSV
          </p>



          <ExportCsvButton />


        </div>




      </div>


    </div>

  )
}