import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import '../css/VetRegister.css'; // Import your CSS file for styles

const VetRegister = () => {
  const navigate = useNavigate();
  const [popupVisible, setPopupVisible] = useState(false); // New state for popup
    const [loading, setLoading] = useState(false);
  // const role = window.location.pathname.split('/')[1];
  const [formData, setFormData] = useState({
    name: '',
    CID: '',
    email: '',
    contact_no: '',
    gender: '',
    specialist: '',
    vet_license: '',
    location: '',
    certifications: [],
    agreeToTerms: false,
    role:"vet"
  });


  const dzongkhags = [
  "Bumthang",
  "Chhukha",
  "Dagana",
  "Gasa",
  "Haa",
  "Lhuntse",
  "Mongar",
  "Paro",
  "Pemagatshel",
  "Punakha",
  "Samdrup Jongkhar",
  "Samtse",
  "Sarpang",
  "Thimphu",
  "Trashigang",
  "Trashiyangtse",
  "Trongsa",
  "Tsirang",
  "Wangdue Phodrang",
  "Zhemgang"
  ];

  const [errors, setErrors] = useState({});
  const [previewFiles, setPreviewFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Responsive styles
  const getStyles = () => {
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    return {
      container: {
        width: '100%',
        marginTop: isMobile ? '70px' : '100px',
        maxWidth: '1000px',
        marginLeft: isMobile ? '0' : '80px',
        padding: isMobile ? '1rem' : '2rem',
        backgroundColor: 'white',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column'
      },
      section: {
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        width: '100%'
      },
      input: {
        width: isMobile ? '100%' : isTablet ? '350px' : '500px',
        padding: '0.8rem',
        border: '1px solid #7b7b7b',
        borderRadius: '5px',
        fontSize: '13px'
      },

      submitButton: {
        width: isMobile ? '100%' : isTablet ? '350px' : '500px',
        padding: '1rem',
        background: '#6DC5EE',
        color: 'white',
        fontWeight:'bold',
        border: 'none',
        borderRadius: '5px',
        fontSize: '1.1rem',
        cursor: 'pointer',
        transition: 'background 0.3s',
      },
      leftSection: {
        marginRight: isMobile ? '0' : '2rem',
        width: isMobile ? '100%' : 'auto'
      },
      rightSection: {
        marginLeft: isMobile ? '0' : '10rem',
        marginTop: isMobile ? '2rem' : '0',
        width: isMobile ? '100%' : 'auto'

      },

       fileUpload: {
        border: '2px dashed #ccc',
        width: isMobile ? '100%' : isTablet ? '350px' : '500px',
        // height: '250px',
        padding: '1.5rem',
        textAlign: 'center',
        borderRadius: '5px',
        marginTop: '1rem',
        transition: 'border-color 0.3s',
        borderColor: isHovered ? '#E7F7FF' : '#ccc'
      },
      uploadText: {
        marginBottom: '1rem',
        color: '#666'
      },
      fileInputButton: {
        padding: '0.6rem 1.2rem',
        background: '#113047',
        color: 'white',
        // fontWeight:'bold',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1rem',
        transition: 'background 0.3s'
      },
      fileInputButtonHover: {
        background: '#6DC5EE'
      },
      filePreviews: {
        marginTop: '1rem',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '1rem',
        justifyContent: isMobile ? 'center' : 'flex-start'
      },
      filePreview: {
        width: '120px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        padding: '0.5rem',
        position: 'relative'
      },
      previewImage: {
        width: '100%',
        height: '100px',
        objectFit: 'contain',
        borderRadius: '4px'
      },
      fileIcon: {
        width: '100%',
        height: '100px',
        background: '#f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '4px'
      },
      fileExtension: {
        fontWeight: 'bold',
        color: '#555'
      },
      fileInfo: {
        marginTop: '0.5rem',
        fontSize: '0.8rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      fileName: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '80px'
      },
      removeFile: {
        background: 'none',
        border: 'none',
        color: '#ff4444',
        fontSize: '1rem',
        cursor: 'pointer',
        padding: '0 0.2rem'
      },
      removeFileHover: {
        color: '#113047'
      },
      termsText: {
                      fontSize: isMobile ? '0.75rem' : '0.85rem',
                      lineHeight: '1.4',
                      width:'500px',
                      // marginLeft:'-98px',
                    }
    }

  };

  const popupStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999
    },
    box: {
      background: '#fff',
      padding: '30px',
      borderRadius: '5px',
      textAlign: 'center',
      animation: 'fadeIn 0.3s ease',
      width: '500px',
      height: '250px',	
      boxShadow: '0 0 10px rgba(0,0,0,0.25)'
    },
    text: {
      fontSize: '18px',
      margin: '20px 0',
    },
    okButton: {
      padding: '10px 20px',
      border: 'none',
      background: '#113047',
      color: 'white',
      fontSize: '16px',
      width:"100px",
      borderRadius: '8px',
      cursor: 'pointer',
      marginTop: '20px',
    },
    tickAnimation: {
      width: '90px',
      height: '90px',
      margin: '0 auto 10px auto',
    },
    svg: {
      width: '100px',
      height: '100%'
    },
    circle: {
      fill: 'none',
      stroke: '#4CAF50',
      strokeWidth: 5,
      strokeMiterlimit: 10,
      strokeDasharray: 157,
      strokeDashoffset: 157,
      animation: 'stroke 0.6s forwards'
    },
    check: {
      stroke: '#4CAF50',
      strokeWidth: 5,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeDasharray: 48,
      strokeDashoffset: 48,
      animation: 'checkmark 0.6s 0.6s forwards'
    }
  };

  const [currentStyles, setCurrentStyles] = useState(getStyles());
   const [apiError, setApiError] = useState('');
   const [showPopup, setShowPopup] = useState(false);


  // Update styles on window resize
  React.useEffect(() => {
    const handleResize = () => {
      setCurrentStyles(getStyles());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setFormData({
        ...formData,
        certifications: [...formData.certifications, ...files]
      });
      
      const imagePreviews = files.map(file => {
        if (file.type.startsWith('image/')) {
          return URL.createObjectURL(file);
        }
        return null;
      });
      setPreviewFiles([...previewFiles, ...imagePreviews]);
    }
  };

  const removeFile = (index) => {
    const updatedFiles = [...formData.certifications];
    const updatedPreviews = [...previewFiles];
    
    if (updatedPreviews[index]) {
      URL.revokeObjectURL(updatedPreviews[index]);
    }
    
    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);
    
    setFormData({
      ...formData,
      certifications: updatedFiles
    });
    setPreviewFiles(updatedPreviews);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
// CID validation - exactly 11 digits
if (!formData.CID.trim()) {newErrors.CID = 'CID is required';
} else if (!/^\d{11}$/.test(formData.CID)) {
  newErrors.CID = 'CID must be 11 digits';
}
     // Email validation
     if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = 'Valid email required';
    }

       // Phone validation - 8 digits starting with 17 or 77
       if (!formData.contact_no.trim()) {
        newErrors.contact_no = 'Phone number is required';
      } else if (!/^(17|77)\d{6}$/.test(formData.contact_no)) {
        newErrors.contact_no = 'Phone must be 8 digits starting with 17 or 77';
      } 


    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.specialist) newErrors.specialist = 'Specialist is required';
    if (!formData.vet_license) newErrors.vet_license = 'Vet license is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (formData.certifications.length === 0) newErrors.certifications = 'At least one certification file is required';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submission triggered');
    setApiError(''); // Clear any previous API errors
    console.log("Form Data Before Sending:", formData);
    
    // Validation of the form before submitting
    if (validateForm()) {
      console.log('Form validation passed, sending API request...');
  
      // Create a new FormData instance
      const formDataToSend = new FormData();
      
      // Loop through formData to append text fields (exclude files)
      for (let key in formData) {
        if (formData.hasOwnProperty(key)) {
          if (key !== 'certifications') {
            formDataToSend.append(key, formData[key]); // Append other form fields
          }
        }
      }
  
      // Append certifications (files) if they exist
      if (formData.certifications) {
        for (let i = 0; i < formData.certifications.length; i++) {
          formDataToSend.append('certifications', formData.certifications[i]); // Append each file
        }
      }
      setLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/signup`, {
          method: 'POST',
          body: formDataToSend, // Send FormData without the 'Content-Type' header
        });
  
        if (response.ok) {
          console.log('Signup successful');
          setShowPopup(true); // Show confirmation popup
        } else {
          // Handle errors returned by the API
          const errorData = await response.json();
          console.log(errorData);
          setApiError(errorData.message || 'Signup failed');
        }
      } catch (error) {
        console.log(error)
        console.error('Error during signup:', error);
        setApiError('An error occurred. Please try again later.');
      }finally {
        setLoading(false);
      }
    }
  };
  
  return (
    <div style={{marginBottom: '5px', position: 'absolute', width: '100%'}}>
      <Navbar />
    <div style={currentStyles.container}>
      <h1 style={{ fontSize: '2rem', color: '#333', marginBottom: '1.5rem', textAlign: 'left' }}>Vet Registration</h1>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
      {apiError && <div className="api-error-message">{apiError}</div>}
        <form onSubmit={handleSubmit}>
          <div style={currentStyles.section}>
            {/* Left Section */}
            <div style={currentStyles.leftSection}>
              <h3 style={{fontSize: '1rem', color: '#363e5e', marginBottom: '0.5rem' }}>Name</h3>
              <div style={{ marginBottom: '2rem' }}>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Name" 
                  value={formData.name}
                  onChange={handleChange}
                  style={currentStyles.input}
                />
                {errors.name && <span style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.3rem', display: 'block' }}>{errors.name}</span>}
              </div>

              <h3 style={{ fontSize: '1rem', color: '#363e5e', marginBottom: '0.5rem' }}>CID</h3>
              <div style={{ marginBottom: '2rem' }}>
                <input 
                  type="text" 
                  name="CID" 
                  placeholder="CID number" 
                  value={formData.CID}
                  onChange={handleChange}
                  maxLength="11"
                  style={currentStyles.input}
                />
                {errors.CID && <span style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.3rem', display: 'block' }}>{errors.CID}</span>}
              </div>

              <h3 style={{ fontSize: '1rem', color: '#363e5e', marginBottom: '0.5rem' }}>Email</h3>
              <div style={{ marginBottom: '2rem' }}>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Email" 
                  value={formData.email}
                  onChange={handleChange}
                  style={currentStyles.input}
                />
                {errors.email && <span style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.3rem', display: 'block' }}>{errors.email}</span>}
              </div>

              <h3 style={{ fontSize: '1rem', color: '#363e5e', marginBottom: '0.5rem' }}>Phone Number</h3>
              <div style={{ marginBottom: '2rem' }}>
                <input
                  type="tel" 
                  name="contact_no" 
                  placeholder="Phone Number"
                  value={formData.contact_no}
                  onChange={handleChange}
                  maxLength="8"
                  style={currentStyles.input}
                />
                {errors.contact_no && <span style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.3rem', display: 'block' }}>{errors.contact_no}</span>}
              </div>

              <h3 style={{ fontSize: '1rem', color: '#363e5e', marginBottom: '0.5rem' }}>Gender</h3>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="radio" 
                    name="gender" 
                    value="male" 
                    checked={formData.gender === 'male'}
                    onChange={handleChange}
                  /> Male
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="radio" 
                    name="gender" 
                    value="female" 
                    checked={formData.gender === 'female'}
                    onChange={handleChange}
                  /> Female
                </label>
              </div>
              {errors.gender && <span style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.3rem', display: 'block' }}>{errors.gender}</span>}

              <h3 style={{ fontSize: '1rem', color: '#363e5e', marginBottom: '0.5rem' }}>Specialist</h3>
              <div style={{ marginBottom: '2rem' }}>
                <select 
                  name="specialist" 
                  value={formData.specialist}
                  onChange={handleChange}
                  style={currentStyles.input}
                >
                  <option value="">Select Specialist</option>
                  <option value="Livestock">Livestock</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Pets">Pets</option>
                  <option value="Both">Both</option>
                </select>
                {errors.specialist && <span style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.3rem', display: 'block' }}>{errors.specialist}</span>}
              </div>

              <h3 style={{ fontSize: '1rem', color: '#363e5e', marginBottom: '0.5rem' }}>Vet License</h3>
              <div style={{ marginBottom: '2rem' }}>
                <input
                  type="text" 
                  name="vet_license" 
                  placeholder="Vet License Number" 
                  value={formData.vet_license}
                  onChange={handleChange}
                  style={currentStyles.input}
                />
                {errors.vet_license && <span style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.3rem', display: 'block' }}>{errors.vet_license}</span>}
              </div>

                    <h3 style={{ fontSize: '1rem', color: '#363e5e', marginBottom: '0.5rem' }}>Location</h3>
      <div style={{ marginBottom: '2rem' }}>
        <select
          name="location" 
          value={formData.location}
          onChange={handleChange}
          style={currentStyles.input}
        >
          <option value="">Select Dzongkhag</option>
          {dzongkhags.map((dzongkhag, index) => (
            <option key={index} value={dzongkhag}>{dzongkhag}</option>
          ))}
        </select>
        {errors.location && <span style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.3rem', display: 'block' }}>{errors.location}</span>}
      </div>
            </div>

            {/* Right Section */}
            <div style={currentStyles.rightSection}>
              <div>
                <h3 style={{ fontSize: '1rem', color: '#363e5e', marginBottom: '0.5rem' }}>Certification Details:</h3>
                <div 
                  style={currentStyles.fileUpload}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsHovered(true);
                  }}
                  onDragLeave={() => setIsHovered(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsHovered(false);
                    if (e.dataTransfer.files.length > 0) {
                      handleFileChange({ target: { files: e.dataTransfer.files } });
                    }
                  }}
                >
                  <p style={currentStyles.uploadText}>Drag your certification files here</p>
                  <p style={currentStyles.uploadText}>OR</p>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <input
                      type="file" 
                      ref={fileInputRef}
                      name="certifications" 
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      multiple
                      style={{ display: 'none' }}
                    />
                    <button 
                      type="button" 
                      onClick={triggerFileInput}
                      style={currentStyles.fileInputButton}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      Browse files
                    </button>
                  </div>
                  
                  <div style={currentStyles.filePreviews}>
                    {formData.certifications.map((file, index) => (
                      <div key={index} style={currentStyles.filePreview}>
                        {previewFiles[index] ? (
                          <img 
                            src={previewFiles[index]} 
                            alt={file.name} 
                            style={currentStyles.previewImage}
                          />
                        ) : (
                          <div style={currentStyles.fileIcon}>
                            <span style={currentStyles.fileExtension}>
                              {file.name.split('.').pop()}
                            </span>
                          </div>
                        )}
                        <div style={currentStyles.fileInfo}>
                          <span style={currentStyles.fileName}>{file.name}</span>
                          <button 
                            type="button" 
                            style={currentStyles.removeFile}
                            onClick={() => removeFile(index)}
                            onMouseEnter={(e) => e.target.style.color = '#cc0000'}
                            onMouseLeave={(e) => e.target.style.color = '#ff4444'}
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {errors.certifications && (
                    <span style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.3rem', display: 'block' }}>
                      {errors.certifications}
                    </span>
                  )}
                </div>
              </div>

         {/* Updated Terms and Conditions with responsive text */}
         <div style={{ margin: '1.5rem 0' }}>
                 
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.7rem', marginLeft: '1px' }}>
                  <input
                    type="checkbox" 
                    name="agreeToTerms" 
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                  />
                  <span style={currentStyles.termsText}>
                    By submitting this form, you confirm that you have read and agree to VetConnect 
                    Privacy Policy and consent to receiving marketing emails. You may opt out at any time.
                  </span>
                </label>
                {errors.agreeToTerms && (
                  <span style={{ color: 'red', fontSize: '0.8rem', marginTop: '0.3rem', display: 'block' }}>
                    {errors.agreeToTerms}
                  </span>
                )}
              </div>

              <button 
                type="submit" 
                style={currentStyles.submitButton}
                onMouseOver={(e) => e.target.style.background = '#3D7995'}
                onMouseOut={(e) => e.target.style.background = '#6DC5EE'}
                 disabled={loading}>
            {loading ? "Submitting" : "Submit"}
        
              </button>
              
            </div>
          </div>
        </form>

        {showPopup && (
    <div style={popupStyles.overlay}>
    <div style={popupStyles.box}>
      <div style={popupStyles.tickAnimation}>
        <svg viewBox="0 0 52 52" style={popupStyles.svg}>
          <circle style={popupStyles.circle} cx="25" cy="26" r="24" />
          <path style={popupStyles.check} fill="none" d="M14,27 L22,35 L38,19" />
        </svg>
      </div>
            <p className="popup-text">Confirmation sent, please wait for approval!</p>
            <button onClick={() => navigate('/')} style={{  
              padding: '10px 20px',
              border: 'none',
              background: '#113047',
              color: 'white',
              fontSize: '16px',
              width:"100px",
              borderRadius: '20px',
              cursor: 'pointer',
              marginTop: '20px',}}>OK</button>
          </div>
        </div>
      )}

      </div>

    </div>
   <Footer />

    </div>
  );
};

export default VetRegister;