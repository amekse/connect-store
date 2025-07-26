import './App.css';
import Home from './pages/Home';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={new QueryClient()}>
        <Home />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
