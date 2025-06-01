import React from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaClipboardList,
  FaComments,
  FaUserCog,
  FaMoneyBillWave,
  FaFileInvoice,
  FaSignOutAlt,
} from "react-icons/fa";
import logo from "../images/logo.png";
import { logout } from "../../utills/logout";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(navigate);
  };



  return (
    <div
      className="sidebar text-white w-64 h-full p-4 flex flex-col justify-between"
      style={{
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
      <div className="flex flex-col items-center mb-4">
        <img
          src={logo}
          alt="VetConnect Logo"
          className="logo mb-2"
         style={{
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            objectFit: "cover",
            marginLeft: "65px",
          }}
        />
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col px-2 space-y-2">
        <SidebarLink
          to="/SuperAdmindashboard"
          icon={<FaHome style={{marginLeft:"20px", marginTop:"-2px", fontSize:"18px"}} />}
          text="Dashboard"
          location={location}
        />
        <SidebarLink
          to="/expertiseMngt"
          icon={<FaUserCog style={{marginLeft:"20px", marginTop:"-2px", fontSize:"18px"}} />}
          text="Expertise Management"
          location={location}
        />
      <SidebarLink
          to="/contentmgnt/disease"
          matchPaths={["/contentmgnt/banner", "/contentmgnt/faq", "/contentmgnt/disease"]}
          icon={<FaClipboardList style={{marginLeft:"20px", marginTop:"-2px", fontSize:"18px"}} />}
          text="Content Management"
          location={location}
        />
        <SidebarLink
          to="/manageTestimonial"
          icon={<FaComments style={{marginLeft:"20px", marginTop:"-2px", fontSize:"18px"}}/>}
          text="Website Feedback"
          location={location}
        />
        <SidebarLink
          to="/payout"
          icon={<FaMoneyBillWave style={{marginLeft:"20px", marginTop:"-2px", fontSize:"18px"}}/>}
          text="Payout"
          location={location}
        />
        <SidebarLink
          to="/refund-forms"
          icon={<FaFileInvoice style={{marginLeft:"20px", marginTop:"-2px", fontSize:"18px"}} />}
          text="Refund Forms"
          location={location}
        />
      </div>

      {/* Logout Button */}
      <div
        className="px-4 mt-4"
        style={{
          marginTop: "80px",
          marginRight: "10px",
          
          
        }}
      >
        <a href="/login" className="block w-full">
          <button
            // className="w-full flex items-center justify-start gap-3 py-3 px-3 rounded bg-white text-[#011523] hover:bg-gray-200"
            onClick={handleLogout}
            style={{borderRadius:" 10px",
        padding: "10px",
        marginTop: "10px",
        marginBottom: "15px",
        fontSize: "15px",
        fontWeight: "bold",
        width:"250px",
        height: "45px",

       }}
          >
            <FaSignOutAlt className="mt-1" style={{marginLeft:"20px",  fontSize:"18px"}} /> Log Out
          </button>
        </a>
      </div>
    </div>
  );
};

const SidebarLink = ({ to, icon, text, location, matchPaths = [] }) => {
  const isActive = to === location.pathname || matchPaths.some(path => location.pathname.startsWith(path));
  const commonStyle = {
    width: "290px",
    padding: "7px",
    textAlign: "left",
    justifyContent: "flex-start",
    borderTopLeftRadius: "0px",
    borderBottomLeftRadius: "0px",
    borderTopRightRadius: "24px",
    borderBottomRightRadius: "24px",
    display: "flex",
    alignItems: "center",
    marginLeft: "10px",
    gap: "12px",
    transition: "all 2s ease-in-out",
    textDecoration: "none",
  };
  
  return (
    <Link
      to={to}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded justify-start ${
        isActive ? "bg-white text-[#011523]" : "hover:bg-[#022a3f]"
    
      }`}
      style={{
        ...commonStyle,
        backgroundColor: isActive ? "white" : "#011523",
        transition:"all 2s ease-in-out",
        color: isActive ? "#011523" : "white",
        borderRadius:" 10px",
        padding: "10px",
        marginTop: "10px",
        marginBottom: "10px",
        fontSize: "15px",
        fontWeight: "bold",
        width:"250px",
        height: "45px",
        marginLeft: "8px",
      }}
    >
      {icon} <span>{text}</span>
    </Link>
  );
};

export default Sidebar;
