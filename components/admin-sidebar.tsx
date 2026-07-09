/* =========================================================
   ADMIN SIDEBAR START
========================================================= */


'use client'


import Image from 'next/image'

import Link from 'next/link'

import { usePathname } from 'next/navigation'

import { useState } from 'react'


import {
  LayoutDashboard,
  Mail,
  Menu,
  X,
  Megaphone,
  FolderKanban,
} from 'lucide-react'



import LogoutButton from '@/components/logout-button'






const links = [


  {
    name: 'Dashboard',

    href: '/admin',

    icon: LayoutDashboard,
  },





  {
    name: 'Messages',

    href: '/admin/messages',

    icon: Mail,
  },






  {
    name: 'Announcements',

    href: '/admin/announcements',

    icon: Megaphone,
  },






  {
    name: 'Projects',

    href: '/admin/projects',

    icon: FolderKanban,
  },



]









export default function AdminSidebar(){



  const pathname =
    usePathname()



  const [open,setOpen] =
    useState(false)








  return (

    <>





      {/* ===============================
          MOBILE HEADER
      =============================== */}


      <div
        className="
          flex
          items-center
          justify-between
          rounded-3xl
          glass
          p-4
          mb-4
          lg:hidden
        "
      >


        <h2 className="font-bold text-lg">

          Admin Panel

        </h2>





        <button

          onClick={() =>
            setOpen(true)
          }


          className="
            rounded-xl
            p-2
            hover:bg-surface
          "

        >

          <Menu size={25}/>


        </button>




      </div>









      {/* ===============================
          MOBILE OVERLAY
      =============================== */}



      {
        open && (

          <div

            onClick={() =>
              setOpen(false)
            }


            className="
              fixed
              inset-0
              z-40
              bg-black/50
              lg:hidden
            "

          />

        )
      }









      {/* ===============================
          SIDEBAR
      =============================== */}





      <aside


        className={`

          flex
          flex-col

          rounded-3xl

          p-6

          bg-background

          border
          border-surface-border


          fixed

          top-0

          left-0

          z-50


          h-screen

          w-72


          transition-transform

          duration-300


          ${
            open
            ?
            'translate-x-0'
            :
            '-translate-x-full'
          }



          lg:static

          lg:h-fit

          lg:min-h-screen

          lg:w-auto

          lg:translate-x-0


        `}


      >







        {/* ===============================
            CLOSE BUTTON
        =============================== */}



        <div
          className="
            flex
            justify-end
            mb-4
            lg:hidden
          "
        >


          <button


            onClick={() =>
              setOpen(false)
            }



            className="
              rounded-xl
              p-2
              hover:bg-surface
            "


          >

            <X size={22}/>


          </button>


        </div>









        {/* ===============================
            PROFILE
        =============================== */}




        <div
          className="
            mb-8
            text-center
          "
        >



          <Image


            src="/profileme.png"


            alt="Samuel Appleton"


            width={90}


            height={90}


            className="
              mx-auto
              rounded-full
              border
              border-surface-border
              object-cover
            "


          />





          <h2 className="mt-4 text-xl font-bold">


            Samuel Appleton


          </h2>






          <p
            className="
              mt-1
              text-sm
              text-muted-foreground
            "
          >

            Administrator

          </p>




        </div>









        {/* ===============================
            NAVIGATION
        =============================== */}




        <nav className="space-y-2">



          {
            links.map(
              (link) => {


                const Icon =
                  link.icon



                const active =
                  pathname === link.href






                return (

                  <Link


                    key={
                      link.name
                    }



                    href={
                      link.href
                    }



                    onClick={() =>
                      setOpen(false)
                    }




                    className={`

                      flex

                      items-center

                      gap-3

                      rounded-xl

                      px-4

                      py-3

                      text-sm

                      transition



                      ${
                        active

                        ?

                        'bg-accent text-white'

                        :

                        'hover:bg-surface'

                      }


                    `}


                  >



                    <Icon size={20}/>



                    {link.name}



                  </Link>


                )


              }

            )
          }



        </nav>









        {/* ===============================
            LOGOUT
        =============================== */}



        <div className="mt-8">


          <LogoutButton />


        </div>







      </aside>





    </>

  )


}


/* =========================================================
   ADMIN SIDEBAR END
========================================================= */