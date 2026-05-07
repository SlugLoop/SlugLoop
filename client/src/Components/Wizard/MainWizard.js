'use client'

import React, {useState} from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import {ChevronLeft, ChevronRight, X} from 'lucide-react'
import {Step1, Step2, Step3, Step4, Step5} from './Steps'
import Button from '../ui/Button'

const steps = [Step1, Step2, Step3, Step4, Step5]

const WizardFooter = ({closeWizard, currentStep, neverShowAgain, setCurrentStep}) => {
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === steps.length - 1

  return (
    <div className="mt-5 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={isFirstStep}
          onClick={() => setCurrentStep((step) => Math.max(0, step - 1))}
          className="museum-focus inline-flex h-10 w-10 items-center justify-center rounded-full disabled:opacity-45"
          aria-label="Previous step"
        >
          <ChevronLeft size={22} aria-hidden="true" />
        </button>
        {isLastStep ? (
          <button
            type="button"
            onClick={closeWizard}
            className="museum-focus inline-flex h-10 w-10 items-center justify-center rounded-full"
            aria-label="Close wizard"
          >
            <X size={22} aria-hidden="true" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setCurrentStep((step) => Math.min(steps.length - 1, step + 1))}
            className="museum-focus inline-flex h-10 w-10 items-center justify-center rounded-full"
            aria-label="Next step"
          >
            <ChevronRight size={22} aria-hidden="true" />
          </button>
        )}
      </div>
      <Button variant="ghost" onClick={neverShowAgain}>
        Never Show Again
      </Button>
    </div>
  )
}

const MainWizard = ({closeWizard, neverShowAgain}) => {
  const [currentStep, setCurrentStep] = useState(0)
  const Step = steps[currentStep]

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{delay: 0.5, duration: 0.2}}
      exit={{opacity: 0}}
      className="museum-static-card fixed left-1/2 top-1/2 z-[100] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-lg p-4 shadow-xl md:w-1/2"
    >
      <AnimatePresence initial={false} mode="wait">
        <Step key={currentStep} />
      </AnimatePresence>
      <WizardFooter
        closeWizard={closeWizard}
        currentStep={currentStep}
        neverShowAgain={neverShowAgain}
        setCurrentStep={setCurrentStep}
      />
    </motion.div>
  )
}

export default MainWizard
