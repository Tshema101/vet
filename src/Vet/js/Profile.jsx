import React from 'react';
import { Camera } from 'lucide-react';
import "../css/style.css";

const Profile = () => {
  return (
    <div className="profile">
      <div className="profile-header">
        <div className="profile-image-container">
          <img 
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300"
            alt="Dr. Sonam Gyeltshen"
            className="profile-image"
          />
          <button className="camera-btn">
            <Camera size={20} />
          </button>
        </div>
        
        <div className="profile-info">
          <div className="profile-header-top">
            <h1>Dr. Sonam Gyeltshen</h1>
          </div>
          <div className="credentials-rating">
            <p className="credentials">Veterinarian, MRCVS</p>
            <div className="rating">
                <span className="stars">⭐ 4.1</span>
                <span className="reviews">39 reviews</span>
            </div>
            </div>

          <p className="location">Kawajangsa, Thimphu, Bhutan</p>
        </div>
      </div>

      <div className="profile-bio">
        <h2>Hi!</h2>
        <p>My name is Sonam, I qualified as a vet in 2016 from Edinburgh University, went on to work in small animal practice and then to complete a masters at the Royal Veterinary College in wild animal health.</p>
      </div>

      <div className="charge-info">
        <h3>Charge per hour:</h3>
        <p>Nu. 500</p>
      </div>
    </div>
  );
};

export default Profile;