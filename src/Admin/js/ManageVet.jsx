import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTrash,FaArrowAltCircleRight } from "react-icons/fa";
import "../css/astyles.css";
import AdminHeader from "./Header";
import SuperAdminSidebar from "./Sidebar";
import { color } from "framer-motion";

const ManageVet = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [vetList, setVetList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVet, setSelectedVet] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [vetToDelete, setVetToDelete] = useState(null);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
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

  const confirmDelete = (id) => {
    setVetToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/deleteVets/${vetToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status >= 200 && response.status < 300) {
        setVetList((prev) => ({
          ...prev,
          approved: prev.approved.filter((vet) => vet._id !== vetToDelete),
        }));
        setSuccessModalVisible(true);
      } else {
        setError("Failed to delete vet. Please try again.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete vet. Please try again.");
    } finally {
      setIsDeleteModalOpen(false);
      setVetToDelete(null);
    }
  };

  const closeAddSuccessModal = () => {
    setSuccessModalVisible(false);
  };

  return (
    <div className="app-container flex h-screen">
      <SuperAdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <div className="dashboard-container" style={{ marginTop: "-30px" }}>
          {error && <div className="error-message">{error}</div>}

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
            <h3 style={{ padding: "20px" }}>Approved Vets</h3>

<h4 style={{ marginLeft:'900px', marginTop:'-10px', marginBottom:'10px' }}> <a href="/deletehistory" style={{textDecoration:"none", color:'black'}}>Delete History <FaArrowAltCircleRight  style={{marginBottom:"-3px"}}/> </a> </h4>


            {loading ? (
              <p>Loading...</p>
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
                  {vetList.approved?.filter((vet) =>
                    vet.name.toLowerCase().includes(searchTerm.toLowerCase())
                  ).map((vet) => (
                    <tr key={vet._id}>
                      <td>{vet.CID}</td>
                      <td>{vet.name}</td>
                      <td>{vet.email}</td>
                      <td>{vet.contact_no}</td>
                      <td>{vet.vet_license}</td>
                      <td>{vet.specialist}</td>
                      <td>{vet.location}</td>
                      <td
                        style={{ fontSize: "14px", color: "grey", cursor: "pointer" }}
                        onClick={() => setSelectedVet(vet)}
                      >
                        view
                      </td>
                      <td className="action-buttons">
                        <button
                          className="action-btn delete-btn"
                          onClick={() => confirmDelete(vet._id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

       {/* Delete Confirmation */}
      {isDeleteModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "30px 40px",
              borderRadius: "8px",
              textAlign: "center",
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              width: "500px",
              height: "200px",
            }}
          >
            <h3 style={{ marginBottom: "15px" }}>Confirmation!</h3>
            <p style={{ marginBottom: "20px" }}>
              Do you really want to delete this vet?
            </p>
            <div style={{ display: "flex", justifyContent:"space-between" ,marginInlineStart:"60px",marginInlineEnd:"60px"}}>
              <button
                onClick={handleConfirmDelete}
                style={{
                  backgroundColor: "#113047",
                   color: "white",
                  marginTop:" 20px",
                  width: "85px",
                  height: "38px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "background-color 0.2s ease-in-out",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#2E3942")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#113047")}
              >
                Yes
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                style={{
                  backgroundColor: "#A52727",
                  marginTop:" 20px",
                   color: "white",
                  width: "85px",
                  height: "38px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "background-color 0.2s ease-in-out",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#BB3A3A")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#A52727")}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

   {/* Success Modal */}
      {successModalVisible && (
        <div className="modal-overlay fade-in">
          <div
            className="modal success-modal"
            style={{
              textAlign: "center",
              padding: "2rem",
              borderRadius: "12px",
              backgroundColor: "#00000",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <h3
              style={{
                color: "#16a34a",
                fontSize: "1.5rem",
                marginBottom: "1rem",
              }}
            >
              Success!
            </h3>
            <p
              style={{
                fontSize: "1rem",
                color: "#374151",
                marginBottom: "1.5rem",
              }}
            >
              The Veterinarian is deleted successfully!
            </p>
            <button
              className="close-btn"
              onClick={closeAddSuccessModal}
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

        {/* Certificate Modal */}
        {selectedVet && (
          <div
            onClick={() => setSelectedVet(null)}
            className="modal-overlay"
          >
            <div
              className="modal"
              onClick={(e) => e.stopPropagation()}
              style={{ maxHeight: "80vh", overflowY: "auto" }}
            >
              <h3>Certificates</h3>
              {selectedVet.certifications?.length > 0 ? (
                selectedVet.certifications.map((cert, index) => {
                  const imageUrl = cert ? cert : null;
                  return (
                    <div key={index} style={{ marginBottom: "20px" }}>
                      {imageUrl ? (
                        <img src={imageUrl} alt="Certificate" style={{ maxWidth: "100%" }} />
                      ) : (
                        <p>No image available</p>
                      )}
                    </div>
                  );
                })
              ) : (
                <p>No certificates available.</p>
              )}
              <button
                onClick={() => setSelectedVet(null)}
                className="btn close"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageVet;