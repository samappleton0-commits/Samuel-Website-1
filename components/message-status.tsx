'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-browser'

type Props = {
  id: string
  status: string
}


export default function MessageStatus({
  id,
  status,
}: Props) {

  const router = useRouter()

  const supabase = createClient()


  async function updateStatus(
    newStatus: string
  ) {

    await supabase
      .from('contacts')
      .update({
        status: newStatus,
      })
      .eq('id', id)


    router.refresh()
  }



  return (

    <select
      value={status}
      onChange={(e) =>
        updateStatus(e.target.value)
      }
      className="rounded-full border border-surface-border bg-surface px-4 py-2 text-sm"
    >

      <option value="New">
        🔴 New
      </option>


      <option value="In Progress">
        🟡 In Progress
      </option>


      <option value="Completed">
        🟢 Completed
      </option>


    </select>

  )
}