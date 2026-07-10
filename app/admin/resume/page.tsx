import Link from 'next/link'

import {
  User,
  GraduationCap,
  BriefcaseBusiness,
  Star,
  Users,
  ArrowRight,
  Eye,
} from 'lucide-react'

import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase-server'


const sections = [

  {
    title: 'Personal Information',
    description:
      'Manage your personal details, contact information and career objective.',
    href: '/admin/resume/profile',
    icon: User,
  },

  {
    title: 'Education',
    description:
      'Manage schools, degrees, certifications and training.',
    href: '/admin/resume/education',
    icon: GraduationCap,
  },

  {
    title: 'Work Experience',
    description:
      'Manage your employment history and responsibilities.',
    href: '/admin/resume/experience',
    icon: BriefcaseBusiness,
  },

  {
    title: 'Skills',
    description:
      'Manage your professional and technical skills.',
    href: '/admin/resume/skills',
    icon: Star,
  },

  {
    title: 'References',
    description:
      'Manage your professional references.',
    href: '/admin/resume/references',
    icon: Users,
  },

]



export default async function ResumePage() {


  const supabase =
    await createClient()



  const {
    data: {
      user,
    },
  } =
  await supabase.auth.getUser()





  if (!user) {

    redirect('/login')

  }






  return (

    <div className="max-w-6xl">


      <div className="
        mb-10
        flex
        flex-col
        gap-5
        sm:flex-row
        sm:items-center
        sm:justify-between
      ">



        <div>


          <h1 className="text-3xl font-bold">

            Resume Management

          </h1>



          <p className="
            mt-2
            text-muted-foreground
          ">

            Manage every section of your professional resume.

          </p>


        </div>





        <Link

          href="/admin/resume/preview"

          className="
            inline-flex
            items-center
            justify-center
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

          <Eye size={18}/>

          Preview Resume

        </Link>



      </div>








      <div className="
        grid
        gap-6
        md:grid-cols-2
      ">


        {
          sections.map((section) => {


            const Icon = section.icon



            return (


              <Link

                key={section.title}

                href={section.href}

                className="
                  group
                  rounded-2xl
                  border
                  border-border
                  bg-card
                  p-6
                  transition
                  hover:-translate-y-1
                  hover:border-accent/50
                "

              >


                <div className="
                  flex
                  items-start
                  justify-between
                ">


                  <div
                    className="
                      rounded-xl
                      bg-accent/10
                      p-3
                    "
                  >

                    <Icon size={24}/>

                  </div>





                  <ArrowRight

                    className="
                      transition-transform
                      group-hover:translate-x-1
                    "

                  />


                </div>





                <h2 className="
                  mt-5
                  text-xl
                  font-semibold
                ">

                  {section.title}

                </h2>





                <p className="
                  mt-2
                  text-sm
                  leading-6
                  text-muted-foreground
                ">

                  {section.description}

                </p>



              </Link>


            )

          })
        }


      </div>


    </div>

  )

}