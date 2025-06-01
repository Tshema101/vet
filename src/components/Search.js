import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('pets');
  const navigate = useNavigate();

  const handleSearch = () => {
    // Navigate to Vets.js and pass search term and category as query params
    navigate(`/vets?location=${encodeURIComponent(searchTerm)}&category=${encodeURIComponent(category)}`);
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
    <div style={styles.searchSection}>
      <h2 style={styles.sectionTitle1}>
        Find <p style={{ fontSize: '2rem', color: '#A52727', marginLeft: '7px', marginRight: '4px' }}>Vets</p> near you
      </h2>
      <p style={styles.sectionSubtitle1}>Connect with online veterinary care.</p>

      <div style={styles.searchContainer}>
        <div style={styles.searchInputWrapper}>
          <FaSearch style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by location"
            style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          style={styles.categorySelect}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="pets">Pets</option>
          <option value="livestock">Livestock</option>
          <option value="agriculture">Agriculture</option>
        </select>
        <button style={styles.searchButton} onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
