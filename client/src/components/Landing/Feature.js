'use client'

import React, {useContext} from 'react'
import {Bus, Download, TrainFront} from 'lucide-react'
import AppContext from '../../appContext'

const features = [
  {
    icon: Bus,
    body:
      'With SlugLoop, effortlessly track Campus Shuttle (Loop) buses, including their real-time locations and routes. Plan your journey and never miss a bus again.',
  },
  {
    icon: TrainFront,
    body:
      "SlugLoop's service extends to Santa Cruz (Metro) buses. Stay informed and ready for your commute with live tracking of on-campus Metro buses, including lines 10, 15, 18, 19, and 20.",
  },
  {
    icon: Download,
    body:
      "Enjoy faster, full-screen access to SlugLoop by installing it as a Progressive Web App. Simply use your browser's 'Add to Home screen' option for improved convenience and seamless campus navigation.",
  },
]

export default function Features() {
  const {darkMode} = useContext(AppContext)

  return (
    <section className="relative flex h-screen w-screen flex-col items-center justify-start overflow-hidden">
      <div
        className="absolute inset-0 -z-[1] bg-[url('/background/buses.png')] bg-cover bg-center bg-no-repeat"
        style={{filter: darkMode ? 'brightness(0.5)' : 'brightness(1)'}}
      >
        {!darkMode && <div className="absolute inset-0 bg-white/40" />}
      </div>
      <h2 className="type-heading-4 pt-[20vh] text-center">Features:</h2>
      <div className="flex w-4/5 flex-col items-center gap-4 pt-[5vh]">
        {features.map(({icon: Icon, body}) => (
          <article
            key={body}
            className="flex w-full items-center gap-3 rounded-xl bg-white/80 p-4 text-[var(--color-text-primary)] dark:bg-transparent"
          >
            <Icon className="flex-shrink-0 text-[var(--color-secondary)]" size={32} aria-hidden="true" />
            <p>{body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
