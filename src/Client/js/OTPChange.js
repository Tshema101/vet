import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../css/otp.css";
import logo from "../Images/logo.png";

const OTPChange = () => {
  const location = useLocation();
  const { email } = location.state || {}; // Get email from location state
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [errors, setErrors] = useState({});
  const inputRefs = useRef([]);

  const validateForm = () => {
    let newErrors = {};
    const otpValue = otp.join(""); // Combine OTP fields into one string

    if (!otpValue.trim()) {
      newErrors.otp = "OTP is required";
    } else if (!/^\d{6}$/.test(otpValue)) {
      newErrors.otp = "OTP must be 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    if (errors.otp) {
      let newErrors = { ...errors };
      if (/^\d{6}$/.test(newOtp.join(""))) {
        delete newErrors.otp;
      }
      setErrors(newErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!otp) {
        alert("Please enter the OTP");
        return;
      }

      // Get the email from location state
      const email = localStorage.getItem("email");

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/verify-forgot-otp/${email}`,
        { otp: otp.join("") } // Send OTP as a string
      );

      console.log("OTP verified successfully:", response.data);
      navigate("/reset-password"); // Navigate to reset password page
    } catch (error) {
      if (error.response) {
        console.error("Backend error:", error.response.data);
        alert(error.response.data.error || "Invalid OTP. Please try again.");
      } else {
        console.error("Error verifying OTP:", error.message);
        alert("Something went wrong. Please try again later.");
      }
    }
  };

  const handleResendOTP = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/forgot-password`,
        {
          email,
        }
      );

      alert(response.data.message);
    } catch (error) {
      alert("There was an error resending the OTP.");
    }
  };

  return (
    <div className="otp-container">
      <div className="left-side">
        <img src={logo} alt="VetConnect Logo" className="ologo" />
        <h2>Welcome to VetConnect</h2>
        <p>Where Care Meets Convenience!</p>
      </div>

      <div className="vertical-line"></div>

      <div className="right-side">
        <h2 className="signup-title">SIGN UP</h2>
        <p className="subtitle">FOR YOUR ACCOUNT</p>
        <form onSubmit={handleSubmit} className="signup-form">
          <p className="otp-message">OTP is sent to your email</p>
          <div className="otp-input-group">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={otp[index]}
                onChange={(e) => handleChange(index, e.target.value)}
                ref={(el) => (inputRefs.current[index] = el)}
                className={`otp-input ${errors.otp ? "error" : ""}`}
              />
            ))}
          </div>
          {errors.otp && <span className="error-message">{errors.otp}</span>}
          {/* <p className="resend-otp" onClick={handleResendOTP}>
            Resend OTP
          </p> */}
          <button type="submit" className="otp-btn">
            CONFIRM
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPChange;