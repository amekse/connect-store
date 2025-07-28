import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
      disabled: '#CCCCCC',
    },
    divider: '#333333',
    primary: {
      main: '#D8B4F8',
      contrastText: '#000000',
    },
    secondary: {
      main: '#00BCD4',
      contrastText: '#000000',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: '#2E2E2E',
          borderRadius: '4px',
          padding: '4px 8px',
        }),
      },
    },
  }
});

export default theme;
