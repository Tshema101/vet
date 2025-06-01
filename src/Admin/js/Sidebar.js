import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  FaHome,
  FaClipboardList,
  FaComments,
  FaUserCog,
  FaMoneyBillWave,
  FaSignOutAlt,
} from "react-icons/fa";
import logo from "../images/logo.png";
import "../css/style.css";



const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogout = () => {
  localStorage.removeItem("authToken");
  navigate("/login");
};

  // Helper to check if the current path is active
  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <div className="sidebar text-white w-64 h-full p-4 flex flex-col justify-between" 
    style={{ height: "100vh",
       width: "290px",
        padding: "7px",
        textAlign: "left",
        justifyContent: "flex-start",
        borderTopLeftRadius: "0px",
        borderBottomLeftRadius: " 0px",
        paddingTop: "40px",
        paddingBottom: "40px",
        borderTopRightRadius: "24px",
        borderBottomRightRadius: "24px",
    }}
    >
      
      {/* Logo Section */}
      <div  className="sidebar-logo mb-8 flex flex-col items-center justify-center"
        style={{ textAlign: "center" }}>
        <img
          src={logo}
          alt="VetConnect Logo"
          style={{
    width: "140px",
            height: "140px",
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: "10px",
            // marginLeft: "65px",
    }}
        />
      </div>

      {/* Navigation Links */}
      <div style={{ flexGrow: 1 }}>
        <Link
          to="/adminDashboard"
                  className={`block py-2 px-3 rounded mb-2 flex items-center ${isActive("/adminDashboard") ? "bg-white text-[#011523]" : "hover:bg-[#022a3f]"}`}

  style={{
        backgroundColor: isActive("/adminDashboard") ? "white" : "#011523",
        color: isActive("/adminDashboard") ? "#011523" : "white",
        transition:"all 2s ease-in-out",
        borderRadius:" 10px",
        padding: "10px",
        marginTop: "30px",
        marginBottom: "15px",
        fontSize: "15px",
        fontWeight: "bold",
        width:"250px",
        height: "45px",
        marginLeft: "8px",
      }}
        >
          <FaHome style={{marginLeft:"20px", marginBottom:"-3px", fontSize:"18px"}} className="mr-2" /> Dashboard
        </Link>
        <Link
          to="/vetApplication"
          className={`block py-2 px-3 rounded mb-2 flex items-center ${isActive("/vetApplication") ? "bg-white text-[#011523]" : "hover:bg-[#022a3f]"}`}

  style={{
        backgroundColor: isActive("/vetApplication") ? "white" : "#011523",
        color: isActive("/vetApplication") ? "#011523" : "white",
        transition:"all 2s ease-in-out",
        borderRadius:" 10px",
        padding: "10px",
        marginTop: "10px",
        marginBottom: "15px",
        fontSize: "15px",
        fontWeight: "bold",
        width:"250px",
        height: "45px",
        marginLeft: "8px",
      }}
        >
          <FaClipboardList style={{marginLeft:"20px", marginBottom:"-3px", fontSize:"18px"}} className="mr-2" /> Vet Application
        </Link>
        <Link
          to="/vetManage"
          className={`block py-2 px-3 rounded mb-2 flex items-center ${isActive("/vetManage") ? "bg-white text-[#011523]" : "hover:bg-[#022a3f]"}`}

  style={{
        backgroundColor: isActive("/vetManage") ? "white" : "#011523",
        color: isActive("/vetManage") ? "#011523" : "white",
        transition:"all 2s ease-in-out",
        borderRadius:" 10px",
        padding: "10px",
        marginTop: "10px",
        marginBottom: "15px",
        fontSize: "15px",
        fontWeight: "bold",
        width:"250px",
        height: "45px",
        marginLeft: "8px",
      }}
        >
          <FaClipboardList style={{marginLeft:"20px", marginBottom:"-3px", fontSize:"18px"}} className="mr-2" /> Manage Vet
        </Link>
        <Link
          to="/report"
                  className={`block py-2 px-3 rounded mb-2 flex items-center ${isActive("/report") ? "bg-white text-[#011523]" : "hover:bg-[#022a3f]"}`}

  style={{
        backgroundColor: isActive("/report") ? "white" : "#011523",
        color: isActive("/report") ? "#011523" : "white",
        transition:"all 2s ease-in-out",
        borderRadius:" 10px",
        padding: "10px",
        marginTop: "10px",
        marginBottom: "15px",
        fontSize: "15px",
        fontWeight: "bold",
        width:"250px",
        height: "45px",
        marginLeft: "8px",
      }}
        >
          <FaComments style={{marginLeft:"20px", marginBottom:"-3px", fontSize:"18px"}} className="mr-2" /> Report
        </Link>
       
       
      </div>
      {/* Logout Button */}
      <div className="logout" 
 style={{borderRadius:" 10px",
        padding: "10px",
        marginTop: "160px",
        marginBottom: "15px",
        fontSize: "15px",
        fontWeight: "bold",
        width:"250px",
        height: "45px",

       }}>
        <button className="w-full py-2 px-2 rounded flex items-center justify-center bg-[#011523] hover:bg-[#022a3f]" 
         style={{borderRadius:" 10px",
        padding: "10px",
        marginTop: "10px",
        marginBottom: "15px",
        fontSize: "15px",
        fontWeight: "bold",
        width:"250px",
        height: "45px",

       }}
        onClick={handleLogout}>
          <FaSignOutAlt style={{marginLeft:"20px", marginBottom:"-3px", fontSize:"18px"}} className="mr-2 text-white" />
          <span className="text-white">Logout</span>
        </button>
      </div>
      
    </div>
  );
};

export default Sidebar;