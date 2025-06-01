import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import SuperAdminSidebar from "./Sidebar";
import AdminHeader from "./Header";

const ContentManagement = () => {
  const location = useLocation();

  const getActiveTab = () => {
    if (location.pathname.includes("disease")) return "Disease Outbreak";
    if (location.pathname.includes("banner")) return "Banner";
    if (location.pathname.includes("faq")) return "FAQ";
    return "";
  };

  return (
    <div className="app-container flex h-screen">
      <SuperAdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <div style={{marginTop:"-30px"}} className="dashboard-container">
          <h2 className="dashboard-title">Content Management</h2>
          <div className="tab-buttons">
            <Link to="/contentmgnt/disease">
              <button
                className={`tab-button ${
                  getActiveTab() === "Disease Outbreak" ? "active" : ""
                }`}
              >
                Disease Outbreak
              </button>
            </Link>
            <Link to="/contentmgnt/banner">
              <button
                className={`tab-button ${
                  getActiveTab() === "Banner" ? "active" : ""
                }`}
              >
                Banner
              </button>
            </Link>
            <Link to="/contentmgnt/faq">
              <button
                className={`tab-button ${
                  getActiveTab() === "FAQ" ? "active" : ""
                }`}
              >
                FAQ
              </button>
            </Link>
          </div>

          <div className="tab-content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentManagement;
