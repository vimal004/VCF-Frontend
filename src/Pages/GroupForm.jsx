import React, { useState } from "react";
import axios from "axios";

const GroupForm = () => {
  const [formData, setFormData] = useState({
    group: "",
    groupname: "",
    months: "",
    startmonth: "",
  });

  const [created, setCreated] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleDelete = () => {
    axios
      .delete("https://vcf-backend.vercel.app/group", {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          group: formData.group,
        },
      })
      .then((res) => {
        //console.log(res);
        setDeleted(true);
        setTimeout(() => {
          setDeleted(false);
        }, 3000);
      })
      .catch((err) => {
        console.error("Error deleting group:", err);
      });
  };

  const handleUpdate = () => {
    axios
      .put(`https://vcf-backend.vercel.app/group`, formData)
      .then((res) => {
        //console.log(res);
        setUpdated(true);
        setTimeout(() => {
          setUpdated(false);
        }, 3000);
      })
      .catch((err) => {
        console.error("Error updating group:", err);
      });
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
    axios
      .post("https://vcf-backend.vercel.app/group", formData)
      .then((res) => {
        //console.log(res.data);
        setSuccess(true);
        setCreated(true);
        setTimeout(() => {
          setCreated(false);
          setSuccess(null);
        }, 3000);
      })
      .catch((err) => {
        console.error(err);
        setSuccess(false);
      });
    //console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="container mx-auto mt-10 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-gray-900 text-center">
          Group Form
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Group Number *
            </label>
            <input
              type="text"
              name="group"
              value={formData.group}
              onChange={handleChange}
              className="shadow-sm border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 transition duration-200"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Group Name
            </label>
            <input
              type="text"
              name="groupname"
              value={formData.groupname}
              onChange={handleChange}
              className="shadow-sm border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 transition duration-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Months
            </label>
            <input
              type="number"
              name="months"
              value={formData.months}
              onChange={handleChange}
              className="shadow-sm border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 transition duration-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Starting Month
            </label>
            <input
              type="text"
              name="startmonth"
              value={formData.startmonth}
              onChange={handleChange}
              className="shadow-sm border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 transition duration-200"
            />
          </div>
          <div className="mt-4 text-center m-5">
            {created && success && (
              <div className="text-green-500 font-semibold">Group Created</div>
            )}
            {success === false && (
              <div className="text-red-500 font-semibold">
                {errorMessage || "Customer Creation Failed"}
              </div>
            )}
            {deleted && (
              <div className="text-green-500 font-semibold">
                Group Record Deleted
              </div>
            )}
            {updated && (
              <div className="text-green-500 font-semibold">
                Group Record Updated
              </div>
            )}
          </div>
          <div className="flex space-x-4 mx-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:ring focus:ring-blue-500 transition duration-200 transform hover:scale-105"
            >
              Create
            </button>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleUpdate}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:ring focus:ring-yellow-500 transition duration-200 transform hover:scale-105"
              >
                Update
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:ring focus:ring-red-500 transition duration-200 transform hover:scale-105"
              >
                Delete
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GroupForm;
