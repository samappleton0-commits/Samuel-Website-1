import { Check } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { whyChooseMe } from '@/lib/portfolio-data'

export function WhyChooseMe() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Why Choose Me"
        title="A partner you can rely on"
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {whyChooseMe.map((item, i) => (
          <Reveal
            key={item.title}
            delay={i}
            className="glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
          >
            <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
              <Check className="size-6" />
            </div>
            <h3 className="mt-5 font-heading text-lg font-semibold">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
