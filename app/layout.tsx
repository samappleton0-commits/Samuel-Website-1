import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Poppins, Inter, Geist_Mono } from 'next/font/google'
import { Toaster } from 'sonner'

import './globals.css'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { SpeedInsights } from "@vercel/speed-insights/next"
import WelcomeToast from '@/components/WelcomeToast'


const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})


const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})


const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})


export const metadata: Metadata = {
  title: 'Samuel R. Appleton — Portfolio',
  description:
    'Portfolio of Samuel R. Appleton, a Web Developer, Accountant, and ICT solutions builder crafting modern, scalable, and user-friendly digital experiences.',
  generator: 'v0.app',
  keywords: [
    'Accountant',
    'Graphic Designer',
    'Website Developer',
    'ICT Trainer',
    'ICT Specialist',
    'Portfolio',
  ],
  openGraph: {
    title: 'Samuel R. Appleton — Portfolio',
    description:
      'Portfolio of Samuel R. Appleton, a Web Developer, Accountant, and ICT solutions builder crafting modern, scalable, and user-friendly digital experiences.',
    type: 'website',
  },
}


export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0f172a',
  userScalable: true,
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${inter.variable} ${geistMono.variable} bg-background`}
    >

    <body className="bg-background font-sans antialiased">

  {/* Welcome Notification */}
 <WelcomeToast /> 


  {/* Global Website Header */}
  


  {/* Website Content */}
  <main>

    {children}

  </main>


  {/* Global Website Footer */}
 



  {/* Toast Container */}
  <Toaster
    position="top-right"
    richColors
    closeButton
    theme="dark"
  />


        {/* Vercel Analytics */}
        {process.env.NODE_ENV === 'production' && (
          <Analytics />
        )}

      </body>

    </html>
  )
}