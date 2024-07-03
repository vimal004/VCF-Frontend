import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";

const Defaulters = () => {
  const [defaulters, setDefaulters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({ name: "", group: "" });

  useEffect(() => {
    const fetchDefaulters = async () => {
      try {
        const defaultersResponse = await axios.get(
          "https://vcf-backend.vercel.app/group/defaulters"
        );
        const defaulterIds = defaultersResponse.data.map(
          (defaulter) => defaulter.id
        );

        const customersResponse = await axios.get(
          "https://vcf-backend.vercel.app/customers"
        );
        const defaulterCustomers = customersResponse.data.data.filter(
          (customer) => defaulterIds.includes(customer.id)
        );

        setDefaulters(defaulterCustomers);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchDefaulters();
  }, []);

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const filteredDefaulters = defaulters.filter((defaulter) => {
    return (
      (filter.group === "" || defaulter.group === parseInt(filter.group, 10)) &&
      (filter.name === "" ||
        defaulter.name.toLowerCase().includes(filter.name.toLowerCase()))
    );
  });

  return (
    <Container
      maxWidth="lg"
      style={{ marginTop: "50px", display: "flex", justifyContent: "center" }}
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
          Defaulter Details
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <TextField
            name="group"
            value={filter.group}
            onChange={handleFilterChange}
            label="Filter By Group"
            variant="outlined"
            fullWidth
            style={{ borderRadius: "8px", marginRight: "8px" }}
          />
          <TextField
            name="name"
            value={filter.name}
            onChange={handleFilterChange}
            label="Search Defaulter By Name"
            variant="outlined"
            fullWidth
            style={{ borderRadius: "8px" }}
          />
        </div>
        {loading ? (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <CircularProgress />
          </div>
        ) : error ? (
          <div style={{ textAlign: "center", marginTop: "20px", color: "red" }}>
            Error: {error}
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Defaulter Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Group Number
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDefaulters.length > 0 ? (
                filteredDefaulters.map((defaulter) => (
                  <tr key={defaulter.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        to={`/customers/${defaulter.id}`}
                        className="text-blue-500 hover:underline"
                      >
                        {defaulter.id}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {defaulter.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {defaulter.phno}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {defaulter.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {defaulter.group}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center">
                    No Defaulter Record Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </Container>
  );
};

export default Defaulters;
