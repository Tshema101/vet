import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/astyles.css";
import AdminHeader from "./Header";
import SuperAdminSidebar from "./Sidebar";

const Testimonial = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [TestimonialList, setTestimonialList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toggleStates, setToggleStates] = useState({});
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const fetchTestimonials = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("Unauthorized access. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/getTestimonials`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const testimonials = response.data.testimonials;
      setTestimonialList(testimonials);

      // Sync toggle states
      const toggles = {};
      testimonials.forEach((t) => {
        toggles[t._id] = !t.Disable; // If Disable is false → ON
      });
      setToggleStates(toggles);
    } catch (err) {
      setError("Failed to fetch testimonials.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleToggle = async (id, isCurrentlyEnabled) => {
    const token = localStorage.getItem("authToken");
    const newDisableState = isCurrentlyEnabled; // If ON, set Disable = true

    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/disableTestimonial/${id}`,
        { Disable: newDisableState },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Show message
      const action = newDisableState ? "disabled" : "enabled";
      setMessage(`Testimonial ${action} successfully.`);

      // Refetch data to sync state
      fetchTestimonials();

      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Toggle error:", err);
      setMessage("Something went wrong.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="app-container flex h-screen ">
      <SuperAdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <div className="dashboard-container p-6" style={{marginTop:"-30px"}} >
          <h2 className="dashboard-title text-2xl font-bold mb-6">Testimonials</h2>
          {message && (
            <p className="status-message mb-4 text-green-600 font-medium">
              {message}
            </p>
          )}

          <div className="table-container">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="error-message">{error}</p>
            ) : TestimonialList.length === 0 ? (
              <p>No Testimonials.</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Review</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {TestimonialList.filter((t) =>
                    t.name.toLowerCase().includes(searchTerm.toLowerCase())
                  ).map((testimony) => (
                    <tr key={testimony._id}>
                      <td>{testimony.name}</td>
                      <td>{testimony.email}</td>
                      <td>{testimony.Review}</td>
                      <td>
                        <label className="switchtesti">
                          <input
                            type="checkbox"
                            checked={toggleStates[testimony._id] || false}
                            onChange={() =>
                              handleToggle(
                                testimony._id,
                                toggleStates[testimony._id]
                              )
                            }
                          />
                          <span className="slidertesti round"></span>
                        </label>
                      </td>
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

export default Testimonial;
