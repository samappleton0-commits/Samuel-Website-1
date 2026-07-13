'use client'

import Link from 'next/link'

import {

  FileText,

  Plus,

  Mail,

  User,

  Briefcase,

  GraduationCap,

  Megaphone,

  Home,

  Layout,

  Users,

  Phone,

} from 'lucide-react'

type Props={

  role:'admin'|'editor'

}

export default function QuickActions({

  role,

}:Props){

  const editorActions=[

    {

      title:'New Article',

      href:'/admin/blog/new',

      icon:Plus,

      color:'bg-blue-500',

    },

    {

      title:'Articles',

      href:'/admin/blog',

      icon:FileText,

      color:'bg-sky-500',

    },

  ]

  const adminActions=[

    ...editorActions,

    {

      title:'Announcements',

      href:'/admin/announcements',

      icon:Megaphone,

      color:'bg-red-500',

    },

    {

      title:'Hero',

      href:'/admin/hero',

      icon:Home,

      color:'bg-violet-500',

    },

    {

      title:'About',

      href:'/admin/about',

      icon:User,

      color:'bg-orange-500',

    },

    {

      title:'Experience',

      href:'/admin/experience',

      icon:Briefcase,

      color:'bg-indigo-500',

    },

    {

      title:'Education',

      href:'/admin/education',

      icon:GraduationCap,

      color:'bg-pink-500',

    },

    {

      title:'Messages',

      href:'/admin/messages',

      icon:Mail,

      color:'bg-emerald-500',

    },

    {

      title:'Contact',

      href:'/admin/contact',

      icon:Phone,

      color:'bg-cyan-500',

    },

    {

      title:'Footer',

      href:'/admin/footer',

      icon:Layout,

      color:'bg-slate-500',

    },

    {

      title:'Users',

      href:'/admin/users',

      icon:Users,

      color:'bg-amber-500',

    },

  ]

  const actions=

    role==='admin'

      ? adminActions

      : editorActions

  return(

    <section className="space-y-6">

      <div>

        <h2 className="text-2xl font-bold">

          Quick Actions

        </h2>

        <p className="text-muted-foreground">

          Jump directly to any section.

        </p>

      </div>

      <div

        className="

          grid

          gap-5

          sm:grid-cols-2

          lg:grid-cols-3

          xl:grid-cols-5

        "

      >

        {

          actions.map(action=>{

            const Icon=action.icon

            return(

              <Link

                key={action.title}

                href={action.href}

                className="

                  rounded-2xl

                  border

                  bg-card

                  p-5

                  transition-all

                  hover:-translate-y-1

                  hover:shadow-lg

                "

              >

                <div

                  className={`

                    mb-5

                    flex

                    h-14

                    w-14

                    items-center

                    justify-center

                    rounded-2xl

                    text-white

                    ${action.color}

                  `}

                >

                  <Icon

                    size={28}

                  />

                </div>

                <h3

                  className="

                    text-lg

                    font-semibold

                  "

                >

                  {action.title}

                </h3>

              </Link>

            )

          })

        }

      </div>

    </section>

  )

}