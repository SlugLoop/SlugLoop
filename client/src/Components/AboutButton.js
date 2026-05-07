'use client'

import React, {useState} from 'react'
import {CircleHelp} from 'lucide-react'
import {useRouter} from 'next/navigation'
import Button from './ui/Button'
import Modal from './ui/Modal'

export default function AboutButton(props) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const navigate = (path) => {
    setOpen(false)
    router.push(path)
  }

  return (
    <>
      <Modal open={open} onOpenChange={setOpen} title="Information" className="bottom-8 left-5 top-auto translate-x-0 translate-y-0">
        <div className="flex flex-col gap-3">
          <Button variant="ghost" onClick={() => navigate('/contact')}>
            Contact Us
          </Button>
          <Button variant="ghost" onClick={() => navigate('/about')}>
            About Us
          </Button>
        </div>
      </Modal>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Information"
        className="museum-focus absolute bottom-[30px] left-5 inline-flex h-[60px] w-[60px] items-center justify-center rounded-full"
        style={{color: props.darkMode ? 'white' : 'black'}}
      >
        <CircleHelp size={52} aria-hidden="true" />
      </button>
    </>
  )
}
