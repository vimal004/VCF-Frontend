import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {
  AccountCircle as AccountCircleIcon,
  People as PeopleIcon,
  Group as GroupIcon,
  Visibility as VisibilityIcon,
  ReportProblem as ReportProblemIcon,
} from "@mui/icons-material";

import BGIMG from "./img/193294.jpg"; // Adjust path as per your project structure

const Home = () => {
  const buttonStyles = {
    width: "100%",
    maxWidth: "300px",
    borderRadius: "8px",
    textTransform: "none",
    padding: "16px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
    },
  };

  const iconStyles = {
    marginRight: "8px",
    fontSize: "1.5rem",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${BGIMG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "24px",
      }}
    >
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Link
            to="/allcustomers"
            style={{
              textDecoration: "none",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={buttonStyles}
              startIcon={<AccountCircleIcon sx={iconStyles} />}
            >
              View Customers Details
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Link
            to="/managecustomers"
            style={{
              textDecoration: "none",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              color="success"
              sx={buttonStyles}
              startIcon={<PeopleIcon sx={iconStyles} />}
            >
              Manage Customer Records
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Link
            to="/managegroups"
            style={{
              textDecoration: "none",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              color="error"
              sx={buttonStyles}
              startIcon={<GroupIcon sx={iconStyles} />}
            >
              Manage Groups
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Link
            to="/viewgroups"
            style={{
              textDecoration: "none",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              color="warning"
              sx={buttonStyles}
              startIcon={<VisibilityIcon sx={iconStyles} />}
            >
              View Groups
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Link
            to="/defaulters"
            style={{
              textDecoration: "none",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              sx={buttonStyles}
              startIcon={<ReportProblemIcon sx={iconStyles} />}
            >
              View Defaulters By Group
            </Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
