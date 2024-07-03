import React, { useState } from "react";
import { Link } from "react-router-dom";
import useFetchData from "./FetchData";

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

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return (
      <div
        className="text-center mt-10 text-red-
500"
      >
        Error: {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-5">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h1 className="text-3xl font-bold text-center mb-4">
          Customer Details
        </h1>
        <div className="flex justify-between mb-4">
          <input
            name="group"
            value={filter.group}
            type="number"
            placeholder="Filter By Group"
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-md py-2 px-3 w-1/3"
          />
          <input
            name="name"
            type="text"
            value={filter.name}
            placeholder="Search Customer By Name"
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-md py-2 px-3 w-1/3"
          />
        </div>
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
      </div>
    </div>
  );
};

export default AllCustomers;
