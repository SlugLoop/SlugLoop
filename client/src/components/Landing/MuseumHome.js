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
import {
  ArrowRight,
  Award,
  Bus,
  ExternalLink,
  Github,
  LocateFixed,
  Map as MapIcon,
  PlayCircle,
  Route as RouteIcon,
} from '../ui/icons'
import {divider, linkText} from '../ui/museumClasses'

const fadeUp = {
  hidden: {opacity: 0, y: 26, filter: 'blur(10px)'},
  visible: {opacity: 1, y: 0, filter: 'blur(0px)'},
}

const signalCards = [
  {label: 'Fleet signal', value: 'Realtime', detail: 'Firestore-backed vehicle state', icon: LocateFixed},
  {label: 'Campus loop', value: 'UCSC', detail: 'Stops, hills, routes, and Metro overlap', icon: RouteIcon},
  {label: 'Build mode', value: 'Student-led', detail: 'Hardware, backend, map, and product', icon: Bus},
]

const controlStops = [
  ['Science Hill', '17%', '28%'],
  ['Quarry Plaza', '58%', '18%'],
  ['East Field', '78%', '64%'],
  ['Cowell', '27%', '74%'],
]

function ExhibitLabel({children}) {
  return <p className="type-overline">{children}</p>
}

function SectionHeading({eyebrow, title, body, align = 'left', className = ''}) {
  return (
    <div
      className={`max-w-[880px] space-y-4 ${
        align === 'center' ? 'mx-auto text-center' : ''
      } ${className}`}
    >
      <ExhibitLabel>{eyebrow}</ExhibitLabel>
      <h2 className="type-display-2">{title}</h2>
      {body && <p className="type-heading-5 text-muted">{body}</p>}
    </div>
  )
}

function MotionSection({children, className, animationProps}) {
  return (
    <motion.section className={className} {...animationProps}>
      {children}
    </motion.section>
  )
}

function CommandDeck() {
  return (
    <Card className="relative min-h-[560px] overflow-hidden p-4 md:p-5" interactive={false}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,color-mix(in_srgb,var(--color-primary),transparent_68%),transparent_30%),radial-gradient(circle_at_82%_12%,color-mix(in_srgb,var(--color-secondary),transparent_72%),transparent_26%)]" />
      <div className="relative z-[1] grid h-full min-h-[528px] gap-4 lg:grid-rows-[auto_1fr_auto]">
        <div className="case-plate flex flex-wrap items-center justify-between gap-3 rounded-[1.35rem] px-4 py-3">
          <div>
            <p className="type-caption uppercase tracking-[0.2em] text-muted">SlugLoop OS</p>
            <p className="font-display text-xl font-extrabold tracking-[-0.03em]">
              campus transit control
            </p>
          </div>
          <Chip label="Signal live" tone="primary" />
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_160px]">
          <div className="relative min-h-[330px] overflow-hidden rounded-[2rem] border border-[var(--museum-route-diagram-border)] bg-[image:var(--museum-route-diagram-background)]">
            <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(var(--museum-grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--museum-grid-line)_1px,transparent_1px)] [background-size:34px_34px]" />
            <div className="route-loop absolute inset-[12%] rounded-[44%_56%_47%_53%]" />
            <div className="route-loop-secondary absolute inset-[22%_18%] rounded-[54%_46%_58%_42%]" />
            {controlStops.map(([label, left, top], index) => (
              <div
                key={label}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{left, top}}
              >
                <span
                  className={`museum-dot mb-2 block ${
                    index === 1 ? 'h-5 w-5' : 'h-3.5 w-3.5'
                  }`}
                />
                <p className="rounded-full border border-[var(--museum-soft-divider)] bg-[color-mix(in_srgb,var(--color-bg),transparent_16%)] px-2 py-1 text-[0.68rem] font-bold uppercase tracking-[0.12em]">
                  {label}
                </p>
              </div>
            ))}
            <div className="scanline absolute inset-x-0 top-0 h-24" />
          </div>

          <div className="grid gap-3">
            {[
              ['ETA', '02:14'],
              ['Route', 'Loop'],
              ['Metro', '5 lines'],
            ].map(([label, value]) => (
              <div
                key={label}
                className="case-plate rounded-[1.25rem] px-4 py-4"
              >
                <p className="type-caption uppercase tracking-[0.18em] text-muted">{label}</p>
                <p className="font-display text-2xl font-extrabold tracking-[-0.04em] text-[var(--color-primary-light)]">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {signalCards.map(({label, value, icon: Icon}) => (
            <div key={label} className="case-plate rounded-[1.25rem] p-4">
              <Icon className="mb-4 text-[var(--color-secondary)]" size={20} aria-hidden="true" />
              <p className="type-caption uppercase tracking-[0.18em] text-muted">{label}</p>
              <p className="font-bold">{value}</p>
            </div>
          ))}
        </div>
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
        viewport: {once: true, amount: 0.16},
        variants: fadeUp,
        transition: {duration: 0.72, ease: [0.22, 1, 0.36, 1]},
      }

  return (
    <div className="museum-page overflow-hidden">
      <div className="museum-grid-overlay" />
      <div className="archive-grain" />

      <main className="relative z-[1]">
        <section className="relative grid min-h-[calc(100vh-72px)] items-center gap-10 overflow-hidden px-5 pb-14 pt-20 md:px-10 md:pb-20 md:pt-28 xl:grid-cols-[0.94fr_1.06fr] xl:px-16 2xl:px-24">
          <div className="route-halo -left-36 top-8 h-80 w-80 md:h-[34rem] md:w-[34rem]" />
          <div className="route-halo -right-24 bottom-4 h-64 w-64 opacity-80 md:h-[28rem] md:w-[28rem]" />

          <motion.div {...animationProps}>
            <div className="max-w-[860px] space-y-8">
              <div className="space-y-5">
                <Chip label="Preserved transit system / finalist case study" tone="primary" />
                <h1 className="type-display-1">
                  Campus transit, rebuilt as a kinetic control system.
                </h1>
                <p className="max-w-[720px] text-[clamp(1.08rem,1.7vw,1.32rem)] leading-[1.7] text-muted">
                  SlugLoop turned live GPS hardware, Firestore, Express, React,
                  and Google Maps into a student-built shuttle tracker for UCSC.
                  This archive now frames the project like the system it was:
                  operational, precise, and moving.
                </p>
              </div>

              <div className="grid max-w-[760px] gap-3 sm:grid-cols-3">
                {signalCards.map(({label, detail, icon: Icon}) => (
                  <div key={label} className="case-plate rounded-[1.35rem] p-4">
                    <Icon className="mb-4 text-[var(--color-secondary)]" size={22} aria-hidden="true" />
                    <p className="font-display text-lg font-extrabold tracking-[-0.03em]">{label}</p>
                    <p className="text-sm text-muted">{detail}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href="/map" variant="solid" size="lg" endIcon={<ArrowRight size={18} />}>
                  Launch map artifact
                </Button>
                <Button
                  href={externalLinks.demoVideo}
                  target="_blank"
                  rel="noopener"
                  variant="outline"
                  size="lg"
                  startIcon={<PlayCircle size={18} />}
                >
                  Watch system demo
                </Button>
                <Button
                  href={externalLinks.githubRepo}
                  target="_blank"
                  rel="noopener"
                  variant="ghost"
                  size="lg"
                  startIcon={<Github size={18} />}
                >
                  Inspect source
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div {...animationProps} transition={{duration: 0.84, delay: 0.08}}>
            <CommandDeck />
          </motion.div>
        </section>

        <section className="px-5 pb-14 md:px-10 md:pb-20 xl:px-16 2xl:px-24">
          <div className="grid gap-3 md:grid-cols-4">
            {heroStats.map((stat, index) => (
              <Card
                key={stat.label}
                className={`p-5 md:p-6 ${index % 2 ? 'md:translate-y-6' : ''}`}
                interactive={false}
              >
                <p className="type-caption mb-5 uppercase tracking-[0.18em] text-muted">
                  0{index + 1}
                </p>
                <h3 className="type-heading-3 text-[var(--color-secondary)]">{stat.value}</h3>
                <p className="mt-2 text-sm text-muted">{stat.label}</p>
              </Card>
            ))}
          </div>
        </section>

        <MotionSection
          className="grid gap-10 px-5 py-16 md:px-10 md:py-24 xl:grid-cols-[0.72fr_1.28fr] xl:px-16 2xl:px-24"
          animationProps={animationProps}
        >
          <div className="xl:sticky xl:top-28 xl:self-start">
            <SectionHeading
              eyebrow="System profile"
              title="A practical app with real operational depth."
              body="The flow now follows the product story: pressure, signal, software, public proof. Each section has room to breathe while still feeling like one continuous route."
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {exhibitSections.map((section, index) => (
              <Card
                key={section.title}
                className={`p-6 md:p-8 ${index === 1 || index === 2 ? 'md:translate-y-8' : ''}`}
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="type-overline">{section.eyebrow}</p>
                    <span className="rounded-full border border-[var(--museum-soft-divider)] px-3 py-1 text-xs font-bold text-[var(--color-primary-light)]">
                      {section.accent}
                    </span>
                  </div>
                  <h3 className="type-heading-4">{section.title}</h3>
                  <p className="text-muted">{section.body}</p>
                </div>
              </Card>
            ))}
          </div>
        </MotionSection>

        <MotionSection
          className="px-5 py-16 md:px-10 md:py-24 xl:px-16 2xl:px-24"
          animationProps={animationProps}
        >
          <div className="museum-static-card overflow-hidden rounded-[2.25rem] border-[var(--museum-teal-border)]">
            <div className="grid gap-0 xl:grid-cols-[0.42fr_0.58fr]">
              <div className="p-6 md:p-10 xl:p-12">
                <SectionHeading
                  eyebrow="Architecture"
                  title="From bus ping to moving pixel."
                  body="The preserved map still mirrors the original system shape: physical hardware produced the signal, the backend normalized it, Firestore carried state, and React rendered campus movement."
                />
                <div className="mt-8 flex flex-wrap gap-3">
                  <Chip label="GPS" />
                  <Chip label="Express" tone="primary" />
                  <Chip label="Firestore" />
                  <Chip label="Google Maps" tone="primary" />
                </div>
              </div>
              <div className="relative border-t border-[var(--museum-soft-divider)] p-4 md:p-6 xl:border-l xl:border-t-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_18%,color-mix(in_srgb,var(--color-primary),transparent_76%),transparent_30%)]" />
                <div className="relative grid gap-3">
                  {architectureFlow.map((item) => (
                    <Card key={item.step} className="p-5" interactive={false}>
                      <div className="grid gap-4 sm:grid-cols-[72px_1fr]">
                        <p className="font-display text-4xl font-extrabold tracking-[-0.06em] text-[var(--color-secondary)]">
                          {item.step}
                        </p>
                        <div>
                          <h3 className="type-heading-5 text-[var(--color-text-primary)]">{item.title}</h3>
                          <p className="text-muted">{item.detail}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </MotionSection>

        <MotionSection
          className="px-5 py-16 md:px-10 md:py-24 xl:px-16 2xl:px-24"
          animationProps={animationProps}
        >
          <SectionHeading
            eyebrow="Recognition"
            title="Public proof, not portfolio filler."
            body="Coverage from campus and local outlets gave the project external weight, while Google's finalist stage proved the student system could travel beyond Santa Cruz."
            align="center"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {pressLinks.map((link, index) => (
              <Card
                key={link.href}
                className={`min-h-[220px] p-6 ${index % 2 ? 'xl:translate-y-8' : ''}`}
                interactive={false}
              >
                <div className="flex h-full flex-col gap-5">
                  <Award className="text-[var(--color-secondary)]" size={22} aria-hidden="true" />
                  <p className="type-overline">{link.label}</p>
                  <h3 className="text-lg font-bold leading-snug">{link.title}</h3>
                  <div className="flex-1" />
                  <a href={link.href} target="_blank" rel="noopener" className={linkText}>
                    Read source <ExternalLink size={14} className="inline" aria-hidden="true" />
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </MotionSection>

        <MotionSection
          className="grid gap-10 px-5 py-16 md:px-10 md:py-24 xl:grid-cols-[0.9fr_1.1fr] xl:px-16 2xl:px-24"
          animationProps={animationProps}
        >
          <SectionHeading
            eyebrow="Route log"
            title="The build story now reads like motion."
            body="A compressed path through discovery, prototype, beta, finalist stage, and archive mode. The full timeline keeps the longer record intact."
          />
          <div className="space-y-3">
            {milestones.slice(0, 5).map((milestone, index) => (
              <div
                key={`${milestone.date}-${milestone.title}`}
                className="case-plate grid gap-4 rounded-[1.5rem] p-5 sm:grid-cols-[108px_1fr]"
              >
                <div className="flex items-center gap-3 sm:block">
                  <span className="museum-dot h-2.5 w-2.5 sm:mb-3 sm:block" />
                  <p className="type-caption font-bold text-[var(--color-secondary)]">{milestone.date}</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold">{index + 1}. {milestone.title}</h3>
                  <p className="text-sm text-muted">{milestone.description}</p>
                </div>
              </div>
            ))}
            <Button href="/timeline" variant="ghost" endIcon={<ArrowRight size={18} />}>
              Visit the archive route
            </Button>
          </div>
        </MotionSection>

        <MotionSection
          className="px-5 py-16 md:px-10 md:py-24 xl:px-16 2xl:px-24"
          animationProps={animationProps}
        >
          <SectionHeading
            eyebrow="Crew"
            title="Four students carried the whole stack."
            body="The team section is deliberately compact: enough personality to humanize the system without breaking the forward momentum of the page."
            align="center"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {teamMembers.map((member) => (
              <Card key={member.name} className="p-5" interactive={false}>
                <div className="flex h-full flex-col items-start gap-4">
                  <Avatar src={member.img} alt={member.name} size={72} />
                  <div>
                    <h3 className="text-lg font-bold">{member.name}</h3>
                    <p className="text-sm text-muted">{member.role}</p>
                  </div>
                  <div className="flex-1" />
                  <a href={member.linkedin} target="_blank" rel="noopener" className={linkText}>
                    LinkedIn
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </MotionSection>

        <MotionSection
          className="px-5 py-16 md:px-10 md:py-24 xl:px-16 2xl:px-24"
          animationProps={animationProps}
        >
          <Card className="relative overflow-hidden p-6 md:p-10 xl:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,color-mix(in_srgb,var(--color-secondary),transparent_76%),transparent_26%),radial-gradient(circle_at_82%_72%,color-mix(in_srgb,var(--color-primary),transparent_78%),transparent_30%)]" />
            <div className="relative grid gap-10 xl:grid-cols-[0.85fr_1.15fr]">
              <SectionHeading
                eyebrow="Retrospective"
                title="A map demo, a case study, and a signal that still holds."
                body="SlugLoop is no longer positioned as a commuter utility. It now works as a polished archive of shipped work, public impact, and technical range."
              />
              <div className="space-y-4">
                {proofPoints.map((point) => (
                  <div key={point} className="flex items-start gap-4">
                    <span className="museum-dot mt-2 h-2.5 w-2.5" />
                    <p className="text-muted">{point}</p>
                  </div>
                ))}
                <div className={divider} />
                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                  <Button href="/map" variant="solid" startIcon={<MapIcon size={18} />}>
                    Open map demo
                  </Button>
                  <Button href="/contact" variant="outline" endIcon={<ArrowRight size={18} />}>
                    Browse all links
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </MotionSection>
      </main>
    </div>
  )
}
