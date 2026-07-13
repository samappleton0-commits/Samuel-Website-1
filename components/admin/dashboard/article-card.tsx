'use client'

/* =========================================================
   IMPORTS
========================================================= */

import Image from 'next/image'
import Link from 'next/link'

import {
  Pencil,
  Calendar,
  Star,
  FolderOpen,
} from 'lucide-react'

/* =========================================================
   TYPES
========================================================= */

export type DashboardArticle = {

  id: string

  title: string

  category: string | null

  featured_image: string | null

  featured: boolean

  status: 'draft' | 'pending' | 'published'

  updated_at: string

}

type Props = {

  article: DashboardArticle

}

/* =========================================================
   COMPONENT
========================================================= */

export default function ArticleCard({

  article,

}: Props) {

  function getStatusStyle() {

    switch (article.status) {

      case 'published':

        return 'bg-green-500/10 text-green-600'

      case 'pending':

        return 'bg-blue-500/10 text-blue-600'

      default:

        return 'bg-yellow-500/10 text-yellow-600'

    }

  }

  return (

    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        bg-card
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >

      {/* =====================================================
          IMAGE
      ===================================================== */}

      <div className="relative h-52 w-full bg-muted">

        {

          article.featured_image ? (

            <Image

              src={article.featured_image}

              alt={article.title}

              fill

              className="object-cover"

            />

          ) : (

            <div
              className="
                flex
                h-full
                items-center
                justify-center
                text-muted-foreground
              "
            >

              No Featured Image

            </div>

          )

        }

      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="space-y-5 p-6">

        {/* CATEGORY + STATUS */}

        <div className="flex flex-wrap gap-2">

          <span
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-muted
              px-3
              py-1
              text-xs
            "
          >

            <FolderOpen size={14} />

            {article.category || 'General'}

          </span>

          <span
            className={`
              rounded-full
              px-3
              py-1
              text-xs
              ${getStatusStyle()}
            `}
          >

            {article.status}

          </span>

          {

            article.featured && (

              <span
                className="
                  inline-flex
                  items-center
                  gap-1
                  rounded-full
                  bg-amber-500/10
                  px-3
                  py-1
                  text-xs
                  text-amber-600
                "
              >

                <Star
                  size={14}
                  fill="currentColor"
                />

                Featured

              </span>

            )

          }

        </div>

        {/* TITLE */}

        <h3
          className="
            line-clamp-2
            text-xl
            font-bold
          "
        >

          {article.title}

        </h3>

        {/* DATE */}

        <div
          className="
            flex
            items-center
            gap-2
            text-sm
            text-muted-foreground
          "
        >

          <Calendar size={16} />

          Updated{' '}

          {new Date(article.updated_at).toLocaleDateString()}

        </div>

        {/* BUTTON */}

        <Link

          href={`/admin/blog/${article.id}`}

          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-accent
            px-5
            py-3
            text-white
            transition
            hover:opacity-90
          "

        >

          <Pencil size={16} />

          Edit Article

        </Link>

      </div>

    </div>

  )

}