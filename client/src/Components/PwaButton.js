import React, {useEffect, useState} from 'react'
import {Button, Modal, Box, Typography} from '@mui/material'

export default function InstallPWAButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const beforeInstallPromptHandler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
    }

    window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler)

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        beforeInstallPromptHandler,
      )
    }
  }, [])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const onClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const choiceResult = await deferredPrompt.userChoice

    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the A2HS prompt')
    } else {
      console.log('User dismissed the A2HS prompt')
    }
    setDeferredPrompt(null)
    setIsInstallable(false)
    handleClose()
  }

  return isInstallable ? (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{
          position: 'absolute',
          top: '20px',
          left: '10px',
          zIndex: 1000,
        }}
      >
        Install App
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          zIndex: 1000,
        }}
      >
        <Box
          sx={{
            width: {xs: '70%', sm: '50%', md: '40%'},
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Install Our PWA
          </Typography>
          <Typography id="modal-modal-description" sx={{mt: 2}}>
            By installing our Progressive Web App (PWA), you'll be able to use
            our app directly from your device's home screen, just like a native
            app. PWAs are fast, reliable, and work offline. It's the full app
            experience without needing to visit the website or download a large
            app from the app store!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={onClick}
            sx={{mt: 2}}
          >
            Install
          </Button>
        </Box>
      </Modal>
    </>
  ) : null
}
