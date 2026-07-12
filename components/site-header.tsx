'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Menu, X, Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'


// =====================================================
// NAVIGATION LINKS
// =====================================================

const NAV_LINKS = [

  {
    label: 'Home',
    href: '/',
  },

  {
    label: 'About',
    href: '/#about',
  },

  {
    label: 'Services',
    href: '/#services',
  },

  {
    label: 'Work',
    href: '/#work',
  },

  {
    label: 'Blog',
    href: '/blog',
  },

  {
    label: 'Contact',
    href: '/#contact',
  },

]





// =====================================================
// THEME TOGGLE
// =====================================================

function ThemeToggle() {


  const [isLight, setIsLight] = useState(false)



  useEffect(() => {


    const stored =
      localStorage.getItem('theme')


    const light =
      stored === 'light'


    setIsLight(light)


    document.documentElement.classList.toggle(
      'light',
      light
    )


  }, [])





  const toggle = () => {


    const next =
      !isLight



    setIsLight(next)



    document.documentElement.classList.toggle(
      'light',
      next
    )



    localStorage.setItem(
      'theme',
      next ? 'light' : 'dark'
    )


  }






  return (


    <button

      type="button"

      onClick={toggle}

      aria-label="Toggle color theme"

      className="
        glass
        flex
        size-10
        items-center
        justify-center
        rounded-full
        text-foreground
        transition-colors
        hover:text-accent
      "

    >


      {

        isLight

        ?

        <Moon className="size-5" />

        :

        <Sun className="size-5" />

      }


    </button>


  )


}







// =====================================================
// SITE HEADER
// =====================================================

export function SiteHeader() {


  const [open,setOpen] =
    useState(false)



  const [scrolled,setScrolled] =
    useState(false)





  const {
    scrollYProgress
  } = useScroll()





  const progress = useSpring(

    scrollYProgress,

    {

      stiffness:120,

      damping:30,

      restDelta:0.001,

    }

  )







  useEffect(()=>{


    const onScroll = ()=>{


      setScrolled(

        window.scrollY > 20

      )


    }





    onScroll()



    window.addEventListener(

      'scroll',

      onScroll,

      {
        passive:true
      }

    )





    return ()=>


      window.removeEventListener(

        'scroll',

        onScroll

      )



  },[])









  return (


    <header className="fixed inset-x-0 top-0 z-50">





      {/* Scroll progress */}

      <motion.div

        style={{
          scaleX:progress
        }}

        className="
          h-0.5
          origin-left
          bg-gradient-to-r
          from-primary
          via-accent
          to-secondary
        "

      />








      <div


        className={cn(


          'transition-all duration-300',


          scrolled

          ?

          'glass shadow-lg shadow-black/20'

          :

          'bg-transparent'


        )}


      >







        <nav


          className="
            mx-auto
            flex
            h-16
            max-w-6xl
            items-center
            justify-between
            px-4
            sm:px-6
          "


        >







          {/* LOGO */}


          <a


            href="/"


            className="
              font-heading
              text-lg
              font-bold
              tracking-tight
            "


          >


            SAM<span className="text-accent">.</span>


          </a>









          {/* DESKTOP LINKS */}


          <ul


            className="
              hidden
              items-center
              gap-1
              lg:flex
            "


          >


            {

              NAV_LINKS.map((link)=>(


                <li

                  key={link.href}

                >


                  <a


                    href={link.href}


                    className="
                      rounded-full
                      px-3
                      py-2
                      text-sm
                      text-muted-foreground
                      transition-colors
                      hover:text-foreground
                    "


                  >


                    {link.label}


                  </a>


                </li>


              ))


            }


          </ul>









          {/* ACTIONS */}


          <div className="flex items-center gap-2">


            <ThemeToggle />





            <Button


              render={

                <a href="/#contact"/>

              }


              className="
                hidden
                rounded-full
                bg-primary
                text-primary-foreground
                hover:bg-primary/90
                sm:inline-flex
              "


            >


              Contact Me


            </Button>








            {/* MOBILE MENU BUTTON */}


            <button


              type="button"


              aria-label="Toggle navigation menu"


              aria-expanded={open}


              onClick={()=>

                setOpen(v=>!v)

              }


              className="
                glass
                flex
                size-10
                items-center
                justify-center
                rounded-full
                lg:hidden
              "


            >


              {

                open

                ?

                <X className="size-5"/>

                :

                <Menu className="size-5"/>

              }


            </button>


          </div>




        </nav>








        {/* MOBILE MENU */}


        {

          open && (


            <motion.ul


              initial={{
                opacity:0,
                height:0
              }}


              animate={{
                opacity:1,
                height:'auto'
              }}


              className="
                mx-4
                mb-3
                overflow-hidden
                rounded-2xl
                border
                border-surface-border
                bg-background
                p-2
                shadow-xl
                lg:hidden
              "


            >


              {

                NAV_LINKS.map((link)=>(


                  <li

                    key={link.href}

                  >


                    <a


                      href={link.href}


                      onClick={()=>setOpen(false)}


                      className="
                        block
                        rounded-xl
                        px-4
                        py-3
                        text-sm
                        text-muted-foreground
                        transition-colors
                        hover:bg-surface
                        hover:text-foreground
                      "


                    >


                      {link.label}


                    </a>


                  </li>


                ))


              }


            </motion.ul>


          )


        }





      </div>


    </header>


  )


}