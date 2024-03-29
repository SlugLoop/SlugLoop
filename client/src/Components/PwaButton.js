import React, {useEffect, useState} from 'react'
import {
  Button,
  Modal,
  Box,
  Typography,
  IconButton,
  useTheme,
} from '@mui/material'
import IosShareIcon from '@mui/icons-material/IosShare'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import CloseIcon from '@mui/icons-material/Close'

export default function InstallPWAButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const [open, setOpen] = useState(false)
  const [showIosPrompt, setShowIosPrompt] = useState(false)
  const theme = useTheme()

  useEffect(() => {
    const beforeInstallPromptHandler = (e) => {
      e.preventDefault()
      console.log('beforeinstallprompt fired')
      setDeferredPrompt(e)
      setIsInstallable(true)
    }

    // Only add the beforeinstallprompt event listener if the app is not already installed
    if (!window.matchMedia('(display-mode: standalone)').matches) {
      window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler)
    }

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        beforeInstallPromptHandler,
      )
    }
  }, [])

  const isIphoneSafari = () => {
    return (
      /iphone/.test(navigator.userAgent.toLowerCase()) &&
      !navigator.standalone &&
      /safari/.test(navigator.userAgent.toLowerCase())
    )
  }

  useEffect(() => {
    setShowIosPrompt(isIphoneSafari()) // update the state when isIphoneSafari changes
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

  return showIosPrompt ? (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        mb: 2,
        mx: 2,
        p: 2,
        borderRadius: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        bgcolor: theme.palette.background.default,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Typography variant="body1" color="text.primary">
          To install this app, tap on the icon{' '}
        </Typography>
        <IosShareIcon sx={{ml: 1, color: theme.palette.text.primary}} />
        <Typography variant="body1" color="text.primary">
          and then 'Add to Home Screen'
        </Typography>
        <AddBoxOutlinedIcon
          sx={{ml: 1, color: theme.palette.text.primary}}
          color="text.primary"
        />
      </div>

      <IconButton
        onClick={() => {
          setShowIosPrompt(false)
        }}
        color="inherit"
      >
        <CloseIcon />
      </IconButton>
    </Box>
  ) : isInstallable ? (
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
            width: {xs: '80%', sm: '60%', md: '40%'},
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
