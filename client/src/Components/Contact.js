import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Stack, Snackbar, Alert } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export default function Contact() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const handleSubmit = () => {
    // Check if all fields are filled
    if (name === '' || email === '' || message === '') {
      setOpenError(true);
      return;
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
        setOpenSuccess(true);
        setEmail('');
        setName('');
        setMessage('');
      } else {
        setOpenError(true);
        alert('Message failed to send');
      }
    });
  };

  return (
    <Box
      display="flex"
      width="100vw"
      height="100vh"
      component="form"
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
      noValidate
      autoComplete="off"
    >
      <Snackbar
        open={openSuccess}
        autoHideDuration={5000}
        onClose={() => {
          setOpenSuccess(false);
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => {
            setOpenSuccess(false);
          }}
          severity="success"
          sx={{ width: '100%' }}
        >
          Message sent successfully
        </Alert>
      </Snackbar>

      <Snackbar
        open={openError}
        autoHideDuration={5000}
        onClose={() => {
          setOpenError(false);
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert

          onClose={() => {
            setOpenError(false);
          }}
          severity="warning"
          sx={{ width: '100%' }}
        >
          Please fill out all fields
        </Alert>
      </Snackbar>


      <Stack direction="column" spacing={1.3} padding="6vh">
        <Typography variant="h4" component="div">
          Contact Us
        </Typography>
        <Typography component="div">
          Slug Loop is helping students get to where they need to go. If you
          have any questions or concerns, please contact us.
        </Typography>

        <TextField
          required
          id="Name"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          required
          id="Email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          required
          id="Message"
          label="Message"
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <Button
          variant="contained"
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </Button>
      </Stack>
      <Button
        onClick={() => {
          navigate('/');
        }}
      >
        Back to Map
      </Button>
    </Box>
  );
}
