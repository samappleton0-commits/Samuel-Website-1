'use client'

import Link from 'next/link'

export default function QuickActions() {
  return (
    <div className="glass mb-8 rounded-3xl p-6">

      <h2 className="mb-6 text-xl font-semibold">
        Quick Actions
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <Link
          href="/admin"
          className="rounded-2xl border border-surface-border p-5 transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="text-3xl">
            📩
          </div>

          <h3 className="mt-3 font-semibold">
            Messages
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            View all contact messages
          </p>
        </Link>

        <Link
          href="/"
          target="_blank"
          className="rounded-2xl border border-surface-border p-5 transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="text-3xl">
            🌐
          </div>

          <h3 className="mt-3 font-semibold">
            Portfolio
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Open your website
          </p>
        </Link>

        <Link
          href="/admin/settings"
          className="rounded-2xl border border-surface-border p-5 transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="text-3xl">
            ⚙️
          </div>

          <h3 className="mt-3 font-semibold">
            Settings
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage your account
          </p>
        </Link>

        <Link
          href="/admin"
          className="rounded-2xl border border-surface-border p-5 transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="text-3xl">
            📊
          </div>

          <h3 className="mt-3 font-semibold">
            Dashboard
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Refresh overview
          </p>
        </Link>

      </div>

    </div>
  )
}