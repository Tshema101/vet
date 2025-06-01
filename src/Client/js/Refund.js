import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import "../css/VetRegister.css";
const Refund = () => {
  const navigate = useNavigate();
    const location = useLocation();
  const appointment = location.state;
  const [formData, setFormData] = useState({
    appointmentId: appointment.appointment._id || '',
    appointmentDate: appointment.appointment.appointmentDate || '',
    appointmentTime: appointment.appointment.appointmentTime || '',
    name: '',
    phone: '',
    email: '',
    reasons: [],
 
    accountHolder: '',
    confirmation: false,
  });
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  console.log(appointment);
  const reasonsList = [
    'Change of Plans',
    'Emergency',
    'Found an Alternative Service',
    'Other',
  ];
 useEffect(() => {
    const token = localStorage.getItem('authToken');
    console.log(token)
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.name);
        setUserEmail(decoded.email);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

 useEffect(() => {
  if (location.state && location.state.appointment) {
    const appointment = location.state.appointment;
    setFormData((prevData) => ({
      ...prevData,
      appointmentId: appointment._id || '',
      appointmentDate: appointment.appointmentDate || '',
    }));
  }
}, [location.state]);
  console.log('Appointment ID:', formData.appointmentId);

  const validate = () => {
    let newErrors = {};


    if (formData.reasons.length === 0) newErrors.reasons = 'Select at least one reason';

    if (!formData.accountHolder.trim()) newErrors.accountHolder = 'Paypal email is required';
    if (!formData.confirmation) newErrors.confirmation = 'You must confirm before submitting';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'confirmation') {
      setFormData({ ...formData, [name]: checked });
    } else if (name === 'reasons') {
      const updatedReasons = checked
        ? [...formData.reasons, value]
        : formData.reasons.filter((reason) => reason !== value);
      setFormData({ ...formData, reasons: updatedReasons });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const cancellationReasonString = Array.isArray(formData.reasons)
  ? formData.reasons.join(', ')
  : formData.reasons;

const handleSubmit = async (e) => {
  e.preventDefault();
  const isValid = validate();
  if (isValid) {
    try {
      const response = await fetch('https://vetserver.onrender.com/refund', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          appointmentId: formData.appointmentId,
          appointmentDate: formData.appointmentDate,
          name: userName,
          email: userEmail,
          cancellationReason: cancellationReasonString,  // changed from 'reasons' to match backend
       accountHolderName: formData.accountHolder,
        }),
      });
      console.log('Response:', response);

      const result = await response.json();

      if (response.ok) {
        // setSuccessMessage(result.message);
        setShowPopup(true);
        setFormData({
          appointmentId: '',
          appointmentDate: '',
          appointmentTime: '',
          name: '',
          phone: '',
          email: '',
          reasons: [],
          accountHolder: '',
          confirmation: false,
        });
        setErrors({});
      } else {
        // setSuccessMessage('');
        setShowPopup(false);
        alert(result.message || 'Something went wrong!');
      }
    } catch (err) {
      console.error('Submission error:', err);
      alert('Failed to submit refund request.');
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
      height: '280px',	
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
    <div style={{ top: '0', width: '100%' }}>
      <Navbar />

      <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", width: "90%", margin: "0 auto", marginTop: "100px" }} className="refund-container">
        <h2 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "10px" }}>
          Appointment Rescheduling & Cancellation (Refund Process)
        </h2>

        {/* Policy Section */}
        <div style={{ border: "1px solid #A59185", padding: "15px", borderRadius: "3px", marginBottom: "20px", fontSize:isMobile?'12px':  "13px", lineHeight: "2", height:isMobile?'600px': "400px" }} className="policy-section" >
          <p><strong>Once a user books an appointment, they can cancel or reschedule within the following conditions:</strong></p>
          <ul style={{ paddingLeft: "20px", marginTop: "5px" }}>
            <li>Once the user book an appointment they can reschedule the appointment within the two days according to the availability of the particular vet they made an appointment with.</li>
            <li>Cancel 3 days before the appointment → Eligible for 100% refund (Requires filling out a refund request form).</li>
            <li>Cancel 1 day before the appointment → Eligible for 50% refund (Requires filling out a refund request form).</li>
            <li>No-show on the appointment day → No refund available.</li>
          </ul>
          <p><strong>Steps for Cancelling an Appointment:</strong></p>
          <ol style={{ paddingLeft: "20px" }}>
            <li>Select the Appointment – Choose the appointment you wish to cancel.</li>
            <li> Cancellation Request –
                <ul>– If it is within 3 days before the appointment, a Refund Request Form will appear.</ul>
                <ul>– If it is 1 day before the appointment, a partial refund request form will appear.</ul>
                <ul>– If it is on the appointment day, cancellation will be possible, but no refund will be issued.
                </ul>
                </li>
            <li>Submit Refund Request – If eligible, fill out the refund form with your details, including:
            –Booking ID
            –Payment details
            –Reason for cancellation</li>

            <li>Processing Time – Refunds will be processed within 5-7 days after submission.</li>

          </ol>
        </div>

        {/* Form Section */}
        <div style={{ border: "1px solid #A59185", padding: "15px", borderRadius: "3px", fontSize: "13px", lineHeight: "2", marginTop: "40px" }}>
          <h3 style={{ fontSize: "23px", fontWeight: "bold", marginBottom: "15px" }}>Refund Request Form</h3>
          <form onSubmit={handleSubmit}>
          <h3 style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "15px" }}>Appointment Details:</h3>

            {/* Appointment Details */}
            <div style={{ display: 'flex', flexDirection:isMobile?'column': 'row', justifyContent: 'space-between', marginBottom: "15px" }}>
              <div style={{ width:isMobile?'100%': '48%' }}>
                <label>Appointment ID:</label><br />
                <input
                  type="text"
                  name="appointmentId"
                    placeholder="Appointment ID"
                  value={appointment.appointment._id}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "8px", marginBottom: "5px", height:"50px", borderRadius:"5px", border:"1px solid #ccc" }}
                />
                {errors.appointmentId && <span style={{ color: "red", fontSize:"12px" }}>{errors.appointmentId}</span>}
              </div>
              <div style={{ width: isMobile?'100%':'48%' }}>
              <label>Appointment Date:</label><br />
            <input
            type="text"
            name="appointmentDate"
            value={new Date(appointment.appointment.appointmentDate).toLocaleDateString()}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginBottom: "5px", height:"50px", borderRadius:"5px", border:"1px solid #ccc" }}
            />
            {errors.appointmentDate && <span style={{ color: "red" , fontSize:"12px"}}>{errors.appointmentDate}</span>}
                        </div>
                           
            </div>
 <div style={{ width:isMobile?'100%': '48%' }}>
              <label>Appointment Time:</label><br />
            <input
            type="text"
            name="appointment Time"
            value={appointment.appointment.appointmentTime}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginBottom: "5px", height:"50px", borderRadius:"5px", border:"1px solid #ccc" }}
            />
            {errors.appointmentDate && <span style={{ color: "red" , fontSize:"12px"}}>{errors.appointmentDate}</span>}
                        </div>


            <h3 style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "15px" }}>User Information:</h3>

            {/* Personal Details */}
            <div style={{ display: 'flex', flexDirection:isMobile?'column': 'row',justifyContent: 'space-between', marginBottom: "15px" }}>

            <div style={{ marginBottom: "15px", width:isMobile?'100%': '48%' }}>
              <label>Name:</label><br />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={userName}
                onChange={handleChange}
                style={{ width: "100%", padding: "8px", marginBottom: "5px", height:"50px", borderRadius:"5px", border:"1px solid #ccc" }}
              />
              {errors.name && <span style={{ color: "red" , fontSize:"12px"}}>{errors.name}</span>}
            </div>
        

           <div style={{ marginBottom: "15px" , width: isMobile?'100%':'48%'}}>
              <label>Email:</label><br />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={userEmail}
                onChange={handleChange}
                style={{ width: "100%", padding: "8px", marginBottom: "5px", height:"50px", borderRadius:"5px", border:"1px solid #ccc" }}
              />
              {errors.email && <span style={{ color: "red", fontSize:"12px" }}>{errors.email}</span>}
            </div>
            </div>
            
         

            {/* Reasons */}
            <div style={{ marginBottom: "15px" }}>
          <h3 style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "15px" }}>Cancellation Reasons:</h3>

              {/* <label>Reasons for Refund:</label><br /> */}
              <div style={{alignItems:"left", marginLeft:"10px",gap:"10px"}}>
              {reasonsList.map((reason) => (
                <div key={reason} style={{marginTop: "20px"}}>
                  <input
                    type="checkbox"
                    name="reasons"
                    value={reason}
                    checked={formData.reasons.includes(reason)}
                    onChange={handleChange}
                  />{" "}
                  {reason}
                </div>
              ))}
              {errors.reasons && <span style={{ color: "red", fontSize:"12px" }}>{errors.reasons}</span>}
              </div>
            </div>


            <h3 style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "-40px" }}>Payment Details for Refund:</h3>

            {/* Bank Details */}
            <div style={{ marginBottom: "5px", width: isMobile?'100%':'48%' , height:"50px"}}>
         </div>
            <div style={{ marginBottom: "15px" }}>
              <label>Paypal Email:</label><br />
              <input
                type="text"
                name="accountHolder"
                placeholder="Paypal Email"
                value={formData.accountHolder}
                onChange={handleChange}
                style={{ width:isMobile?'100%': "48%", padding: "8px", marginBottom: "5px" , height:"50px", borderRadius:"5px", border:"1px solid #ccc"}}
              />
              {errors.accountHolder && <span style={{ color: "red", fontSize:"12px" }}>{errors.accountHolder}</span>}
            </div>

            {/* Confirmation */}
            <div style={{ marginBottom: "15px", marginTop: "30px", fontStyle: "italic" , color:"grey"}}>
              <input
                type="checkbox"
                name="confirmation"
                checked={formData.confirmation}
                onChange={handleChange}
              />{" "}
              I confirm that the above details are correct.
              {errors.confirmation && <div style={{ color: "red", fontSize:"12px" }}>{errors.confirmation}</div>}
            </div>

            {/* Submit */}
      <button
        type="submit"
        // onClick={() => setShowPopup(true)}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#0c2d48',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          margin: '0 auto',
            display: 'block',
            width:"120px",
            marginBottom:"40px",
            marginTop:"30px",
            fontweight:"bold",
            fontSize:"16px",
        }}
      >
        Submit
      </button>

            {/* Success Message */}
            {successMessage && <div style={{ color: "green", marginTop: "15px" }}>{successMessage}</div>}
          </form>
        </div>
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
            <p className="popup-text"> Your refund request has been submitted successfully. It will be processed within 5 to 7 business days. 
              Thank you for your patience. </p>
            <button 
        onClick={() => {
              setShowPopup(false);
              navigate('/Myappointment');
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


      <Footer />
    </div>
  );
};

export default Refund;
