import React from 'react';
import { useLocation } from 'react-router-dom';
import NavbarLogged from './NavbarLogged';
import Footer from './Footer';

const Appointment = () => {
  const location = useLocation();
  const { date, day, time, price } = location.state || {};

  const containerStyle = {
    display: 'flex',
    // justifyContent: 'space_around',
    padding: '30px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#fff',
    marginTop:'100px'
  };

  const leftStyle = {
    width: '45%',
    marginLeft:"40px"
  };

  const rightStyle = {
    width: '40%',
    border: '1px solid #ddd',
    padding: '20px',
    borderRadius: '5px',
    marginLeft:"90px",
    backgroundColor: '#fff',
    height: '300px',
  };

  const labelStyle = {
    fontSize: '13px',
    fontWeight: 'bold',
    marginBottom: '5px',
    display: 'block',
    marginTop: '25px',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '13px',
    height:"50px"
  };

  const selectStyle = {
    ...inputStyle,
  };

  const radioContainerStyle = {
    marginTop: '8px',
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
  };

  const textAreaStyle = {
    ...inputStyle,
    height: '80px',
    resize: 'none',
  };

  const buttonStyle = {
    width: '100%',
    backgroundColor: '#4CC4F3',
    border: 'none',
    padding: '12px',
    color: '#fff',
    fontWeight: 'bold',
    borderRadius: '5px',
    marginTop: '20px',
    cursor: 'pointer',
  };

  return (
    <div style={{top: '0', width: '100%', }}>
             <NavbarLogged />

    <div style={containerStyle}>
      {/* Left Section */}
      <div style={leftStyle}>
        <h4>Your Appointment</h4>
        <p style={{ fontSize: '12px', color: '#555' }}>
        <p>Date: {date}</p>
      <p>Day: {day}</p>
      <p>Time: {time}</p>
      <p>Price: ${price}</p>
          {/* 📅 Date: <strong>March 4, 2025 at 2:00pm</strong> */}
        </p>

        <h4 style={{ marginTop: '20px' }}>Pet Details</h4>

        <label style={labelStyle}>Pet Name</label>
        <input style={inputStyle} placeholder="Enter Pet Name" />

        <label style={labelStyle}>Species</label>
        <select style={selectStyle}>
          <option>Select Species</option>
        </select>

        <label style={labelStyle}>Breed</label>
        <select style={selectStyle}>
          <option>Select Breed</option>
        </select>

        <label style={labelStyle}>Age</label>
        <input style={inputStyle} placeholder="Age" />

        <label style={labelStyle}>Weight</label>
        <input style={inputStyle} placeholder="Weight" />

        <label style={labelStyle}>Sex</label>
        <div style={radioContainerStyle}>
          <label>
            <input type="radio" name="sex" /> Male
          </label>
          <label>
            <input type="radio" name="sex" /> Female
          </label>
        </div>

        <label style={labelStyle}>What are your main concerns?</label>
        <select style={selectStyle}>
          <option>Select</option>
        </select>

        <label style={labelStyle}>Reason</label>
        <textarea style={textAreaStyle} placeholder="Given detail reason.." />
      </div>

      {/* Right Section */}
      <div style={rightStyle}>
        <h5 style={{ marginBottom: '20px' }}>Price Details</h5>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
          <span>Appointment</span>
          <span>Nu. 500</span>
        </div>
        <div style={{marginTop:"15px", display: 'flex', justifyContent: 'space-between', fontSize: '13px', borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '10px' }}>
          <span>Tax and fees</span>
          <span>Nu. 100</span>
        </div>
        <div style={{marginTop:"20px", display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '13px' }}>
          <span>Total</span>
          <span>Nu. 600</span>
        </div>
        <p style={{ fontSize: '10px', marginTop: '5px', color: '#666' }}>Continue to proceed your total payment</p>
        <button style={buttonStyle}>Continue</button>
      </div>
    </div>

    <Footer />
    </div>
  );
};

export default Appointment;
