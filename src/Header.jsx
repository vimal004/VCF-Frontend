import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import {
  People as PeopleIcon,
  Group as GroupIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import logo from "./img/logo.png";

const Header = () => {
  return (
    <AppBar position="static" color="default" elevation={2}>
      <Toolbar>
        <Box display="flex" alignItems="center" flexGrow={1}>
          <Link to="/">
            <img src={logo} alt="Logo" style={{ height: "48px" }} />
          </Link>
          <Typography
            variant="h6"
            color="inherit"
            style={{ marginLeft: "16px" }}
          >
            Customer Database Management
          </Typography>
        </Box>
        <nav>
          <Button
            component={Link}
            to="/allcustomers"
            color="inherit"
            startIcon={<PeopleIcon />}
          >
            View Customers
          </Button>
          <Button
            component={Link}
            to="/managecustomers"
            color="inherit"
            startIcon={<PeopleIcon />}
          >
            Manage Customers
          </Button>
          <Button
            component={Link}
            to="/managegroups"
            color="inherit"
            startIcon={<GroupIcon />}
          >
            Manage Groups
          </Button>
          <Button
            component={Link}
            to="/viewgroups"
            color="inherit"
            startIcon={<GroupIcon />}
          >
            View Groups
          </Button>
          <Button
            component={Link}
            to="/defaulters"
            color="inherit"
            startIcon={<WarningIcon />}
          >
            View Defaulters
          </Button>
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
