
'use client'


import Link from 'next/link'

import {
  ArrowLeft,
} from 'lucide-react'





export default function BackToResume(){


  return (


    <Link

      href="/admin/resume"

      className="
        mb-6
        inline-flex
        items-center
        gap-2
        rounded-xl
        border
        border-border
        bg-card
        px-4
        py-2
        text-sm
        font-medium
        transition
        hover:bg-muted
      "

    >


      <ArrowLeft size={16}/>


      Back to Resume Dashboard



    </Link>


  )


}