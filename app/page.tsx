import dynamic from 'next/dynamic'

import { createClient } from '@/lib/supabase-server'

import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { SiteFooter } from '@/components/site-footer'
import { BackToTop } from '@/components/back-to-top'



// Lazy loaded sections

const About = dynamic(
  () =>
    import('@/components/about').then(
      (mod) => mod.About
    ),
  {
    loading: () => (
      <SectionLoading />
    ),
  }
)



const Services = dynamic(
  () =>
    import('@/components/services').then(
      (mod) => mod.Services
    ),
  {
    loading: () => (
      <SectionLoading />
    ),
  }
)



const Portfolio = dynamic(
  () =>
    import('@/components/portfolio').then(
      (mod) => mod.Portfolio
    ),
  {
    loading: () => (
      <SectionLoading />
    ),
  }
)



const Gallery = dynamic(
  () =>
    import('@/components/Gallery'),
  {
    loading: () => (
      <SectionLoading />
    ),
  }
)



const Contact = dynamic(
  () =>
    import('@/components/contact').then(
      (mod) => mod.Contact
    ),
  {
    loading: () => (
      <SectionLoading />
    ),
  }
)






function SectionLoading() {

  return (

    <div
      className="
      mx-auto
      max-w-6xl
      px-4
      py-24
      sm:px-6
      "
    >

      <div
        className="
        h-40
        animate-pulse
        rounded-3xl
        bg-surface
        "
      />

    </div>

  )

}






export default async function Page() {



  const supabase =
    await createClient()



  const {
    data: projects,
  } =
    await supabase

      .from('projects')

      .select('*')

      .order(
        'created_at',
        {
          ascending:false,
        }
      )





  return (

    <>


      <SiteHeader />


      <main>


        <Hero />


        <About />


        <Services />


        <Portfolio
          projects={
            projects ?? []
          }
        />


        <Gallery />


        <Contact />


      </main>



      <SiteFooter />



      <BackToTop />


    </>

  )

}