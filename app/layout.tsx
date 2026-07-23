import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

import type {
  Metadata,
  Viewport,
} from 'next'

import {
  Poppins,
  Inter,
  Geist_Mono,
} from 'next/font/google'

import { Toaster } from 'sonner'

import './globals.css'

import WelcomeToast from '@/components/WelcomeToast'


/* =====================================================
   FONTS
===================================================== */

const poppins = Poppins({
  variable: '--font-poppins',

  subsets: [
    'latin',
  ],

  weight: [
    '400',
    '500',
    '600',
    '700',
    '800',
  ],
})


const inter = Inter({
  variable: '--font-inter',

  subsets: [
    'latin',
  ],
})


const geistMono = Geist_Mono({
  variable: '--font-geist-mono',

  subsets: [
    'latin',
  ],
})


/* =====================================================
   SEO METADATA
===================================================== */

export const metadata: Metadata = {

  metadataBase:
    new URL(
      'https://samcreativehub.com'
    ),


  title: {

    default:
      'Samuel R. Appleton | Web Developer & ICT Specialist',

    template:
      '%s | Samuel R. Appleton',

  },


  description:
    'Samuel R. Appleton is a Web Developer and ICT Specialist creating modern websites, digital solutions, and scalable technology experiences. Explore his projects, services, and creative work.',



  keywords: [

    'Samuel R. Appleton',

    'Samuel Appleton',

    'Sam Creative Hub',

    'Web Developer',

    'Full Stack Developer',

    'Next.js Developer',

    'React Developer',

    'TypeScript Developer',

    'ICT Specialist',

    'ICT Trainer',

    'Graphic Designer',

    'Website Development',

    'Digital Solutions',

    'Liberia Developer',

  ],



  authors: [

    {
      name:
        'Samuel R. Appleton',

      url:
        'https://samcreativehub.com',
    },

  ],



  creator:
    'Samuel R. Appleton',



  publisher:
    'Sam Creative Hub',



  applicationName:
    'Sam Creative Hub',



  category:
    'Technology',



  alternates: {

    canonical:
      'https://samcreativehub.com',

  },



  openGraph: {

    title:
      'Samuel R. Appleton | Web Developer & ICT Specialist',


    description:
      'Portfolio showcasing web development, ICT solutions, creative projects, and digital experiences created by Samuel R. Appleton.',


    url:
      'https://samcreativehub.com',


    siteName:
      'Sam Creative Hub',


    locale:
      'en_US',


    type:
      'website',


    images: [

      {

        url:
          '/og-image.png',

        width:
          1200,

        height:
          630,

        alt:
          'Samuel R. Appleton Portfolio',

      },

    ],

  },



  twitter: {

    card:
      'summary_large_image',


    title:
      'Samuel R. Appleton | Web Developer & ICT Specialist',


    description:
      'Modern web development, ICT solutions, and creative digital experiences.',


    images:
      [
        '/og-image.png',
      ],

  },



  robots: {
  index: true,
  follow: true,

  googleBot: {
    index: true,
    follow: true,

    "max-video-preview": -1,

    "max-image-preview": "large",

    "max-snippet": -1,
  },
},



  icons: {

    icon:
      '/favicon.ico',

    shortcut:
      '/favicon.ico',

  },

}



/* =====================================================
   GOOGLE STRUCTURED DATA
===================================================== */

const jsonLd = {

  "@context":
    "https://schema.org",


  "@type":
    "Person",


  name:
    "Samuel R. Appleton",


  url:
    "https://samcreativehub.com",


  image:
    "https://samcreativehub.com/og-image.png",


  jobTitle:
    "Web Developer and ICT Specialist",


  description:
    "Samuel R. Appleton is a Web Developer and ICT Specialist creating modern websites, digital solutions, and technology experiences.",


  knowsAbout: [

    "Web Development",

    "Next.js",

    "React",

    "TypeScript",

    "ICT Solutions",

    "Website Development",

    "Graphic Design",

    "Software Development",

  ],



  worksFor: {

    "@type":
      "Organization",


    name:
      "Sam Creative Hub",


    url:
      "https://samcreativehub.com",

  },


  sameAs: [

    // Add GitHub, LinkedIn, etc later

  ],

}



/* =====================================================
   VIEWPORT
===================================================== */

export const viewport: Viewport = {

  colorScheme:
    'dark',


  themeColor:
    '#0f172a',


  width:
    'device-width',


  initialScale:
    1,


  userScalable:
    true,

}



/* =====================================================
   ROOT LAYOUT
===================================================== */

export default function RootLayout({

  children,

}: Readonly<{

  children:
    React.ReactNode

}>) {


  return (

    <html

      lang="en"

      suppressHydrationWarning

      className={`
        ${poppins.variable}
        ${inter.variable}
        ${geistMono.variable}
        bg-background
      `}

    >


      <body

        className="
          bg-background
          font-sans
          antialiased
        "

      >


        {/* Website Notification */}

        <WelcomeToast />



        {/* Website Content */}

        <main>

          {children}

        </main>



        {/* Toast Notifications */}

        <Toaster

          position="top-right"

          richColors

          closeButton

          theme="dark"

        />



        {/* Analytics */}

        {
          process.env.NODE_ENV === 'production'
          &&
          (
            <>

              <Analytics />

              <SpeedInsights />

            </>
          )
        }



        {/* Google Structured Data */}

        <script

          type="application/ld+json"

          dangerouslySetInnerHTML={{

            __html:
              JSON.stringify(jsonLd),

          }}

        />


      </body>


    </html>

  )

}