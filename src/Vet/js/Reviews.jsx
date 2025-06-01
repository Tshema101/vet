import React from "react";
import VetHeader from "./Header"; // Import VetHeader
import VetSidebar from "./VetSidebar"; // Import VetSidebar
import "../css/style.css";

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      text: "She was quick and everything suggested helped my dog Luma! many many thanks!",
      rating: 3,
      author: "Karma Dorji",
      date: "20 Feb 2025"
    },
    {
      id: 2,
      text: "She was very caring and knowledgeable. Highly recommend!",
      rating: 5,
      author: "Sonam Wangmo",
      date: "15 Mar 2025"
    }
  ];

  const renderStars = (rating) => {
    return '⭐'.repeat(rating);
  };

  return (
    <div className="app-container flex h-screen">
      <VetSidebar /> {/* Sidebar for navigation */}
      <div className="flex-1 flex flex-col">
        <VetHeader /> {/* Header at the top */}
        <div className="reviews p-6">
          <div className="reviews-header mb-4">
            <h2 className="text-2xl font-bold">Rate and Reviews</h2>
          </div>

          <div className="reviews-grid grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((review) => (
              <div key={review.id} className="review-card bg-white p-4 rounded-lg shadow-md">
                <p className="review-text text-gray-700">{review.text}</p>
                <div className="review-footer flex justify-between items-center mt-3">
                  <div className="review-rating text-yellow-500 text-lg">{renderStars(review.rating)}</div>
                  <div className="review-author flex items-center">
                    <img 
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=40&h=40" 
                      alt={review.author} 
                      className="author-avatar rounded-full mr-2"
                    />
                    <div className="author-info">
                      <span className="author-name font-semibold">{review.author}</span>
                      <span className="review-date text-sm text-gray-500">{review.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
