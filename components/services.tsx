import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { services } from '@/lib/portfolio-data'

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Services"
        title="What I can do for you"
        description="End-to-end product work, from design and frontend to backend, AI, and everything in between."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, i) => {
          const Icon = service.icon
          return (
            <Reveal
              key={service.title}
              delay={i % 4}
              as="article"
              className="group glass flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={service.image}
                  alt={`${service.title} illustration`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                <div className="glass absolute bottom-3 left-3 flex size-11 items-center justify-center rounded-xl text-accent">
                  <Icon className="size-5" />
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-heading text-lg font-semibold">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {service.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-surface px-2.5 py-1 text-xs text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-primary"
                >
                  Learn More <ArrowUpRight className="size-4" />
                </a>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
