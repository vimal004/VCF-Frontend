import React from "react";
import useFetchData from "./FetchData";

const ViewGroups = () => {
  const {
    data: groups,
    loading,
    error,
  } = useFetchData("https://vcf-backend.vercel.app/group");

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-4">Groups</h1>
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
                <td className="px-6 py-4 whitespace-nowrap">{group.group}</td>
                <td className="px-6 py-4 whitespace-nowrap">{group.months}</td>
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
    </div>
  );
};

export default ViewGroups;
