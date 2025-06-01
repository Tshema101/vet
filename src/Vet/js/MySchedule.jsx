import React, { useState, useEffect } from "react";
import VetSideBar from "./VetSidebar";
import "../css/MySchedule.css";
import "../css/Confirmation.css";

import VetHeader from "./Header";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MySchedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const [vetId, setVetId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalSlots, setOriginalSlots] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [actionType, setActionType] = useState('available');
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  // Get token from localStorage
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }

    const decodeToken = () => {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setVetId(payload.userId);
      } catch (error) {
        console.error("Error decoding token:", error);
        navigate('/');
      }
    };

    decodeToken();
  }, [token, navigate]);

  // Format date as DD-MM-YYYY
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Fetch availability when currentDate or vetId changes
  useEffect(() => {
    if (!vetId) return;

    const fetchSlots = async () => {
      setIsLoading(true);
      const headers = { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
    
      const formattedDate = formatDate(currentDate);
      const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
    
      try {
        // Fetch specific date availability
        const dateRes = await fetch(
          `http://localhost:8080/availability/date/${vetId}/${formattedDate}`, 
          { headers }
        );
        const dateData = await dateRes.json();
        console.log(dateData)

        if (dateData?.success && dateData?.data?.slots?.length > 0) {
          setTimeSlots(dateData.data.slots);
          setOriginalSlots(dateData.data.slots);
          setHasChanges(false);
          return;
        }

        // Fallback to day of week availability
        const dayRes = await fetch(
          `http://localhost:8080/availability/day/${vetId}/${dayName}`, 
          { headers }
        );
        const dayData = await dayRes.json();

        if (dayData?.success && dayData?.slots?.length > 0) {
          setTimeSlots(dayData.slots);
          setOriginalSlots(dayData.slots);
          setHasChanges(false);
          return;
        }

        setTimeSlots([]);
        setOriginalSlots([]);
        setHasChanges(false);
      } catch (err) {
        console.error("Error fetching slots:", err);
        setTimeSlots([]);
        setOriginalSlots([]);
        setHasChanges(false);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchSlots();
  }, [currentDate, vetId, token]);

  const getWeekDays = (date) => {
    const days = [];
    const current = new Date(date);
    current.setDate(current.getDate() - current.getDay());

    for (let i = 0; i < 7; i++) {
      const day = new Date(current);
      day.setDate(current.getDate() + i);
      days.push({
        name: day.toLocaleString('default', { weekday: 'short' }),
        date: day.getDate(),
        fullDate: day
      });
    }
    return days;
  };

  const weekDays = getWeekDays(currentDate);
  const isCurrentDay = (day) => day.fullDate.toDateString() === currentDate.toDateString();

  const prevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const nextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const selectDay = (day) => {
    setCurrentDate(day.fullDate);
  };

  const toggleSlot = (index) => {
    const updatedSlots = [...timeSlots];
    const slot = updatedSlots[index];
    
    // Prevent modifying booked slots
    if (slot.status === 'booked') {
      return;
    }

    const newStatus = slot.status === 'available' ? 'unavailable' : 'available';
    updatedSlots[index] = { ...slot, status: newStatus };
    
    setTimeSlots(updatedSlots);
    
    // Compare with original slots
    const hasAnyChanges = updatedSlots.some((slot, i) => {
      // Skip comparison for booked slots
      if (slot.status === 'booked') return false;
      if (i >= originalSlots.length) return true;
      return slot.status !== originalSlots[i].status;
    });
    
    setHasChanges(hasAnyChanges);
  };

  const toggleAllSlots = () => {
    const allAvailable = timeSlots.every(slot => 
      slot.status === 'available' || slot.status === 'booked'
    );
    
    const newStatus = allAvailable ? 'unavailable' : 'available';
    const updatedSlots = timeSlots.map(slot => 
      slot.status === 'booked' ? slot : { ...slot, status: newStatus }
    );
    
    setTimeSlots(updatedSlots);
    setHasChanges(true);
  };

  const confirmPostChanges = () => {
    setShowConfirmation(true);
  };

  const cancelPostChanges = () => {
    setShowConfirmation(false);
  };

  const postChanges = async () => {
    setShowConfirmation(false);
    
    if (!hasChanges) {
      alert('No changes to save');
      return;
    }

    try {
      setIsLoading(true);
      
      // Get all changed slots (excluding booked ones)
      const slotsToUpdate = timeSlots
        .filter((slot, index) => {
          if (slot.status === 'booked') return false;
          if (index >= originalSlots.length) return true;
          return slot.status !== originalSlots[index].status;
        })
        .map(slot => ({
          startTime: slot.startTime,
          endTime: slot.endTime,
          status: slot.status
        }));

      if (slotsToUpdate.length === 0) {
        alert('No changes to save');
        return;
      }

      const formattedDate = formatDate(currentDate);
      const updatePayload = {
        slots: slotsToUpdate
      };

      const response = await fetch(
        `http://localhost:8080/availability/date/${vetId}/${formattedDate}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(updatePayload)
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update slots');
      }

      // Update the original slots to match current state
      setOriginalSlots([...timeSlots]);
      setHasChanges(false);
      // alert('Availability updated successfully!');

          // Show success animation
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);


    } catch (error) {
      console.error('Error updating slots:', error);
      alert('Failed to update slots. Please try again.');
      // Revert to original state
      setTimeSlots([...originalSlots]);
      setHasChanges(false);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return { bg: '#E6F7EE', text: '#0AB61E', label: 'Available' };
      case 'unavailable':
        return { bg: '#FFEBEE', text: '#F44336', label: 'Unavailable' };
      case 'booked':
        return { bg: '#E3F2FD', text: '#2196F3', label: 'Booked' };
      default:
        return { bg: '#E3F2FD', text: '#2196F3', label: 'Booked' };
    }
  };

  return (
    <div className="container">
      <VetSideBar />
      <div className="main">
        <VetHeader />

        <p className="subtext">Manage your availability</p>

        <div className="calendar-wrapper">
          <div className="calendar-container">
            <button className="nav-arrowS" onClick={prevWeek}>
              <ChevronLeft size={20} />
            </button>
            <div className="days-container">
              {weekDays.map((day, i) => (
                <div 
                  key={i} 
                  className={`day-pill ${isCurrentDay(day) ? 'active' : ''}`}
                  onClick={() => selectDay(day)}
                >
                  <span>{day.name}</span>
                  <span className="day-date">{day.date}</span>
                </div>
              ))}
            </div>
            <button className="nav-arrowS" onClick={nextWeek}>
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="current-date">
            {currentDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </div>
        </div>

        <div className="time-slots-container">
          {isLoading ? (
            <p>Loading slots...</p>
          ) : timeSlots.length > 0 ? (
            <>
              {timeSlots.map((slot, index) => {
                const status = getStatusColor(slot.status);
                return (
                  <div className="time-slot" key={index}>
                    <div className="time-group">
                      <span className="time-label">Today at</span>
                      <span className="time-box" style={{width: "90px", padding: "15px 10px"}}>
                        {slot.startTime}
                      </span>
                      <span>to</span>
                      <span className="time-box" style={{width: "90px", padding: "15px 10px"}}>
                        {slot.endTime}
                      </span>
                    </div>
                    <button 
                      className={`status-badge`}
                      style={{ 
                        backgroundColor: status.bg,
                        color: status.text,
                        cursor: slot.status === 'booked' ? 'not-allowed' : 'pointer'
                      }}
                      onClick={() => toggleSlot(index)}
                      disabled={slot.status === 'booked'}
                    >
                      <span 
                        className="status-dot" 
                        style={{ backgroundColor: status.text }}
                      ></span>
                      <span>{status.label}</span>
                    </button>
                  </div>
                );
              })}

              {timeSlots.some(slot => slot.status !== 'booked') && (
                <div className="select-all-container">
                  <button 
                    className="select-all-btn" 
                    onClick={toggleAllSlots}
                  >
                    {timeSlots.every(slot => 
                      slot.status === 'available' || slot.status === 'booked'
                    ) ? 'Make All Unavailable' : 'Make All Available'}
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="no-slots-msg" style={{color:"#0AB61E"}}>
              No availability set for this day.
            </p>
          )}
        </div>

        {hasChanges && (
          <button 
            className="post-btn"
            onClick={confirmPostChanges}
            disabled={isLoading}
          >
            {isLoading ? 'Posting...' : 'Post Changes'}
          </button>
        )}

        {/* Confirmation Modal */}
        {showConfirmation && (
        <div className="modal-overlay">
          <div className="confirmation-modal">
            <h3>
              Are you sure you want to make this slot {actionType === 'available' ? 'available' : 'unavailable'} to the clients?
            </h3>
            
            <div className="modal-buttons">
              <button className="confirm-btn" onClick={postChanges}>
                Yes, Update
              </button>
              <button className="cancel-btn" onClick={cancelPostChanges}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
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
            <p className="success-message">Availability updated successfully!</p>
          </div>
        </div>
      )}
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        
        .confirmation-modal {
          background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          width: 400px;
          max-width: 90%;
          text-align: center;
        }
        
        .confirmation-modal h3 {
          margin-bottom: 15px;
          color: #333;
          font-size: 18px;
        }
        
        .confirmation-modal p {
          margin-bottom: 25px;
          color: #666;
        }
        
        .modal-buttons {
          display: flex;
          justify-content: center;
          gap: 15px;
        }
        
        .confirm-btn, .cancel-btn {
          padding: 10px 25px;
          border: none;
          border-radius: 5px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .confirm-btn {
          background-color: #4CAF50;
          color: white;
        }
        
        .confirm-btn:hover {
          background-color: #3e8e41;
        }
        
        .cancel-btn {
          background-color: #f44336;
          color: white;
        }
        
        .cancel-btn:hover {
          background-color: #d32f2f;
        }
      `}</style>
    </div>
  );
};

export default MySchedule;
