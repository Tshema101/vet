import React, { useState, useEffect } from "react";
import VetHeader from "./Header";
import VetSidebar from "./VetSidebar";
import "../css/VetDashboard.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const VetDashboard = () => {
  const [appointmentList, setAppointmentList] = useState([]);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [vetId, setVetId] = useState('');
  const [timeRange, setTimeRange] = useState('daily');
  const [totalIncome, setTotalIncome] = useState(0);
  const [convertedIncome, setConvertedIncome] = useState(0);

  // Fetch vet ID from token
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

  // Fetch appointments
  useEffect(() => {
    if (!vetId) return;

    const fetchAppointments = async () => {
      try {
        const response = await fetch(`http://localhost:8080/appointments/vet/${vetId}`);
        const data = await response.json();
        
        console.log("Fetched appointments:", data); // Debug log
        
        if (data.success && data.data) {
          setAppointmentList(data.data);
          setTotalAppointments(data.count || data.data.length);
          prepareChartData(data.data);

           // Calculate total income
           const income = data.data.reduce((sum, appt) => {
            return sum + (appt.payment?.amount || 0);
          }, 0);
          
          setTotalIncome(income);
          setConvertedIncome(income * 0.8); 
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [vetId]);

  // Prepare chart data
  const prepareChartData = (appointments) => {
    console.log("Preparing chart for time range:", timeRange);
    
    let data;
    switch (timeRange) {
      case 'daily':
        data = prepareDailyData(appointments);
        break;
      
      case 'monthly':
        data = prepareMonthlyData(appointments);
        break;
      case 'yearly':
        data = prepareYearlyData(appointments);
        break;
      default:
        data = prepareDailyData(appointments);
    }
    
    console.log("Generated chart data:", data);
    setChartData(data);
  };

  // Helper function to get date string without time
  const getDateString = (date) => {
    return date.toISOString().split('T')[0];
  };

  // Daily view (last 7 days)
  const prepareDailyData = (appointments) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return Array(7).fill().map((_, i) => {
      const date = new Date(today);
      date.setDate(date.getDate() - (6 - i));
      
      const dayName = days[date.getDay()];
      const currentDateStr = getDateString(date);

      const count = appointments.filter(appt => {
        const apptDateStr = appt.appointment?.appointmentDate?.split('T')[0];
        return apptDateStr === currentDateStr;
      }).length;

      return {
        name: `${dayName} ${date.getDate()}`,
        appointments: count
      };
    })
  };


  // Monthly view (last 6 months)
  const prepareMonthlyData = (appointments) => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const today = new Date();

    return Array(6).fill().map((_, i) => {
      const date = new Date(today);
      date.setMonth(date.getMonth() - i);
      
      const month = date.getMonth();
      const year = date.getFullYear();

      const count = appointments.filter(appt => {
        const apptDateStr = appt.appointment?.appointmentDate;
        if (!apptDateStr) return false;
        
        const apptDate = new Date(apptDateStr);
        return apptDate.getMonth() === month && 
               apptDate.getFullYear() === year;
      }).length;

      return {
        name: `${monthNames[month]} ${year}`,
        month,
        year,
        appointments: count
      };
    }).reverse();
  };

  // Yearly view (last 4 years)
  const prepareYearlyData = (appointments) => {
    const currentYear = new Date().getFullYear();

    return Array(4).fill().map((_, i) => {
      const year = currentYear - i;
      
      const count = appointments.filter(appt => {
        const apptDateStr = appt.appointment?.appointmentDate;
        if (!apptDateStr) return false;
        
        const apptDate = new Date(apptDateStr);
        return apptDate.getFullYear() === year;
      }).length;

      return {
        name: year.toString(),
        year,
        appointments: count
      };
    }).reverse();
  };

  // Update chart when time range changes
  useEffect(() => {
    if (appointmentList.length > 0) {
      prepareChartData(appointmentList);
    }
  }, [timeRange]);

  return (
    <div className="container">
      <VetSidebar />
      <div className="main">
        <VetHeader />

        <div className="dashboard-container">
          {/* Stats Section */}
          <div className="stats-grid">
            <div className="stats-card" >
              <h2 className="stats-title">Total Appointments</h2>
              <p className="stats-number">{totalAppointments}</p>
            </div>
            <div className="stats-card">
              <h2 className="stats-title">Total Income</h2>
              <p className="stats-number">${convertedIncome.toLocaleString()}</p>
            </div>
          </div>

          {/* Appointments Graph */}
          <div className="bg-white p-4 rounded-2xl shadow-md" style={{ width: '90%', margin: '0 auto' }}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold" style={{padding:"20px 20px"}}>Appointments Overview</h3>
              <select
                className="border p-1 rounded"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                style={{marginLeft: "20px"}}
              >
                <option value="daily">Daily (Last 7 Days)</option>
                {/* <option value="weekly">Weekly (Last 4 Weeks)</option> */}
                <option value="monthly">Monthly (Last 6 Months)</option>
                <option value="yearly">Yearly (Last 4 Years)</option>
              </select>
            </div>

            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip 
                    formatter={(value) => [`${value} appointments`, 'Count']}
                    labelFormatter={(label) => {
                      if (timeRange === 'weekly') {
                        const item = chartData.find(d => d.name === label);
                        return item ? `${label} (${item.startDate} to ${item.endDate})` : label;
                      }
                      return label;
                    }}
                  />
                  <Bar 
                    dataKey="appointments" 
                    fill="#4f46e5" 
                    radius={[4, 4, 0, 0]}
                    name="Appointments"
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-8 text-gray-500" style={{padding: "20px 20px"}}>
                {appointmentList.length > 0 
                  ? "No appointments in selected time range" 
                  : "Loading appointment data..."}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VetDashboard;