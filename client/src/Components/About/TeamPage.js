'use client'

import React from 'react'
import {
  externalLinks,
  proofPoints,
  teamMembers,
} from '../slugloopMuseumData'
import Avatar from '../ui/Avatar'
import Button from '../ui/Button'
import Chip from '../ui/Chip'
import {ExternalLink, Linkedin} from '../ui/icons'
import {linkText} from '../ui/museumClasses'

export default function TeamPage() {
  return (
    <main className="museum-page-teal min-h-screen px-5 py-16 md:px-12 md:py-24 lg:px-20">
      <div className="mb-12 max-w-[960px] space-y-5 md:mb-20">
        <Chip label="Team and credits" />
        <h1 className="type-display-1">The people behind the artifact.</h1>
        <p className="type-heading-5 text-muted">
          SlugLoop was a four-person student build that crossed product,
          frontend, backend, hardware, and campus coordination.
        </p>
      </div>

      <div className="mb-12 grid gap-4 sm:grid-cols-2 md:mb-20 lg:grid-cols-4">
        {teamMembers.map((member) => (
          <article key={member.name} className="museum-static-card flex min-h-[280px] flex-col gap-4 rounded-2xl p-6">
            <Avatar src={member.img} alt={member.name} />
            <div>
              <h2 className="type-heading-5 text-[var(--color-text-primary)]">{member.name}</h2>
              <p className="text-muted">{member.role}</p>
            </div>
            <div className="flex-1" />
            <a href={member.linkedin} target="_blank" rel="noopener" className={linkText}>
              <Linkedin size={18} className="mr-1 inline align-text-bottom" aria-hidden="true" />
              LinkedIn
            </a>
          </article>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="museum-static-card rounded-2xl p-6 md:p-10">
          <p className="type-overline">Credits</p>
          <h2 className="type-heading-3 mt-2 mb-4">
            Built with help from a real campus community.
          </h2>
          <p className="text-muted">
            The project benefited from professor guidance, campus staff access to
            existing infrastructure, local transit context, and the earlier teams
            who explored bus tracking at UCSC. This page phrases that carefully:
            SlugLoop was student-led and community-supported, not an official
            production transit service.
          </p>
        </section>

        <section className="museum-static-card rounded-2xl border-[var(--museum-teal-border)] p-6 md:p-10">
          <p className="type-overline">What this proves</p>
          <div className="mt-5 space-y-4">
            {proofPoints.map((point) => (
              <div key={point} className="flex items-start gap-4">
                <span className="museum-dot mt-2 h-[9px] w-[9px]" />
                <p className="text-muted">{point}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              href={externalLinks.githubRepo}
              target="_blank"
              rel="noopener"
              variant="ghost"
              endIcon={<ExternalLink size={16} />}
            >
              GitHub
            </Button>
            <Button href="/map" variant="solid">
              Open map
            </Button>
          </div>
        </section>
      </div>
    </main>
  )
}
