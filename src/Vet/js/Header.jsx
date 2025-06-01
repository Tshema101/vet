import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import "../css/Header.css";
import ChangePasswordModal from "../../SuperAdmin/js/ChangePasswordModal";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const [vetData, setVetData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  
  const navigate = useNavigate();

  


  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/');
      return;
    }
    try {
      JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      console.error("Error decoding token:", error);
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchVetData = async () => {
      const token = localStorage.getItem('authToken');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      try {
        // First get the user ID from the token
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const userId = decodedToken.userId;

        // Fetch vet profile data
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/vets/${userId}`, { headers });
        
        if (!response.ok) {
          throw new Error('Failed to fetch vet data');
        }
        
        const data = await response.json();
        setVetData(data.data);
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVetData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleProfileClick = () => {
    navigate("/VetProfile"); 
  };

  return (
    <div className="header-container">
      {/* Top Row - Brand and Profile */}
      <div className="header-top-row">
        <h1 className="vetconnect-title">VetConnect</h1>
        
        <div className="profile-section">
          <div className="profile-dropdown" onClick={() => setIsOpen(!isOpen)}>
            <FaUserCircle className="profile-icon" />
            <FaCaretDown className={`dropdown-arrow ${isOpen ? 'open' : ''}`} />
          </div>
          
          {isOpen && (
            <div className="dropdown-menu">
              <button onClick={handleProfileClick} className="dropdown-item">
                View Profile
              </button>
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

      {/* Black Line */}
      <div className="header-divider"></div>

      {/* Welcome Message */}
      <div className="welcome-message">
        {loading ? (
          "Loading..."
        ) : error ? (
          "Welcome, Doctor"
        ) : vetData ? (
          `Welcome, Dr. ${vetData.name}`
        ) : (
          "Welcome"
        )}
      </div>


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

