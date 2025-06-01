// src/components/RateVetForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../css/VetRegister.css'; 

const RateVetForm = ({ vetId }) => {
    const navigate = useNavigate();
  const [selectedStars, setSelectedStars] = useState(0);
  const [formData, setFormData] = useState({ review: "" });
   const [showPopup, setShowPopup] = useState(false);

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


  const handleStarClick = (star) => {
    setSelectedStars(star);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("You must be logged in to leave a review.");
      return;
    }

    try {
      const response = await axios.post(
        `https://vetserver.onrender.com/vet/${vetId}/review`,
        {
            
          rating: selectedStars,
          comment: formData.review,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // alert("Review submitted successfully!");
      setFormData({ review: "" });
      setSelectedStars(0);

   
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Failed to submit review.");
    }
  };

  return (
    <div
      style={{
        border: '1px solid #ddd',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '60px',
        marginTop: '50px',
      }}
    >
      <div style={{ marginBottom: '15px' }}>
        <div style={{ fontStyle: 'italic', fontWeight: '600', marginBottom: '3px' }}>
          Rate this Vet
        </div>
        <div style={{ fontSize: '12px', color: 'grey', marginBottom: '10px' }}>
          Tell others what you think about this Vet.
        </div>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleStarClick(star)}
              style={{
                cursor: 'pointer',
                fontSize: '36px',
                color: selectedStars >= star ? '#6DC5EE' : '#ccc',
                transition: 'color 0.3s',
              }}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <div style={{ fontStyle: 'italic', marginBottom: '15px' }}>Write a Review</div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        <div style={{ flex: '1 1 100%' }}>
          <label style={{ fontSize: '12px', fontWeight: 'bold' }}>
            Review<span style={{ color: 'red' }}>*</span>
          </label>
          <textarea
            name="review"
            value={formData.review}
            onChange={handleInputChange}
            placeholder="Write your review..."
            required
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '12px',
              marginTop: '5px',
              minHeight: '80px',
            }}
          />
        </div>
        <div style={{ flex: '1 1 100%', textAlign: 'right' }}>
          <button
          onClick={() => setShowPopup(true)}
            type="submit"
            style={{
              background: '#062b46',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 20px',
              fontSize: '13px',
              cursor: 'pointer',
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            }}
          >
            Send
          </button>
        </div>
      </form>

      {showPopup && (
    <div style={popupStyles.overlay}>
    <div style={popupStyles.box}>
      <div style={popupStyles.tickAnimation}>
        <svg viewBox="0 0 52 52" style={popupStyles.svg}>
          <circle style={popupStyles.circle} cx="25" cy="26" r="24" />
          <path style={popupStyles.check} fill="none" d="M14,27 L22,35 L38,19" />
        </svg>
      </div>
            <p className="popup-text">Review submitted successfully!</p>
            <button onClick={() => setShowPopup(false)} style={{  
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

export default RateVetForm;
