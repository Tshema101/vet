import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaPlus, FaCalendarCheck, FaCalendarAlt, FaClock, FaNotesMedical, FaExclamationCircle, FaUserMd, FaDollarSign, FaChevronLeft, FaChevronRight, FaUser, FaPaw, FaMapMarkerAlt, FaIdCard } from 'react-icons/fa';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import vet1 from '../Images/vet1.png';
import { jwtDecode } from 'jwt-decode';
import { FaRegCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "../css/VetRegister.css"

const Myappointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 4;
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [vetAvailability, setVetAvailability] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
console.log('date', selectedDate)
  const navigate = useNavigate();
  const location = useLocation();
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(null);
    const [totalReviews, setTotalReviews] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [cancelshowPopup, setcancelShowPopup] = useState(false);

  const { vet } = location.state || {}; 
  const [vetId, setVetId] = useState(vet ? appointments.vet._id : null);
  const [userId, setUserId] = useState(null);

   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  

  // Filter only future appointments
  const upcomingAppointments = appointments.filter((appointment) => {
    const today = new Date();
    const appointmentDate = new Date(appointment.appointment.appointmentDate);
    return (
      appointmentDate.setHours(0, 0, 0, 0) >= today.setHours(0, 0, 0, 0) && 
      appointment.appointment.appointmentStatus !== 'attended' && 
      appointment.appointment.appointmentStatus !== 'cancelled'
    );
  });

  // Pagination logic
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = upcomingAppointments.slice(indexOfFirstAppointment, indexOfLastAppointment);
  const totalPages = Math.ceil(upcomingAppointments.length / appointmentsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleCancelAppointment = (appointment) => {
    const appointmentDateTime = new Date(appointment.appointment.appointmentDate);
    const now = new Date();
  
    const diffInMs = appointmentDateTime - now;
    const diffInHours = diffInMs / (1000 * 60 * 60);
  
    if (isNaN(diffInHours)) {
      alert("Could not parse appointment time. Please contact support.");
      return;
    }
  
    if (diffInHours <= 24) {
      setAppointmentToCancel(appointment);
      setCancelModalVisible(true);
    } else {
      navigate('/refund', { state: appointment });
    }
  };

  const confirmCancelAppointment = async () => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/appointments/${appointmentToCancel.appointment._id}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // alert("Appointment cancelled successfully.");
      setCancelModalVisible(false);
      setcancelShowPopup(true);
      // fetchAppointments(); // Refresh the appointments list
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      alert("Failed to cancel appointment. Please try again later.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    console.log(token)
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.name);
        setUserEmail(decoded.email);
        setUserId(decoded.userId);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);
console.log("user",userId)
  // Fetch appointments from backend
  useEffect(() => {
    const fetchAppointments = async () => {
      if (!userId) return;

      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/appointments/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.data)
        setAppointments(response.data.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setError('Error fetching appointments. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [userId]); // Depend on userId

  console.log("user", userId);

const day = String(selectedDate.getDate()).padStart(2, '0');
  const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
  const year = selectedDate.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;

  console.log("Formatted date:", formattedDate); // Should be in DD-MM-YYYY
  // console.log("Fetching availability from:", `http://localhost:8080/availability/date/${selectedAppointment.vet._id}/${formattedDate}`);
  const fetchVetAvailability = async (vetId, date) => {
    if (!vetId) return;
    
    try {
      // const formattedDate = date.toISOString().split('T')[0];
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/availability/date/${vetId}/${formattedDate}`
      );
      // console.log(response)
      setVetAvailability(response.data.data.slots);
    } catch (error) {
      console.error("Error fetching vet availability:", error);
      setVetAvailability([]);
    }
  };

  useEffect(() => {
    const vetId = selectedAppointment?.vet?._id;
    const fetchReviews = async () => {
      if (!vetId) return;
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/vet/${vetId}/getreviews`);
        setReviews(response.data.reviews || []);
        setAverageRating(response.data.averageRating);
        setTotalReviews(response.data.totalReviews || 0);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      }
    };

    if (vetId) {
      fetchReviews(vetId);
    }
  }, [selectedAppointment?.vet?._id]);
  console.log("Reviews:", reviews);
  console.log(reviews)
  console.log(averageRating)


console.log(vetAvailability)

 
const handleRescheduleClick = (appointment) => {
  const vet = appointment.vet;

  setSelectedAppointment(appointment);
  setSelectedDate(new Date(appointment.appointment.appointmentDate));

  const vetId = vet._id;
  fetchVetAvailability(vetId, formattedDate);
  setShowRescheduleModal(true);
};




  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
    if (selectedAppointment) {
      fetchVetAvailability(selectedAppointment.vet._id, date);
    }
  };

  const handleTimeSlotSelect = (slot) => {
    setSelectedTimeSlot(slot);
  };
 
  const handleRescheduleSubmit = async () => {
    if (!selectedAppointment || !selectedTimeSlot) return;

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/appointments/${selectedAppointment.appointment._id}/reschedule`,
        {
          newDate: formattedDate,
          newStartTime: selectedTimeSlot.startTime,
          newEndTime: selectedTimeSlot.endTime
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // alert("Appointment rescheduled successfully!");
        setShowRescheduleModal(false);
      setShowPopup(true) // Refresh the appointments list
    
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error rescheduling appointment:", error);
      alert(`Failed to reschedule appointment: ${error.message}`);
    }
  };

  const isAtLeastThreeDaysAway = (dateStr) => {
    const appointmentDate = new Date(dateStr);
    const today = new Date();
    const diffTime = appointmentDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 1;
  };

  // Styles
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

  const buttonstyle = {
    display: 'flex',
    flexDirection: isMobile?"row": 'column',
    alignItems: 'left',
    gap: '20px',
    fontSize: isMobile? "11px": '13px',
    padding: '5px 10px',
    borderRadius: '5px',
    backgroundColor: '#F7F7F7',
    cursor: 'pointer',
    marginTop: isMobile? "30px": '-60px',
    marginLeft: isMobile? "20px":'950px',
  };

  const petContainerStyle = {
    marginTop: '-170px',
    display: 'flex',
    flexDirection:isMobile?"row": "column",
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    width:isMobile?"90%": '90%',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '20px',
    marginLeft:isMobile?'30px': "60px",
    height:"auto"
  };

  const apptschedule={
    border:"1px solid #ccc",
    borderRadius: "5px",
    padding: "20px",
     marginBottom: "20px" , 
     backgroundColor:"#F7F7F7",
    width:isMobile?"450px": '100%',
    marginLeft: isMobile? "5px":"0px",
    // flexDirection:isMobile?"column": "row",
    height:"auto"


  };

  const rescheduleModalStyles = {
    overlay: {
      position:'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
    alignItems: isMobile ? 'flex-start' : 'center',
    zIndex: 1000,
    overflowY: isMobile ? 'auto' : 'hidden',
    padding: isMobile ? '20px 0' : '0',

    },
    modalContainer: {
      backgroundColor: '#fff',
      width: '90%',
      maxWidth: '1100px',
      height: isMobile?"auto":'600px',
       maxHeight: isMobile ? 'none' : '90vh',
      padding: '20px',
      display: 'flex',
      flexDirection:isMobile? "column":"none",
      borderRadius: '6px',
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    },
    leftPanel: {
      flex: 1,
      padding: '20px',
        borderRight: isMobile ? 'none' : '1px solid #eee',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
       maxHeight: isMobile ? '385px' : '560px',
    },
    rightPanel: {
      flex: 1,
      padding: '20px',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
          overflowY: isMobile ? 'auto' : 'visible',
    maxHeight: isMobile ? 'none' : '560px',
    },
    closeButton: {
      position: 'absolute',
      top:'70px',
      right: '190px',
      fontSize: '24px',
      cursor: 'pointer',
      color: '#113047',
      marginTop:isMobile?'-35px':'0',
      marginRight:isMobile?'-140px':'0'

    },
    vetProfile: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
      borderBottom: '1px solid #eee',
      paddingBottom: '20px',
    },
    timeSlot: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      border: '1px solid #ccc',
      borderRadius: '5px',
      padding: '12px',
      marginBottom: '10px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      '&:hover': {
        borderColor: '#113047',
        backgroundColor: '#f5f9ff',
      },
    },
    selectedTimeSlot: {
      borderColor: '#113047',
      backgroundColor: '#e1f0ff',
    },
    rescheduleButton: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#113047',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer',
      fontWeight: 'bold',
      marginTop: 'auto',
      '&:disabled': {
        backgroundColor: '#ccc',
        cursor: 'not-allowed',
      },
    },
    datePickerContainer: {
      position: 'absolute',
      top: '120px',
      right: '20px',
      zIndex: 10,
      backgroundColor: 'white',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      borderRadius: '4px',
    },
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
            <button style={{ backgroundColor: "white", color: "black", fontWeight: "bold", padding: "5px 10px", borderRadius: "5px", border: "1px solid black", cursor: "pointer", fontSize:isMobile?'14px': "15px" }} >
              <FaPlus onClick={() => navigate('/petregister')} /> Add
            </button>
            <button style={{ backgroundColor: "#6DC5EE", color: "white", fontWeight: "bold", padding: "5px 10px", borderRadius: "5px", border: "none", cursor: "pointer", fontSize: "15px" }}>
              <FaCalendarCheck /> My Appointment
            </button>
          </div>
          <div style={{ fontSize:isMobile?'13px': "14px", color: "grey", fontWeight: "bold", marginLeft: "30px", marginTop: "30px" }}>Upcoming Appointment</div>
        </div>
      </div>

      <div style={petContainerStyle}>
        <div>
          {currentAppointments.length > 0 ? (
            currentAppointments.map((appointment, index) => (
              <div key={index}>
                <div style={apptschedule}>
                  <div style={{ fontSize: "14px", fontStyle: "italic", color: "grey", marginBottom: "10px", fontWeight: "bold" }}>Appointment Scheduled:</div>

                  <div style={{ fontSize: "14px", marginBottom: "4px", marginLeft: "20px", display: "flex", gap: "9px" }}>
                    <FaIdCard style={{ marginRight: '6px', color: "#888" }} />Appointment ID:
                    <p style={{ fontSize: "14px", fontStyle: "italic", color: "grey" }}>{appointment.appointment._id}</p>
                  </div>
                  <div style={{ fontSize: "14px", marginBottom: "4px", marginLeft: "20px", display: "flex", gap: "9px" }}>
                    <FaCalendarAlt style={{ marginRight: '6px', color: "#888" }} /> Date: <p style={{ fontSize: "14px", fontStyle: "italic", color: "grey" }}> {new Date(appointment.appointment.appointmentDate).toLocaleDateString()}</p>
                  </div>
                  <div style={{ fontSize: "14px", marginBottom: "4px", marginLeft: "20px", display: "flex", gap: "9px" }}>
                    <FaClock style={{ marginRight: '6px', color: "#888" }} /> Time: <p style={{ fontSize: "14px", fontStyle: "italic", color: "grey" }}>{appointment.appointment.appointmentTime} - {appointment.appointment.endTime}</p>
                  </div>

                  <div style={{ fontSize: "14px", marginBottom: "4px", marginLeft: "20px", display: "flex", gap: "9px" }}>
                    <FaUser style={{ marginRight: '6px', color: "#888" }} /> Pet Owner:
                    <p style={{ fontSize: "14px", fontStyle: "italic", color: "grey" }}>{userName || "N/A"}</p>
                  </div>

                  <div style={{ fontSize: "14px", marginBottom: "4px", marginLeft: "20px", display: "flex", gap: "9px" }}>
                    <FaPaw style={{ marginRight: '6px', color: "#888" }} /> Pet Name:
                    <p style={{ fontSize: "14px", fontStyle: "italic", color: "grey" }}>{appointment.pet?.petname || "N/A"}</p>
                  </div>

                  <div style={{ fontSize: "14px", marginBottom: "4px", marginLeft: "20px", display: "flex", gap: "9px" }}>
                    <FaExclamationCircle style={{ marginRight: '6px', color: "#888" }} /> Concerns: <p style={{ fontSize: "14px", fontStyle: "italic", color: "grey" }}> {appointment.appointment.concern}</p>
                  </div>
                  <div style={{ fontSize: "14px", marginBottom: "4px", marginLeft: "20px", display: "flex", gap: "9px" }}>
                    <FaUserMd style={{ marginRight: '6px', color: "#888" }} /> Vet: <p style={{ fontSize: "14px", fontStyle: "italic", color: "grey" }}> Dr. {appointment.vet && appointment.vet.name ? appointment.vet.name : "Not Available"}</p>
                  </div>
                  <div style={{ fontSize: "14px", marginBottom: "4px", marginLeft: "20px", display: "flex", gap: "9px" }}>
                    <FaDollarSign style={{ marginRight: '6px', color: "#888" }} /> Amount: <p style={{ fontSize: "14px", fontStyle: "italic", color: "grey" }}> {appointment.appointment.paymentAmount}$</p>
                  </div>

                  <div style={buttonstyle}>
                
{isAtLeastThreeDaysAway(appointment.appointment.appointmentDate) &&
 appointment.appointment.appointmentStatus !== 'cancelled' &&
 appointment.vet?.is_approved !== "deleted" ? (
  <button
    onClick={() => handleRescheduleClick(appointment)}
    style={{
      backgroundColor: "#3D586C",
      color: "white",
      fontWeight: "bold",
      fontStyle: "italic",
      padding: isMobile ? "9px 15px" : "9px 17px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      cursor: "pointer",
      fontSize: isMobile ? "11px" : "14px"
    }}
  >
    Reschedule Appointment
  </button>
) : (
  <button
    disabled
    title={
      appointment.appointment.appointmentStatus === 'cancelRequested'
        ? "Cancellation request in progress. Reschedule disabled."
        : appointment.vet?.is_approved === "deleted"
        ? "Vet is no longer available for rescheduling."
        : "Appointments can only be rescheduled at least 3 days in advance."
    }
    style={{
      backgroundColor: "#E4E4E4",
      color: "#989898",
      fontWeight: "bold",
      fontStyle: "italic",
      padding: isMobile ? "9px 15px" : "9px 19px",
      borderRadius: "5px",
      border: "1px solid #aaa",
      cursor: "not-allowed",
      fontSize: isMobile ? "11px" : "14px"
    }}
  >
    Reschedule Unavailable
  </button>
)}





               <button
  onClick={() => handleCancelAppointment(appointment)}
  disabled={appointment.appointment.appointmentStatus === 'pendingRefund'}
  style={{
    backgroundColor: appointment.appointment.appointmentStatus === 'cancelled' ? "#A52727" : "#A52727",
    color: appointment.appointment.appointmentStatus === 'cancelled' ? "#989898" : "white",
    cursor: appointment.appointmentStatus === 'cancelled' ? "not-allowed" : "pointer",
    fontWeight: "bold",
    fontStyle: "italic",
    padding:isMobile? "9px 15px": "9px 19px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: isMobile? "11px": "14px",
  }}
>
  Cancel Appointment
</button>

                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='nomessage' style={{ fontSize: "12px", fontStyle: "italic", color: "#ccc", height: "200px" , marginTop:"130px"}}>No Appointment Scheduled</div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', marginTop: '20px' }}>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          style={{
            padding: '8px',
            height: "30px",
            borderRadius: '50%',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            backgroundColor: currentPage === 1 ? '#eee' : '#113047',
            color: currentPage === 1 ? '#999' : '#fff',
            border: 'none',
          }}
        >
          <FaChevronLeft />
        </button>

        <span style={{ fontSize: '13px' }}>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          style={{
            padding: '8px',
            height: "30px",
            borderRadius: '50%',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            backgroundColor: currentPage === totalPages ? '#eee' : '#113047',
            color: currentPage === totalPages ? '#999' : '#fff',
            border: 'none',
          }}
        >
          <FaChevronRight />
        </button>
      </div>

      <div style={{ fontSize: "16px", fontStyle: "italic", color: "113047", textDecoration: "none", marginLeft:isMobile?'440px': "1250px", marginTop: "20px", marginBottom: "30px", fontWeight: "bold"}}><a style={{textDecoration:"none"}} href='/userprofile'>Back</a> </div>

      {/* Cancel Confirmation Modal */}
      {cancelModalVisible && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <div style={styles.closeButton} onClick={() => setCancelModalVisible(false)}>×</div>
            <p style={styles.title}>Cancel Appointment?</p>
            <p style={styles.subtitle}>
              Your appointment is less than a day away. Are you sure you want to cancel it?
            </p>
             <p style={{fontStyle:"italic", fontSize:"14px", color:"#555"}}>
             Note: Your appointment will be cancelled, but no refund will be issued.
            </p>
            <div style={styles.buttonContainer}>
              <button
                style={styles.rescheduleButton}
                onClick={confirmCancelAppointment}
              >
                Yes
              </button>
              <button
                style={styles.cancelButton}
                onClick={() => setCancelModalVisible(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

{/* cancel confimation popup */}
{cancelshowPopup && (
    <div style={popupStyles.overlay}>
    <div style={popupStyles.box}>
      <div style={popupStyles.tickAnimation}>
        <svg viewBox="0 0 52 52" style={popupStyles.svg}>
          <circle style={popupStyles.circle} cx="25" cy="26" r="24" />
          <path style={popupStyles.check} fill="none" d="M14,27 L22,35 L38,19" />
        </svg>
      </div>
            <p className="popup-text"> Your appointment is cancelled successfully!</p>
            <button onClick={() => setcancelShowPopup(false)} style={{  
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



      {/* Reschedule Modal */}
      {showRescheduleModal && selectedAppointment && (
        <div style={rescheduleModalStyles.overlay}>
          <div style={rescheduleModalStyles.modalContainer}>
              <div style={rescheduleModalStyles.closeButton} onClick={() => setShowRescheduleModal(false)}>×</div>
            {/* Left Panel - Appointment Details */}
            <div style={rescheduleModalStyles.leftPanel}>
              <h3 style={{ marginBottom: "20px", color: "#113047",marginTop:"17px" , fontSize:"18px"}}>Your Appointment Details:</h3>
              <div style={{ marginBottom: "10px", marginLeft:"20px", border: "1px solid rgb(232, 232, 232)", padding: "15px", borderRadius: "5px", height: "600px", overflowY: "auto" }}>
                <p style={{fontSize:"14px", marginBottom:"15px", display: "flex", gap: "9px"}}><strong>Appointment ID:</strong > <p style={{ fontSize: "14px", fontStyle: "italic", color: "grey" }}>{selectedAppointment.appointment._id}</p></p>
                <p style={{fontSize:"14px", marginBottom:"15px", display: "flex", gap: "9px"}}><strong >Current Date:</strong> <p style={{ fontSize: "14px", fontStyle: "italic", color: "grey" }}>{new Date(selectedAppointment.appointment.appointmentDate).toLocaleDateString()}</p></p>
                <p style={{fontSize:"14px", marginBottom:"15px", display: "flex", gap: "9px"}}><strong >Current Time:</strong> <p style={{ fontSize: "14px", fontStyle: "italic", color: "grey" }}>{selectedAppointment.appointment.appointmentTime} - {selectedAppointment.appointment.endTime}</p></p>
                <p style={{fontSize:"14px", marginBottom:"15px", display: "flex", gap: "9px"}}><strong>Pet Owner:</strong> <p style={{ fontSize: "14px", fontStyle: "italic", color: "grey" }}>{userName}</p></p>
                <p style={{fontSize:"14px", marginBottom:"15px", display: "flex", gap: "9px"}}><strong>Pet Name:</strong> <p style={{ fontSize: "14px", fontStyle: "italic", color: "grey" }}>{selectedAppointment.pet?.petname || "N/A"}</p></p>
                <p style={{fontSize:"14px", marginBottom:"15px", display: "flex", gap: "9px"}}><strong>Veterinarian:</strong><p style={{ fontSize: "14px", fontStyle: "italic", color: "grey" }}> Dr. {selectedAppointment.vet?.name || "Not Available"}</p></p>
                <p style={{fontSize:"14px", marginBottom:"15px", display: "flex", gap: "9px"}}><strong>Concerns:</strong> <p style={{ fontSize: "14px", fontStyle: "italic", color: "grey" }}>{selectedAppointment.appointment.concern}</p></p>
                <p style={{fontSize:"14px", marginBottom:"15px", display: "flex", gap: "9px"}}><strong>Amount:</strong> <p style={{ fontSize: "14px", fontStyle: "italic", color: "grey" }}>{selectedAppointment.appointment.paymentAmount}$</p></p>
              </div>
            </div>

<hr ></hr>
            {/* Right Panel - Rescheduling */}
            <div style={rescheduleModalStyles.rightPanel}>
              {/* <div style={rescheduleModalStyles.closeButton} onClick={() => setShowRescheduleModal(false)}>×</div> */}
              
              {/* Vet Profile */}
              <div style={rescheduleModalStyles.vetProfile}>
       
                  <img
     src={
    selectedAppointment.vet.photo
      ? selectedAppointment.vet.photo.startsWith('http')
        ? selectedAppointment.vet.photo // Already a full URL
        : `${process.env.REACT_APP_BASE_URL}/${selectedAppointment.vet.photo.replace(/\\/g, '/').replace(/^\/+/, '')}`
      : '/defaultvet.jpg'
  }
  alt={selectedAppointment.vet.name}
style={{
      width: '110px',
      height: '110px',
      borderRadius: '50%',
      objectFit: 'cover',
      marginRight: '16px',
      border: '1px solid #ccc', // Border color
    }}
  onError={(e) => {
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = '/defaultvet.jpg';
  }}
    
  />
                <div>
                  <h4 style={{ margin: "0 0 5px 0", fontSize: "18px", color: "#113047" }}>
                    {selectedAppointment.vet?.name ? `Dr. ${selectedAppointment.vet.name}` : "Dr. Not Available"}
                  </h4>
                  <p style={{ margin: "0 0 5px 0", fontSize: "14px", color: "#555", fontWeight: "500" }}>
                    {selectedAppointment.vet?.specialist || "Veterinarian"}
                  </p>
                  {/* <p style={{ margin: "0", fontSize: "14px", color: "#555" }}>
                    {selectedAppointment.vet?.rating?.toFixed(1) || "-"} &nbsp; 
                    {selectedAppointment.vet.reviewCount || "-"} reviews
                  </p> */}

<div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
  <span style={{ fontSize: '14px', color: '#777' }}></span>
  <span style={{ color: '#6DC5EE', fontSize: '16px',marginLeft:"-8px" }}>
    {Array.from({ length: 5 }, (_, i) => {
      if (averageRating >= i + 1) return '★';          // full star
      if (averageRating >= i + 0.5) return '☆';        // half star (you can customize)
      return '☆';                                      // empty star
    }).join('')}
  </span>
  <span style={{ fontSize: '13px', color: '#777' }}>({averageRating})</span>
  <p style={{ fontSize: '13px', color: '#777', marginRight: '20px' }}>{totalReviews} Reviews</p>
</div>

                </div>
              </div>

              {/* Date Selection */}
              <div style={{ marginBottom: "20px" }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "15px"
                }}>
                  <strong style={{ fontSize: "16px" }}>Available Time Slot</strong>
                  <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                    <p style={{ marginRight: "10px", fontSize: "14px" }}>
                      {selectedDate.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <FaRegCalendarAlt
                      size={18}
                      onClick={() => setShowCalendar(!showCalendar)}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>

                {showCalendar && (
                  <div style={rescheduleModalStyles.datePickerContainer}>
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleDateChange}
                      inline
                      minDate={new Date()}
                    />
                  </div>
                )}
              </div>

              {/* Time Slots */}
              <div style={{ maxHeight: "300px", overflowY: "auto", marginBottom: "20px" }}>
  {vetAvailability.filter(slot => slot.status === "available").length > 0 ? (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      {vetAvailability
        .filter(slot => slot.status === "available")
        .map((slot, index) => (
          <div
            key={index}
            style={{
              ...rescheduleModalStyles.timeSlot,
              ...(selectedTimeSlot?.startTime === slot.startTime &&
              selectedTimeSlot?.endTime === slot.endTime
                ? rescheduleModalStyles.selectedTimeSlot
                : {})
            }}
            onClick={() => handleTimeSlotSelect(slot)}
          >
            <span style={{ fontSize: "14px" }}>
              {slot.startTime} - {slot.endTime}
            </span>
         
          </div>
        ))}
    </div>
  ) : (
    <div style={{ textAlign: "center", padding: "20px", color: "#777" }}>
      No available time slots found for this date
    </div>
  )}
</div>

              {/* Reschedule Button */}
              <button
                style={{
                  ...rescheduleModalStyles.rescheduleButton,
                  ...(!selectedTimeSlot ? { backgroundColor: '#ccc', cursor: 'not-allowed' } : {})
                }}
                // onClick={handleRescheduleSubmit}
                // onSubmit={() => setShowPopup(true)}
                onClick={() => {
                  handleRescheduleSubmit();
                  // setShowRescheduleModal(false);
                  // setShowPopup(true)
                }}

                disabled={!selectedTimeSlot || loading}>
            {loading ? "Rescheduling" : "Reschedule Appointment"}

              </button>
            </div>
          </div>
        </div>
      )}

{/* reschedule appointment popup */}
{showPopup && (
    <div style={popupStyles.overlay}>
    <div style={popupStyles.box}>
      <div style={popupStyles.tickAnimation}>
        <svg viewBox="0 0 52 52" style={popupStyles.svg}>
          <circle style={popupStyles.circle} cx="25" cy="26" r="24" />
          <path style={popupStyles.check} fill="none" d="M14,27 L22,35 L38,19" />
        </svg>
      </div>
            <p className="popup-text">Appointment rescheduled successfully!</p>
            <button 
         onClick={() => {
    setShowPopup(false);
    window.location.reload(); // Refresh the page
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


    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: '6px',
    padding: '30px',
    width: '500px',
    height: '220px',
    position: 'relative',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  },
  closeButton: {
    position: 'absolute',
    top: '15px',
    right: '20px',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#666',
    fontWeight: 'bold',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '17px',
    marginBottom: '15px',
    color: '#113047',
  },
  subtitle: {
    fontSize: '15px',
    marginBottom: '10px',
    color: '#555',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '170px',
    marginTop: '30px',
  },
  rescheduleButton: {
    backgroundColor: '#113047',
    color: '#fff',
    padding: '12px 24px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    minWidth: '100px',
  },
  cancelButton: {
    backgroundColor: '#A52A2A',
    color: '#fff',
    padding: '12px 24px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    minWidth: '100px',
  },
};

export default Myappointment;
