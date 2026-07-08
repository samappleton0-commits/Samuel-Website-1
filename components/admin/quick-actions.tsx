'use client'

import Link from 'next/link'

import {
  Mail,
  Globe,
  Settings,
  Download,
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
          href="/admin/messages"
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

        {/* Settings (Coming Soon) */}
        <div className="cursor-not-allowed rounded-2xl border border-dashed border-surface-border p-5 opacity-60">

          <Settings
            size={32}
            className="mb-4"
          />

          <h3 className="font-semibold">
            Settings
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Coming soon
          </p>

        </div>

        {/* Export */}
        <div className="rounded-2xl border border-surface-border p-5 transition hover:-translate-y-1 hover:shadow-lg">

          <Download
            size={32}
            className="mb-4"
          />

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