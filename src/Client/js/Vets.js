

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaPaw, FaArrowRight } from 'react-icons/fa';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import "../css/Vetresp.css";
const Vets = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const locationQuery = location.state?.location || 'Location';
  const petQuery = location.state?.pet || 'Pet';
  const [approvedVets, setApprovedVets] = useState([]);
  const [message, setMessage] = useState('');
  const [vetReviewData, setVetReviewData] = useState({});

 const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
     

useEffect(() => {
  if (location?.state) {
    const { approved = [], message = '' } = location.state;
    setApprovedVets(approved);
    if (approved.length === 0) {
      setMessage(`No vets found in ${location.state.location}.  Please try a different location.`);
    } else {
      setMessage('');
    }
  }
}, [location]);


  useEffect(() => {
    const fetchAllVetReviews = async () => {
      const reviewsData = {};

      for (const vet of approvedVets) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/vet/${vet._id}/getreviews`);
          reviewsData[vet._id] = {
            reviews: response.data.reviews || [],
            averageRating: response.data.averageRating || 0,
            totalReviews: response.data.totalReviews || 0,
          };
        } catch (error) {
          reviewsData[vet._id] = {
            reviews: [],
            averageRating: 0,
            totalReviews: 0,
          };
        }
      }

      setVetReviewData(reviewsData);
    };

    if (approvedVets.length > 0) {
      fetchAllVetReviews();
    }
  }, [approvedVets]);

  const handleNavigate = (vet) => {
    // console.log("vet is",vet)
    navigate('/vprofile', { state: { vet } });
  };

  return (
    <div style={{ width: '100%' }}>
      <Navbar />
      <div style={{ padding: '20px', marginTop: '100px' }}>
        {/* Search Tags */}
        <div style={{ marginBottom: '30px', display: 'flex', gap: '15px', marginLeft: '30px' }}>
          <div style={{ border: '1px solid #806E63', borderRadius: '8px', padding: '8px 16px', display: 'flex', alignItems: 'center', width: '150px' }}>
            <FaMapMarkerAlt style={{ marginRight: '8px', color: "#A52727" }} />
            {locationQuery}
          </div>
          <div style={{ border: '1px solid #806E63', borderRadius: '8px', padding: '8px 16px', display: 'flex', alignItems: 'center', width: '120px' }}>
            <FaPaw style={{ marginRight: '15px', color: "#A52727" }} />
            {petQuery}
          </div>
        </div>

        {/* Message or Vet Cards */}
        {message ? (
          <p style={{ fontSize:isMobile?'13px': '1rem', color: 'gray', margin:isMobile?'100px 100px': '100px 100px ', marginLeft:isMobile?'60px':"500px", fontStyle:"italic", marginBottom:"30px", textAlign:isMobile?"center":"none" }}>{message}</p>
        ) : (
          <div className='vetcontainer' style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px', width: "92%", marginLeft: "50px" }}>
            {approvedVets.map((vet) => (
              <div className='vetcard' key={vet._id} style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', width: '550px', margin: '1rem auto' }}>
                <div className='vetinfo' style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src={
                      vet.photo
                        ? vet.photo.startsWith('http')
                          ? vet.photo
                          : `http://localhost:8080/${vet.photo.replace(/\\/g, '/').replace(/^\/+/, '')}`
                        : '/defaultvet.jpg'
                    }
                    alt={vet.name}
                    style={{ width: '110px', height: '110px', borderRadius: '50%', objectFit: 'cover', marginRight: '16px', border: '1px solid #ccc' }}
                    onError={(e) => { e.target.src = '/defaultvet.jpg'; }}
                  />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>{vet.name}</h3>
                    <p style={{ margin: '4px 0', fontSize: '14px', color: '#444' }}>{vet.specialist}</p>
                    <div className="vetrating" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
                      {vetReviewData[vet._id] && (
                        <>
                          <span style={{ color: '#6DC5EE', fontSize: '16px' }}>
                            {Array.from({ length: 5 }, (_, i) => {
                              const rating = vetReviewData[vet._id].averageRating;
                              return rating >= i + 1 ? '★' : '☆';
                            }).join('')}
                          </span>
                          <span style={{ fontSize: '13px', color: '#777' }}>
                            ({vetReviewData[vet._id].averageRating})
                          </span>
                          <p style={{ fontSize: '13px', color: '#777', marginRight: '20px' }}>
                            {vetReviewData[vet._id].totalReviews} Reviews
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  <div style={{ marginLeft: 'auto', color: '#999', cursor: 'pointer', fontSize: '18px' }} onClick={() => handleNavigate(vet)}>❯</div>
                </div>

                <p className='description' style={{ marginTop: '12px', fontSize: '14px', lineHeight: '1.6', color: '#555' }}>{vet.description}</p>
                <p className='description' style={{ fontSize: '13px', margin: '8px 0', color: '#333', marginTop: '10px' }}>{vet.location}</p>
                <p className='description' style={{ fontSize: '14px', color: '#777', marginBottom: '10px', marginTop: '10px', display: "flex", gap: "10px" }}>
                  <span style={{ color: "#212121", fontWeight: "bold", fontSize: "13px" }}>Charge per hour:</span> ${vet.chargePerHour}
                </p>
                <p className='description' style={{ fontSize: '13px', color: '#333' }}>
                  Certification details:{' '}
                  <span style={{ color: '#5E788A', cursor: 'pointer' }} onClick={() => handleNavigate(vet)}>
                    view <FaArrowRight style={{ verticalAlign: 'middle', fontSize: '12px', color: "#5E788A" }} />
                  </span>
                </p>

                <hr style={{ margin: '20px 0', border: '1px solid #eee' }} />
                <div style={{ textAlign: 'center' }}>
                  <button onClick={() => handleNavigate(vet)} style={{ background: 'none', border: 'none', color: '#989898', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>
                    View more
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Vets;
