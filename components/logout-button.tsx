'use client'

import { createClient } from '@/lib/supabase-browser'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function LogoutButton() {
  const router = useRouter()
  const supabase = createClient()

  async function logout() {
    await supabase.auth.signOut()

    router.push('/login')
    router.refresh()
  }

  return (
    <Button
      onClick={logout}
      variant="outline"
      className="rounded-full"
    >
      Logout
    </Button>
  )
}