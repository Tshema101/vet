// Header.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import "../css/Header.css";
import ChangePasswordModal from "../css/ChangePasswordModel.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="header-container">
      <div className="header-top-row">
        <h1 className="vetconnect-title" style={{marginLeft:"27px"}}>VetConnect</h1>

        <div className="profile-section">
          <div className="profile-dropdown" onClick={() => setIsOpen(!isOpen)}>
            <FaUserCircle className="profile-icon" />
            <FaCaretDown className={`dropdown-arrow ${isOpen ? "open" : ""}`} />
          </div>

          {isOpen && (
            <div className="dropdown-menu">
              <button
                onClick={() => setShowChangePasswordModal(true)}
                className="dropdown-item"
              >
                Change Password
              </button>
              <button onClick={handleLogout} className="dropdown-item">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="header-divider"></div>

      {/* Modal Trigger */}
      {showChangePasswordModal && (
        <ChangePasswordModal
          onClose={() => setShowChangePasswordModal(false)}
        />
      )}
    </div>
  );
};

export default Header;
