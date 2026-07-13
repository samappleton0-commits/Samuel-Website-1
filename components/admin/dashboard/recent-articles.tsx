'use client'

/* =========================================================
   IMPORTS
========================================================= */

import ArticleCard, {
  DashboardArticle,
} from './article-card'

import {
  FileText,
} from 'lucide-react'

/* =========================================================
   TYPES
========================================================= */

type Props = {

  title?: string

  description?: string

  articles: DashboardArticle[]

}

/* =========================================================
   COMPONENT
========================================================= */

export default function RecentArticles({

  title = 'Recent Articles',

  description = 'Continue editing your latest articles.',

  articles,

}: Props) {

  return (

    <section className="space-y-6">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div>

        <h2 className="text-2xl font-bold">

          {title}

        </h2>

        <p className="mt-2 text-muted-foreground">

          {description}

        </p>

      </div>

      {/* ==========================================
          EMPTY STATE
      ========================================== */}

      {

        articles.length === 0 ? (

          <div
            className="
              rounded-3xl
              border
              bg-card
              py-20
              text-center
            "
          >

            <FileText
              size={52}
              className="
                mx-auto
                text-muted-foreground
              "
            />

            <h3
              className="
                mt-6
                text-xl
                font-semibold
              "
            >

              No Articles Yet

            </h3>

            <p
              className="
                mt-3
                text-muted-foreground
              "
            >

              Create your first blog article to get started.

            </p>

          </div>

        ) : (

          <div
            className="
              grid
              gap-6
              lg:grid-cols-2
              xl:grid-cols-3
            "
          >

            {

              articles.map((article)=>(

                <ArticleCard

                  key={article.id}

                  article={article}

                />

              ))

            }

          </div>

        )

      }

    </section>

  )

}