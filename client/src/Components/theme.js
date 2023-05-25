import {createTheme} from '@mui/material/styles'

export const themeOptions = (isDarkMode) =>
  createTheme({
    palette: {
      type: isDarkMode ? 'dark' : 'light',
      primary: {
        main: isDarkMode ? '#003c6c' : '#2980b9',
      },
      secondary: {
        main: isDarkMode ? '#d2c457' : '#e74c3c',
      },
      background: {
        standard: isDarkMode ? '#212121' : '#fdf6e3',
        default: isDarkMode ? '#0c2d48' : '#89c4f4',
        paper: isDarkMode ? '#1e3c72' : '#a2d2ff',
      },
      text: {
        primary: isDarkMode ? '#ffffff' : '#000000',
      },
    },
  })
