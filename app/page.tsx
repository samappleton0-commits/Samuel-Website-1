import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Services } from '@/components/services'
import { Skills } from '@/components/skills'
import { Portfolio } from '@/components/portfolio'
import { WhyChooseMe } from '@/components/why-choose-me'
import { Experience } from '@/components/experience'
import { Resume } from '@/components/resume'
import { Contact } from '@/components/contact'
import { SiteFooter } from '@/components/site-footer'
import { BackToTop } from '@/components/back-to-top'

// New Line Added
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/next';
 
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
 
export default MyApp;

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Contact />
      </main>
      <SiteFooter />
      <BackToTop />
    </>
  )
}
