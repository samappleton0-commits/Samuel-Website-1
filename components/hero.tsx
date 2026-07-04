'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Download, Eye, Mail, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { profile } from '@/lib/portfolio-data'

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16"
    >
      {/* Ambient background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-24 -left-24 size-96 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute top-1/3 -right-24 size-96 rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 size-72 rounded-full bg-accent/15 blur-3xl" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-muted-foreground">
            <Sparkles className="size-4 text-accent" />
            Available for Part-Time & Full-time work
          </span>

          <h1 className="mt-6 font-heading text-4xl font-extrabold leading-tight tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Hi, I&apos;m{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              {profile.name}
            </span>
          </h1>

          <p className="mt-4 font-heading text-lg font-medium text-foreground/90 sm:text-xl">
            {profile.roles.join(' • ')}
          </p>

          <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
            {profile.intro}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              render={<a href="#work" />}
              size="lg"
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              View My Work <ArrowRight className="size-4" />
            </Button>
          {/* <Button
              render={<a href="#contact" />}
              size="lg"
              className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              Hire Me
            </Button> */}
            <Button
              render={<a href="#contact" />}
              size="lg"
              variant="outline"
              className="glass rounded-full border-surface-border hover:text-accent"
            >
              <Mail className="size-4" /> Contact Me
            </Button>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <Button
              render={
                <a href={profile.resumePath} target="_blank" rel="noreferrer" />
              }
              variant="ghost"
              className="rounded-full text-muted-foreground hover:text-foreground"
            >
              <Eye className="size-4" /> View My CV
            </Button>
            <Button
              render={<a href={profile.resumePath} download />}
              variant="ghost"
              className="rounded-full text-muted-foreground hover:text-foreground"
            >
              <Download className="size-4" /> Download CV
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="glass rounded-3xl p-3">
            <Image
              src="/images/hero-workspace.png"
              alt="Modern developer workspace with a glowing code editor"
              width={720}
              height={720}
              priority
              className="aspect-square w-full rounded-2xl object-cover"
            />
          </div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="glass absolute -bottom-5 -left-5 rounded-2xl px-4 py-3"
          >
            <p className="font-heading text-2xl font-bold text-accent">3+</p>
            <p className="text-xs text-muted-foreground">Years Experience</p>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="glass absolute -top-5 -right-5 rounded-2xl px-4 py-3"
          >
            <p className="font-heading text-2xl font-bold text-primary">15+</p>
            <p className="text-xs text-muted-foreground">Projects</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
