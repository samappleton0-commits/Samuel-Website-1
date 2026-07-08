import Image from 'next/image'
import { ExternalLink } from 'lucide-react'

import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { projects } from '@/lib/portfolio-data'


export function Portfolio() {
  return (
    <section
      id="work"
      className="mx-auto max-w-6xl px-4 py-24 sm:px-6"
    >

      <SectionHeading
        eyebrow="Portfolio"
        title="Featured projects"
        description="A collection of projects showcasing my experience in Website development, Graphic design, and ICT solutions."
      />



      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">


        {projects.map((project, i) => (


          <Reveal
            key={project.title}
            delay={i % 3}
            as="article"
            className="group glass flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
          >


            <div className="relative aspect-video overflow-hidden">

              <Image
                src={project.image}
                alt={`${project.title} project screenshot`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

            </div>





            <div className="flex flex-1 flex-col items-center p-5 text-center">


              <h3 className="font-heading text-lg font-semibold">
                {project.title}
              </h3>



              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>





              <div className="mt-5 flex flex-wrap gap-2">


                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-8 items-center justify-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
                >

                  <ExternalLink className="size-4" />

                  Live Demo

                </a>



              </div>



            </div>



          </Reveal>


        ))}


      </div>


    </section>
  )
}