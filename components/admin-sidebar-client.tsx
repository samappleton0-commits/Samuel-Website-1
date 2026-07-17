'use client'


import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'


import {

  LayoutDashboard,

  Menu,

  X,

  Megaphone,

  MessageCircle,

  ChevronDown,

  FileText,

  Settings,

  Home,

  UserRound,

} from 'lucide-react'


import LogoutButton from '@/components/logout-button'






type Role = 'admin' | 'editor' | 'user'





type Props = {

  role: Role

  profile: {

    name: string

    email: string

    avatar_url: string | null

  }

}





type MenuItem = {

  name: string

  href: string

  icon: any

}







// =====================================================
// CONTENT
// =====================================================


const contentLinks: MenuItem[] = [


  {

    name: 'Homepage Manager',

    href: '/admin/homepage',

    icon: Home,

  },


]








// =====================================================
// COMMUNICATION
// =====================================================


const communicationLinks: MenuItem[] = [


  {

    name: 'Blog',

    href: '/admin/blog',

    icon: FileText,

  },


]






const adminCommunicationLinks: MenuItem[] = [


  {

    name: 'Announcements',

    href: '/admin/announcements',

    icon: Megaphone,

  },


  {

    name: 'Comments',

    href: '/admin/comments',

    icon: MessageCircle,

  },


]








// =====================================================
// MANAGEMENT
// =====================================================


const managementLinks: MenuItem[] = [


  {

    name: 'Settings',

    href: '/admin/settings',

    icon: Settings,

  },


  {

    name: 'Security',

    href: '/admin/settings/security',

    icon: Settings,

  },


]








const adminManagementLinks: MenuItem[] = [


  {

    name: 'Users',

    href: '/admin/users',

    icon: UserRound,

  },


]








export default function AdminSidebarClient({

  role,

  profile,

}: Props) {



  const pathname = usePathname()



  const [open, setOpen] = useState(false)

const [contentOpen,setContentOpen] = useState(false)

const [communicationOpen,setCommunicationOpen] = useState(false)

const [managementOpen,setManagementOpen] = useState(false)






  const initials = profile.name

    .split(' ')

    .filter(Boolean)

    .slice(0, 2)

    .map(word => word[0])

    .join('')

    .toUpperCase()






  function renderLinks(items: MenuItem[]) {


    return items.map((link) => {


      const Icon = link.icon


      const active = pathname === link.href





      return (


        <Link


          key={link.href}


          href={link.href}


          onClick={() => setOpen(false)}


          className={`

            flex

            min-w-0

            items-center

            gap-3

            rounded-xl

            px-4

            py-3

            text-sm

            transition


            ${
              active

              ? 'bg-primary text-primary-foreground'

              : 'hover:bg-muted'

            }

          `}


        >


          <Icon

            size={19}

            className="shrink-0"

          />



          <span className="truncate">

            {link.name}

          </span>



        </Link>


      )


    })


  }


  return (

    <>


      {/* =====================================
          MOBILE HEADER
      ====================================== */}


      <div

        className="

          flex

          items-center

          justify-between

          rounded-2xl

          border

          bg-background

          px-4

          py-3

          shadow-sm

          lg:hidden

        "

      >


        <h2

          className="

            truncate

            text-lg

            font-bold

          "

        >

          Admin Panel

        </h2>





        <button


          onClick={() => setOpen(true)}


          className="

            flex

            shrink-0

            items-center

            justify-center

            rounded-xl

            border

            p-2

            hover:bg-muted

          "


        >


          <Menu size={22}/>


        </button>



      </div>









      {/* =====================================
          MOBILE OVERLAY
      ====================================== */}



      {

        open && (

          <div


            onClick={() => setOpen(false)}


            className="

              fixed

              inset-0

              z-40

              bg-black/50

              backdrop-blur-sm

              lg:hidden

            "


          />


        )

      }









      {/* =====================================
          SIDEBAR
      ====================================== */}



      <aside


        className={`

          fixed

          left-0

          top-0

          z-50


          flex

          h-dvh


          w-[85vw]

          max-w-[320px]


          flex-col


          border-r

          bg-background


          p-5



          transition-transform

          duration-300

          ease-in-out



          ${

            open

            ? 'translate-x-0'

            : '-translate-x-full'

          }



          lg:static

          lg:h-[calc(100vh-40px)]

          lg:w-full

          lg:max-w-none

          lg:translate-x-0

          lg:rounded-3xl

          lg:border


        `}


      >







        {/* =====================================
            MOBILE CLOSE BUTTON
        ====================================== */}



        <div

          className="

            mb-4

            flex

            justify-end

            lg:hidden

          "

        >


          <button


            onClick={() => setOpen(false)}


            className="

              rounded-xl

              p-2

              hover:bg-muted

            "


          >


            <X size={22}/>


          </button>


        </div>









        {/* =====================================
            PROFILE
        ====================================== */}



        <div


          className="

            mb-6

            shrink-0

            text-center

          "


        >





          {

            profile.avatar_url ? (



              <Image


                src={profile.avatar_url}


                alt={profile.name}


                width={80}


                height={80}


                className="

                  mx-auto

                  h-20

                  w-20

                  rounded-full

                  border

                  object-cover

                "


              />



            ) : (



              <div


                className="

                  mx-auto

                  flex

                  h-20

                  w-20

                  items-center

                  justify-center

                  rounded-full

                  bg-primary

                  text-xl

                  font-bold

                  text-primary-foreground

                "


              >


                {initials}


              </div>



            )


          }







          <h2


            className="

              mt-4

              truncate

              text-lg

              font-bold

            "


          >


            {profile.name}


          </h2>








          <p


            className="

              text-sm

              text-muted-foreground

            "


          >


            {

              role === 'admin'

              ? 'Administrator'

              : role === 'editor'

              ? 'Editor'

              : 'User'


            }


          </p>







          <p


            className="

              mt-1

              truncate

              text-xs

              text-muted-foreground

            "


          >


            {profile.email}


          </p>





        </div>



        {/* =====================================
            NAVIGATION
        ====================================== */}



        <nav


          className="

            flex-1

            min-h-0

            space-y-5

            overflow-y-auto

            overflow-x-hidden

            scrollbar-hide

            pr-1

          "


        >







          {/* DASHBOARD */}



          <Link


            href="/admin"


            onClick={() => setOpen(false)}


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

                pathname === '/admin'

                ? 'bg-primary text-primary-foreground'

                : 'hover:bg-muted'


              }


            `}


          >



            <LayoutDashboard

              size={19}

              className="shrink-0"

            />



            <span>

              Dashboard

            </span>



          </Link>









          {/* =====================================
              CONTENT
          ====================================== */}



          {

            role === 'admin' && (



              <div>


                <button


                  onClick={() => setContentOpen(!contentOpen)}


                  className="

                    flex

                    w-full

                    items-center

                    justify-between

                    px-4

                    text-xs

                    font-semibold

                    uppercase

                    text-muted-foreground

                  "


                >



                  Content




                  <ChevronDown


                    size={16}


                    className={

                      contentOpen

                      ? 'rotate-180 transition'

                      : 'transition'

                    }


                  />


                </button>







                {

                  contentOpen && (


                    <div


                      className="

                        mt-2

                        space-y-2

                      "


                    >



                      {renderLinks(contentLinks)}



                    </div>


                  )


                }



              </div>


            )


          }









          {/* =====================================
              COMMUNICATION
          ====================================== */}



          <div>


            <button


              onClick={() => setCommunicationOpen(!communicationOpen)}


              className="

                flex

                w-full

                items-center

                justify-between

                px-4

                text-xs

                font-semibold

                uppercase

                text-muted-foreground

              "


            >



              Communication






              <ChevronDown


                size={16}


                className={

                  communicationOpen

                  ? 'rotate-180 transition'

                  : 'transition'

                }


              />



            </button>









            {

              communicationOpen && (



                <div


                  className="

                    mt-2

                    space-y-2

                  "


                >




                  {renderLinks(communicationLinks)}






                  {


                    role === 'admin' &&

                    renderLinks(adminCommunicationLinks)


                  }





                </div>


              )


            }



          </div>









          {/* =====================================
              MANAGEMENT
          ====================================== */}



          <div>


            <button


              onClick={() => setManagementOpen(!managementOpen)}


              className="

                flex

                w-full

                items-center

                justify-between

                px-4

                text-xs

                font-semibold

                uppercase

                text-muted-foreground

              "


            >



              Management






              <ChevronDown


                size={16}


                className={

                  managementOpen

                  ? 'rotate-180 transition'

                  : 'transition'

                }


              />



            </button>








            {

              managementOpen && (



                <div


                  className="

                    mt-2

                    space-y-2

                  "


                >



                  {renderLinks(managementLinks)}






                  {


                    role === 'admin' &&

                    renderLinks(adminManagementLinks)


                  }





                </div>


              )


            }



          </div>






        </nav>

        {/* =====================================
            LOGOUT
        ====================================== */}



        <div


          className="

            mt-5

            shrink-0

            border-t

            pt-5

          "


        >


          <LogoutButton />


        </div>





      </aside>





    </>


  )


}