import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from './hooks/AuthContext';
import Routes from './router';


import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const theme = createTheme();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}
