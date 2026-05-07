'use client'

import React, {useState} from 'react'
import {Settings} from 'lucide-react'
import Button from './ui/Button'
import Modal from './ui/Modal'

export default function SettingsButton(props) {
  const [open, setOpen] = useState(false)

  const handleAction = (callback) => {
    callback?.()
    setOpen(false)
  }

  return (
    <>
      <Modal open={open} onOpenChange={setOpen} title="Settings">
        <div className="flex flex-col gap-3">
          <Button variant="ghost" onClick={() => handleAction(props.toggleDisplayTime)}>
            {props.displayTime ? 'Hide Time' : 'Show Time'}
          </Button>
          <Button variant="ghost" onClick={() => handleAction(props.handleDarkToggle)}>
            {props.darkMode ? 'Light Mode' : 'Dark Mode'}
          </Button>
          <Button variant="ghost" onClick={() => handleAction(props.handleFilterToggle)}>
            {props.filter ? 'Show All Buses' : 'Show Only Recent Buses'}
          </Button>
        </div>
      </Modal>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Settings"
        className="museum-focus absolute bottom-[30px] right-5 inline-flex h-[60px] w-[60px] items-center justify-center rounded-full"
        style={{color: props.darkMode ? 'white' : 'black'}}
      >
        <Settings size={52} aria-hidden="true" />
      </button>
    </>
  )
}
