import React from 'react'
import {Box, Button, List, Stack} from '@mui/material'
import {Typography} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import {motion} from 'framer-motion'

const contributors = [
  'Bill Zhang (billzhangsc@gmail.com)',
  'Annie Liu (aliu98@ucsc.edu)',
  'Alex Liu (liu.alex01@gmail.com)',
  'Nick Szwed (nsszwed@gmail.com)',
]

const organizations = [
  'Professor Kerry Veenstra',
  'Santa Cruz Metro',
  'UCSC TAPS',
  'Past Contributors of BTS 2 and 3',
]

const About = () => {
  const navigate = useNavigate()

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

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariant}>
      <Box
        display="flex"
        width="100vw"
        height="100vh"
        sx={{
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexDirection: 'column',
        }}
      >
        <Stack
          maxWidth="500px"
          paddingLeft={'8vw'}
          paddingRight={'8vw'}
          paddingTop={'8vh'}
          alignItems="flex-start"
          spacing={2}
        >
          <motion.div variants={itemVariant}>
            <Typography variant="h3" component="div">
              About Us
            </Typography>
          </motion.div>

          <motion.div variants={itemVariant}>
            <Typography variant="h5" component="div" fontWeight={'bold'}>
              Project Goals:
            </Typography>
          </motion.div>
          <motion.div variants={itemVariant}>
            <Typography component="div">
              Slug Loop provides UCSC campus bus locations in real time.
            </Typography>
          </motion.div>
          <motion.div variants={itemVariant}>
            <Typography variant="h5" fontWeight={'bold'}>
              Contributors:
            </Typography>
          </motion.div>
          <List
            dense
            sx={{
              padding: 0,
            }}
          >
            {contributors.map((contributor, index) => (
              <motion.li key={index} variants={itemVariant}>
                {`• ${contributor}`}
              </motion.li>
            ))}
          </List>
          <motion.div variants={itemVariant}>
            <Typography variant="h5" align="left" fontWeight={'bold'}>
              Our project stands on the shoulders of giants.
            </Typography>
          </motion.div>
          <motion.div variants={itemVariant}>
            <Typography>
              Many thanks to the people and organizations who inspired us,
              including:
            </Typography>
          </motion.div>
          <List
            dense
            sx={{
              padding: 0,
            }}
          >
            {organizations.map((organization, index) => (
              <motion.li key={index} variants={itemVariant}>
                {`• ${organization}`}
              </motion.li>
            ))}
          </List>
        </Stack>
        <motion.div variants={itemVariant}>
          <Button
            onClick={() => {
              navigate('/')
            }}
            sx={{
              mt: '5vh',
            }}
          >
            Back to Map
          </Button>
        </motion.div>
      </Box>
    </motion.div>
  )
}

export default About
