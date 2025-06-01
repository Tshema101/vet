import React, { useState, useEffect } from 'react';
import "../css/style.css";

const Certifications = () => {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    // Using the provided image URL for the certificates
    const dummyCertificates = [
      { id: 1, url: 'https://aevm.tamu.edu/wp-content/uploads/sites/9/2010/08/4HCertification_Programsmall.png' },
      { id: 2, url: 'https://aevm.tamu.edu/wp-content/uploads/sites/9/2010/08/4HCertification_Programsmall.png' },
      { id: 3, url: 'https://aevm.tamu.edu/wp-content/uploads/sites/9/2010/08/4HCertification_Programsmall.png' }
    ];
    setCertificates(dummyCertificates);
  }, []);

  return (
    <div className="certifications">
      <h2>Your certification details</h2>
      <div className="certificates-grid">
        {certificates.map((certificate) => (
          <div key={certificate.id} className="certificate">
            <img 
              src={certificate.url}
              alt={`Certificate ${certificate.id}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
