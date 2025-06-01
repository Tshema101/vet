import React, {useState, useEffect} from "react";
import { useLocation, useNavigate} from "react-router-dom";
import AdminHeader from "./Header";
import SuperAdminSidebar from "./Sidebar";
const MonthlyPayOut = () => {
  const location = useLocation();
  const navigate = useNavigate();
//   const { vet, data, month } = location.state || {};

  const [selectedDate, setSelectedDate] = useState("2025-03-06"); // Declare this FIRST
  const [selectedYear, setSelectedYear] = useState(new Date("2025-03-06").getFullYear()); // Then use it
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  useEffect(() => {
    const year = new Date(selectedDate).getFullYear();
    setSelectedYear(year);
  }, [selectedDate]);

  const changeDateByDays = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate.toISOString().split("T")[0]);
  };

  const formattedMonth = new Date(selectedDate).toLocaleString("default", {
    month: "long",
  });


  return (
    <div className="app-container flex h-screen">
    <SuperAdminSidebar />
    <div className="flex-1 flex flex-col">
      <AdminHeader />
      <div className="dashboard-container">
      <button onClick={() => navigate(-1)} style={{ marginLeft: "-1150px" }}>
        Back
      </button>
       <label>
       <div style={{ position: "relative", marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>
  <strong style={{ cursor: "pointer" }} onClick={() => setShowYearDropdown(!showYearDropdown)}>
    {selectedYear} <span style={{ marginLeft: "5px" }}>▾</span>
  </strong>

  {showYearDropdown && (
    <div
      style={{
        position: "absolute",
        top: "100%",
        background: "#fff",
        border: "1px solid #ccc",
        borderRadius: "4px",
        boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
        zIndex: 1000,
      }}
    >
      {Array.from({ length: 11 }, (_, i) => 2015 + i)
      .filter(year => year <= new Date().getFullYear())
      .map((year) => (
        <div
          key={year}
          onClick={() => {
            setSelectedYear(year);
            setShowYearDropdown(false);
          }}
          style={{
            padding: "8px 12px",
            cursor: "pointer",
            backgroundColor: year === selectedYear ? "#f0f0f0" : "#fff",
          }}
        >
          {year}
        </div>
      ))}
    </div>
  )}
</div>
            </label>
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3>PayOut</h3>
      

      </div>

      <table className="table" style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Sl No</th>
            <th>Month</th>
            <th>Total Amount</th>
            <th>Amount Deducted</th>
            <th>Total Transfered</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
    
            <tr >
              <td>1</td>
              <td>January</td>
              <td>40000</td>
              <td>5000</td>
              <td>35000</td>
              <td>12/03/2025</td>
             
            </tr>
       
        </tbody>
      </table>


     
    </div>
    </div>
    </div>
    </div>
  );
};

export default MonthlyPayOut;
