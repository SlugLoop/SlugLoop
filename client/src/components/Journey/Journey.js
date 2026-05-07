'use client'

import React from 'react'
import {motion, useReducedMotion} from 'framer-motion'
import {externalLinks, journeyEntries, journeyStats} from '../slugloopMuseumData'
import Button from '../ui/Button'
import Chip from '../ui/Chip'
import MarkerHighlight from '../ui/MarkerHighlight'
import MarkerCircle from '../ui/MarkerCircle'
import NewsClipping from '../ui/NewsClipping'
import NotebookPage from '../ui/NotebookPage'
import PencilArrow from '../ui/PencilArrow'
import Polaroid from '../ui/Polaroid'
import Stamp from '../ui/Stamp'
import StickyNote from '../ui/StickyNote'
import Tape from '../ui/Tape'
import {ArrowRight, MapPin, PenTool, Quote} from '../ui/icons'

function JourneyHeader() {
  return (
    <header className="relative z-[1] mx-auto max-w-[1180px] px-5 pt-24 pb-12 md:px-12 md:pt-32 md:pb-16 lg:px-16">
      <div className="flex flex-wrap items-center gap-3">
        <Chip tone="ink" label="field log · vol. 01" />
        <Chip tone="red" label="from hackathon → top 10" />
      </div>
      <h1 className="type-display-1 mt-7">
        From a Reddit thread to{' '}
        <MarkerHighlight strong>Google&rsquo;s Top 10 stage</MarkerHighlight>.
      </h1>
      <p className="mt-6 max-w-[760px] text-[clamp(1.05rem,1.6vw,1.28rem)] leading-[1.65] text-[var(--ink-soft)]">
        A field log from when four UCSC engineering students rebuilt the campus
        loop bus tracker over a hackathon weekend, took it public, and then
        somehow ended up as the only United States team in the 2023 Google
        Solution Challenge global finals.
      </p>
      <p className="mt-4 type-hand text-[1.6rem] text-[var(--ink)]">
        Jan 2023 &mdash; Aug 2023, give or take.
      </p>

      <div className="mt-10 flex flex-wrap items-end gap-x-10 gap-y-6">
        {journeyStats.map((stat) => (
          <div key={stat.label} className="min-w-[120px]">
            <p className="font-display text-[clamp(1.85rem,3.6vw,3rem)] font-semibold leading-none tracking-[-0.02em] text-[var(--ink)]">
              {stat.value}
            </p>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[var(--ink-soft)] mt-2">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 flex items-end gap-6">
        <PencilArrow direction="down" height={120} className="text-[var(--ink-soft)]" />
        <p className="type-hand text-[1.55rem] mb-6 max-w-[260px] leading-tight">
          start at the top, scroll all the way down. don&rsquo;t skip the polaroids.
        </p>
      </div>
    </header>
  )
}

function EntryDateBlock({entry}) {
  return (
    <div className="flex flex-col gap-1">
      <p className="type-hand text-[2.4rem] leading-none text-[var(--ink)]">
        {entry.handDate}
      </p>
      <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[var(--ink-soft)]">
        {entry.chapter} &middot; {entry.date}
      </p>
    </div>
  )
}

function EntryStamp({entry}) {
  if (!entry.stamp) return null
  return (
    <div className="absolute right-4 top-4 md:right-6 md:top-6 z-[2] pointer-events-none">
      <Stamp
        tone={entry.stampTone ?? 'red'}
        size={entry.stampLarge ? 'xl' : 'md'}
        rotate={entry.side === 'left' ? 7 : -9}
        label={entry.stamp}
      />
    </div>
  )
}

function EntryPhotos({entry}) {
  if (!entry.photo && !entry.secondaryPhoto && !entry.video && !entry.clipping) {
    return null
  }

  return (
    <div className="relative flex flex-col gap-6 md:gap-8">
      {entry.photo && (
        <div className="relative inline-block">
          <Polaroid
            src={entry.photo}
            alt={entry.photoAlt}
            caption={entry.photoCaption}
            rotate={entry.side === 'left' ? 'right' : 'left'}
            width={300}
            height={300}
          />
        </div>
      )}
      {entry.secondaryPhoto && (
        <div className="relative inline-block ml-10">
          <Polaroid
            src={entry.secondaryPhoto}
            alt={entry.secondaryPhotoAlt}
            caption={entry.secondaryPhotoCaption}
            rotate="flat"
            width={250}
            height={250}
            tapeColor="blue"
          />
        </div>
      )}
      {entry.video && (
        <div className="relative">
          <Tape top={-12} left={20} length="long" color="blue" rotate={-6} />
          <Tape top={-12} right={20} length="long" color="yellow" rotate={6} />
          <div
            className="relative overflow-hidden border-[6px] border-[var(--ink)] bg-black"
            style={{
              boxShadow: '8px 14px 24px -10px rgba(13,27,42,0.4)',
              transform: 'rotate(-0.6deg)',
            }}
          >
            <div className="relative pb-[56.25%]">
              <iframe
                src={entry.video}
                title={entry.videoLabel}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <div className="flex items-center justify-between gap-2 bg-[var(--ink)] px-3 py-2">
              <p className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[var(--paper)]">
                {entry.videoLabel}
              </p>
              <span className="font-mono text-[0.6rem] text-[var(--paper-edge)]">
                youtube.com
              </span>
            </div>
          </div>
        </div>
      )}
      {entry.clipping && (
        <NewsClipping
          source={entry.clipping.source}
          date={entry.clipping.date}
          headline={entry.clipping.headline}
          body={entry.clipping.body}
          href={entry.clipping.href}
          rotate={entry.side === 'left' ? 1.4 : -1.6}
        />
      )}
    </div>
  )
}

function EntryAside({entry}) {
  if (!entry.quote && !entry.margin) return null

  return (
    <div className="flex flex-col gap-7">
      {entry.quote && (
        <StickyNote
          rotate={entry.side === 'left' ? 'right' : 'left'}
          color={entry.id === 'top-10' ? 'pink' : 'yellow'}
          pin
          size="md"
        >
          <Quote
            size={18}
            className="mb-1 inline-block opacity-50"
            aria-hidden="true"
          />
          <p>{entry.quote}</p>
          {entry.quoteAttribution && (
            <p className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.16em] opacity-70">
              {entry.quoteAttribution}
            </p>
          )}
        </StickyNote>
      )}
      {entry.margin && (
        <p className="type-hand text-[1.5rem] leading-tight text-[var(--red-pen)]">
          <PenTool size={16} className="inline mr-2 -mt-1" aria-hidden="true" />
          {entry.margin}
        </p>
      )}
    </div>
  )
}

function JourneyEntry({entry, index, animationProps}) {
  const isLeft = entry.side === 'left'
  const isFeature = entry.feature

  const transition = animationProps.transition
    ? {...animationProps.transition, delay: Math.min(0.06 + index * 0.045, 0.6)}
    : undefined

  return (
    <motion.section
      {...animationProps}
      transition={transition}
      className="relative mx-auto w-full max-w-[1180px] px-5 md:px-12 lg:px-16"
    >
      {/* Vertical thread line behind each entry on desktop */}
      <span
        aria-hidden="true"
        className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2"
        style={{
          width: 2,
          background: 'repeating-linear-gradient(to bottom, var(--ink-soft) 0 6px, transparent 6px 14px)',
          opacity: 0.32,
        }}
      />

      <div
        className={`relative grid gap-8 lg:grid-cols-2 lg:gap-16 ${
          isFeature ? 'lg:gap-20' : ''
        }`}
      >
        {/* Side A: text on left for left-side, photos on left for right-side */}
        <div
          className={`relative ${
            isLeft ? 'lg:order-1' : 'lg:order-2'
          }`}
        >
          <NotebookPage margin={!entry.closing} className={`relative ${isFeature ? 'lg:py-16' : ''}`}>
            <EntryStamp entry={entry} />
            <EntryDateBlock entry={entry} />
            <h2
              className={`mt-5 type-heading-3 text-[var(--ink)] ${
                isFeature ? 'type-heading-3 md:type-display-2' : ''
              }`}
              style={isFeature ? {fontSize: 'clamp(2.2rem, 4.4vw, 3.8rem)'} : undefined}
            >
              {entry.id === 'top-10' ? (
                <>
                  Top 10 global finalist.{' '}
                  <MarkerCircle>First U.S. team</MarkerCircle> in three years.
                </>
              ) : (
                entry.title
              )}
            </h2>
            <p className="mt-5 max-w-[60ch] text-[1rem] leading-[1.7] text-[var(--ink-soft)] md:text-[1.05rem]">
              {entry.body}
            </p>

            {/* Asides directly under text on mobile (always shown), desktop shows them in opposite column too */}
            <div className="mt-7 lg:hidden">
              <EntryAside entry={entry} />
            </div>
          </NotebookPage>

          {/* Desktop aside (sticky note + margin note) under the notebook page */}
          <div className="hidden lg:flex lg:mt-8 lg:pl-2">
            <EntryAside entry={entry} />
          </div>
        </div>

        {/* Side B: photos / video / clipping */}
        <div
          className={`relative ${
            isLeft ? 'lg:order-2' : 'lg:order-1'
          }`}
        >
          <div className="lg:sticky lg:top-28 flex flex-col items-start gap-6">
            <EntryPhotos entry={entry} />
          </div>
        </div>
      </div>

      {/* Connecting pencil arrow between entries on desktop */}
      {!entry.closing && (
        <div
          aria-hidden="true"
          className="pointer-events-none mx-auto mt-6 hidden h-[100px] lg:block"
          style={{width: 60}}
        >
          <PencilArrow
            direction="down"
            height={100}
            className="mx-auto text-[var(--ink-soft)]"
          />
        </div>
      )}
    </motion.section>
  )
}

function JourneyClose() {
  return (
    <section className="relative mx-auto mt-20 max-w-[1100px] px-5 pb-24 md:px-12 md:pb-32 lg:px-16">
      <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
        <div>
          <p className="type-overline text-[var(--ink-soft)]">end of file</p>
          <h2 className="type-display-2 mt-4">
            <MarkerHighlight>Field log: closed.</MarkerHighlight>
            <br />
            Open the demo.
          </h2>
          <p className="mt-5 max-w-[58ch] text-[var(--ink-soft)]">
            The basestations stopped reporting somewhere along the way. The
            archive map still loads with the original Firestore + Google Maps
            wiring &mdash; treat any vehicles you see as a frozen frame, not a
            commute tool.
          </p>
        </div>

        <div className="flex flex-col items-start gap-5 md:items-end">
          <Button href="/map" variant="solid" endIcon={<ArrowRight size={16} />}>
            Open the map
          </Button>
          <Button href="/about" variant="outline" endIcon={<ArrowRight size={16} />}>
            Meet the crew
          </Button>
          <Button
            href={externalLinks.githubRepo}
            target="_blank"
            rel="noopener"
            variant="ghost"
            endIcon={<ArrowRight size={16} />}
          >
            Read the source
          </Button>
        </div>
      </div>

      <div className="mt-16 flex items-center gap-4">
        <MapPin size={18} className="text-[var(--red-pen)]" aria-hidden="true" />
        <p className="type-hand text-[1.5rem]">
          UCSC, Santa Cruz, California. 36.99&deg; N, 122.06&deg; W.
        </p>
      </div>
    </section>
  )
}

export default function Journey() {
  const reduceMotion = useReducedMotion()

  const animationProps = reduceMotion
    ? {}
    : {
        initial: {opacity: 0, y: 18},
        animate: {opacity: 1, y: 0},
        transition: {duration: 0.55, ease: [0.22, 1, 0.36, 1]},
      }

  return (
    <main className="paper relative min-h-screen pb-32">
      <div className="paper-grid" />
      <div className="paper-grain" />
      <span
        className="paper-margin"
        aria-hidden="true"
        style={{left: 'max(56px, calc(50vw - 760px))'}}
      />

      {/* Decorative coffee ring */}
      <span
        className="coffee-ring hidden md:block"
        aria-hidden="true"
        style={{top: '38%', right: '6%'}}
      />

      <JourneyHeader />

      <div className="relative mt-12 flex flex-col gap-24 md:gap-28">
        {journeyEntries.map((entry, index) => (
          <JourneyEntry
            key={entry.id}
            entry={entry}
            index={index}
            animationProps={animationProps}
          />
        ))}
      </div>

      <JourneyClose />
    </main>
  )
}
