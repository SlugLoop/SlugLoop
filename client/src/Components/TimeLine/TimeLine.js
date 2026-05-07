'use client'

import React from 'react'
import {motion, useReducedMotion} from 'framer-motion'
import {milestones} from '../slugloopMuseumData'
import Button from '../ui/Button'
import Chip from '../ui/Chip'
import {ArrowRight} from '../ui/icons'

export default function MyTimeline() {
  const reduceMotion = useReducedMotion()

  return (
    <main className="museum-page-alt min-h-screen px-5 py-16 md:px-12 md:py-24 lg:px-20">
      <div className="mb-12 max-w-[920px] space-y-5 md:mb-20">
        <Chip label="Archive route" />
        <h1 className="type-display-1">The route from frustration to finalist.</h1>
        <p className="type-heading-5 text-muted">
          SlugLoop started as a campus pain point, became a hackathon build, and
          grew into a public, open-source project recognized by Google and local
          press.
        </p>
      </div>

      <div className="relative before:absolute before:bottom-0 before:left-[18px] before:top-0 before:w-[3px] before:bg-[var(--museum-timeline-line)] md:before:left-1/2 md:before:-translate-x-1/2">
        {milestones.map((milestone, index) => (
          <motion.div
            key={`${milestone.date}-${milestone.title}`}
            initial={reduceMotion ? false : {opacity: 0, y: 30}}
            whileInView={reduceMotion ? undefined : {opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.2}}
            transition={{duration: 0.55, delay: reduceMotion ? 0 : index * 0.03}}
            className="relative mb-8 grid gap-4 pl-14 md:mb-12 md:grid-cols-2 md:gap-12 md:pl-0"
          >
            <span className="museum-dot absolute left-[10px] top-[18px] z-[1] h-[18px] w-[18px] md:left-1/2 md:-translate-x-1/2" />
            <div
              className={
                index % 2 === 0
                  ? 'md:col-start-1 md:text-right'
                  : 'md:col-start-2 md:text-left'
              }
            >
              <article className="museum-static-card rounded-2xl p-6 md:p-8">
                <p className="type-overline">{milestone.date}</p>
                <h2 className="type-heading-4 mt-2 mb-3">{milestone.title}</h2>
                <p className="mb-4 text-muted">{milestone.description}</p>
                <p className="type-caption text-[var(--color-primary-light)]">
                  Source: {milestone.source}
                </p>
              </article>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col justify-center gap-3 pt-8 sm:flex-row">
        <Button href="/map" variant="solid">
          Launch map demo
        </Button>
        <Button href="/" variant="ghost" endIcon={<ArrowRight size={18} />}>
          Return to exhibit
        </Button>
      </div>
    </main>
  )
}
