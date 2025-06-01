

import React, { useState } from "react";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import "../css/ResetPassword.css";
import logo from "../Images/logo.png";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    let newErrors = {};

    if (!formData.newPassword.trim()) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      let newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const email = localStorage.getItem("email");

        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/reset-password/${email}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newPassword: formData.newPassword,
            confirmPassword: formData.confirmPassword,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Password reset successful:", data.message);
          navigate("/login");
        } else {
          const errorData = await response.json();
          setErrors({
            ...errors,
            form: errorData.error || "Something went wrong. Please try again.",
          });
        }
      } catch (error) {
        console.error("Error:", error);
        setErrors({
          ...errors,
          form: "Server error. Please try again later.",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="reset-password-container">
      <div className="form-section">
        <h2 className="login-title">LOG IN</h2>
        <p className="subtitle">TO CONTINUE</p>

        <h3 className="reset-title">Reset Password</h3>
        <form onSubmit={handleSubmit} className="reset-password-form">
          <div className={`input-group ${errors.newPassword ? "error" : ""}`}>
            <LockClosedIcon className="icon" />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
            />
            {errors.newPassword && (
              <span className="error-message">{errors.newPassword}</span>
            )}
          </div>

          <div className={`input-group ${errors.confirmPassword ? "error" : ""}`}>
            <LockClosedIcon className="icon" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>

          <button type="submit" className="continue-btn" disabled={isSubmitting}>
            {/* {isSubmitting ? "Submitting..." : "CONTINUE"} */}
            CONFIRM
          </button>
          {errors.form && <span className="error-message">{errors.form}</span>}
        </form>
      </div>

      <div className="vertical-line"></div>

      <div className="welcome-section">
        <img src={logo} alt="VetConnect Logo" className="logo" />
        <h2>Welcome to VetConnect</h2>
        <p>Where Care Meets Convenience!</p>
      </div>
    </div>
  );
};

export default ResetPassword;
