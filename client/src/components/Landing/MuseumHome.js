'use client'

import React from 'react'
import {motion, useReducedMotion} from 'framer-motion'
import {externalLinks, journeyStats, pressLinks} from '../slugloopMuseumData'
import Button from '../ui/Button'
import BusTicket from '../ui/BusTicket'
import Chip from '../ui/Chip'
import MarkerCircle from '../ui/MarkerCircle'
import MarkerHighlight from '../ui/MarkerHighlight'
import NewsClipping from '../ui/NewsClipping'
import PencilArrow from '../ui/PencilArrow'
import Polaroid from '../ui/Polaroid'
import SlugDoodle from '../ui/SlugDoodle'
import Stamp from '../ui/Stamp'
import StickyNote from '../ui/StickyNote'
import Tape from '../ui/Tape'
import {ArrowRight, Github, MapPin, PlayCircle} from '../ui/icons'

const stickerRow = [
  {label: "cruzhacks '23", tone: 'ink'},
  {label: 'gdsc top 10', tone: 'red'},
  {label: 'student-built', tone: 'ocean'},
  {label: 'open source', tone: 'ink'},
  {label: '2023 archive', tone: 'red'},
]

const heroPolaroids = [
  {
    src: '/background/hackathon.png',
    alt: 'CruzHacks 2023 — the team forms',
    caption: 'cruzhacks, hour zero',
    rotate: 'left',
    tapeColor: 'yellow',
  },
  {
    src: '/background/coding.png',
    alt: 'Late-night hackathon coding',
    caption: '4 am, library couch',
    rotate: 'right',
    tapeColor: 'blue',
  },
  {
    src: '/background/competition.png',
    alt: 'Top 10 demo day',
    caption: 'demo day, top 10',
    rotate: 'flat',
    tapeColor: 'yellow',
  },
]

function HomeHero({reduceMotion}) {
  const animation = reduceMotion
    ? {}
    : {
        initial: {opacity: 0, y: 18},
        animate: {opacity: 1, y: 0},
        transition: {duration: 0.7, ease: [0.22, 1, 0.36, 1]},
      }

  return (
    <section className="relative mx-auto max-w-[1280px] px-5 pt-20 md:px-12 md:pt-28 lg:px-16">
      {/* sticker row up top */}
      <motion.div
        {...animation}
        className="flex flex-wrap items-center gap-3"
      >
        {stickerRow.map((sticker) => (
          <Chip key={sticker.label} tone={sticker.tone} label={sticker.label} />
        ))}
      </motion.div>

      <div className="grid gap-12 lg:grid-cols-[1.15fr_0.95fr] lg:items-end mt-10">
        <motion.div
          {...animation}
          transition={{...(animation.transition ?? {}), delay: 0.04}}
        >
          <div className="flex items-center gap-4">
            <SlugDoodle size={56} className="text-[var(--ocean)]" />
            <span className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.22em] text-[var(--ink-soft)]">
              field notes \\ ucsc transit \\ 2023
            </span>
          </div>

          <h1 className="type-display-1 mt-6">
            <span className="block">SlugLoop.</span>
            <span className="block type-hand text-[var(--red-pen)]" style={{fontSize: '0.42em', lineHeight: 1, marginTop: '-0.15em'}}>
              field notes from a hackathon
            </span>
            <span className="block type-hand text-[var(--ink-soft)]" style={{fontSize: '0.42em', lineHeight: 1}}>
              that went further than expected.
            </span>
          </h1>

          <p className="mt-7 max-w-[58ch] text-[clamp(1rem,1.5vw,1.18rem)] leading-[1.7] text-[var(--ink-soft)]">
            Four UCSC engineering students rebuilt the campus loop bus tracker
            over a hackathon weekend, took it public, and ended up as the
            first U.S. team to make the Google Solution Challenge global Top 10
            in three years. This site is the preserved field log + a frozen
            demo of the map.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="/journey" variant="solid" endIcon={<ArrowRight size={16} />}>
              Read the field log
            </Button>
            <Button href="/map" variant="outline" startIcon={<MapPin size={14} />}>
              Open the demo map
            </Button>
            <Button
              href={externalLinks.githubRepo}
              target="_blank"
              rel="noopener"
              variant="ghost"
              startIcon={<Github size={14} />}
            >
              Source code
            </Button>
          </div>
        </motion.div>

        {/* hero polaroid stack */}
        <motion.div
          {...animation}
          transition={{...(animation.transition ?? {}), delay: 0.12}}
          className="relative h-[480px] md:h-[520px]"
        >
          {/* stack polaroids absolutely so they overlap like pinned to a corkboard */}
          <div
            className="absolute"
            style={{top: 0, right: 30, transform: 'rotate(-6deg)', zIndex: 1}}
          >
            <Polaroid
              src={heroPolaroids[0].src}
              alt={heroPolaroids[0].alt}
              caption={heroPolaroids[0].caption}
              rotate="left"
              width={260}
              height={260}
            />
          </div>
          <div
            className="absolute"
            style={{top: 130, left: 0, transform: 'rotate(4deg)', zIndex: 2}}
          >
            <Polaroid
              src={heroPolaroids[1].src}
              alt={heroPolaroids[1].alt}
              caption={heroPolaroids[1].caption}
              rotate="right"
              tapeColor="blue"
              width={240}
              height={240}
            />
          </div>
          <div
            className="absolute"
            style={{bottom: 0, right: 80, transform: 'rotate(-2deg)', zIndex: 3}}
          >
            <Polaroid
              src={heroPolaroids[2].src}
              alt={heroPolaroids[2].alt}
              caption={heroPolaroids[2].caption}
              rotate="flat"
              width={250}
              height={250}
            />
          </div>

          {/* stamp on top of the stack */}
          <div
            className="absolute"
            style={{top: 12, left: 40, zIndex: 5, pointerEvents: 'none'}}
          >
            <Stamp tone="red" size="lg" rotate={-12}>
              top 10 finalist
            </Stamp>
          </div>

          {/* pencil arrow pointing toward the polaroid stack */}
          <PencilArrow
            direction="curve"
            width={170}
            height={120}
            className="absolute text-[var(--ink-soft)]"
            style={{bottom: 230, left: -20, transform: 'rotate(-10deg)'}}
          />
        </motion.div>
      </div>
    </section>
  )
}

function ReadMeFirst() {
  return (
    <section className="relative mx-auto mt-24 max-w-[1180px] px-5 md:mt-32 md:px-12 lg:px-16">
      <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-start">
        <article className="notebook-page notebook-page--margin relative px-6 py-8 md:px-10 md:py-12">
          <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.22em] text-[var(--red-pen)]">
            // read me first
          </p>
          <h2 className="type-display-2 mt-4">
            The receivers don&rsquo;t ping anymore. <br />
            <MarkerHighlight strong>This is the field log.</MarkerHighlight>
          </h2>
          <p className="mt-6 max-w-[64ch] text-[1.05rem] leading-[1.7] text-[var(--ink-soft)]">
            SlugLoop shipped in 2023. The map ran on reprogrammed GPS hardware
            on the campus loop fleet, base stations on top of buildings, an
            Express + Firestore pipeline, and a React PWA. Some time after the
            team graduated, the basestations stopped reporting. The map still
            loads. The journey still happened. Both are preserved here as a
            case study, not a commute tool.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Chip tone="red" label="status: archived demo" />
            <Chip tone="ink" label="last live ping: ~2024" />
            <Chip tone="ocean" label="apache 2.0" />
          </div>
        </article>

        <div className="relative flex flex-col gap-6 lg:pt-8">
          <StickyNote color="yellow" rotate="right" pin>
            <span>
              if the map looks <span style={{textDecoration: 'underline'}}>empty</span>, that&rsquo;s expected. it&rsquo;s the
              archive, not the live feed.
            </span>
          </StickyNote>
          <StickyNote color="blue" rotate="left">
            scroll down → the journey is the main exhibit.
          </StickyNote>
        </div>
      </div>
    </section>
  )
}

function StatStrip() {
  return (
    <section
      className="relative mx-auto mt-24 max-w-[1180px] px-5 md:mt-28 md:px-12 lg:px-16"
    >
      <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.22em] text-[var(--ink-soft)]">
        // by the numbers
      </p>
      <div className="mt-6 flex flex-wrap items-end gap-x-12 gap-y-8 border-t-2 border-b-2 border-[var(--ink)] py-8">
        {journeyStats.map((stat, index) => (
          <div key={stat.label} className="min-w-[140px]">
            <p className="font-display text-[clamp(2rem,4.4vw,3.8rem)] font-semibold leading-none tracking-[-0.02em]">
              {index === 3 ? (
                <MarkerHighlight strong>{stat.value}</MarkerHighlight>
              ) : (
                stat.value
              )}
            </p>
            <p className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--ink-soft)]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

function JourneyCTA() {
  return (
    <section className="relative mx-auto mt-24 max-w-[1180px] px-5 md:mt-32 md:px-12 lg:px-16">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-20">
        <div>
          <p className="type-overline">// the main exhibit</p>
          <h2 className="type-display-2 mt-4">
            Read the journey.{' '}
            <span className="type-hand text-[var(--red-pen)]" style={{fontSize: '0.6em'}}>
              start at the top.
            </span>
          </h2>
          <p className="mt-5 max-w-[58ch] text-[var(--ink-soft)]">
            A scrolling field log of how SlugLoop got from a Reddit thread in
            January 2023 to <MarkerCircle as="span">Google&rsquo;s global Top 10 finalist stage</MarkerCircle> by August.
            Photos, sticky-note notes, news clippings, and the actual
            competition demo videos.
          </p>
        </div>

        <div className="flex flex-col items-start gap-4 lg:items-end">
          <PencilArrow direction="right" width={220} height={60} className="text-[var(--ink-soft)]" />
          <Button
            href="/journey"
            variant="solid"
            size="lg"
            endIcon={<ArrowRight size={18} />}
          >
            Open the field log
          </Button>
        </div>
      </div>
    </section>
  )
}

function PressRow() {
  return (
    <section
      className="relative mx-auto mt-24 max-w-[1280px] px-5 md:mt-32 md:px-12 lg:px-16"
    >
      <p className="type-overline">// from the clippings file</p>
      <h2 className="type-display-2 mt-4">
        <MarkerHighlight>The press picked up the story.</MarkerHighlight>
      </h2>

      <div className="relative mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {pressLinks.map((link, index) => (
          <div key={link.href} className="relative">
            <Tape
              top={-8}
              left={index % 2 === 0 ? 20 : 'auto'}
              right={index % 2 === 1 ? 20 : 'auto'}
              rotate={index % 2 === 0 ? -8 : 7}
              color={index % 2 === 0 ? 'yellow' : 'blue'}
            />
            <NewsClipping
              source={link.label}
              date={index === 0 ? 'Jul 31, 2023' : index === 1 ? 'Jul 26, 2023' : index === 2 ? 'Jul 28, 2023' : '2023'}
              headline={link.title}
              href={link.href}
              rotate={index % 2 === 0 ? -1.4 : 1.6}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

function VideoTickets() {
  return (
    <section className="relative mx-auto mt-24 max-w-[1180px] px-5 md:mt-32 md:px-12 lg:px-16">
      <p className="type-overline">// archive: demo videos</p>
      <h2 className="type-display-2 mt-4">
        Two demos.{' '}
        <span className="type-hand text-[var(--ink-soft)]" style={{fontSize: '0.55em'}}>
          recorded a few weeks apart.
        </span>
      </h2>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <BusTicket
          serial="100"
          label="GDSC top 100"
          title="The submission demo."
          body="A tighter walkthrough recorded for the Solution Challenge round-of-100 judging."
          href={externalLinks.top100DemoVideo}
          external
        >
          <p className="mt-3 inline-flex items-center gap-2 font-mono text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[var(--ocean)]">
            <PlayCircle size={14} aria-hidden="true" /> watch on youtube
          </p>
        </BusTicket>
        <BusTicket
          serial="010"
          label="GDSC top 10"
          title="The finalist demo."
          body="The polished demo recorded after SlugLoop reached the global Top 10 finalist stage."
          href={externalLinks.top10DemoVideo}
          external
        >
          <p className="mt-3 inline-flex items-center gap-2 font-mono text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[var(--red-pen)]">
            <PlayCircle size={14} aria-hidden="true" /> watch on youtube
          </p>
        </BusTicket>
      </div>
    </section>
  )
}

function FooterStrip() {
  return (
    <section className="relative mx-auto mt-24 mb-24 max-w-[1180px] px-5 md:mt-32 md:px-12 lg:px-16">
      <div className="border-t border-dashed border-[var(--ink-soft)] pt-10">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="type-hand text-[2rem] leading-tight">
              that&rsquo;s the cover. flip the page.
            </p>
            <p className="mt-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-[var(--ink-soft)]">
              slugloop / preserved archive / 2023&ndash;present
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/journey" variant="solid" endIcon={<ArrowRight size={14} />}>
              Field log
            </Button>
            <Button href="/about" variant="outline">
              The crew
            </Button>
            <Button href="/contact" variant="ghost">
              Links
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function MuseumHome() {
  const reduceMotion = useReducedMotion()

  return (
    <main className="paper relative min-h-screen overflow-hidden">
      <div className="paper-grid" />
      <div className="paper-grain" />

      {/* decorative coffee rings */}
      <span className="coffee-ring" aria-hidden="true" style={{top: 200, right: -60}} />
      <span
        className="coffee-ring hidden md:block"
        aria-hidden="true"
        style={{top: '60%', left: -80, opacity: 0.4}}
      />

      <HomeHero reduceMotion={reduceMotion} />
      <ReadMeFirst />
      <StatStrip />
      <JourneyCTA />
      <PressRow />
      <VideoTickets />
      <FooterStrip />
    </main>
  )
}
