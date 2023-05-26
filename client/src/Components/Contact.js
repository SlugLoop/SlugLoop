import React, {useState, useContext} from 'react'

import {
  Button,
  Stack,
  Snackbar,
  Alert,
  useTheme,
  Box,
  Typography,
  TextField,
} from '@mui/material'

import {useNavigate} from 'react-router-dom'
import {motion} from 'framer-motion'
import AppContext from '../appContext'
import {useViewportWidth} from '../App'

export default function Contact() {
  const viewportWidth = useViewportWidth()
  const {darkMode} = useContext(AppContext)
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [openSuccess, setOpenSuccess] = useState(false)
  const [openError, setOpenError] = useState(false)

  const theme = useTheme()
  const containerVariant = {
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0,
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariant = {
    hidden: {opacity: 0, y: -20},
    visible: {opacity: 1, y: 0},
  }

  const handleSubmit = () => {
    // Check if all fields are filled
    if (name === '' || email === '' || message === '') {
      setOpenError(true)
      return
    }

    // Send a post request to the backend
    fetch('https://slugloop.azurewebsites.net/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        message: message,
      }),
    }).then((response) => {
      if (response.status === 200) {
        setOpenSuccess(true)
        setEmail('')
        setName('')
        setMessage('')
      } else {
        setOpenError(true)
        alert('Message failed to send')
      }
    })
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariant}>
      <Box
        width="100vw"
        height="100vh"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,

          backgroundImage:
            viewportWidth < 600
              ? 'url(/background/staircase.png)'
              : 'url(/background/contact.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',

          zIndex: -1,
          filter: darkMode ? 'brightness(0.5)' : 'brightness(1)',
          '::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: darkMode ? 'none' : 'rgba(255, 255, 255, 0.4)',
          },
        }}
      />
      <Box
        display="flex"
        component="form"
        sx={{
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexDirection: 'column',
          overflow: 'auto',
        }}
        noValidate
        autoComplete="off"
      >
        <Snackbar
          open={openSuccess}
          autoHideDuration={5000}
          onClose={() => {
            setOpenSuccess(false)
          }}
          anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        >
          <Alert
            onClose={() => {
              setOpenSuccess(false)
            }}
            severity="success"
            sx={{width: '100%'}}
          >
            Message sent successfully
          </Alert>
        </Snackbar>

        <Snackbar
          open={openError}
          autoHideDuration={5000}
          onClose={() => {
            setOpenError(false)
          }}
          anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        >
          <Alert
            onClose={() => {
              setOpenError(false)
            }}
            severity="warning"
            sx={{width: '100%'}}
          >
            Please fill out all fields
          </Alert>
        </Snackbar>

        <motion.div
          variants={itemVariant}
          style={{
            maxWidth: '80%',
            marginTop: '5vh',
            marginBottom: '2vh',
          }}
        >
          <Typography
            variant="h3"
            component="div"
            color="text.primary"
            align="center"
          >
            Contact Us
          </Typography>
        </motion.div>
        <motion.div
          variants={itemVariant}
          style={{
            maxWidth: '80%',
            marginBottom: '2vh',
          }}
        >
          <Typography component="div" color="text.primary" align="center">
            Slug Loop is helping students get to where they need to go. If you
            have any questions or concerns, please contact us.
          </Typography>
        </motion.div>
        <Stack
          width={viewportWidth < 600 ? '70%' : '50%'}
          direction="column"
          spacing={1.3}
          alignItems="center"
          bgcolor={darkMode ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.9)'}
          borderRadius={2}
          paddingX={2}
          paddingY={4}
        >
          <motion.div variants={itemVariant} style={{width: '100%'}}>
            <TextField
              required
              id="Name"
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: theme.palette.primary.main,
                  },

                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.main,
                  },

                  '&.Mui-focused fieldset': {
                    borderColor: theme.palette.secondary.main,
                  },
                },
                '& .MuiFormLabel-root.Mui-focused': {
                  color: theme.palette.secondary.main,
                },
              }}
            />
          </motion.div>
          <motion.div variants={itemVariant} style={{width: '100%'}}>
            <TextField
              required
              id="Email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: theme.palette.primary.main,
                  },

                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.main,
                  },

                  '&.Mui-focused fieldset': {
                    borderColor: theme.palette.secondary.main,
                  },
                },
                '& .MuiFormLabel-root.Mui-focused': {
                  color: theme.palette.secondary.main,
                },
              }}
            />
          </motion.div>
          <motion.div variants={itemVariant} style={{width: '100%'}}>
            <TextField
              required
              id="Message"
              label="Message"
              variant="outlined"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              multiline
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: theme.palette.primary.main,
                  },

                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.main,
                  },

                  '&.Mui-focused fieldset': {
                    borderColor: theme.palette.secondary.main,
                  },
                },
                '& .MuiFormLabel-root.Mui-focused': {
                  color: theme.palette.secondary.main,
                },
              }}
            />
          </motion.div>

          <motion.div variants={itemVariant}>
            <Button
              variant="contained"
              onClick={() => {
                handleSubmit()
              }}
            >
              Submit
            </Button>
          </motion.div>
          <motion.div variants={itemVariant}>
            <Button
              onClick={() => {
                navigate('/')
              }}
              color="primary"
            >
              Back
            </Button>
          </motion.div>
        </Stack>
      </Box>
    </motion.div>
  )
}
