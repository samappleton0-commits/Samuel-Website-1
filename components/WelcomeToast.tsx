'use client'

import { useEffect } from 'react'
import { toast } from 'sonner'

export default function WelcomeToast() {
  useEffect(() => {
    const timer = setTimeout(() => {
      toast('👋 Welcome!', {
        description:
          'Thanks for visiting my portfolio. Feel free to explore my Projects, Services, and Get in touch by sending a massage through the contact form.',
        duration: 6000,
      })
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return null
}