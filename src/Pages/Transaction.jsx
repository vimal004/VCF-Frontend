import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Transaction = () => {
  const { customerid } = useParams();
  const [customers, setCustomers] = useState(null);
  const [filteredCustomer, setFilteredCustomer] = useState({});
  const [tdat, setTdat] = useState(null);
  const [gdat, setGdat] = useState(null);
  const [existvalues, setExistValues] = useState(null);
  const [inputValues, setInputValues] = useState([]);
  const [successMessage, setSuccessMessage] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    axios
      .get("https://vcf-backend.vercel.app/customers")
      .then((response) => {
        setCustomers(response?.data?.data);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  }, []);

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
    axios
      .get(`https://vcf-backend.vercel.app/group/transaction`, {
        params: { id: customerid },
      })
      .then((res) => {
        setExistValues(res?.data?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [customerid]);

  useEffect(() => {
    if (tdat && filteredCustomer) {
      const filteredGroup = tdat.find((d) => d.group == filteredCustomer.group);
      setGdat(filteredGroup);
    }
  }, [tdat, filteredCustomer]);

  useEffect(() => {
    if (customers) {
      const customer = customers.find((customer) => customer.id === customerid);
      setFilteredCustomer(customer || {});
    }
  }, [customers, customerid]);

  useEffect(() => {
    if (gdat && existvalues) {
      setInputValues(
        Array.from({ length: gdat.months }, (_, index) => ({
          auctionDate: existvalues[index]?.auctionDate || "",
          dueDate: existvalues[index]?.dueDate || "",
          remainingAmount: existvalues[index]?.remainingAmount || "",
          dueAmount: existvalues[index]?.dueAmount || "",
          paidAmount: existvalues[index]?.paidAmount || "",
          status: existvalues[index]?.status || "Pending",
        }))
      );
    }
  }, [gdat, existvalues]);

  const handleInputChange = (e, rowIndex, field) => {
    const { value } = e.target;
    setInputValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[rowIndex][field] = value;
      return newValues;
    });
  };

  const handleUpdate = () => {
    axios
      .put("https://vcf-backend.vercel.app/group/transaction", {
        id: customerid,
        data: inputValues,
      })
      .then((res) => {
        //console.log("Transaction updated successfully:", res.data);
        setSuccessMessage(true);
        setTimeout(() => {
          setSuccessMessage(false);
        }, 3000);
      })
      .catch((err) => {
        console.error("Error updating transaction:", err);
      });
  };

  const handleGeneratePDF = () => {
    const input = contentRef.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgHeight = (canvas.height * 208) / canvas.width;
      pdf.addImage(imgData, 0, 0, 208, imgHeight);
      pdf.save("transaction.pdf");
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4" ref={contentRef}>
      <h1 className="text-3xl font-bold text-center mb-8">Transaction Page</h1>
      {gdat ? (
        <h6 className="text-2xl font-bold text-center mb-8">
          {gdat.groupname}
        </h6>
      ) : (
        <h1></h1>
      )}
      <div className="mb-8">
        <h2 className="text-xl font-semibold">Customer Details</h2>
        <p className="mt-2">
          <strong>ID:</strong> {customerid}
        </p>
        <p className="mt-2">
          <strong>Name:</strong> {filteredCustomer.name || "N/A"}
        </p>
        <p className="mt-2">
          <strong>Phone:</strong> {filteredCustomer.phno || "N/A"}
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Month</th>
              <th className="border border-gray-300 px-4 py-2">Auction Date</th>
              <th className="border border-gray-300 px-4 py-2">Due Date</th>
              <th className="border border-gray-300 px-4 py-2">
                Remaining Amount
              </th>
              <th className="border border-gray-300 px-4 py-2">Due Amount</th>
              <th className="border border-gray-300 px-4 py-2">Paid Amount</th>
              <th className="border border-gray-300 px-10 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {gdat && gdat.months > 0 ? (
              Array.from({ length: gdat.months }, (_, index) => {
                const startMonthIndex = new Date(
                  gdat.startmonth + "/1/2000"
                ).getMonth();
                const currentMonthIndex = (startMonthIndex + index) % 12;
                const currentMonthName = new Intl.DateTimeFormat("en-US", {
                  month: "long",
                }).format(new Date(2000, currentMonthIndex, 1));

                return (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">
                      {currentMonthName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        value={inputValues[index]?.auctionDate || ""}
                        onChange={(e) =>
                          handleInputChange(e, index, "auctionDate")
                        }
                        className="border border-gray-300 rounded-md py-1 px-2 w-full"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        value={inputValues[index]?.dueDate || ""}
                        onChange={(e) => handleInputChange(e, index, "dueDate")}
                        className="border border-gray-300 rounded-md py-1 px-2 w-full"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        value={inputValues[index]?.remainingAmount || ""}
                        onChange={(e) =>
                          handleInputChange(e, index, "remainingAmount")
                        }
                        className="border border-gray-300 rounded-md py-1 px-2 w-full"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        value={inputValues[index]?.dueAmount || ""}
                        onChange={(e) =>
                          handleInputChange(e, index, "dueAmount")
                        }
                        className="border border-gray-300 rounded-md py-1 px-2 w-full"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        value={inputValues[index]?.paidAmount || ""}
                        onChange={(e) =>
                          handleInputChange(e, index, "paidAmount")
                        }
                        className="border border-gray-300 rounded-md py-1 px-2 w-full"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <select
                        value={inputValues[index]?.status || ""}
                        onChange={(e) => handleInputChange(e, index, "status")}
                        className="border border-gray-300 rounded-md py-1 px-2 w-full"
                      >
                        <option value=""></option>
                        <option value="Paid">Paid</option>
                        <option value="Defaulter">Unpaid</option>
                      </select>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="border border-gray-300 px-4 py-2" colSpan="7">
                  N/A
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        {successMessage && (
          <p className="text-green-500 m-3 text-center">Update Successful!</p>
        )}
        <button
          onClick={handleUpdate}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Details
        </button>
        <button
          onClick={handleGeneratePDF}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
        >
          Generate PDF
        </button>
      </div>
    </div>
  );
};

export default Transaction;
