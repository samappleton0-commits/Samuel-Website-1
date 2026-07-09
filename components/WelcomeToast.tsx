'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase-browser'

export default function WelcomeToast() {
  const pathname = usePathname()

  useEffect(() => {
    async function loadAnnouncement() {
      // Only show on landing page
      if (pathname !== '/') return

      const lastShown = localStorage.getItem(
        'announcement-last-shown'
      )

      const now = Date.now()

      // 2 hours
      const twoHours = 2 * 60 * 60 * 1000

      if (
        lastShown &&
        now - Number(lastShown) < twoHours
      ) {
        return
      }

      const supabase = createClient()

      const { data, error } = await supabase
        .from('site_announcements')
        .select('title, message')
        .eq('active', true)
        .order('created_at', {
          ascending: false,
        })
        .limit(1)
        .single()

      if (error || !data) {
        return
      }

      setTimeout(() => {
        toast(data.title, {
          description: data.message,
          duration: 6000,
        })

        localStorage.setItem(
          'announcement-last-shown',
          Date.now().toString()
        )
      }, 1000)
    }

    loadAnnouncement()
  }, [pathname])

  return null
}