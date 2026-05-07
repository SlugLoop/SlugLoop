'use client'

import React from 'react'
import {externalLinks, teamMembers} from '../slugloopMuseumData'
import Button from '../ui/Button'
import Chip from '../ui/Chip'
import MarkerHighlight from '../ui/MarkerHighlight'
import PencilArrow from '../ui/PencilArrow'
import Polaroid from '../ui/Polaroid'
import Stamp from '../ui/Stamp'
import StickyNote from '../ui/StickyNote'
import {ArrowRight, ExternalLink, Linkedin} from '../ui/icons'

const polaroidLayout = [
  {
    rotate: 'left',
    polaroidRotate: -3,
    cardRotate: -1.2,
    polaroidWidth: 240,
    tapeColor: 'yellow',
    tapeRotate: -8,
  },
  {
    rotate: 'right',
    polaroidRotate: 3.5,
    cardRotate: 1,
    polaroidWidth: 230,
    tapeColor: 'blue',
    tapeRotate: 9,
  },
  {
    rotate: 'left',
    polaroidRotate: -1.5,
    cardRotate: -2,
    polaroidWidth: 230,
    tapeColor: 'blue',
    tapeRotate: -6,
  },
  {
    rotate: 'right',
    polaroidRotate: 2.5,
    cardRotate: 1.4,
    polaroidWidth: 240,
    tapeColor: 'yellow',
    tapeRotate: 7,
  },
]

const stickyColors = ['yellow', 'blue', 'pink', 'yellow']
const stickyRotations = ['right', 'left', 'right', 'left']

const acknowledgments = [
  'A Baskin Engineering professor who said "yes, you can touch the hardware."',
  'Whoever installed the original GPS units on the loop fleet years ago.',
  'UCSC IT staff who let four students near the basestations on the rooftops.',
  'CruzHacks 2023 organizers and judges.',
  'The r/UCSC posters whose frustration framed the spec.',
  'Every beta tester who refreshed the map in the rain.',
]

const madeWith = [
  '<too many> cups of coffee from McHenry',
  'one (1) printer/scanner stolen from the lab for screenshots',
  'a dorm room couch in Crown',
  'github commits at 4 am',
  'cruzhacks pizza, cold by hour 12',
  'a lot of slack messages with "is this working??"',
]

function TeamMemberCard({member, layout, sticky, stickyColor}) {
  return (
    <div
      className="relative flex flex-col items-center"
    >
      {/* Polaroid */}
      <div
        className="relative"
        style={{transform: `rotate(${layout.polaroidRotate}deg)`}}
      >
        <Polaroid
          src={member.img}
          alt={member.name}
          caption={member.name.toLowerCase()}
          rotate={layout.rotate}
          width={layout.polaroidWidth}
          height={layout.polaroidWidth}
          tapeColor={layout.tapeColor}
        />
      </div>

      {/* Role caption + sticky note */}
      <div className="relative mt-6 w-full max-w-[260px]">
        <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[var(--ink-soft)]">
          // {member.role}
        </p>
        <div className="mt-4 flex justify-center">
          <StickyNote color={stickyColor} rotate={sticky} size="sm">
            {member.fieldNote}
          </StickyNote>
        </div>
        <div className="mt-5 flex justify-center">
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 font-mono text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[var(--ocean)] hover:text-[var(--ink)]"
          >
            <Linkedin size={14} aria-hidden="true" /> linkedin
          </a>
        </div>
      </div>
    </div>
  )
}

export default function TeamPage() {
  return (
    <main className="paper relative min-h-screen pb-24">
      <div className="paper-grid" />
      <div className="paper-grain" />

      <span
        className="coffee-ring hidden md:block"
        aria-hidden="true"
        style={{top: 240, right: 80, opacity: 0.5}}
      />

      <header className="relative mx-auto max-w-[1180px] px-5 pt-24 md:px-12 md:pt-32 lg:px-16">
        <div className="flex flex-wrap items-center gap-3">
          <Chip tone="ink" label="the crew" />
          <Chip tone="red" label="four students" />
        </div>
        <h1 className="type-display-1 mt-6">
          Four engineers,{' '}
          <MarkerHighlight strong>one campus problem</MarkerHighlight>, one shared repo.
        </h1>
        <p className="mt-6 max-w-[64ch] text-[clamp(1rem,1.55vw,1.2rem)] leading-[1.65] text-[var(--ink-soft)]">
          SlugLoop was built end-to-end by four UCSC Baskin Engineering students.
          Roles drew themselves around skill: product and full-stack lead,
          backend and data pipeline, frontend and UX, hardware and embedded.
          Everyone touched something they hadn&rsquo;t before.
        </p>
        <p className="mt-5 type-hand text-[1.5rem] text-[var(--red-pen)]">
          ↓ taped to the corkboard, in no particular order.
        </p>
      </header>

      <section className="relative mx-auto mt-16 max-w-[1280px] px-5 md:mt-24 md:px-12 lg:px-16">
        <div className="grid gap-x-8 gap-y-20 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6">
          {teamMembers.map((member, index) => (
            <TeamMemberCard
              key={member.name}
              member={member}
              layout={polaroidLayout[index] ?? polaroidLayout[0]}
              sticky={stickyRotations[index] ?? 'left'}
              stickyColor={stickyColors[index] ?? 'yellow'}
            />
          ))}
        </div>
      </section>

      <section className="relative mx-auto mt-28 max-w-[1180px] px-5 md:px-12 lg:px-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr]">
          <article className="notebook-page notebook-page--margin relative px-6 py-8 md:px-10 md:py-12">
            <Stamp
              tone="ink"
              size="sm"
              rotate={6}
              className="absolute right-6 top-6"
            >
              acknowledgments
            </Stamp>
            <p className="type-overline">// built with help from</p>
            <h2 className="type-display-2 mt-3">A small village.</h2>
            <p className="mt-5 max-w-[60ch] text-[var(--ink-soft)]">
              We didn&rsquo;t do this alone. The honest list:
            </p>
            <ul className="mt-6 space-y-3 text-[1rem] leading-[1.65] text-[var(--ink)]">
              {acknowledgments.map((line) => (
                <li key={line} className="flex gap-3">
                  <span aria-hidden="true" className="mt-1 text-[var(--red-pen)]">
                    ✓
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="notebook-page relative px-6 py-8 md:px-10 md:py-12">
            <p className="type-overline">// made with</p>
            <h2 className="type-display-2 mt-3">
              <MarkerHighlight>Receipts.</MarkerHighlight>
            </h2>
            <p className="mt-5 max-w-[58ch] text-[var(--ink-soft)]">
              A loosely accurate inventory of what actually got the project
              shipped.
            </p>
            <ul className="mt-6 space-y-3 font-mono text-[0.92rem] leading-[1.6]">
              {madeWith.map((line, idx) => (
                <li key={line} className="flex items-start gap-3">
                  <span className="text-[var(--ink-soft)]">{String(idx + 1).padStart(2, '0')}.</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="relative mx-auto mt-24 max-w-[1180px] px-5 pb-24 md:px-12 lg:px-16">
        <div className="border-t border-dashed border-[var(--ink-soft)] pt-10">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="type-hand text-[2rem] leading-tight">
                want to read what we shipped?
              </p>
              <PencilArrow direction="right" width={180} className="mt-2 text-[var(--ink-soft)]" />
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href="/journey" variant="solid" endIcon={<ArrowRight size={14} />}>
                The field log
              </Button>
              <Button href="/map" variant="outline">
                Open the map
              </Button>
              <Button
                href={externalLinks.githubRepo}
                target="_blank"
                rel="noopener"
                variant="ghost"
                endIcon={<ExternalLink size={14} />}
              >
                Source code
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
