import { createTheme } from '@mui/material';

const theme = {
  palette: {
    primary: {
      main: '#1E74FD',
      // dark: '#293145',
      bgdark: '#1a2236',
      textdark: '#ddd',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
    },
  },
};

export default createTheme(theme);
