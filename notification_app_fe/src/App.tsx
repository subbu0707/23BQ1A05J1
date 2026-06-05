import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import AllNotifications from "./pages/AllNotifications";
import PriorityInbox from "./pages/PriorityInbox";

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const NavLinks = () => (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      <Button
        component={Link}
        to="/"
        color="inherit"
        sx={{
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        📬 All Notifications
      </Button>
      <Button
        component={Link}
        to="/priority"
        color="inherit"
        sx={{
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        ⭐ Priority Inbox
      </Button>
    </Box>
  );

  const drawer = (
    <Box sx={{ width: 250 }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/"
            onClick={() => setMobileOpen(false)}
          >
            <ListItemText primary="📬 All Notifications" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/priority"
            onClick={() => setMobileOpen(false)}
          >
            <ListItemText primary="⭐ Priority Inbox" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Router>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, fontWeight: "bold" }}
            >
              Campus Notifications
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <NavLinks />
            </Box>
          </Toolbar>
        </AppBar>

        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{ display: { sm: "none" } }}
        >
          {drawer}
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<AllNotifications />} />
            <Route path="/priority" element={<PriorityInbox />} />
          </Routes>
        </Box>

        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: "auto",
            backgroundColor: "#f5f5f5",
            textAlign: "center",
            borderTop: "1px solid #ddd",
          }}
        >
          <Typography variant="body2" color="textSecondary">
            © 2026 Campus Notifications. Afford Medical Technologies.
          </Typography>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
