'use client'

import { useState, type FormEvent } from 'react'
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CalendarClock,
  CheckCircle2,
} from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { Button } from '@/components/ui/button'
//import { GithubIcon, LinkedinIcon } from '@/components/brand-icons'
import { profile } from '@/lib/portfolio-data'
import { FacebookIcon, WhatsappIcon } from '@/components/brand-icons'

type Errors = { name?: string; email?: string; message?: string }

const contactItems = [
  { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone}` },
  { icon: MapPin, label: 'Location', value: profile.location },
  {/*{ icon: LinkedinIcon, label: 'LinkedIn', value: 'in/samappleton', href: profile.linkedin },
  { icon: GithubIcon, label: 'GitHub', value: '@samappleton', href: profile.github },*/}
   {
  icon: FacebookIcon,
  label: 'Facebook',
  value: 'facebook.com/Ma Grace Son',
  href: profile.facebook,
},
{
  icon: WhatsappIcon,
  label: 'WhatsApp',
  value: '+231 770 449 708',
  href: profile.whatsapp,
},

]

export function Contact() {
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    const next: Errors = {}
    if (!name) next.name = 'Please enter your name.'
    if (!email) next.email = 'Please enter your email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = 'Please enter a valid email address.'
    if (!message) next.message = 'Please enter a message.'

    setErrors(next)
    if (Object.keys(next).length === 0) {
      setSent(true)
      e.currentTarget.reset()
    }
  }

  const fieldClass =
    'w-full rounded-xl border border-surface-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-accent'

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Contact"
        title="Let's Work Together"
        description="Looking for Accounting or ICT services? Get in touch to discuss your needs, and I'll be happy to assist you."
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-5">
        <Reveal className="lg:col-span-2">
          <div className="glass h-full rounded-3xl p-8">
            <h3 className="font-heading text-xl font-semibold">
              Contact details
            </h3>
            <ul className="mt-6 space-y-4">
              {contactItems.map((item) => {
                const Icon = item.icon
                const content = (
                  <span className="flex items-center gap-4">
                    <span className="glass flex size-11 items-center justify-center rounded-xl text-accent">
                      <Icon className="size-5" />
                    </span>
                    <span>
                      <span className="block text-xs text-muted-foreground">
                        {item.label}
                      </span>
                      <span className="text-sm text-foreground/90">
                        {item.value}
                      </span>
                    </span>
                  </span>
                )
                return (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel="noreferrer"
                        className="transition-opacity hover:opacity-80"
                      >
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={1} className="lg:col-span-3">
          <form onSubmit={handleSubmit} noValidate className="glass rounded-3xl p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Jane Doe"
                  className={fieldClass}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-destructive">{errors.name}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jane@company.com"
                  className={fieldClass}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-destructive">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="subject" className="mb-2 block text-sm font-medium">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="Project inquiry"
                className={fieldClass}
              />
            </div>

            <div className="mt-5">
              <label htmlFor="message" className="mb-2 block text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell me about your project..."
                className={`${fieldClass} resize-none`}
                aria-invalid={!!errors.message}
              />
              {errors.message && (
                <p className="mt-1 text-xs text-destructive">{errors.message}</p>
              )}
            </div>

            {sent && (
              <p className="mt-4 flex items-center gap-2 text-sm text-accent">
                <CheckCircle2 className="size-4" />
                Thanks! Your message has been sent.
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                type="submit"
                size="lg"
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Send className="size-4" /> Send Message
              </Button>
              <Button
                render={
                  <a
                    href={`mailto:${profile.email}?subject=Schedule a meeting`}
                  />
                }
                size="lg"
                variant="outline"
                className="glass rounded-full border-surface-border"
              >
                <CalendarClock className="size-4" /> Schedule a Meeting
              </Button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
