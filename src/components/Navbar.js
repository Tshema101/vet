import React, { useState, useEffect } from "react";
import { ChevronDownIcon ,UserIcon} from "@heroicons/react/24/outline";
import logo from "./Images/logo.png";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profiledropdownOpen, profilesetDropdownOpen] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false); // Modal state
  
  const isLoggedIn = false; // Simulate logged-in user
  // const isLoggedIn = !!localStorage.getItem('token'); // Example

  const toggleAuthModal = () => {
    setShowAuthModal(!showAuthModal);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const styles = {
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 30px",
      backgroundColor: "white",
      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
      position: "fixed",
      top: 0,
      width: "100%",
      height: "90px",
      zIndex: 10,
      flexWrap: "wrap",
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
    },
    logoImg: {
      width: "75px",
      height: "70px",
      marginRight: "10px",
      border: "0.3px solid #4a6a81",
      borderRadius: "50%",
    },
    logoText: {
      fontSize: "20px",
      fontWeight: "bold",
      fontFamily: "sans-serif",
      borderBottom: "3px solid black",
    },
    navbarRight: {
      display: menuOpen ? "flex" : "none",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "20px",
      width: "100%",
      marginTop: "10px",
      backgroundColor: "#f0f0f0", // Background color for mobile menu
      padding: "10px",
      borderRadius: "5px",
      position: "absolute",
      top: "90px",
      left: 0,
      right: 0,
      zIndex: 1,
    },
    navbarRightDesktop: {
      display: "flex",
      alignItems: "center",
      fontWeight: "bold",
      gap: "40px",
      flexWrap: "wrap",
    },
    link: {
      textDecoration: "none",
      color: "#000",
      fontSize: "16px",
    },
    loginButton: {
      backgroundColor: "#a3d0f8",
      border: "none",
      padding: "8px 15px",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "16px",
      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
    },
    dropdownButton: {
      background: "none",
      border: "none",
      fontSize: "16px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "5px",
      fontWeight: "bold",
      fontFamily: "sans-serif",
      
    },
    dropdownMenu: {
      position: "absolute",
      top: "160%",
      left: 0,
      backgroundColor:"white",
      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
      minWidth: "180px",
      borderRadius: "5px",
      zIndex: 1,
    },
    dropdownItem: {
      padding: "10px",
      display: "block",
      textDecoration: "none",
      color: "#000",
      fontSize: "15px",
      

    },
    mobileToggle: {
      display: "block",
      background: "none",
      border: "none",
      fontSize: "24px",
      cursor: "pointer",
      marginLeft: "auto",
      backgroundColor:"white"
    },
    closeToggle: {
      display: "block",
      background: "none",
      backgroundColor:"white",      
      border: "none",
      fontSize: "30px",
      cursor: "pointer",
      marginLeft: "auto",
    },
    responsiveWrapper: {
      display: "flex",
      gap: "40px",
      alignItems: "center",
    },
    // Modal styles
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
      alignItems: 'center',
    },
    authModalLogo: {
      width: '230px',
      height: '220px',
      borderRadius: '50%',
      border: '1px solid rgba(93, 93, 93, 0.5)',
      marginBottom: '1.5rem',
    },
    authModalTitle: {
      fontSize: '1.8rem',
      color: '#2c3e50',
      marginBottom: '0.5rem',
      fontWeight: 'bold',
      fontFamily: 'times new roman',
    },
    authModalSubtitle: {
      fontSize: '1.1rem',
      color: '#7f8c8d',
      marginBottom: '2rem',
      fontStyle: 'italic',
    },
    authButtonsContainer: {
      display: 'inline-flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'column',
      gap: '.3rem',
      width: '100%',
    },
    authButtonPrimary: {
      flex: 1,
      padding: '0.8rem',
      backgroundColor: '#011523',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      fontSize: '1rem',
      cursor: 'pointer',
      fontWeight: 'bold',
      width: '500px',
      textDecoration: 'none',
    },
    authButtonSecondary: {
      flex: 1,
      padding: '0.8rem',
      color: 'white',
      backgroundColor: '#011523',
      borderRadius: '10px',
      fontSize: '1rem',
      cursor: 'pointer',
      fontWeight: 'bold',
      width: '500px',
      marginTop: '.5rem',
      textDecoration: 'none',
    },
  };

  return (
    <nav style={styles.nav}>
      {/* Logo */}
      <div style={styles.logoContainer}>
        <img src={logo} alt="VetConnect Logo" style={styles.logoImg} />
        <span style={styles.logoText}>VetConnect</span>
      </div>

      {/* Nav Links */}
      <div style={isMobile ? styles.navbarRight : styles.navbarRightDesktop}>
        {/* Dropdown */}
        <div style={{ position: "relative" }}>
          <button
            style={styles.dropdownButton}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            Become a member
            <ChevronDownIcon style={{ width: "20px", height: "20px" }} />
          </button>
          {dropdownOpen && (
            <div style={styles.dropdownMenu}>
              <a
                href="/"
                onClick={() => setDropdownOpen(false)}
                style={styles.dropdownItem}
              >
                Pet Owner
              </a>
              <a
                href="/vet"
                onClick={() => setDropdownOpen(false)}
                style={styles.dropdownItem}
              >
                Veterinarian
              </a>
            </div>
          )}
        </div>

        <a href="/aboutus" style={styles.link}>
          About Us
        </a>
        <a href="/media" style={styles.link}>
          News & Articles
        </a>

        {isLoggedIn ? (
  <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
    <div
  onClick={() => profilesetDropdownOpen(!profiledropdownOpen)}
  style={{
    backgroundColor: "#072F46", // Dark blue background
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    position: "relative",
  }}
>
  <UserIcon
    style={{
      width: "20px",
      height: "20px",
      color: "#fff", // White icon color
    }}
  />
</div>

    {/* Chevron icon */}
    <ChevronDownIcon
      onClick={() => profilesetDropdownOpen(!profiledropdownOpen)}
      style={{
        width: "16px",
        height: "16px",
        marginLeft: "5px",
        cursor: "pointer",
        color: "#072F46", // Match the theme
      }}
    />

    {/* Dropdown menu */}
    {dropdownOpen && (
      <div
        style={{
          position: "absolute",
          top: "50px",
          right: 0,
          backgroundColor: "#fff",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          zIndex: 1000,
          minWidth: "150px",
        }}
      >
        <a
          href="/userprofile"
          onClick={() => profilesetDropdownOpen(false)}
          style={{
            display: "block",
            padding: "10px 15px",
            textDecoration: "none",
            color: "#333",
            borderBottom: "1px solid #eee",
          }}
        >
          My Profile
        </a>
        <a
          href="/logout"
          onClick={() => setDropdownOpen(false)}
          style={{
            display: "block",
            padding: "10px 15px",
            textDecoration: "none",
            color: "#333",
          }}
        >
          Logout
        </a>
      </div>
    )}
  </div>
) : (
  <button style={styles.loginButton} onClick={toggleAuthModal}>
    Login / Signup
  </button>
)}

        {/* <button style={styles.loginButton}  onClick={toggleAuthModal}>Login / SignUp</button> */}
      </div>

   {/* Auth Modal Popup */}
   {showAuthModal && (
        <div style={styles.authModalOverlay} onClick={toggleAuthModal}>
          <div style={styles.authModalContent} onClick={(e) => e.stopPropagation()}>
            <img src={logo} alt="Vet Connect Logo" style={styles.authModalLogo} />
            <h2 style={styles.authModalTitle}>Welcome to Vet Connect</h2>
            <p style={styles.authModalSubtitle}>Where Care Meets Convenience</p>

            <div style={styles.authButtonsContainer}>
              <button style={styles.authButtonPrimary}>
                <a href='/login' style={{ textDecoration: 'none', color: 'white' }}>LOGIN</a>
              </button>
              <button style={styles.authButtonSecondary}>
                <a href='/client' style={{ textDecoration: 'none', color: 'white' }}>SIGN UP</a>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Toggle */}
      {isMobile && (
        <button
          style={styles.mobileToggle}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      )}
    </nav>
    
  );
};

export default Navbar;
