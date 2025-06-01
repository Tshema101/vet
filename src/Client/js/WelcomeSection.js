

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/WelcomeSection.css'; // Import your CSS file for styling
import { isBrowser } from 'framer-motion';

const WelcomeSection = () => {
  const [animate, setAnimate] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add logged in state
  const navigate = useNavigate();


  // Function to check auth status
  const checkAuth = () => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    // Initial auth check
    checkAuth();

    // Set up animation interval
    const interval = setInterval(() => {
      setAnimate(false);
      setTimeout(() => setAnimate(true), 100);
    }, 9000);

    // Set initial animation
    setAnimate(true);

    // Listen for storage changes (for cross-tab sync)
    const handleStorageChange = (e) => {
      if (e.key === 'authToken') {
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className="welcome-container" style={{ position: 'relative', zIndex: 1 }}>
      <h1 className={`welcome-title ${animate ? 'slide-left' : ''}`} style={{ fontSize: '1.1rem', fontWeight: 'bold', color:"#011523", marginBottom: '1.5rem', backgroundColor: 'white', padding: '7px 15px ', borderRadius: '5px', fontFamily:"times new romen", width: 'fit-content', marginTop: '20px' }}>
        Welcome To VetConnect!
      </h1>
      <h2 className={`welcome-subtitle ${animate ? 'slide-left' : ''}`} style={{ fontSize: '4rem', marginBottom: '2rem', color:"white", fontFamily:"times new romen", fontWeight: 'bold'}}>
        "Where Care Meets Convenience."
      </h2>

      {!isLoggedIn && (
        <div className={`welcome-buttons ${animate ? 'slide-left' : ''}`} style={{ marginTop: '2rem', display: 'flex', justifyContent: 'left', gap:"1rem"}}>
          <button
            style={{ backgroundColor: '#113047', color: 'white', border:"none", padding: '0.8rem 1.5rem', fontSize: '0.95rem', borderRadius:"5px", cursor:"pointer", transition:"background-color 0.3s", boxShadow:"0 4px 8px rgba(0, 0, 0, 0.3)", fontWeight:"bold" }}
            onClick= {() => navigate('/client')}
          >
            Book an Appointment
          </button>
          <button
            style={{ backgroundColor: 'white', border: '2px solid #6DC5EE', color: '#3498db', padding: '0.8rem 1.5rem', borderRadius: '5px', fontSize: '0.95rem', cursor: 'pointer', transition: 'all 0.3s', boxShadow:"0 4px 8px rgba(0, 0, 0, 0.2)" , fontWeight:"bold"}}
            onClick={() => navigate('/VetRegistration')}
          >
            Register as Vet
          </button>
        </div>
      )}
    </div>
  );
};

export default WelcomeSection;