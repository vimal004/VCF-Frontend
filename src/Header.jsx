import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import {
  People as PeopleIcon,
  Group as GroupIcon,
  Visibility as VisibilityIcon,
  ReportProblem as ReportProblemIcon,
} from "@mui/icons-material";
import logo from "./img/logo.png";
import { styled } from "@mui/system";

const Header = () => {
  return (
    <StyledAppBar position="static" color="default" elevation={2}>
      <Toolbar>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Logo src={logo} alt="Logo" />
            <Typography
              variant="h6"
              color="inherit"
              sx={{ ml: 2, fontWeight: 600 }}
            >
              Customer Database Management
            </Typography>
          </Link>
          <Navigation>
            <AnimatedButton
              component={Link}
              to="/allcustomers"
              color="inherit"
              variant="text"
              sx={{ fontWeight: 500 }}
              startIcon={<PeopleIcon />}
            >
              View Customers
            </AnimatedButton>
            <AnimatedButton
              component={Link}
              to="/managecustomers"
              color="inherit"
              variant="text"
              sx={{ fontWeight: 500 }}
              startIcon={<PeopleIcon />}
            >
              Manage Customers
            </AnimatedButton>
            <AnimatedButton
              component={Link}
              to="/managegroups"
              color="inherit"
              variant="text"
              sx={{ fontWeight: 500 }}
              startIcon={<GroupIcon />}
            >
              Manage Groups
            </AnimatedButton>
            <AnimatedButton
              component={Link}
              to="/viewgroups"
              color="inherit"
              variant="text"
              sx={{ fontWeight: 500 }}
              startIcon={<GroupIcon />}
            >
              View Groups
            </AnimatedButton>
            <AnimatedButton
              component={Link}
              to="/defaulters"
              color="inherit"
              variant="text"
              sx={{ fontWeight: 500 }}
              startIcon={<ReportProblemIcon />}
            >
              View Defaulters
            </AnimatedButton>
          </Navigation>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

const StyledAppBar = styled(AppBar)({
  backgroundColor: "#ffffff",
  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
});

const Logo = styled("img")({
  height: "40px",
  borderRadius: "50%",
  marginRight: "12px",
});

const Navigation = styled("nav")({
  display: "flex",
  alignItems: "center",
});

const AnimatedButton = styled(Button)({
  transition: "background-color 0.3s, color 0.3s",
  borderRadius: "8px",
  margin: "0 8px",
  padding: "8px 16px",
  fontSize: "0.9rem",
  "&:hover": {
    backgroundColor: "#f0f0f0",
  },
});

export default Header;
