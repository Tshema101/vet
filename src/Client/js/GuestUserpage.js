import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPaw, FaHeartbeat, FaSeedling , FaSearch } from 'react-icons/fa';
import { ArrowRightIcon } from "@heroicons/react/24/solid";

import { useState } from 'react';
import Banner from './Banner';
import Navbar from './Navbar';
import Footer from './Footer';
import logo from '../Images/logo.png';
import TopRatedVets from './TopRatedVets';
import '../css/TopRatedVets.css'; // Import your CSS file for styling

import whypic from '../Images/whypic.png';
import Testimonial from './Testimonial';
import FAQ from './FAQ';
import Search from './Search';
// import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaStar } from 'react-icons/fa';
import Review from './Review';
import Services from './Services';
import Process from './Process';
import WelcomeSection from './WelcomeSection';

const GuestUserPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [category, setCategory] = React.useState('pets');
  const [showAuthModal, setShowAuthModal] = useState(false);
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
      marginLeft:isMobile? "0px": '60px',
      marginRight: isMobile? "0px": '600px',
      marginTop: '200px',
      position: 'relative',
      zIndex: 1,
    },
    heading: {
      fontSize: '1.1rem',
      color: '#011523',
      marginBottom: '1.5rem',
      backgroundColor: 'white',
      width: '35%',
      height: '36px',
      padding: '7px 15px',
      borderRadius: '5px',
      // fontFamily:"times new romen"
    },
    slogan: {
      fontSize: '3.8rem',
      color: 'white',
      fontWeight: 'bold',
      marginBottom: '2rem',
      fontFamily:"times new romen"

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
      marginTop: isMobile? '-4rem': '3rem',
      position: 'relative',       // Add this
      zIndex: 2                // Add this to ensure it stacks above other elements
    },
    service_Card: {
      flex: '1',
      minWidth: '330px',
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '1.5rem',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      transition: 'transform 0.4s',
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
      fontSize: isMobile ? '1.5rem' : '2rem',
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
    



            whySection: {
        width: '100%',
        padding: '4rem 2rem',
        backgroundColor: 'white',
        // textAlign: 'center'
        flexDirection:isMobile?'column':"row"
      },
      whyTitle: {
        fontSize:isMobile?'1.5rem': '2rem',
        color: '#806E63',
        marginBottom: '2rem',
        fontWeight:'800',
        marginLeft:isMobile?'-10px':'30px'
      },

      whyContent: {
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        gap: '3rem',
        maxWidth: '1200px',
        marginLeft: '80px',
        textAlign: 'left',
        flexDirection:isMobile?'column':"row"


      },

     ImageWrapper: {
        width: '200px',
        height: '50px',
},
      
      whyTextBlock: {
        flex: '1',
        // minWidth: '300px',
        // maxWidth: '500px',
        marginTop:isMobile?'400px':'0',
        marginLeft:isMobile?'10px': '200px',


      },
      whyText: {
        color: '#7f8c8d',
        lineHeight: '1.6',
        marginBottom: isMobile?'5rem':'1.5rem',
        marginTop:isMobile?'-80px':'0',
        marginLeft:isMobile?'-70px': '200px',
      },
        featuresList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
        marginTop:isMobile?'-23rem': '2rem',
        marginLeft:isMobile?'-70px': '0',
        marginBottom:isMobile?'-70px': '0',

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
        backgroundColor: '#113047',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        fontSize: '1rem',
        cursor: 'pointer',
        fontWeight: 'bold',
        width: '500px',
        textDecoration: 'none',
        height: '50px',

      },
      authButtonSecondary: {
        flex: 1,
        padding: '0.8rem',
        color: 'white',
        backgroundColor: '#113047',
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
      <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '650px', zIndex: 0, border:'none'}}>
      <Banner  />
      </div>
      {/* Welcome Section */}
      <div style={{ ...styles.welcomeSection, position: 'relative', zIndex: 1 }}>
      <WelcomeSection />

      </div>
      
      {/* Services Cards Section */}
<div style={styles.servicesSection}>
  <div 
    style={styles.service_Card}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-12px)';
      e.currentTarget.style.backgroundColor = '#6DC5EE'; 
      e.currentTarget.querySelector('h3').style.color = 'white';
      e.currentTarget.querySelector('svg').style.color = 'white';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'none';
      e.currentTarget.style.backgroundColor = 'white';
      e.currentTarget.querySelector('h3').style.color = '#184362';
      e.currentTarget.querySelector('svg').style.color = '#184362';
    }}
  >
    <div style={{ display: 'flex', alignItems: 'left', justifyContent: 'left', gap: '10px' }}>
      <FaPaw style={styles.cardIcon} />
      <h3 style={styles.cardTitle}>Pets</h3>
    </div>
    <p style={styles.cardText}>Find expert veterinary care for your pets - dogs, cats, and more.</p>
  </div>

  <div 
    style={styles.service_Card}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-12px)';
      e.currentTarget.style.backgroundColor = '#6DC5EE';
      e.currentTarget.querySelector('h3').style.color = 'white';
      e.currentTarget.querySelector('svg').style.color = 'white';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'none';
      e.currentTarget.style.backgroundColor = 'white';
      e.currentTarget.querySelector('h3').style.color = '#184362';
      e.currentTarget.querySelector('svg').style.color = '#184362';
    }}
  >
    <div style={{ display: 'flex', alignItems: 'left', justifyContent: 'left', gap: '10px' }}>
      <FaHeartbeat style={styles.cardIcon} />
      <h3 style={styles.cardTitle}>Healthy Herds</h3>
    </div>
    <p style={styles.cardText}>Specialized services for livestock health and well-being.</p>
  </div>

  <div 
    style={styles.service_Card}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-12px)';
      e.currentTarget.style.backgroundColor = '#6DC5EE';
      e.currentTarget.querySelector('h3').style.color = 'white';
      e.currentTarget.querySelector('svg').style.color = 'white';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'none';
      e.currentTarget.style.backgroundColor = 'white';
      e.currentTarget.querySelector('h3').style.color = '#184362';
      e.currentTarget.querySelector('svg').style.color = '#184362';
    }}
  >
    <div style={{ display: 'flex', alignItems: 'left', justifyContent: 'left', gap: '10px' }}>
      <FaSeedling style={styles.cardIcon} />
      <h3 style={styles.cardTitle}>Thriving Harvests</h3>
    </div>
    <p style={styles.cardText}>Expert solutions for farm health, from crops to disease prevention.</p>
  </div>
</div>



      {/* Top Rated Vets Section */}
      <h2 style={styles.sectionTitle}>Best-Rated <p style={{fontSize:isMobile?'1.5rem':'2rem', color:'#A52727', marginLeft:'7px'}}>Vets</p></h2>
      <p style={styles.sectionSubtitle}>Expert Veterinary Specialists</p>
      
<div > <TopRatedVets / ></div>      
      <Search />
<Process />
  

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
       style={{width:isMobile?'420px': '500px', height:isMobile?'400px': '500px',  objectFit: 'cover', marginLeft:isMobile?'-60px':'0'}}
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
              <button style={styles.authButtonPrimary}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#5B8FA7'; 
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'none';
            
              }}
              >
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