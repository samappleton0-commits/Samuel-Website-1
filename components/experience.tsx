import Image from 'next/image'
import { Star } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { timeline, testimonials } from '@/lib/portfolio-data'

const tagColors: Record<string, string> = {
  Experience: 'text-accent',
  Certification: 'text-primary',
  Award: 'text-secondary',
}

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Journey"
        title="Experience & achievements"
        description="Milestones from my career — roles, certifications, awards, and standout projects."
      />

      {/* Timeline */}
      <div className="mt-14 mx-auto max-w-3xl">
        <div className="relative border-l border-surface-border pl-8">
          {timeline.map((item, i) => (
            <Reveal
              key={`${item.title}-${i}`}
              delay={i}
              className="relative pb-10 last:pb-0"
            >
              <span className="absolute -left-[41px] flex size-4 items-center justify-center rounded-full bg-background ring-4 ring-surface-border">
                <span className="size-2 rounded-full bg-accent" />
              </span>
              <div className="glass rounded-2xl p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span
                    className={`font-mono text-xs font-semibold uppercase tracking-wider ${tagColors[item.tag] ?? 'text-accent'}`}
                  >
                    {item.tag}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {item.period}
                  </span>
                </div>
                <h3 className="mt-2 font-heading text-lg font-semibold">
                  {item.title}
                </h3>
                <p className="text-sm font-medium text-foreground/80">
                  {item.org}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="mt-20">
        <Reveal className="text-center">
          <h3 className="font-heading text-2xl font-bold">
            What clients say
          </h3>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal
              key={t.name}
              delay={i}
              className="glass flex flex-col rounded-2xl p-6"
            >
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star
                    key={idx}
                    className="size-4 fill-accent text-accent"
                  />
                ))}
              </div>
              <p className="mt-4 flex-1 leading-relaxed text-foreground/90">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <Image
                  src={t.image}
                  alt={`Portrait of ${t.name}`}
                  width={48}
                  height={48}
                  className="size-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-heading text-sm font-semibold">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t.position}, {t.company}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
