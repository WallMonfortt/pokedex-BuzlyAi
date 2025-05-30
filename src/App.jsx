import { CssBaseline, Container } from '@mui/material';
import Header from './components/Header';
import AppRoutes from './router/AppRoutes';

function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <Container maxWidth="xl" sx={{ mb: 6 }}>
       <AppRoutes />
      </Container>
    </>
  );
}

export default App;