import Image from 'next/image'
import { ExternalLink, FileText } from 'lucide-react'
import { GithubIcon } from '@/components/brand-icons'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { Button } from '@/components/ui/button'
import { projects } from '@/lib/portfolio-data'

export function Portfolio() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
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

            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-heading text-lg font-semibold">
                {project.title}
              </h3>
             <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p> 

              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-surface px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Button
                  render={
                    <a href={project.demo} target="_blank" rel="noreferrer" />
                  }
                  size="sm"
                  className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <ExternalLink className="size-4" /> Live Demo
                </Button>
                <Button
                  render={
                    <a href={project.github} target="_blank" rel="noreferrer" />
                  }
                  size="sm"
                  variant="outline"
                  className="glass rounded-full border-surface-border"
                >
                  <GithubIcon className="size-4" /> GitHub
                </Button>
                <Button
                  render={<a href={project.caseStudy} />}
                  size="sm"
                  variant="ghost"
                  className="rounded-full text-muted-foreground hover:text-foreground"
                >
                  <FileText className="size-4" /> Case Study
                </Button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
