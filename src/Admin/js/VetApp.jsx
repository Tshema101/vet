import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/astyles.css";
import AdminHeader from "./Header";
import SuperAdminSidebar from "./Sidebar";
import { FaTimes } from 'react-icons/fa';


const VetApp = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [vetList, setVetList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVet, setSelectedVet] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [approveSuccessModalVisible, setApproveSuccessModalVisible] = useState(false);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVet = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Unauthorized access. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/vets`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVetList(response.data);
      } catch (error) {
        setError("Failed to fetch vet data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchVet();
  }, []);

  const openViewModal = (vet) => {
    setSelectedVet(vet);
    setModalVisible(true);
  };

  const approveVet = () => {
    setConfirmationVisible(true); // Show confirmation modal
  };

  const confirmApproveVet = async () => {
    if (!selectedVet) return;

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Unauthorized access. Please log in.");
        return;
      }

      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/approve-vet`,
        {
          email: selectedVet.email,
          isApproved: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage("Vet approved successfully!");
      setApproveSuccessModalVisible(true);
      setConfirmationVisible(false);
      setModalVisible(false);
      setRejectModalVisible(false);
    } catch (err) {
      setError("Failed to approve vet. Please try again.");
    }
  };

  const rejectVet = () => {
    // Show rejection reason textarea when reject is clicked
    setRejectModalVisible(true);
    setModalVisible(false);  // Close the view modal
    setConfirmationVisible(false); // Close confirmation modal
  };

  const submitRejection = async () => {
    if (!selectedVet || !rejectionReason) {
      setError("Please provide a rejection reason.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Unauthorized access. Please log in.");
        return;
      }

      await axios.post(`${process.env.REACT_APP_BASE_URL}/approve-vet`,
        {
          email: selectedVet.email,
          isApproved: false,
          rejectionReason: rejectionReason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage("Vet rejected successfully!");
      setRejectModalVisible(false); // Close rejection modal after rejection
      setModalVisible(false); // Close view modal
      
    } catch (err) {
      setError("Failed to reject vet. Please try again.");
    }
  };

  return (
    <div className="app-container flex h-screen">
      <SuperAdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <div style={{marginTop:"-30px"}} className="dashboard-container">
          <div
        className="table-container"
        style={{
          maxHeight: "400px",
          overflowY: "auto",
          overflowX: "auto",
          border: "1px solid #ddd",
          marginTop: "20px",
        }}
      >
            <h3 style={{ padding: "20px" }}>Vet Application</h3>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="error-message">{error}</p>
            ) : vetList.length === 0 ? (
              <p>No vets registered.</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>CID Number</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Vet License</th>
                    <th>Specialist</th>
                    <th>Location</th>
                    <th>Certifications</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vetList.pending
                    .filter((vet) =>
                      vet.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((vet) => (
                      <tr key={vet._id}>
                        <td>{vet.CID}</td>
                        <td>{vet.name}</td>
                        <td>{vet.email}</td>
                        <td>{vet.contact_no}</td>
                        <td>{vet.vet_license}</td>
                        <td>{vet.specialist}</td>
                        <td>{vet.location}</td>
                          <td
                                                              style={{ fontSize: '14px', color: 'grey', cursor: 'pointer', textDecoration: 'none', marginBottom: '30px' }}
                                                              onClick={() => setShowCertificate(true)}
                                                            >
                                                              view 
                                                            </td>
                                                
                                                
                                                     {/* Certificate Modal */}
                                                     {showCertificate && (
                                                  <div
                                                    onClick={() => setShowCertificate(false)}
                                                    style={{
                                                      position: 'fixed',
                                                      top: 0,
                                                      left: 0,
                                                      width: '100vw',
                                                      height: '100vh',
                                                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                                      display: 'flex',
                                                      alignItems: 'center',
                                                      justifyContent: 'center',
                                                      zIndex: 1000,
                                                    }}
                                                  >
                                                    <div
                                                      onClick={(e) => e.stopPropagation()}
                                                      style={{
                                                        backgroundColor: '#fff',
                                                        padding: '20px',
                                                        borderRadius: '5px',
                                                        maxWidth: '800px',
                                                        width: '100%',
                                                        maxHeight: '80vh',
                                                        overflowY: 'auto',
                                                      }}
                                                    >
                                                      <h3 style={{ marginBottom: '20px' }}>Certificates</h3>
                                                
                                                      {vet.certifications.map((cert, index) => {
                                                       const imageUrl = cert ? cert : null;

                                                
                                                        return (
                                                          <div
                                                            key={index}
                                                            style={{
                                                              position: 'relative',
                                                              background: '#fff',
                                                              padding: '20px',
                                                              borderRadius: '8px',
                                                              marginBottom: '20px',
                                                            }}
                                                          >
                                                           
                                                            {imageUrl ? (
                                                              <img
                                                                src={imageUrl}
                                                                alt="Certificate"
                                                                style={{ maxWidth: '100%', height: 'auto' }}
                                                              />
                                                            ) : (
                                                              <p>No image available</p>
                                                            )}
                                                          </div>
                                                        );
                                                      })}
                                                
                                                      <button
                                                        onClick={() => setShowCertificate(false)}
                                                        style={{
                                                          marginTop: '10px',
                                                          padding: '8px 16px',
                                                          backgroundColor: '#007bff',
                                                          color: '#fff',
                                                          border: 'none',
                                                          borderRadius: '4px',
                                                          cursor: 'pointer',
                                                        }}
                                                      >
                                                        Close
                                                      </button>
                                                    </div>
                                                  </div>
                                                )}
                        <td className="action-buttons">
                          <button
                            style={{
                              backgroundColor: "#113047",
                              padding: "8px",
                              color: "#ffffff",
                              borderRadius: '5px',
                            }}
                            className="action-btn"
                            onClick={() => openViewModal(vet)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>

          {modalVisible && selectedVet && !confirmationVisible && (
  <div className="modal-overlay fade-in">
    <div className="modal" style={{ 
      maxWidth: "600px",  // Increased from 500px
      width: "90%",       // Responsive width
      padding: "25px 30px", // More padding
      borderRadius: "8px"
    }}>
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginBottom: "20px" 
      }}>
        <h3 style={{ 
          margin: 0,
          fontSize: "1.5rem",
          fontWeight: "600",
          color: "#333"
        }}>Register Veterinarian</h3>
        <button 
          onClick={() => setModalVisible(false)} 
          style={{
            background: "none",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            color: "#666",
            padding: "0 0 5px 5px"
          }}
        >
          ×
        </button>
      </div>

      <div style={{ 
        marginTop: "10px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
        alignItems: "start"
      }}>
        {/* Left Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          
        <div style={{ textAlign: "left" }}>
            <label style={{ 
              display: "block",
              marginBottom: "5px",
              fontWeight: "500",
              textAlign: "left"
            }}>Name</label>
            <input 
              type="text" 
              value={selectedVet.name} 
              readOnly 
              style={{ 
                width: "100%", 
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                backgroundColor: "#f5f5f5"
              }}
            />
          </div>
          <div style={{ textAlign: "left" }}>
            <label style={{ 
              display: "block",
              marginBottom: "5px",
              fontWeight: "500",
              textAlign: "left" // Left-align label
            }}>CID Number</label>
            <input 
              type="text" 
              value={selectedVet.CID} 
              readOnly 
              style={{ 
                width: "100%", 
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                backgroundColor: "#f5f5f5"
              }}
            />
          </div>

          <div style={{ textAlign: "left" }}>
            <label style={{ 
              display: "block",
              marginBottom: "5px",
              fontWeight: "500",
              textAlign: "left"
            }}>Location</label>
            <input 
              type="text" 
              value={selectedVet.location} 
              readOnly 
              style={{ 
                width: "100%", 
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                backgroundColor: "#f5f5f5"
              }}
            />
          </div>

        
        </div>

        {/* Right Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div style={{ textAlign: "left" }}>
            <label style={{ 
              display: "block",
              marginBottom: "5px",
              fontWeight: "500",
              textAlign: "left"
            }}>Email ID</label>
            <input 
              type="email" 
              value={selectedVet.email} 
              readOnly 
              style={{ 
                width: "100%", 
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                backgroundColor: "#f5f5f5"
              }}
            />
          </div>

         

          <div style={{ textAlign: "left" }}>
            <label style={{ 
              display: "block",
              marginBottom: "5px",
              fontWeight: "500",
              textAlign: "left"
            }}>Vet License</label>
            <input 
              type="text" 
              value={selectedVet.vet_license} 
              readOnly 
              style={{ 
                width: "100%", 
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                backgroundColor: "#f5f5f5"
              }}
            />
          </div>
          <div style={{ textAlign: "left" }}>
            <label style={{ 
              display: "block",
              marginBottom: "5px",
              fontWeight: "500",
              textAlign: "left"
            }}>Phone Number</label>
            <input 
              type="text" 
              value={selectedVet.contact_no} 
              readOnly 
              style={{ 
                width: "100%", 
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                backgroundColor: "#f5f5f5"
              }}
            />
          </div>
        </div>
        <div style={{ textAlign: "left" }}>
            <label style={{ 
              display: "block",
              marginBottom: "5px",
              fontWeight: "500",
              textAlign: "left"
            }}>File</label>
            <input 
            
              placeholder="click to view"
              onClick={() => setShowCertificate(true)}
              style={{ 
                width: "100%", 
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                backgroundColor: "#f5f5f5",
                pointer:"cursor"
              }}
            />

                                                


          </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row'}}>
                  <button className="update-btn" onClick={approveVet} style={{ backgroundColor:'#113047'}}>
                    Approve
                  </button>
                  <button className="cancel-btn" onClick={rejectVet} style={{ backgroundColor:"#A52727"}} >
                    Reject
                  </button>
                </div>
    </div>
  </div>
)}

          {confirmationVisible && (
            <div className="modal-overlay fade-in">
              <div className="modal confirmation-modal">
                <h3>Are you sure you want to approve this vet?</h3>
                <div style={{ display: 'flex', flexDirection: 'row', marginLeft:"-30px"}}>
                  <button className="update-btn" onClick={confirmApproveVet}  style={{ backgroundColor:'#113047'}}>
                    Yes
                  </button>
                  <button className="cancel-btn" onClick={() => setConfirmationVisible(false)} style={{ backgroundColor:"#A52727"}}>
                    No
                  </button>
                </div>
              </div>
            </div>
          )}

          {successMessage && (
            <div className="modal-overlay fade-in">
               <div className="modal success-modal" style={{ textAlign: "center", padding: "2rem", borderRadius: "12px", backgroundColor: "#00000", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
             <h3 style={{ color: "#16a34a", fontSize: "1.5rem", marginBottom: "1rem" }}>Success!</h3>
             <p style={{ fontSize: "1rem", color: "#374151", marginBottom: "1.5rem" }}>
               Rejection email send successfully.
             </p>
             <button
               className="close-btn"
               onClick={() => setSuccessMessage("")}
               style={{
                 padding: "0.5rem 1rem",
                 backgroundColor: "#16a34a",
                 color: "white",
                 border: "none",
                 borderRadius: "6px",
                 cursor: "pointer",
                 fontWeight: "bold",
                 transition: "background-color 0.2s ease-in-out",
               }}
               onMouseOver={(e) => (e.target.style.backgroundColor = "#15803d")}
               onMouseOut={(e) => (e.target.style.backgroundColor = "#16a34a")}
             >
               OK
             </button>
           </div>
            </div>
          )}

          {approveSuccessModalVisible && (
            <div className="modal-overlay fade-in">
                <div className="modal success-modal" style={{ textAlign: "center", padding: "2rem", borderRadius: "12px", backgroundColor: "#00000", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
             <h3 style={{ color: "#16a34a", fontSize: "1.5rem", marginBottom: "1rem" }}>Success!</h3>
             <p style={{ fontSize: "1rem", color: "#374151", marginBottom: "1.5rem" }}>
               Vet Approved Successfully.
             </p>
             <button
               className="close-btn"
               onClick={() => {
                setApproveSuccessModalVisible(false);
                setSuccessMessage(""); // clear any leftover rejection message
              }}
               style={{
                 padding: "0.5rem 1rem",
                 backgroundColor: "#16a34a",
                 color: "white",
                 border: "none",
                 borderRadius: "6px",
                 cursor: "pointer",
                 fontWeight: "bold",
                 transition: "background-color 0.2s ease-in-out",
               }}
               onMouseOver={(e) => (e.target.style.backgroundColor = "#15803d")}
               onMouseOut={(e) => (e.target.style.backgroundColor = "#16a34a")}
             >
               OK
             </button>
           </div>
            </div>
          )}

          {rejectModalVisible && (
            <div className="modal-overlay fade-in">
              <div className="modal rejection-modal">
                <h3>Enter Rejection Reason</h3>
                <textarea
                  placeholder="Rejection Reason"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  style={{
                    width: "100%", // Set width to 100% of the parent container
                    height: "150px", // Adjust the height to your preference
                    padding: "10px", // Optional padding for better readability
                    fontSize: "14px", // Optional font size adjustment
                    borderRadius: "5px", // Optional rounded corners
                    border: "1px solid #ccc", // Optional border styling
                  }}
                />
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <button className="update-btn" onClick={submitRejection} style={{ backgroundColor:'#113047'}}>
                    Send
                  </button>
                  <button className="cancel-btn" onClick={() => setRejectModalVisible(false)} style={{ backgroundColor:"#A52727"}}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VetApp;
