import { CssBaseline, Container } from '@mui/material';
import Header from './components/Header';
import AppRoutes from './router/AppRoutes';

function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <Container maxWidth="sm" sx={{ py: 4 }}>
       <AppRoutes />
      </Container>
    </>
  );
}

export default App;