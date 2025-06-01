// import React from 'react';
// import { FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
// import logo from './Images/logo.png'; // Ensure the correct path to your logo
// import footer from './Images/footer.png'; // Use the uploaded image as background


// const socialIconStyle = {
//   color: '#113a56',
//   fontSize: '20px',
//   backgroundColor: 'white',
//   borderRadius: '50%',
//   padding: '10px',
//   textDecoration: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   transition: '0.3s',
// };

// const hoverStyle = {
//   transform: 'scale(1.1)',
// };

// const Footer = () => {
//   return (
//     <footer
//       style={{
//         backgroundImage: `url(${footer})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         height: '670px',
//         color: 'white',
//         padding: '40px 20px',
//         fontFamily: 'Arial, sans-serif',
//         textAlign: 'left',
//         width: '100%',
//       }}
//     >
//        <div
//         style={{
//           display: 'flex',
//           flexDirection: 'row',
//           alignItems: 'left',
//           maxWidth: '1200px',
//           marginLeft: '50px',
//           marginRight: '50px',
//           marginTop: '200px',
//           width: '100%',
//         }}
//       >
//         <div style={{ marginBottom: '30px', textAlign: 'left' }}>
//           <img
//             src={logo}
//             alt="VetConnect Logo"
//             style={{ width: '105px', height: '100px', borderRadius: '50%', marginBottom: '15px' }}
//           />
//           <p style={{ fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
//             VetConnect - Where Care Meets Convenience.<br />
//             Connecting pet owners & livestock farmers with trusted veterinarians across the countries.
//           </p>
//           <p style={{ fontSize: '14px', margin: '5px 0', display: 'flex', alignItems: 'center', marginTop: '20px' }}>
//             <FaEnvelope style={{ marginRight: '8px' }} />
//             VetConnect@gmail.com
//           </p>
//           <p style={{ fontSize: '14px', margin: '5px 0', display: 'flex', alignItems: 'center', marginTop: '20px' }}>
//             <FaMapMarkerAlt style={{ marginRight: '8px' }} />
//             Thimphu, Bhutan
//           </p>
//         </div>

//         <div
//           style={{
//             display: 'flex',
//             justifyContent: 'space-around',
//             flexWrap: 'wrap',
//             width: '100%',
//             gap: '120px',
//             // maxWidth: '1000px',
//             marginLeft: '200px',
//             marginBottom: '20px',
//           }}
//         >
//           <div>
//             <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>Register as</h3>
//             <p style={{borderBottom:'2px solid white' }}></p>
//             <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2',marginLeft:'15px', marginTop:'10px' }}>
//               <li>Pet Parents</li>
//               <li>Vets</li>
//             </ul>
//           </div>
//           <div>
//             <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>About VetConnect</h3>
//             <p style={{borderBottom:'2px solid white' }}></p>
//             <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2',marginLeft:'15px', marginTop:'10px'  }}>
//               <li>About Us</li>
//               <li>Diseases Outbreak</li>
//             </ul>
//           </div>
//           <div>
//             <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>Reviews</h3>
//             <p style={{borderBottom:'2px solid white' }}></p>
//             <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2',marginLeft:'15px', marginTop:'10px'  }}>
//               <li>Reviews</li>
//               <li>Policy
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       <div style={{ textAlign: 'center', marginTop: '5px' }}>
//   <div style={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
//     <a href="#" style={socialIconStyle}><FaFacebookF /></a>
//     <a href="#" style={socialIconStyle}><FaInstagram /></a>
//     <a href="#" style={socialIconStyle}><FaLinkedinIn /></a>
//   </div>
// </div>



//       <div
//         style={{
//           marginTop: '20px',
//           paddingTop: '20px',
//           borderTop: '1px solid rgba(255, 255, 255, 0.2)',
//           fontSize: '13px',
//           textAlign: 'center',
//         }}
//       >
//         <p>Copyright © 2025 Vet Connect. All Rights Reserved.</p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import logo from './Images/logo.png'; // Ensure the correct path to your logo
import footer from './Images/footer.png'; // Use the uploaded image as background

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
        height: '670px',
        color: 'white',
        padding: '40px 20px',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'left',
        width: '100%',
      }}
    >
      <div className="responsive-container"
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'left',
          maxWidth: '1200px',
          marginLeft: '50px',
          marginRight: '50px',
          marginTop: '200px',
          width: '100%',
        }}
      >
        <div  className="responsive-logo" style={{ marginBottom: '30px', textAlign: 'left' }}>
          <img
            src={logo}
            alt="VetConnect Logo"
            style={{ width: '105px', height: '100px', borderRadius: '50%', marginBottom: '15px' }}
          />
          <p style={{ fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
            VetConnect - Where Care Meets Convenience.<br />
            Connecting pet owners & livestock farmers with trusted veterinarians across the countries.
          </p>
          <p style={{ fontSize: '14px', margin: '5px 0', display: 'flex', alignItems: 'center', marginTop: '20px' }}>
            <FaEnvelope style={{ marginRight: '8px' }} />
            VetConnect@gmail.com
          </p>
          <p style={{ fontSize: '14px', margin: '5px 0', display: 'flex', alignItems: 'center', marginTop: '20px' }}>
            <FaMapMarkerAlt style={{ marginRight: '8px' }} />
            Thimphu, Bhutan
          </p>
        </div>

        <div  className="responsive-links"
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            width: '100%',
            gap: '120px',
            marginLeft: '200px',
            marginBottom: '20px',
          }}
        >
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>Register as</h3>
            <p style={{ borderBottom: '2px solid white' }}></p>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2', marginLeft: '15px', marginTop: '10px' }}>
              <li>Pet Parents</li>
              <li>Vets</li>
            </ul>
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>About VetConnect</h3>
            <p style={{ borderBottom: '2px solid white' }}></p>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2', marginLeft: '15px', marginTop: '10px' }}>
              <li>About Us</li>
              <li>Diseases Outbreak</li>
            </ul>
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>Reviews</h3>
            <p style={{ borderBottom: '2px solid white' }}></p>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2', marginLeft: '15px', marginTop: '10px' }}>
              <li>Reviews</li>
              <li>Policy</li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '5px' }}>
        <div className="social-icons" style={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
          <a href="#" style={socialIconStyle}><FaFacebookF /></a>
          <a href="#" style={socialIconStyle}><FaInstagram /></a>
          <a href="#" style={socialIconStyle}><FaLinkedinIn /></a>
        </div>
      </div>

      <div
        style={{
          marginTop: '20px',
          paddingTop: '20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          fontSize: '13px',
          textAlign: 'center',
        }}
      >
        <p>Copyright © 2025 Vet Connect. All Rights Reserved.</p>
      </div>

      {/* Add media queries for responsiveness */}
      <style>
      {`
    @media (max-width: 768px) {
      footer {
        padding: 20px;
        background-size: cover;
        background-position: center;
        height: auto;
        text-align: center;
      }

      .responsive-container {
        flex-direction: column !important;
        align-items: center !important;
        margin: 50px auto 0 auto !important;
      }

      .responsive-logo {
        text-align: center !important;
        margin-bottom: 20px !important;
      }

      .responsive-links {
        flex-direction: column !important;
        align-items: center !important;
        margin-left: 0 !important;
        gap: 30px !important;
      }

      .social-icons {
        gap: 15px !important;
      }
    }

    @media (max-width: 480px) {
      footer {
        padding: 15px;
        background-size: cover;
        backgroundImage: 'url(${footer})';
        background-position: center;
        position: absolute;
        height:660px !important; 
        width: 700px !important;
        text-align: center;
      }

      .responsive-container {
        margin-top: 120px !important;
      }

      .responsive-links {
        flex-direction: row !important;
        align-items: center !important;
        gap: 20px !important;
      }

      .social-icons {
        gap: 10px !important;
      }
    }
  `}
      </style>
    </footer>
  );
};

export default Footer;
