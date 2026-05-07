import React from 'react'
import {Box, Button, Chip, Stack, Typography, useTheme} from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import {resourceLinks} from './slugloopMuseumData'
import {museumPageSx, museumStaticCardSx} from './Theme/museumStyles'

export default function Contact() {
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
      <Stack spacing={3} sx={{maxWidth: 860, mb: {xs: 6, md: 9}}}>
        <Chip
          label="Links and resources"
          color="secondary"
          sx={{width: 'fit-content', fontWeight: 800}}
        />
        <Typography variant="h1">Browse the SlugLoop archive.</Typography>
        <Typography variant="h5" color="text.secondary" sx={{lineHeight: 1.55}}>
          The old contact form depended on a maintained backend. This archive
          now points visitors toward the preserved demo, source code, press, and
          original project pages without collecting messages.
        </Typography>
      </Stack>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {xs: '1fr', md: 'repeat(2, 1fr)'},
          gap: 2,
        }}
      >
        {resourceLinks.map((link) => (
          <Box
            key={link.href}
            sx={museumStaticCardSx(theme, {
              p: {xs: 3, md: 4},
            })}
          >
            <Stack
              direction={{xs: 'column', sm: 'row'}}
              spacing={2}
              sx={{
                alignItems: {xs: 'flex-start', sm: 'center'},
                justifyContent: 'space-between',
              }}
            >
              <Box>
                <Typography variant="h5">{link.label}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {link.internal ? 'Internal SlugLoop route' : link.href}
                </Typography>
              </Box>
              <Button
                href={link.href}
                target={link.internal ? undefined : '_blank'}
                rel={link.internal ? undefined : 'noopener'}
                color={link.internal ? 'secondary' : 'inherit'}
                variant={link.internal ? 'contained' : 'outlined'}
                endIcon={link.internal ? undefined : <OpenInNewIcon />}
              >
                Open
              </Button>
            </Stack>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
