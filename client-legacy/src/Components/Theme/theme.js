import {createTheme} from '@mui/material/styles'

const palettes = {
  dark: {
    primary: {
      main: '#45d3b4',
      light: '#9af6df',
      dark: '#1b806e',
      contrastText: '#06111d',
    },
    secondary: {
      main: '#f4cb54',
      light: '#ffe595',
      dark: '#a97f10',
      contrastText: '#221702',
    },
    background: {
      default: '#06111d',
      paper: '#111f2d',
    },
    text: {
      primary: '#f7f0df',
      secondary: '#b9c8c2',
    },
  },
  light: {
    primary: {
      main: '#087a70',
      light: '#2aa896',
      dark: '#045249',
      contrastText: '#fff8e8',
    },
    secondary: {
      main: '#a56f00',
      light: '#d29416',
      dark: '#714a00',
      contrastText: '#fff8e8',
    },
    background: {
      default: '#f7f0df',
      paper: '#fff8e8',
    },
    text: {
      primary: '#10202d',
      secondary: '#526272',
    },
  },
}

const museumTokens = {
  dark: {
    pageBackground:
      'radial-gradient(circle at top left, rgba(244,203,84,0.12), transparent 30%), radial-gradient(circle at 85% 12%, rgba(69,211,180,0.12), transparent 28%), linear-gradient(180deg, #06111d 0%, #091522 42%, #100f0c 100%)',
    pageBackgroundAlt:
      'radial-gradient(circle at 16% 12%, rgba(244,203,84,0.14), transparent 28%), linear-gradient(180deg, #06111d 0%, #0b1724 100%)',
    pageBackgroundTeal:
      'radial-gradient(circle at 80% 12%, rgba(69,211,180,0.14), transparent 30%), linear-gradient(180deg, #06111d 0%, #0b1724 100%)',
    gridLine: 'rgba(255,255,255,0.08)',
    cardBackground:
      'linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.025))',
    cardBorder: 'rgba(244,203,84,0.22)',
    tealBorder: 'rgba(69,211,180,0.22)',
    cardShadow: '0 30px 80px rgba(0, 0, 0, 0.24)',
    cardSheen: 'linear-gradient(90deg, transparent, rgba(244,203,84,0.1), transparent)',
    routeDiagramBackground:
      'radial-gradient(circle at 20% 20%, rgba(69, 211, 180, 0.2), transparent 28%), radial-gradient(circle at 78% 30%, rgba(244, 203, 84, 0.2), transparent 25%), linear-gradient(135deg, rgba(9, 28, 45, 0.95), rgba(2, 9, 16, 0.95))',
    routeDiagramBorder: 'rgba(255,255,255,0.1)',
    routeLine: 'rgba(244,203,84,0.65)',
    timelineLine: 'rgba(244,203,84,0.45)',
    softDivider: 'rgba(255,255,255,0.12)',
    dotGlow: '0 0 0 8px rgba(244,203,84,0.12)',
    mapPanelBackground:
      'linear-gradient(145deg, rgba(6,17,29,0.92), rgba(12,31,45,0.86))',
    mapPanelText: '#f7f0df',
    mapPanelSubtle: 'rgba(247,240,223,0.72)',
    mapAlertBackground: 'rgba(255,248,232,0.94)',
    mapAlertBorder: 'rgba(244,203,84,0.42)',
    appBarBackground:
      'linear-gradient(90deg, rgba(6,17,29,0.92), rgba(13,31,45,0.88))',
    drawerBackground: 'linear-gradient(180deg, #0b1724, #06111d)',
  },
  light: {
    pageBackground:
      'radial-gradient(circle at top left, rgba(165,111,0,0.13), transparent 28%), radial-gradient(circle at 86% 10%, rgba(8,122,112,0.11), transparent 30%), linear-gradient(180deg, #fff8e8 0%, #f7f0df 48%, #e8dcc3 100%)',
    pageBackgroundAlt:
      'radial-gradient(circle at 14% 14%, rgba(165,111,0,0.13), transparent 28%), linear-gradient(180deg, #fff8e8 0%, #f2e6cf 100%)',
    pageBackgroundTeal:
      'radial-gradient(circle at 80% 12%, rgba(8,122,112,0.13), transparent 30%), linear-gradient(180deg, #fff8e8 0%, #f2e6cf 100%)',
    gridLine: 'rgba(16,32,45,0.08)',
    cardBackground:
      'linear-gradient(145deg, rgba(255,255,255,0.82), rgba(255,248,232,0.56))',
    cardBorder: 'rgba(165,111,0,0.22)',
    tealBorder: 'rgba(8,122,112,0.24)',
    cardShadow: '0 24px 70px rgba(76, 58, 24, 0.13)',
    cardSheen: 'linear-gradient(90deg, transparent, rgba(165,111,0,0.11), transparent)',
    routeDiagramBackground:
      'radial-gradient(circle at 20% 20%, rgba(8,122,112,0.18), transparent 28%), radial-gradient(circle at 78% 30%, rgba(165,111,0,0.18), transparent 25%), linear-gradient(135deg, rgba(255,250,238,0.95), rgba(232,220,195,0.95))',
    routeDiagramBorder: 'rgba(16,32,45,0.12)',
    routeLine: 'rgba(165,111,0,0.7)',
    timelineLine: 'rgba(165,111,0,0.42)',
    softDivider: 'rgba(16,32,45,0.13)',
    dotGlow: '0 0 0 8px rgba(165,111,0,0.11)',
    mapPanelBackground:
      'linear-gradient(145deg, rgba(255,248,232,0.94), rgba(247,240,223,0.88))',
    mapPanelText: '#10202d',
    mapPanelSubtle: 'rgba(16,32,45,0.66)',
    mapAlertBackground: 'rgba(255,248,232,0.96)',
    mapAlertBorder: 'rgba(165,111,0,0.32)',
    appBarBackground:
      'linear-gradient(90deg, rgba(255,248,232,0.93), rgba(247,240,223,0.88))',
    drawerBackground: 'linear-gradient(180deg, #fff8e8, #f2e6cf)',
  },
}

export const themeOptions = (isDarkMode) => {
  const mode = isDarkMode ? 'dark' : 'light'
  const palette = palettes[mode]
  const museum = museumTokens[mode]

  return createTheme({
    museum,
    palette: {
      mode,
      primary: palette.primary,
      secondary: palette.secondary,
      warning: {
        main: '#ff8a5b',
      },
      error: {
        main: '#ff5f6d',
      },
      background: palette.background,
      text: palette.text,
    },
    typography: {
      fontFamily: "'IBM Plex Sans', 'Segoe UI', sans-serif",
      h1: {
        fontFamily: "'Bricolage Grotesque', 'IBM Plex Sans', sans-serif",
        fontWeight: 800,
        letterSpacing: '-0.06em',
        lineHeight: 0.92,
        fontSize: 'clamp(3.5rem, 11vw, 9.5rem)',
      },
      h2: {
        fontFamily: "'Bricolage Grotesque', 'IBM Plex Sans', sans-serif",
        fontWeight: 800,
        letterSpacing: '-0.045em',
        lineHeight: 0.98,
        fontSize: 'clamp(2.5rem, 6vw, 5.8rem)',
      },
      h3: {
        fontFamily: "'Bricolage Grotesque', 'IBM Plex Sans', sans-serif",
        fontWeight: 760,
        letterSpacing: '-0.035em',
      },
      h4: {
        fontFamily: "'Bricolage Grotesque', 'IBM Plex Sans', sans-serif",
        fontWeight: 730,
        letterSpacing: '-0.025em',
      },
      h5: {
        fontWeight: 600,
      },
      button: {
        fontWeight: 800,
        letterSpacing: '0.04em',
        textTransform: 'none',
      },
      overline: {
        fontWeight: 800,
      },
    },
    shape: {
      borderRadius: 18,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            minHeight: '100vh',
            background: palette.background.default,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            color: palette.text.primary,
            backgroundImage: museum.appBarBackground,
            borderBottom: `1px solid ${museum.cardBorder}`,
            boxShadow: 'none',
            backdropFilter: 'blur(20px)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            paddingInline: 22,
          },
          outlined: {
            borderColor: museum.cardBorder,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 999,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            color: palette.text.primary,
            backgroundImage: museum.drawerBackground,
            borderLeft: `1px solid ${museum.cardBorder}`,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            border: `1px solid ${museum.mapAlertBorder}`,
          },
        },
      },
    },
  })
}
