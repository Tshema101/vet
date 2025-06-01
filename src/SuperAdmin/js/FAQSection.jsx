import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../css/astyles.css";
import "../css/style.css";

const FAQSection = () => {
  const [contentData, setContentData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [editSuccessModalVisible, setEditSuccessModalVisible] = useState(false);
  const [deleteSuccessModalVisible, setDeleteSuccessModalVisible] =
    useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [questionError, setQuestionError] = useState("");
  const [answerError, setAnswerError] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [toggleStates, setToggleStates] = useState({});
  const [error, setErrors] = useState(null);
  const [showAddConfirmationModal, setShowAddConfirmationModal] =
    useState(false);
  const [showUpdateConfirmationModal, setShowUpdateConfirmationModal] =
    useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch("https://vetserver.onrender.com/content");
        const data = await res.json();
        const filtered = data
          .filter((item) => item.contentType === "faq")
          .reverse();
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
    setQuestionError("");
    setAnswerError("");

    if (!question) {
      setQuestionError("Question is required.");
      hasError = true;
    }
    if (!answer) {
      setAnswerError("Answer is required.");
      hasError = true;
    }

    return !hasError;
  };

  const handleAddOrUpdatefaq = async () => {
    if (!validateFields()) return;

    const formData = new FormData();
    formData.append("Question", question);
    formData.append("Answer", answer);
    formData.append("contentType", "faq"); // Add this line to set contentType;

    const url = isEditMode
      ? `https://vetserver.onrender.com/content/${selectedItem._id}`
      : "https://vetserver.onrender.com/content";
    const method = isEditMode ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to submit");

      const updatedContent = await fetch("https://vetserver.onrender.com/content");
      const allData = await updatedContent.json();
      const filteredFAQs = allData
        .filter((item) => item.contentType === "faq")
        .reverse();
      setContentData(filteredFAQs);

      setQuestion("");
      setAnswer("");
      setIsModalOpen(false);
      setIsEditMode(false);
      setSelectedItem(null);
      isEditMode
        ? setEditSuccessModalVisible(true)
        : setSuccessModalVisible(true);
    } catch (error) {
      console.error("Error submitting faq:", error);
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
        `https://vetserver.onrender.com/content/${selectedItem._id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete");

      const updatedContent = await fetch("https://vetserver.onrender.com/content");
      const allData = await updatedContent.json();
      const filteredFAQs = allData
        .filter((item) => item.contentType === "faq")
        .reverse();
      setContentData(filteredFAQs);

      setIsDeleteModalOpen(false);
      setDeleteSuccessModalVisible(true);
      setSelectedItem(null);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleEditClick = (item) => {
    setIsModalOpen(true);
    setIsEditMode(true);
    setSelectedItem(item);
    setQuestion(item.Question);
    setAnswer(item.Answer);
  };

  return (
    <div>
      <button
        className="add-expertise-btn"
        onClick={() => setIsModalOpen(true)}
      >
        Add FAQ
      </button>
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
        <table className="table">
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                Q.No
              </th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                Questions
              </th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                Answers
              </th>
              <th style={{ border: "1px solid #ddd", padding: "10px" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody style={{ textAlign: "left" }}>
            {contentData.map((item, index) => (
              <tr key={item._id}>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {index + 1}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {item.Question}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {item.Answer}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
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
      </div>

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
              height: "450px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            }}
          >
            <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
              {isEditMode ? "Edit FAQ" : "Add FAQ"}
            </h2>

            <label style={{ display: "block", marginBottom: "5px" }}>
              Question
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "15px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
            {questionError && (
              <p
                style={{ color: "red", fontSize: "13px", marginBottom: "8px" }}
              >
                {questionError}
              </p>
            )}

            <label style={{ display: "block", marginBottom: "5px" }}>
              Answer
            </label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                height: "150px",
                marginBottom: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                resize: "none",
              }}
            />
            {answerError && (
              <p
                style={{ color: "red", fontSize: "13px", marginBottom: "8px" }}
              >
                {answerError}
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
                onClick={handleAddOrUpdatefaq}
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
              Do you really want to delete this FAQ?
            </p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
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
    </div>
  );
};

export default FAQSection;
