import React, { useState } from "react";
import "../css/ChangePasswordModal.css";

const ChangePasswordModal = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically call an API to change the password
    // For demo purposes, we'll just show the success animation
    setIsSuccess(true);
    setTimeout(() => {
      onClose();
    }, 2000); // Close after 2 seconds
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        {!isSuccess ? (
          <>
            {/* <h2>Change Password</h2> */}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className="button-group">
                <button type="button" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit">Change Password</button>
              </div>
            </form>
          </>
        ) : (
          <div className="success-animation">
            <svg
              className="checkmark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                className="checkmark__circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                className="checkmark__check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
            <p>Password changed successfully!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangePasswordModal;

