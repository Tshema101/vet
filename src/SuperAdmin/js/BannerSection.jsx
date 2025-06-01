import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import "../css/astyles.css";
import "../css/style.css";

const CLOUDINARY_NAME = "dk6arlfnf";
const BannerSection = () => {
  const [banners, setBanners] = useState([]);
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [deleteSuccessModalVisible, setDeleteSuccessModalVisible] =
    useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [bannerData, setBannerData] = useState([]);
  const [imageIds, setImageIds] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
      setFileInputState(e.target.value);
      setErrMsg("");
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setErrMsg("Please select a image.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = async () => {
      await uploadImage(reader.result);
    };
    reader.onerror = () => {
      setErrMsg("Error reading file.");
    };
  };

  const uploadImage = async (base64EncodedImage) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/upload`, {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Upload failed");

      const newBanner = {
        id: banners.length + 1,
        url: base64EncodedImage,
        date: new Date().toLocaleDateString(),
      };

      setBanners([...banners, newBanner]);
      setFileInputState("");
      setPreviewSource("");
      setErrMsg("");
      setSuccessMsg("Image uploaded successfully!");
      setIsModalOpen(false); // <--- Close upload modal
      setSuccessModalVisible(true); // Show success
    } catch (err) {
      setErrMsg("Something went wrong! Please check the server.");
      setSuccessMsg("");
    }
    setTimeout(() => {
      window.location.reload(); // or refresh banner list from API
    }, 1000);
  };

  const closeDeleteSuccessModal = () => {
    setDeleteSuccessModalVisible(false);
    window.location.reload();
  };
  const closeAddSuccessModal = () => {
    setSuccessModalVisible(false);
    window.location.reload();
  };
  const handleDeleteBanner = (id) => {
    setSelectedItem(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const imageIdToDelete = imageIds[selectedItem]; // Use the correct imageId from the selectedItem index

      const response = await fetch(
        `http://localhost:8080/api/image/${encodeURIComponent(
          imageIdToDelete
        )}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete");
      setSuccessModalVisible(true);
      setIsDeleteModalOpen(false);
      setDeleteSuccessModalVisible(true);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  useEffect(() => {
    const fetchCloudinaryImages = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/images`);
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }
        const imageIds = await response.json();
        console.log("Fetched image IDs:", imageIds);
        setImageIds(imageIds);
        // Construct Cloudinary image URLs directly
        const cloudinaryUrls = imageIds.map(
          (id) =>
            `https://res.cloudinary.com/${CLOUDINARY_NAME}/image/upload/${id}`
        );
        setBannerData(cloudinaryUrls);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchCloudinaryImages();
  }, []);

  return (
    <div className="table-container"
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
        Add Banner
      </button>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div
            className="modal"
            style={{
              padding: "30px",
              borderRadius: "8px",
              textAlign: "center",
              width:"600px",
              // height: "300px",
            }}
          >
            <h4>Upload Banner</h4>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
            />
            {errMsg && (
              <p
                style={{
                  color: "red",
                  fontSize: "14px",
                  marginTop: "1px",
                  marginRight: "290px",
                  marginBottom: "10px",
                }}
              >
                {errMsg}
              </p>
            )}

            {previewSource && (
              <div>
                <h5 style={{textAlign:"left"}}>Preview:</h5>
                <img
                  src={previewSource}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                    marginTop: "10px",
                    border: "1px solid #ccc",
                    padding: "4px",
                    borderRadius: "6px",
                  }}
                />
              </div>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
                marginRight: "50px",
                marginLeft: "50px",
              }}
            >
              <button
                onClick={handleSubmitFile}
                style={{
                  backgroundColor: "#113047",
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
                  (e.target.style.backgroundColor = "#2E3942")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#113047")}
              >
                Upload
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
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
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <table className="table">
        <thead>
          <tr>
            <th>Sl.no</th>
            <th>Banner</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bannerData.map((imageUrl, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <button
                  onClick={() => setSelectedImage(imageUrl)}
                  style={{
                    backgroundColor: "#3498db",
                    color: "white",
                    padding: "6px 12px",
                    border: "none",
                    borderRadius: "4px",
                  }}
                >
                  View
                </button>
              </td>
              <td className="action-buttons">
                <button
                  className="action-btn delete-btn"
                  onClick={() => handleDeleteBanner(index)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View Image Modal */}
      {selectedImage && (
        <div className="modal-overlay">
          <div
            className="modal"
            style={{ position: "relative", padding: "30px", width: "700px" }}
          >
            <button
              onClick={() => setSelectedImage(null)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "transparent",
                border: "none",
                fontSize: "17px",
                color: "#113047",
              }}
            >
              <FaTimes />
            </button>
            <img
              src={selectedImage}
              alt="Selected Banner"
              style={{
                maxWidth: "100%",
                width: "700px",
                maxHeight: "400px",
                border: "1px solid #ccc",
                padding: "4px",
                borderRadius: "3px",
              }}
            />
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
              Do you really want to delete this banner?
            </p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleConfirmDelete}
                style={{
                  backgroundColor: "#113047",
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
              The banner was successfully added.
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

export default BannerSection;
