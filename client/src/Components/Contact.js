import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Button, Stack} from '@mui/material';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router-dom';

export default function Contact() {
  const navigate = useNavigate();
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
      <Stack direction="column" spacing={1.3} padding="6vh">
        <Typography variant="h4" component="div">
          Contact Us
        </Typography>
        <Typography component="div">
          Slug Loop is helping students get to where they need to go. If you
          have any questions or concerns, please contact us.
        </Typography>

        <TextField required id="Name" label="Name" variant="outlined" />
        <TextField required id="Email" label="Email" variant="outlined" />
        <TextField required id="Message" label="Message" variant="outlined" />

        <Button
          variant="contained"
          onClick={() => {
            alert('clicked');
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
