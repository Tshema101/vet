
import React from 'react';
import pet from '../Images/pet.png';
import livestock from '../Images/livestock.png';
import farm from '../Images/farm.png';

const Services = () => {
  const styles = {
    servicesMainSection: {
      width: '100%',
      padding: '4rem 2rem',
      backgroundColor: '#fffef7',
      textAlign: 'center',
    },
    servicesTitle: {
      fontSize: '2rem',
      color: '#b10000',
      marginBottom: '0.5rem',
      fontWeight: '800',
      letterSpacing: '1px',
    },
    servicesSubtitle: {
      fontSize: '1rem',
      color: '#333',
      fontStyle: 'italic',
      marginBottom: '3rem',
      maxWidth: '800px',
      marginLeft: '400px',
      marginRight: '400px',
    },
    servicesGrid: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '4rem',
    },
    serviceCard: {
      width: '380px',
      backgroundColor: '#fff',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      overflow: 'hidden',
      textAlign: 'left',
      height: '430px',
    },
    imageWrapper: {
      position: 'relative',
      width: '100%',
      height: '300px',
      overflow: 'hidden',
    },
    serviceImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    ribbon1: {
      position: 'absolute',
      marginTop: '-140px',
      marginLeft: '-697px',
      left: '70%',
      width: '380px',
      textAlign: 'center',
      height: '55px',
      transform: 'translateX(-50%)',
      backgroundColor: '#63b3ed',
      color: '#fff',
      fontWeight: '1000',
      padding: '0.5rem 1.5rem',
      fontSize: '1.5rem',
      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
    },
    ribbon2: {
      position: 'absolute',
      marginTop: '-140px',
      marginLeft: '-250px',
      left: '70%',
      width: '380px',
      textAlign: 'center',
      height: '55px',
      transform: 'translateX(-50%)',
      backgroundColor: '#63b3ed',
      color: '#fff',
      fontWeight: '1000',
      padding: '0.5rem 1.5rem',
      fontSize: '1.5rem',
      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
    },
    ribbon3: {
      position: 'absolute',
      marginTop: '-140px',
      marginLeft: '189px',
      left: '70%',
      width: '380px',
      textAlign: 'center',
      height: '55px',
      transform: 'translateX(-50%)',
      backgroundColor: '#63b3ed',
      color: '#fff',
      fontWeight: '1000',
      padding: '0.5rem 1.5rem',
      fontSize: '1.5rem',
      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
    },
    serviceText: {
      padding: '2rem 1.5rem 1.5rem',
      fontSize: '0.95rem',
      color: '#555',
      lineHeight: '1.6',
    },
  };

  return (
    <div style={styles.servicesMainSection}>
      {/* Responsive style block */}
      <style>
        {`
          @media (max-width: 1024px) {
            .services-subtitle {
              margin-left: auto !important;
              margin-right: auto !important;
              width: 90% !important;
            }

            .service-card {
              width: 90% !important;
            }

            .ribbon1, .ribbon2, .ribbon3 {
              left: 50% !important;
              margin-left: 0 !important;
              transform: translateX(-50%) !important;
              width: 80% !important;
              font-size: 1.2rem !important;
            }
          }

          @media (max-width: 600px) {
            .services-title {
              font-size: 1.5rem !important;
            }

            .service-card {
              width: 100% !important;
              height: auto !important;
            }

            .ribbon1, .ribbon2, .ribbon3 {
              font-size: 1rem !important;
              height: 40px !important;
              padding: 0.3rem 1rem !important;
            }
          }
        `}
      </style>

      <h1 style={styles.servicesTitle} className="services-title">SERVICES</h1>
      <p style={styles.servicesSubtitle} className="services-subtitle">
        “Compassionate Care for Every Animal - Whether it’s your beloved pet, farm animals, or livestock, we connect you to expert veterinarians.”
      </p>

      <div style={styles.servicesGrid}>
        {/* Card 1 */}
        <div style={styles.serviceCard} className="service-card">
          <div style={styles.imageWrapper}>
            <img src={pet} alt="Little friends" style={styles.serviceImage} />
          </div>
          <p style={styles.serviceText}>
            Veterinary care for your beloved pets, including vaccinations, checkups, and treatments.
          </p>
          <div style={styles.ribbon1} className="ribbon1">Little friends</div>
        </div>

        {/* Card 2 */}
        <div style={styles.serviceCard} className="service-card">
          <div style={styles.imageWrapper}>
            <img src={livestock} alt="Livestock" style={styles.serviceImage} />
          </div>
          <p style={styles.serviceText}>
            Dedicated veterinary services for farmers, ensuring healthy herds and sustainable farming.
          </p>
          <div style={styles.ribbon2} className="ribbon2">Livestock</div>
        </div>

        {/* Card 3 */}
        <div style={styles.serviceCard} className="service-card">
          <div style={styles.imageWrapper}>
            <img src={farm} alt="Farms" style={styles.serviceImage} />
          </div>
          <p style={styles.serviceText}>
            Expert guidance on farm animal care, disease prevention, and productivity enhancement.
          </p>
          <div style={styles.ribbon3} className="ribbon3">Farms</div>
        </div>
      </div>
    </div>
  );
};

export default Services;
