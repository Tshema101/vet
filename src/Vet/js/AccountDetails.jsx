import React from 'react';
import "../css/style.css";

const AccountDetails = () => {
  return (
    <div className="account-details">
      <div className="header">
        <h2>Account Details</h2>
        <button className="edit-btn">Edit</button>
      </div>
      
      <div className="details-form">
        <div className="form-group">
          <label>Bank type</label>
          <input type="text" value="Bank of Bhutan" disabled />
        </div>
        
        <div className="form-group">
          <label>Account Number</label>
          <input type="text" value="202503380" disabled />
        </div>
        
        <div className="form-group">
          <label>Account Holder Name</label>
          <input type="text" value="Phuntsho" disabled />
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;