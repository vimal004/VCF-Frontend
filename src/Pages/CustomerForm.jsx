import React, { useEffect, useState } from "react";
import axios from "axios";

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    phno: "",
    address: "",
    group: "",
  });

  const [inputValues, setInputValues] = useState({
    auctionDate: "",
    dueDate: "",
    remainingAmount: "",
    dueAmount: "",
    paidAmount: "",
    status: "Pending",
  });

  const [tdat, setTdat] = useState(null);
  const [gdat, setGdat] = useState(null);
  const [created, setCreated] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [success, setSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios
      .get("https://vcf-backend.vercel.app/group")
      .then((response) => {
        setTdat(response?.data?.data);
      })
      .catch((error) => {
        console.error("Error fetching group:", error);
      });
  }, []);

  useEffect(() => {
    if (tdat) {
      setGdat(tdat.filter((d) => d.group === formData.group));
    }
  }, [formData]);

  const handleDelete = () => {
    axios
      .delete(`https://vcf-backend.vercel.app/customer/${formData.id}`)
      .then(() => {
        setDeleted(true);
        setTimeout(() => {
          setDeleted(false);
        }, 3000);
        axios
          .delete(`https://vcf-backend.vercel.app/group/transaction`, {
            data: { id: formData.id },
          })
          .then((res) => {})
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleUpdate = () => {
    axios
      .put("https://vcf-backend.vercel.app/customer", formData)
      .then((res) => {
        setUpdated(true);
        setTimeout(() => {
          setUpdated(false);
        }, 3000);
      })
      .catch((err) => {
        console.error(err);
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
    if (!formData.id) {
      setErrorMessage("ID is required");
      setSuccess(false);
      return;
    }

    axios
      .post("https://vcf-backend.vercel.app/customer", formData)
      .then(() => {
        setSuccess(true);
        setCreated(true);
        setTimeout(() => {
          setCreated(false);
          setSuccess(null);
          setErrorMessage("");
        }, 3000);
        if (tdat) {
          setGdat(tdat.filter((d) => d.group === formData.group) || null);
        }
        if (gdat && gdat.length > 0) {
          setInputValues(
            Array.from({ length: gdat[0].months }, () => ({
              auctionDate: "",
              dueDate: "",
              remainingAmount: "",
              dueAmount: "",
              paidAmount: "",
              status: "Pending",
            }))
          );

          axios
            .post("https://vcf-backend.vercel.app/group/transaction", {
              id: formData.id,
              data: inputValues,
            })
            .then((res) => {})
            .catch((err) => {});
        }
      })
      .catch((err) => {
        console.error(err);
        setSuccess(false);
      });
  };

  return (
    <div className="container mx-auto mt-10 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-gray-900 text-center">
          Customer Form
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              ID *
            </label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="shadow-sm border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 transition duration-200"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow-sm border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 transition duration-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Phone Number
            </label>
            <input
              type="text"
              name="phno"
              value={formData.phno}
              onChange={handleChange}
              className="shadow-sm border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 transition duration-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="shadow-sm border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 transition duration-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Group
            </label>
            <input
              type="text"
              name="group"
              value={formData.group}
              onChange={handleChange}
              className="shadow-sm border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 transition duration-200"
            />
          </div>
          <div className="mt-4 text-center m-5">
            {created && success && (
              <div className="text-green-500 font-semibold">
                Customer Created
              </div>
            )}
            {success === false && (
              <div className="text-red-500 font-semibold">
                {errorMessage || "Customer Creation Failed"}
              </div>
            )}
            {deleted && (
              <div className="text-green-500 font-semibold">
                Customer Record Deleted
              </div>
            )}
            {updated && (
              <div className="text-green-500 font-semibold">
                Customer Record Updated
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

export default CustomerForm;
