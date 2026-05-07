import React from 'react'
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Link,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import GitHubIcon from '@mui/icons-material/GitHub'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutlineOutlined'
import {motion, useReducedMotion} from 'framer-motion'
import {
  architectureFlow,
  exhibitSections,
  externalLinks,
  heroStats,
  milestones,
  pressLinks,
  proofPoints,
  teamMembers,
} from '../slugloopMuseumData'
import {
  museumCardSx,
  museumDividerSx,
  museumDotSx,
  museumGridOverlaySx,
  museumPageSx,
} from '../Theme/museumStyles'

const MotionBox = motion(Box)

const fadeUp = {
  hidden: {opacity: 0, y: 28},
  visible: {opacity: 1, y: 0},
}

function ExhibitLabel({children}) {
  return (
    <Typography
      variant="overline"
      sx={{
        color: 'secondary.main',
        letterSpacing: '0.24em',
        fontWeight: 800,
      }}
    >
      {children}
    </Typography>
  )
}

function SectionHeading({eyebrow, title, body, align = 'left'}) {
  return (
    <Stack spacing={2} sx={{maxWidth: 840, mx: align === 'center' ? 'auto' : 0}}>
      <ExhibitLabel>{eyebrow}</ExhibitLabel>
      <Typography variant="h2" sx={{textAlign: align}}>
        {title}
      </Typography>
      {body && (
        <Typography variant="body1" color="text.secondary" sx={{textAlign: align}}>
          {body}
        </Typography>
      )}
    </Stack>
  )
}

function ExhibitCard({children, sx}) {
  const theme = useTheme()

  return (
    <Box
      sx={museumCardSx(theme, sx)}
    >
      <Box sx={{position: 'relative', zIndex: 1}}>{children}</Box>
    </Box>
  )
}

function RouteDiagram() {
  const theme = useTheme()

  return (
    <ExhibitCard sx={{p: {xs: 3, md: 4}, minHeight: 420}}>
      <Stack spacing={3}>
        <Stack
          direction="row"
          sx={{justifyContent: 'space-between', alignItems: 'center'}}
        >
          <Typography variant="overline" color="secondary.main">
            Live artifact route
          </Typography>
          <Chip label="UCSC" color="secondary" size="small" />
        </Stack>
        <Box
          sx={{
            position: 'relative',
            minHeight: 280,
            borderRadius: 4,
            overflow: 'hidden',
            background: theme.museum.routeDiagramBackground,
            border: `1px solid ${theme.museum.routeDiagramBorder}`,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: 24,
              border: `2px solid ${theme.museum.routeLine}`,
              borderRadius: '44% 56% 48% 52%',
              transform: 'rotate(-12deg)',
            }}
          />
          {[
            ['Science Hill', '18%', '24%'],
            ['Quarry', '61%', '18%'],
            ['East Field', '76%', '66%'],
            ['Cowell', '26%', '72%'],
          ].map(([label, left, top]) => (
            <Box
              key={label}
              sx={{
                position: 'absolute',
                left,
                top,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  bgcolor: 'secondary.main',
                  boxShadow: theme.museum.dotGlow,
                  mb: 1,
                }}
              />
              <Typography variant="caption" color="text.primary">
                {label}
              </Typography>
            </Box>
          ))}
        </Box>
        <Typography variant="body2" color="text.secondary">
          The original map stays available as a working artifact, backed by the
          existing Google Maps and Firestore flow.
        </Typography>
      </Stack>
    </ExhibitCard>
  )
}

export default function MuseumHome() {
  const reduceMotion = useReducedMotion()
  const theme = useTheme()
  const animationProps = reduceMotion
    ? {}
    : {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: {once: true, amount: 0.18},
        variants: fadeUp,
        transition: {duration: 0.7, ease: 'easeOut'},
      }

  return (
    <Box
      sx={{
        ...museumPageSx(theme),
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      <Box sx={museumGridOverlaySx(theme)} />

      <Box component="main" sx={{position: 'relative', zIndex: 1}}>
        <Box
          component="section"
          sx={{
            px: {xs: 2.5, md: 6, lg: 10},
            pt: {xs: 10, md: 16},
            pb: {xs: 8, md: 12},
            minHeight: {md: 'calc(100vh - 72px)'},
            display: 'grid',
            gridTemplateColumns: {xs: '1fr', lg: '1.05fr 0.95fr'},
            gap: {xs: 5, lg: 8},
            alignItems: 'center',
          }}
        >
          <MotionBox {...animationProps}>
            <Stack spacing={4}>
              <Stack spacing={2}>
                <Chip
                  label="Museum mode: preserved demo and case study"
                  color="secondary"
                  sx={{width: 'fit-content', fontWeight: 800}}
                />
                <Typography
                  variant="h1"
                  sx={{
                    maxWidth: 940,
                    textWrap: 'balance',
                  }}
                >
                  SlugLoop, the student-built bus tracker that made UCSC move
                  differently.
                </Typography>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{maxWidth: 760, lineHeight: 1.55}}
                >
                  A real-time campus transit project built with hardware,
                  Firestore, Express, React, and Google Maps. Now preserved as a
                  gallery of what the team shipped, learned, and proved.
                </Typography>
              </Stack>
              <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
                <Button
                  href="/map"
                  variant="contained"
                  color="secondary"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                >
                  Open the map artifact
                </Button>
                <Button
                  href={externalLinks.githubRepo}
                  target="_blank"
                  rel="noopener"
                  variant="outlined"
                  color="inherit"
                  size="large"
                  startIcon={<GitHubIcon />}
                >
                  View source
                </Button>
                <Button
                  href={externalLinks.demoVideo}
                  target="_blank"
                  rel="noopener"
                  variant="text"
                  color="inherit"
                  size="large"
                  startIcon={<PlayCircleOutlineIcon />}
                >
                  Watch demo
                </Button>
              </Stack>
            </Stack>
          </MotionBox>
          <MotionBox {...animationProps} transition={{duration: 0.8, delay: 0.1}}>
            <RouteDiagram />
          </MotionBox>
        </Box>

        <Box
          component="section"
          sx={{
            px: {xs: 2.5, md: 6, lg: 10},
            pb: {xs: 8, md: 12},
            display: 'grid',
            gridTemplateColumns: {xs: '1fr 1fr', md: 'repeat(4, 1fr)'},
            gap: 2,
          }}
        >
          {heroStats.map((stat) => (
            <ExhibitCard key={stat.label} sx={{p: {xs: 2, md: 3}}}>
              <Typography variant="h3" color="secondary.main">
                {stat.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stat.label}
              </Typography>
            </ExhibitCard>
          ))}
        </Box>

        <MotionBox
          component="section"
          sx={{px: {xs: 2.5, md: 6, lg: 10}, py: {xs: 8, md: 12}}}
          {...animationProps}
        >
          <SectionHeading
            eyebrow="The exhibit"
            title="A full-stack transit system disguised as a student project."
            body="SlugLoop was impressive because it crossed boundaries: product design, embedded hardware, campus coordination, backend ingestion, real-time data, and a mobile-friendly map."
          />
          <Box
            sx={{
              mt: 5,
              display: 'grid',
              gridTemplateColumns: {xs: '1fr', md: 'repeat(2, 1fr)'},
              gap: 3,
            }}
          >
            {exhibitSections.map((section) => (
              <ExhibitCard key={section.title} sx={{p: {xs: 3, md: 4}}}>
                <Stack spacing={2}>
                  <Typography variant="overline" color="secondary.main">
                    {section.eyebrow}
                  </Typography>
                  <Typography variant="h4">{section.title}</Typography>
                  <Typography color="text.secondary">{section.body}</Typography>
                  <Divider sx={museumDividerSx(theme)} />
                  <Typography variant="caption" color="primary.light">
                    {section.accent}
                  </Typography>
                </Stack>
              </ExhibitCard>
            ))}
          </Box>
        </MotionBox>

        <MotionBox
          component="section"
          sx={{
            px: {xs: 2.5, md: 6, lg: 10},
            py: {xs: 8, md: 12},
            display: 'grid',
            gridTemplateColumns: {xs: '1fr', lg: '0.8fr 1.2fr'},
            gap: 5,
          }}
          {...animationProps}
        >
          <SectionHeading
            eyebrow="Architecture"
            title="From moving buses to moving pixels."
            body="The preserved map still reflects the original system shape: hardware emitted pings, a backend normalized them, Firestore stored the state, and the React client rendered the experience."
          />
          <Stack spacing={2}>
            {architectureFlow.map((item) => (
              <ExhibitCard key={item.step} sx={{p: 3}}>
                <Stack direction={{xs: 'column', sm: 'row'}} spacing={3}>
                  <Typography
                    variant="h3"
                    color="secondary.main"
                    sx={{minWidth: 72}}
                  >
                    {item.step}
                  </Typography>
                  <Box>
                    <Typography variant="h5">{item.title}</Typography>
                    <Typography color="text.secondary">{item.detail}</Typography>
                  </Box>
                </Stack>
              </ExhibitCard>
            ))}
          </Stack>
        </MotionBox>

        <MotionBox
          component="section"
          sx={{px: {xs: 2.5, md: 6, lg: 10}, py: {xs: 8, md: 12}}}
          {...animationProps}
        >
          <SectionHeading
            eyebrow="Recognition"
            title="The project earned public proof."
            body="The story was covered by campus and local outlets, and the project reached the global finalist stage of Google's 2023 Solution Challenge."
            align="center"
          />
          <Box
            sx={{
              mt: 5,
              display: 'grid',
              gridTemplateColumns: {xs: '1fr', md: 'repeat(4, 1fr)'},
              gap: 2,
            }}
          >
            {pressLinks.map((link) => (
              <ExhibitCard key={link.href} sx={{p: 3, minHeight: 190}}>
                <Stack spacing={2} height="100%">
                  <Typography variant="overline" color="secondary.main">
                    {link.label}
                  </Typography>
                  <Typography variant="h6">{link.title}</Typography>
                  <Box sx={{flexGrow: 1}} />
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener"
                    color="primary.light"
                    underline="hover"
                  >
                    Read source <OpenInNewIcon sx={{fontSize: 14, ml: 0.5}} />
                  </Link>
                </Stack>
              </ExhibitCard>
            ))}
          </Box>
        </MotionBox>

        <MotionBox
          component="section"
          sx={{
            px: {xs: 2.5, md: 6, lg: 10},
            py: {xs: 8, md: 12},
            display: 'grid',
            gridTemplateColumns: {xs: '1fr', lg: '0.95fr 1.05fr'},
            gap: 5,
          }}
          {...animationProps}
        >
          <SectionHeading
            eyebrow="Route log"
            title="A compressed timeline of the build."
            body="The full archive expands these moments into the story of how a hackathon project became an internationally recognized campus tool."
          />
          <Stack spacing={2}>
            {milestones.slice(0, 5).map((milestone) => (
              <Box
                key={`${milestone.date}-${milestone.title}`}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '110px 1fr',
                  gap: 2,
                  pb: 2,
                  borderBottom: `1px solid ${theme.museum.softDivider}`,
                }}
              >
                <Typography variant="caption" color="secondary.main">
                  {milestone.date}
                </Typography>
                <Box>
                  <Typography variant="h6">{milestone.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {milestone.description}
                  </Typography>
                </Box>
              </Box>
            ))}
            <Button href="/timeline" color="secondary" endIcon={<ArrowForwardIcon />}>
              Visit the archive
            </Button>
          </Stack>
        </MotionBox>

        <MotionBox
          component="section"
          sx={{px: {xs: 2.5, md: 6, lg: 10}, py: {xs: 8, md: 12}}}
          {...animationProps}
        >
          <SectionHeading
            eyebrow="Team"
            title="Four students, one practical system."
            body="The project worked because the team covered product direction, frontend experience, backend services, hardware, data, and stakeholder coordination."
            align="center"
          />
          <Box
            sx={{
              mt: 5,
              display: 'grid',
              gridTemplateColumns: {xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)'},
              gap: 2,
            }}
          >
            {teamMembers.map((member) => (
              <ExhibitCard key={member.name} sx={{p: 3}}>
                <Stack spacing={2} sx={{alignItems: 'flex-start'}}>
                  <Avatar
                    src={member.img}
                    alt={member.name}
                    sx={{
                      width: 76,
                      height: 76,
                      border: '2px solid',
                      borderColor: 'secondary.main',
                    }}
                  />
                  <Box>
                    <Typography variant="h6">{member.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.role}
                    </Typography>
                  </Box>
                  <Link
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener"
                    color="primary.light"
                    underline="hover"
                  >
                    LinkedIn
                  </Link>
                </Stack>
              </ExhibitCard>
            ))}
          </Box>
        </MotionBox>

        <MotionBox
          component="section"
          sx={{
            px: {xs: 2.5, md: 6, lg: 10},
            py: {xs: 8, md: 12},
          }}
          {...animationProps}
        >
          <ExhibitCard sx={{p: {xs: 3, md: 5}}}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {xs: '1fr', lg: '0.9fr 1.1fr'},
                gap: 5,
              }}
            >
              <SectionHeading
                eyebrow="Retrospective"
                title="What SlugLoop proves."
                body="This archive is intentionally honest: SlugLoop is no longer positioned as an actively maintained commuter utility. It remains a record of shipped work, public impact, and technical range."
              />
              <Stack spacing={2}>
                {proofPoints.map((point) => (
                  <Stack
                    key={point}
                    direction="row"
                    spacing={2}
                    sx={{alignItems: 'flex-start'}}
                  >
                    <Box
                      sx={{...museumDotSx(theme), mt: 1}}
                    />
                    <Typography color="text.secondary">{point}</Typography>
                  </Stack>
                ))}
                <Stack direction={{xs: 'column', sm: 'row'}} spacing={2} pt={2}>
                  <Button href="/map" variant="contained" color="secondary">
                    Launch map demo
                  </Button>
                  <Button href="/contact" color="inherit">
                    Browse all links
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </ExhibitCard>
        </MotionBox>
      </Box>
    </Box>
  )
}
