import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import GalleryPage from './pages/GalleryPage';
import DownloadsPage from './pages/DownloadsPage';
import ContactPage from './pages/ContactPage';
import PartnersPage from './pages/PartnersPage';
import FeaturesPage from './pages/FeaturesPage';
import StatsPage from './pages/StatsPage';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/products" replace />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="gallery" element={<GalleryPage />} />
                <Route path="downloads" element={<DownloadsPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="partners" element={<PartnersPage />} />
                <Route path="features" element={<FeaturesPage />} />
                <Route path="stats" element={<StatsPage />} />
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
