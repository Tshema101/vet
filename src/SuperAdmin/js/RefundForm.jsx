import React, { useEffect, useState } from "react";
import axios from "axios";
import SuperAdminSidebar from "./Sidebar";
import AdminHeader from "./Header";
import "../css/rstyle.css";
import { Box, Button, TextField } from "@mui/material";
import { FaTimes } from "react-icons/fa";

const RefundForms = () => {
  const [refundList, setRefundList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showReasonModal, setShowReasonModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);

  const [refundSuccessModal, setRefundSuccessModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [rejectionReason, setRejectionReason] = useState("");
  const [selectedRefund, setSelectedRefund] = useState(null);
  const [refundedAmount, setRefundedAmount] = useState("");

  useEffect(() => {
    const fetchRefunds = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/getallrefund`);
        setRefundList(res.data);
      } catch (err) {
        console.error("Failed to fetch refunds", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRefunds();
  }, []);

  const handleRefundClick = (refund) => {
    setSelectedRefund(refund);
    setRefundedAmount(""); // Reset old input
    setShowRefundModal(true); // Show refund amount modal
  };

  const confirmRefund = async () => {
    if (!refundedAmount || isNaN(refundedAmount)) {
      alert("Please enter a valid refund amount.");
      return;
    }

    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/refundupdate/${selectedRefund._id}`,
        {
          refundedAmount: parseFloat(refundedAmount),
        }
      );

      setRefundSuccessModal(true);
      setShowRefundModal(false);

      // Refresh refund list
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/getallrefund`);
      setRefundList(res.data);
    } catch (error) {
      console.error("Error confirming refund:", error);
      alert("Failed to mark refund as completed.");
    }
  };

  const handleRejectClick = (refund) => {
    setSelectedRefund(refund);
    setRejectionReason("");
    setShowReasonModal(true);
  };

  const handleProceedToConfirm = () => {
    if (!rejectionReason.trim()) {
      alert("Please enter a reason for rejection.");
      return;
    }
    setShowReasonModal(false);
    setShowConfirmationModal(true);
  };

  const confirmReject = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/reject-refund`, {
        refundId: selectedRefund._id,
        rejectionReason: rejectionReason,
      });

      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/getallrefund`);
      setRefundList(res.data);
      setShowConfirmationModal(false);
      setShowSuccessModal(true);
    } catch (err) {
      console.error("Failed to reject refund:", err.response?.data || err.message || err);
      alert("Error rejecting refund");
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="app-container flex h-screen">
      <SuperAdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <div style={{ marginTop: "-30px" }} className="dashboard-container p-6">
          <h2 className="dashboard-title">Refund Form</h2>

          {loading ? (
            <p className="text-center py-6">Loading refunds...</p>
          ) : (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2">Appointment_ID</th>
                    <th className="px-4 py-2">Vet Email</th>
                    <th className="px-4 py-2">Client Email</th>
                    <th className="px-4 py-2">Client Paypal Email</th>
                    <th className="px-4 py-2">Appointment_Date</th>
                    <th className="px-4 py-2">Appointment_Time</th>
                    <th className="px-4 py-2">Cancellation_Reason</th>
                    <th className="px-4 py-2">Form_Submitted</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {refundList
                    .filter((refund) => refund.status === "pendingRefund")
                    .map((refund) => (
                      <tr key={refund._id} className="text-center border-t">
                        <td className="px-4 py-2">{refund.appointmentId?._id || "N/A"}</td>
                        <td className="px-4 py-2">{refund.vetId.email}</td>
                        <td className="px-4 py-2">{refund.clientId.email}</td>
                        <td className="px-4 py-2">{refund.accountHolderName}</td>
                        <td className="px-4 py-2">
                          {refund.appointmentId?.appointmentDate
                            ? new Date(refund.appointmentId.appointmentDate).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td className="px-4 py-2">
                          {refund.appointmentId?.appointmentTime} - {refund.appointmentId?.endTime}
                        </td>
                        <td className="px-4 py-2">{refund.cancellationReason}</td>
                        <td className="px-4 py-2">{new Date(refund.createdAt).toLocaleDateString()}</td>
                        <td className="px-4 py-2">
                          <div className="action-buttons">
                            <button className="refund" onClick={() => handleRefundClick(refund)}>
                              Refund
                            </button>
                            {/* Uncomment below if reject functionality needed */}
                            {/* <button className="refund" onClick={() => handleRejectClick(refund)}>
                              Reject
                            </button> */}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Refund Amount Modal */}
          {showRefundModal && (
            <div className="modal-overlay inset-0 fixed flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="relative modal-box bg-white p-6 rounded-xl shadow-xl text-center max-w-sm w-full">
                <button
                  onClick={() => setShowRefundModal(false)}
                  className="absolute top-2 right-8 text-gray-600 hover:text-red-500 text-xl"
                  style={{ marginInlineStart: "32vh", marginBottom: "10px" }}
                >
                  <FaTimes />
                </button>

                <h3 className="font-semibold text-xl" style={{ marginBottom: "2px" }}>
                  Enter Refund Amount
                </h3>

                <TextField
                  fullWidth
                  label="Refunded Amount"
                  type="number"
                  value={refundedAmount}
                  onChange={(e) => setRefundedAmount(e.target.value)}
                  margin="normal"
                />

                <Box mt={3}>
                  <Button
                    variant="contained"
                    onClick={confirmRefund}
                    style={{ backgroundColor: "#113047", color: "#fff" }}
                    disabled={loading}
                  >
                    {loading ? "Confirming..." : "Confirm Refund"}
                  </Button>
                </Box>
              </div>
            </div>
          )}

          {/* Success Modal for Refund */}
          {refundSuccessModal && (
            <div className="modal-overlay fade-in">
              <div
                className="modal success-modal"
                style={{
                  textAlign: "center",
                  padding: "2rem",
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}
              >
                <h3
                  style={{
                    color: "#16a34a",
                    fontSize: "1.5rem",
                    marginBottom: "1rem",
                  }}
                >
                  Success!
                </h3>
                <p
                  style={{
                    fontSize: "1rem",
                    color: "#374151",
                    marginBottom: "1.5rem",
                  }}
                >
                  Refund marked as completed successfully.
                </p>
                <button
                  className="close-btn"
                  onClick={() => setRefundSuccessModal(false)}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#16a34a",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    transition: "background-color 0.2s ease-in-out",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#15803d")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#16a34a")}
                >
                  OK
                </button>
              </div>
            </div>
          )}

          {/* Reject Reason Modal */}
          {showReasonModal && (
            <div className="modal-overlay inset-0 fixed flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="modal-box bg-white p-6 rounded-xl shadow-xl text-center max-w-sm w-full">
                <h3 className="font-semibold text-xl mb-4">Enter Rejection Reason</h3>
                <TextField
                  label="Reason for rejection"
                  fullWidth
                  multiline
                  minRows={2}
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  margin="normal"
                />
                <div
                  style={{
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "row",
                    gap: "60px",
                  }}
                >
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#113047" }}
                    onClick={handleProceedToConfirm}
                  >
                    Proceed
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#A52727" }}
                    onClick={() => setShowReasonModal(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Reject Confirmation Modal */}
          {showConfirmationModal && (
            <div className="modal-overlay inset-0 fixed flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="modal-box bg-white p-6 rounded-xl shadow-xl text-center max-w-sm w-full">
                <h3 className="font-semibold text-xl mb-4">Are you sure you want to reject this refund?</h3>
                <p className="mb-4 text-gray-700 italic">Reason: {rejectionReason}</p>
                <div
                  style={{
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "row",
                    gap: "60px",
                  }}
                >
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#6DC5EE" }}
                    onClick={confirmReject}
                  >
                    Confirm
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#A52727" }}
                    onClick={() => setShowConfirmationModal(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Success Modal for Rejection */}
          {showSuccessModal && (
            <div className="modal-overlay fade-in">
              <div
                className="modal success-modal"
                style={{
                  textAlign: "center",
                  padding: "2rem",
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}
              >
                <h3
                  style={{
                    color: "#16a34a",
                    fontSize: "1.5rem",
                    marginBottom: "1rem",
                  }}
                >
                  Success!
                </h3>
                <p
                  style={{
                    fontSize: "1rem",
                    color: "#374151",
                    marginBottom: "1.5rem",
                  }}
                >
                  The rejection was successfully submitted.
                </p>
                <button
                  className="close-btn"
                  onClick={closeSuccessModal}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#16a34a",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    transition: "background-color 0.2s ease-in-out",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#15803d")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#16a34a")}
                >
                  OK
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RefundForms;
