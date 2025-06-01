import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
// import axios from 'axios'; 
import '../css/otp.css'; 
import logo from '../Images/logo.png';
import "../css/VetRegister.css"
const OTPForm = () => { 
  const location = useLocation();
  const { email } = location.state || {};
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']); 
  const [errors, setErrors] = useState({});
  const inputRefs = useRef([]); 
  const [showPopup, setShowPopup] = useState(false); // State for showing the popup

  const validateForm = () => {
    let newErrors = {};

   
    const otpValue = otp.join('');

    // OTP validation
    if (!otpValue.trim()) {
      newErrors.otp = 'OTP is required';
    } else if (!/^\d{6}$/.test(otpValue)) {
      newErrors.otp = 'OTP must be 6 digits';
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

    // Clear the error for the field if the input becomes valid
    if (errors.otp) {
      let newErrors = { ...errors };
      if (/^\d{6}$/.test(newOtp.join(''))) {
        delete newErrors.otp;
      }
      setErrors(newErrors);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear any previous errors
  
    if (validateForm()) {
      const otpValue = otp.join(''); // Combine OTP fields into a single string
  
      try {
        // Send OTP and email to the backend for verification
        const response = await fetch('https://vetserver.onrender.com/verify-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, otp: otpValue }), // Send email and OTP as JSON
        });
  
        if (response.ok) {
          // OTP verified successfully
          const data = await response.json(); // Parse the success response
          setShowPopup(true); // Show the success popup
          // setTimeout(() => {
          //   setShowPopup(false); // Hide the popup after 2 seconds
          // }, 2000);
          console.log('OTP Verified:', data.message);
          // navigate('/login'); // Navigate to the login page after successful OTP verification
        } else {
          // Handle invalid OTP or expired OTP
          const errorData = await response.json(); // Parse the error response
          setErrors({ otp: errorData.error || 'Invalid OTP, please try again' });
        }
      } catch (error) {
        console.error('Error verifying OTP:', error);
        setErrors({ otp: 'Something went wrong. Please try again later.' });
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
    <div className="otp-container">
      <div className="left-side">
        <img src={logo} alt="VetConnect Logo" className="logo" />
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
                ref={(el) => (inputRefs.current[index] = el)} // Assign ref to each input
                className={`otp-input ${errors.otp ? 'error' : ''}`}
              />
            ))}
          </div>
          {errors.otp && <span className="error-message">{errors.otp}</span>}
          <p className="resend-otp">
            {/* <a href="#resend">Resend OTP</a> */}
          </p>
          <button type="submit" className="otp-btn" onClick={handleSubmit}>CONFIRM</button>
        </form>
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
            <p >OTP verified successfully!</p>
            <button onClick={() => navigate('/login')} style={{ padding: '10px 20px', backgroundColor: '#113047', color: 'white', fontSize: '16px', width: '100px', borderRadius: '20px', cursor: 'pointer', marginTop: '20px' }}>
              OK
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default OTPForm;
