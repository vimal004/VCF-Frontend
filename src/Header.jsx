import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Person as PersonIcon,
  PeopleAlt as PeopleAltIcon,
  Group as GroupIcon,
  ReportProblem as ReportProblemIcon,
} from "@mui/icons-material";
import logo from "./img/logo.png";
import { styled } from "@mui/system";

const Header = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <StyledAppBar position="static" color="default" elevation={2}>
      <Toolbar>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          flexDirection={isSm ? "row" : "column"}
        >
          <HeaderLogoAndTitle isSm={isSm}>
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
          </HeaderLogoAndTitle>
          <Navigation isSm={isSm}>
            <AnimatedButton
              component={Link}
              to="/allcustomers"
              color="inherit"
              variant="text"
              sx={{ fontWeight: 500 }}
              startIcon={<PeopleAltIcon />}
            >
              View Customers
            </AnimatedButton>
            <AnimatedButton
              component={Link}
              to="/managecustomers"
              color="inherit"
              variant="text"
              sx={{ fontWeight: 500 }}
              startIcon={<PersonIcon />}
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
  borderRadius: "12px",
});

const HeaderLogoAndTitle = styled(Box)(({ theme, isSm }) => ({
  backgroundColor: isSm ? "transparent" : "#f5f5f5",
  padding: isSm ? "0" : "8px 16px",
  borderRadius: isSm ? "0" : "8px",
  marginBottom: isSm ? "0" : "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: isSm ? "flex-start" : "center",
}));

const Logo = styled("img")({
  height: "40px",
  marginRight: "12px",
  borderRadius: "0", // Ensure square edges
});


const Navigation = styled("nav")(({ theme, isSm }) => ({
  display: isSm ? "flex" : "block",
  alignItems: "center",
  width: isSm ? "auto" : "100%",
  textAlign: isSm ? "initial" : "center",
}));

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
