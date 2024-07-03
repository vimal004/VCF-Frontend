import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Defaulters = () => {
  const [defaulters, setDefaulters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    name: "",
    group: "",
  });

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

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-5">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h1 className="text-3xl font-bold text-center mb-4">
          Defaulter Details
        </h1>
        <div className="flex justify-between mb-4">
          <input
            type="number"
            name="group"
            value={filter.group}
            placeholder="Filter By Group"
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-md py-2 px-3 w-1/3"
          />
          <input
            type="text"
            name="name"
            value={filter.name}
            placeholder="Search Defaulter By Name"
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
      </div>
    </div>
  );
};

export default Defaulters;
