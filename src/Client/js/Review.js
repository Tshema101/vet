
import { useState, useEffect } from "react";
import "../css/Review.css";
import { FaPen } from "react-icons/fa";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import "../css/VetRegister.css";

const Review = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({ review: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
   const [showPopup, setShowPopup] = useState(false);

   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const verifyToken = () => {
      const token = localStorage.getItem("authToken"); // Now using "authToken" consistently
      
      if (!token) {
        setIsLoggedIn(false);
        setIsLoading(false);
        return;
      }

      try {
        // Verify if token is valid
        jwtDecode(token);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("authToken");
        setIsLoggedIn(false);
      }
      
      setIsLoading(false);
    };

    verifyToken();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken"); // Changed to "authToken"

    if (!token) {
      setApiError("No authentication token found. Please log in again.");
      return;
    }

    try {
      const response = await fetch("https://vetserver.onrender.com/addTestimonial", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Review: formData.review })
      });
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 2000); // Hide popup after 3 seconds
      const responseData = await response.json();
      console.log(responseData);

      if (response.ok) {
        setSubmitted(true);
        setFormData({ review: "" });
      } else {
        setApiError(responseData.error || "Submission failed");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      setApiError("An error occurred. Please try again later.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  
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


  if (!isLoggedIn) {
    return (
      <div className="review-section" >
        <h2 className="review-title"> Review</h2>
        <form>
        <div className="right-field" >
            <div className="form-group">
              <label htmlFor="review" style={{fontSize: "12px"}}>
                Write your Testimony*
                <FaPen style={{ marginLeft: "5px", color: "#0d3b5f" }} />
              </label>
              <textarea
                id="review"
                name="review"
                style={{ marginTop: "5px",marginBottom:"20px", height: "100px", width: "1000px", padding: "20px", borderRadius: "5px", border: "1px solid #ccc" }}
                value={formData.review}
                onChange={handleChange}
                placeholder="Write your review here..."
                required
              />
            </div>
            {apiError && <p style={{ color: "red" }}>{apiError}</p>}
            <button type="submit" className="submit-review-btn" style={{backgroundColor: "gray"}} disabled   onClick={handleSubmit}>
              Send
            </button>
          </div>
        </form>
        <p style={{ fontSize: "1rem", color: "gray", marginTop:"-2rem", fontStyle:"italic" }}>Please login to submit a testimonial.</p>

      </div>
    );
  }

  return (
    <div className="review-section" style={{ width: "100%", marginBottom: "40px", marginTop: "30px" }}>
      <h2 className="review-title">Review</h2>

      {submitted ? (
        <div className="review-success">
          <p>Thank you for your testimonial!</p>
        </div>
      ) : (
        <form className="review-form" onSubmit={handleSubmit}>
          <div className="right-field">
            <div className="form-group">
              <label htmlFor="review" style={{fontSize: "12px"}}>
                Write your Testimony*
                <FaPen style={{ marginLeft: "5px", color: "#0d3b5f" }} />
              </label>
              <textarea
                id="review"
                name="review"
                style={{ marginTop: "5px",marginBottom:"20px", height: "100px", width: "1000px", padding: "20px", borderRadius: "5px", border: "1px solid #ccc" }}
                value={formData.review}
                onChange={handleChange}
                placeholder="Write your review here..."
                required
              />
            </div>
            {apiError && <p style={{ color: "red" }}>{apiError}</p>}
            <button style={{width:"150px"}} type="submit" className="submit-review-btn">
              Send
            </button>
          </div>
        </form>
      )}


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

export default Review;
