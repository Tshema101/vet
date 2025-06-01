import React, { useState , useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('Pets');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  
 const dzongkhags = [
  "Bumthang", "Chhukha", "Dagana", "Gasa", "Haa", "Lhuntse", "Mongar",
  "Paro", "Pemagatshel", "Punakha", "Samdrup Jongkhar", "Samtse", "Sarpang",
  "Thimphu", "Trashigang", "Trashiyangtse", "Trongsa", "Tsirang",
  "Wangdue Phodrang", "Zhemgang"
];
      // .filter((expertise) =>
      //   expertise?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase() || "")
      // )
      useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);
    

      const handleSearch = async () => {
        try {
          const query = new URLSearchParams({
            location: searchTerm.trim(),
            specialist: category,
          }).toString();
      
          const response = await fetch(`${process.env.REACT_APP_BASE_URL}/vets?${query}`);
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
      fontWeight:'800',
      alignItems: 'center',
      fontSize: isMobile ? '1.5rem' : '2rem',
      margin: 0,
    },
    sectionSubtitle1: {
      fontSize: isMobile ? '0.9rem' : '1rem',
      color: 'gray',
      marginTop: '0.5rem',
      marginBottom: '1rem',
    },
    searchContainer: {
      flexDirection: isMobile ? 'column' : 'row',
      borderRadius: isMobile ? '5px' : '200px',
      backgroundColor: '#6DC5EE',
      padding: '1.5rem',
      display: 'flex',
      width: '80%',
      maxWidth: '800px',
      gap: isMobile ? '0.8rem' : '1rem',
      marginTop: '.6rem',
      marginBottom: '.6rem',
      height: isMobile ? 'auto' : '88px',
    },
    searchInputWrapper: {
      flex: 2,
      display: 'flex',
      alignItems: 'center',
      borderBottom: '1px solid grey',
      backgroundColor: '#6DC5EE',
      paddingBottom: '6px',
    },
    searchInput: {
      flex: 1,
      padding: '0.4rem 0',
      border: 'none',
      outline: 'none',
      fontSize: isMobile ? '.8rem' : '.9rem',
      backgroundColor: '#6DC5EE',
    },
    searchIcon: {
      color: '#113047',
      fontSize: isMobile ? '0.8rem' : '1rem',
      marginRight: '8px',
    },
    categorySelect: {
      flex: 1,
      padding: '0.4rem',
      border: 'none',
      borderBottom: '1px solid grey',
      fontSize: isMobile ? '.8rem' : '.9rem',
      backgroundColor: '#6DC5EE',
    },
    searchButton: {
      backgroundColor: '#113047',
      color: 'white',
      border: 'none',
      borderRadius: isMobile ? '7px' : '100px',
      width: isMobile ? '100%' : '17%',
      height: '50px',
      fontSize: isMobile ? '0.9rem' : '1.1rem',
      cursor: 'pointer',
      marginTop: isMobile ? '0.5rem' : '-.4rem',
    },
  };

  return (
    <div style={styles.searchSection}>
      <h2 style={styles.sectionTitle1}>
        Find <p style={{ fontSize:isMobile?'1.5rem': '2rem', color: '#A52727', marginLeft: '7px', marginRight: '4px', fontWeight:'800' }}>Vets</p> near you
      </h2>
      <p style={styles.sectionSubtitle1}>Connect with online veterinary care.</p>

      <div style={styles.searchContainer}>
        {/* <div style={styles.searchInputWrapper}>
          <FaSearch style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by location"
            style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div> */}
<div style={styles.searchInputWrapper}>
  <FaSearch style={styles.searchIcon} />
  <select
    style={styles.searchInput}
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  >
    <option value="" disabled hidden>
      Search by location
    </option>
    {dzongkhags.map((dzongkhag) => (
      <option key={dzongkhag} value={dzongkhag} style={{backgroundColor:"white", border:"none"}}>
        {dzongkhag}
      </option>
    ))}
  </select>
</div>


        <select
          style={styles.categorySelect}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Pets" style={{backgroundColor:"white", border:"none"}}>Pets</option>
          <option value="Livestock" style={{backgroundColor:"white", border:"none"}}>Livestock</option>
          <option value="Agriculture" style={{backgroundColor:"white", border:"none"}}>Agriculture</option>
          {/* <option value="Both">Both</option> */}
        </select>
        <button style={styles.searchButton} onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;


