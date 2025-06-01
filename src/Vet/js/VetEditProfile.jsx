import React, { useState, useEffect } from 'react';
import { FaSave } from 'react-icons/fa';
import VetHeader from './HeaderD';
import VetSidebar from './VetSidebar';
import { useNavigate } from 'react-router-dom';
import "../css/VetEditProfile.css";

const VetEditProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [originalData, setOriginalData] = useState(null);
  const [profile, setProfile] = useState({
    name: '',
    description: '',
    location: '',
    contact_no: '',
    chargePerHour: '',
    certifications: [],
    availability: {} 
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [changedFields, setChangedFields] = useState({
    profile: new Set(),
    availability: false
  });

  // Fetch initial data
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      const headers = {
        'Authorization': `Bearer ${token}`,
        // 'Content-Type': 'application/json'
      };

      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const userId = decodedToken.userId;

        // Fetch profile data
        const profileRes = await fetch(`http://localhost:8080/vets/${userId}`, { headers });
        const profileData = await profileRes.json();
        
        // Fetch availability data
        const availabilityRes = await fetch(`http://localhost:8080/availability/${userId}`, { headers });
        const availabilityData = await availabilityRes.json();

        const initialData = {
          ...profileData.data,
          availability: formatAvailabilityData(availabilityData.data || [])
        };

        setOriginalData(initialData);
        setProfile(initialData);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // Track changes
  useEffect(() => {
    if (!originalData) return;

    const changes = new Set();
    const allProfileFields = [
      'name', 'description', 'location', 'contact_no', 
      'chargePerHour', 'AccountNo', 'BankType', 'AccountHolder_Name'
    ];
    
    allProfileFields.forEach(field => {
      if (originalData[field] !== profile[field]) {
        changes.add(field);
      }
    });

    // Check certifications
    if (selectedFiles.length > 0 || 
        (profile.certifications && 
         JSON.stringify(profile.certifications) !== JSON.stringify(originalData.certifications))) {
      changes.add('certifications');
    }

    // Check availability
    let availabilityChanged = false;
    Object.keys(profile.availability).forEach(day => {
      const originalDay = originalData.availability[day];
      const currentDay = profile.availability[day];
      
      if (originalDay.isActive !== currentDay.isActive ||
          originalDay.start !== currentDay.start ||
          originalDay.end !== currentDay.end) {
        availabilityChanged = true;
      }
    });

    setChangedFields({
      profile: changes,
      availability: availabilityChanged
    });
  }, [profile, originalData, selectedFiles]);

  // Format availability data
  const formatAvailabilityData = (data) => {
    let formatted = {};
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    days.forEach(day => {
      const dayData = Array.isArray(data) 
        ? data.find(d => d.day.toLowerCase() === day.toLowerCase())
        : null;
        
      formatted[day] = dayData ? {
        start: dayData.startTime || '9:00 AM',
        end: dayData.endTime || '5:00 PM',
        isActive: dayData.isActive || false,
        slots: dayData.slots || []
      } : {
        start: '9:00 AM',
        end: '5:00 PM',
        isActive: false,
        slots: []
      };
    });
    
    return formatted;
  };



  // Handle file selection
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);
    changedFields.profile.add('certifications');
  };

  const handleRemoveExisting = (index) => {
    setProfile(prev => {
      const updatedCertifications = [...prev.certifications];
      updatedCertifications.splice(index, 1);
      
      return {
        ...prev,
        certifications: updatedCertifications
      };
    });
    changedFields.profile.add('certifications');
  };

  const handleRemoveNew = (index) => {
  setSelectedFiles(prev => {
    const updatedFiles = [...prev];
    updatedFiles.splice(index, 1);
    return updatedFiles;
  });
  changedFields.profile.add('certifications');
};




  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  // Availability functions
  const toggleDayAvailability = (day) => {
    setProfile(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability[day],
          isActive: !prev.availability[day].isActive,
          start: !prev.availability[day].isActive ? '9:00 AM' : prev.availability[day].start,
          end: !prev.availability[day].isActive ? '5:00 PM' : prev.availability[day].end
        }
      }
    }));
  };

  const toggleMeridian = (day, field) => {
    const currentTime = profile.availability[day][field];
    const [time, meridian] = currentTime.split(' ');
    const newMeridian = meridian === 'AM' ? 'PM' : 'AM';
    handleAvailabilityChange(day, field, `${time} ${newMeridian}`);
  };

  const updateTime = (day, field, direction) => {
    const currentTime = profile.availability[day][field];
    const [timeStr, meridian] = currentTime.split(' ');
    let [hours] = timeStr.split(':').map(Number);
    
    if (direction === 'up') {
      hours = hours === 12 ? 1 : hours + 1;
    } else {
      hours = hours === 1 ? 12 : hours - 1;
    }
    
    handleAvailabilityChange(day, field, `${hours}:00 ${meridian}`);
  };

  const handleAvailabilityChange = (day, field, value) => {
    setProfile(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability[day],
          [field]: value
        }
      }
    }));
  };

  // Time control component
  const TimeControl = ({ day, field }) => {
    const time = profile.availability[day][field];
    const [timeStr, meridian] = time.split(' ');
    const [hours] = timeStr.split(':');

    if (!profile.availability[day].isActive) {
      return <div className="time-box inactive">N/A</div>;
    }

    return (
      <div className="time-control">
        <div className="time-box">
          <span>{hours}:00</span>
          <div className="arrow-controls">
            <button type="button" onClick={() => updateTime(day, field, 'up')}>▲</button>
            <button type="button" onClick={() => updateTime(day, field, 'down')}>▼</button>
          </div>
        </div>
        <button 
          type="button" 
          className="ampm-toggle" 
          onClick={() => toggleMeridian(day, field)}
        >
          {meridian}
        </button>
      </div>
    );
  };



  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/');
      return;
    }
  
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const userId = decodedToken.userId;
  
    try {
      let updatesMade = false;
  
      // Collect form data for profile update
      if (changedFields.profile.size > 0) {
        updatesMade = true;
        const formData = new FormData();
  
        // Add changed fields to FormData
        changedFields.profile.forEach(field => {
          if (field === 'certifications') {
            selectedFiles.forEach(file => {
              formData.append('certifications', file);
            });
            // Add remaining certifications (the ones not deleted)
            formData.append('remainingCertifications', JSON.stringify(profile.certifications));
          } else {
            formData.append(field, profile[field]);
          }
        });
  
        const response = await fetch(`http://localhost:8080/update-vet/${userId}`, {
          method: 'PUT',
          body: formData
        });
  
        const responseData = await response.json();
  
        if (!response.ok) {
          throw new Error(responseData.message || 'Profile update failed');
        }
  
        // Update local state
        setProfile(prev => ({
          ...prev,
          ...responseData.data,
          availability: prev.availability
        }));
  
        setOriginalData(prev => ({
          ...prev,
          ...responseData.data,
          availability: prev.availability
        }));
  
        // Clear files if uploaded
        if (changedFields.profile.has('certifications')) {
          setSelectedFiles([]);
        }
      }
  
      // Update availability separately if changed
      if (changedFields.availability) {
        updatesMade = true;

        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        };
  
        const availabilityData = Object.entries(profile.availability)
          .filter(([_, data]) => data.isActive)
          .map(([day, data]) => ({
            day,
            startTime: data.start,
            endTime: data.end,
            isActive: true,
            slots: data.slots
          }));
  
          const availabilityResponse = await fetch(`http://localhost:8080/availability/${userId}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify({ availability: availabilityData })
          });
  
        const availabilityResponseData = await availabilityResponse.json();
  
        if (!availabilityResponse.ok) {
          throw new Error(availabilityResponseData.message || 'Availability update failed');
        }
      }
  
      if (!updatesMade) {
        alert('No changes detected');
        return;
      }
  
      alert('Profile updated successfully!');
      navigate('/VetProfile');
    } catch (error) {
      console.error('Update error:', error);
      alert(`Failed to update: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  
  

  
  // Check if field has changed
  const hasChanges = (field) => changedFields.profile.has(field);
  const hasAvailabilityChanges = changedFields.availability;

  if (isLoading) {
    return (
      <div className="container">
        <VetSidebar />
        <div className="main">
          <VetHeader />
          <div className="loading-message">Loading profile data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <VetSidebar />
      <div className="main">
        <VetHeader />
        <div className="vet-edit-profile-container">
          <h3>Edit Profile</h3>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="profile-section">
              <div className="form-group">
                <label>Name {hasChanges('name') && <span className="change-indicator">*</span>}</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className={`form-input ${hasChanges('name') ? 'changed-field' : ''}`}
                />
              </div>
              <div className="form-group">
                <label>Description {hasChanges('description') && <span className="change-indicator">*</span>}</label>
                <textarea
                  name="description"
                  value={profile.description}
                  onChange={handleChange}
                  className={`form-textarea ${hasChanges('description') ? 'changed-field' : ''}`}
                  rows="5"
                />
              </div>
              <div className="form-group">
                <label>Location {hasChanges('location') && <span className="change-indicator">*</span>}</label>
                <input
                  type="text"
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                  className={`form-input ${hasChanges('location') ? 'changed-field' : ''}`}
                />
              </div>
              <div className="form-group">
                <label>Contact Number {hasChanges('contact_no') && <span className="change-indicator">*</span>}</label>
                <input
                  type="text"
                  name="contact_no"
                  value={profile.contact_no}
                  onChange={handleChange}
                  className={`form-input ${hasChanges('contact_no') ? 'changed-field' : ''}`}
                />
              </div>
              <div className="form-group">
                <label>Charge Per Hour (Nu.) {hasChanges('chargePerHour') && <span className="change-indicator">*</span>}</label>
                <input
                  type="number"
                  name="chargePerHour"
                  value={profile.chargePerHour}
                  onChange={handleChange}
                  className={`form-input ${hasChanges('chargePerHour') ? 'changed-field' : ''}`}
                />
              </div>  
            </div>
            
            <div className="divider"></div>
            
            <div className="profile-section">
              <h3>Bank Information</h3>
            
              <div className="form-group">
                <label>Enter the email registered in Paypal {hasChanges('AccountHolder_Name') && <span className="change-indicator">*</span>}</label>
                <input
                  type="text"
                  name="AccountHolder_Name"
                  value={profile.AccountHolder_Name}
                  onChange={handleChange}
                  className={`form-input ${hasChanges('AccountHolder_Name') ? 'changed-field' : ''}`}
                />
              </div>  
              
            </div>
            
            <div className="divider"></div>
            
            <div className="profile-section">
              <div className="certifications-upload">
                <h3>Update Certifications {hasChanges('certifications') && <span className="change-indicator">*</span>}</h3>
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '15px', maxWidth: '100%' }}>
                  {/* Existing certifications from server */}
                  {profile.certifications?.filter(cert => typeof cert === 'string').map((cert, index) => (
                    <div key={`existing-${index}`} className="certification-item">
                      {cert.endsWith('.pdf') ? (
                        <div className="pdf-thumbnail">PDF</div>
                      ) : (
                        <img
                          src={cert}
                          alt={`Certification ${index + 1}`}
                          className="certification-thumbnail"
                        />
                      )}
                      <button
                        type="button"
                        className="remove-certification"
                        onClick={() => handleRemoveExisting(index)}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                  
                  {/* Newly selected files */}
                  {selectedFiles.map((file, index) => (
                    <div key={`new-${index}`} className="certification-item" >
                      {file.type.startsWith('image/') ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`New certification ${index + 1}`}
                          className="certification-thumbnail"
                          
                        />
                      ) : (
                        <div className="pdf-thumbnail">PDF</div>
                      )}
                      <button
                        type="button"
                        className="remove-certification"
                        onClick={() => handleRemoveNew(index)}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                  
                  {/* Upload button */}
                  <label className="certification-upload-label">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      accept="image/*,.pdf"
                      className={hasChanges('certifications') ? 'changed-field' : ''}
                    />
                    <div className="upload-icon">+</div>
                  </label>
                  
                  {profile.certifications?.length === 0 && selectedFiles.length === 0 && (
                    <p className="no-certifications">No certifications uploaded</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="divider"></div>
            
            <div className="profile-section">
              <h3>Change availability {hasAvailabilityChanges && <span className="change-indicator">*</span>}</h3>
              <div className="availability-table">
                {Object.entries(profile.availability).map(([day, data]) => (
                  <div className={`time-slot ${!data.isActive ? 'inactive-day' : ''}`} key={day}>
                    <div className="time-day-row">
                      <div className="time-label">{day}</div>
                      
                    </div>
                    
                    {data.isActive ? (
                      <div className="time-group" >
                        <TimeControl day={day} field="start" />
                        <span>to</span>
                        <TimeControl day={day} field="end" />
                      </div>
                    ) : (
                      <div className="time-group inactive-text">Not available</div>
                    )}

                      <button
                        type="button"
                        className={`toggle-availability ${data.isActive ? 'deactivate' : 'activate'}`}
                        onClick={() => toggleDayAvailability(day)}
                        style={{marginRight: "15px"}}
                      >
                        {data.isActive ? '−' : '+'}
                      </button>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              type="submit" 
              className={`save-button ${changedFields.profile.size > 0 || changedFields.availability ? 'has-changes' : ''}`}
              disabled={(changedFields.profile.size === 0 && !changedFields.availability) || isSubmitting}
            >
              {isSubmitting ? (
                'Saving...'
              ) : (
                <>
                  <FaSave className="icon" /> Save changes
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VetEditProfile;

