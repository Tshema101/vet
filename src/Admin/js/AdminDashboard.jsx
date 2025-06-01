import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import axios from "axios";
import "../css/astyles.css";
import AdminHeader from "./Header.js";
import SuperAdminSidebar from "./Sidebar";

  import { FaTimes } from 'react-icons/fa';
const  AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [vetList, setVetList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roleCounts, setRoleCounts] = useState([]);
  const [showCertificate, setShowCertificate] = useState(false);
  // const navigate = useNavigate();
 // Retrieve user role

  // Redirect if user is not an admin or super admin
  useEffect(() => {
    const fetchVet = async () => {
      const token = localStorage.getItem("authToken"); // Retrieve token from local storage
      if (!token) {
        setError("Unauthorized access. Please log in.");
        setLoading(false);
        return;
      }
  
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/vets`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in request headers
          },
        });
        setVetList(response.data);
        console.log(response.data)
      } catch (error) {
        console.log(error)
        setError("Failed to fetch vet data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchVet();
  }, []);
  
// Fetch user count data
useEffect(() => {
  const fetchUserCounts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/roles/user-count`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setRoleCounts(data);
      }
    } catch (err) {
      setError("Failed to fetch user counts.");
    } finally {
      setLoading(false);
    }
  };
  fetchUserCounts();
}, []);

// const expertiseCount = roleCounts.find((role) => role.role_type === "expertise")?.userCount || 0;
const vetCount = roleCounts.find((role) => role.role_type === "vet")?.userCount || 0;
const clientCount = roleCounts.find((role) => role.role_type === "client")?.userCount || 0;
// const superAdminCount = roleCounts.find((role) => role.role_type === "superAdmin")?.userCount || 0;

  return (
    <div className="app-container flex h-screen">
      <SuperAdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <div style={{marginTop:"-30px"}} className="dashboard-container">
          <h2 className="dashboard-title text-2xl font-bold mb-6" >Hi, Admin</h2>

          {/* Stats Section */}
          <div className="stats-grid">
              <div className="stats-card">
                <h2 className="stats-title">Total Veterinarian</h2>
                <p className="stats-number">{loading ? "Loading..." : vetCount}</p>
              </div>
              <div className="stats-card">
                <h2 className="stats-title">Total Client</h2>
                <p className="stats-number">{loading ? "Loading..." : clientCount}</p>
              </div>
            
            </div>
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
          <h3 style={{padding:"20px"}}>Newly Registered Vets</h3>
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
                 
                  </tr>
                </thead>
                <tbody>
                  {vetList.pending
                    .filter((vet) =>
                      vet.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((vet) => (
                      <tr key={vet.id}>
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
                                    <FaTimes
                                      onClick={() => setShowCertificate(false)}
                                      style={{
                                        position: 'absolute',
                                        top: '-70px',
                                        right: '10px',
                                        cursor: 'pointer',
                                      }}
                                    />
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
                                           
                        
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
