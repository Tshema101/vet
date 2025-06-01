import React, { useState } from 'react';
import "../css/style.css";

const ReviewCard = ({ text, author, date }) => {
  const [isActive, setIsActive] = useState(true);

  const toggleActive = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <div className="review-card">
      <p className="review-text">{text}</p>
      <div className="review-footer">
        <div className="review-author">
          <div className="author-avatar">
            {author.charAt(0)}
          </div>
          <div className="author-info">
            <span className="author-name">{author}</span>
            <span className="review-date">{date}</span>
          </div>
        </div>
        
        {/* Swipe toggle button */}
        <div className={`toggle-switch ${isActive ? 'active' : 'inactive'}`} onClick={toggleActive}>
          <div className="switch-handle" />
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
