import React, { useState } from "react";
import { Link } from "react-router-dom";
import useFetchData from "./FetchData";
import {
  TextField,
  CircularProgress,
  Typography,
  Container,
} from "@mui/material";

const AllCustomers = () => {
  const {
    data: customers,
    loading,
    error,
  } = useFetchData("https://vcf-backend.vercel.app/customers");

  const [filter, setFilter] = useState({ name: "", group: "" });

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const filteredCustomers = customers.filter((customer) => {
    return (
      (filter.group === "" || customer.group === parseInt(filter.group, 10)) &&
      (filter.name === "" ||
        customer.name.toLowerCase().includes(filter.name.toLowerCase()))
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
          Customer Details
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
            label="Search Customer By Name"
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
                  Customer Name
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
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer, index) => (
                  <tr
                    key={customer.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        to={`/customers/${customer.id}`}
                        className="text-blue-500 hover:underline"
                      >
                        {customer.id}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {customer.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {customer.phno}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {customer.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {customer.group}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center">
                    No Customer Record Found
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

export default AllCustomers;
