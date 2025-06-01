// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// import {
//   FaHome,
//   FaClipboardList,
//   FaComments,
//   FaUserCog,
//   FaMoneyBillWave,
//   FaSignOutAlt,
// } from "react-icons/fa";
// import logo from "../images/logo.png";
// import "../css/style.css";



// const VetSidebar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
  
//   const handleLogout = () => {
//   localStorage.removeItem("authToken");
//   navigate("/login");
// };

//   // Helper to check if the current path is active
//   const isActive = (path) => location.pathname === path ? "active" : "";

//   return (
//     <div className="sidebar text-white w-64 h-full p-4 flex flex-col justify-between" style={{ height: "100vh" }}>
      
//       {/* Logo Section */}
//       <div  className="sidebar-logo mb-8 flex flex-col items-center justify-center"
//         style={{ textAlign: "center" }}>
//         <img
//           src={logo}
//           alt="VetConnect Logo"
//           style={{
//       width: "120px",
//       height: "120px",
//       borderRadius: "50%",
//       objectFit: "cover", // Ensures the image fills the circle without distortion
//     }}
//         />
//       </div>

//       {/* Navigation Links */}
//       <div style={{ flexGrow: 1 }}>
//         <Link to="/vetdashboard" className={`block py-2 px-3 rounded mb-2 flex items-center ${isActive("/vetdashboard")}`}>
//           <FaHome className="mr-2" /> Dashboard
//         </Link>
//         <Link to="/appointments" className={`block py-2 px-3 rounded mb-2 flex items-center ${isActive("/appointments")}`}>
//           <FaUserCog className="mr-2" /> Appointments
//         </Link>
//         <Link to="/MySchedule" className={`block py-2 px-3 rounded mb-2 flex items-center ${isActive("/MySchedule")}`}>
//           <FaClipboardList className="mr-2" /> My Schedule
//         </Link>
//         <Link to="/VetReviews" className={`block py-2 px-3 rounded mb-2 flex items-center ${isActive("/VetReviews")}`}>
//           <FaComments className="mr-2" /> Reviews
//         </Link>
//         <Link to="/PaymentLog" className={`block py-2 px-3 rounded mb-2 flex items-center ${isActive("/PaymentLog")}`}>
//           <FaMoneyBillWave className="mr-2" /> Payment Log
//         </Link>
//       </div>

//       {/* Logout Button */}
//       <div className="logout" style={{
//           marginTop: "90% !important",
//           display: "flex",
//           justifyContent: "center",
//           paddingTop: "10px",
//           paddingbottom: "40px",
//         }}>
//         <button className="w-full py-2 px-2 rounded flex items-center justify-center bg-[#011523] hover:bg-[#022a3f]" style={{ width: "70%",marginBottom: "20px" }} onClick={handleLogout}>
//           <FaSignOutAlt className="mr-2 text-white" />
//           <span className="text-white">Logout</span>
//         </button>
//       </div>
      
//     </div>
//   );
// };

// export default VetSidebar;
