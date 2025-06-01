import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import Navbar from './Navbar';
import Footer from './Footer';
import '../css/BookingResponsive.css'; // Import your CSS file for styling
import Search from './Search'; // Import the Search component
const Booking= () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('pets');
  const navigate = useNavigate();
 
      // .filter((expertise) =>
      //   expertise?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase() || "")
      // )
   

      const handleSearch = async () => {
        try {
          const query = new URLSearchParams({
            location: searchTerm.trim(),
            specialist: category,
          }).toString();
      
          const response = await fetch(`https://vetserver.onrender.com/vets?${query}`);
          const data = await response.json();
      
          console.log("Approved Vets:", data.approved);
          console.log("Pending Vets:", data.pending);
          navigate('/vets', {
            state: {
              approved: data.approved,
              location: searchTerm.trim(),
              pet: category,
            },
          });
          // Optional: set state here to display results
        } catch (error) {
          console.error("Error fetching vets:", error);
        }
      };
      
      

  const styles = {
    searchSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      padding: '2rem',
      backgroundColor: 'white',
      marginTop: '2rem'
    },
    sectionTitle1: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '2rem',
      margin: 0,
    },
    sectionSubtitle1: {
      fontSize: '1rem',
      color: 'gray',
      marginTop: '0.5rem',
      marginBottom: '1rem',
    },
    searchContainer: {
      borderRadius: '200px',
      backgroundColor: '#6DC5EE',
      padding: '1.5rem',
      display: 'flex',
      width: '80%',
      maxWidth: '800px',
      gap: '1rem',
      marginTop: '.6rem',
      marginBottom: '.6rem',
      height: '76px',
    },
    searchInputWrapper: {
      flex: 2,
      display: 'flex',
      alignItems: 'center',
      borderBottom: '1px solid grey',
      backgroundColor: '#6DC5EE',
      paddingBottom: '4px',
    },
    searchInput: {
      flex: 1,
      padding: '0.4rem 0',
      border: 'none',
      outline: 'none',
      fontSize: '.9rem',
      backgroundColor: '#6DC5EE',
    },
    searchIcon: {
      color: '#113047',
      fontSize: '1rem',
      marginRight: '8px',
    },
    categorySelect: {
      flex: 1,
      padding: '0.4rem',
      border: 'none',
      borderBottom: '1px solid grey',
      fontSize: '.9rem',
      backgroundColor: '#6DC5EE',
    },
    searchButton: {
      backgroundColor: '#113047',
      color: 'white',
      border: 'none',
      borderRadius: '100px',
      width: '17%',
      height: '43px',
      fontSize: '1rem',
      cursor: 'pointer',
      marginTop: '-.4rem',
    },
  };

  return (
    <div style={{marginBottom: '5px', position: 'absolute', width: '100%'}}>
      <Navbar />
      <div style={{marginTop: '7rem', marginBottom: '10rem'}}>
    {/* <div className="booking-search-section" style={styles.searchSection}>
      <h2 className="booking-title" style={styles.sectionTitle1}>
        Find <p style={{ fontSize: '2rem', color: '#A52727', marginLeft: '7px', marginRight: '4px' }}>Vets</p> near you
      </h2>
      <p className="booking-subtitle" style={styles.sectionSubtitle1}>Connect with online veterinary care.</p>

      <div className="booking-search-container" style={styles.searchContainer}>
        <div className="booking-input-wrapper" style={styles.searchInputWrapper}>
          <FaSearch className="booking-search-icon" style={styles.searchIcon} />
          <input
          className="booking-search-input"
            type="text"
            placeholder="Search by location"
            style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
        className="booking-category-select"
          style={styles.categorySelect}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Pets">Pets</option>
          <option value="Livestock">Livestock</option>
          <option value="Agriculture">Agriculture</option>
          <option value="Both">Both</option>
        </select>
        <button className="booking-search-button" style={styles.searchButton} onClick={handleSearch}>
          Search
        </button>
      </div>
    </div> */}
    <Search />
    </div>
    <Footer />
    </div>
  );
};

export default Booking;
