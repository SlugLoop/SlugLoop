import React from 'react'
import {
  Avatar,
  Box,
  Button,
  Chip,
  Link,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import {
  externalLinks,
  proofPoints,
  teamMembers,
} from '../slugloopMuseumData'
import {
  museumDotSx,
  museumPageSx,
  museumStaticCardSx,
} from '../Theme/museumStyles'

export default function TeamPage() {
  const theme = useTheme()

  return (
    <Box
      component="main"
      sx={{
        ...museumPageSx(theme, 'pageBackgroundTeal'),
        minHeight: '100vh',
        px: {xs: 2.5, md: 6, lg: 10},
        py: {xs: 8, md: 12},
      }}
    >
      <Stack spacing={3} sx={{maxWidth: 960, mb: {xs: 6, md: 9}}}>
        <Chip
          label="Team and credits"
          color="secondary"
          sx={{width: 'fit-content', fontWeight: 800}}
        />
        <Typography variant="h1">The people behind the artifact.</Typography>
        <Typography variant="h5" color="text.secondary" sx={{lineHeight: 1.55}}>
          SlugLoop was a four-person student build that crossed product,
          frontend, backend, hardware, and campus coordination.
        </Typography>
      </Stack>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)'},
          gap: 2,
          mb: {xs: 6, md: 10},
        }}
      >
        {teamMembers.map((member) => (
          <Box
            key={member.name}
            sx={museumStaticCardSx(theme, {
              p: 3,
              minHeight: 280,
            })}
          >
            <Stack spacing={2} height="100%">
              <Avatar
                src={member.img}
                alt={member.name}
                sx={{
                  width: 88,
                  height: 88,
                  border: '2px solid',
                  borderColor: 'secondary.main',
                }}
              />
              <Box>
                <Typography variant="h5">{member.name}</Typography>
                <Typography color="text.secondary">{member.role}</Typography>
              </Box>
              <Box sx={{flexGrow: 1}} />
              <Link
                href={member.linkedin}
                target="_blank"
                rel="noopener"
                color="primary.light"
                underline="hover"
              >
                <LinkedInIcon sx={{fontSize: 18, mr: 0.5, verticalAlign: 'text-bottom'}} />
                LinkedIn
              </Link>
            </Stack>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {xs: '1fr', lg: '0.9fr 1.1fr'},
          gap: 4,
        }}
      >
        <Box
          sx={museumStaticCardSx(theme, {
            p: {xs: 3, md: 5},
          })}
        >
          <Typography variant="overline" color="secondary.main">
            Credits
          </Typography>
          <Typography variant="h3" sx={{mt: 1, mb: 2}}>
            Built with help from a real campus community.
          </Typography>
          <Typography color="text.secondary">
            The project benefited from professor guidance, campus staff access to
            existing infrastructure, local transit context, and the earlier teams
            who explored bus tracking at UCSC. This page phrases that carefully:
            SlugLoop was student-led and community-supported, not an official
            production transit service.
          </Typography>
        </Box>

        <Box
          sx={museumStaticCardSx(theme, {
            p: {xs: 3, md: 5},
            borderColor: theme.museum.tealBorder,
          })}
        >
          <Typography variant="overline" color="secondary.main">
            What this proves
          </Typography>
          <Stack spacing={2} sx={{mt: 2}}>
            {proofPoints.map((point) => (
              <Stack key={point} direction="row" spacing={2}>
                <Box
                  sx={{...museumDotSx(theme, 9), mt: 1}}
                />
                <Typography color="text.secondary">{point}</Typography>
              </Stack>
            ))}
          </Stack>
          <Stack direction={{xs: 'column', sm: 'row'}} spacing={2} sx={{mt: 4}}>
            <Button href={externalLinks.githubRepo} target="_blank" rel="noopener">
              GitHub <OpenInNewIcon sx={{fontSize: 16, ml: 0.75}} />
            </Button>
            <Button href="/map" variant="contained" color="secondary">
              Open map
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}
