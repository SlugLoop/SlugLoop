'use client'

import React from 'react'
import {motion, useReducedMotion} from 'framer-motion'
import {
  architectureFlow,
  exhibitSections,
  externalLinks,
  heroStats,
  milestones,
  pressLinks,
  proofPoints,
  teamMembers,
} from '../slugloopMuseumData'
import Avatar from '../ui/Avatar'
import Button from '../ui/Button'
import Card from '../ui/Card'
import Chip from '../ui/Chip'
import {ArrowRight, ExternalLink, Github, PlayCircle} from '../ui/icons'
import {divider, linkText} from '../ui/museumClasses'

const fadeUp = {
  hidden: {opacity: 0, y: 28},
  visible: {opacity: 1, y: 0},
}

function ExhibitLabel({children}) {
  return <p className="type-overline">{children}</p>
}

function SectionHeading({eyebrow, title, body, align = 'left'}) {
  return (
    <div className={`max-w-[840px] space-y-4 ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <ExhibitLabel>{eyebrow}</ExhibitLabel>
      <h2 className="type-display-2">{title}</h2>
      {body && <p className="type-heading-5 text-muted">{body}</p>}
    </div>
  )
}

function RouteDiagram() {
  return (
    <Card className="min-h-[420px] p-6 md:p-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <p className="type-overline">Live artifact route</p>
          <Chip label="UCSC" />
        </div>
        <div className="relative min-h-[280px] overflow-hidden rounded-3xl border border-[var(--museum-route-diagram-border)] bg-[image:var(--museum-route-diagram-background)]">
          <div
            className="absolute inset-6 rounded-[44%_56%_48%_52%] border-2 border-[var(--museum-route-line)]"
            style={{transform: 'rotate(-12deg)'}}
            aria-hidden="true"
          />
          {[
            ['Science Hill', '18%', '24%'],
            ['Quarry', '61%', '18%'],
            ['East Field', '76%', '66%'],
            ['Cowell', '26%', '72%'],
          ].map(([label, left, top]) => (
            <div
              key={label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{left, top}}
            >
              <span className="museum-dot mb-2 block h-4 w-4" />
              <p className="type-caption">{label}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted">
          The original map stays available as a working artifact, backed by the
          existing Google Maps and Firestore flow.
        </p>
      </div>
    </Card>
  )
}

export default function MuseumHome() {
  const reduceMotion = useReducedMotion()
  const animationProps = reduceMotion
    ? {}
    : {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: {once: true, amount: 0.18},
        variants: fadeUp,
        transition: {duration: 0.7, ease: 'easeOut'},
      }

  return (
    <div className="museum-page overflow-hidden">
      <div className="museum-grid-overlay" />
      <div className="archive-grain" />

      <main className="relative z-[1]">
        <section className="relative grid min-h-[calc(100vh-72px)] items-center gap-10 overflow-hidden px-5 pb-16 pt-24 md:px-12 md:pb-24 md:pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:px-20">
          <div className="route-halo -left-28 top-16 h-72 w-72 md:h-[30rem] md:w-[30rem]" />
          <div className="route-halo -right-20 bottom-8 h-52 w-52 opacity-80 md:h-80 md:w-80" />
          <motion.div {...animationProps}>
            <div className="space-y-8">
              <div className="space-y-5">
                <Chip label="Preserved transit system and case study" />
                <h1 className="type-display-1">
                  SlugLoop, the student-built bus tracker that made UCSC move
                  differently.
                </h1>
                <p className="max-w-[760px] text-[clamp(1.15rem,2.2vw,1.5rem)] leading-[1.55] text-muted">
                  A real-time campus transit project built with hardware,
                  Firestore, Express, React, and Google Maps. Now presented as a
                  cinematic case file of what the team shipped, learned, and
                  proved.
                </p>
              </div>
              <div className="case-plate grid max-w-[760px] gap-3 rounded-3xl p-3 text-sm md:grid-cols-3 md:p-4">
                {['Real campus problem', 'Working map retained', 'Public finalist proof'].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="museum-dot h-2 w-2" aria-hidden="true" />
                    <span className="font-semibold text-[var(--color-text-primary)]">{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href="/map" variant="solid" size="lg" endIcon={<ArrowRight size={18} />}>
                  Open the map artifact
                </Button>
                <Button
                  href={externalLinks.githubRepo}
                  target="_blank"
                  rel="noopener"
                  variant="outline"
                  size="lg"
                  startIcon={<Github size={18} />}
                >
                  View source
                </Button>
                <Button
                  href={externalLinks.demoVideo}
                  target="_blank"
                  rel="noopener"
                  variant="ghost"
                  size="lg"
                  startIcon={<PlayCircle size={18} />}
                >
                  Watch demo
                </Button>
              </div>
            </div>
          </motion.div>
          <motion.div {...animationProps} transition={{duration: 0.8, delay: 0.1}}>
            <RouteDiagram />
          </motion.div>
        </section>

        <section className="grid grid-cols-2 gap-4 px-5 pb-16 md:grid-cols-4 md:px-12 md:pb-24 lg:px-20">
          {heroStats.map((stat) => (
            <Card key={stat.label} className="p-4 md:p-6">
              <h3 className="type-heading-3 text-[var(--color-secondary)]">{stat.value}</h3>
              <p className="text-sm text-muted">{stat.label}</p>
            </Card>
          ))}
        </section>

        <motion.div className="px-5 py-16 md:px-12 md:py-24 lg:px-20" {...animationProps}>
          <SectionHeading
            eyebrow="Case file"
            title="A full-stack transit system disguised as a student project."
            body="SlugLoop was impressive because it crossed boundaries: product design, embedded hardware, campus coordination, backend ingestion, real-time data, and a mobile-friendly map."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {exhibitSections.map((section) => (
              <Card key={section.title} className="p-6 md:p-8">
                <div className="space-y-4">
                  <p className="type-overline">{section.eyebrow}</p>
                  <h3 className="type-heading-4">{section.title}</h3>
                  <p className="text-muted">{section.body}</p>
                  <div className={divider} />
                  <p className="type-caption text-[var(--color-primary-light)]">{section.accent}</p>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        <motion.div className="grid gap-10 px-5 py-16 md:px-12 md:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:px-20" {...animationProps}>
          <SectionHeading
            eyebrow="Architecture"
            title="From moving buses to moving pixels."
            body="The preserved map still reflects the original system shape: hardware emitted pings, a backend normalized them, Firestore stored the state, and the React client rendered the experience."
          />
          <div className="space-y-4">
            {architectureFlow.map((item) => (
              <Card key={item.step} className="p-6" interactive={false}>
                <div className="grid gap-4 sm:grid-cols-[72px_1fr]">
                  <p className="type-heading-3 text-[var(--color-secondary)]">{item.step}</p>
                  <div>
                    <h3 className="type-heading-5 text-[var(--color-text-primary)]">{item.title}</h3>
                    <p className="text-muted">{item.detail}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        <motion.div className="px-5 py-16 md:px-12 md:py-24 lg:px-20" {...animationProps}>
          <SectionHeading
            eyebrow="Recognition"
            title="The project earned public proof."
            body="The story was covered by campus and local outlets, and the project reached the global finalist stage of Google's 2023 Solution Challenge."
            align="center"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {pressLinks.map((link) => (
              <Card key={link.href} className="min-h-[190px] p-6" interactive={false}>
                <div className="flex h-full flex-col gap-4">
                  <p className="type-overline">{link.label}</p>
                  <h3 className="text-lg font-bold">{link.title}</h3>
                  <div className="flex-1" />
                  <a href={link.href} target="_blank" rel="noopener" className={linkText}>
                    Read source <ExternalLink size={14} className="inline" aria-hidden="true" />
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        <motion.div className="grid gap-10 px-5 py-16 md:px-12 md:py-24 lg:grid-cols-[0.95fr_1.05fr] lg:px-20" {...animationProps}>
          <SectionHeading
            eyebrow="Route log"
            title="A compressed timeline of the build."
            body="The full archive expands these moments into the story of how a hackathon project became an internationally recognized campus tool."
          />
          <div className="space-y-4">
            {milestones.slice(0, 5).map((milestone) => (
              <div
                key={`${milestone.date}-${milestone.title}`}
                className="grid grid-cols-[110px_1fr] gap-4 border-b border-[var(--museum-soft-divider)] pb-4"
              >
                <p className="type-caption text-[var(--color-secondary)]">{milestone.date}</p>
                <div>
                  <h3 className="text-lg font-bold">{milestone.title}</h3>
                  <p className="text-sm text-muted">{milestone.description}</p>
                </div>
              </div>
            ))}
            <Button href="/timeline" variant="ghost" endIcon={<ArrowRight size={18} />}>
              Visit the archive
            </Button>
          </div>
        </motion.div>

        <motion.div className="px-5 py-16 md:px-12 md:py-24 lg:px-20" {...animationProps}>
          <SectionHeading
            eyebrow="Team"
            title="Four students, one practical system."
            body="The project worked because the team covered product direction, frontend experience, backend services, hardware, data, and stakeholder coordination."
            align="center"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <Card key={member.name} className="p-6" interactive={false}>
                <div className="flex flex-col items-start gap-4">
                  <Avatar src={member.img} alt={member.name} size={76} />
                  <div>
                    <h3 className="text-lg font-bold">{member.name}</h3>
                    <p className="text-sm text-muted">{member.role}</p>
                  </div>
                  <a href={member.linkedin} target="_blank" rel="noopener" className={linkText}>
                    LinkedIn
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        <motion.div className="px-5 py-16 md:px-12 md:py-24 lg:px-20" {...animationProps}>
          <Card className="p-6 md:p-10">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <SectionHeading
                eyebrow="Retrospective"
                title="What SlugLoop proves."
                body="This archive is intentionally honest: SlugLoop is no longer positioned as an actively maintained commuter utility. It remains a record of shipped work, public impact, and technical range."
              />
              <div className="space-y-4">
                {proofPoints.map((point) => (
                  <div key={point} className="flex items-start gap-4">
                    <span className="museum-dot mt-2 h-2.5 w-2.5" />
                    <p className="text-muted">{point}</p>
                  </div>
                ))}
                <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                  <Button href="/map" variant="solid">
                    Launch map demo
                  </Button>
                  <Button href="/contact" variant="outline">
                    Browse all links
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
