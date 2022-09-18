import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    common: { black: '#000', white: '#fff' },
    background: { paper: '#fff', default: '#333' },
    primary: {
      light: 'rgba(106, 189, 217, 1)',
      main: 'rgba(31, 151, 191, 1)',
      dark: 'rgba(4, 96, 126, 1)',
      contrastText: '#fff',
    },
    secondary: {
      light: 'rgba(255, 189, 119, 1)',
      main: 'rgba(255, 147, 33, 1)',
      dark: 'rgba(202, 104, 0, 1)',
      contrastText: '#fff',
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#fff',
    },
    text: {
      primary: 'rgba(51, 51, 51, 1)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
    fontFamily: [
      'Inter',
      'ui-sans-serif',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'Noto Sans',
      'sans-serif',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
      'Noto Color Emoji',
    ].join(','),
    h1: {
      fontSize: '4rem',
      fontWeight: 700,
      lineHeight: 1,
      color: '#fff',
    },
    h2: {
      letterSpacing: '-.025em',
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: 2.5,
      color: '#fff',
    },
    h3: {
      color: '#fff',
      fontWeight: 500,
      fontSize: '1.25rem',
      lineHeight: 1.75,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.75,
      color: '#d1d5db',
    },
    body2: {
      fontSize: '1rem',
      lineHeight: 1.75,
      color: '#9CA3AF',
    },
  },
});

export default theme;
