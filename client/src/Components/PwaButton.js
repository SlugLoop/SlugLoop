'use client'

import React, {useEffect, useState} from 'react'
import {Share, SquarePlus, X} from 'lucide-react'
import Button from './ui/Button'
import Modal from './ui/Modal'

export default function InstallPWAButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const [open, setOpen] = useState(false)
  const [showIosPrompt, setShowIosPrompt] = useState(false)

  useEffect(() => {
    const beforeInstallPromptHandler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
    }

    if (!window.matchMedia('(display-mode: standalone)').matches) {
      window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstallPromptHandler)
    }
  }, [])

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase()
    setShowIosPrompt(
      /iphone/.test(userAgent) &&
        !navigator.standalone &&
        /safari/.test(userAgent),
    )
  }, [])

  const onClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    await deferredPrompt.userChoice
    setDeferredPrompt(null)
    setIsInstallable(false)
    setOpen(false)
  }

  if (showIosPrompt) {
    return (
      <div className="museum-static-card fixed inset-x-4 bottom-4 z-[1000] flex items-center justify-between gap-4 rounded-2xl p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span>To install this app, tap on the icon</span>
          <Share size={18} aria-hidden="true" />
          <span>and then 'Add to Home Screen'</span>
          <SquarePlus size={18} aria-hidden="true" />
        </div>
        <button
          type="button"
          onClick={() => setShowIosPrompt(false)}
          aria-label="Dismiss install prompt"
          className="museum-focus inline-flex h-10 w-10 items-center justify-center rounded-full"
        >
          <X size={20} aria-hidden="true" />
        </button>
      </div>
    )
  }

  if (!isInstallable) return null

  return (
    <>
      <Button
        variant="solid"
        onClick={() => setOpen(true)}
        className="absolute left-2.5 top-5 z-[1000]"
      >
        Install App
      </Button>
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Install Our PWA"
        description="Add SlugLoop to your home screen for faster full-screen access."
      >
        <div className="space-y-5">
          <p className="text-muted">
            By installing our Progressive Web App (PWA), you'll be able to use
            our app directly from your device's home screen, just like a native
            app. PWAs are fast, reliable, and work offline.
          </p>
          <Button variant="solid" onClick={onClick}>
            Install
          </Button>
        </div>
      </Modal>
    </>
  )
}
