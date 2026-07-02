import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'

const highlights = [
  'User-centered & accessible',
  'Efficient & secure by design',
  'Scalable architecture',
  'Continuous learner',
]

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="About Me"
        title="Building beautiful, functional & scalable experiences"
      />

      <div className="mt-14 grid items-center gap-10 lg:grid-cols-5">
        <Reveal className="lg:col-span-2">
          <div className="glass mx-auto max-w-sm rounded-3xl p-3">
            <Image
              src="/images/profile.png"
              alt="Portrait of Alex Rivera"
              width={520}
              height={620}
              className="aspect-[4/5] w-full rounded-2xl object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={1} className="lg:col-span-3">
          <p className="text-lg leading-relaxed text-foreground/90">
            I am a passionate technology professional dedicated to building
            beautiful, functional, and scalable digital experiences.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            My focus is on creating software that is not only visually appealing
            but also efficient, secure, and user-centered. I enjoy solving
            complex problems through innovative technology and continuously
            learning new tools to stay ahead in the industry.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {highlights.map((item) => (
              <li
                key={item}
                className="glass flex items-center gap-3 rounded-xl px-4 py-3"
              >
                <CheckCircle2 className="size-5 shrink-0 text-accent" />
                <span className="text-sm text-foreground/90">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
