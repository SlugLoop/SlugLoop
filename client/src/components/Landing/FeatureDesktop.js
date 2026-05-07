'use client'

import React, {useContext} from 'react'
import {Bus, Download, TrainFront} from 'lucide-react'
import AppContext from '../../appContext'

const features = [
  {
    icon: Bus,
    title: 'Track campus shuttles in real time',
    body:
      'With SlugLoop, you get real-time locations of all loop buses, complete with route names. This feature lets you know not just when, but also where the loop buses are heading, eliminating the need to be physically present at the bus station.',
  },
  {
    icon: TrainFront,
    title: 'Live locations of Metro buses',
    body:
      'Beyond Campus Shuttles, SlugLoop extends its service by providing live location data for metro buses. Importantly, we track all the metro buses that come on campus, including lines 10, 15, 18, 19, and 20, keeping you well-informed and ready for all your on-campus commutes.',
  },
  {
    icon: Download,
    title: 'Progressive Web App',
    body:
      "You can install SlugLoop on your device for even quicker access. Just use your browser's 'Add to Home screen' option and enjoy our service as a Progressive Web App. This allows for a full-screen experience and faster load times, making campus navigation easier than ever.",
  },
]

export default function FeaturesDesktop() {
  const {darkMode} = useContext(AppContext)

  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 -z-[1] bg-[url('/background/featureDesktop.png')] bg-cover bg-center bg-no-repeat"
        style={{filter: darkMode ? 'brightness(0.5)' : 'brightness(1)'}}
      >
        {!darkMode && <div className="absolute inset-0 bg-white/40" />}
      </div>

      <div className="grid w-4/5 grid-cols-3 gap-8">
        {features.map(({icon: Icon, title, body}) => (
          <article
            key={title}
            className="flex min-h-[300px] flex-col items-center justify-start gap-3 rounded-xl bg-white/80 p-10 text-center text-[var(--color-text-primary)] dark:bg-transparent"
          >
            <Icon className="text-[var(--color-secondary)]" size={36} aria-hidden="true" />
            <h2 className="type-heading-5">{title}</h2>
            <p className="text-left text-lg">{body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
