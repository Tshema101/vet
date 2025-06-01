import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../css/astyles.css";
import "../css/style.css";

const DiseaseOutbreak = () => {
  const [contentData, setContentData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const [editSuccessModalVisible, setEditSuccessModalVisible] = useState(false);
  const [deleteSuccessModalVisible, setDeleteSuccessModalVisible] =
    useState(false);
  const [diseaseName, setDiseaseName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [diseaseNameError, setDiseaseNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [imageError, setImageError] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [toggleStates, setToggleStates] = useState({});
  const [error, setErrors] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/content`);
        const data = await res.json();
        const filtered = data.filter((item) => item.contentType === "disease").reverse();
        setContentData(filtered);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchContent();
  }, []);

  useEffect(() => {
    if (
      successModalVisible ||
      deleteSuccessModalVisible ||
      editSuccessModalVisible
    ) {
      const timer = setTimeout(() => {
        setSuccessModalVisible(false);
        setDeleteSuccessModalVisible(false);
        setEditSuccessModalVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successModalVisible, deleteSuccessModalVisible, editSuccessModalVisible]);
  // Close modal
  const closeModal = () => {
    setSuccessModalVisible(false);
    setErrors({});
  };
  // Close Success Modal
  // Duplicate declaration removed

  const closeAddSuccessModal = () => {
    setSuccessModalVisible(false);
  };
  const validateFields = () => {
    let hasError = false;
    setDiseaseNameError("");
    setDescriptionError("");
    setImageError("");

    if (!diseaseName) {
      setDiseaseNameError("Disease name is required.");
      hasError = true;
    }
    if (!description) {
      setDescriptionError("Description is required.");
      hasError = true;
    }
    if (!image && !isEditMode) {
      setImageError("Image is required.");
      hasError = true;
    }

    return !hasError;
  };

  const handleAddOrUpdateDisease = async () => {
    if (!validateFields()) return;

    const formData = new FormData();
    formData.append("Disease_Name", diseaseName);
    formData.append("Description", description);
    formData.append("contentType", "disease");
    if (image) formData.append("image", image);

    const url = isEditMode
      ? `${process.env.REACT_APP_BASE_URL}/content/${selectedItem._id}`
      : `${process.env.REACT_APP_BASE_URL}/content`;
    const method = isEditMode ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to submit");

      const updatedContent = await fetch(`${process.env.REACT_APP_BASE_URL}/content`);
      const newData = await updatedContent.json();
      const filtered = newData.filter((item) => item.contentType === "disease").reverse();
      setContentData(filtered);

      setDiseaseName("");
      setDescription("");
      setImage(null);
      setIsModalOpen(false);
      setIsEditMode(false);
      setSelectedItem(null);
      isEditMode
        ? setEditSuccessModalVisible(true)
        : setSuccessModalVisible(true);
    } catch (error) {
      console.error("Error submitting disease:", error);
    }
  };


  const closeSuccessModal = () => {
    setSuccessModalVisible(false);
  };

  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/content/${selectedItem._id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete");

      const updatedContent = await fetch(`${process.env.REACT_APP_BASE_URL}/content`);
      const newData = await updatedContent.json();
      setContentData(newData);

      setIsDeleteModalOpen(false);
      setDeleteSuccessModalVisible(true);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleEditClick = (item) => {
    setIsModalOpen(true);
    setIsEditMode(true);
    setSelectedItem(item);
    setDiseaseName(item.Disease_Name);
    setDescription(item.Description);
    setImage(null);
  };

  return (
    <div
      className="table-container"
      style={{
        maxHeight: "490px",
        overflowY: "auto",
        overflowX: "auto",
        border: "1px solid #ddd",
        marginTop: "-5px",
      }}
    >
      <button
        className="add-expertise-btn"
        onClick={() => setIsModalOpen(true)}
      >
        Add Disease Outbreak
      </button>

      <table className="table">
        <thead>
          <tr>
            <th>Sl.no</th>
            <th>Disease Outbreak</th>
            <th>Description</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contentData
            .filter((item) => item.contentType === "disease").reverse()
            .map((item, index) => (
              <tr key={item._id || index}>
                <td>{index + 1}</td>
                <td>{item.Disease_Name}</td>
                <td
                  style={{
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    textAlign: "left",
                    verticalAlign: "top",
                    padding: "8px",
                  }}
                >
                  {item.Description}
                </td>
                <td>
                  {item.image?.length ? (
                    <a
                      href={item.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", color: "darkblue" }}
                    >
                      View
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td
                  className="action-buttons"
                  style={{
                    border: "none",
                    outline: "none",
                    paddingTop: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <button
                    className="action-btn edit-btn"
                    onClick={() => handleEditClick(item)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => handleDeleteClick(item)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div
          style={{
            textAlign: "left",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px 40px",
              borderRadius: "8px",
              width: "600px",
              height: "500px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            }}
          >
            <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
              {isEditMode ? "Edit Disease Outbreak" : "Add Disease Outbreak"}
            </h2>

            <label style={{ display: "block", marginBottom: "15px" }}>
              Disease Name
            </label>
            <input
              type="text"
              value={diseaseName}
              onChange={(e) => setDiseaseName(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
            {diseaseNameError && (
              <p
                style={{ color: "red", fontSize: "13px", marginBottom: "8px" }}
              >
                {diseaseNameError}
              </p>
            )}

            <label style={{ display: "block", marginBottom: "5px" }}>
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                height: "150px",
                marginBottom: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                resize: "none",
              }}
            />
            {descriptionError && (
              <p
                style={{ color: "red", fontSize: "13px", marginBottom: "8px" }}
              >
                {descriptionError}
              </p>
            )}

            <label style={{ display: "block", marginBottom: "5px" }}>
              Image
            </label>
            <label
              htmlFor="imageUpload"
              className="custom-file-input"
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "6px",
                cursor: "pointer",
                display: "block",
                marginBottom: "8px",
                backgroundColor: "#f9f9f9",
                color: "#666",
                fontSize: "14px",
              }}
            >
              {image ? image.name : "Click to select image"}
            </label>
            <input
              id="imageUpload"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              style={{ display: "none" }}
            />

            {imageError && (
              <p
                style={{ color: "red", fontSize: "13px", marginBottom: "8px" }}
              >
                {imageError}
              </p>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <button
                onClick={handleAddOrUpdateDisease}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#113047",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                {isEditMode ? "Update" : "Submit"}
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setIsEditMode(false);
                  setSelectedItem(null);
                }}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#A52727",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
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
              Do you really want to delete this disease outbreak?
            </p>
            <div style={{ display: "flex", gap: "200px", marginLeft: "25px" }}>
              <button
                onClick={handleConfirmDelete}
                style={{
                  backgroundColor: "#113047",
                  marginTop: " 20px",
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
                  color: "white",
                  marginTop: " 20px",
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
      {editSuccessModalVisible && (
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
              The disease outbreak was successfully updated.
            </p>
            <button
              className="close-btn"
              onClick={() => setEditSuccessModalVisible(false)}
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
              The disease outbreak was successfully added.
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
    </div>
  );
};

export default DiseaseOutbreak;
