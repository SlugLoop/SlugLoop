import React from 'react'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
  Paper,
} from '@mui/material'

const team = [
  {
    name: 'Bill Zhang',
    email: 'jzhang71@usc.edu',
    major: 'CS',
    role: 'Product Manager/Full Stack',
    img: '/about/bill.jpg',
  },
  {
    name: 'Alex Liu',
    email: 'liu.alex01@gmail.com',
    major: 'CS',
    role: 'Frontend',
    img: '/about/alex.jfif',
  },
  {
    name: 'Nick Szwed',
    email: 'nsszwed@gmail.com',
    major: 'CS',
    role: 'Backend/Hardware',
    img: '/about/nick.jfif',
  },
  {
    name: 'Annie Liu',
    email: 'aliu98@ucsc.edu',
    major: 'CS',
    role: 'Frontend',
    img: '/about/annie.png',
  },
]

export default function About() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 80px)',
        p: 4,
        flexDirection: 'column',
      }}
    >
      <Box
        width="100vw"
        height="100vh"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,

          backgroundImage: 'url(/background/collab.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',

          zIndex: -1,
          filter: 'brightness(0.5)',
        }}
      />
      <Typography variant="h3" textAlign="center" mb={3} color="white">
        About Us
      </Typography>
      <Typography variant="h5" textAlign="center" mb={1} color="white">
        Project Goals:
      </Typography>
      <Typography variant="subtitle1" textAlign="center" mb={2} color="white">
        Slug Loop provides UCSC campus bus locations in real time.
      </Typography>
      <Typography
        variant="h5"
        fontWeight="bold"
        textAlign="center"
        mb={1}
        color="white"
      >
        Contributors:
      </Typography>
      <Grid container justifyContent="center" spacing={3} mt={2} mb={2}>
        {team.map((member, index) => (
          <Grid item key={index} xs={12} sm={6} md={3} lg={3}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: 'rgba(255, 255, 255, 0.7)',
              }}
            >
              <Avatar
                alt={member.name}
                src={member.img}
                sx={{width: 150, height: 150, mt: 2, mb: 2}}
              />
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  bgcolor: 'transparent',
                }}
              >
                <Typography variant="h6" color="primary">
                  {member.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {member.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {member.role}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Paper
        sx={{
          p: 2,
          mb: 2,
          bgcolor: 'rgba(255, 255, 255, 0.7)',
        }}
      >
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={1}>
          Our project stands on the shoulders of giants. Many thanks to:
        </Typography>
        <Typography variant="subtitle1" textAlign="center" mb={2}>
          • Professor Kerry Veenstra
        </Typography>
        <Typography variant="subtitle1" textAlign="center" mb={2}>
          • Santa Cruz Metro
        </Typography>
        <Typography variant="subtitle1" textAlign="center" mb={2}>
          • UCSC TAPS
        </Typography>
        <Typography variant="subtitle1" textAlign="center" mb={2}>
          • Past Contributors of BTS 2 and 3
        </Typography>
        <Typography variant="subtitle1" textAlign="center" mb={2}>
          • PinPoint Team
        </Typography>
      </Paper>
    </Box>
  )
}
