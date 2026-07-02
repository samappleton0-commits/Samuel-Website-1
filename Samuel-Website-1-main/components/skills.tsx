'use client'

import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/section-heading'
import { skills } from '@/lib/portfolio-data'

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Tech Stack"
        title="Technologies I work with"
        description="A modern toolkit for building fast, reliable, and intelligent applications."
      />

      <motion.ul
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={{
          visible: { transition: { staggerChildren: 0.04 } },
        }}
        className="mt-14 flex flex-wrap justify-center gap-3"
      >
        {skills.map((skill) => (
          <motion.li
            key={skill}
            variants={{
              hidden: { opacity: 0, scale: 0.8, y: 12 },
              visible: { opacity: 1, scale: 1, y: 0 },
            }}
            whileHover={{ y: -4 }}
            className="glass cursor-default rounded-full px-4 py-2 text-sm font-medium text-foreground/90 transition-colors hover:border-accent/50 hover:text-accent"
          >
            {skill}
          </motion.li>
        ))}
      </motion.ul>
    </section>
  )
}
