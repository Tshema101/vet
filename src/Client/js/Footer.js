
import React from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import logo from '../Images/logo.png';
import footer from '../Images/footer.png';

const socialIconStyle = {
  color: '#113a56',
  fontSize: '20px',
  backgroundColor: 'white',
  borderRadius: '50%',
  padding: '10px',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: '0.3s',
};

const hoverStyle = {
  transform: 'scale(1.1)',
};

const Footer = () => {
  return (
    <footer
      style={{
        backgroundImage: `url(${footer})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'left',
        width: '100%',
        position: 'relative',
        padding: '40px 20px',
        height: '630px',
      }}
    >
      <div 
        className="responsive-container"
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          maxWidth: '1200px',
          margin: '200px auto 0 auto',
          width: '100%',
          padding: '0 20px',
          boxSizing: 'border-box',
        }}
      >
        <div 
          className="responsive-logo" 
          style={{ 
            marginBottom: '30px', 
            textAlign: 'left',
            flex: '1',
            minWidth: '300px',
            marginTop:"-5px"
          }}
        >
          <img
            src={logo}
            alt="VetConnect Logo"
            style={{ 
              width: '105px', 
              height: '100px', 
              borderRadius: '50%', 
              marginBottom: '15px' 
            }}
          />
          <p style={{ 
            fontSize: '16px', 
            maxWidth: '600px', 
            margin: '0 0 15px 0',
            lineHeight: '1.5'
          }} className='responsive-logo-text'>
            VetConnect - Where Care Meets Convenience.<br />
            Connecting pet owners & livestock farmers with trusted veterinarians across the countries.
          </p>
          <p style={{ 
            fontSize: '14px', 
            margin: '5px 0', 
            display: 'flex', 
            alignItems: 'center', 
            marginTop: '20px' 
          }}>
            <FaEnvelope style={{ marginRight: '8px' }} className='email'/>
            VetConnect@gmail.com
          </p>
          <p style={{ 
            fontSize: '14px', 
            margin: '5px 0', 
            display: 'flex', 
            alignItems: 'center', 
            marginTop: '20px' 
          }}>
            <FaMapMarkerAlt style={{ marginRight: '8px' }} className='location' />
            Thimphu, Bhutan
          </p>
        </div>

        <div 
          className="responsive-links"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            width: '100%',
            gap: '40px',
            marginLeft: '60px',
            marginBottom: '20px',
            flex: '2',
            marginTop:"-10px"

          }}
        >
          <div style={{ minWidth: '120px' }} >
            <h3 style={{ 
              fontSize: '18px', 
              fontWeight: 'bold',
              marginBottom: '10px'
            }} >
              Register as
            </h3>
            <p style={{ 
              borderBottom: '2px solid white',
              marginBottom: '15px'
            }}></p>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              fontSize: '14px', 
              lineHeight: '2',
              margin: 0
            }} className='list'>
              <li>Pet Parents</li>
              <li>Vets</li>
            </ul>
          </div>
          <div style={{ minWidth: '120px' }}>
            <h3 style={{ 
              fontSize: '18px', 
              fontWeight: 'bold',
              marginBottom: '10px'
            }}>
              About VetConnect
            </h3>
            <p style={{ 
              borderBottom: '2px solid white',
              marginBottom: '15px'
            }}></p>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              fontSize: '14px', 
              lineHeight: '2',
              margin: 0
            }} className='list'>
              <li>About Us</li>
              <li>Diseases Outbreak</li>
            </ul>
          </div>
          <div style={{ minWidth: '120px' }} >
            <h3 style={{ 
              fontSize: '18px', 
              fontWeight: 'bold',
              marginBottom: '10px'
            }}>
              Reviews
            </h3>
            <p style={{ 
              borderBottom: '2px solid white',
              marginBottom: '15px'
            }}></p>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              fontSize: '14px', 
              lineHeight: '2',
              margin: 0
            }} className='list'>
              <li>Reviews</li>
              <li>Policy</li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{ 
        textAlign: 'center', 
        marginTop: '-25px',
        padding: '0 20px'
      }}>
        <div 
          className="social-icons" 
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '30px',
            flexWrap: 'wrap'
          }}
        >
          <a href="#" style={socialIconStyle}><FaFacebookF /></a>
          <a href="#" style={socialIconStyle}><FaInstagram /></a>
          <a href="#" style={socialIconStyle}><FaLinkedinIn /></a>
        </div>
      </div>

      <div
        style={{
          marginTop: '25px',
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          paddingTop: '22px',
          fontSize: '13px',
          textAlign: 'center',
          padding: '10px 20px',
        }}
       className='footer-text'>
        <p>Copyright © 2025 Vet Connect. All Rights Reserved.</p>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .responsive-container {
            margin-top: 150px !important;
          }
          
          .responsive-links {
            gap: 30px !important;
            margin-left: 40px !important;
          }
        }
        
        @media (max-width: 768px) {
          footer {
            padding: 30px 20px !important;
            min-height: auto !important;
            height: auto !important;
          }
          
          .responsive-container {
            flex-direction: column !important;
            align-items: center !important;
            margin-top: 80px !important;
          }
          
          .responsive-logo {
            text-align: center !important;
            margin-bottom: 20px !important;
            width: 100% !important;
            margin-top: 40px !important;
          }
            .responsive-logo-text {
            text-align: center !important;
            margin: 0 auto !important;
            font-size: 12px !important;
            max-width: 100% !important;
            margin-bottom: 20px !important;
          }
            .email {
            text-align: left !important;
            // margin: 0 auto !important;
            font-size: 12px !important;
            max-width: 100% !important;
            // margin-bottom: 20px !important;
          }
            .location {
            text-align: left !important;
            // margin: 0 auto !important;
            font-size: 12px !important;
            max-width: 100% !important;
            // margin-bottom: 20px !important;
          }
            .list {
            text-align: left !important;
            margin: 0 auto !important;
            font-size: 12px !important;
            max-width: 100% !important;
            margin-bottom: 20px !important;
          }
           h3 {
            font-size: 13px !important;
            // margin-bottom: 10px !important;
          }
          .responsive-links {
            flex-direction: row !important;
            justify-content: space-around !important;
            margin-left: 0 !important;
            gap: 20px !important;
            width: 100% !important;
            
          }
          
          .social-icons {
            gap: 20px !important;
          }
          .footer-text {
            font-size: 12px !important;
            margin-top: 20px !important;
          padding-top: 20px !important;
          }
        }
        
        @media (max-width< 480px) {
          footer {
            padding: 20px 15px !important;
          }
          
          .responsive-container {
            margin-top: 60px !important;
          }
          
          .responsive-logo img {
            width: 50px !important;
            height: 50px !important;
          }
          
          .responsive-links {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 30px !important;
            margin-top: 20px !important;
          }
          
          .social-icons {
            gap: 15px !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
