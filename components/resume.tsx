import { Download, Eye, FileText } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { Button } from '@/components/ui/button'
import { profile, resumeSummary } from '@/lib/portfolio-data'

export function Resume() {
  return (
    <section id="resume" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Resume"
        title="My professional CV"
        description="A quick snapshot of my background — view it online or download the full PDF."
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        {/* Preview card */}
        <Reveal className="glass flex flex-col justify-between rounded-3xl p-8">
          <div>
            <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-primary-foreground">
              <FileText className="size-7" />
            </div>
            <h3 className="mt-5 font-heading text-2xl font-bold">
              {profile.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {profile.roles[0]} • {profile.location}
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              3+ years of experience delivering full-stack web platforms,
              and thoughtful user experiences for startups
              and enterprises alike.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              render={
                <a href={profile.resumePath} target="_blank" rel="noreferrer" />
              }
              size="lg"
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Eye className="size-4" /> View CV
            </Button>
            <Button
              render={<a href={profile.resumePath} download />}
              size="lg"
              variant="outline"
              className="glass rounded-full border-surface-border"
            >
              <Download className="size-4" /> Download CV
            </Button>
          </div>
        </Reveal>

        {/* Summary */}
        <Reveal delay={1} className="flex flex-col gap-4">
          {resumeSummary.map((item) => (
            <div
              key={item.label}
              className="glass flex items-center justify-between rounded-2xl px-6 py-5"
            >
              <span className="text-sm text-muted-foreground">
                {item.label}
              </span>
              <span className="font-heading text-right font-semibold text-foreground">
                {item.value}
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
