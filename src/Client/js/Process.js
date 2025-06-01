
import React, { useEffect, useState } from 'react';
import p1 from "../Images/p1.png";
import p2 from "../Images/p2.png";
import p3 from "../Images/p3.png";

const VetCareSteps = () => {
     const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

  const stepStyle = { display: "flex", marginBottom: "60px", position: "relative" };
  const circleStyle = {
    minWidth: "40px",
    height: "40px",
    backgroundColor: "#002B45",
    borderRadius: "50%",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "60px",
    fontWeight: "bold",
    zIndex: 1,
  };
  const lineStyle = {
    position: "absolute",
    top: "48px",
    left: "20px",
    width: "1px",
    height: "70px",
    backgroundColor: "#806E63",
    zIndex: 0,
  };

  const styles = {
    policySection: {
      marginTop: isMobile?'1rem':'0.1rem',
      padding: '1.5rem',
      backgroundColor: '#fff',
      borderRadius: '5px',
      border: '1px solid rgb(228, 228, 228)',
      width: isMobile?'70%':'100%',
      maxWidth: '500px',
      marginBottom: "2rem",
      marginLeft:isMobile?'80px':'0'
    },
    policyTitle: {
      fontSize:isMobile?'1rem': '1.2rem',
      color: '#2c3e50',
      marginBottom: '1rem',
      fontWeight: 'bold',
      fontStyle: 'italic',
    },
    policyItem: {
      marginBottom: '0.5rem',
      display: 'flex',
      alignItems: 'center'
    },
    policyText: {
      color: '#7f8c8d',
      marginLeft: '0.5rem'
    }
  };

  return (
    <div>
      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 1024px) {
          .responsive-container {
            flex-direction: column !important;
            gap: 40px !important;
          }

          .responsive-left, .responsive-right {
            flex: 1 1 100% !important;
            min-width: unset !important;
          }

          .responsive-image-container {
            height: auto !important;
            position: relative !important;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
          }

          .responsive-image-container img {
            position: relative !important;
            margin: 0 auto !important;
            width: 70% !important;
            height: auto !important;
            object-fit: cover;
          }

          .responsive-text p {
            width: 100% !important;
          }
        }
      `}</style>

      <div
        className="responsive-container"
        style={{
          display: "flex",
          gap: "150px",
          marginTop: "70px",
          justifyContent: "space-between",
          padding: "10px",
          fontFamily: "Arial, sans-serif",
          flexWrap: "wrap",
        }}
      >
        {/* Left Side Steps */}
        <div className="responsive-left" style={{ flex: "1", minWidth: "200px" }}>
          <h2 style={{ color: "#002B45", marginBottom: "30px", fontWeight:"800" }}>
            Get better vet care & meet with a vet <br /> in just minutes.
          </h2>

          {[1, 2, 3, 4].map((step) => {
            const titles = [
              "Choose your vet",
              "Select consultation type",
              "Book an appointment",
              "Confirm payment"
            ];
            const descriptions = [
              "Browse top ranked vets near you, and choose the best vet for your pet.",
              "Choose between per-hour or per-consultation pricing. A price list is available for transparency.",
              "Pick a convenient time with your vet and secure the care your pet needs today.",
              "Payment is required before appointment confirmation. A fixed one-time consultation fee is charged to prevent no-shows."
            ];
            return (
              <div key={step} style={stepStyle}>
                <div style={circleStyle}>{step}</div>
                <div className="responsive-text">
                  <h4 style={{ margin: "0 0 5px 0", fontWeight: "bold" }}>{titles[step - 1]}</h4>
                  <p style={{ margin: "0", color: "#333", width: "350px", fontSize:isMobile?'14px':'16px' }}>{descriptions[step - 1]}</p>
                </div>
                {step !== 4 && <div style={lineStyle}></div>}
              </div>
            );
          })}
        </div>

        {/* Right Side Images */}
        <div
          className="responsive-right responsive-image-container"
          style={{ flex: "1", minWidth: "600px", position: "relative", height: "550px" }}
        >
          <img src={p1} alt="Vet with cat"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              marginLeft: "30px",
              width: "280px",
              height: "250px",
              objectFit: "cover"
            }} />

          <img src={p2} alt="Vet in cow shed"
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              marginTop: "100px",
              width: "260px",
              height: "250px",
              objectFit: "cover"
            }} />

          <img src={p3} alt="Dog treatment"
            style={{
              position: "absolute",
              bottom: "0",
              left:isMobile?'0': "80px",
              marginBottom: "30px",
              width: "240px",
              height: "250px",
              objectFit: "cover",
              marginLeft:isMobile?'-100px':'0px',
            }} />
        </div>
      </div>

      {/* Policy Section */}
      <div style={styles.policySection}>
        <h4 style={styles.policyTitle}>
          <span style={{ color: 'red' }}>*</span>Cancellation & refund policy
        </h4>
        <div style={styles.policyItem}>
          <span>•</span>
          <p style={styles.policyText}>Cancel 3 days before: 100% refund</p>
        </div>
        <div style={styles.policyItem}>
          <span>•</span>
          <p style={styles.policyText}>Cancel 1 day before: 50% refund</p>
        </div>
        <div style={styles.policyItem}>
          <span>•</span>
          <p style={styles.policyText}>No-shows on the appointment day: No refund</p>
        </div>
      </div>
    </div>
  );
};

export default VetCareSteps;
