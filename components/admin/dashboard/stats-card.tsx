'use client'

/* =========================================================
   IMPORTS
========================================================= */

import { LucideIcon } from 'lucide-react'

/* =========================================================
   TYPES
========================================================= */

type Props = {
  title: string
  value: number | string
  subtitle?: string
  icon: LucideIcon
  color?: string
}

/* =========================================================
   COMPONENT
========================================================= */

export default function StatsCard({

  title,

  value,

  subtitle,

  icon: Icon,

  color = 'text-accent',

}: Props) {

  return (

    <div
      className="
        group
        rounded-3xl
        border
        bg-card
        p-6
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >

      {/* ============================
          TOP
      ============================ */}

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        <div>

          <p
            className="
              text-sm
              font-medium
              text-muted-foreground
            "
          >

            {title}

          </p>

          <h2
            className="
              mt-3
              text-4xl
              font-bold
            "
          >

            {value}

          </h2>

        </div>

        <div
          className="
            rounded-2xl
            bg-muted
            p-4
          "
        >

          <Icon
            size={28}
            className={color}
          />

        </div>

      </div>

      {/* ============================
          FOOTER
      ============================ */}

      {

        subtitle && (

          <p
            className="
              mt-5
              text-sm
              text-muted-foreground
            "
          >

            {subtitle}

          </p>

        )

      }

    </div>

  )

}