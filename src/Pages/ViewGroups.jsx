import React from "react";
import useFetchData from "./FetchData";
import { CircularProgress, Container, Typography } from "@mui/material";

const ViewGroups = () => {
  const {
    data: groups,
    loading,
    error,
  } = useFetchData("https://vcf-backend.vercel.app/group");

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
          Groups
        </Typography>
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
                  Group Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Group
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Months
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Month
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {groups.length > 0 ? (
                groups.map((group) => (
                  <tr key={group._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {group.groupname}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {group.group}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {group.months}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {group.startmonth}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center">
                    No Group Record Found
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

export default ViewGroups;
