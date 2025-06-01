import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VetSidebar from './VetSidebar';
import VetHeader from './Header';
import { Star } from 'lucide-react';
import "../css/VetReview.css";
import axios from 'axios';

const VetReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Token verification
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

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const vetId = decodedToken.userId;

        const response = await axios.get(`http://localhost:8080/vet/${vetId}/getreviews`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = response.data;
        setReviews(data.reviews);
        setAverageRating(data.averageRating || 0);
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <div className="container">Loading reviews...</div>;
  if (error) return <div className="container">Error: {error}</div>;

  return (
    <div className="container">
      <VetSidebar />
      <div className="main">
        <VetHeader />
        <div className="reviews-content-wrapper">
          <div className="reviews-content">
            <div className="reviews-header">
              <h1>Reviews</h1>
              <div className="rating-overview">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`star-icon ${i < Math.round(averageRating) ? 'filled' : ''}`} 
                    />
                  ))}
                </div>
                <span className="rating-text">
                  {averageRating} <span className="review-count">{reviews.length} reviews</span>
                </span>
              </div>
            </div>

            <div className="reviews-grid">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div className="review-card" key={review._id}>
                    <p className="review-text">"{review.comment}"</p>
                    <div className="review-footer">
                      <div className="reviewer-info">
                        <div>
                          <p className="reviewer-name">
                            {review.clientId?.name || 'Anonymous'}
                          </p>
                          <p className="review-date">
                            {new Date(review.createdAt).toLocaleDateString('en-US', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="review-rating">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16}
                            className={`star-icon ${i < review.rating ? 'filled' : ''}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-reviews">
                  No reviews yet
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VetReviews;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import VetSidebar from './VetSidebar';
// import VetHeader from './Header';
// import { Star } from 'lucide-react';
// import "../css/VetReview.css";
// import axios from 'axios';

// const VetReviews = () => {
//   const [reviews, setReviews] = useState([]);
//   const [averageRating, setAverageRating] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [toggleStates, setToggleStates] = useState({});
//   const [message, setMessage] = useState('');
//   const [confirmationVisible, setConfirmationVisible] = useState(false);
//   const [currentReviewId, setCurrentReviewId] = useState(null);
//   const [currentToggleState, setCurrentToggleState] = useState(null);
//   const navigate = useNavigate();

//   // First useEffect for token verification
//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     if (!token) {
//       navigate('/');
//       return;
//     }
//     try {
//       JSON.parse(atob(token.split('.')[1]));
//     } catch (error) {
//       console.error("Error decoding token:", error);
//       navigate('/');
//     }
//   }, [navigate]);

//   // Fetch reviews with toggle states
//   const fetchReviews = async () => {
//     const token = localStorage.getItem('authToken');
//     if (!token) return;

//     try {
//       const decodedToken = JSON.parse(atob(token.split('.')[1]));
//       const vetId = decodedToken.userId;

//       const response = await axios.get(`http://localhost:8080/vet/${vetId}/getreviews`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       const data = response.data;
//       setReviews(data.reviews);
//       setAverageRating(data.averageRating || 0);

//       // Initialize toggle states
//       const toggles = {};
//       data.reviews.forEach(review => {
//         toggles[review._id] = !review.Disable; // If Disable is false → ON
//       });
//       setToggleStates(toggles);
//     } catch (err) {
//       setError(err.message);
//       console.error("Fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Second useEffect for fetching reviews
//   useEffect(() => {
//     fetchReviews();
//   }, []);

//   // Show confirmation dialog
//   const showConfirmation = (id, currentState) => {
//     setCurrentReviewId(id);
//     setCurrentToggleState(currentState);
//     setConfirmationVisible(true);
//   };

//   // Hide confirmation dialog
//   const hideConfirmation = () => {
//     setConfirmationVisible(false);
//     setCurrentReviewId(null);
//     setCurrentToggleState(null);
//   };

//   // Handle toggle after confirmation
//   const handleConfirmedToggle = async () => {
//     if (!currentReviewId) return;
    
//     const token = localStorage.getItem('authToken');
    
//     try {
//       // Note: We're sending the OPPOSITE of currentToggleState because:
//       // - If toggle is ON (true), we want to DISABLE (false)
//       // - If toggle is OFF (false), we want to ENABLE (true)
//       const response = await axios.put(
//         `http://localhost:8080/disableReview/${currentReviewId}`,
//         { Disable: currentToggleState }, // This is the key fix
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
  
//       // Update the toggle state in UI
//       setToggleStates(prev => ({
//         ...prev,
//         [currentReviewId]: !currentToggleState
//       }));
  
//       setMessage(`Review ${!currentToggleState ? 'shown' : 'hidden'} successfully`);
//       setTimeout(() => setMessage(''), 3000);
      
//       // Optional: Refresh reviews from server
//       await fetchReviews();
//     } catch (err) {
//       console.error("Toggle failed:", err.response?.data || err.message);
//       setMessage("Failed to update - please refresh");
//       setTimeout(() => setMessage(''), 3000);
//     } finally {
//       hideConfirmation();
//     }
//   };


//   if (loading) return <div className="container">Loading reviews...</div>;
//   if (error) return <div className="container">Error: {error}</div>;

//   return (
//     <div className="container">
//       <VetSidebar />
      
//       <div className="main">
//         <VetHeader />
        
//         <div className="reviews-content-wrapper">
//           <div className="reviews-content">
//             {/* Rating Overview */}
//             <div className="reviews-header">
//               <h1>Reviews</h1>
//               {message && <div className="status-message">{message}</div>}
//               <div className="rating-overview">
//                 <div className="stars">
//                   {[...Array(5)].map((_, i) => (
//                     <Star 
//                       key={i} 
//                       className={`star-icon ${i < Math.round(averageRating) ? 'filled' : ''}`} 
//                     />
//                   ))}
//                 </div>
//                 <span className="rating-text">
//                   {averageRating} <span className="review-count">{reviews.length} reviews</span>
//                 </span>
//               </div>
//             </div>

//             {/* Confirmation Modal */}
//             {confirmationVisible && (
//               <div className="modal-overlay">
//                 <div className="confirmation-modal">
//                   <h3>Are you sure you want to {currentToggleState ? 'hide' : 'show'} this review?</h3>
//                   <div className="modal-buttons">
//                     <button className="update-btn" onClick={handleConfirmedToggle}>
//                       Yes
//                     </button>
//                     <button className="cancel-btn" onClick={hideConfirmation}>
//                       No
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Review Cards */}
//             <div className="reviews-grid">
//               {reviews.length > 0 ? (
//                 reviews.map((review) => (
//                   <div className="review-card" key={review._id}>
//                     <label className="toggle-switch">
//                       <input
//                         type="checkbox"
//                         checked={toggleStates[review._id] || false}
//                         onChange={() => showConfirmation(review._id, toggleStates[review._id])}
//                       />
//                       <span className="slider round"></span>
//                     </label>

//                     <p className="review-text">"{review.comment}"</p>
                    
//                     <div className="review-footer">
//                       <div className="reviewer-info">
//                         <div>
//                           <p className="reviewer-name">
//                             {review.clientId?.name || 'Anonymous'}
//                           </p>
//                           <p className="review-date">
//                             {new Date(review.createdAt).toLocaleDateString('en-US', {
//                               day: 'numeric',
//                               month: 'short',
//                               year: 'numeric'
//                             })}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="review-rating">
//                         {[...Array(5)].map((_, i) => (
//                           <Star 
//                             key={i} 
//                             size={16}
//                             className={`star-icon ${i < review.rating ? 'filled' : ''}`}
//                           />
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="no-reviews">
//                   No reviews yet
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VetReviews;
