'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-browser'
import { Button } from '@/components/ui/button'

type Props = {
  id: string
  read: boolean
}

export default function AdminMessageActions({
  id,
  read,
}: Props) {
  const router = useRouter()
  const supabase = createClient()

  async function toggleRead() {
    await supabase
      .from('contacts')
      .update({
        read: !read,
      })
      .eq('id', id)

    router.refresh()
  }


  async function deleteMessage() {
    const confirmDelete = confirm(
      'Are you sure you want to delete this message?'
    )

    if (!confirmDelete) return


    await supabase
      .from('contacts')
      .delete()
      .eq('id', id)

    router.refresh()
  }


  return (
    <div className="flex gap-3">

      <Button
        onClick={toggleRead}
        variant="outline"
        className="rounded-full"
      >
        {read ? 'Mark Unread' : 'Mark Read'}
      </Button>


      <Button
        onClick={deleteMessage}
        variant="outline"
        className="rounded-full text-red-500"
      >
        Delete
      </Button>

    </div>
  )
}