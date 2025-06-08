
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaPlus, FaCalendarCheck } from 'react-icons/fa';
import { FaDog, FaPaw, FaWeight, FaBirthdayCake, FaVenusMars, FaIdBadge,FaEdit, FaTrash } from 'react-icons/fa';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const Userprofile = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [pets, setPets] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState({});
  const token = localStorage.getItem('authToken');

  const [error, setError] = useState('');

  const [selectedRecord, setSelectedRecord] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);
const [showPopup, setShowPopup] = useState(false);
const [isSuccess, setIsSuccess] = useState(true); // true = tick, false = cross
 const [showConfirmModal, setShowConfirmModal] = useState(false);
const [petIdToDelete, setPetIdToDelete] = useState(null);

const [editingPet, setEditingPet] = useState(null);
const [editForm, setEditForm] = useState({ name: '', species: '', breed: '', age: '', weight: '' });
  const [vet, setVet] = useState([]);
const [vetNotFound, setVetNotFound] = useState(false);

   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded token:", decoded);
        // Assuming decoded object contains name and email
        setUserName(decoded.name);
        setUserEmail(decoded.email);
        
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  // Fetch pets
  useEffect(() => {
    const fetchPets = async () => {
      if (token) {
        try {
          const response = await fetch(`${process.env.REACT_APP_BASE_URL}/my-pets`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          const result = await response.json();
          setPets(result.data || []);
        } catch (error) {
          console.error('Error fetching pets:', error);
        }
      }
    };
    fetchPets();
  }, [token]);
  console.log(pets)

  useEffect(() => {
    const fetchMedicalRecords = async (petId) => {
      if (token && petId) {
        try {
          const response = await fetch(`${process.env.REACT_APP_BASE_URL}/appointment/${petId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          const result = await response.json();
          // console.log(result)
          if (result.success) {
            setMedicalRecords(prev => ({
              ...prev,
              [petId]: result || [],
            }));
          }
        } catch (error) {
          console.error('Error fetching medical records:', error);
        }
      }
    };
  
    pets.forEach((pet) => {
      console.log(pet._id)
      fetchMedicalRecords(pet._id);
    });
  }, [pets, token]);
  
console.log("medical",medicalRecords)


  const handleNavigate = () => {
    navigate('/petregister');
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 20px',
    fontFamily: 'Arial, sans-serif',
    marginTop: '100px',
    marginBottom: '-230px',
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
    fontSize:isMobile?'15px': '16px',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: '35px',
    marginBottom: '10px',
  };

  const buttonContainerStyle = {
    display: 'flex',
    height: '30px',
    gap: '10px',
    marginLeft: '30px',
  };

  const petContainerStyle = {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'center',
    marginLeft:isMobile?'30px': '60px',
    gap: '5px',
    width: '90%',
    border: '1px solid #ccc',
    padding: '20px',
    alignItems: 'center',
    marginBottom: '30px',	
     flexWrap: 'wrap',
  };

  const petDetailsStyle = {
    flex: 1,
    fontSize: '15px',
    lineHeight: '1.8',
    marginLeft: '50px',
    marginBottom: '20px',
  };

  const medicalRecordsStyle = {
    flex: 1,
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    fontSize: '12px',
    color: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
  };

  const medicalRecordStyle = {
    flex: 1,
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    overflowY: 'auto',   // make vertical scroll
    maxHeight: '180px',   // set maximum height before scroll appears
  };


   
const popupStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999
  },
  box: {
    background: '#fff',
    padding: '30px',
    borderRadius: '5px',
    textAlign: 'center',
    animation: 'fadeIn 0.3s ease',
    width: '500px',
    height: '250px',	
    boxShadow: '0 0 10px rgba(0,0,0,0.25)'
  },
   box1: {
    background: '#fff',
    padding: '30px',
    borderRadius: '5px',
    textAlign: 'center',
    animation: 'fadeIn 0.3s ease',
    width: '500px',
    height: '220px',	
    boxShadow: '0 0 10px rgba(0,0,0,0.25)'
  },
  text: {
    fontSize: '17px',
    fontWeight: 'bold',
    margin: '20px 0',
    marginTop: '20px',
  },
  okButton: {
    padding: '10px 20px',
    border: 'none',
    background: '#113047',
    color: 'white',
    fontSize: '15px',
    width:"100px",
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '25px',
  },
  
  closeButton: {
    position: 'relative',
    top: '5px',
    right: '20px',
    fontSize: '24px',
    marginLeft:" 440px",
    marginTop:"-15px",
    fontWeight: 'bold',
    cursor: 'pointer',
    color: '#113047',
  },

  tickAnimation: {
    width: '90px',
    height: '90px',
    margin: '0 auto 10px auto',
  },
  svg: {
    width: '100px',
    height: '100%'
  },
  circle: {
    fill: 'none',
    stroke: '#4CAF50',
    strokeWidth: 5,
    strokeMiterlimit: 10,
    strokeDasharray: 157,
    strokeDashoffset: 157,
    animation: 'stroke 0.6s forwards'
  },
  check: {
    stroke: '#4CAF50',
    strokeWidth: 5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeDasharray: 48,
    strokeDashoffset: 48,
    animation: 'checkmark 0.6s 0.6s forwards'
  }
  ,
  redCircle: {
  fill: 'none',
  stroke: '#f44336',
  strokeWidth: 5,
  strokeMiterlimit: 10,
  strokeDasharray: 157,
  strokeDashoffset: 157,
  animation: 'stroke 0.6s forwards',
},
cross1: {
  stroke: '#f44336',
  strokeWidth: 5,
  strokeLinecap: 'round',
  strokeDasharray: 28,
  strokeDashoffset: 28,
  animation: 'cross 0.6s 0.6s forwards',
},
cross2: {
  stroke: '#f44336',
  strokeWidth: 5,
  strokeLinecap: 'round',
  strokeDasharray: 28,
  strokeDashoffset: 28,
  animation: 'cross 0.6s 0.8s forwards',
},

};


const confirmDeletePet = (petId) => {
  setPetIdToDelete(petId);
  setShowConfirmModal(true);
};


const handleDeletePet = async () => {
  if (!petIdToDelete) return;

  try {
    const response = await fetch(`http://localhost:8080/pets/${petIdToDelete}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();
console.log(result)
    if (response.ok) {
      setPets(prev => prev.filter(p => p._id !== petIdToDelete));
      setIsSuccess(true); // Show success tick
    } else {
      setIsSuccess(false); // Show error cross
    }
  } catch (error) {
    console.error("Failed to delete pet:", error);
    setIsSuccess(false); // Show error cross
  } finally {
    setShowPopup(true); // Show result popup
    setShowConfirmModal(false); // Close confirmation modal
    setPetIdToDelete(null); // Reset
  }
};


const handleVetClick = (vet) => {
  navigate('/vprofile', {
      state: {
        vet: vet, // Sending vet data to the 'VetProfile' page
      },
    });
  };

  return (
    <div style={{ top: '0', width: '100%' }}>
      <Navbar />
      <div style={containerStyle}>
        <FaUserCircle style={profileIconStyle} />
        <div style={nameStyle}>{userName}</div>
        <div style={emailStyle}>Email: <span style={{ fontStyle: 'italic' }}>{userEmail}</span></div>
        <div style={dividerStyle}></div>
        <div style={{ height: '250px', width: '100%' }}>
          <div style={sectionTitleStyle}>Register your domestic animals</div>
          <div style={buttonContainerStyle}>
            <button
              style={{
                backgroundColor: 'white',
                color: 'black',
                fontWeight: 'bold',
                padding: '5px 10px',
                borderRadius: '5px',
                border: '1px solid black',
                cursor: 'pointer',
                fontSize:isMobile?'14px': '15px',
              }}
              onClick={handleNavigate}
            >
              <FaPlus /> Add
            </button>
            <button
              style={{
                backgroundColor: 'white',
                color: 'black',
                fontWeight: 'bold',
                padding: '5px 10px',
                borderRadius: '5px',
                border: '1px solid black',
                cursor: 'pointer',
                fontSize:isMobile?'14px': '15px',
              }}
              onClick={() => navigate('/myappointment')}
            >
              <FaCalendarCheck /> My Appointment
            </button>
          </div>
        </div>
      </div>
      {pets.length > 0 ? (
        pets.map((pet, index) => (
          <div className='petcontainer' key={index} style={petContainerStyle}>


<div style={petDetailsStyle} className='petdetails'>
  <strong style={{ fontSize: '17px', marginBottom: '10px', fontWeight: 'bold', color: '#113047' }}>
    Pet Details
  </strong>
  <p style={{display:"flex", flexDirection:"row", gap:"5px"}}><FaIdBadge style={{color: '#888', marginRight: '5px', marginTop:"5px" }} /><strong>Name:</strong> <p style={{fontStyle:"italic", color:"#888"}}> {pet.petname}</p></p>
  <p style={{display:"flex", flexDirection:"row", gap:"5px"}}><FaPaw style={{ color: '#888',marginRight: '5px', marginTop:"5px" }} /><strong>Species:</strong> <p style={{fontStyle:"italic", color:"#888"}}>  {pet.species} </p></p>
  <p style={{display:"flex", flexDirection:"row", gap:"5px"}}><FaDog style={{color: '#888', marginRight: '5px', marginTop:"5px" }} /><strong>Breed:</strong> <p style={{fontStyle:"italic", color:"#888"}}>  {pet.breed} </p></p>
  <p style={{display:"flex", flexDirection:"row", gap:"5px"}}><FaBirthdayCake style={{color: '#888', marginRight: '5px', marginTop:"5px" }} /><strong>Age:</strong> <p style={{fontStyle:"italic", color:"#888"}}>  {pet.age} years </p></p>
  <p style={{display:"flex", flexDirection:"row", gap:"5px"}}><FaVenusMars style={{color: '#888', marginRight: '5px', marginTop:"5px" }} /><strong>Gender:</strong> <p style={{fontStyle:"italic", color:"#888"}}>  {pet.gender} </p></p>
  <p style={{display:"flex", flexDirection:"row", gap:"5px"}}><FaWeight style={{color: '#888', marginRight: '5px', marginTop:"5px" }} /><strong>Weight:</strong> <p style={{fontStyle:"italic", color:"#888"}}>  {pet.weight} kg </p></p>
</div>


            <div className='medical' style={{ flex: 1 }}>
  <strong style={{ fontSize: "14px", marginBottom: "20px", fontWeight: "bold", color: "#113047" }}>
    Medical Records
  </strong>
  <div style={medicalRecordStyle}>

   {medicalRecords[pet._id] && medicalRecords[pet._id].data?.length > 0 ? (
  medicalRecords[pet._id].data
    .filter(record => record.appointment.appointmentStatus === "attended")
    .map((record, idx) => (
      <div key={idx} style={{ marginBottom: '10px', borderBottom: '1px solid rgb(232, 232, 232)', paddingBottom: '10px' }}>
        <strong style={{fontSize:"0.85rem"}}>Appointment Date:</strong>{' '}

 <span style={{ fontSize: '14px',marginLeft:"5px" }}>      
{record.appointment.appointmentDate ? new Date(record.appointment.appointmentDate ).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      // hour: '2-digit',
      // minute: '2-digit',
      fontSize: '12px',
    })
     : 'Unknown'}
</span>
        <button
          onClick={() => {
            setSelectedRecord(record);
            setIsModalOpen(true);
          }}
          style={{
            marginTop: '4px',
            marginLeft:"20px",
            backgroundColor: '#6D8EA7',
            color: '#fff',
            border: 'none',
            // border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '7px 10px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          View Full Report
        </button>
      </div>
    ))
) : (
  <div>
  <p style={{
    fontSize: "12px",
    marginLeft:isMobile?'50px': "200px",
    marginTop: "65px",
    height: "85px",
    fontStyle: "italic",
    color: "#ccc"
  }}>
    No attended medical records available.
  </p>
  </div>
)}
    
  </div>
</div>

       <div className='deleteicon' style={{ marginTop:isMobile?'-3px': '-190px', display: 'flex', gap: '10px' }}>
  {/* <FaEdit 
    // onClick={() => handleEditPet(pet)} 
    style={{ cursor: 'pointer', color: '#3D586C' }} 
    title="Edit Pet"
  /> */}
  <FaTrash 
    onClick={() => confirmDeletePet(pet._id)} 
    style={{ cursor: 'pointer', color: '#3D586C' }} 
    title="Delete Pet"
  />
</div>

          </div>
        ))
      ) : (
        <p className="no-pets-message"  style={{ marginTop: '100px', marginBottom: '100px', marginLeft: '630px', fontSize: '13px', color: '#ccc', fontStyle: 'italic' }}>No pets registered.</p>
      )}

{isModalOpen && selectedRecord && (
  <div style={{
    position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex',
    justifyContent: 'center', alignItems: 'center', zIndex: 999
  }} className='reportpopup'>
<div style={{
  position: 'relative', // to contain absolute children
  backgroundColor: '#fff',
  borderRadius: '5px',
  padding: '30px',
  width: '700px',
  maxHeight: '90%',
  overflowY: 'auto',
  boxShadow: '0 0 10px rgba(0,0,0,0.2)'
}}>
  <div style={{
    position: "absolute", top: "10px", right: "15px",
    fontSize: "25px", cursor: "pointer"
  }} onClick={() => setIsModalOpen(false)}>×</div>
      <h3 style={{ textAlign: 'center', marginBottom: '25px' }}>Medical Report</h3>

      {/* <p style={{fontSize:"14px", marginBottom:"7px"}}><strong>Pet Name:</strong> {selectedRecord.petname}</p> */}
      <p style={{fontSize:"14px", marginBottom:"7px"}}><strong>Appointment Id:</strong> {selectedRecord.appointment._id}</p>
      <p style={{fontSize:"14px", marginBottom:"7px"}}><strong>Appointment Date:</strong> {new Date(selectedRecord.appointment.appointmentDate ).toLocaleDateString()}</p>
      <p style={{fontSize:"14px", marginBottom:"7px"}}><strong>Vet:</strong>  Dr. {selectedRecord.vet?.name || "NA"}</p>
      <p style={{fontSize:"14px", marginBottom:"7px"}}><strong>Email:</strong> {selectedRecord.vet?.email || "NA"}</p>

      <hr style={{margin:"12px"}} />

  
      <p style={{fontSize:"14px", marginBottom:"7px"}}><strong>Treatment:</strong></p>
      {/* <p style={{fontSize:"14px", marginBottom:"5px", fontStyle: 'italic', color: '#444' }}>{selectedRecord.treatment}</p> */}
      <p style={{fontSize:"14px", marginBottom:"7px", fontStyle: 'italic', color: '#444', marginLeft:"25px" }}> {selectedRecord.appointment.medications?.[0]?.text || 'N/A'}</p>


      <p style={{ fontSize: "14px", marginBottom: "7px" }}>
  <strong>Images:</strong>
</p>
<div style={{ marginLeft: "25px" }}>
  {selectedRecord.appointment.medications?.[0]?.photos?.map((cert, index) => {
const imageUrl = cert
? cert
: null;

    return (
      imageUrl && (
        <img
          key={index}
          src={imageUrl}
          alt={`Medication ${index + 1}`}
          style={{ width: '300px', height: 'auto', marginRight: '10px', marginBottom: '10px' }}
        />
      )
    );
  })}
</div>

{vetNotFound && (
  <div style={{
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex',
    justifyContent: 'center', alignItems: 'center', zIndex: 999
  }}>
    <div style={{
      backgroundColor: '#fff', padding: '30px', borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)', textAlign: 'center'
    }}>
      <h3 style={{ marginBottom: '20px' }}>Vet Not Found</h3>
      <p style={{ marginBottom: '20px', color: '#777' }}>
        Sorry, no vet information is available for this appointment.
      </p>
      <button onClick={() => setVetNotFound(false)} style={{
        padding: '10px 20px', backgroundColor: '#113047', color: '#fff',
        border: 'none', borderRadius: '5px', cursor: 'pointer'
      }}>
        Close
      </button>
    </div>
  </div>
)}


     <div style={{ marginTop: '50px', textAlign: 'right', fontSize: '12px', color: '#555' }}>
  <p>
    Attended by:{" "}
    <strong
      onClick={() => {
        const vet = selectedRecord.vet;
        if (vet && vet.name && (vet.is_approved === true || vet.is_approved === "true")) {
          navigate("/vprofile", { state: { vet } });
        } else {
          setVetNotFound(true);
        }
      }}
      style={{ color: "#555", cursor: "pointer", textDecoration: "none",borderBottom:"2px solid#555" }}
    >
      Dr. {selectedRecord.vet?.name || "NA"}
    </strong>
  </p>

  <p>
    Posted on:{" "}
    {new Date(selectedRecord.appointment.medications?.[0]?.createdAt).toLocaleDateString()}
  </p>
</div>


      <button onClick={() => setIsModalOpen(false)} style={{
        marginTop: '20px', padding: '10px 15px', backgroundColor: '#113047',
        color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer'
      }}>
        Close
      </button>
    </div>
  </div>
)}

{vetNotFound && (
  <div style={{
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex',
    justifyContent: 'center', alignItems: 'center', zIndex: 999
  }}>
    <div style={{
      backgroundColor: '#fff', padding: '30px', borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)', textAlign: 'center'
    }}>
      <h3 style={{ marginBottom: '20px' }}>Vet Not Found</h3>
      <p style={{ marginBottom: '20px', color: '#777' }}>
        Sorry, no vet information is available for this appointment.
      </p>
      <button onClick={() => setVetNotFound(false)} style={{
        padding: '10px 20px', backgroundColor: '#113047', color: '#fff',
        border: 'none', borderRadius: '5px', cursor: 'pointer'
      }}>
        Close
      </button>
    </div>
  </div>
)}




{showPopup && (
  <div style={popupStyles.overlay}>
    <div style={popupStyles.box}>
      {isSuccess ? (
        <div style={popupStyles.tickAnimation}>
          <svg viewBox="0 0 52 52" style={popupStyles.svg}>
            <circle style={popupStyles.circle} cx="25" cy="26" r="24" />
            <path style={popupStyles.check} fill="none" d="M14,27 L22,35 L38,19" />
          </svg>
        </div>
      ) : (
        <div style={popupStyles.tickAnimation}>
          <svg viewBox="0 0 52 52" style={popupStyles.svg}>
            <circle style={popupStyles.redCircle} cx="25" cy="26" r="24" />
            <path style={popupStyles.cross1} d="M16,16 L36,36" />
            <path style={popupStyles.cross2} d="M36,16 L16,36" />
          </svg>
        </div>
      )}
      <p className="popup-text">
        {isSuccess ? 'Pet deleted successfully!' : 'Failed to delete Pet! Try again.'}
      </p>
      <button onClick={() => setShowPopup(false)} style={popupStyles.okButton}>
        OK
      </button>
    </div>
  </div>
)}


{showConfirmModal && (
  <div style={popupStyles.overlay}>
    <div style={popupStyles.box1}>
            <div style={popupStyles.closeButton} onClick={() =>setShowConfirmModal(false)}>×</div>
      <div style={popupStyles.text}>Are you sure you want to delete this pet?</div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '110px', marginTop: '20px' }}>
        <button onClick={handleDeletePet} style={popupStyles.okButton}>Yes</button>
        <button
          onClick={() => {
            setShowConfirmModal(false);
            setPetIdToDelete(null);
          }}
          style={{ ...popupStyles.okButton, background: '#A52727' }}
        >
          No
        </button>
      </div>
    </div>
  </div>
)}




      <Footer />

        <style jsx>{`
  @media (max-width: 1200px) {
    .petcontainer {
      flex-direction: row;
      height: auto;
      margin: 30px auto;
      padding: 15px;
      width: 90%;
    }
    .petdetails, .medical {
      margin-left: 0;
      width: 100%;
      
    }
    .medical {
      margin-top: 20px;
    }
  }

  @media (max-width: 992px) {
.petcontainer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
}

        .medical {
      margin-top: 10px;
    }
    .reportpopup > div {
      width: 90%;
    }
  }

  @media (max-width: 768px) {
.petcontainer {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  // justify-content: space-between;
  // gap: 20px;
  height:auto;
overflow-x: hidden; /* ✅ optional */
    overflow-y: visible; /* ✅ let content expand */

}

  .petdetails, .medical {
    width: 100% !important;
    margin: 10px 0 !important;
    margin-left:0 !important;
  }


 word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
  box-sizing: border-box;
  }


  .no-pets-message {
    margin-left: 0 !important;
    text-align: center;
  }
     .deleteicon {
     
margin-left: auto;
  margin-right: 0;
  }
  
  }

  @media (max-width: 576px) {
    .containerStyle {
      margin-top: 60px;
    }
    .profileIconStyle {
      fontSize: 60px;
      height: 80px;
      width: 80px;
    }
.petcontainer {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  // justify-content: space-between;
  // gap: 20px;
  height:auto;
}
    .medicalRecordStyle p {
      margin-left: 0;
      text-align: center;
    }
    .popupStyles.okButton {
      width: 80px;
      font-size: 14px;
    }
    .petdetails p {
      flex-direction: row;
      gap: 5px;
    }

     .deleteicon {
    top: 50px;
    right: 5px;
    font-size: 18px; /* Adjust size */
  }

  
        }
  @media (max-width: 480px) {
    .containerStyle {
      margin-top: 50px;
    }
    .petcontainer {
      width: 90%;
      margin: 15px auto;
      padding: 10px;
    }
    .petdetails p {
      flex-direction: column;
      gap: 0;
    }
    .medicalRecordStyle {
      padding: 5px;
       overflow-wrap: break-word;
    }
    .popupStyles.box, .popupStyles.box1 {
      width: 95%;
    }
    .medical {
      margin-top: 15px;
    }
  }

  @media (max-width: 360px) {
    .containerStyle {
      margin-top: 40px;
    }
    .sectionTitleStyle {
      font-size: 14px;
    }
    .buttonContainerStyle button {
      font-size: 12px;
      padding: 3px 6px;
    }
    .petdetails {
      font-size: 13px;
    }
    .popupStyles.text {
      font-size: 15px;
    }
    .petcontainer {
      width: 95%;
      margin: 10px auto;
    }
  }
`}</style>
    </div>
  );
};

export default Userprofile;



