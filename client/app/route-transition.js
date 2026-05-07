'use client'

import {AnimatePresence, motion} from 'framer-motion'
import {usePathname} from 'next/navigation'

export default function RouteTransition({children}) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={pathname}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{duration: 0.28}}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
