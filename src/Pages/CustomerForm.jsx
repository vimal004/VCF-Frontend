import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Snackbar,
  CircularProgress,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    phno: "",
    address: "",
    group: "",
  });

  const [created, setCreated] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [success, setSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);
    axios
      .delete(`https://vcf-backend.vercel.app/customer/${formData.id}`)
      .then(() => {
        axios
          .delete(`https://vcf-backend.vercel.app/group/transaction`, {
            data: { id: formData.id },
          })
          .then((res) => {
            console.log(res);
            setDeleted(true);
            setTimeout(() => {
              setDeleted(false);
            }, 3000);
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => setLoading(false));
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleUpdate = () => {
    setLoading(true);
    axios
      .put("https://vcf-backend.vercel.app/customer", formData)
      .then((res) => {
        console.log(res);
        setUpdated(true);
        setTimeout(() => {
          setUpdated(false);
        }, 3000);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.id) {
      setErrorMessage("ID is required");
      setSuccess(false);
      return;
    }

    setLoading(true);
    axios
      .post("https://vcf-backend.vercel.app/customer", formData)
      .then((res) => {
        console.log(res.data);
        setSuccess(true);
        setCreated(true);
        setTimeout(() => {
          setCreated(false);
          setSuccess(null);
          setErrorMessage("");
        }, 3000);
      })
      .catch((err) => {
        console.error(err);
        setSuccess(false);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Container
      maxWidth="md"
      style={{
        marginTop: "50px", // Adjust margin-top to lower the form
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
          padding: "24px",
          borderRadius: "8px",
          width: "100%",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Customer Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="ID"
                name="id"
                value={formData.id}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
                InputProps={{
                  style: { borderRadius: "8px" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                InputProps={{
                  style: { borderRadius: "8px" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone Number"
                name="phno"
                value={formData.phno}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                InputProps={{
                  style: { borderRadius: "8px" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                InputProps={{
                  style: { borderRadius: "8px" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Group"
                name="group"
                value={formData.group}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                InputProps={{
                  style: { borderRadius: "8px" },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disableElevation
                  disabled={!formData.id || loading}
                  style={{
                    borderRadius: "8px",
                    textTransform: "none",
                    marginTop: "16px",
                    marginRight: "8px",
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Create"
                  )}
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  disableElevation
                  disabled={!formData.id || loading}
                  onClick={handleUpdate}
                  style={{
                    borderRadius: "8px",
                    textTransform: "none",
                    marginTop: "16px",
                    marginLeft: "8px",
                  }}
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  disableElevation
                  disabled={!formData.id || loading}
                  onClick={handleDelete}
                  style={{
                    borderRadius: "8px",
                    textTransform: "none",
                    marginTop: "16px",
                    marginLeft: "8px",
                  }}
                >
                  Delete
                </Button>
              </div>
            </Grid>
          </Grid>
          <Snackbar
            open={created || deleted || updated}
            autoHideDuration={3000}
            onClose={() => {
              setCreated(false);
              setDeleted(false);
              setUpdated(false);
            }}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              severity="success"
              onClose={() => {
                setCreated(false);
                setDeleted(false);
                setUpdated(false);
              }}
            >
              {created && "Customer Created"}
              {deleted && "Customer Record Deleted"}
              {updated && "Customer Record Updated"}
            </MuiAlert>
          </Snackbar>
          {success === false && (
            <Snackbar open={true} autoHideDuration={3000}>
              <MuiAlert elevation={6} variant="filled" severity="error">
                {errorMessage || "Operation Failed"}
              </MuiAlert>
            </Snackbar>
          )}
        </form>
      </div>
    </Container>
  );
};

export default CustomerForm;
