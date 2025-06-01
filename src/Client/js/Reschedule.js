import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Reschedule = ({ onClose }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);

  const timeslots = [
    "9:00 am to 10:00 am",
    "10:00 am to 11:00 am",
    "11:00 am to 12:00 pm",
    "1:00 pm to 2:00 pm",
    "2:00 pm to 3:00 pm",
  ];

  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    modal: {
      background: "white",
      display: "flex",
      flexDirection: "row",
      width: "80%",
      height: "80%",
      borderRadius: "8px",
      overflow: "hidden",
    },
    leftPanel: {
      flex: 1,
      padding: "30px",
      backgroundColor: "#f9f9f9",
      borderRight: "1px solid #ddd",
    },
    rightPanel: {
      flex: 1,
      padding: "30px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    closeButton: {
      position: "absolute",
      top: "20px",
      right: "20px",
      background: "transparent",
      border: "none",
      fontSize: "20px",
      cursor: "pointer",
    },
    profile: {
      display: "flex",
      alignItems: "center",
      marginBottom: "20px",
    },
    profileImage: {
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      marginRight: "15px",
    },
    dateInfo: {
      marginBottom: "10px",
      fontSize: "14px",
      fontWeight: "500",
    },
    timeslotButton: {
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "12px 20px",
      marginBottom: "12px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      cursor: "pointer",
      backgroundColor: "#fff",
    },
    selectedTimeslotButton: {
      backgroundColor: "#e6f4ff",
      borderColor: "#3399ff",
    },
    rescheduleButton: {
      padding: "12px",
      backgroundColor: selectedTime ? "#4DB7FE" : "#d0eaff",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: selectedTime ? "pointer" : "not-allowed",
      width: "100%",
      fontWeight: "600",
    },
    appointmentDetailText: {
      marginBottom: "15px",
      lineHeight: "1.6",
    },
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {/* Close Button */}
        <button style={styles.closeButton} onClick={onClose}>
          &times;
        </button>

        {/* Left Panel */}
        <div style={styles.leftPanel}>
          <h3>Your Appointment Details:</h3>
          <p style={{ fontWeight: "500", marginBottom: "8px" }}>
            1 Hour Appointment scheduled on
          </p>
          <p style={styles.appointmentDetailText}>
            <strong>Appointment ID:</strong> 100020
            <br />
            <strong>Date:</strong> 12:00 - 1:00 pm, 12/02/2025
            <br />
            <strong>Pet Owner:</strong> Sonam Choden
            <br />
            <strong>Pet Name:</strong> Bubu
            <br />
            <strong>Veterinarian:</strong> Dr. Sonam Gyeltshen
            <br />
            <strong>Location:</strong> Kawajangsa, Thimphu, Bhutan
          </p>
        </div>

        {/* Right Panel */}
        <div style={styles.rightPanel}>
          <div>
            <div style={styles.profile}>
              <img
                src="https://via.placeholder.com/60"
                alt="Vet"
                style={styles.profileImage}
              />
              <div>
                <div style={{ fontWeight: "600" }}>Dr. Sonam Gyeltshen</div>
                <div style={{ fontSize: "14px", color: "#666" }}>
                  Veterinarian, MRCVS
                </div>
              </div>
            </div>

            <div style={styles.dateInfo}>
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>

            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              minDate={new Date()}
            />

            <div style={{ marginTop: "20px" }}>
              {timeslots.map((time, idx) => (
                <div
                  key={idx}
                  style={{
                    ...styles.timeslotButton,
                    ...(selectedTime === time && styles.selectedTimeslotButton),
                  }}
                  onClick={() => setSelectedTime(time)}
                >
                  <span>Today at {time}</span>
                  <span>Nu. 500</span>
                </div>
              ))}
            </div>
          </div>

          <button
            style={styles.rescheduleButton}
            disabled={!selectedTime}
            onClick={() => {
              if (selectedTime) {
                alert(
                  `Rescheduled to ${selectedDate.toDateString()} at ${selectedTime}`
                );
                onClose();
              }
            }}
          >
            Reschedule Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reschedule;
