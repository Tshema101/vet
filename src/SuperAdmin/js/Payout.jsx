import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import "../css/astyles.css";
import AdminHeader from "./Header";
import SuperAdminSidebar from "./Sidebar";

const PayOut = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [vetList, setVetList] = useState([]);
  const [appointments, setAppointments] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Default current month
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchVet = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Unauthorized access. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/vets`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVetList(response.data);
      } catch (error) {
        setError("Failed to fetch vet data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchVet();
  }, []);

//   const handleViewAppointments = async (vetId) => {
//     try {
//       const response = await axios.get(
//         `https://vetserver.onrender.com/api/appointments?veterinarianId=${vetId}`
//       );
//       const monthlyAppointments = response.data.filter((appt) => {
//         const apptMonth = new Date(appt.date).getMonth() + 1;
//         return apptMonth === parseInt(selectedMonth);
//       });

//       const total = monthlyAppointments.reduce((sum, a) => sum + a.fee, 0);
//       const deduction = total * 0.2;
//       const finalAmount = total - deduction;

//       setAppointments((prev) => ({
//         ...prev,
//         [vetId]: {
//           data: monthlyAppointments,
//           total,
//           deduction,
//           finalAmount,
//         },
//       }));
//     } catch (err) {
//       console.error("Failed to fetch appointments:", err);
//     }
//   };
const handleViewAppointments = async (vet) => {
    setTimeout(() => {
      const dummyAppointments = [
        {
            _id: "unique_id",
            clientName: "Kinga Lhazom",
            phone: "17332417",
            email: "kinga@gmail.com",
            location: "Thimphu",
            PaymentStatus: "Paid",
            amount: 100,
            date: "2025-03-06T00:00:00.000Z"
          },          
        {
          _id: "2",
          date: `2025-${selectedMonth.toString().padStart(2, '0')}-12`,
          clientName: "Sonam Choden",
          phone: "17332417",
            email: "tsheirn@gmail.com",
            location: "Thimphu",
            PaymentStatus: "Refunded",
            amount: 500,
        },
        {
          _id: "3",
          date: `2025-${selectedMonth.toString().padStart(2, '0')}-20`,
          clientName: "Pema Wangchuk",
          phone: "17332417",
          email: "tsheirng@gmail.com",
          location: "Thimphu",
          PaymentStatus: "Paid",
          amount: 1000,
        },
      ];
  
      const total = dummyAppointments.reduce((sum, a) => sum + a.fee, 0);
      const deduction = total * 0.2;
      const finalAmount = total - deduction;
  
      const appointmentData = {
        data: dummyAppointments,
        total,
        deduction,
        finalAmount,
      };
  
      navigate("/vet-appointments", {
        state: { vet, data: appointmentData, month: selectedMonth },
      });
    }, 500);
  };
  
  return (
    <div className="app-container flex h-screen">
      <SuperAdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <div style={{marginTop:"-30px"}}  className="dashboard-container">
          <div >
            <h3>Approved Vets</h3>
            {/* <label>
              Filter by Month:
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                style={{ marginLeft: "10px" }}
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(0, i).toLocaleString("default", { month: "long" })}
                  </option>
                ))}
              </select>
            </label> */}
          </div>
          <div className="table-container">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="error-message">{error}</p>
            ) : vetList.approved && vetList.approved.length === 0 ? (
              <p>No vets registered.</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>CID Number</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>License</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vetList.approved
                    .filter((vet) =>
                      vet.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((vet) => (
                      <tr key={vet.id}>
                        <td>{vet.CID}</td>
                        <td>{vet.name}</td>
                        <td>{vet.email}</td>
                        <td>{vet.contact_no}</td>
                        <td>{vet.vet_license}</td>
                   
                        <td>
                        <button style={{backgroundColor:"#113047", padding:"8px", color:"#ffffff", borderRadius:'5px'}}
  className="action-btn"
  onClick={() => handleViewAppointments(vet)}
>
  View Appointments
</button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>

       
        </div>
      </div>
    </div>
  );
};

export default PayOut;
