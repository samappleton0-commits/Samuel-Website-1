import dynamic from 'next/dynamic'

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





// Hidden sections
//
// Enable anytime you need them again
//
// const Skills = dynamic(() =>
//   import('@/components/skills').then(
//     (mod) => mod.Skills
//   )
// )
//
//
// const WhyChooseMe = dynamic(() =>
//   import('@/components/why-choose-me').then(
//     (mod) => mod.WhyChooseMe
//   )
// )
//
//
// const Experience = dynamic(() =>
//   import('@/components/experience').then(
//     (mod) => mod.Experience
//   )
// )
//
//
// const Resume = dynamic(() =>
//   import('@/components/resume').then(
//     (mod) => mod.Resume
//   )
// )





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





export default function Page() {


  return (

    <>

      <SiteHeader />


      <main>


        <Hero />


        <About />


        <Services />


        <Portfolio />


        <Gallery />


        <Contact />


      </main>



      <SiteFooter />


      <BackToTop />


    </>

  )

}