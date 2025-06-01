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

        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/vet/${vetId}/getreviews`, {
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

  // if (loading) return <div className="container">Loading reviews...</div>;
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

