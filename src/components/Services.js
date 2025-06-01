import React from 'react';
import pet from './Images/pet.png'; // Ensure you replace with correct paths
import livestock from './Images/livestock.png';
import farm from './Images/farm.png';

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
      <h1 style={styles.servicesTitle}>SERVICES</h1>
      <p style={styles.servicesSubtitle}>
        “Compassionate Care for Every Animal - Whether it’s your beloved pet, farm animals, or livestock, we connect you to expert veterinarians.”
      </p>

      <div style={styles.servicesGrid}>
        {/* Card 1 */}
        <div style={styles.serviceCard}>
          <div style={styles.imageWrapper}>
            <img src={pet} alt="Little friends" style={styles.serviceImage} />
          </div>
          <p style={styles.serviceText}>
            Veterinary care for your beloved pets, including vaccinations, checkups, and treatments.
          </p>
          <div style={styles.ribbon1}>Little friends</div>
        </div>

        {/* Card 2 */}
        <div style={styles.serviceCard}>
          <div style={styles.imageWrapper}>
            <img src={livestock} alt="Livestock" style={styles.serviceImage} />
          </div>
          <p style={styles.serviceText}>
            Dedicated veterinary services for farmers, ensuring healthy herds and sustainable farming.
          </p>
          <div style={styles.ribbon2}>Livestock</div>
        </div>

        {/* Card 3 */}
        <div style={styles.serviceCard}>
          <div style={styles.imageWrapper}>
            <img src={farm} alt="Farms" style={styles.serviceImage} />
          </div>
          <p style={styles.serviceText}>
            Expert guidance on farm animal care, disease prevention, and productivity enhancement.
          </p>
          <div style={styles.ribbon3}>Farms</div>
        </div>
      </div>
    </div>
  );
};

export default Services;
