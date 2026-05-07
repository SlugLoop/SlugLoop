'use client'

import AppContext from '../../appContext'
import {motion} from 'framer-motion'
import React, {useContext} from 'react'
import Button from '../ui/Button'

export default function Hero() {
  const {darkMode} = useContext(AppContext)

  return (
    <section className="relative h-screen w-screen overflow-hidden">
      <div
        className="absolute inset-0 -z-[1] bg-[url('/background/bus.png')] bg-cover bg-center bg-no-repeat"
        style={{filter: darkMode ? 'brightness(0.5)' : 'brightness(1)'}}
      >
        {!darkMode && <div className="absolute inset-0 bg-white/40" />}
      </div>

      <motion.div
        className="flex flex-col items-center justify-start gap-4 pt-[20vh] text-center"
        initial={{y: -50, opacity: 0}}
        animate={{y: 0, opacity: 1}}
        transition={{delay: 0, duration: 0.5}}
      >
        <h1 className="type-display-2">Slug Loop</h1>
        <p className="type-heading-5 pb-5">Bus Tracking. Simplified.</p>
        <Button variant="solid" href="/map">
          Map
        </Button>
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{delay: 0.5, duration: 0.5}}
          className="type-heading-5"
        >
          <p>Made By Students</p>
          <p>For Students</p>
        </motion.div>
      </motion.div>
    </section>
  )
}
