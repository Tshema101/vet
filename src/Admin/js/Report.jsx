import React, { useState, useEffect } from "react";

import axios from "axios";

import "../css/astyles.css";
import AdminHeader from "./Header";
import SuperAdminSidebar from "./Sidebar";

const Report = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [reportList, setReportList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [showReasonsModal, setShowReasonsModal] = useState(false);

  useEffect(() => {
    const fetchReports = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("Unauthorized access. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:8080/getReports", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setReportList(response.data.reports || []);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch reports. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const openReasonModal = (reasons) => {
    setSelectedReasons(reasons);
    setShowReasonsModal(true);
  };

  return (
    <div className="app-container flex h-screen">
      <SuperAdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <div style={{marginTop:"-30px"}} className="dashboard-container">
          <div
        className="table-container"
        style={{
          maxHeight: "400px",
          overflowY: "auto",
          overflowX: "auto",
          border: "1px solid #ddd",
          marginTop: "20px",
        }}
      >
            <h3 style={{ padding: "20px" }}>Vet Reports</h3>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="error-message">{error}</p>
            ) : reportList.length === 0 ? (
              <p>No vet reports found.</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Vet Name</th>
                    <th>Email</th>
                    <th>Total Reports</th>
                    <th>Reasons</th>
                  </tr>
                </thead>
                <tbody>
                  {reportList
                    .filter((vet) =>
                      vet.vetName.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((vet) => (
                      <tr key={vet.vetId}>
                        <td>{vet.vetName}</td>
                        <td>{vet.vetEmail}</td>
                        <td>{vet.totalReports}</td>
                        <td
                          style={{
                            fontSize: "14px",
                            color: "grey",
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                          onClick={() => openReasonModal(vet.reportReasons)}
                        >
                          View
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Report Reason Modal */}
        {showReasonsModal && (
          <div
            onClick={() => setShowReasonsModal(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "8px",
                maxWidth: "600px",
                width: "90%",
                maxHeight: "80vh",
                overflowY: "auto",
              }}
            >
              <h3 style={{ marginBottom: "20px" }}>Report Reasons</h3>
              <ul>
                {selectedReasons.map((reason, index) => (
              

<div style={{ marginBottom: "15px" }}>
<h4 style={{ marginBottom: "5px", fontWeight: "bold" }} key={index}> {index + 1}. {reason}</h4>

</div>
                ))}
             </ul>
              <button
                onClick={() => setShowReasonsModal(false)}
                style={{
                  marginTop: "10px",
                  padding: "8px 16px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Report;
