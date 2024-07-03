import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {
  AccountCircle,
  People,
  Group,
  Visibility,
  ReportProblem,
} from "@mui/icons-material";

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
        background: "#f0f0f0",
        padding: "24px",
      }}
    >
      <Grid container spacing={3} direction="column" alignItems="center">
        <Grid item xs={12}>
          <Link
            to="/allcustomers"
            style={{
              textDecoration: "none",
              display: "block",
              width: "100%",
              marginBottom: "16px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={buttonStyles}
              startIcon={<AccountCircle sx={iconStyles} />}
            >
              View Customers Details
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Link
            to="/managecustomers"
            style={{
              textDecoration: "none",
              display: "block",
              width: "100%",
              marginBottom: "16px",
            }}
          >
            <Button
              variant="contained"
              color="success"
              sx={buttonStyles}
              startIcon={<People sx={iconStyles} />}
            >
              Manage Customer Records
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Link
            to="/managegroups"
            style={{
              textDecoration: "none",
              display: "block",
              width: "100%",
              marginBottom: "16px",
            }}
          >
            <Button
              variant="contained"
              color="error"
              sx={buttonStyles}
              startIcon={<Group sx={iconStyles} />}
            >
              Manage Groups
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Link
            to="/viewgroups"
            style={{
              textDecoration: "none",
              display: "block",
              width: "100%",
              marginBottom: "16px",
            }}
          >
            <Button
              variant="contained"
              color="warning"
              sx={buttonStyles}
              startIcon={<Visibility sx={iconStyles} />}
            >
              View Groups
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Link
            to="/defaulters"
            style={{
              textDecoration: "none",
              display: "block",
              width: "100%",
              marginBottom: "16px",
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              sx={buttonStyles}
              startIcon={<ReportProblem sx={iconStyles} />}
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
