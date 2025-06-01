import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPaw, FaHeartbeat, FaSeedling , FaSearch } from 'react-icons/fa';
import { ArrowRightIcon } from "@heroicons/react/24/solid";

import { useState } from 'react';
import Banner from './Banner';
import Navbar from './Navbar';
import Footer from './Footer';
import logo from './Images/logo.png';
import SignupForm from './SignupForm';
import TopRatedVets from './TopRatedVets';
import './styles/TopRatedVets.css'; // Import your CSS file for styling
import vet1 from './Images/vet1.png';
import pet from './Images/pet.png';
import livestock from './Images/livestock.png';
import farm from './Images/farm.png';
import whypic from './Images/whypic.png';
import Testimonial from './Testimonial';
import FAQ from './FAQ';
import Search from './Search';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaStar } from 'react-icons/fa';
import Review from './Review';
import Services from './Services';

const GuestUserPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [category, setCategory] = React.useState('pets');
  const [showAuthModal, setShowAuthModal] = useState(false);


  // Styles
  const styles = {
    page: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      // maxWidth: '1500px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#ffff',
      // overflowX: 'hidden' 
    },
    welcomeSection: {
      textAlign: 'left',
      padding: '2rem',
      maxWidth: '800px',
      marginLeft: '60px',
      marginRight: '600px',
      marginTop: '200px',
      position: 'relative',
      zIndex: 1,
    },
    heading: {
      fontSize: '1.1rem',
      color: '#011523',
      marginBottom: '1rem',
      backgroundColor: 'white',
      width: '36%',
      height: '36px',
      padding: '5px 4px',
      borderRadius: '3px',
    },
    slogan: {
      fontSize: '3.5rem',
      color: 'white',
      fontWeight: 'bold',
      marginBottom: '2rem'
    },
    buttonGroup: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'left',
      marginTop: '2rem'
    },
    primaryBtn: {
      backgroundColor: '#011523',
      color: 'white',
      border: 'none',
      padding: '0.8rem 1.5rem',
      borderRadius: '5px',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s'
    },
    secondaryBtn: {
      backgroundColor: 'white',
      color: '#3498db',
      border: '2px solid #3498db',
      padding: '0.8rem 1.5rem',
      borderRadius: '5px',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'all 0.3s'
    },

    //service section
    servicesSection: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '2rem',
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      marginTop: '5rem',
      position: 'relative',       // Add this
      zIndex: 2                // Add this to ensure it stacks above other elements
    },
    service_Card: {
      flex: '1',
      minWidth: '330px',
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '1.5rem',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s',
      cursor: 'pointer'
    },
    cardTitle: {
      color: '#2c3e50',
      fontSize: '1.5rem',
      marginBottom: '1rem'
    },
    cardText: {
      color: '#7f8c8d',
      lineHeight: '1.5'
    },
    sectionTitle: {
      fontSize: '2rem',
      display:'inline-flex',
      fontWeight:'800',
      color: '#2c3e50',
      margin: '2rem 0 1rem 0',
      textAlign: 'left',
      marginLeft: '100px',
      width: '100%'
    },
    sectionTitle1: {
      fontSize: '2rem',
      fontWeight:'800',
      display:'inline-flex',
      color: '#2c3e50',
      margin: '2rem 0 1rem 0',
      textAlign: 'center',
      justifyContent: 'center',
      // marginLeft: '50px',
      width: '100%'
    },

    sectionSubtitle: {
      fontSize: '16px',
      color: '#7f8c8d',
      textAlign: 'left',
      marginLeft: '100px',
      marginBottom: '2rem',
      width: '100%'
    },

    sectionSubtitle1: {
      fontSize: '16px',
      color: '#7f8c8d',
      textAlign: 'center',
      // marginLeft: '100px',
      marginBottom: '2rem',
      width: '100%'
    },
    cardIcon: {
      fontSize: '22px',
      color: '#123c59',
      marginBottom: '10px',
    },
    

    //process section
    processSection: {
      width: '100%',
      padding: '3rem',
      backgroundColor: 'white',
      marginTop: '2rem'
    },
    processContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    processContent: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '2rem',
      marginTop: '2rem'
    },
    processTitle: {
      fontSize: '2rem',
      color: '#2c3e50',
      textAlign: 'left',
      marginBottom: '1rem',
    },
    processSteps: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
    },
    processStep: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'flex-start',
    },
    stepNumber: {
      backgroundColor: '#011523',
      color: 'white',
      borderRadius: '50%',
      width: '30px',
      height: '30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      marginTop: '0.3rem',
    },
    stepContent: {
      flex: 1,
    },
    stepTitle: {
      fontSize: '1.2rem',
      color: '#2c3e50',
      marginBottom: '0.5rem',
      fontWeight: 'bold',
    },
    stepText: {
      color: '#7f8c8d',
      lineHeight: '1.6',
    },
    processVisuals: {
      width: '30%',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      marginTop: '1rem',
    },
    
    processImage: {
      width: '100%',
      height: '60px',
      // borderRadius: '8px',
      objectFit: 'cover',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    
    policySection: {
      marginTop: '3rem',
      padding: '1.5rem',
      backgroundColor: '#fff',
      borderRadius: '5px',
      border: '1px solid rgb(228, 228, 228)',
      width: '100%',
      maxWidth: '500px',
    },
    policyTitle: {
      fontSize: '1.2rem',
      color: '#2c3e50',
      marginBottom: '1rem',
      fontWeight: 'bold'
    },
    policyItem: {
      marginBottom: '0.5rem',
      display: 'flex',
      alignItems: 'center'
    },
    policyText: {
      color: '#7f8c8d',
      marginLeft: '0.5rem'
    },


      whySection: {
        width: '100%',
        padding: '4rem 2rem',
        backgroundColor: 'white',
        // textAlign: 'center'
      },
      whyTitle: {
        fontSize: '2rem',
        color: '#2c3e50',
        marginBottom: '2rem',
        fontWeight:'750',
        marginLeft:'30px'
      },

      whyContent: {
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        gap: '3rem',
        maxWidth: '1200px',
        marginLeft: '80px',
        textAlign: 'left'
      },

     ImageWrapper: {
        width: '200px',
        height: '50px',
},
      
      whyTextBlock: {
        flex: '1',
        // minWidth: '300px',
        // maxWidth: '500px',
        marginLeft: '200px',

      },
      whyText: {
        color: '#7f8c8d',
        lineHeight: '1.6',
        marginBottom: '1.5rem',
        marginLeft: '200px',
      },
      featuresList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
        marginTop: '2rem'
      },
      featureItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '0.5rem'
      },
      featureIcon: {
        marginRight: '0.5rem',
        color: 'red'
      },

       // Simplified modal styles
    authModalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(105, 105, 105, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      },
      authModalContent: {
        backgroundColor: 'white',
        padding: '2.5rem',
        borderRadius: '5px',
        width: '90%',
        maxWidth: '1000px',
        height: '600px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      },
      authModalLogo: {
        width: '230px',
        height: '220px',
        borderRadius: '50%',
        border: '1px solid rgba(93, 93, 93, 0.5)',
        marginBottom: '1.5rem'
      },
      authModalTitle: {
        fontSize: '1.8rem',
        color: '#2c3e50',
        marginBottom: '0.5rem',
        fontWeight: 'bold',
        fontFamily:'times new roman',
      },
      authModalSubtitle: {
        fontSize: '1.1rem',
        color: '#7f8c8d',
        marginBottom: '2rem',
        fontStyle: 'italic'
      },
      authButtonsContainer: {
        display: 'inline-flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',	
        gap: '.3rem',
        width: '100%'
        
      },
      authButtonPrimary: {
        flex: 1,
        padding: '0.8rem',
        backgroundColor: '#011523',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        fontSize: '1rem',
        cursor: 'pointer',
        fontWeight: 'bold',
        width: '500px',
        textDecoration: 'none',

      },
      authButtonSecondary: {
        flex: 1,
        padding: '0.8rem',
        color: 'white',
        backgroundColor: '#011523',
        borderRadius: '10px',
        fontSize: '1rem',
        cursor: 'pointer',
        fontWeight: 'bold',
        width: '500px',
        marginTop: '.5rem',
        textDecoration: 'none',


      },



  };

  const toggleAuthModal = () => {
    setShowAuthModal(!showAuthModal);
  };

  const handleBookAppointmentClick = () => {
    toggleAuthModal();
  };

  return (
    <div style={{top: '0', width: '100%', }}>
             <Navbar />
    <div style={styles.page }>
   
      {/* Banner */}
      <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '650px', zIndex: 0}}>
      <Banner  />
      </div>
      {/* Welcome Section */}
      <div style={{ ...styles.welcomeSection, position: 'relative', zIndex: 1 }}>
        
      <h1 style={styles.heading}>
  Welcome To VetConnect -
  {/* <ArrowRightIcon style={{ width: "17px", height: "15px", marginLeft: "8px" }} /> */}
</h1>
        <h2 style={styles.slogan}>"Where Care Meets Convenience."</h2>
        
        <div style={styles.buttonGroup}>
          <button 
            style={styles.primaryBtn}
            onClick={handleBookAppointmentClick}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#011523'}
          >
            Book an Appointment
          </button>
          <button 
            style={styles.secondaryBtn}
            onClick={() => navigate('/vet')}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f8f9fa';
              e.target.style.borderColor = '#2980b9';
              e.target.style.color = '#2980b9';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.borderColor = '#3498db';
              e.target.style.color = '#3498db';
            }}
          >
            Register as Vet
          </button>
        </div>
      </div>
      
      {/* Services Cards Section */}
      <div style={styles.servicesSection}>
  <div 
    style={styles.service_Card}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
  >
    <div style={{display: 'flex', alignItems: 'left', justifyContent: 'left', gap: '10px'}}>
    <FaPaw style={styles.cardIcon} />
    <h3 style={styles.cardTitle}>Pets</h3></div>
    <p style={styles.cardText}>Find expert veterinary care for your pets - dogs, cats, and more.</p>
  </div>

  <div 
    style={styles.service_Card}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
  >
    <div style={{display: 'flex', alignItems: 'left', justifyContent: 'left', gap: '10px'}}>
    <FaHeartbeat style={styles.cardIcon} />
    <h3 style={styles.cardTitle}>Healthy Herds</h3></div>
    <p style={styles.cardText}>Specialized services for livestock health and well-being.</p>
  </div>

  <div 
    style={styles.service_Card}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
  >
    <div style={{display: 'flex', alignItems: 'left', justifyContent: 'left', gap: '10px'}}>
    <FaSeedling style={styles.cardIcon} />
    <h3 style={styles.cardTitle}>Thriving Harvests</h3></div>
    <p style={styles.cardText}>Expert solutions for farm health, from crops to disease prevention.</p>
  </div>
</div>


      {/* Top Rated Vets Section */}
      <h2 style={styles.sectionTitle}>Best-Rated <p style={{fontSize:'2rem', color:'#A52727', marginLeft:'7px'}}>Vets</p></h2>
      <p style={styles.sectionSubtitle}>Expert Veterinary Specialists</p>
      
<div > <TopRatedVets / ></div>
      
      



      
      <Search />

      {/* Vet Care Process Section */}
      <div style={styles.processSection}>
  <div style={styles.processContainer}>
    <h2 style={styles.processTitle}>Get better vet care & meet with a vet in just minutes.</h2>
    
    <div style={styles.processContent}>
      {/* Steps on the left */}
      <div style={styles.processSteps}>
        <div style={styles.processStep}>
          <div style={styles.stepNumber}>1</div>
          <div style={styles.stepContent}>
            <h3 style={styles.stepTitle}>Choose your vet</h3>
            <p style={styles.stepText}>
              Browse top ranked vets near you, and choose the best vet for your pet.
            </p>
          </div>
        </div>
        
        <div style={styles.processStep}>
          <div style={styles.stepNumber}>2</div>
          <div style={styles.stepContent}>
            <h3 style={styles.stepTitle}>Select consultation type</h3>
            <p style={styles.stepText}>
              Choose between per-hour or per-consultation pricing. A price list is available for transparency.
            </p>
          </div>
        </div>
        
        <div style={styles.processStep}>
          <div style={styles.stepNumber}>3</div>
          <div style={styles.stepContent}>
            <h3 style={styles.stepTitle}>Book an appointment</h3>
            <p style={styles.stepText}>
              Pick a convenient time with your vet and secure the care your pet needs today.
            </p>
          </div>
        </div>
        
        <div style={styles.processStep}>
          <div style={styles.stepNumber}>4</div>
          <div style={styles.stepContent}>
            <h3 style={styles.stepTitle}>Confirm payment</h3>
            <p style={styles.stepText}>
              Payment is required before appointment confirmation. A fixed one-time consultation fee is charged to prevent no-shows.
            </p>
          </div>
        </div>
      </div>

{/* Images on the right - arranged vertically */}
<div style={styles.processVisuals}>
  <img 
    src={vet1} 
    alt="Vet examining cat" 
    style={styles.processImage} 
  />
  <img 
    src={vet1} 
    alt="Vet checking large animal" 
    style={styles.processImage} 
  />
  <img 
    src={vet1} 
    alt="Animal getting tested" 
    style={styles.processImage} 
  />
</div>
    </div>
    
    {/* Policy section */}
    <div style={styles.policySection}>
      <h4 style={styles.policyTitle}>Cancellation & refund policy</h4>
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
</div>

    {/* Services Section */}
<div> <Services /></div>

      {/* Why Vet Connect Section */}
      <div style={styles.whySection}>
        <h2 style={styles.whyTitle}>Why Vet Connect?</h2>
        
        <div style={styles.whyContent}>
        <div style={styles.ImageWrapper}>
      <img
        src={whypic}
        alt="Vet Connect"
        style={{width: '500px', height: '500px',  objectFit: 'cover'}}
      />
    </div>

          <div style={styles.whyTextBlock}>
            <p style={styles.whyText}>
              Vet Connect is a core stage digital platform designed to connect pet owners, farmers with qualified veterinarians across Bhutan...
            </p>
            <p style={styles.whyText}>
              Vet Connect is committed to building trust between animal owners and expert veterinarians to ensure better healthcare accessibility.
            </p>
          
          
          <div style={styles.whyTextBlock}>
            <div style={styles.featuresList}>
              <div style={styles.featureItem}>
                <span style={styles.featureIcon}>+</span>
                <span>Certified & Experienced Vets</span>
              </div>
              <div style={styles.featureItem}>
                <span style={styles.featureIcon}>+</span>
                <span>Emergency Support</span>
              </div>
              <div style={styles.featureItem}>
                <span style={styles.featureIcon}>+</span>
                <span>Convenient Online Booking</span>
              </div>
              <div style={styles.featureItem}>
                <span style={styles.featureIcon}>+</span>
                <span>Community-Centered Approach</span>
              </div>
            </div>
          </div>
          </div>

        </div>

        <div>
  <Testimonial />
</div>
      </div>
 

      {/* Testimonial Section (to be implemented) */}

<div>
  <FAQ />
</div>


<div>
  <Review />
</div>



         {/* Simplified Auth Modal Popup */}
         {showAuthModal && (
        <div style={styles.authModalOverlay} onClick={toggleAuthModal}>
          <div style={styles.authModalContent} onClick={e => e.stopPropagation()}>
            {/* Replace with your actual logo */}
            <img 
              src={logo} 
              alt="Vet Connect Logo" 
              style={styles.authModalLogo} 
            />
            <h2 style={styles.authModalTitle}>Welcome to Vet Connect</h2>
            <p style={styles.authModalSubtitle}>Where Care Meets Convenience</p>
            
            <div style={styles.authButtonsContainer}>
              <button style={styles.authButtonPrimary}>
               <a href='/login' style={{textDecoration:'none', color:'white'}}> LOGIN </a> 
              </button>
              <button style={styles.authButtonSecondary}>
               <a href='/client'  style={{textDecoration:'none', color:'white'}}>SIGN UP</a> 
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
    <Footer />

    </div>
  );
};



export default GuestUserPage;