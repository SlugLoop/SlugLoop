'use client'

import {Bus, Menu} from 'lucide-react'
import {motion} from 'framer-motion'

const commonClasses = 'flex flex-col items-start gap-4 m-1 text-[var(--color-text-primary)]'

function MotionStep({children, stepKey}) {
  return (
    <motion.div
      className={commonClasses}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      key={stepKey}
    >
      {children}
    </motion.div>
  )
}

function IconLabel({icon: Icon, children}) {
  return (
    <div className="ml-1 flex items-center justify-center gap-4">
      <span className="museum-focus inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-paper)] text-[var(--color-primary)]">
        <Icon size={22} aria-hidden="true" />
      </span>
      <h2 className="text-xl font-bold">{children}</h2>
    </div>
  )
}

const Step1 = () => (
  <MotionStep stepKey="step1">
    <IconLabel icon={Bus}>Bus Routes</IconLabel>
    <p>
      This button opens the bus selection menu where you can select which
      route(s) to display
    </p>
  </MotionStep>
)

const Step2 = () => (
  <MotionStep stepKey="step2">
    <IconLabel icon={Menu}>Menu & Settings</IconLabel>
    <p>
      This button opens the menu where you can change the map settings as well
      as navigate to different pages in the app
    </p>
  </MotionStep>
)

const Step3 = () => (
  <MotionStep stepKey="step3">
    <h2 className="text-xl font-bold">Loop Buses</h2>
    <p>
      Loop: This is the standard loop bus that runs around campus in both
      difections. It runs from base to base and hits every stop, but only runs
      on weekdays.
    </p>
    <p>
      Upper Campus: This is the loop bus that runs around upper campus. It
      departs from the West and East remote parking lots and runs both
      directions. It only runs on weekdays.
    </p>
  </MotionStep>
)

const Step4 = () => (
  <MotionStep stepKey="step4">
    <h2 className="text-xl font-bold">Loop Buses Cont.</h2>
    <p>
      Loop Out of Service At Barn Theater: This runs the same route as the
      loop, but stops at the base of campus at the Barn Theater.
    </p>
    <p>Out of Service: This is a bus that is not in service.</p>
    <p>Special: This is the bus that goes down to the costal campus.</p>
  </MotionStep>
)

const Step5 = () => (
  <MotionStep stepKey="step5">
    <h2 className="text-xl font-bold">Metro Buses</h2>
    <p>Odd Buses such as the 3A, 3B and 19 run counter clockwise around campus.</p>
    <p>Even Buses such as the 18 and 20 run clockwise around campus.</p>
  </MotionStep>
)

const Step6 = () => (
  <MotionStep stepKey="step6">
    <h2 className="text-xl font-bold">Map Settings</h2>
    <p>
      This button opens the menu where you can change the map settings as well
      as navigate to different pages in the app.
    </p>
    <p>Hide/Show Time: This button toggles the time that the bus was last pinged.</p>
    <p>Dark Mode: This button toggles the map between light and dark mode.</p>
    <p>
      Show Past/Recent Buses: This button toggles whether or not to show buses
      that haven't updated in the last 30 minutes.
    </p>
  </MotionStep>
)

export {Step1, Step2, Step3, Step4, Step5, Step6}
