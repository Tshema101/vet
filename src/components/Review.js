
import { useState, useEffect } from "react";
import "./styles/Review.css";
import { FaPen } from "react-icons/fa";
import { jwtDecode } from 'jwt-decode';

const Review = () => {
  const [formData, setFormData] = useState({ review: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
      const response = await fetch("http://localhost:8080/addTestimonial", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Review: formData.review })
      });

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

  if (!isLoggedIn) {
    return (
      <div className="review-section">
        <h2 className="review-title"> Review</h2>
        <p style={{ fontSize: "1.2rem", color: "gray" }}>Please log in to submit a testimonial.</p>
      </div>
    );
  }

  return (
    <div className="review-section" style={{ width: "100%", }}>
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
            <button type="submit" className="submit-review-btn">
              Send
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Review;