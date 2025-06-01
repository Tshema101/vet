import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; 
import Footer from './Footer'; // Import your Footer component
import vet1 from './Images/vet1.png'; // Replace with actual image path
import cert from './Images/cert.png'; // Replace with actual image path
import { FaTimes } from 'react-icons/fa';

const VetProfile = () => {
    const navigate = useNavigate();
  
  const vet = {
    name: 'Dr. Pema Tshoki',
    specialization: 'Veterinarian, MRCVS',
    description:
      'Hi! My name is Pema Tshoki, I qualified as a vet in 2018 from Edinburgh University, went on to work in small animal practice and then to complete a masters at the Royal Veterinary College in wild animal health.',
    location: 'Kawangjangsa, Thimphu',
    price: 500, // example price per appointment
    reviews: [
      'She was quick and everything suggested helped my dog Lumai many many thanks!',
      'Very friendly and professional service.',
      'Explained everything clearly and calmly. Highly recommend!',
      'Amazing vet! Took great care of my pet.',
      'She was quick and everything suggested helped my dog Lumai many many thanks!',
      'She was quick and everything suggested helped my dog Lumai many many thanks!',

    ],
    certificates: [
      'https://via.placeholder.com/300x200?text=Certificate+1',
      'https://via.placeholder.com/300x200?text=Certificate+2',
    ],
  };
  const [selectedStars, setSelectedStars] = React.useState(0);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    review: '',
  });

  const handleStarClick = (star) => {
    setSelectedStars(star);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle submit (e.g., send to backend)
    alert('Review submitted!');
  };

  const timeSlots = [  { time: '9:00 AM - 10:00 AM', price: 50 }, '10:00 am to 11:00 am',, '11:00 am to 12:00 pm', '1:00 pm to 2:00 pm', '2:00 pm to 3:00 pm'];
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(today);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showCertificate, setShowCertificate] = useState(false);

  const getWeekDates = (date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return d;
    });
  };

  const changeWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + direction * 7);
    setCurrentDate(newDate);
    setSelectedSlot(null);
  };

  const weekDates = getWeekDates(currentDate);

  const handleBooking = () => {
    if (selectedSlot) {
      alert(
        `Appointment Details:\nDate: ${selectedSlot.date}\nTime: ${selectedSlot.time}\nPrice: $${selectedSlot.price}`
      );
      // You can also navigate and pass state like this:
      // navigate('/appointment', { state: selectedSlot });
    } else {
      alert('Please select a time slot first.');
    }
    // navigate('/appointment')
    // if (selectedSlot) {
    //   alert(`You selected: ${selectedSlot.date} at ${selectedSlot.time}`);
    // } else {
    //   alert('Please select a time slot before continuing!');
    // }
  };

  const isToday = (date) =>
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

    const handleNavigate = () => {
      navigate('/vets');
    };

  return (
    <div style={{top: '0', width: '100%', }}>
             <Navbar />

    <div style={{ maxWidth: '1200px', marginLeft: '90px ',  fontFamily: 'Arial, sans-serif', color: '#333', marginTop: '120px' }}>

     <div    onClick={handleNavigate}> 
      <FaTimes style={{ fontSize: '23px', color: '#011523', marginBottom: '20px' }} />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '70px' }}>
        {/* Left Side - Vet Info */}
        <div style={{ flex: '1', minWidth: '600px' }}>
          <div style={{display: 'flex', flexDirection: 'row',  padding: '20px'}}>
          <img
            src={vet1}
            alt="Vet"
            style={{ borderRadius: '50%', width: '200px', height: '200px', objectFit: 'cover', marginBottom: '15px' }}
          />
          <div style={{ marginLeft: '20px', flex: '1', marginTop:"20px" }}>
          <h2 style={{ margin: '0 0 5px' }}>{vet.name}</h2>
          <p style={{ color: '#777', margin: '0 0 8px' }}>{vet.specialization}</p>
          <p style={{ fontSize: '13px', color: '#777', marginBottom: '20px' }}>⭐ 4.1 | 37 reviews</p>
          </div>
          </div>

          <p style={{ fontSize: '14px', marginBottom: '15px' }}>{vet.description}</p>
          <p style={{ fontSize: '14px', color: '#777', marginBottom: '20px' }}>{vet.location}</p>

          <p
            style={{ fontSize: '14px', color: 'grey', cursor: 'pointer', textDecoration: 'none', marginBottom: '30px' }}
            onClick={() => setShowCertificate(true)}
          >
            Certification details: view ❯
          </p>

<div style={{borderBottom:"1px solid grey", marginBottom:"20px"}}></div>


          {/* <h3 style={{ marginBottom: '15px' }}>Rate and Reviews</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            {vet.reviews.map((review, index) => (
              <div
                key={index}
                style={{
                  background: '#fff',
                  border: '1px solid #eee',
                  borderRadius: '8px',
                  padding: '15px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                  flex: '1 1 45%',
                  fontSize: '13px',
                  lineHeight: '1.5',
                }}
              >
                ⭐⭐⭐⭐⭐
                <br />
                {review}
              </div>
            ))}
          </div>
    <div style={{fontSize:"12px", color:"grey", textAlign:"center", marginTop:"40px"}}>view more</div>

<div style={{borderBottom:"1px solid grey", marginBottom:"50px"}}></div> */}

<h3 style={{ marginBottom: '15px', fontSize: "16px" }}>Rate and Reviews</h3>

<div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
  <span style={{ fontSize: "14px", marginRight: "6px" }}>4.1</span>
  <span style={{ fontSize: "14px", color: "#555" }}>{vet.reviews.length} reviews</span>
</div>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  }}
>
  {vet.reviews.map((review, index) => (
    <div
      key={index}
      style={{
        background: "#fff",
        border: "1px solid #d9d9d9",
        borderRadius: "3px",
        padding: "16px",
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        fontSize: "13px",
        lineHeight: "1.5",
      }}
    >
      <p style={{ fontSize: "14px", color: "#333", marginBottom: "12px" }}>{review}</p>

      <div
        style={{
          borderTop: "1px solid #e6e6e6",
          paddingTop: "10px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "24px", height: "24px", color: "#bfbfbf", marginRight: "8px" }}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 12c2.67 0 8 1.34 8 4v2H4v-2c0-2.66 5.33-4 8-4zm0-2a4 4 0 100-8 4 4 0 000 8z" />
        </svg>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "2px" }}>
            {/* Stars */}
            {Array.from({ length: 5 }).map((_, starIndex) => (
              <svg
                key={starIndex}
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  width: "14px",
                  height: "14px",
                  color: starIndex < 4 ? "#339af0" : "#d9d9d9", // example: 4 stars
                  marginRight: "2px",
                }}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.05 3.237a1 1 0 00.95.69h3.396c.969 0 1.371 1.24.588 1.81l-2.747 1.995a1 1 0 00-.364 1.118l1.05 3.237c.3.921-.755 1.688-1.54 1.118L10 13.347l-2.747 1.995c-.784.57-1.838-.197-1.539-1.118l1.05-3.237a1 1 0 00-.364-1.118L3.653 8.664c-.783-.57-.38-1.81.588-1.81h3.396a1 1 0 00.95-.69l1.05-3.237z" />
              </svg>
            ))}
          </div>
          <span style={{ fontSize: "13px", color: "#333", marginBottom: "2px" }}>Karma Dorji</span>
          <span style={{ fontSize: "12px", color: "#999" }}>20 Feb 2025</span>
        </div>
      </div>
    </div>
  ))}
</div>

<div style={{ fontSize: "12px", color: "grey", textAlign: "center", marginTop: "40px" }}>
  view more
</div>

<div style={{ borderBottom: "1px solid grey", marginBottom: "50px" }}></div>

        </div>




       {/* Right Side - Booking */}
<div style={{ flex: '2', minWidth: '520px', border: '2px solid #ddd', borderRadius: '8px', padding: '20px', height: '80%'}}>
  <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px', textAlign:"center" }}> Available Time Slot</div>
  {/* Week Navigation */}
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
    <button
      onClick={() => changeWeek(-1)}
      style={{
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        fontSize: '20px',
      }}
    >
      ❮
    </button>
    <button
      onClick={() => changeWeek(1)}
      style={{
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        fontSize: '20px',
      }}
    >
      ❯
    </button>
  </div>

  {/* Date Selection */}
  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginBottom: '15px' }}>
    {weekDates.map((date) => {
      const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
      const isSelected = currentDate.toDateString() === date.toDateString();
      const isTodayDate = isToday(date);

      return (
        <div
          key={date.toDateString()}
          onClick={() => !isPast && setCurrentDate(date)}
          style={{
            flex: '1',
            textAlign: 'center',
            padding: '8px',
            borderRadius: '8px',
            border: isSelected ? '2px solid #113047' : '1px solid #ddd',
            backgroundColor: isSelected ? '#e6f0ff' : '#fff',
            color: isPast ? '#ccc' : '#333',
            cursor: isPast ? 'not-allowed' : 'pointer',
            opacity: isPast ? 0.6 : 1,
            transition: 'all 0.3s ease',
          }}
        >
          <div style={{ fontSize: '12px', marginBottom: '4px' }}>
            {date.toLocaleDateString('en-US', { weekday: 'short' })}
          </div>
          <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
            {date.getDate()}
          </div>
        </div>
      );
    })}
  </div>

  {/* Selected Date */}
  <div style={{ textAlign: 'center', marginBottom: '20px', fontWeight: '500' }}>
    {currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
  </div>

  {/* Time Slots or Not Available */}
  {timeSlots && timeSlots.length > 0 && currentDate >= new Date(new Date().setHours(0, 0, 0, 0)) ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {timeSlots.map((slot, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedSlot({
                    date: currentDate.toDateString(),
                    time: slot.time,
                    price: slot.price,
                  })}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px',
                    borderRadius: '8px',
                    border: selectedSlot?.time === slot.time ? '2px solid #D8F3FF' : '1px solid #ddd',
                    backgroundColor: selectedSlot?.time === slot.time ? '#F0FCFF' : '#fff',
                    cursor: 'pointer',
                  }}
                >
                  <span>{slot.time}</span>
                  <span>${slot.price}</span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: '#888' }}>
              Not Available
            </div>
          )}

          {/* Continue Booking Button */}
          <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <button
              onClick={handleBooking}
              style={{
                backgroundColor: selectedSlot ? '#00AEEF' : '#ccc',
                color: 'white',
                padding: '12px 30px',
                border: 'none',
                borderRadius: '5px',
                cursor: selectedSlot ? 'pointer' : 'not-allowed',
              }}
              disabled={!selectedSlot}
            >
              Continue Booking
            </button>
            </div>
</div>
</div>

      {/* New Rate this Vet Section */}
      <div
        style={{
          border: '1px solid #ddd',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '50px',
        }}
      >
        <div style={{ marginBottom: '15px' }}>
          <div style={{ fontStyle: 'italic', fontWeight: '600', marginBottom: '3px' }}>
            Rate this Vet
          </div>
          <div style={{ fontSize: '12px', color: 'grey', marginBottom: '10px' }}>
            Tell other what you think about this Vet.
          </div>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleStarClick(star)}
                style={{
                  cursor: 'pointer',
                  fontSize: '36px',
                  color: selectedStars >= star ? '#007bff' : '#ccc',
                  transition: 'color 0.3s',
                }}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <div style={{ fontStyle: 'italic', marginBottom: '15px' }}>Write a Review</div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ flex: '1 1 40%' }}>
            <label style={{ fontSize: '12px', fontWeight: 'bold' }}>
              Name<span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              required
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                fontSize: '12px',
                marginTop: '5px',
              }}
            />
          </div>

          <div style={{ flex: '1 1 40%' }}>
            <label style={{ fontSize: '12px', fontWeight: 'bold' }}>
              Email<span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              required
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                fontSize: '12px',
                marginTop: '5px',
              }}
            />
          </div>

          <div style={{ flex: '1 1 100%' }}>
            <label style={{ fontSize: '12px', fontWeight: 'bold' }}>
              Review<span style={{ color: 'red' }}>*</span>
            </label>
            <textarea
              name="review"
              value={formData.review}
              onChange={handleInputChange}
              placeholder="Write your review..."
              required
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                fontSize: '12px',
                marginTop: '5px',
                minHeight: '80px',
              }}
            />
          </div>

          <div style={{ flex: '1 1 100%', textAlign: 'right' }}>
            <button
              type="submit"
              style={{
                background: '#062b46',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 20px',
                fontSize: '13px',
                cursor: 'pointer',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
              }}
            >
              Send
            </button>
          </div>
        </form>
      </div>


      {/* Certificate Modal */}
      {showCertificate && (
        <div
          onClick={() => setShowCertificate(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '5px',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '80vh',
              overflowY: 'auto',
            }}
          >
            <h3 style={{ marginBottom: '20px' }}>Certificates</h3>
            {vet.certificates.map((cert, idx) => (
              
              <img key={idx} src={cert} alt={`Certificate ${idx + 1}`} style={{ width: '100%', marginBottom: '15px' }} />
              
            ))}
                <div style={{ position: 'relative', background: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
            <FaTimes
              onClick={() => setShowCertificate(false)}
              style={{ position: 'absolute', top: '-70px', right: '10px', cursor: 'pointer' }}
            />
            <img src={cert} alt="Certificate" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>

            <button
              onClick={() => setShowCertificate(false)}
              style={{
                marginTop: '10px',
                padding: '8px 16px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    <Footer />
    </div>
  );
};

export default VetProfile;
