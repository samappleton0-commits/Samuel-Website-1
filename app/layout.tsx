import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Poppins, Inter, Geist_Mono } from 'next/font/google'
import './globals.css'

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
  title: 'Alex Rivera — Full-Stack Developer & AI Solutions Builder',
  description:
    'Portfolio of Alex Rivera, a full-stack developer, UI/UX designer, and AI solutions builder crafting modern, scalable, and user-friendly digital experiences.',
  generator: 'v0.app',
  keywords: [
    'Full-Stack Developer',
    'UI/UX Designer',
    'AI Solutions',
    'React',
    'Next.js',
    'Portfolio',
  ],
  openGraph: {
    title: 'Alex Rivera — Full-Stack Developer & AI Solutions Builder',
    description:
      'Modern, scalable, and user-friendly digital solutions in web development, UI/UX design, and AI.',
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
      className={`${poppins.variable} ${inter.variable} ${geistMono.variable} bg-background`}
    >
      <body className="bg-background font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
