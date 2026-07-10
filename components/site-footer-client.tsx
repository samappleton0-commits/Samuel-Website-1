'use client'

import { Mail } from 'lucide-react'

import {
  FacebookIcon,
  WhatsappIcon,
} from '@/components/brand-icons'



type FooterProps = {

  footer:any

}





const navLinks = [

  {
    label:'About',
    href:'#about',
  },

  {
    label:'Services',
    href:'#services',
  },

  {
    label:'Work',
    href:'#work',
  },

  {
    label:'Resume',
    href:'#home',
  },

  {
    label:'Contact',
    href:'#contact',
  },

]







export default function SiteFooterClient({

  footer,

}:FooterProps){





const data = {


  brand_name:
    footer?.brand_name ??
    'SAM',



  copyright_name:
    footer?.copyright_name ??
    'Samuel Appleton',



  developer_credit:
    footer?.developer_credit ??
    'Samuel Appleton',



  email:
    footer?.email ??
    '',



  facebook:
    footer?.facebook ??
    '',



  whatsapp:
    footer?.whatsapp ??
    '',


}








const socials = [


  {

    icon:FacebookIcon,

    href:data.facebook,

    label:'Facebook',

  },


  {

    icon:WhatsappIcon,

    href:data.whatsapp,

    label:'WhatsApp',

  },


  {

    icon:Mail,

    href:`mailto:${data.email}`,

    label:'Email',

  },


]








return (


<footer className="border-t border-surface-border">


  <div className="
    mx-auto
    max-w-6xl
    px-4
    py-12
    sm:px-6
  ">



    <div className="
      flex
      flex-col
      items-center
      justify-between
      gap-8
      md:flex-row
    ">





      {/* BRAND */}


      <a

        href="#home"

        className="
          font-heading
          text-xl
          font-bold
        "

      >

        {data.brand_name}

        <span className="text-accent">

          .

        </span>


      </a>







      {/* NAVIGATION */}


      <ul className="
        flex
        flex-wrap
        items-center
        justify-center
        gap-x-6
        gap-y-2
      ">


        {
          navLinks.map((link)=>(


            <li

              key={link.href}

            >


              <a

                href={link.href}

                className="
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







      {/* SOCIALS */}


      <div className="
        flex
        items-center
        gap-3
      ">


        {
          socials.map((social)=>{


            const Icon =
              social.icon



            return (


              <a


                key={social.label}


                href={social.href}


                target="_blank"


                rel="noreferrer"


                aria-label={social.label}


                className="
                  glass
                  flex
                  size-10
                  items-center
                  justify-center
                  rounded-full
                  text-muted-foreground
                  transition-colors
                  hover:text-accent
                "


              >


                <Icon className="size-5"/>


              </a>


            )


          })
        }


      </div>





    </div>








    {/* COPYRIGHT */}


    <div className="
      mt-8
      border-t
      border-surface-border
      pt-6
      text-center
      text-sm
      text-muted-foreground
    ">



      <p>

        &copy; {new Date().getFullYear()} {data.copyright_name}. All rights reserved.

      </p>




      <p className="mt-1">

        Designed &amp; Developed by {data.developer_credit}

      </p>




    </div>





  </div>


</footer>


)


}