import React, {useState} from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import {Button, Stack, Snackbar, Alert} from '@mui/material'
import Typography from '@mui/material/Typography'
import {useNavigate} from 'react-router-dom'
import {motion} from 'framer-motion'

export default function Contact() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [openSuccess, setOpenSuccess] = useState(false)
  const [openError, setOpenError] = useState(false)

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

          backgroundImage: 'url(/background/staircase.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',

          zIndex: -1,
          filter: 'brightness(0.5)',
        }}
      />
      <Box
        display="flex"
        width="100vw"
        height="100vh"
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

        <Stack
          maxWidth="500px"
          direction="column"
          spacing={1.3}
          padding="6vh"
          alignItems="center"
        >
          <motion.div variants={itemVariant}>
            <Typography variant="h3" component="div" color="white">
              Contact Us
            </Typography>
          </motion.div>
          <motion.div variants={itemVariant}>
            <Typography component="div" color="white">
              Slug Loop is helping students get to where they need to go. If you
              have any questions or concerns, please contact us.
            </Typography>
          </motion.div>
          <motion.div variants={itemVariant} style={{width: '100%'}}>
            <TextField
              required
              id="Name"
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
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
        </Stack>
        <motion.div variants={itemVariant}>
          <Button
            onClick={() => {
              navigate('/')
            }}
          >
            Back to Map
          </Button>
        </motion.div>
      </Box>
    </motion.div>
  )
}
