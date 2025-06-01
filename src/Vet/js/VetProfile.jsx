import React, { useState, useEffect } from 'react';
import VetSidebar from './VetSidebar';
import VetHeader from './HeaderD';
import "../css/VetProfile.css";
import profile from "../images/logo.png";
import axios from 'axios';
import { data, useNavigate } from "react-router-dom";
import { Star, Camera } from 'lucide-react';


const VetProfile = () => {
  const navigate = useNavigate();
  const [vetData, setVetData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);


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
    const fetchData = async () => {
      const token = localStorage.getItem('authToken');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const userId = decodedToken.userId;

        // Fetch vet profile data
        const profileResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/vets/${userId}`, { headers });
        if (!profileResponse.ok) throw new Error('Failed to fetch vet data');
        const profileData = await profileResponse.json();
        setVetData(profileData.data);

        // Fetch reviews data
        const reviewsResponse = await axios.get(`${process.env.REACT_APP_BASE_URL}/vet/${userId}/getreviews`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const reviewsData = reviewsResponse.data;
        
        // Filter to show only enabled reviews
        const enabledReviews = reviewsData.reviews.filter(review => !review.Disable);
        setReviews(enabledReviews);
        setAverageRating(reviewsData.averageRating || 0);

      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);



  const uploadProfilePicture = async (file) => {
    const token = localStorage.getItem('authToken');
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const userId = decodedToken.userId;
  
    const formData = new FormData();
    formData.append('profilePicture', file);
  formData.forEach((value, key) => {
    console.log(`${key}:`, value);
  });
  
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/vets/${userId}/profile-picture`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      console.log('Response data:', response.data);
  
      if (response.data.success) {
        // Refetch the vet data to get the updated profile picture
        const profileResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/vets/${userId}`, { 
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!profileResponse.ok) throw new Error('Failed to fetch updated vet data');
        const profileData = await profileResponse.json();
        setVetData(profileData.data);
      }
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  };
console.log(vetData)

  // Add this function
  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setSelectedFile(file);
  //     uploadProfilePicture(file);
  //   }
  // };
    const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    console.log("Selected file:", file);  // ✅ Log to confirm
    uploadProfilePicture(file);
  }
};
  








  const handleEditProfile = () => {
    navigate('/VetEditProfile');
  };

  if (loading) return (
    <div className="container">
      <VetSidebar />
      <div className="main">
        <VetHeader />
        <div className="loading-message">Loading profile data...</div>
      </div>
    </div>
  );

  if (error) return (
    <div className="container">
      <VetSidebar />
      <div className="main">
        <VetHeader />
        <div className="error-message">Error: {error}</div>
      </div>
    </div>
  );

  if (!vetData) return (
    <div className="container">
      <VetSidebar />
      <div className="main">
        <VetHeader />
        <div className="error-message">No vet data found</div>
      </div>
    </div>
  );

  return (
    <div className="container">
      <VetSidebar />
      
      <div className="main">
        <VetHeader />
        
        <div className="profile-content-wrapper">
          <div className="profile-content">
            {/* Top Section */}
            <div className="profile-top-section">
              {/* Left: Profile Info */}
              <div className="profile-info">
                <div className="profile-image-container">
                <img
                  src={vetData.photo}
                  alt="Vet"
                  className="profile-image"
                />

                  <label htmlFor="profile-upload" className="edit-image-button">
                    <Camera className="camera-icon" />
                    <input
                      id="profile-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>

                

                <div className="profile-details">
                  <h2>Dr. {vetData.name}</h2>
                  <p className="vet-title">
                    {vetData.specialist || 'Veterinarian'} 
                    <span className="rating">
                      <Star className="star-icon" /> {averageRating}
                    </span>
                    <span className="review-count">({reviews.length} reviews)</span>
                  </p>
                  <p className="location">{vetData.location || 'Location not specified'}</p>
                  <div className="bio-box">
                    <p className="bio">
                      {vetData.description || "No description updated"}
                    </p>
                  </div>
                  <p className="rate">
                    Charge per hour: <span className="rate-amount">Nu. {vetData.chargePerHour || 'Not specified'}</span>
                  </p>
                </div>
              </div>

              {/* Right: Bank Type */}
              <div className="profile-actions">
                <button onClick={handleEditProfile} className="edit-profile-button">Edit Profile</button>
                <div className="bank-info">
                  <h4>Bank Information</h4>
                  <div className="bank-field">
                    <label>Email registered in Paypal</label>
                    <input type="text" value={vetData.AccountHolder_Name || "Not specified"} readOnly />
                  </div>
                </div>
              </div>
            </div>
            <div className="divider"></div>


            {/* Certifications Section */}
            <div className="certifications-section">
              <h4>Your Certification Details</h4>
              <div className="certification-images">
                {vetData.certifications && vetData.certifications.length > 0 ? (
                  vetData.certifications.map((cert, index) => (
                    <img
                      key={index}
                      src={cert}  
                      alt={`Certification ${index + 1}`}
                      className="certification-image"
                    />
                  ))
                ) : (
                  <p className="no-certifications">No certifications uploaded</p>
                )}
              </div>
            </div>

            <div className="divider"></div>

            {/* Reviews Section */}
            <div className="reviews-section">
              <div className="reviews-header">
                <h4>Rate and Reviews</h4>
                <div className="overall-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`star-icon ${i < Math.round(averageRating) ? 'filled' : ''}`} 
                    />
                  ))}
                  <span className="review-count">{reviews.length} reviews</span>
                </div>
              </div>
              
              <div className="reviews-grid">
                {reviews.length > 0 ? (
                  reviews.slice(0, 4).map((review) => (
                    <div className="review-card" key={review._id}>
                      <p className="review-text">"{review.comment}"</p>
                      <div className="review-meta">
                        <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16}
                            className={`star-icon ${i < review.rating ? 'filled' : ''}`}
                          />
                        ))}
                        </div>
                        <span className="reviewer">
                          {review.clientId?.name || 'Anonymous'}
                        </span>
                        <span className="review-date">
                          • {new Date(review.createdAt).toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-reviews">No reviews yet</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VetProfile;