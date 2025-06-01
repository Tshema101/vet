import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import "../css/VetRegister.css"
const Appointment = () => {
  const location = useLocation();
  const { date, slot, vetId } = location.state || {};
  const [pets, setPets] = useState([]);
  const [selectedPetId, setSelectedPetId] = useState('');
  const [petDetails, setPetDetails] = useState({});
  const [concern, setConcern] = useState("");
  const [reason, setReason] = useState("");
  const token = localStorage.getItem("authToken");
  const decoded = jwtDecode(token);
  const clientId = decoded.userId;
  const [chargePerHour, setChargePerHour] = useState(null);
  // const stripe = useStripe();
  // const elements = useElements();
  const navigate =useNavigate()
  const [showPopup, setShowPopup] = useState(false);

  const startTime = slot?.from;
  const endTime = slot?.to;

   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalAmount = typeof chargePerHour === "number" && !isNaN(chargePerHour) ? chargePerHour : 0;
console.log(chargePerHour)
  useEffect(() => {
    const fetchPetsAndVetDetails = async () => {
      try {
        const petRes = await axios.get("https://vetserver.onrender.com/my-pets", {
          headers: { Authorization: `Bearer ${token} `},
        });
        setPets(petRes.data.data);

        const vetRes = await axios.get(`https://vetserver.onrender.com/vets/${vetId}`, {
          headers: { Authorization: `Bearer ${token}`},
        });
        console.log(vetRes.data)
        setChargePerHour(vetRes.data.data.chargePerHour);
      } catch (err) {
        console.error('Failed to fetch data', err);
      }
    };
    fetchPetsAndVetDetails();
  }, [vetId, token]);

  const handlePetSelect = (e) => {
    const petId = e.target.value;
    setSelectedPetId(petId);
    const selected = pets.find(p => p._id === petId);
    if (selected) {
      setPetDetails(selected);
    }
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
    text: {
      fontSize: '18px',
      margin: '20px 0',
    },
    okButton: {
      padding: '10px 20px',
      border: 'none',
      background: '#113047',
      color: 'white',
      fontSize: '16px',
      width:"100px",
      borderRadius: '8px',
      cursor: 'pointer',
      marginTop: '20px',
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
  };


  const labelStyle = {
    fontSize: '13px',
    fontWeight: 'bold',
    marginBottom: '5px',
    display: 'block',
    marginTop: '25px',
  };

  const inputStyle = {
    width:isMobile?'460px': '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '13px',
    height: '50px',
  };

  const selectStyle = { ...inputStyle };
  const textAreaStyle = { ...inputStyle, height: '80px', resize: 'none' };
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
    <div style={{ top: '0', width: '100%' }}>
      <Navbar />

      <div style={{   backgroundColor: '#fff', marginTop: '100px' }} className="appointment-container">
        {/* Left */}
        <div style={{ width: '50%', marginLeft: '10px' , fontWeight: 'bold', fontSize:isMobile?'17px': '18px', color: '#333'}} className="appointment-form">
          <h3  className='appointment'>Your Appointment</h3>
          <p style={{ fontSize: '13px', color: '#555', marginTop: '10px' }} className="appointment-details">
            <p style={{ marginBottom: '5px' }}>Date: {date}</p>
            <p>Time: {slot.from} - {slot.to}</p>
          </p>

          <h4 style={{ marginTop: '20px' }}>Pet Details</h4>
          <label style={labelStyle}>Pet Name</label>
          <select style={selectStyle} onChange={handlePetSelect} value={selectedPetId} className='select'>
            <option value="">Select Pet</option>
            {pets.map(pet => (
              <option key={pet._id} value={pet._id}>{pet.petname}</option>
            ))}
          </select>

          <label style={labelStyle}>Species</label>
          <input style={inputStyle} value={petDetails.species || ''} readOnly className='select' />

          <label style={labelStyle}>Breed</label>
          <input style={inputStyle} value={petDetails.breed || ''} readOnly className='select' />

          <label style={labelStyle}>Age</label>
          <input style={inputStyle} value={petDetails.age || ''} readOnly className='select' />

          <label style={labelStyle}>Weight</label>
          <input style={inputStyle} value={petDetails.weight || ''} readOnly className='select' />

          <label style={labelStyle}>Sex</label>
          <div style={{ marginTop: '8px', display: 'flex', gap: '15px', alignItems: 'center' }}>
            <label>
              <input type="radio" name="sex" checked={petDetails.gender === 'Male'} readOnly  /> Male
            </label>
            <label>
              <input type="radio" name="sex" checked={petDetails.gender === 'Female'} readOnly /> Female
            </label>
          </div>

          <label style={labelStyle}>What are your main concerns?</label>
          <select style={selectStyle} onChange={(e) => setConcern(e.target.value)} className='select'>
            <option>Select</option>
            <option>Vaccination</option>
            <option>Check-up</option>
            <option>Allergy</option>
            <option>Injury</option>
            <option>Behavioral</option>
            <option>Other</option>
          </select>

          <label style={labelStyle}>Reason</label>
          <textarea
            style={textAreaStyle}
            placeholder="Give detailed reason..."
            onChange={(e) => setReason(e.target.value)}
            className='select'
          />
        </div>

        {/* Right */}
        <div style={{ width:isMobile?'95%': '50%', border: '1px solid #ddd', padding: '20px', borderRadius: '5px', marginLeft:isMobile?'10px': '90px', backgroundColor: '#fff', height: 'auto' }} className="payment-section">
          <h5 style={{ marginBottom: '20px',fontSize:"17px" }}>Price Details</h5>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }} className="price-row">
            <span>Appointment fee</span>
            <span>{chargePerHour}</span>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '13px' }} className="total-row">
            <span>Total</span>
            <span>{totalAmount.toFixed(2)}</span>
          </div>
        

          {/* PayPal Buttons */}
          <PayPalScriptProvider options={{
            // "client-id": "AWxpy-17ZTNr6V0AJ6ibMW6N_WTOdTTUpazvJ2ITU2nZpfnYhUeWL1YQjo_TWYx8-Sw6mIs3egK7VVxc",
          "client-id": "AZUeti2dC1HZ-25WafD2lX5nyC8VMZ8woA5pM8u78c3LUhEsz86PdPlrp_iLZwK2-xqu5CGYwivz-qKG",
            currency: "SGD"
          }}>
            <PayPalButtons
              style={{ layout: "vertical"}}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [{
                    amount: { value: totalAmount.toFixed(2) }
                  }]
                });
              }}
              onApprove={async (data, actions) => {
                const order = await actions.order.capture();
                console.log("Payment successful!", order);

                await axios.post(`https://vetserver.onrender.com/book-paypal/${vetId}`, {
                  orderID: order.id,
                  clientId,
                  vetId,
                  petId: selectedPetId,
                  date,
                  startTime,
                  endTime,
                  reason,
                  concern,
                  amount: totalAmount
                });

                // alert("Appointment booked with PayPal!");
                // navigate('/Myappointment');
               setShowPopup(true)
              }}
              onError={(err) => {
                console.error("PayPal error:", err);
                // alert("Payment failed");
                console.log("Payment failed", err);
              }}
            />
          </PayPalScriptProvider>


         


        </div>
      </div>


{/* appointment confirmation popup */}
      {showPopup && (
    <div style={popupStyles.overlay}>
    <div style={popupStyles.box}>
      <div style={popupStyles.tickAnimation}>
        <svg viewBox="0 0 52 52" style={popupStyles.svg}>
          <circle style={popupStyles.circle} cx="25" cy="26" r="24" />
          <path style={popupStyles.check} fill="none" d="M14,27 L22,35 L38,19" />
        </svg>
      </div>
            <p className="popup-text">Your Appointment booked successfully!</p>
            <button  
            onClick={() => {
              setShowPopup(false);
              navigate('/Myappointment');
            }}
            
            style={{  
              padding: '10px 20px',
              border: 'none',
              background: '#113047',
              color: 'white',
              fontSize: '16px',
              width:"100px",
              borderRadius: '20px',
              cursor: 'pointer',
              marginTop: '20px',}}>OK</button>
          </div>
        </div>
      )}



      <Footer />
      <style jsx>{`
        .appointment-container {
          display: flex;
          // justify-content: space-between;
          align-items: flex-start;
          flex-direction: column;
          padding: 20px;
          // font-family: 'Arial, sans-serif';
          background-color: #fff;
          margin-top: 80px;
          width: 100%;
          box-sizing: border-box;
        }

        .appointment-form {
          width: 100%;
          margin-bottom: 30px;
          font-weight: bold;
          font-size: 18px;
          color: #333;
        }
          

        .appointment-details {
          font-size: 13px;
          color: #555;
          margin-top: 10px;
        }

        .payment-section {
          width: 100%;
          border: 1px solid #ddd;
          // padding: 20px;
          border-radius: 5px;
          background-color: #fff;
          margin-bottom: 30px;
        }

        .price-row, .total-row {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          margin-bottom: 10px;
        }

        .total-row {
          font-weight: bold;
          margin-top: 20px;
          margin-bottom: 20px;
        }

        .gender-options {
          margin-top: 8px;
          display: flex;
          gap: 15px;
          align-items: center;
        }

        @media (min-width: 768px) {
          .appointment-container {
            flex-direction: row;
            justify-content: space-between;
            padding: 30px;
            margin-top: 100px;
          }

          .appointment-form {
            width: 48%;
            margin-bottom: 0;
            margin-right: 20px;
          }

          .payment-section {
            width: 48%;
            margin-left: 20px;
            margin-bottom: 0;
          }
        }

        @media (min-width: 1024px) {
          .appointment-container {
            max-width: 1200px;
            margin-left: auto;
            margin-right: auto;
          }

          .appointment-form {
            width: 45%;
            margin-left: 40px;
          }

          .payment-section {
            width: 40%;
            margin-left: 90px;
          }
        }

        @media (max-width : 480px) {
          .appointment-container {
            padding: 15px;
            margin-top: 70px;
          }
            
          .select {
            width: 500px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 13px;
            height: 50px;
          }

          .appointment-form, .payment-section {
            padding: 15px;
          }

          .gender-options {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }


        
        }
      `}</style>
    </div>
  );
};

export default Appointment;
