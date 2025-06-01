import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import "../css/Payment.css";
import VetHeader from "./Header";
import VetSidebar from "./VetSidebar";

const PaymentLog = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [vetId, setVetId] = useState('');
  const [error, setError] = useState(null);

  // Get vetId from auth token
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setVetId(payload.userId);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  // Fetch appointments with payment data
  const fetchPayments = async (date = currentDate) => {
    if (!vetId) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;
     
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/appointments/vet/${vetId}/date/${formattedDate}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log(response)

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new TypeError("Response wasn't JSON");
      }

      const { data } = await response.json();
      
      if (data) {
        // Transform appointments with payments into payment records
        const paymentRecords = data
          .filter(appt => appt.payment) // Only include appointments with payments
          .map(appt => ({
            id: appt._id,
            client: appt.client,
            time: appt.appointment?.time,
            amount: appt.payment?.amount,
            status: appt.payment?.status,
            method: appt.payment?.accountNo || appt.payment?.method
          }));
        
        setPayments(paymentRecords);
        console.log(paymentRecords)
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
      setError(error.message);
      setPayments([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch payments when vetId or date changes
  useEffect(() => {
    if (vetId) {
      fetchPayments();
    }
  }, [vetId, currentDate]);

  // Calendar navigation functions
  const handlePrevDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  const handleMonthChange = (months) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + months);
    setCurrentDate(newDate);
  };

  const handleDayClick = (day) => {
    setCurrentDate(day.date);
    setShowCalendar(false);
  };

  const getCalendarDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = firstDay.getDay();
    const totalDaysToShow = Math.ceil((daysInMonth + prevMonthDays) / 7) * 7;
    const nextMonthDays = totalDaysToShow - (daysInMonth + prevMonthDays);
    const days = [];
    
    for (let i = prevMonthDays - 1; i >= 0; i--) {
      days.push({ date: new Date(year, month, -i), isCurrentMonth: false });
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }
    
    for (let i = 1; i <= nextMonthDays; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }
    
    return days;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="container">
      <VetSidebar />
      <div className="main">
        <VetHeader />

        <div className="payment-header">
          <div className="payment-title">
            <h2>Payment Log</h2>
            
            <div className="date-navigation-box">
              <button className="nav-arrowP" onClick={handlePrevDay}>
                <ChevronLeft size={20} />
              </button>
              
              <div 
                className="date-display-box" 
                onClick={() => setShowCalendar(!showCalendar)}
              >
                <CalendarDays size={16} className="calendar-icon" />
                <span>{formatDate(currentDate)}</span>
              </div>
              
              <button className="nav-arrowP" onClick={handleNextDay}>
                <ChevronRight size={20} />
              </button>

              {showCalendar && (
                <div className="calendar-popup">
                  <div className="calendar-header">
                    <button onClick={() => handleMonthChange(-1)}>
                      <ChevronLeft size={16} />
                    </button>
                    <h4>
                      {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
                    </h4>
                    <button onClick={() => handleMonthChange(1)}>
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
                        onClick={() => handleDayClick(day)}
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
            {error && (
              <div className="error-message">
                Error: {error}
              </div>
            )}
            
            {isLoading ? (
              <div className="loading-indicator">Loading payments...</div>
            ) : payments.length > 0 ? (
              <table className="appointments-table">
                <thead>
                  <tr>
                    <th>Sl No</th>
                    <th>Client Name</th>
                    <th>Appointment Time</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment, index) => {
                     const originalAmount = payment.amount || 0;
                     const convertedAmount = originalAmount * 0.8;
 

                    return(

                   
                    <tr key={payment.id || index}>
                      <td>{index + 1}</td>
                      <td>{payment.client?.name || '-'}</td>
                      <td>{payment.time || '-'}</td>
                      <td>{convertedAmount.toLocaleString() || '0'}</td>
                      <td className={`status-${payment.status?.toLowerCase()}`}>
                        {payment.status || 'N/A'}
                      </td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="no-payments">
                {vetId ? 'No payments found for this date' : 'Loading user information...'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentLog;