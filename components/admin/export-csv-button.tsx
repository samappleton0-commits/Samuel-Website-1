'use client'

import { Download } from 'lucide-react'

export default function ExportCsvButton() {
  const handleExport = () => {
    window.open('/api/export/csv', '_blank')
  }

  return (
    <button
      onClick={handleExport}
      className="flex items-center justify-center gap-2 rounded-2xl border border-surface-border px-5 py-3 transition hover:bg-surface"
    >
      <Download size={18} />

      Export CSV
    </button>
  )
}