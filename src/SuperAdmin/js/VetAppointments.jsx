import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminHeader from "./Header";
import SuperAdminSidebar from "./Sidebar";
import { FaArrowCircleLeft } from "react-icons/fa";

const VetAppointments = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { vet } = location.state || {};

  const today = new Date();
  const initialMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (!vet?._id || !selectedMonth) return;

    const fetchAppointments = async () => {
      try {
        const res = await fetch(
          `https://vetserver.onrender.com/appointments/vet/${vet._id}?month=${selectedMonth}`
        );
        const result = await res.json();
        if (result.success) {
          setAppointments(result.data);
        } else {
          setAppointments([]);
        }
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setAppointments([]);
      }
    };

    fetchAppointments();
  }, [selectedMonth, vet?._id]);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const totalAmount = appointments.reduce(
    (sum, a) => sum + (a?.payment?.amount || 0),
    0
  );
  const deduction = totalAmount * 0.2;
  const finalAmount = totalAmount - deduction;

  if (!vet) {
    return (
      <div style={{ padding: "20px" }}>
        <p>No vet selected. Please go back and select a vet.</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="app-container flex h-screen">
      <SuperAdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <div className="dashboard-container p-6 overflow-auto" style={{ marginTop: "-30px" }} >
          <button
            onClick={() => navigate(-1)}
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              marginLeft: '1px',
              marginBottom: '20px',
              background: 'transparent',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
            }}
          >
            {/* ←  */}
            <FaArrowCircleLeft />
          </button>


          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h3>Appointments - {selectedMonth}</h3>
            <input
              type="month"
              value={selectedMonth}
              onChange={handleMonthChange}
              style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
          </div>
          <div className="table-container">
            <table
              className="table"
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginBottom: "30px",
                border: "1px solid #ccc",
              }}
            >
              <thead style={{ backgroundColor: "#f9f9f9" }}>
                <tr>
                  <th>Sl No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Payment</th>
                  <th>Amount Transferred ($)</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment, index) => (
                  <tr key={index} style={{ textAlign: "center" }}>
                    <td>{index + 1}</td>
                    <td>{appointment?.client?.name}</td>
                    <td>{appointment?.client?.email}</td>
                    <td>
                      {new Date(
                        appointment?.appointment?.appointmentDate
                      ).toLocaleDateString()}
                    </td>
                    <td
                      style={{
                        color:
                          appointment?.payment?.status === "Refunded"
                            ? "green"
                            : "blue",
                      }}
                    >
                      {appointment?.payment?.status || "Pending"}
                    </td>
                    <td>
                      {(
                        (appointment?.payment?.amount || 0) * 0.8
                      ).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h4 style={{ textAlign: "center" }}>
              *** 20% KEPT AS PLATFORM FEE
            </h4>

            <div
              style={{
                marginTop: "30px",
                padding: "20px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                maxWidth: "400px",
                marginLeft: "auto",
                marginRight: "auto",
                backgroundColor: "#f8f8f8",
              }}
            >
              <strong style={{ marginBottom: "10px", display: "block", textAlign: "center" }}>
                Payout Summary - {selectedMonth}
              </strong>

              <div
                style={{
                  width: "100%",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <span>Total Fees:</span>
                  <span>
                    <strong>Nu. {totalAmount.toFixed(2)}</strong>
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <span>Deduction (20%):</span>
                  <span>
                    <strong>Nu. {deduction.toFixed(2)}</strong>
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                  }}
                >
                  <span>Final Amount Transfer to Vet:</span>
                  <span>
                    <strong>Nu. {finalAmount.toFixed(2)}</strong>
                  </span>
                </div>

                <div
                  style={{
                    borderTop: "1px solid #ccc",
                    paddingTop: "15px",
                    textAlign: "center",
                  }}
                >
                  {/* <button
                  style={{
                    padding: "8px 20px",
                    backgroundColor: "#6DC5EE",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  PayOut
                </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VetAppointments;
