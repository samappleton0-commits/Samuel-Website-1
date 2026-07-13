'use client'

/* =========================================================
   IMPORTS
========================================================= */

import Link from 'next/link'

import {
  Plus,
  FileText,
  Clock,
  Eye,
  LucideIcon,
} from 'lucide-react'

/* =========================================================
   TYPES
========================================================= */

type Props = {

  role: 'admin' | 'editor'

}

type Action = {

  title: string

  description: string

  href: string

  icon: LucideIcon

}

/* =========================================================
   COMPONENT
========================================================= */

export default function QuickActions({

  role,

}: Props) {

  const editorActions: Action[] = [

    {

      title: 'New Article',

      description: 'Create a brand new blog post.',

      href: '/admin/blog/new',

      icon: Plus,

    },

    {

      title: 'My Articles',

      description: 'View all your blog articles.',

      href: '/admin/blog',

      icon: FileText,

    },

    {

      title: 'Drafts',

      description: 'Continue writing saved drafts.',

      href: '/admin/blog?status=draft',

      icon: Clock,

    },

    {

      title: 'Pending Review',

      description: 'Articles awaiting approval.',

      href: '/admin/blog?status=pending',

      icon: Eye,

    },

  ]

  const adminActions: Action[] = [

    ...editorActions,

  ]

  const actions =

    role === 'admin'

      ? adminActions

      : editorActions

  return (

    <section className="space-y-6">

      {/* ==========================================
          SECTION TITLE
      ========================================== */}

      <div>

        <h2 className="text-2xl font-bold">

          Quick Actions

        </h2>

        <p className="mt-1 text-muted-foreground">

          Jump directly to the most common tasks.

        </p>

      </div>

      {/* ==========================================
          GRID
      ========================================== */}

      <div
        className="
          grid
          gap-5
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >

        {actions.map((action) => {

          const Icon = action.icon

          return (

            <Link

              key={action.title}

              href={action.href}

              className="
                group
                rounded-3xl
                border
                bg-card
                p-6
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-accent
                hover:shadow-xl
              "

            >

              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-accent/10
                  transition
                  group-hover:bg-accent
                "
              >

                <Icon
                  size={26}
                  className="
                    text-accent
                    transition
                    group-hover:text-white
                  "
                />

              </div>

              <h3
                className="
                  mt-6
                  text-lg
                  font-semibold
                "
              >

                {action.title}

              </h3>

              <p
                className="
                  mt-2
                  text-sm
                  text-muted-foreground
                "
              >

                {action.description}

              </p>

            </Link>

          )

        })}

      </div>

    </section>

  )

}