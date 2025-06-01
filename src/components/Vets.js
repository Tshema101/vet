import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaPaw, FaArrowRight } from 'react-icons/fa';
import vet1 from './Images/vet1.png';
import vet2 from './Images/vet2.png';
import vet3 from './Images/vet3.png';
import vet4 from './Images/vet4.png';
import vet5 from './Images/vet5.JPG';
import Navbar from './Navbar';
import Footer from './Footer';

const Vets = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const locationQuery = searchParams.get('location') || 'Location';
  const petQuery = searchParams.get('pet') || 'Pet';

  const vets = [
    {
      id: 1,
      name: 'Dr. Pema Tshoki',
      title: 'Veterinarian, MRCVS',
      reviews: '34 reviews',
      description: 'My name is Pema Tshoki. I qualified as a vet in 2016 from Edinburgh University, went on to work in small animal practice and then to complete a masters at the Royal Veterinary College in wild animal health.',
      location: 'Kawangjangsa, Thimphu, Bhutan',
      certification: 'Certification details',
      image: vet1,
    },
    {
      id: 2,
      name: 'Dr. Kinga Lham',
      title: 'Veterinarian, MRCVS',
      reviews: '29 reviews',
      description: 'My name is Kinga. I qualified as a vet in 2016 from Edinburgh University, went on to work in small animal practice and then to complete a masters at the Royal Veterinary College in wild animal health.',
      location: 'Kawangjangsa, Thimphu, Bhutan',
      certification: 'Certification details',
      image: vet4,
    },
       {
        id: 3,
        name: 'Dr. Tshering Zam',
        title: 'Veterinarian, MRCVS',
        reviews: '29 reviews',
        description: 'My name is Tshering. I qualified as a vet in 2016 from Edinburgh University, went on to work in small animal practice and then to complete a masters at the Royal Veterinary College in wild animal health.',
        location: 'Kawangjangsa, Thimphu, Bhutan',
        certification: 'Certification details',
        image: vet3, // replace with your actual image paths
      },
      {
        id: 4,
        name: 'Dr. Phuntsho Om',
        title: 'Veterinarian, MRCVS',
        reviews: '29 reviews',
        description: 'My name is Phutsho. I qualified as a vet in 2016 from Edinburgh University, went on to work in small animal practice and then to complete a masters at the Royal Veterinary College in wild animal health.',
        location: 'Kawangjangsa, Thimphu, Bhutan',
        certification: 'Certification details',
        image: vet2, // replace with your actual image paths
      },
      {
        id: 5,
        name: 'Dr. Sangay Choden',
        title: 'Veterinarian, MRCVS',
        reviews: '29 reviews',
        description: 'My name is Sangay. I qualified as a vet in 2016 from Edinburgh University, went on to work in small animal practice and then to complete a masters at the Royal Veterinary College in wild animal health.',
        location: 'Kawangjangsa, Thimphu, Bhutan',
        certification: 'Certification details',
        image: vet5, // replace with your actual image paths
      },
      {
        id: 6,
        name: 'Dr. Sanzin Choden',
        title: 'Veterinarian, MRCVS',
        reviews: '29 reviews',
        description: 'My name is Sanzin. I qualified as a vet in 2016 from Edinburgh University, went on to work in small animal practice and then to complete a masters at the Royal Veterinary College in wild animal health.',
        location: 'Kawangjangsa, Thimphu, Bhutan',
        certification: 'Certification details',
        image: vet5, // replace with your actual image paths
      },
  ];

  const handleNavigate = () => {
    navigate('/vprofile');
  };

  return (
    <div style={{ width: '100%' }}>
      <Navbar />
      <div style={{ padding: '20px', marginTop: '100px' }}>
        {/* Search Tags */}
        <div style={{ marginBottom: '30px', display: 'flex', gap: '15px', marginLeft: '30px' }}>
          <div style={{ border: '1px solid #806E63', borderRadius: '8px', padding: '8px 16px', display: 'flex', alignItems: 'center', width: '150px' }}>
            <FaMapMarkerAlt style={{ marginRight: '8px',color:"#A52727" }} />
            {locationQuery}
          </div>
          <div style={{ border: '1px solid #806E63', borderRadius: '8px', padding: '8px 16px', display: 'flex', alignItems: 'center',  width: '120px' }}>
            <FaPaw style={{ marginRight: '15px',color:"#A52727" }} />
            {petQuery}
          </div>
        </div>

        {/* Vets Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)', // Two-column layout
          gap: '30px',
          width:"92%",
            marginLeft:"50px",
        }}>
          {vets.map((vet) => (
            <div
              key={vet.id}
              style={{
                border: '1px solid rgb(211, 201, 194)',
                borderRadius: '6px',
                padding: '30px',
                boxShadow: '0 0 10px rgba(139, 139, 139, 0.05)',
                cursor: 'pointer',
              }}
            >
              {/* Vet Info */}
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <img src={vet.image} alt={vet.name} style={{ width: '102px', height: '100px', borderRadius: '50%', marginRight: '16px', objectFit: 'cover' }} />
                <div>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>{vet.name}</h3>
                  <p style={{ margin: '4px 0', fontSize: '14px', color: '#666' }}>{vet.title}</p>
                  <p style={{ margin: 0, fontSize: '12px', color: '#999' }}>{vet.reviews}</p>
                </div>
                <div
                  style={{ marginLeft: 'auto', color: '#999', cursor: 'pointer' }}
                  onClick={handleNavigate}
                >
                  {/* <FaArrowRight /> */}
                  ❯
                </div>
              </div>

              {/* Description */}
              <p style={{ fontSize: '13px', color: '#555', marginBottom: '12px', lineHeight: '1.4' }}>
                {vet.description}
              </p>

              {/* Location */}
              <p style={{ fontSize: '13px', color: '#333', marginBottom: '8px' }}>
                {vet.location}
              </p>

              {/* Certification */}
              <p style={{ fontSize: '13px', color: '#333' }}>
                {vet.certification}:{' '}
                <span style={{ color: '#ccc', cursor: 'pointer' }} onClick={handleNavigate}>
                  view <FaArrowRight style={{ verticalAlign: 'middle' }} />
                </span>
              </p>


              {/* View More */}
              <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <hr style={{ border: '1px solid #ccc', margin: '20px 20px' }} />
                <button
                  onClick={handleNavigate}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#333',
                    cursor: 'pointer',
                    fontWeight: '500',
                    padding: '8px 0',
                  }}
                >
                  View more
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Vets;
