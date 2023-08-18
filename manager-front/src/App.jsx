import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './router';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat, Arial, sans-serif',
  },
  overrides: {
    MuiButton: {
      root: {
        '&:focus': {
          outline: 'none',
          boxShadow: 'none',
        },
      },
    },
  },
});
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes />
      </Router>
    </ThemeProvider>
  );
}
