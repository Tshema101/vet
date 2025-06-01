
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDownIcon, UserIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../Images/logo.png";
import loginsingup from "../Images/loginsignup.png";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));

  // Check screen size and login status
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('authToken'));
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("storage", handleStorageChange);
    
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const toggleAuthModal = () => {
    setShowAuthModal(!showAuthModal);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleNavigate = () => {
    if (isLoggedIn) {
    navigate("/homepage");
    }
    else {
      navigate("/");
      // setShowAuthModal(true);
    }
  };

  // Animation variants
  const menuVariants = {
    open: { 
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
    closed: { 
      opacity: 0,
      y: -20,
      transition: { 
        duration: 0.2 
      } 
    }
  };

  const iconVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 }
  };

  const mobileMenuVariants = {
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.7,
        delayChildren: 0.3,
        staggerChildren: 0.05
      }
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.3
      }
    }
  };

  const mobileItemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  };

  const styles = {
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 5%",
      backgroundColor: "white",
      boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
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
      cursor: "pointer",
    },
    logoImg: {
      width: "65px",
      height: "65px",
      marginRight: "10px",
      border: "1px solid #4a6a81",
      borderRadius: "50%",
      transition: "transform 0.3s ease",
      "&:hover": {
        transform: "scale(1.05)"
      }
    },
    logoText: {
      fontSize: "22px",
      fontWeight: "bold",
      fontFamily: "'Times New Roman', serif",
      borderBottom: "3px solid rgb(23, 51, 69)",
      transition: "all 0.3s ease",
    },
    navbarRight: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      alignItems: isMobile ? "flex-start" : "center",
      gap: isMobile ? "15px" : "30px",
      width: isMobile ? "100%" : "auto",
      marginTop: isMobile ? "15px" : 0,
      backgroundColor: isMobile ? "#f8f9fa" : "transparent",
      padding: isMobile ? "20px" : 0,
      borderRadius: isMobile ? "8px" : 0,
      marginRight:  "-50px",
      // fontFamily: "'Times New Roman', serif",
      fontWeight: "bold",
    },
    link: {
      textDecoration: "none",
      color: "#333",
      fontSize: "16px",
      fontWeight: "600",
      padding: "8px 0",
      position: "relative",
      transition: "color 0.3s ease",
      "&:hover": {
        color: "#072F46",
      },
      "&::after": {
        content: '""',
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "0%",
        height: "2px",
        backgroundColor: "#072F46",
        transition: "width 0.3s ease",
      },
      "&:hover::after": {
        width: "100%"
      }
    },
    dropdownButton: {
      background: "none",
      border: "none",
      fontSize: "16px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "5px",
      fontWeight: "600",
      color: "#333",
      padding: "8px 0",
      position: "relative",
      "&:hover": {
        color: "#072F46",
      },
      "&::after": {
        content: '""',
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "0%",
        height: "2px",
        backgroundColor: "#072F46",
        transition: "width 0.3s ease",
      },
      "&:hover::after": {
        width: "100%"
      }
    },
    dropdownMenu: {
      position: "absolute",
      top: "100%",
      left: 0,
      backgroundColor: "white",
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      minWidth: "200px",
      borderRadius: "8px",
      zIndex: 100,
      overflow: "hidden",
      border: "1px solid #eee"
    },
    dropdownMenuu: {
      position: "absolute",
      top: "100%",
      right: 0,
      backgroundColor: "white",
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      minWidth: "150px",
      borderRadius: "8px",
      zIndex: 100,
      overflow: "hidden",
      border: "1px solid #eee"
    },
    dropdownItem: {
      padding: "12px 16px",
      display: "block",
      textDecoration: "none",
      color: "#333",
      fontSize: "15px",
      fontWeight: "500",
      transition: "all 0.2s ease",
      cursor: "pointer",
        fontWeight:"bold",

      "&:hover": {
        backgroundColor: "#f0f7ff",
        color: "#072F46",
        paddingLeft: "20px",
      }
    },
    mobileToggle: {
      display: "flex",
      background: "none",
      border: "none",
      cursor: "pointer",
      marginLeft: "auto",
      padding: "8px",
      borderRadius: "50%",
      transition: "all 0.3s ease",
      "&:hover": {
        backgroundColor: "#f0f0f0"
      }
    },
    authModalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2000,
    },
    authModalContent: {
      backgroundColor: 'white',
      padding: '2.5rem',
      borderRadius: '8px',
      width: '90%',
      maxWidth: '700px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      animation: 'scaleIn 0.3s ease-out'
    },
    authModalLogo: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      border: '1px solid rgba(93, 93, 93, 0.3)',
      marginBottom: '1.5rem',
      objectFit: 'cover'
    },
    authModalTitle: {
      fontSize: '1.8rem',
      color: '#2c3e50',
      marginBottom: '0.5rem',
      fontWeight: 'bold',
      fontFamily: "'Times New Roman', serif",
    },
    authModalSubtitle: {
      fontSize: '1rem',
      color: '#7f8c8d',
      marginBottom: '2rem',
      fontStyle: 'italic',
    },
    authButtonPrimary: {
      padding: '12px',
      backgroundColor: '#072F46',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      cursor: 'pointer',
      fontWeight: '600',
      width: '100%',
      maxWidth: '300px',
      margin: '8px 0',
      transition: 'all 0.3s ease',
      "&:hover": {
        backgroundColor: '#011523',
        transform: 'translateY(-2px)'
      }
    },
    profileIcon: {
      backgroundColor: "#072F46",
      borderRadius: "50%",
      width: "47px",
      height: "47px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "scale(1.1)"
      }
    }
  };

  return (
    <nav style={styles.nav}>
      {/* Logo */}
      <div style={styles.logoContainer} onClick={handleNavigate}>
        <img 
          src={logo} 
          alt="VetConnect Logo" 
          style={styles.logoImg} 
        />
        <span style={styles.logoText}>VetConnect</span>
      </div>

      {/* Mobile Menu Toggle */}
      {isMobile && (
        <motion.button
          style={styles.mobileToggle}
          onClick={() => setMenuOpen(!menuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {menuOpen ? (
            <XMarkIcon style={{ width: "24px", height: "24px", color: "#072F46", strokeWidth:"2px" }} />
          ) : (
            <Bars3Icon style={{ width: "24px", height: "24px", color: "#072F46", strokeWidth:"2px" }} />
          )}
        </motion.button>
      )}

      {/* Nav Links - Desktop */}
      {!isMobile && (
        <div style={styles.navbarRight}>
          <div style={{ position: "relative" }}>
            {!isLoggedIn ? (
              <>
                <motion.button
                  style={styles.dropdownButton}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  whileHover={{ scale: 1.02 }}
                >
                  Become a Member
                  <motion.span
                    animate={dropdownOpen ? "open" : "closed"}
                    variants={iconVariants}
                  >
                    <ChevronDownIcon style={{ width: "18px", height: "18px", marginLeft: "5px", strokeWidth:"3px", marginTop:"6px" }} />
                  </motion.span>
                </motion.button>
                
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      style={styles.dropdownMenu}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      variants={menuVariants}
                    >
                      <a
                        href="/"
                        onClick={() => setDropdownOpen(false)}
                        style={styles.dropdownItem}
                      >
                        Pet Owner
                      </a>
                      <hr style={{ margin: "0", borderColor: "#eee" }} />
                      <a
                        href="/VetRegistration"
                        onClick={() => setDropdownOpen(false)}
                        style={styles.dropdownItem}
                      >
                        Veterinarian
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <a href="/booking" style={{ textDecoration: "none" }}>
                <motion.button 
                  style={styles.dropdownButton}
                  whileHover={{ scale: 1.02 }}
                >
                  Book an Appointment
                </motion.button>
              </a>
            )}
          </div>

          <a href="/aboutus" style={styles.link}>
            About Us
          </a>
          <a href="/media" style={styles.link}>
            News & Articles
          </a>

          {isLoggedIn ? (
            <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "5px" }}>
              <motion.div
                style={styles.profileIcon}
                onClick={toggleProfileDropdown}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <UserIcon
                  style={{
                    width: "24px",
                    height: "24px",
                    color: "#fff",
                    strokeWidth: "3px",
                    cursor: "pointer"
                  }}
                />
              </motion.div>
              
              <motion.div
                onClick={toggleProfileDropdown}
                animate={profileDropdownOpen ? "open" : "closed"}
                variants={iconVariants}
              >
                <ChevronDownIcon
                  style={{
                    width: "16px",
                    height: "16px",
                    cursor: "pointer",
                    color: "#072F46",
                    strokeWidth: "4px",
                    marginTop:"6px" 
                  }}
                />
              </motion.div>

              <AnimatePresence>
                {profileDropdownOpen && (
                  <motion.div
                    style={styles.dropdownMenuu}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={menuVariants}
                  >
                    <a 
                      href="/userprofile" 
                      style={styles.dropdownItem}
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      My Profile
                    </a>
                    <hr style={{ margin: "0", borderColor: "#eee" }} />
                    <a 
                      onClick={() => {
                        handleLogout();
                        setProfileDropdownOpen(false);
                      }} 
                      style={styles.dropdownItem}
                    >
                      Logout
                    </a>
                     {/* <hr style={{ margin: "0", borderColor: "#eee" }} />
                    <a 
                      onClick={() => {
                        // handleLogout();
                        setProfileDropdownOpen(false);
                      }} 
                      style={styles.dropdownItem}
                    >
                      Change Password
                    </a> */}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.button 
              onClick={toggleAuthModal} 
              style={{ 
                position: 'relative', 
                border: 'none', 
                padding: 0, 
                cursor: 'pointer', 
                background: 'none',
                overflow: 'hidden',
                borderRadius: '8px'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img 
                src={loginsingup} 
                alt="Login / Signup" 
                style={{ 
                    display: 'block', 
                    width: '95%', 
                    height: 'auto' ,
                    marginTop:"5px",
                }} 
              />
              <span 
                style={{ 
                  position: 'absolute', 
                  top: '40%', 
                  left: '35%', 
                  transform: 'translate(-20%, -50%)',
                  color: 'black', 
                  fontWeight: 'bold',
                  fontSize: '15px',
                  pointerEvents: 'none',
                  marginTop:"5px",
                  marginLeft:"-10px",
                  // textAlign: "center"
                }}
              >
                Login / Signup
              </span>
            </motion.button>
          )}
        </div>
      )}

      {/* Mobile Menu - Animated */}
      {isMobile && (
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              style={{
                position: "absolute",
                top: "80px",
                left: 0,
                right: 0,
                backgroundColor: "#f8f9fa",
                padding: "0 5%",
                boxShadow: "0px 5px 10px rgba(0,0,0,0.1)",
                overflow: "hidden",
                zIndex: 999
              }}
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
            >
              <motion.div
                style={styles.navbarRight}
                variants={{
                  open: {
                    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                  },
                  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                }}
              >
                <motion.div variants={mobileItemVariants} style={{ position: "relative", width: "100%" }}>
                  {!isLoggedIn ? (
                    <>
                      <motion.button
                        style={styles.dropdownButton}
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                      >
                        Become a Member
                        <ChevronDownIcon style={{ 
                          width: "18px", 
                          height: "18px", 
                          marginLeft: "5px",
                          transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.3s ease",
                          strokeWidth: "3px",
                        }} />
                      </motion.button>
                      
                      <AnimatePresence>
                        {dropdownOpen && (
                          <motion.div
                            style={{
                              ...styles.dropdownMenu,
                              position: "relative",
                              boxShadow: "none",
                              margin: "10px 0",
                              width: "100%"
                            }}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={menuVariants}
                          >
                            <a
                              href="/"
                              onClick={() => setDropdownOpen(false)}
                              style={styles.dropdownItem}
                            >
                              Pet Owner
                            </a>
                            <hr style={{ margin: "0", borderColor: "#eee" }} />
                            <a
                              href="/VetRegistration"
                              onClick={() => setDropdownOpen(false)}
                              style={styles.dropdownItem}
                            >
                              Veterinarian
                            </a>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <a href="/booking" style={{ textDecoration: "none", width: "100%" }}>
                      <motion.button 
                        style={{ ...styles.dropdownButton, width: "100%", textAlign: "left" }}
                      >
                        Book an Appointment
                      </motion.button>
                    </a>
                  )}
                </motion.div>

                <motion.a href="/aboutus" style={styles.link} variants={mobileItemVariants}>
                  About Us
                </motion.a>

                <motion.a href="/media" style={styles.link} variants={mobileItemVariants}>
                  News & Articles
                </motion.a>

                {isLoggedIn ? (
                  <motion.div 
                    style={{ 
                      position: "relative", 
                      width: "100%",
                      display: "flex",
                      flexDirection: "column"
                    }}
                    variants={mobileItemVariants}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div
                        style={styles.profileIcon}
                        onClick={toggleProfileDropdown}
                      >
                        <UserIcon
                          style={{
                            width: "20px",
                            height: "20px",
                            color: "#fff",
                            strokeWidth: "3px",
                            cursor: "pointer"
                          }}
                        />
                      </div>
                      <span style={{ fontWeight: "600" }}>My Account</span>
                      <ChevronDownIcon
                        style={{
                          width: "16px",
                          height: "16px",
                          cursor: "pointer",
                          color: "#072F46",
                          marginLeft: "auto",
                          transform: profileDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.3s ease",
                          strokeWidth: "3px",
                          marginTop:"6px"

                        }}
                        onClick={toggleProfileDropdown}
                      />
                    </div>
                    
                    <AnimatePresence>
                      {profileDropdownOpen && (
                        <motion.div
                          style={{
                            marginTop: "10px",
                            width: "100%",
                            backgroundColor: "#fff",
                            borderRadius: "8px",
                            overflow: "hidden"
                          }}
                          initial="closed"
                          animate="open"
                          exit="closed"
                          variants={menuVariants}
                        >
                          <a 
                            href="/userprofile" 
                            style={styles.dropdownItem}
                            onClick={() => setProfileDropdownOpen(false)}
                          >
                            My Profile
                          </a>
                          <hr style={{ margin: "0", borderColor: "#eee" }} />
                          <a 
                            onClick={() => {
                              handleLogout();
                              setProfileDropdownOpen(false);
                            }} 
                            style={styles.dropdownItem}
                          >
                            Logout
                          </a>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.button 
                    onClick={toggleAuthModal} 
                    style={{ 
                      position: 'relative', 
                      border: 'none', 
                      padding: 0, 
                      cursor: 'pointer', 
                      background: 'none',
                      overflow: 'hidden',
                      borderRadius: '8px',
                      width: "100%",
                      margin: "10px 0"
                    }}
                    variants={mobileItemVariants}
                  >
                    <img 
                      src={loginsingup} 
                      alt="Login / Signup" 
                      style={{ 
                        display: 'block', 
                        width: '150px',
                        height: 'auto',
                      }} 
                    />
                    <span 
                      style={{ 
                       position: 'absolute', 
                  top: '41%', 
                  left: '9%', 
                  transform: 'translate(-20%, -50%)',
                  color: 'black', 
                  fontWeight: 'bold',
                  fontSize: '15px',
                  pointerEvents: 'none',
                  // marginTop:"5px",
                  // marginLeft:"-10px",
                  // textAlign: "center"

                      }}
                    >
                      Login / Signup
                    </span>
                  </motion.button>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Auth Modal Popup */}
      {showAuthModal && (
        <motion.div 
          style={styles.authModalOverlay}
          onClick={toggleAuthModal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            style={styles.authModalContent}
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <img src={logo} alt="Vet Connect Logo" style={styles.authModalLogo} />
            <h2 style={styles.authModalTitle}>Welcome to Vet Connect</h2>
            <p style={styles.authModalSubtitle}>Where Care Meets Convenience</p>

            <div style={{ width: "100%", maxWidth: "300px" }}>
              <motion.button 
                style={styles.authButtonPrimary}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <a href='/login' style={{ textDecoration: 'none', color: 'white', display: 'block' }}>LOGIN</a>
              </motion.button>
              <motion.button 
                style={styles.authButtonPrimary}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <a href='/client' style={{ textDecoration: 'none', color: 'white', display: 'block' }}>SIGN UP</a>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
