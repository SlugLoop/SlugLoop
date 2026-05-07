'use client'

import React from 'react'
import {archiveLinks} from './slugloopMuseumData'
import BusTicket from './ui/BusTicket'
import Chip from './ui/Chip'
import MarkerHighlight from './ui/MarkerHighlight'
import NewsClipping from './ui/NewsClipping'
import Stamp from './ui/Stamp'
import StickyNote from './ui/StickyNote'
import Tape from './ui/Tape'
import {ArrowUpRight, ExternalLink, MapPin, PlayCircle} from './ui/icons'

const stickerForSerial = {
  MAP: {tone: 'ocean', icon: MapPin},
  '100': {tone: 'red', icon: PlayCircle},
  '010': {tone: 'red', icon: PlayCircle},
  GH: {tone: 'ink', icon: ArrowUpRight},
  ORG: {tone: 'ink', icon: ArrowUpRight},
  DP: {tone: 'ocean', icon: ArrowUpRight},
  WEB: {tone: 'ocean', icon: ExternalLink},
  ALT: {tone: 'ocean', icon: ExternalLink},
}

function SectionHeader({eyebrow, title, hand}) {
  return (
    <div className="mb-8 max-w-[760px]">
      <p className="type-overline">{eyebrow}</p>
      <h2 className="type-display-2 mt-3">{title}</h2>
      {hand && (
        <p className="mt-3 type-hand text-[1.45rem] text-[var(--ink-soft)]">
          {hand}
        </p>
      )}
    </div>
  )
}

export default function Contact() {
  return (
    <main className="paper relative min-h-screen pb-24">
      <div className="paper-grid" />
      <div className="paper-grain" />

      <header className="relative mx-auto max-w-[1180px] px-5 pt-24 md:px-12 md:pt-32 lg:px-16">
        <div className="flex flex-wrap items-center gap-3">
          <Chip tone="ink" label="inside back cover" />
          <Chip tone="red" label="links · stickers · sources" />
        </div>
        <h1 className="type-display-1 mt-6">
          The back of the notebook,{' '}
          <MarkerHighlight strong>where everything got taped in</MarkerHighlight>.
        </h1>
        <p className="mt-6 max-w-[64ch] text-[clamp(1rem,1.55vw,1.18rem)] leading-[1.65] text-[var(--ink-soft)]">
          Every link, video, repo, and press mention worth keeping. The contact
          form is gone &mdash; the archive doesn&rsquo;t collect messages anymore.
          Reach the team on LinkedIn from the crew page if you want to say hi.
        </p>
      </header>

      {/* DEMOS */}
      <section
        className="relative mx-auto mt-20 max-w-[1180px] px-5 md:mt-24 md:px-12 lg:px-16"
      >
        <SectionHeader
          eyebrow="// section A: demos"
          title="The map and the videos."
          hand="bus tickets, basically."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {archiveLinks.demo.map((link) => (
            <BusTicket
              key={link.serial}
              serial={link.serial}
              label={link.label}
              title={link.title}
              body={link.body}
              href={link.href}
              external={!link.internal}
            />
          ))}
        </div>
      </section>

      {/* SOURCE */}
      <section
        className="relative mx-auto mt-24 max-w-[1180px] px-5 md:px-12 lg:px-16"
      >
        <SectionHeader
          eyebrow="// section B: the source"
          title="The repos and the submission."
          hand="apache 2.0 — fork it."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {archiveLinks.source.map((link) => {
            const sticker = stickerForSerial[link.serial]
            const Icon = sticker?.icon ?? ArrowUpRight
            return (
              <a
                key={link.serial}
                href={link.href}
                target="_blank"
                rel="noopener"
                className="notebook-page notebook-page--margin relative block px-6 py-7 md:px-8 md:py-8 transition-transform duration-200 hover:-translate-y-1"
              >
                <Tape top={-10} left="50%" rotate={-6} length="short" />
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[0.66rem] font-bold uppercase tracking-[0.22em] text-[var(--ink-soft)]">
                      {link.label}
                    </p>
                    <p className="font-display mt-1 text-xl font-semibold leading-tight text-[var(--ink)]">
                      {link.title}
                    </p>
                    {link.body && (
                      <p className="mt-2 text-sm text-[var(--ink-soft)]">
                        {link.body}
                      </p>
                    )}
                  </div>
                  <span className="text-[var(--ink)] mt-1">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                </div>
              </a>
            )
          })}
        </div>
      </section>

      {/* PRESS */}
      <section
        className="relative mx-auto mt-24 max-w-[1180px] px-5 md:px-12 lg:px-16"
      >
        <SectionHeader
          eyebrow="// section C: press"
          title="What they wrote about us."
          hand="newspaper clippings, taped in."
        />
        <div className="relative grid gap-10 md:grid-cols-3">
          {archiveLinks.press.map((link, idx) => (
            <div key={link.href} className="relative">
              <Tape
                top={-8}
                left={idx % 2 === 0 ? 20 : 'auto'}
                right={idx % 2 === 1 ? 20 : 'auto'}
                rotate={idx % 2 === 0 ? -8 : 7}
                color={idx % 2 === 0 ? 'yellow' : 'blue'}
              />
              <NewsClipping
                source={link.label}
                date={link.date}
                headline={link.title}
                href={link.href}
                rotate={idx % 2 === 0 ? -1.4 : 1.4}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ORIGIN */}
      <section
        className="relative mx-auto mt-24 max-w-[1180px] px-5 md:px-12 lg:px-16"
      >
        <SectionHeader
          eyebrow="// section D: original sites"
          title="The domains."
          hand="they still resolve, sort of."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {archiveLinks.origin.map((link) => (
            <a
              key={link.serial}
              href={link.href}
              target="_blank"
              rel="noopener"
              className="relative block transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="notebook-page relative px-6 py-6 md:px-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[0.66rem] font-bold uppercase tracking-[0.22em] text-[var(--ink-soft)]">
                      {link.label}
                    </p>
                    <p className="font-display mt-1 text-2xl font-semibold leading-none">
                      {link.title}
                    </p>
                    <p className="mt-2 text-sm text-[var(--ink-soft)]">
                      {link.body}
                    </p>
                  </div>
                  <Stamp tone="ocean" size="sm" rotate={6}>
                    {link.serial}
                  </Stamp>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* footer note */}
      <section className="relative mx-auto mt-24 max-w-[900px] px-5 md:px-12 lg:px-16">
        <div className="flex flex-col items-center gap-6 text-center">
          <StickyNote color="yellow" rotate="flat" pin>
            this archive doesn&rsquo;t collect messages.
            <br />
            find the team on linkedin from the crew page.
          </StickyNote>
          <Stamp tone="red" rotate={-3} size="lg">
            archived
          </Stamp>
        </div>
      </section>
    </main>
  )
}
