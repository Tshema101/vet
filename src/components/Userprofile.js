import React from 'react';
import { FaUserCircle, FaPlus, FaCalendarCheck } from 'react-icons/fa';
import NavbarLogged from './Navbar';
import Footer from './Footer';

const Userprofile = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 20px',
    fontFamily: 'Arial, sans-serif',
    marginTop: '100px',
  };

  const profileIconStyle = {
    fontSize: '80px',
    height: '100px',
    width: '100px',
    color: 'grey',
    marginBottom: '10px',
  };

  const nameStyle = {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '5px',
  };

  const emailStyle = {
    fontSize: '12px',
    color: '#333',
    fontStyle: 'italic',
    marginBottom: '20px',
  };

  const dividerStyle = {
    width: '90%',
    borderTop: '1px solid #ccc',
    marginBottom: '30px',
  };

  const sectionTitleStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: '35px',
    marginBottom: '10px',
  };

  const buttonContainerStyle = {
    display: 'flex',
height : '30px',
    gap: '10px',
    marginLeft: '30px',
  };

  const buttonStyle = {
    display: 'flex',
    alignItems: 'left',
    gap: '5px',
    fontSize: '13px',
    padding: '5px 10px',
    border: '1px solid #806E63',
    borderRadius: '5px',
    backgroundColor: 'white',
    cursor: 'pointer',
  };

  return (
    <div style={{top: '0', width: '100%', }}>
             <NavbarLogged />

    <div style={containerStyle}>
      <FaUserCircle style={profileIconStyle} />
      <div style={nameStyle}>Karma Tshering</div>
      <div style={emailStyle}>Email: <span style={{ fontStyle: 'italic' }}>KarmaTshe@gmail.com</span></div>

      <div style={dividerStyle}></div>
<div style={{height: '250px', width: '100%'}}>
      <div style={sectionTitleStyle}>Register your domestic animals</div>
      <div style={buttonContainerStyle}>
        <button style={buttonStyle}>
          <FaPlus /> Add
        </button>
        <button style={buttonStyle}>
          <FaCalendarCheck /> My Appointment
        </button>
      </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default Userprofile;
