import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider as MuiThemeProvider, createTheme, responsiveFontSizes } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider, useThemeMode } from './contexts/ThemeContext';
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

// Define theme mode type
type ThemeMode = 'light' | 'dark';

// Define light and dark palette values
const getLightPalette = () => ({
  mode: 'light' as ThemeMode,
  primary: {
    main: '#2563eb', // Richer blue
    light: '#60a5fa',
    dark: '#1d4ed8',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#ec4899', // Richer pink
    light: '#f472b6',
    dark: '#db2777',
    contrastText: '#ffffff',
  },
  error: {
    main: '#ef4444',
    light: '#f87171',
    dark: '#dc2626',
  },
  warning: {
    main: '#f59e0b',
    light: '#fbbf24',
    dark: '#d97706',
  },
  info: {
    main: '#0ea5e9',
    light: '#38bdf8',
    dark: '#0284c7',
  },
  success: {
    main: '#10b981',
    light: '#34d399',
    dark: '#059669',
  },
  background: {
    default: '#f8fafc',
    paper: '#ffffff',
  },
  text: {
    primary: '#1e293b',
    secondary: '#64748b',
    disabled: '#94a3b8',
  },
});

const getDarkPalette = () => ({
  mode: 'dark' as ThemeMode,
  primary: {
    main: '#3b82f6', // Adjusted for dark mode
    light: '#60a5fa',
    dark: '#1d4ed8',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#ec4899', 
    light: '#f472b6',
    dark: '#db2777',
    contrastText: '#ffffff',
  },
  error: {
    main: '#f87171',
    light: '#fca5a5',
    dark: '#ef4444',
  },
  warning: {
    main: '#fbbf24',
    light: '#fcd34d',
    dark: '#f59e0b',
  },
  info: {
    main: '#38bdf8',
    light: '#7dd3fc',
    dark: '#0ea5e9',
  },
  success: {
    main: '#34d399',
    light: '#6ee7b7',
    dark: '#10b981',
  },
  background: {
    default: '#0f172a',
    paper: '#1e293b',
  },
  text: {
    primary: '#f1f5f9',
    secondary: '#cbd5e1',
    disabled: '#64748b',
  },
});

// Create theme config based on mode
const getTheme = (mode: ThemeMode) => {
  const palette = mode === 'light' ? getLightPalette() : getDarkPalette();
  
  return responsiveFontSizes(createTheme({
    palette,
    typography: {
      fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 700,
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
      button: {
        fontWeight: 500,
        textTransform: 'none',
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            boxShadow: 'none',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            },
          },
          contained: {
            boxShadow: mode === 'light' 
              ? '0 1px 3px rgba(0, 0, 0, 0.1)'
              : '0 1px 3px rgba(0, 0, 0, 0.3)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: mode === 'light'
              ? '0 4px 16px rgba(0, 0, 0, 0.08)'
              : '0 4px 16px rgba(0, 0, 0, 0.3)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              boxShadow: mode === 'light'
                ? '0 8px 26px rgba(0, 0, 0, 0.15)'
                : '0 8px 26px rgba(0, 0, 0, 0.4)',
              transform: 'translateY(-4px)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            transition: 'box-shadow 0.3s ease',
          },
          elevation1: {
            boxShadow: mode === 'light'
              ? '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)'
              : '0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.3)',
          },
        },
      },
    },
  }));
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// App with theme mode
function AppWithTheme() {
  const { mode } = useThemeMode();
  const theme = getTheme(mode as ThemeMode);

  return (
    <MuiThemeProvider theme={theme}>
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
    </MuiThemeProvider>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppWithTheme />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
