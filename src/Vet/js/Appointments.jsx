import React, { useState, useEffect } from "react";
import VetSideBar from "./VetSidebar";
import "../css/Appointment.css";
import VetHeader from "./Header";
import "../css/Confirmation.css";

import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';

const Appointments = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [medication, setMedication] = useState({ text: '', files: [] });
  const [vetId, setVetId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [appointmentList, setAppointmentList] = useState([]);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAddMedicationForm, setShowAddMedicationForm] = useState(false);


  

  const fetchAppointments = async (date = currentDate) => {
    setIsLoading(true);
    try {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;
      
      console.log('Fetching appointments for:', {
        vetId,
        formattedDate,
        url: `http://localhost:8080/appointments/vet/${vetId}/date/${formattedDate}`
      });

      const response = await fetch(
        `http://localhost:8080/appointments/vet/${vetId}/date/${formattedDate}`
      );
      const data = await response.json();
      
      console.log('API Response:', data);
      
      if (data.success && data.data) {
        setAppointments(data.data);
      } else {
        setAppointments([]);
      }

       // Fetch all appointments for total count
      const allResponse = await fetch(`http://localhost:8080/appointments/vet/${vetId}`);
      const allData = await allResponse.json();
      
      console.log("All appointments:", allData);
      
      if (allData.success) {
        setAppointmentList(allData.data || []);
        setTotalAppointments(allData.count || allData.data?.length || 0);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setAppointments([]);
      setTotalAppointments(0);

    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!vetId) return;
    fetchAppointments();
  }, [vetId, currentDate]);


  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setVetId(payload.userId);
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }, []);

  useEffect(() => {
    if (!vetId) return;  

    fetchAppointments();
  }, [vetId, currentDate]);


  
  const handleFileChange = (e) => {
   
    setMedication({
      ...medication,
      files: Array.from(e.target.files)
    });
   console.log(medication)
  };





  const submitMedication = async (e) => {
  e.preventDefault();
  
  // Debug log to check current state
  console.log('Current selectedAppointment:', selectedAppointment);
  
  // Safely get the appointment ID
  const appointmentId = selectedAppointment?.id;
  
  if (!appointmentId) {
    console.error('Cannot submit - missing appointment ID in:', selectedAppointment);
    alert('Please select a valid appointment first');
    return;
  }


  const formData = new FormData();
  formData.append('medicationText', medication.text);
  
  // Add files if they exist
  if (medication.files?.length > 0) {
    medication.files.forEach(file => {
     formData.append('medication', file);
    });
  }
console.log(formData)
  try {
    console.log('Submitting to:', `http://localhost:8080/appointments/${appointmentId}`);
    
    const response = await fetch(
      `http://localhost:8080/appointments/${appointmentId}`,
      {
        method: 'POST',
        body: formData
        // Note: Don't set Content-Type header for FormData
      }
    );

    const result = await response.json();
    console.log('Submission result:', result);

    if (result.success) {
      // Show success animation
      setShowSuccess(true);
      
      setMedication({ text: '', files: [] });
      // Refresh the appointment data
      setSelectedAppointment(prev => ({
        ...prev,
        appointment: {
          ...prev.appointment,
          medications: [
            ...(prev.appointment.medications || []),
            result.data.medication  // Add the new medication
          ]
        }
      }));
      console.log('Updated appointment:', selectedAppointment);

      // alert('Medication added successfully!');

      setShowAddMedicationForm(false);
      // Hide success after 2 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
      await fetchAppointments();      

    } else {
      throw new Error(result.message || 'Failed to add medication');
    }
  } catch (error) {
    console.error('Medication submission failed:', error);
    alert(`Error: ${error.message}`);
  }
};

const getStatusStyle = (status) => {
  switch (status) {
    case 'booked':
      return { backgroundColor: '#FFEBEE', color: '#F44336', label: 'Booked' };
    case 'attended':
      return { backgroundColor: '#E6F7EE', color: '#0AB61E', label: 'Attended' };
    case 'rescheduled':
      return { backgroundColor: '#FFF3E0', color: '#FF9800', label: 'Rescheduled' };
    case 'cancelled':
      return { backgroundColor: '#F5F5F5', color: '#9E9E9E', label: 'Cancelled' };
    default:
      return { backgroundColor: '#E3F2FD', color: '#2196F3', label: 'Pending' };
  }
};


const formatDate = (dateString) => {
  try {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
};



  const handleStatusClick = (appointment) => {
    if ((appointment.status || 'pending') === "pending") {
      console.log("Selected appointment details:", appointment);
      setSelectedAppointment(appointment);
      setShowAddMedicationForm(true);
    }
  };


  const getCalendarDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    // Get first day of month and how many days in month
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Get days from previous month to show
    const prevMonthDays = firstDay.getDay(); // 0 = Sunday
    
    // Get days from next month to show
    const totalDaysToShow = Math.ceil((daysInMonth + prevMonthDays) / 7) * 7;
    const nextMonthDays = totalDaysToShow - (daysInMonth + prevMonthDays);
    
    const days = [];
    
    // Previous month days
    for (let i = prevMonthDays - 1; i >= 0; i--) {
      const day = new Date(year, month, -i);
      days.push({
        date: day,
        isCurrentMonth: false
      });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(year, month, i);
      days.push({
        date: day,
        isCurrentMonth: true
      });
    }
    
    // Next month days
    for (let i = 1; i <= nextMonthDays; i++) {
      const day = new Date(year, month + 1, i);
      days.push({
        date: day,
        isCurrentMonth: false
      });
    }
    
    return days;
  };

  

  return (
    <div className="container">
      {showSuccess && (
      <div className="success-animation">
        <div className="success-content">
          <svg
            className="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="checkmark__check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
          <p className="success-message">Medication added successfully!</p>
        </div>
      </div>
    )}
      <VetSideBar />
      <div className="main">
        <VetHeader />

        <div className="appointments-header">
          <h2 className="appointments-title">Appointments ({totalAppointments})</h2>
          
          <div className="date-navigation-box">
            <button 
              className="nav-arrowA" 
              onClick={() => setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 1)))}
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="date-display-box" onClick={() => setShowCalendar(!showCalendar)}>
              <CalendarDays size={16} className="calendar-icon" />
              <span>{formatDate(currentDate)}</span>
            </div>
            
            <button 
              className="nav-arrowA" 
              onClick={() => setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 1)))}
            >
              <ChevronRight size={20} />
            </button>

            {showCalendar && (
            <div className="calendar-popup">
              <div className="calendar-header">
                <button onClick={() => {
                  const prevMonth = new Date(currentDate);
                  prevMonth.setMonth(prevMonth.getMonth() - 1);
                  setCurrentDate(prevMonth);
                }}>
                  <ChevronLeft size={16} />
                </button>
                <h4>
                  {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
                </h4>
                <button onClick={() => {
                  const nextMonth = new Date(currentDate);
                  nextMonth.setMonth(nextMonth.getMonth() + 1);
                  setCurrentDate(nextMonth);
                }}>
                  <ChevronRight size={16} />
                </button>
              </div>
              
              <div className="calendar-grid">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <div key={day} className="calendar-weekday">{day}</div>
                ))}
                
                {getCalendarDays(currentDate).map((day, index) => (
                  <div 
                    key={index}
                    className={`calendar-day ${
                      day.isCurrentMonth ? '' : 'other-month'
                    } ${
                      day.date.toDateString() === currentDate.toDateString() ? 'selected' : ''
                    }`}
                    onClick={() => {
                      setCurrentDate(day.date);
                      setShowCalendar(false);
                    }}
                  >
                    {day.date.getDate()}
                  </div>
                ))}
              </div>
            </div>
          )}
          </div>
        </div>





        <div className="appointments-table-container">
        {isLoading ? (
            <div className="loading-indicator">Loading appointments...</div>
          ) : appointments.length > 0 ? (
          <table className="appointments-table">
            <thead>
              <tr>
                <th>Sl No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Time</th>
                <th>Payment</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>

              {appointments.map((appt, index) => (
                <tr key={appt._id} className="appointment-row">
                  <td>{index + 1}</td>
                  <td>{appt.client?.name || '-'}</td>
                  <td>{appt.client?.email || '-'}</td>
                  <td>{appt.appointment?.time || '-'}</td>
                  <td className={appt.payment?.status === "paid" ? "payment-paid" : "payment-refunded"}>
                    {appt.payment?.status || 'N/A'}
                  </td>
                 
                  <td style={{ textAlign: 'center' }}>
                    <span 
                      style={getStatusStyle(appt.appointment?.appointmentStatus)}
                      className="status-badge"                                  
                      onClick={() => handleStatusClick(appt)}
                    >
                      {appt.appointment?.appointmentStatus || 'pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
           ) : (
            <div className="no-appointments">No appointments found for this date</div>
          )}
        </div>

        {selectedAppointment && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Appointment Details</h2>
              
              <div className="details-section">
                <h3>Client Information</h3>
                <p><strong>Name:</strong> {selectedAppointment.client?.name || '-'}</p>
                <p><strong>Email:</strong> {selectedAppointment.client?.email || '-'}</p>
                {/* <p><strong>Phone:</strong> {selectedAppointment.client?.contact_no || '-'}</p> */}
              </div>

              <div className="details-section">
                <h3>Pet Information</h3>
                <p><strong>Name:</strong> {selectedAppointment.pet?.name || '-'}</p>
                <p><strong>Type:</strong> {selectedAppointment.pet?.species || '-'}</p>
                <p><strong>Breed:</strong> {selectedAppointment.pet?.breed || '-'}</p>
              </div>

              <div className="details-section">
                <h3>Appointment Details</h3>
                <p><strong>Date:</strong> {formatDate(selectedAppointment.appointment.date)}</p>
                <p><strong>Time:</strong> {selectedAppointment.appointment?.time || '-'}</p>
                <p><strong>Reason:</strong> {selectedAppointment.appointment?.reason || '-'}</p>
                <p><strong>Concern:</strong> {selectedAppointment.appointment?.concern || '-'}</p>
                
              </div>

              <div className="medications-section">
                <h3>Medications</h3>
                
                 

                {/* Display existing medications */}
                {selectedAppointment.appointment?.medications?.length > 0 ? (
                  <div className="medications-list">
                    {selectedAppointment.appointment.medications.map((med, index) => (
                      <div key={`med-${index}`} className="medication-item">
                        <p><strong>Instructions:</strong> {med.text || 'No instructions provided'}</p>
                        {med.photos?.length > 0 && (
                          <div className="medication-images">
                            <h4>Attachments:</h4>
                            {med.photos.map((photo, i) => (
                              <img 
                                key={`photo-${i}`}
                                src={photo}
                                alt={`Medication ${index + 1}`}
                                className="medication-img"
                              />
                            ))}
                          </div>
                        )}
                        <p className="medication-date">
                          <small>Added on: {new Date(med.addedAt || med.createdAt || med.date).toLocaleString()}</small>
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p></p>
                )}

                {/* Show Add Medication form only for non-cancelled, non-attended appointments */}
                {showAddMedicationForm && selectedAppointment.appointment?.appointmentStatus !== 'cancelled' && 
                selectedAppointment.appointment?.appointmentStatus !== 'attended' && selectedAppointment.appointment?.appointmentStatus !== 'pendingRefund' && (
                  <form onSubmit={submitMedication} className="add-medication-form">
                    <h4>Add Medication</h4>
                    <textarea
                      value={medication.text}
                      onChange={(e) => setMedication({...medication, text: e.target.value})}
                      placeholder="Enter medication instructions..."
                      rows={3}
                      required
                    />
                   <input
  type="file"
  name="medication"     
  onChange={handleFileChange}
  multiple
  accept="image/*,.pdf,.doc,.docx"
/>
                    <button type="submit" className="add-medication-btn">
                      Add Medication
                    </button>
                  </form>
                )}

                {/* Status message for cancelled appointments */}
                {selectedAppointment.appointment?.appointmentStatus === 'cancelled' && (
                  <div className="status-message cancelled-message">
                    <i className="fas fa-info-circle"></i> This appointment was cancelled - medications cannot be added
                  </div>
                )}

                
                {/* Status message for attended appointments */}
                {selectedAppointment.appointment?.appointmentStatus === 'attended' && (
                  <div className="status-message attended-message">
                    <i className="fas fa-check-circle"></i> This appointment has been completed
                  </div>
                )}

                 {selectedAppointment.appointment?.appointmentStatus === 'pendingRefund' && (
                  <div className="status-message attended-message">
                    <i className="fas fa-check-circle"></i> This appointment has been cancelled
                  </div>
                )}

               

              </div>

             

              <div className="modal-actions">
                
                <button 
                  onClick={() => setSelectedAppointment(null)}
                  className="close-btn"
                >
                  Close
                </button>
              </div>



            </div>


          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;