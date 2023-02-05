import { createTheme } from '@mui/material/styles';

export const themeOptions = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#003c6c',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#d2c457',
        },
    },
});