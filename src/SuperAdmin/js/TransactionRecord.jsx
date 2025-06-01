import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/astyles.css";
import AdminHeader from "./Header";
import SuperAdminSidebar from "./Sidebar";

const TransactionRecords = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { data, month } = state || {};
  const { total, deduction, finalAmount, date, status } = data || {};

  const monthLabel = new Date(2025, month - 1).toLocaleString("default", {
    month: "long",
  });

  return (
    <div className="app-container flex h-screen">
      <SuperAdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <div className="dashboard-container">
          <h2 className="dashboard-title">Transaction Records</h2>

          <div className="overflow-x-auto">
            <div className="min-w-[600px] bg-white shadow-lg rounded-lg border">
              <div className="flex justify-between items-center border-b px-6 py-4 bg-gray-100">
                <h3 className="text-lg font-semibold text-gray-700">
                  2025 - {monthLabel}
                </h3>
              </div>

              <table className="table-auto w-full border">
                <thead className="text-gray-600 border-b">
                  <tr>
                    <th className="px-6 py-3 font-medium">Month</th>
                    <th className="px-6 py-3 font-medium">
                      Total Fees Collected
                    </th>
                    <th className="px-6 py-3 font-medium">
                      Service Charge (20%)
                    </th>
                    <th className="px-6 py-3 font-medium">After Deduction</th>
                    <th className="px-6 py-3 font-medium">Date</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-6 py-4">{monthLabel}</td>
                    <td className="px-6 py-4">Nu. {total?.toLocaleString()}</td>
                    <td className="px-6 py-4 text-red-600">
                      Nu. {deduction?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-green-600 font-semibold">
                      Nu. {finalAmount?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      {date || `29/${String(month).padStart(2, "0")}/2025`}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-700">
                      {status || "CR"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="text-center mt-6">
              <button
                onClick={() => navigate(-1)}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionRecords;
