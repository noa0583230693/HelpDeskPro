import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  useTheme,
  useMediaQuery
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard,
  ConfirmationNumber,
  Person,
  ExitToApp,
  Settings
} from "@mui/icons-material";
import "../../styles/theme.css";
import "../../styles/components.css";
import "../../styles/layout.css";

interface MenuItem {
  label: string;
  path: string;
}

interface MainLayoutProps {
  menuItems: MenuItem[];
  roleTitle?: string;
}

const getMenuIcon = (path: string) => {
  if (path.includes('dashboard')) return <Dashboard />;
  if (path.includes('ticket')) return <ConfirmationNumber />;
  if (path.includes('user')) return <Person />;
  if (path.includes('status') || path.includes('priorit')) return <Settings />;
  return <Dashboard />;
};

export const MainLayout: React.FC<MainLayoutProps> = ({ menuItems, roleTitle }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box className="sidebar">
      <Box className="sidebar-header">
        <Box className="sidebar-logo">
          <ConfirmationNumber />
        </Box>
        <Box>
          <Typography className="sidebar-title">מערכת ניהול</Typography>
          {roleTitle && (
            <Typography className="sidebar-subtitle">{roleTitle}</Typography>
          )}
        </Box>
      </Box>

      <Box className="sidebar-menu">
        <List>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  className={`menu-item ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    navigate(item.path);
                    if (isMobile) setMobileOpen(false);
                  }}
                >
                  <ListItemIcon className="menu-item-icon">
                    {getMenuIcon(item.path)}
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <Divider sx={{ my: 2 }} />

        <List>
          <ListItem disablePadding>
            <ListItemButton
              className="menu-item"
              onClick={() => {
                navigate('/logout');
                if (isMobile) setMobileOpen(false);
              }}
            >
              <ListItemIcon className="menu-item-icon">
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary="התנתק" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <Box className="app-layout">
      {isMobile && (
        <AppBar
          position="fixed"
          sx={{
            width: '100%',
            bgcolor: 'primary.main',
            zIndex: (theme) => theme.zIndex.drawer + 1
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {roleTitle || 'מערכת ניהול'}
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true
        }}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
            zIndex: (theme) => isMobile ? theme.zIndex.drawer : theme.zIndex.drawer - 1
          }
        }}
        anchor="left"
        SlideProps={{
          direction: "right"
        }}
      >
        {drawerContent}
      </Drawer>

      <Box
        component="main"
        className="main-content"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: { xs: '100%', lg: `calc(100% - 280px)` },
          ml: { xs: 0, lg: '280px' },
          mt: { xs: '64px', lg: 0 },
          transition: 'margin 0.3s ease, width 0.3s ease'
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};