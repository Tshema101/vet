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
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedRefund, setSelectedRefund] = useState(null);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
const [refundedAmount, setRefundedAmount] = useState("");
const [showRefundModal, setShowRefundModal] = useState(false);
const [refundSuccessModal, setRefundSuccessModal] = useState(false);
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
  setRefundedAmount(""); // Reset any old input
  setShowRefundModal(true); // Open refund amount input modal
};

 const confirmRefund = async () => {
  if (!refundedAmount || isNaN(refundedAmount)) {
    alert("Please enter a valid refund amount.");
    return;
  }

  try {
    console.log(selectedRefund._id)
    await axios.put(
      `${process.env.REACT_APP_BASE_URL}/refundupdate/${selectedRefund._id}`,
      {
        refundedAmount: parseFloat(refundedAmount),
      }
    );

  setShowAccountModal(false);
      setRefundSuccessModal(true);

    // Refresh data
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/getallrefund`);
    setRefundList(res.data);

    // Close modal
    setShowRefundModal(false);
  } catch (error) {
    console.error("Error confirming refund:", error);
    alert("Failed to mark refund as completed.");
  }
};

  const handleRefund = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/refund`, {
        paymentIntentId: selectedRefund.paymentIntentId, // Make sure this exists!
        amount: selectedAccount.amount,
      });

      if (res.data.success) {
        alert("Refund successful!");
        setShowAccountModal(false);
        // Optionally refresh refund list
      } else {
        alert("Refund failed: " + res.data.error);
      }
    } catch (error) {
      console.error("Refund error", error);
      alert("Refund failed. Please try again.");
    }
  };

  const handleRejectClick = (refund) => {
    setSelectedRefund(refund);
    // setRejectionReason("");
    setShowReasonModal(true); // open reason modal first
  };
  // Close Success Modal
  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };
  const confirmReject = async () => {
    if (!rejectionReason.trim()) {
      alert("Please enter a reason for rejection.");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/reject-refund`, {
        refundId: selectedRefund._id,
        rejectionReason: rejectionReason,
      });

      // Fetch updated refunds list after rejection
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/getallrefund`);
      console.log("sdfgh", res.data);
      setRefundList(res.data);
      setShowConfirmModal(false);
      setShowSuccessModal(true);
      console.log("sdfgh", res.data);
    } catch (err) {
      console.error(
        "Failed to reject refund:",
        err.response?.data || err.message || err
      );
      alert("Error rejecting refund");
    }
  };
  const handleProceedToConfirm = () => {
    if (!rejectionReason.trim()) {
      alert("Please enter a reason for rejection.");
      return;
    }
    setShowReasonModal(false);
    setShowConfirmationModal(true);
  };
  console.log("refundList", refundList);
  return (
    <div className="app-container flex h-screen">
      <SuperAdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <div style={{marginTop:"-30px"}}  className="dashboard-container p-6">
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
                    <th className="px-4 py-2">Account Number</th>
                    <th className="px-4 py-2">Appointment Date</th>
                    <th className="px-4 py-2">Appointment Time</th>
                    <th className="px-4 py-2">Cancellation Reason</th>
                    <th className="px-4 py-2">Form Submitted</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                 {refundList
  .filter((refund) => refund.status === "pendingRefund")
  .map((refund) => (
                    <tr key={refund._id} className="text-center border-t">
                      <td className="px-4 py-2">
                        {refund.appointmentId?._id || "N/A"}
                      </td>
                      <td className="px-4 py-2">{refund.vetId.email}</td>
                      <td className="px-4 py-2">{refund.clientId.email}</td>
                      <td className="px-4 py-2">{refund.clientId.accountHolderName}</td>
                      <td className="px-4 py-2">
                        {refund.appointmentId?.appointmentDate
                          ? new Date(
                              refund.appointmentId.appointmentDate
                            ).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="px-4 py-2">
                   {refund.appointmentId.appointmentTime} - {refund.appointmentId.endTime}
                      </td>
                      <td className="px-4 py-2">{refund.cancellationReason}</td>
                      <td className="px-4 py-2">
                        {new Date(refund.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2">
                        <div className="action-buttons">
                          <button
                            className="refund"
                            onClick={() => handleRefundClick(refund)}
                            
                          >
                            Refund
                          </button>
                          {/* <button
                            className="refund"
                            onClick={() => handleRejectClick(refund)}
                          >
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
          {showReasonModal && (
            <div className="modal-overlay inset-0 fixed flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="modal-box bg-white p-6 rounded-xl shadow-xl text-center max-w-sm w-full">
                <h3 className="font-semibold text-xl mb-4">
                  Enter Rejection Reason
                </h3>
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
          {showConfirmationModal && (
            <div className="modal-overlay inset-0 fixed flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="modal-box bg-white p-6 rounded-xl shadow-xl text-center max-w-sm w-full">
                <h3 className="font-semibold text-xl mb-4">
                  Are you sure you want to reject this refund?
                </h3>
                <p className="mb-4 text-gray-700 italic">
                  Reason: {rejectionReason}
                </p>
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
                    onClick={async () => {
                      try {
                        await axios.post(
                          `${process.env.REACT_APP_BASE_URL}/reject-refund`,
                          {
                            refundId: selectedRefund._id,
                            rejectionReason: rejectionReason,
                          }
                        );
                        const res = await axios.get(
                         `${process.env.REACT_APP_BASE_URL}/getallrefund`
                        );
                        setRefundList(res.data);
                        setShowConfirmationModal(false);
                        setShowSuccessModal(true);
                      } catch (err) {
                        console.error("Failed to reject refund:", err);
                        alert("Error rejecting refund");
                      }
                    }}
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
          {/* Account Details Modal */}
          {showAccountModal && selectedAccount && (
            <div className="modal-overlay inset-0 fixed flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="modal-box bg-white p-6 rounded-xl shadow-xl text-center max-w-sm w-full relative">
                <button
  onClick={() => setShowAccountModal(false)}
  className="absolute top-4 right-4 sm:right-8 md:right-12 lg:right-16 text-white text-2xl hover:text-red-500 bg-transparent border-none focus:outline-none"
  style={{
    background: "transparent",
    border: "none",
    marginLeft:"200px",
  }}
>
  <FaTimes />
</button>
                <h3 className="font-semibold text-xl mb-4">
                  Client Account Details
                </h3>

                <TextField
                  fullWidth
                  label="Bank Type"
                  value={selectedAccount.bankType}
                  disabled
                  margin="dense"
                />
                <TextField
                  fullWidth
                  label="Account Number"
                  value={selectedAccount.accountNumber}
                  disabled
                  margin="dense"
                />
                <TextField
                  fullWidth
                  label="Account Holder Name"
                  value={selectedAccount.accountHolderName}
                  disabled
                  margin="dense"
                />
                <TextField
                  fullWidth
                  label="Amount"
                  value={selectedAccount.amount}
                  disabled
                  margin="dense"
                />
                <TextField
                  fullWidth
                  label="Payment Status"
                  value={selectedAccount.paymentStatus}
                  disabled
                  margin="dense"
                />
                <Box mt={3}>
                  <Button
                    variant="contained"
                    // color="primary"
                    onClick={handleRefund}
                    style={{ width: "50%", backgroundColor: "#113047" }}
                  >
                    Refund
                  </Button>
                </Box>
              </div>
            </div>
          )}

{showRefundModal && (
  <div className="modal-overlay inset-0 fixed flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="relative modal-box bg-white p-6 rounded-xl shadow-xl text-center max-w-sm w-full">
      
      {/* Close Button in Top-Right */}
      <button
        onClick={() => setShowRefundModal(false)}
        className="absolute top-2 right-8 text-gray-600 hover:text-red-500 text-xl"
        style={{marginInlineStart:'32vh',marginBottom:"10px"}}
      >
        <FaTimes />
      </button>

      <h3 className="font-semibold text-xl " style={{marginBottom:"2px"}}>Enter Refund Amount</h3>

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



          {/* Success Modal */}
          {showSuccessModal && (
            <div className="modal-overlay fade-in">
              <div
                className="modal success-modal"
                style={{
                  textAlign: "center",
                  padding: "2rem",
                  borderRadius: "12px",
                  backgroundColor: "#00000",
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
                  The Rejection was successfully submitted.
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
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#15803d")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "#16a34a")
                  }
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
