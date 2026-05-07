import React from 'react'
import {Box, Button, Chip, Stack, Typography, useTheme} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import {motion, useReducedMotion} from 'framer-motion'
import {milestones} from '../slugloopMuseumData'
import {
  museumDotSx,
  museumPageSx,
  museumStaticCardSx,
} from '../Theme/museumStyles'

const MotionBox = motion(Box)

export default function MyTimeline() {
  const reduceMotion = useReducedMotion()
  const theme = useTheme()

  return (
    <Box
      component="main"
      sx={{
        ...museumPageSx(theme, 'pageBackgroundAlt'),
        minHeight: '100vh',
        px: {xs: 2.5, md: 6, lg: 10},
        py: {xs: 8, md: 12},
      }}
    >
      <Stack spacing={3} sx={{maxWidth: 920, mb: {xs: 6, md: 9}}}>
        <Chip
          label="Archive route"
          color="secondary"
          sx={{width: 'fit-content', fontWeight: 800}}
        />
        <Typography variant="h1">The route from frustration to finalist.</Typography>
        <Typography variant="h5" color="text.secondary" sx={{lineHeight: 1.55}}>
          SlugLoop started as a campus pain point, became a hackathon build, and
          grew into a public, open-source project recognized by Google and local
          press.
        </Typography>
      </Stack>

      <Box
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            position: 'absolute',
            left: {xs: 18, md: '50%'},
            top: 0,
            bottom: 0,
            width: 3,
            bgcolor: theme.museum.timelineLine,
            transform: {md: 'translateX(-50%)'},
          },
        }}
      >
        {milestones.map((milestone, index) => (
          <MotionBox
            key={`${milestone.date}-${milestone.title}`}
            initial={reduceMotion ? false : {opacity: 0, y: 30}}
            whileInView={reduceMotion ? undefined : {opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.2}}
            transition={{duration: 0.55, delay: reduceMotion ? 0 : index * 0.03}}
            sx={{
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: {xs: '1fr', md: '1fr 1fr'},
              gap: {xs: 2, md: 6},
              mb: {xs: 4, md: 6},
              pl: {xs: 6, md: 0},
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: {xs: 10, md: '50%'},
                top: 18,
                width: 18,
                height: 18,
                borderRadius: '50%',
                ...museumDotSx(theme, 18),
                transform: {md: 'translateX(-50%)'},
                zIndex: 1,
              }}
            />
            <Box
              sx={{
                gridColumn: {
                  xs: '1',
                  md: index % 2 === 0 ? '1' : '2',
                },
                textAlign: {xs: 'left', md: index % 2 === 0 ? 'right' : 'left'},
              }}
            >
              <Box
                sx={museumStaticCardSx(theme, {
                  p: {xs: 3, md: 4},
                })}
              >
                <Typography variant="overline" color="secondary.main">
                  {milestone.date}
                </Typography>
                <Typography variant="h4" sx={{mt: 1, mb: 1.5}}>
                  {milestone.title}
                </Typography>
                <Typography color="text.secondary" sx={{mb: 2}}>
                  {milestone.description}
                </Typography>
                <Typography variant="caption" color="primary.light">
                  Source: {milestone.source}
                </Typography>
              </Box>
            </Box>
          </MotionBox>
        ))}
      </Box>

      <Stack
        direction={{xs: 'column', sm: 'row'}}
        spacing={2}
        sx={{pt: 4, justifyContent: 'center'}}
      >
        <Button href="/map" variant="contained" color="secondary">
          Launch map demo
        </Button>
        <Button href="/" color="inherit" endIcon={<ArrowForwardIcon />}>
          Return to exhibit
        </Button>
      </Stack>
    </Box>
  )
}
