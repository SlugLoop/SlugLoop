import {createTheme} from '@mui/material/styles'

export const themeOptions = (isDarkMode) =>
  createTheme({
    palette: {
      type: isDarkMode ? 'dark' : 'light',
      primary: {
        main: isDarkMode ? '#003c71' : '#1f78b4',
      },
      secondary: {
        main: isDarkMode ? '#ffc72c' : '#ffcc00',
      },
      background: {
        default: isDarkMode ? '#121212' : '#ffffff',
        paper: isDarkMode ? '#1e272e' : '#f8f8f8',
      },
      text: {
        primary: isDarkMode ? '#ffffff' : '#000000',
        secondary: isDarkMode ? '#a0a0a0' : '#303030',
      },
    },
    typography: {
      fontFamily: "'Roboto', sans-serif",
    },
  })
