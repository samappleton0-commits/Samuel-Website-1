'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Download, Eye, Mail, Sparkles } from 'lucide-react'
import { profile } from '@/lib/portfolio-data'

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16"
    >

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />


      {/* Ambient Background Accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -top-24 -left-24 size-96 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute top-1/3 -right-24 size-96 rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 size-72 rounded-full bg-accent/15 blur-3xl" />
      </div>



      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">


        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >


          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-white">
            <Sparkles className="size-4 text-accent" />
            Available for Part-Time & Full-time work
          </span>



          <h1 className="mt-6 font-heading text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl text-white">

            Hi, I&apos;m{' '}

            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              {profile.name}
            </span>

          </h1>



          <p className="mt-4 font-heading text-lg font-medium text-white/90 sm:text-xl">
            {profile.roles.join(' • ')}
          </p>



          <p className="mt-5 max-w-xl leading-relaxed text-gray-200">
            {profile.intro}
          </p>




          {/* Main Actions */}
          <div className="mt-8 flex flex-wrap gap-3">


            <a
              href="#work"
              className="inline-flex h-9 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
            >
              View My Work
              <ArrowRight className="size-4" />
            </a>



            <a
              href="#contact"
              className="inline-flex h-9 items-center justify-center gap-2 rounded-full border border-white/30 px-5 text-sm font-medium text-white transition hover:bg-white/10"
            >
              <Mail className="size-4" />
              Contact Me
            </a>


          </div>





          {/* CV Actions */}
          <div className="mt-4 flex flex-wrap gap-3">


            <a
              href={profile.resumePath}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 items-center justify-center gap-2 rounded-full px-4 text-sm font-medium text-white transition hover:text-accent"
            >
              <Eye className="size-4" />
              View My CV
            </a>



            <a
              href={profile.resumePath}
              download
              className="inline-flex h-9 items-center justify-center gap-2 rounded-full px-4 text-sm font-medium text-white transition hover:text-accent"
            >
              <Download className="size-4" />
              Download CV
            </a>


          </div>


        </motion.div>





        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.15,
          }}
          className="relative mx-auto w-full max-w-md"
        >


          <div className="glass rounded-3xl p-3">

            <Image
              src="/images/hero-workspace.png"
              alt="Modern developer workspace"
              width={720}
              height={720}
              priority
              className="aspect-square w-full rounded-2xl object-cover"
            />

          </div>





          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="glass absolute -bottom-5 -left-5 rounded-2xl px-4 py-3"
          >

            <p className="font-heading text-2xl font-bold text-accent">
              3+
            </p>

            <p className="text-xs text-white">
              Years Experience
            </p>

          </motion.div>






          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="glass absolute -top-5 -right-5 rounded-2xl px-4 py-3"
          >

            <p className="font-heading text-2xl font-bold text-primary">
              15+
            </p>

            <p className="text-xs text-white">
              Projects
            </p>

          </motion.div>



        </motion.div>



      </div>


    </section>
  )
}