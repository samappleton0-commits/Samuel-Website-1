import { Reveal } from '@/components/reveal'

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <span className="font-mono text-sm font-medium uppercase tracking-widest text-accent">
        {eyebrow}
      </span>
      <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 leading-relaxed text-muted-foreground text-pretty">
          {description}
        </p>
      ) : null}
    </Reveal>
  )
}
