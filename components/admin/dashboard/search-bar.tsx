'use client'

/* =========================================================
   IMPORTS
========================================================= */

import { Search, X } from 'lucide-react'

/* =========================================================
   TYPES
========================================================= */

type Props = {

  value: string

  onChange: (value: string) => void

  placeholder?: string

}

/* =========================================================
   COMPONENT
========================================================= */

export default function SearchBar({

  value,

  onChange,

  placeholder = 'Search...',

}: Props) {

  return (

    <div className="space-y-2">

      {/* ==========================================
          LABEL
      ========================================== */}

      <label
        className="
          text-sm
          font-medium
          text-muted-foreground
        "
      >

        Search

      </label>

      {/* ==========================================
          INPUT
      ========================================== */}

      <div
        className="
          relative
        "
      >

        <Search
          size={20}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-muted-foreground
          "
        />

        <input

          type="text"

          value={value}

          onChange={(e)=>

            onChange(

              e.target.value

            )

          }

          placeholder={placeholder}

          className="
            w-full
            rounded-2xl
            border
            bg-card
            py-3
            pl-12
            pr-12
            outline-none
            transition
            focus:border-accent
            focus:ring-2
            focus:ring-accent/20
          "

        />

        {

          value && (

            <button

              type="button"

              onClick={()=>

                onChange('')

              }

              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                rounded-full
                p-1
                transition
                hover:bg-muted
              "

            >

              <X
                size={16}
              />

            </button>

          )

        }

      </div>

    </div>

  )

}