import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import "../css/AboutUs.css"; // Optional external CSS file for styles
import abt1 from "../Images/abt1.png"; // Replace with your image path
import abt2 from "../Images/abt2.png"; // Replace with your image path
import abt3 from "../Images/abt3.png"; // Replace with your image path    
import abt4 from "../Images/abt4.png"; // Replace with your image path

import Navbar from "./Navbar"; // Import your Navbar component
import Banner from "./Banner"; // Import your Banner component
import Footer from "./Footer"; // Import your Footer component
const AboutUs = () => {
  const [activeTab, setActiveTab] = useState("who");
       const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
      
      useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);
  
  // Styles
  const styles = {

    wSection: {
      textAlign: 'center',
      padding: '2rem',
      maxWidth: '800px',
    //   marginLeft: '558x',
    //   marginRight: '600px',
      position: 'relative',
      zIndex: 1,
    },
    about: {
        fontSize:isMobile?'2rem': '3.5rem',
        color: 'white',
        fontWeight: 'bold',
        marginBottom: '2rem',
        marginTop:'-350px',
      },

}

  const renderContent = () => {
    switch (activeTab) {
      case "who":
        return (
          <>
            <h3 style={{marginLeft:"20px"}}>Bridging the Gap Between Veterinary Care and Convenience.</h3>
            <p style={{marginLeft:"20px", fontSize:"15px", marginBottom:"10px"}}>
              Vet Connect is a one-stop digital platform dedicated to connecting pet owners, livestock farmers, and
              agricultural professionals with trusted and qualified veterinarians across Bhutan.
            </p>
              <p style={{marginLeft:"20px", fontSize:"15px", marginBottom:"10px"}}>
              Vet Connect is a one-stop digital platform dedicated to connecting pet owners, livestock farmers, and
              agricultural professionals with trusted and qualified veterinarians across Bhutan.
            </p>
            <p style={{marginLeft:"20px", fontSize:"15px"}}>
              We believe that every animal deserves expert care, whether it’s a beloved pet, farm livestock, or
              agricultural animals.
            </p>
          </>
        );
      case "mission":
        return (
          <>
            <h3 style={{marginLeft:"20px"}}>Our Mission</h3>
            <p style={{marginLeft:"20px", fontSize:"15px", marginBottom:"10px"}}>
              To improve the quality and accessibility of veterinary care in Bhutan by enabling digital access to
              certified professionals and emergency services anytime, anywhere.
            </p>
            <p style={{marginLeft:"20px", fontSize:"15px", marginBottom:"10px"}}>
              We aim to support animal welfare, empower farmers, and strengthen the veterinary network across the
              country.
            </p>
          </>
        );
      case "offer":
        return (
          <>
            <h3 style={{marginLeft:"20px", fontSize:"16px"}}>What We Offer</h3>
            <ul >
              <li style={{marginLeft:"20px", fontSize:"15px", marginBottom:"10px"}}>Verified Vets</li>
              <li style={{marginLeft:"20px", fontSize:"15px", marginBottom:"10px"}}>Online Appointment Booking</li>
              <li style={{marginLeft:"20px", fontSize:"15px", marginBottom:"10px"}}>Emergency Support</li>
              <li style={{marginLeft:"20px", fontSize:"15px", marginBottom:"10px"}}>Pet and Livestock Care Guidance</li>
              <li style={{marginLeft:"20px", fontSize:"15px", marginBottom:"10px"}}>Community-driven outreach</li>
            </ul>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{top: '0', position: 'absolute', width: '100%'}}>
         <Navbar />
 
    <div className="about-us-container">

                 {/* Banner */}
      <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '650px', zIndex: 0}}>
      <Banner  />
      </div>
      
      {/* Welcome Section */}
      <div style={{ ...styles.wSection, position: 'relative', zIndex: 1, marginLeft:'180px' }}>
        
        
        <h2 style={{...styles.about, marginLeft:isMobile?'-185px':'0px', marginTop:isMobile?'-9rem':'-350px'}} className="about">About Us</h2>
     
      </div>
     
      <h2 style={{marginBottom:'20px', fontWeight:'bold', marginTop:"20px", fontSize:"25px"}}>About Vet Connect</h2>

      <div className="about-us-content">
        <div className="about-images">
          <img src={abt1} alt="Vet Care 1" />
          <img src={abt2} alt="Vet Care 2" />
          <img src={abt3} alt="Vet Care 3" />
          <img src={abt4} alt="Vet Care 4" />
        </div>

        <div className="about-text" style={{ marginTop: "20px", gap: "20px", fontSize: "16px", marginLeft:isMobile?'-10px': "20px" }}>
          <div className="tabs" style={{ marginBottom: "20px", fontWeight: "bold" }}>
            
            <button onClick={() => setActiveTab("who")} className={activeTab === "who" ? "active" : ""} style={{fontSize: "20px",fontWeight: "bold"}}>
              Who We Are
            </button>
            <button onClick={() => setActiveTab("mission")} className={activeTab === "mission" ? "active" : ""} style={{fontSize: "20px",fontWeight: "bold"}}>
              Our Mission
            </button>
            <button onClick={() => setActiveTab("offer")} className={activeTab === "offer" ? "active" : ""} style={{fontSize: "20px",fontWeight: "bold"}}>
              What We Offer
            </button>
          </div>
          <div className="tab-content">{renderContent()}</div>
        </div>
      </div>

      <section className="skills-section">
        <h3 style={{marginBottom:'20px', fontSize:'30px'}}>Our Skills</h3>
        <h4 style={{marginBottom:'20px'}}>WHY CHOOSE US?</h4>
        <ul>
          <li><FaPlus /> Certified & Experienced Vets – Only verified veterinary professionals.</li>
          <li><FaPlus /> Seamless Online Booking – Get expert care at your convenience.</li>
          <li><FaPlus /> For Emergencies – Help when you need it most.</li>
          <li><FaPlus /> Community-Centered Approach – Supporting Bhutan’s pet owners and farmers.</li>
        </ul>
        <div className="cta">
          <p style={{marginBottom:'10px', fontWeight:'bold'}}>Join Us on Our Journey!</p>
          <p>
            We are committed to improving animal healthcare in Bhutan. Whether you're a pet owner, a livestock farmer,
            or a veterinarian, Vet Bhutan is here for you.
          </p>
          <p style={{marginTop:'20px'}}><strong>Book an Appointment</strong> | <strong>Register as a Vet</strong></p>
        </div>
      </section>

    
    </div>
    <Footer />
    </div>
  );
};

export default AboutUs;
