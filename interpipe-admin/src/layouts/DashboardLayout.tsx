import { useState } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  Paper,
  alpha,
  Fade,
  Tooltip,
  Zoom,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Category as CategoryIcon,
  PhotoLibrary as PhotoLibraryIcon,
  Download as DownloadIcon,
  ContactMail as ContactMailIcon,
  Business as BusinessIcon,
  Build as BuildIcon,
  TrendingUp as TrendingUpIcon,
  Logout as LogoutIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useThemeMode } from '../contexts/ThemeContext';
import logo from '../assets/logo.png'; // Import the logo

const drawerWidth = 240;

const menuItems = [
  { text: 'Products', icon: <CategoryIcon />, path: '/products' },
  { text: 'Gallery', icon: <PhotoLibraryIcon />, path: '/gallery' },
  { text: 'Downloads', icon: <DownloadIcon />, path: '/downloads' },
  { text: 'Contact', icon: <ContactMailIcon />, path: '/contact' },
  { text: 'Partners', icon: <BusinessIcon />, path: '/partners' },
  { text: 'Features', icon: <BuildIcon />, path: '/features' },
  { text: 'Stats', icon: <TrendingUpIcon />, path: '/stats' },
];

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { logout } = useAuth();
  const location = useLocation();
  const { mode, toggleMode } = useThemeMode();
  const isDarkMode = mode === 'dark';

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar 
        sx={{ 
          display: 'flex', 
          alignItems: 'center',
          background: `linear-gradient(to right, ${alpha(theme.palette.primary.main, 0.1)}, transparent)`,
          transition: 'all 0.3s ease',
          '&:hover': {
            background: `linear-gradient(to right, ${alpha(theme.palette.primary.main, 0.2)}, transparent)`,
          }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            }
          }}
        >
          <img src={logo} alt="Interpipe Logo" style={{ height: '40px', marginRight: '8px' }} />
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold' }}>
            Interpipe Admin
          </Typography>
        </Box>
      </Toolbar>
      <List>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton 
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) {
                    setMobileOpen(false);
                  }
                }}
                sx={{
                  transition: 'all 0.2s ease',
                  backgroundColor: isActive ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                  borderLeft: isActive ? `4px solid ${theme.palette.primary.main}` : '4px solid transparent',
                  '&:hover': {
                    backgroundColor: isActive 
                      ? alpha(theme.palette.primary.main, 0.2)
                      : alpha(theme.palette.primary.main, 0.05),
                    transform: 'translateX(4px)',
                  }
                }}
              >
                <ListItemIcon sx={{ 
                  color: isActive ? theme.palette.primary.main : 'inherit',
                  transition: 'all 0.2s ease'
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    fontWeight: isActive ? 'bold' : 'regular',
                    color: isActive ? theme.palette.primary.main : 'inherit'
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}

        {/* Logout Button */}
        <ListItem disablePadding>
          <ListItemButton 
            onClick={() => {
              logout();
              if (isMobile) {
                setMobileOpen(false);
              }
            }}
            sx={{
              marginTop: 1,
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: alpha(theme.palette.error.main, 0.1),
                color: theme.palette.error.main,
                '& .MuiListItemIcon-root': {
                  color: theme.palette.error.main,
                }
              }
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          borderBottom: `1px solid ${theme.palette.divider}`,
          backdropFilter: 'blur(20px)',
          background: alpha(theme.palette.background.default, 0.8),
          color: theme.palette.text.primary,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ 
                mr: 2, 
                display: { sm: 'none' },
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'rotate(180deg)'
                }
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography 
              variant="h6" 
              noWrap 
              component="div"
              sx={{
                fontWeight: 'bold',
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Dashboard
            </Typography>
          </Box>

          {/* Actions in toolbar */}
          <Box sx={{ display: 'flex' }}>
            <Tooltip 
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"} 
              TransitionComponent={Zoom} 
              arrow
            >
              <IconButton 
                onClick={toggleMode}
                sx={{ 
                  ml: 1,
                  transition: 'all 0.3s ease',
                  transform: isDarkMode ? 'rotate(180deg)' : 'rotate(0deg)',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  } 
                }}
              >
                {isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              borderRight: `1px solid ${theme.palette.divider}`,
              boxShadow: '0 0 20px rgba(0,0,0,0.05)'
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          transition: 'padding 0.3s ease',
        }}
      >
        <Toolbar />
        <Fade in={true} timeout={800}>
          <Paper
            elevation={0}
            sx={{ 
              p: 3, 
              borderRadius: 2,
              background: alpha(theme.palette.background.paper, 0.8),
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              minHeight: 'calc(100vh - 110px)',
            }}
          >
            <Outlet />
          </Paper>
        </Fade>
      </Box>
    </Box>
  );
} 