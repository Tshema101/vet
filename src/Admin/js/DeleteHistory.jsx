import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import "../css/astyles.css";
import AdminHeader from "./Header";
import SuperAdminSidebar from "./Sidebar";

const DeleteHistory = () => {
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
           <h3 style={{ padding: "20px" }}> <a href="/vetManage" style={{textDecoration:"none", color:'black'}}> <FaArrowAltCircleLeft style={{marginBottom:'-3px'}} /> </a> Deleted Vets</h3>
           <div
            className="table-container"
          >  
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
               
                  </tr>
                </thead>
                <tbody>
                  {vetList.deletedVets?.filter((vet) =>
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
                    
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

       {/* Delete Confirmation */}
  


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
                  const imageUrl = cert
                    ? `${cert}`
                    : null;
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

export default DeleteHistory;
