
import React, { useState } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/ForgotPassword.css";
import logo from "../Images/logo.png";
import "../css/VetRegister.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
  });

  
   const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let newErrors = {};
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email =
        "Email must be in the correct format (e.g., user@example.com)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      let newErrors = { ...errors };
      if (name === "email" && /^[\w-.]+@([\w-]+\.)+[a-zA-Z]{2,}$/.test(value)) {
        delete newErrors.email;
      }
      setErrors(newErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const response = await axios.post(
          "https://vetserver.onrender.com/forgot-password",
          {
            email: formData.email,
          }
        );

        // alert(response.data.message);
        localStorage.setItem("email", formData.email); // Save email for OTP page
        setShowPopup(true)
        // navigate("/OTP-verification"); // Navigate to OTP verification page
      } catch (err) {
        // alert(err.response?.data?.error || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }
  };


  
const popupStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999
    },
    box: {
      background: '#fff',
      padding: '30px',
      borderRadius: '5px',
      textAlign: 'center',
      animation: 'fadeIn 0.3s ease',
      width: '500px',
      height: '250px',	
      boxShadow: '0 0 10px rgba(0,0,0,0.25)'
    },
    text: {
      fontSize: '18px',
      margin: '20px 0',
    },
    okButton: {
      padding: '10px 20px',
      border: 'none',
      background: '#113047',
      color: 'white',
      fontSize: '16px',
      width:"100px",
      borderRadius: '8px',
      cursor: 'pointer',
      marginTop: '20px',
    },
    tickAnimation: {
      width: '90px',
      height: '90px',
      margin: '0 auto 10px auto',
    },
    svg: {
      width: '100px',
      height: '100%'
    },
    circle: {
      fill: 'none',
      stroke: '#4CAF50',
      strokeWidth: 5,
      strokeMiterlimit: 10,
      strokeDasharray: 157,
      strokeDashoffset: 157,
      animation: 'stroke 0.6s forwards'
    },
    check: {
      stroke: '#4CAF50',
      strokeWidth: 5,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeDasharray: 48,
      strokeDashoffset: 48,
      animation: 'checkmark 0.6s 0.6s forwards'
    }
  };



  return (
    <div className="forgot-password-container">
      <div className="form-section">
        <h2 className="login-title">LOG IN</h2>
        <p className="subtitle">TO CONTINUE</p>

        <h3 className="subtitlee">Forgot Password</h3>
        <form onSubmit={handleSubmit} className="forgot-password-form">
          <div className={`input-group ${errors.email ? "error" : ""}`}>
            <EnvelopeIcon className="icon" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>
             <button type="submit" className="confirm-btn" disabled={loading}>
            {loading ? "Sending..." : "CONFIRM"}
          </button>
       
        </form>
        <p className="signup-text">
          Don't have an account? <a href="/signup">Signup</a>
        </p>
      </div>

      <div className="vertical-line"></div>

      <div className="welcome-section">
        <img src={logo} alt="VetConnect Logo" className="logo" />
        <h2>Welcome to VetConnect</h2>
        <p>Where Care Meets Convenience!</p>
      </div>


      {showPopup && (
    <div style={popupStyles.overlay}>
    <div style={popupStyles.box}>
      <div style={popupStyles.tickAnimation}>
        <svg viewBox="0 0 52 52" style={popupStyles.svg}>
          <circle style={popupStyles.circle} cx="25" cy="26" r="24" />
          <path style={popupStyles.check} fill="none" d="M14,27 L22,35 L38,19" />
        </svg>
      </div>
            <p className="popup-text">OTP is sent to you email.</p>
            <button 
                 onClick={() => {
              setShowPopup(false);
              navigate('/OTP-verification'); // Navigate to OTP verification page
            }}
            
            style={{  
              padding: '10px 20px',
              border: 'none',
              background: '#113047',
              color: 'white',
              fontSize: '16px',
              width:"100px",
              borderRadius: '20px',
              cursor: 'pointer',
              marginTop: '20px',}}>OK</button>
          </div>
        </div>
      )}


    </div>



  );
};

export default ForgotPassword;
